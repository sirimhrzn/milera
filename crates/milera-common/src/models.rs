use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};

#[cfg(feature = "wasm-client")]
use wasm_bindgen::prelude::*;

#[cfg_attr(feature = "server", derive(sqlx::FromRow))]
#[cfg_attr(
    feature = "wasm-client",
    derive(tsify::Tsify),
    tsify(into_wasm_abi, from_wasm_abi)
)]
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Post {
    pub id: i32,
    pub created_by: i32,
    pub anonymous: bool,
    pub discussion_id: i32,
    pub parent_post_id: Option<i32>,
    pub content: String,
    pub created_at: DateTime<Utc>, // Slight inconsistency in naming
    pub updated_at: DateTime<Utc>,
}

#[cfg_attr(feature = "wasm-client", wasm_bindgen)]
impl Post {
    pub fn new(
        id: i32,
        created_by: i32,
        anonymous: bool,
        discussion_id: i32,
        parent_post_id: i32,
        content: String,
    ) -> Self {
        Post {
            id,
            created_by,
            anonymous,
            discussion_id,
            parent_post_id: Some(parent_post_id),
            content,
            created_at: Utc::now(),
            updated_at: Utc::now(),
        }
    }

    // JavaScript-friendly constructor
    #[cfg_attr(feature = "wasm-client", wasm_bindgen(js_name = createPost))]
    pub fn create_post(
        id: i32,
        created_by: i32,
        anonymous: bool,
        discussion_id: i32,
        parent_post_id: i32,
        content: String,
    ) -> Post {
        Self::new(
            id,
            created_by,
            anonymous,
            discussion_id,
            parent_post_id,
            content,
        )
    }
}

#[cfg_attr(feature = "server", derive(sqlx::FromRow))]
#[cfg_attr(
    feature = "wasm-client",
    derive(tsify::Tsify),
    tsify(into_wasm_abi, from_wasm_abi)
)]
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Discussion {
    pub id: i32,
    pub title: String,
    pub description: String,
    pub location: Option<String>,
    pub lon: Option<Decimal>,
    pub lat: Option<Decimal>,
    pub location_detail: Option<String>,
    pub total_post_count: i32,
    pub anonymous: bool,
    pub created_by: i32,
    pub created_date: DateTime<Utc>,
    pub updated_date: DateTime<Utc>,
}

#[cfg_attr(feature = "server", derive(sqlx::FromRow))]
#[cfg_attr(
    feature = "wasm-client",
    derive(tsify::Tsify),
    tsify(into_wasm_abi, from_wasm_abi)
)]
#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
}
