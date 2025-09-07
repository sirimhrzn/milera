use crate::error::ApiError;
use crate::{MileraConfig, http_post};
use milera_common::response::{LoginResponse, RegistrationResponse};
use serde::{Deserialize, Serialize};

#[cfg(target_family = "wasm")]
use wasm_bindgen::prelude::*;

#[cfg_attr(
    target_family = "wasm",
    derive(tsify::Tsify),
    tsify(into_wasm_abi, from_wasm_abi)
)]
#[derive(Debug, Serialize, Deserialize)]
pub struct MileraApi {
    config: MileraConfig,
}

#[cfg_attr(target_family = "wasm", wasm_bindgen)]
impl MileraApi {
    pub fn new(config: MileraConfig) -> Self {
        Self { config }
    }

    #[cfg_attr(target_family = "wasm", wasm_bindgen)]
    pub fn register_user(
        &self,
        username: &str,
        password: &str,
    ) -> Result<RegistrationResponse, ApiError> {
        http_post!(
            format!("{}/api/auth/register", &self.config.api_url),
            serde_json::json!({
                "username": username,
                "password": password
            })
            .to_string(),
            RegistrationResponse
        )
    }

    #[cfg_attr(target_family = "wasm", wasm_bindgen)]
    pub fn login_user(&self, username: &str, password: &str) -> Result<LoginResponse, ApiError> {
        http_post!(
            format!("{}/api/auth/login", &self.config.api_url),
            serde_json::json!({
                "username": username,
                "password": password
            })
            .to_string(),
            LoginResponse
        )
    }

}
