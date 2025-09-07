use crate::dto::User;
use crate::error::ServerError;
use chrono::Local;
use jsonwebtoken::errors::Error;
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, TokenData, Validation};
use serde::{Deserialize, Serialize};
use std::ops::Add;
use std::time::Duration;
use tracing::event;
use tracing::Level;



#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub aud: Option<String>,
    pub exp: usize,
    pub sub: u32,
}

pub fn validate_jwt(token: &str) -> Result<TokenData<Claims>, Error> {
    let validations = get_validations();
    let jwt = decode::<Claims>(
        token,
        &DecodingKey::from_secret(std::env::var("JWT_SECRET").unwrap().as_ref()),
        &validations,
    )?;

    Ok(jwt)
}

fn get_validations() -> Validation {
    let validation = Validation::default();
    validation
}

pub fn generate_jwt(user: &User, exp: Option<usize>) -> Result<String, ServerError> {
    let now = Local::now().add(Duration::from_secs(86400));

    let claims = Claims {
        aud: None,
        exp: exp.unwrap_or(now.timestamp() as usize),
        sub: user.id,
    };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(std::env::var("JWT_SECRET").unwrap().as_ref()),
    )?;

    event!(
        Level::INFO,
        user = user.username,
        exp = &claims.exp,
        token = &token
    );
    Ok(token)
}

#[derive(Deserialize, Serialize, Clone, Debug, Default)]
pub struct AuthenticatedUser {
    pub user_id: i32,
}

// .0 is  access token and .1 is refresh token
// Add a mechanism to invalidate token
pub async fn authenticate_user(user: &User) -> Result<(String, Option<String>), ServerError> {
    let exp = Local::now().add(Duration::from_secs(86400)).timestamp() as usize;
    let token = generate_jwt(user, Some(exp))?;

    Ok((token, None))
}
