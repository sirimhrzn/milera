use bcrypt::{DEFAULT_COST, hash};
use milera_common::response::{LoginResponse, RegistrationResponse};

use crate::{
    app::AppState,
    db::{check_if_exists, create_user, get_user},
    error::ServerError,
    utils::jwt::{authenticate_user, generate_jwt},
};
use std::sync::Arc;

pub async fn register_user(
    state: Arc<AppState>,
    username: &str,
    password: &str,
) -> Result<RegistrationResponse, ServerError> {
    let user = create_user(
        state.clone(),
        username,
        &hash(password, DEFAULT_COST)?,
        None,
    )
    .await?;
    let token = generate_jwt(&user, None)?;

    Ok(RegistrationResponse {
        message: "User created successfully".to_string(),
        access_token: token,
    })
}

pub async fn login_user(
    state: Arc<AppState>,
    username: &str,
    password: &str,
) -> Result<LoginResponse, ServerError> {
    let id = check_if_exists::<String, i32>(
        state.db.as_ref(),
        "users",
        "username",
        "id",
        &username.to_string(),
    )
    .await?;
    let user = get_user(state, id).await?;
    if !bcrypt::verify(password, &user.password)? {
        return Err(ServerError::InvalidCredential);
    }

    let response = authenticate_user(&user).await?;

    Ok(LoginResponse {
        access_token: response.0,
        refresh_token: response.1,
    })
}
