use crate::util::to_jsonrpsee_error;

use crate::{http_post, invoke_wasm_rpc};
use jsonrpsee_core::client::ClientT;
use jsonrpsee_core::{ClientError, rpc_params};

use milera_common::models::{Discussion, Post};
use milera_common::request::{NewDiscussion, NewPost};
use milera_common::response::{LoginResponse, RegistrationResponse};
use milera_common::rpc::MileraAuthenticationClient;
use milera_common::rpc::MileraGatedClient;
use milera_common::utils::Pagination;
use serde::Serialize;

#[cfg(target_arch = "wasm32")]
use {
    js_sys::wasm_bindgen::{self, JsValue},
    jsonrpsee_client_transport::web,
    jsonrpsee_wasm_client::Client,
    wasm_bindgen::prelude::*,
};

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
pub struct MileraRpcClient {
    gated: Client,
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
impl MileraRpcClient {

    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(constructor))]
    pub async fn new(gated_url: &str) -> MileraRpcClient {
        let (sender, receiver) = web::connect(gated_url)
            .await
            .map_err(to_jsonrpsee_error("failed to connect"))
            .unwrap();

        let gated_client = Client::builder().build_with_wasm(sender, receiver);
        gated_client.login_user("aksdjf", "lkajsdfkl").await;

        Self {
            gated: gated_client,
        }
    }
}
// Make a proc macro for this.
#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
impl MileraRpcClient {

    #[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
    pub async fn create_post(&self, post: NewPost) -> Result<JsValue, JsValue> {
        invoke_wasm_rpc!(self.gated.create_post(post).await)
    }

    #[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
    pub async fn get_posts(&self, pagination: Pagination) -> Result<JsValue, JsValue> {
        invoke_wasm_rpc!(self.gated.get_posts(pagination).await)
    }

    #[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
    pub async fn create_discussion(&self, discussion: NewDiscussion) -> Result<JsValue, JsValue> {
        invoke_wasm_rpc!(self.gated.create_discussion(discussion).await)
    }

    #[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
    pub async fn get_discussions(&self, pagination: Pagination) -> Result<JsValue, JsValue> {
        invoke_wasm_rpc!(self.gated.get_discussions(pagination).await)
    }

    #[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
    pub async fn delete_post(&self, id: i32) -> Result<JsValue, JsValue> {
        invoke_wasm_rpc!(self.gated.delete_post(id).await)
    }

}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
pub struct MileraAuthClient {
    auth_url: String,
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
impl MileraAuthClient {
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(constructor))]
    pub async fn new(auth: String) -> MileraAuthClient {
        Self { auth_url: auth }
    }

    #[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
    pub async fn register_user(
        &self,
        username: &str,
        password: &str,
    ) -> Result<RegistrationResponse, JsValue> {
        http_post!(
            format!("{}", &self.auth_url),
            &serde_json::json!({
                "jsonrpc": "2.0",
                "method": "registerUser",
                "params": {
                  "username": username,
                  "password": password
                },
                "id": 1
            }),
            RegistrationResponse
        )
    }

    #[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
    pub async fn login_user(
        &self,
        username: &str,
        password: &str,
    ) -> Result<LoginResponse, JsValue> {
        let response = http_post!(
            format!("{}", &self.auth_url),
            &serde_json::json!({
                "jsonrpc": "2.0",
                "method": "loginUser",
                "params": {
                  "username": username,
                  "password": password
                },
                "id": 1
            }),
            LoginResponse
        );
        dbg!(&response);
        response
    }

}
