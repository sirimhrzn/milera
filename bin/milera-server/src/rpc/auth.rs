// use anyhow::Ok;
use jsonrpsee::core::{RpcResult, async_trait};
use milera_common::{
    response::{LoginResponse, RegistrationResponse},
    rpc::MileraAuthenticationServer,
};

use crate::{app::AppState, error::to_jsonrpsee_error, handlers::auth};
use std::sync::Arc;

#[derive(Clone)]
pub struct AuthServer {
    app_state: Arc<AppState>,
}

impl AuthServer {
    pub fn new(app_state: Arc<AppState>) -> Self {
        Self { app_state }
    }
}

#[async_trait]
impl MileraAuthenticationServer for AuthServer {
    async fn login_user(&self, username: &str, password: &str) -> RpcResult<LoginResponse> {
        auth::login_user(self.app_state.clone(), username, password)
            .await
            .map_err(to_jsonrpsee_error("Failed to login user"))
    }
    async fn register_user(
        &self,
        username: &str,
        password: &str,
    ) -> RpcResult<RegistrationResponse> {
        auth::register_user(self.app_state.clone(), username, password)
            .await
            .map_err(to_jsonrpsee_error("Failed to register user"))
    }
}
