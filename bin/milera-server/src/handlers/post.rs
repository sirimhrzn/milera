use crate::{
    app::AppState,
    db::{create_post as create_post_db, find_all},
    error::ServerError,
};
use milera_common::models::Post;
use milera_common::request::NewPost;
use std::sync::Arc;

use milera_common::rpc::AuthenticatedUser;
use milera_common::utils::Pagination;

pub async fn create_post(
    state: Arc<AppState>,
    user: &AuthenticatedUser,
    new_post: NewPost,
) -> Result<Post, ServerError> {
    let post = create_post_db(state.db.as_ref(), new_post, user.user_id).await?;
    Ok(post)
}

pub async fn get_posts(
    state: Arc<AppState>,
    user: AuthenticatedUser,
    pagination: Option<Pagination>,
) -> Result<Vec<Post>, ServerError> {
    let posts = find_all::<Post, i32>(
        state.db.as_ref(),
        "SELECT * from posts ",
        pagination,
        // None,
    )
    .await?
    .into_iter()
    .map(|mut post| {
        if post.anonymous {
            post.created_by = 0;
        }
        post
    })
    .collect::<Vec<_>>();

    Ok(posts)
}

pub async fn delete_post(
    state: Arc<AppState>,
    user: &AuthenticatedUser,
    post_id: i32,
) -> Result<(), ServerError> {
    // let _ =  db_execute(state.db.as_ref(), "DELETE FROM posts WHERE id = $1", vec![QueryFilter::new("id", id)]).await?;

    Ok(())
}
