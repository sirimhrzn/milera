use bcrypt::{hash, DEFAULT_COST};
use milera_common::response::RegistrationResponse;
use tracing::field::DebugValue;

use crate::{app::AppState, db::create_user, error::ServerError, utils::jwt::generate_jwt};
use std::sync::Arc;


pub async fn register_user(state: Arc<AppState>, username: &str, password: &str) -> Result<RegistrationResponse, ServerError> {

    let user = create_user(state.clone(), username, &hash(password, DEFAULT_COST)?, None).await?;
    let token = generate_jwt(&user, None)?;

    Ok(
        RegistrationResponse {
            message: "User created successfully".to_string(),
            access_token: token,
        }
    )
}
