use crate::{
    app::AppState,
    db::{NewPost, Post},
    error::ServerError,
    utils::jwt::AuthenticatedUser,
};
use axum::{
    Extension, Json, Router,
    extract::State,
    response::{IntoResponse, Response},
    routing::post,
};
use serde_json::json;
use std::sync::Arc;

pub fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/post/create", post(create_post))
        .with_state(state)
}

pub async fn create_post(
    state: State<Arc<AppState>>,
    Extension(user): Extension<AuthenticatedUser>,
    Json(payload): Json<NewPost>,
) -> Result<Response, ServerError> {
    let _ = Post::create(state.db.as_ref(), payload, user.user_id).await?;
    Ok(Json(json!({ "message": "Post created successfully"})).into_response())
}
