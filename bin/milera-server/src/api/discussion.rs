use crate::{
    app::AppState,
    db::{check_if_exists, create_user, get_user, user::User as DBUser, Discussion, NewDiscussion},
    dto::User,
    error::ServerError,
    utils::jwt::{authenticate_user, generate_jwt, AuthenticatedUser},
};
use axum::{
    extract::State, http::StatusCode, response::{IntoResponse, Response}, routing::{get, post}, Extension, Json, Router
};
use bcrypt::{DEFAULT_COST, hash};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::sync::Arc;

pub fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/discussions/create", post(create_discussion))
        .with_state(state)
}



pub async fn create_discussion(
    state: State<Arc<AppState>>,
    Extension(user): Extension<AuthenticatedUser>,
    Json(mut payload): Json<NewDiscussion>,

) -> Result<Response, ServerError> {

    let _ = Discussion::create(state.db.as_ref(), payload, user.user_id).await?;

    Ok(Json(json!({})).into_response())
    // let user = authenticate_user(&state, &payload.token).await?;
    // let discussion = create_discussion(&state, &user, &payload.title, &payload.content).await?;
    // Ok(Json(discussion).into_response())
}
