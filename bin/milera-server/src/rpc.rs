use milera_common::rpc::MileraApiServer;
use jsonrpsee::core::{async_trait, RpcResult};
use milera_common::response::RegistrationResponse;
use std::sync::Arc;
use crate::{app::AppState, auth, error::to_jsonrpsee_error};

#[derive(Clone)]
pub struct MileraServer {
    app_state: Arc<AppState>,
}

impl MileraServer {

    pub fn new(app_state: Arc<AppState>) -> Self {
        Self { app_state }
    }
}

#[async_trait]
impl MileraApiServer for MileraServer {

    async fn register_user(&self, username: &str, password: &str) -> RpcResult<RegistrationResponse> {
        auth::register_user(self.app_state.clone(), username, password).await.map_err(to_jsonrpsee_error("Failed to register user"))
    }
}
