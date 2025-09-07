use serde_json::error;
#[cfg(target_family = "wasm")]
use wasm_bindgen::prelude::*;

#[cfg(target_family = "wasm")]
use tsify::{Tsify, declare};

#[cfg_attr(
    target_family = "wasm",
    derive(tsify::Tsify, serde::Serialize, serde::Deserialize),
    tsify(into_wasm_abi, from_wasm_abi)
)]
#[derive(Debug, thiserror::Error)]
pub enum ApiError {
    #[error("Library not initialized")]
    LibraryUninitialized,

    #[error("Status code: {status_code}, Message: {message}")]
    RequestError { status_code: u16, message: String },

    #[error("Network error")]
    NetworkError,

    #[error("HTTP error: {0}")]
    HttpError(String),

    #[error("Parse error: {0}")]
    ParseError(String),
    #[error("JSON error: {0}")]
    JsonError(String),

}

#[cfg(target_family = "wasm")]
impl From<serde_json::Error> for ApiError {
    fn from(err: serde_json::Error) -> Self {
        ApiError::JsonError(err.to_string())
    }
}
