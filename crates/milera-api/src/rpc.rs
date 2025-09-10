use crate::util::to_jsonrpsee_error;

use jsonrpsee_core::client::ClientT;
use jsonrpsee_core::{ClientError, rpc_params};
use milera_common::models::Post;
use milera_common::response::RegistrationResponse;
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
    auth: Client,
    gated: Client,
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
impl MileraRpcClient {
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(constructor))]
    pub async fn new(auth_url: &str, gated_url: &str) -> MileraRpcClient {
        let (sender, receiver) = web::connect(auth_url)
            .await
            .map_err(to_jsonrpsee_error("failed to connect"))
            .unwrap();

        let auth_client = Client::builder().build_with_wasm(sender, receiver);

        let (sender, receiver) = web::connect(gated_url)
            .await
            .map_err(to_jsonrpsee_error("failed to connect"))
            .unwrap();

        let gated_client = Client::builder().build_with_wasm(sender, receiver);

        Self {
            auth: auth_client,
            gated: gated_client,
        }
    }

    async fn make_request<T>(
        &self,
        method: &str,
        params: jsonrpsee_core::params::ArrayParams,
    ) -> Result<T, ClientError>
    where
        T: Serialize + for<'de> serde::Deserialize<'de>,
    {
        let response: T = self.gated.request(method, params).await?;
        Ok(response)
    }
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
impl MileraRpcClient {
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
    pub async fn register_user(
        &self,
        username: &str,
        password: &str,
    ) -> Result<RegistrationResponse, JsValue> {
        let response = self
            .make_request::<RegistrationResponse>("registerUser", rpc_params![username, password])
            .await
            .map_err(to_jsonrpsee_error("Failed to register user."))
            .map_err(|e| serde_wasm_bindgen::to_value(&e).unwrap())?;
        Ok(response)
    }

    #[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
    pub async fn get_posts(&self) -> Result<(), JsValue> {
        let response = self
            .make_request::<Vec<Post>>("getPosts", rpc_params![])
            .await
            .map_err(to_jsonrpsee_error("Failed to get posts."))
            .map_err(|e| serde_wasm_bindgen::to_value(&e).unwrap())?;
        Ok(())
    }

    #[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
    pub async fn get_posts(&self) -> Result<(), JsValue> {
        let response = self
            .make_request::<Vec<Post>>("getPosts", rpc_params![])
            .await
            .map_err(to_jsonrpsee_error("Failed to get posts."))
            .map_err(|e| serde_wasm_bindgen::to_value(&e).unwrap())?;
        Ok(())
    }
}
