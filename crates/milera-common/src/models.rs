use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};

#[cfg_attr(feature = "server", derive(sqlx::FromRow))]
#[cfg_attr(
    feature = "wasm",
    derive(tsify::Tsify),
    tsify(into_wasm_abi, from_wasm_abi)
)]
#[derive(Debug, Serialize, Deserialize)]
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

#[cfg_attr(feature = "server", derive(sqlx::FromRow))]
#[cfg_attr(
    feature = "wasm",
    derive(tsify::Tsify),
    tsify(into_wasm_abi, from_wasm_abi)
)]
#[derive(Debug, Serialize, Deserialize)]
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
