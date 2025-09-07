#[cfg(target_family = "wasm")]
use wasm_bindgen::prelude::*;

use serde::{Deserialize, Serialize};

#[cfg_attr(
    target_family = "wasm",
    derive(tsify::Tsify),
    tsify(into_wasm_abi, from_wasm_abi)
)]
#[derive(Debug, Serialize, Deserialize)]
pub struct MileraConfig {
    pub api_url: String,
}

#[cfg_attr(target_family = "wasm", wasm_bindgen)]
impl MileraConfig {
    pub fn new(api_url: String) -> Self {
        Self { api_url }
    }
}
