use crate::MileraConfig;
use serde::{Deserialize, Serialize};
use milera_common::response::RegistrationResponse;
use crate::error::ApiError;

#[cfg(target_family = "wasm")]
use wasm_bindgen::prelude::*;

#[cfg_attr(
    target_family = "wasm",
    derive(tsify::Tsify),
    tsify(into_wasm_abi, from_wasm_abi),
)]
#[derive(Debug, Serialize, Deserialize)]
pub struct MileraApi {
    config: MileraConfig
}


#[cfg_attr(target_family = "wasm", wasm_bindgen)]
impl MileraApi {

    pub fn new(config: MileraConfig) -> Self {
        Self { config }
    }

    pub fn register_user(&self, username: &str, password: &str) -> Result<RegistrationResponse, ApiError> {
        let request_body = serde_json::json!({
            "username": username,
            "password": password
        }).to_string();

        let mut request = ehttp::Request::post(&self.config.api_url, request_body.into_bytes());
        request.headers.insert("Content-Type".to_string(), "application/json".to_string());

        let (tx, rx) = std::sync::mpsc::channel();

        ehttp::fetch(request, move |response| {
            tx.send(response).ok();
        });

        let response = rx.recv().map_err(|_| ApiError::NetworkError)?;
        let response = response.map_err(|e| ApiError::HttpError(e.to_string()))?;

        if !response.ok {
            return Err(ApiError::HttpError(format!("HTTP {}", response.status)));
        }

        let response_text = String::from_utf8(response.bytes)
            .map_err(|_| ApiError::ParseError("Invalid UTF-8".to_string()))?;

        let registration_response: RegistrationResponse = serde_json::from_str(&response_text)
            .map_err(|e| ApiError::ParseError(e.to_string()))?;

        Ok(registration_response)
    }

}
