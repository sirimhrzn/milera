use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};

#[cfg(feature = "wasm-client")]
use wasm_bindgen::prelude::*;

#[cfg_attr(
    feature = "wasm-client",
    derive(tsify::Tsify),
    tsify(into_wasm_abi, from_wasm_abi)
)]
#[derive(Debug, Serialize, Deserialize)]
pub struct NewDiscussion {
    pub title: String,
    pub description: String,
    pub location: Option<String>,
    pub lon: Option<Decimal>,
    pub lat: Option<Decimal>,
    pub location_detail: Option<String>,
    pub anonymous: bool,
}

#[cfg_attr(
    feature = "wasm-client",
    derive(tsify::Tsify),
    tsify(into_wasm_abi, from_wasm_abi)
)]
#[derive(Debug, Serialize, Deserialize)]
pub struct NewPost {
    pub discussion_id: i32,
    pub parent_post_id: Option<i32>,
    pub content: String,
    pub anonymous: bool,
}
