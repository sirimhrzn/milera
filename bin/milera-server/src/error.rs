use axum::Json;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Serialize;
use thiserror::Error;
use tracing::error;
use jsonrpsee::types::ErrorObjectOwned;

#[derive(Debug, Error)]
pub enum ServerError {
    #[error("something went wrong")]
    DefaultError,
    #[error("app state failed ")]
    AppState(ErrorResponse),
    #[error("non-existent error")]
    DBError(ErrorResponse),
    #[error("sql error: {0}")]
    SQLxError(#[from] sqlx::Error),
    #[error("bcrypt error: {0}")]
    BcryptError(#[from] bcrypt::BcryptError),
    #[error("custom-error")]
    CustomError(ErrorResponse),
    #[error("chrono-error: {0}")]
    ChronoError(#[from] chrono::ParseError),
    #[error("serde_json-error: {0}")]
    SerdeJsonError(#[from] serde_json::Error),
    #[error("jsonwebtoken error: {0}")]
    JsonWebTokenError(#[from] jsonwebtoken::errors::Error),
    #[error("no db connection recieved from crate::app::state::DB_CONNECTION")]
    NoDbConnection,
    #[error("requested entity not found")]
    EntityNotFound,
    #[error("int parse error")]
    ParseIntError(#[from] std::num::ParseIntError),
    #[error("Form body rejected: {0}")]
    FormRejection(#[from] axum::extract::rejection::FormRejection),
    #[error("Json body rejected: {0}")]
    JsonRejection(#[from] axum::extract::rejection::JsonRejection),
    #[error("To str error: {0}")]
    ToStrError(#[from] axum::http::header::ToStrError),
    #[error("Axum error: {0}")]
    AxumError(#[from] axum::Error),
    #[error("Axum Http Error: {0}")]
    AxumHttpError(#[from] axum::http::Error),
    #[error("Invalid credential")]
    InvalidCredential,
    #[error("Unauthorized")]
    Unauthorized,
    #[error("Invalid User")]
    InvalidUser,
    #[error("Missing data in field: {0}")]
    MissingField(String),
    #[error("Not found")]
    NotFound,
    #[error("JsonRpsee error: {0}")]
    JsonRpsee(String),
}

// not mine
pub fn to_jsonrpsee_error_object(err: Option<impl ToString>, message: &str) -> ErrorObjectOwned {
    ErrorObjectOwned::owned(
        jsonrpsee::types::error::UNKNOWN_ERROR_CODE,
        message,
        err.map(|e| e.to_string()),
    )
}

pub fn to_jsonrpsee_error<T: ToString>(message: &'static str) -> impl Fn(T) -> ErrorObjectOwned {
    move |err: T| to_jsonrpsee_error_object(Some(err), message)
}

#[derive(Debug, Serialize, Clone)]
pub struct ErrorResponse {
    pub error_code: u32,
    #[serde(rename = "message")]
    pub reason: String,
}
