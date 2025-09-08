
use crate::util::to_jsonrpsee_error;

// use jsonrpsee::{core::{client::ClientT, RpcResult}, rpc_params};

use js_sys::wasm_bindgen::{self, JsValue};
// pub use jsonrpsee_core::client::Client;
use jsonrpsee_wasm_client::Client;

use jsonrpsee_core::{client::MiddlewareBatchResponse, rpc_params, traits::ToRpcParams, ClientError, RpcResult};
use jsonrpsee_client_transport::web;
use jsonrpsee_core::client::ClientT;
use serde::Serialize;

use std::time::Duration;

use wasm_bindgen::prelude::*;


use milera_common::response::RegistrationResponse;
#[cfg(target_family = "wasm")]
use wasm_bindgen::prelude::*;
// use jsonrpsee::;


#[wasm_bindgen]
pub struct MileraRpcClient {
    c: Client
}

#[wasm_bindgen]
impl MileraRpcClient {

        #[wasm_bindgen(constructor)]
        pub async fn new(url: &str) -> MileraRpcClient {
            let (sender, receiver) = web::connect(url).await.map_err(to_jsonrpsee_error("failed to connect")).unwrap();
            let client = Client::builder()
                .build_with_wasm(sender, receiver);
            Self { c: client }
        }

        async fn make_request<T>(&self, method: &str, params: jsonrpsee_core::params::ArrayParams) -> Result<T, ClientError>
        where
            T: Serialize + for<'de> serde::Deserialize<'de>
        {
            let response: T = self.c
                .request(method, params)
                .await?;
            Ok(response)
        }
}

#[wasm_bindgen]
impl MileraRpcClient {

    #[wasm_bindgen]
    pub async fn register_user(&self, username: &str, password: &str) -> Result<RegistrationResponse, JsValue> {
        let response = self.make_request::<RegistrationResponse>("register", rpc_params![username, password])
            .await
            .map_err(to_jsonrpsee_error("failed to register user"))
            .map_err(|e| serde_wasm_bindgen::to_value(&e).unwrap())?;
        Ok(response)
    }
}
