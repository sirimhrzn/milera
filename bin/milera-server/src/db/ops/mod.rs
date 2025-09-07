// Claude wrote some of this.
use crate::app::AppState;
use crate::dto::User;
use crate::error::{ErrorResponse, ServerError};
use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use sqlx::{Decode, Encode, Row, Type};
use sqlx::postgres::PgPool;
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
    let query = format!("SELECT {} FROM {} WHERE {} = $1", return_column, table, column);
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
    user: &User,
    creation_token: Option<&str>,
) -> Result<i32, ServerError> {
    let db: Arc<PgPool> = state.db.clone();

    if let Ok(_) = check_if_exists::<String, i32>(db.as_ref(), "users", "username", "id",&user.username).await {

        return Err(ServerError::CustomError(ErrorResponse {
            error_code: 409,
            reason: format!("Already used"),
        }));
    };

    let user_id: i32 = sqlx::query(
        "INSERT INTO users(username,password, creation_token) VALUES($1,$2,$3) RETURNING ID",
    )
    .bind(&user.username)
    .bind(&user.password)
    .bind(creation_token)
    .fetch_one(db.as_ref())
    .await?
    .get("id");

    event!(
        Level::INFO,
        message = "User created.",
        user = &user.username
    );

    Ok(user_id)
}

pub async fn get_user(state: Arc<AppState>, id: i32) -> Result<User, ServerError> {
    let row = sqlx::query("SELECT id, username, password FROM users WHERE id = $1")
        .bind(&id)
        .fetch_one(state.db.as_ref())
        .await
        .unwrap();

    Ok(User {
        id: row.get::<i32, _>("id") as u32,
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

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Discussion {
    pub id: i32,
    pub title: String,
    pub description: String,
    pub location: Option<String>,
    pub lon: Option<Decimal>,
    pub lat: Option<Decimal>,
    pub location_detail: Option<String>,
    pub total_post_count: i32,
    pub anonymous: bool,
    pub created_by: i32,
    pub created_date: DateTime<Utc>,
    pub updated_date: DateTime<Utc>,
}

// Struct for creating new discussions (without auto-generated fields)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewDiscussion {
    pub title: String,
    pub description: String,
    pub location: Option<String>,
    pub lon: Option<Decimal>,
    pub lat: Option<Decimal>,
    pub location_detail: Option<String>,
    pub anonymous: bool,
}

impl Discussion {
    // Create a new discussion
    pub async fn create(
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

    // // Find discussion by ID
    // pub async fn find_by_id(
    //     pool: &sqlx::PgPool,
    //     id: i32,
    // ) -> Result<Option<Discussion>, sqlx::Error> {
    //     let discussion = sqlx::query_as!(
    //         Discussion,
    //         "SELECT * FROM discussions WHERE id = $1",
    //         id
    //     )
    //     .fetch_optional(pool)
    //     .await?;

    //     Ok(discussion)
    // }

    // Get all discussions
    // pub async fn find_all(pool: &sqlx::PgPool) -> Result<Vec<Discussion>, sqlx::Error> {
    //     let discussions = sqlx::query(
    //         Discussion,
    //         "SELECT * FROM discussions ORDER BY created_date DESC"
    //     )
    //     .fetch_all(pool)
    //     .await?;

    //     Ok(discussions)
    // }

    // // Find discussions by user
    // pub async fn find_by_user(
    //     pool: &sqlx::PgPool,
    //     user_id: i32,
    // ) -> Result<Vec<Discussion>, sqlx::Error> {
    //     let discussions = sqlx::query_as!(
    //         Discussion,
    //         "SELECT * FROM discussions WHERE created_by = $1 ORDER BY created_date DESC",
    //         user_id
    //     )
    //     .fetch_all(pool)
    //     .await?;

    //     Ok(discussions)
    // }

    // // Find discussions by location (within radius)
    // pub async fn find_by_location(
    //     pool: &sqlx::PgPool,
    //     center_lat: Decimal,
    //     center_lon: Decimal,
    //     radius_km: f64,
    // ) -> Result<Vec<Discussion>, sqlx::Error> {
    //     let discussions = sqlx::query_as!(
    //         Discussion,
    //         r#"
    //         SELECT * FROM discussions
    //         WHERE lat IS NOT NULL
    //         AND lon IS NOT NULL
    //         AND (
    //             6371 * acos(
    //                 cos(radians($1::float)) * cos(radians(lat::float)) *
    //                 cos(radians(lon::float) - radians($2::float)) +
    //                 sin(radians($1::float)) * sin(radians(lat::float))
    //             )
    //         ) <= $3
    //         ORDER BY created_date DESC
    //         "#,
    //         center_lat,
    //         center_lon,
    //         radius_km
    //     )
    //     .fetch_all(pool)
    //     .await?;

    //     Ok(discussions)
    // }

    // // Update discussion
    // pub async fn update(
    //     pool: &sqlx::PgPool,
    //     update_data: UpdateDiscussion,
    // ) -> Result<Option<Discussion>, sqlx::Error> {
    //     let discussion = sqlx::query_as!(
    //         Discussion,
    //         r#"
    //         UPDATE discussions
    //         SET
    //             title = COALESCE($2, title),
    //             description = COALESCE($3, description),
    //             location = COALESCE($4, location),
    //             lon = COALESCE($5, lon),
    //             lat = COALESCE($6, lat),
    //             location_detail = COALESCE($7, location_detail),
    //             anonymous = COALESCE($8, anonymous),
    //             updated_date = NOW()
    //         WHERE id = $1
    //         RETURNING *
    //         "#,
    //         update_data.id,
    //         update_data.title,
    //         update_data.description,
    //         update_data.location,
    //         update_data.lon,
    //         update_data.lat,
    //         update_data.location_detail,
    //         update_data.anonymous
    //     )
    //     .fetch_optional(pool)
    //     .await?;

    //     Ok(discussion)
    // }

    // // Delete discussion
    // pub async fn delete(pool: &sqlx::PgPool, id: i32) -> Result<bool, sqlx::Error> {
    //     let result = sqlx::query!("DELETE FROM discussions WHERE id = $1", id)
    //         .execute(pool)
    //         .await?;

    //     Ok(result.rows_affected() > 0)
    // }

    // // Increment post count
    // pub async fn increment_post_count(
    //     pool: &sqlx::PgPool,
    //     id: i32,
    // ) -> Result<Option<Discussion>, sqlx::Error> {
    //     let discussion = sqlx::query_as!(
    //         Discussion,
    //         r#"
    //         UPDATE discussions
    //         SET total_post_count = total_post_count + 1,
    //             updated_date = NOW()
    //         WHERE id = $1
    //         RETURNING *
    //         "#,
    //         id
    //     )
    //     .fetch_optional(pool)
    //     .await?;

    //     Ok(discussion)
    // }

    // // Decrement post count
    // pub async fn decrement_post_count(
    //     pool: &sqlx::PgPool,
    //     id: i32,
    // ) -> Result<Option<Discussion>, sqlx::Error> {
    //     let discussion = sqlx::query_as!(
    //         Discussion,
    //         r#"
    //         UPDATE discussions
    //         SET total_post_count = GREATEST(0, total_post_count - 1),
    //             updated_date = NOW()
    //         WHERE id = $1
    //         RETURNING *
    //         "#,
    //         id
    //     )
    //     .fetch_optional(pool)
    //     .await?;

    //     Ok(discussion)
    // }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Post {
    pub id: i32,
    pub created_by: i32,
    pub anonymous: bool,
    pub discussion_id: i32,
    pub parent_post_id: Option<i32>,
    pub content: String,
    pub created_at: DateTime<Utc>, // Slight inconsistency in naming
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewPost {
    pub discussion_id: i32,
    pub parent_post_id: Option<i32>,
    pub content: String,
    pub anonymous: bool,
}

impl Post {
    pub async fn create(
        pool: &sqlx::PgPool,
        new_post: NewPost,
        created_by: i32,
    ) -> Result<Post, ServerError> {

        let _ = check_if_exists::<i32, i32>(pool, "discussions", "id","id", &new_post.discussion_id).await?;
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
}
