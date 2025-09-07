use crate::app::AppState;
use crate::error::ServerError;
use crate::api::auth::router as auth_router;

use axum::Router;
use std::sync::Arc;
use tokio::net::TcpListener;
use tracing::info;

pub async fn start() -> Result<(), ServerError> {
    let app_state = Arc::new(AppState::new().await.unwrap());
    let router = Router::new().merge(auth_router(app_state.clone()));

    let host = std::env::var("HOST").expect("Expected environment variable HOST");
    let port = std::env::var("PORT").expect("Expected environment variable PORT");

    let address = format!("{}:{}", host, port);
    let listener = TcpListener::bind(&address).await.unwrap();

    info!("Server listening on {}", address);
    axum::serve(listener, router).await.unwrap();
    Ok(())
}
