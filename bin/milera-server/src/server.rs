use crate::api::middleware::authentication;
use crate::api::{
    auth::router as auth_router, discussion::router as discussion_router,
    post::router as post_router,
};
use crate::app::AppState;
use crate::error::ServerError;
use crate::utils::jwt::AuthenticatedUser;

use axum::{Router, middleware};
use std::sync::Arc;
use tokio::net::TcpListener;
use tracing::info;

pub async fn start() -> Result<(), ServerError> {
    let app_state = Arc::new(AppState::new().await.unwrap());
    let router = Router::new().nest(
        "/api",
        Router::new()
            .merge(post_router(app_state.clone()))
            .merge(discussion_router(app_state.clone()))
            .layer(middleware::from_fn_with_state(
                app_state.clone(),
                authentication,
            ))
            .layer(axum::Extension(AuthenticatedUser::default()))
            .merge(auth_router(app_state.clone())),
    );

    let host = std::env::var("HOST").expect("Expected environment variable HOST");
    let port = std::env::var("PORT").expect("Expected environment variable PORT");

    let address = format!("{}:{}", host, port);
    let listener = TcpListener::bind(&address).await.unwrap();

    info!("Server listening on {}", address);
    axum::serve(listener, router).await.unwrap();
    Ok(())
}
