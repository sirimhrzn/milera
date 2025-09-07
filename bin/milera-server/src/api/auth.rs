use crate::{
    app::AppState,
    db::{check_if_exists, create_user, get_user},
    dto::User,
    error::ServerError,
    utils::jwt::{authenticate_user, generate_jwt},
};
use axum::{
    Json, Router,
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::post,
};
use milera_common::response::RegistrationResponse;
use bcrypt::{DEFAULT_COST, hash};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::sync::Arc;

pub fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/auth/login", post(login))
        .route("/auth/register", post(register))
        .with_state(state)
}

pub async fn login(
    State(state): State<Arc<AppState>>,
    Json(body): Json<UserLoginRequest>,
) -> Result<Response, ServerError> {
    let id = check_if_exists::<String, i32>(
        state.db.as_ref(),
        "users",
        "username",
        "id",
        &body.username,
    )
    .await?;
    let user = get_user(state, id).await?;
    if !bcrypt::verify(body.password, &user.password)? {
        return Err(ServerError::InvalidCredential);
    }

    let response = authenticate_user(&user).await?;

    Ok((
        StatusCode::OK,
        Json(json!({ "access_token": response.0, "refresh_token": response.1 })),
    )
        .into_response())
}

pub async fn register(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<UserCreationRequest>,
) -> Result<Response, ServerError> {
    let mut user: User = payload.into();
    user.password = hash(user.password, DEFAULT_COST)?;

    let user_id = create_user(state.clone(), &user, None).await?;

    user.id = user_id as u32;

    let token = generate_jwt(&user, None)?;

    Ok((
        StatusCode::OK,
        Json(RegistrationResponse {
            message: "User created successfully".to_string(),
            access_token: token,
        }),
    )
        .into_response())
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UserCreationRequest {
    pub username: String,
    pub password: String,
}

impl Into<User> for UserCreationRequest {
    fn into(self) -> User {
        User {
            id: 0,
            username: self.username,
            password: self.password,
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct UserLoginRequest {
    pub username: String,
    pub password: String,
}
