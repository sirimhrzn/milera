use crate::app::AppState;
use crate::db::get_user;
use crate::error::ServerError;
use crate::utils::jwt::{validate_jwt, AuthenticatedUser};
use axum::extract::{Request, State};
use axum::middleware::Next;
use axum::response::Response;
use std::sync::Arc;

pub async fn authentication(
    State(state): State<Arc<AppState>>,
    mut request: Request,
    next: Next,
) -> Result<Response, ServerError> {
    if let Some(Ok(bearer_token)) = request.headers().get("Authorization").map(|t| t.to_str()) {
        let b = bearer_token.split(" ").collect::<Vec<&str>>();
        if b.len() < 2 || b.len() > 2 {
            return Err(ServerError::Unauthorized);
        }
        let token_data = validate_jwt(b[1]).map_err(|_| ServerError::Unauthorized)?;

        let user_id = get_user(state.clone(), token_data.claims.sub as i32)
            .await?
            .id;

        let auth_user = AuthenticatedUser{
            user_id: user_id as i32
        };

        *request
            .extensions_mut()
            .get_mut::<AuthenticatedUser>()
            .unwrap() = auth_user;

    } else {
        return Err(ServerError::Unauthorized);
    }

    let resp = next.run(request).await;
    Ok(resp)
}
