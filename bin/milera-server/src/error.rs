use axum::Json;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Serialize;
use thiserror::Error;
use tracing::error;

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
}

#[derive(Debug, Serialize, Clone)]
pub struct ErrorResponse {
    pub error_code: u32,
    #[serde(rename = "message")]
    pub reason: String,
}

impl IntoResponse for ServerError {
    fn into_response(self) -> Response {
        let error_response: (StatusCode, ErrorResponse) = match self {
            ServerError::DefaultError => (
                StatusCode::INTERNAL_SERVER_ERROR,
                ErrorResponse {
                    error_code: 500,
                    reason: "Something went wrong".to_string(),
                },
            ),
            ServerError::AppState(ref app_state_err) => {
                (StatusCode::INTERNAL_SERVER_ERROR, app_state_err.clone())
            }

            ServerError::SQLxError(ref err) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                ErrorResponse {
                    error_code: 521,
                    reason: format!("{}", err),
                },
            ),
            ServerError::CustomError(ref err) => (StatusCode::INTERNAL_SERVER_ERROR, err.clone()),
            ServerError::JsonWebTokenError(ref err) => (
                StatusCode::UNAUTHORIZED,
                ErrorResponse {
                    error_code: 401,
                    reason: format!("{}", err),
                },
            ),
            ServerError::EntityNotFound => (
                StatusCode::BAD_REQUEST,
                ErrorResponse {
                    error_code: 400,
                    reason: "requested entity not found".to_string(),
                },
            ),
            ServerError::InvalidCredential => (
                StatusCode::BAD_REQUEST,
                ErrorResponse {
                    error_code: 401,
                    reason: self.to_string(),
                },
            ),
            ServerError::Unauthorized => (
                StatusCode::UNAUTHORIZED,
                ErrorResponse {
                    error_code: 401,
                    reason: self.to_string(),
                },
            ),

            ServerError::NotFound => (
                StatusCode::NOT_FOUND,
                ErrorResponse {
                    error_code: 404,
                    reason: "Not found".to_string(),
                },
            ),
            _ => (
                StatusCode::INTERNAL_SERVER_ERROR,
                ErrorResponse {
                    error_code: 500,
                    reason: "Something went wrong".to_string(),
                },
            ),
        };
        error!("{}: {}", self, &error_response.1.reason);
        (error_response.0, Json(error_response.1)).into_response()
    }
}
