#[macro_export]
macro_rules! http_post {
    ($url: expr, $body:expr, $response: ident) => {{
        #[cfg(target_arch = "wasm32")]
        use {
            js_sys::wasm_bindgen::{self, JsValue},
            reqwest_wasm as reqwest,
        };

        let client = reqwest::Client::new();
        let res = client
            .post(&$url)
            .json($body)
            .send()
            .await
            .map_err(|e| JsValue::from_str(&e.to_string()))?;

        Ok(res.json::<$response>().await?)
    }};
}
