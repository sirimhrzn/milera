use crate::error::ServerError;
use crate::{app::AppState, error::to_jsonrpsee_error, handlers::post};
use jsonrpsee::core::{RpcResult, async_trait};
use jsonrpsee::server::Extensions;
use milera_common::rpc::AuthenticatedUser;
use milera_common::utils::Pagination;
use milera_common::{models::Post, request::NewPost, rpc::MileraGatedServer};
use std::sync::Arc;

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
impl MileraGatedServer for MileraServer {
    async fn get_posts(&self, ext: &Extensions, pagination: Pagination) -> RpcResult<Vec<Post>> {
        post::get_posts(
            self.app_state.clone(),
            AuthenticatedUser { user_id: 123 },
            Some(pagination),
        )
        .await
        .map_err(to_jsonrpsee_error("Failed to get posts"))
    }

    async fn delete_post(&self, ext: &Extensions, post_id: i32) -> RpcResult<()> {
        let auth_user = ext
            .get::<AuthenticatedUser>()
            .ok_or(ServerError::Unauthorized)
            .map_err(to_jsonrpsee_error("Failed to get authenticated user"))?;
        post::delete_post(self.app_state.clone(), auth_user, post_id)
            .await
            .map_err(to_jsonrpsee_error("Failed to delete post"))
    }

    async fn create_post(&self, ext: &Extensions, post: NewPost) -> RpcResult<Post> {
        let auth_user = ext
            .get::<AuthenticatedUser>()
            .ok_or(ServerError::Unauthorized)
            .map_err(to_jsonrpsee_error("Failed to get authenticated user"))?;
        post::create_post(self.app_state.clone(), auth_user, post)
            .await
            .map_err(to_jsonrpsee_error("Failed to create post"))
    }
}
