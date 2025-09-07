use crate::{
    app::AppState,
    db::{create_discussion, find_all},
    error::ServerError,
    utils::jwt::AuthenticatedUser,
};
use axum::{
    Extension, Json, Router,
    extract::{Query, State},
    response::{IntoResponse, Response},
    routing::{get, post},
};
use milera_common::models::Discussion;
use milera_common::request::NewDiscussion;
use serde_json::json;
use std::sync::Arc;

use super::Pagination;

pub fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/discussion/create", post(http_create_discussion))
        .route("/discussion/list", get(get_discussions))
        .with_state(state)
}

pub async fn http_create_discussion(
    state: State<Arc<AppState>>,
    Extension(user): Extension<AuthenticatedUser>,
    Json(payload): Json<NewDiscussion>,
) -> Result<Response, ServerError> {
    let _ = create_discussion(state.db.as_ref(), payload, user.user_id).await?;
    Ok(Json(json!({ "message": "Discussion created successfully"})).into_response())
}

pub async fn get_discussions(
    state: State<Arc<AppState>>,
    Extension(user): Extension<AuthenticatedUser>,
    Query(pagination): Query<Pagination>,
) -> Result<Response, ServerError> {
    let discussions = find_all::<Discussion, i32>(
        state.db.as_ref(),
        "SELECT * from discussions ",
        Some(pagination),
        None,
    )
    .await?
    .into_iter()
    .map(|mut discussion| {
        if discussion.anonymous {
            discussion.created_by = 0;
        }
        discussion
    })
    .collect::<Vec<_>>();

    Ok(Json(discussions).into_response())
}
