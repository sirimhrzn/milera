use crate::{
    app::AppState,
    db::{create_discussion as create_discussion_db, find_all},
    error::ServerError,
};
use milera_common::request::NewDiscussion;
use milera_common::{models::Discussion, rpc::AuthenticatedUser, utils::Pagination};
use std::sync::Arc;

pub async fn create_discussion(
    state: Arc<AppState>,
    user: &AuthenticatedUser,
    payload: NewDiscussion,
) -> Result<Discussion, ServerError> {
    let discussion = create_discussion_db(state.db.as_ref(), payload, user.user_id).await?;
    Ok(discussion)
}

pub async fn get_discussions(
    state: Arc<AppState>,
    user: &AuthenticatedUser,
    pagination: Option<Pagination>,
) -> Result<Vec<Discussion>, ServerError> {
    let discussions =
        find_all::<Discussion, i32>(state.db.as_ref(), "SELECT * from discussions ", pagination)
            .await?
            .into_iter()
            .map(|mut discussion| {
                if discussion.anonymous {
                    discussion.created_by = 0;
                }
                discussion
            })
            .collect::<Vec<_>>();

    Ok(discussions)
}
