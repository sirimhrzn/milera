#[macro_export]
macro_rules! http_post {
    ($url: expr, $body:expr, $response: ident) => {{
        #[cfg(target_arch = "wasm32")]
        use {
            js_sys::wasm_bindgen::{self, JsValue},
            reqwest_wasm as reqwest,
        };

        use serde::{Deserialize, Serialize};

        let client = reqwest::Client::new();
        let res = client
            .post(&$url)
            .json($body)
            .send()
            .await
            .map_err(|e| JsValue::from_str(&e.to_string()))?;

        #[derive(Deserialize)]
        struct JsonRpcResponse {
            jsonrpc: String,
            result: $response,
            id: u32,
        }

        Ok(res.json::<JsonRpcResponse>().await?.result)
    }};
}

#[macro_export]
macro_rules! invoke_wasm_rpc {
    ($call:expr) => {{
        let response = $call
            .map_err(to_jsonrpsee_error("failed"))
            .map_err(|e| serde_wasm_bindgen::to_value(&e).unwrap())?;
        Ok(serde_wasm_bindgen::to_value(&response).unwrap())
    }};
}
