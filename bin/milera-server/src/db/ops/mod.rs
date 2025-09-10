use crate::app::AppState;
use crate::error::{ErrorResponse, ServerError};
use chrono::{DateTime, Utc};
use milera_common::models::User;
use milera_common::utils::Pagination;
use milera_common::{
    models::{Discussion, Post},
    request::{NewDiscussion, NewPost},
};

use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use sqlx::postgres::PgPool;
use sqlx::{Encode, Row, Type};
use std::sync::Arc;
use tracing::Level;
use tracing::event;

pub async fn check_if_exists<T, R>(
    db: &PgPool,
    table: &str,
    column: &str,
    return_column: &str,
    value: &T,
) -> Result<R, ServerError>
where
    for<'a> T: Encode<'a, sqlx::Postgres> + Type<sqlx::Postgres> + Send + Sync,
    R: for<'r> sqlx::Decode<'r, sqlx::Postgres> + Type<sqlx::Postgres>,
{
    let query = format!(
        "SELECT {} FROM {} WHERE {} = $1",
        return_column, table, column
    );
    let result = sqlx::query(&query).bind(value).fetch_optional(db).await?;
    match result {
        Some(row) => Ok(row.get::<R, _>(return_column)),
        None => Err(ServerError::EntityNotFound),
    }
}

// The idea here is to limit the creation of users per browser/app
// Retrieve unique parameters from the client and pass it over here.
pub async fn create_user(
    state: Arc<AppState>,
    username: &str,
    password: &str,
    creation_token: Option<&str>,
) -> Result<User, ServerError> {
    let db: Arc<PgPool> = state.db.clone();

    if let Ok(_) = check_if_exists::<String, i32>(
        db.as_ref(),
        "users",
        "username",
        "id",
        &username.to_string(),
    )
    .await
    {
        return Err(ServerError::CustomError(ErrorResponse {
            error_code: 409,
            reason: format!("Already used"),
        }));
    };

    let row = sqlx::query(
        "INSERT INTO users(username,password, creation_token) VALUES($1,$2,$3) RETURNING *",
    )
    .bind(&username)
    .bind(&password)
    .bind(creation_token)
    .fetch_one(db.as_ref())
    .await?;

    event!(Level::INFO, message = "User created.", user = &username);

    Ok(User {
        id: row.get::<i32, _>("id"),
        username: row.get::<String, _>("username"),
        password: row.get::<String, _>("password"),
    })
}

pub async fn get_user(state: Arc<AppState>, id: i32) -> Result<User, ServerError> {
    let row = sqlx::query("SELECT id, username, password FROM users WHERE id = $1")
        .bind(&id)
        .fetch_one(state.db.as_ref())
        .await
        .unwrap();

    Ok(User {
        id: row.get::<i32, _>("id"),
        username: row.get("username"),
        password: row.get("password"),
    })
}

// Struct for updating discussions (all fields optional except id)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpdateDiscussion {
    pub id: i32,
    pub title: Option<String>,
    pub description: Option<String>,
    pub location: Option<String>,
    pub lon: Option<Decimal>,
    pub lat: Option<Decimal>,
    pub location_detail: Option<String>,
    pub anonymous: Option<bool>,
}

pub async fn create_discussion(
    pool: &sqlx::PgPool,
    new_discussion: NewDiscussion,
    created_by: i32,
) -> Result<Discussion, ServerError> {
    let row = sqlx::query(
            r#"
            INSERT INTO discussions (title, description, location, lon, lat, location_detail, anonymous, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            "#)
        .bind(new_discussion.title)
            .bind(new_discussion.description)
            .bind(new_discussion.location)
            .bind(new_discussion.lon)
            .bind(new_discussion.lat)
            .bind(new_discussion.location_detail)
            .bind(new_discussion.anonymous)
            .bind(created_by)
            .fetch_one(pool)
            .await?;

    Ok(Discussion {
        id: row.get::<i32, _>("id"),
        title: row.get::<String, _>("title"),
        description: row.get::<String, _>("description"),
        location: row.get::<Option<String>, _>("location"),
        lon: row.get::<Option<Decimal>, _>("lon"),
        lat: row.get::<Option<Decimal>, _>("lat"),
        location_detail: row.get::<Option<String>, _>("location_detail"),
        anonymous: row.get::<bool, _>("anonymous"),
        created_by: row.get::<i32, _>("created_by"),
        total_post_count: row.get::<i32, _>("total_post_count"),
        created_date: row.get::<DateTime<Utc>, _>("created_date"),
        updated_date: row.get::<DateTime<Utc>, _>("updated_date"),
    })
}

pub async fn create_post(
    pool: &sqlx::PgPool,
    new_post: NewPost,
    created_by: i32,
) -> Result<Post, ServerError> {
    let _ = check_if_exists::<i32, i32>(pool, "discussions", "id", "id", &new_post.discussion_id)
        .await?;
    let row = sqlx::query(
        r#"
            INSERT INTO posts (created_by, anonymous, discussion_id, parent_post_id, content)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            "#,
    )
    .bind(created_by)
    .bind(new_post.anonymous)
    .bind(new_post.discussion_id)
    .bind(new_post.parent_post_id)
    .bind(new_post.content)
    .fetch_one(pool)
    .await?;

    Ok(Post {
        id: row.get::<i32, _>("id"),
        created_by: row.get::<i32, _>("created_by"),
        anonymous: row.get::<bool, _>("anonymous"),
        discussion_id: row.get::<i32, _>("discussion_id"),
        parent_post_id: row.get::<Option<i32>, _>("parent_post_id"),
        content: row.get::<String, _>("content"),
        created_at: row.get::<DateTime<Utc>, _>("created_at"),
        updated_at: row.get::<DateTime<Utc>, _>("updated_at"),
    })
}

pub async fn find_all<T, R>(
    pool: &sqlx::PgPool,
    query: &str,
    pagination: Option<Pagination>, // filters: Option<Vec<QueryFilter<R>>>,
) -> Result<Vec<T>, sqlx::Error>
where
    T: for<'r> sqlx::FromRow<'r, sqlx::postgres::PgRow> + Send + Sync + Unpin,
    for<'a> R: Encode<'a, sqlx::Postgres> + Type<sqlx::Postgres> + Send + Sync,
{
    let mut query = query.to_string();
    // if let Some(ref filters) = filters {
    //     for (index, ref filter) in filters.iter().enumerate() {
    //         if index > 0 {
    //             query.push_str(" AND ");
    //         } else {
    //             query.push_str(" WHERE ");
    //         }
    //         query.push_str(&format!("{} = ${}", filter.column, index + 1));
    //     }
    // }

    if let Some(page_info) = pagination {
        if let (Some(order_by), Some(order_field)) = (&page_info.order_by, &page_info.order_field) {
            query.push_str(&format!(" ORDER BY {} {}", order_field, order_by));
        }
        query.push_str(&format!(
            " LIMIT {} OFFSET {}",
            page_info.per_page,
            page_info.offset()
        ));
    }
    let sqlx_query = sqlx::query_as(&query);

    // if let Some(ref f) = filters {
    //     for (index, filter) in f.iter().enumerate() {
    //         sqlx_query = sqlx_query.bind(&filter.value);
    //     }
    // }

    let rows = sqlx_query.fetch_all(pool).await?;
    Ok(rows)
}

// impl<T: for<'a> Encode<'a, sqlx::Postgres> + Type<sqlx::Postgres> + Send + Sync> QueryFilter<T> {
//     pub fn new(column: &str, value: T) -> Self {
//         QueryFilter {
//             column: column.to_string(),
//             value,
//         }
//     }
// }

pub async fn db_execute<R>(
    pool: &sqlx::PgPool,
    query: &str, // filters: Vec<QueryFilter<R>>
) -> Result<u64, sqlx::Error>
where
    for<'a> R: Encode<'a, sqlx::Postgres> + Type<sqlx::Postgres> + Send + Sync,
{
    let query = query.to_string();
    // for (index, ref filter) in filters.iter().enumerate() {
    //     if index > 0 {
    //         query.push_str(" AND ");
    //     } else {
    //         query.push_str(" WHERE ");
    //     }
    //     query.push_str(&format!("{} = ${}", filter.column, index + 1));
    // }
    let sqlx_query = sqlx::query(&query);

    // for (index, filter) in filters.iter().enumerate() {
    //     sqlx_query = sqlx_query.bind(&filter.value);
    // }

    let rows = sqlx_query.execute(pool).await?;
    Ok(rows.rows_affected())
}
