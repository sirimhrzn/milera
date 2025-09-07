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
}

// #[cfg(target_family = "wasm")]
// impl From<reqwest::Error> for ApiError {
//     fn from(err: reqwest::Error) -> Self {
//         ApiError::RequestError {
//             status_code: err.status().unwrap_or(StatusCode::INTERNAL_SERVER_ERROR).as_u16(),
//             message: err.to_string(),
//         }
//     }
// }

// #[cfg(target_family = "wasm")]
// impl From<jiff::Error> for ApiError {
//     fn from(err: jiff::Error) -> Self {
//         ApiError::DateParseError {
//             message: err.to_string()
//         }
//     }
// }
