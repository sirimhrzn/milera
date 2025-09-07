use crate::{
    app::AppState,
    db::{create_post, db_execute, find_all, QueryFilter},
    error::ServerError,
    utils::jwt::AuthenticatedUser,
};

use axum::{
    extract::{Path, Query, State}, http::StatusCode, response::{IntoResponse, Response}, routing::{get, post}, Extension, Json, Router
};
use milera_common::models::Post;
use milera_common::request::NewPost;
use serde_json::json;
use std::sync::Arc;

use super::Pagination;

pub fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/post/create", post(http_create_post))
        .route("/post/list", get(get_posts))
        .with_state(state)
}

pub async fn http_create_post(
    state: State<Arc<AppState>>,
    Extension(user): Extension<AuthenticatedUser>,
    Json(payload): Json<NewPost>,
) -> Result<Response, ServerError> {
    let _ = create_post(state.db.as_ref(), payload, user.user_id).await?;
    Ok(Json(json!({ "message": "Post created successfully"})).into_response())
}

pub async fn get_posts(
    state: State<Arc<AppState>>,
    Extension(user): Extension<AuthenticatedUser>,
    Query(pagination): Query<Pagination>,
) -> Result<Response, ServerError> {
    let posts = find_all::<Post, i32>(
        state.db.as_ref(),
        "SELECT * from posts ",
        Some(pagination),
        None,
    )
    .await?
    .into_iter()
    .map(|mut post| {
        if post.anonymous {
            post.created_by = 0;
        }
        post
    })
    .collect::<Vec<_>>();

    Ok(Json(posts).into_response())
}

pub async fn delete_post(
    state: State<Arc<AppState>>,
    Extension(user): Extension<AuthenticatedUser>,
    Path(id): Path<i32>,
) -> Result<Response, ServerError> {

    if user.user_id != id {
        return Err(ServerError::Unauthorized);
    }

    let _ =  db_execute(state.db.as_ref(), "DELETE FROM posts WHERE id = $1", vec![QueryFilter::new("id", id)]).await?;

    Ok(StatusCode::NO_CONTENT.into_response())
}
