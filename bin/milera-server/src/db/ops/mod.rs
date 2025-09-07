use crate::app::AppState;
use crate::dto::User;
use crate::error::{ServerError, ErrorResponse};
use sqlx::postgres::PgPool;
use sqlx::Row;
use std::sync::Arc;
use tracing::event;
use tracing::Level;


pub async fn check_if_exists(
    db: &PgPool,
    table: &str,
    column: &str,
    value: &String,
) -> Result<i32, ServerError> {
    let query = format!("SELECT id FROM {} WHERE {} = $1", table, column);

    let result = sqlx::query(&query).bind(value).fetch_optional(db).await?;

    match result {
        Some(row) => Ok(row.get::<i32, _>("id")),
        None => Err(ServerError::EntityNotFound),
    }
}


// The idea here is to limit the creation of users per browser/app
// Retrieve unique parameters from the client and pass it over here.
pub async fn create_user(state: Arc<AppState>, user: &User, creation_token: Option<&str> ) -> Result<i32, ServerError> {

    let db: Arc<PgPool> = state.db.clone();

    if let Ok(_) = check_if_exists(db.as_ref(), "users", "username", &user.username).await {
        return Err(ServerError::CustomError(ErrorResponse {
            error_code: 409,
            reason: format!("Already used"),
        }));
    };

    let user_id: i32 =
        sqlx::query("INSERT INTO users(username,password, creation_token) VALUES($1,$2,$3) RETURNING ID")
            .bind(&user.username)
            .bind(&user.password)
            .bind(creation_token)
            .fetch_one(db.as_ref())
            .await?
            .get("id");


    event!(Level::INFO, message = "User created.", user = &user.username);

    Ok(user_id)
}



pub async fn get_user(state: Arc<AppState>, id: i32) -> Result<User, ServerError> {

    let row = sqlx::query("SELECT id, username, password FROM users WHERE id = $1")
        .bind(&id)
        .fetch_one(state.db.as_ref())
        .await
        .unwrap();

    Ok(User {
        id: row.get::<i32,_>("id") as u32,
        username: row.get("username"),
        password: row.get("password"),
    })
}
