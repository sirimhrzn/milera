use crate::request::NewPost;
use crate::response::RegistrationResponse;
use crate::utils::Pagination;
use crate::{models::Post, response::LoginResponse};
use jsonrpsee::{core::RpcResult, proc_macros::rpc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AuthenticatedUser {
    pub user_id: i32,
}

#[cfg_attr(feature = "server", rpc(server))]
#[cfg_attr(feature = "wasm-client", rpc(client))]
pub trait MileraGated {
    #[method(name = "getPosts", with_extensions)]
    async fn get_posts(&self, pagination: Pagination) -> RpcResult<Vec<Post>>;

    #[method(name = "createPost", with_extensions)]
    async fn create_post(&self, post: NewPost) -> RpcResult<Post>;

    #[method(name = "deletePost", with_extensions)]
    async fn delete_post(&self, post_id: i32) -> RpcResult<()>;
}

#[cfg_attr(feature = "server", rpc(server))]
#[cfg_attr(feature = "wasm-client", rpc(client))]
pub trait MileraAuthentication {
    #[method(name = "registerUser")]
    async fn register_user(
        &self,
        username: &str,
        password: &str,
    ) -> RpcResult<RegistrationResponse>;

    #[method(name = "loginUser")]
    async fn login_user(&self, username: &str, password: &str) -> RpcResult<LoginResponse>;
}
