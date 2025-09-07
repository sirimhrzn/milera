#[cfg(target_family = "wasm")]
use wasm_bindgen::prelude::*;

use serde::{Deserialize, Serialize};

#[cfg_attr(
    target_family = "wasm",
    wasm_bindgen
)]
#[derive(Debug, Serialize, Deserialize)]
pub struct MileraConfig {
    api_url: String,
}

#[cfg_attr(target_family = "wasm", wasm_bindgen)]
impl MileraConfig {

    #[cfg_attr(target_family = "wasm", wasm_bindgen(constructor))]
    pub fn new(api_url: String) -> Self {
        Self { api_url }
    }

    #[cfg_attr(target_family = "wasm", wasm_bindgen(getter))]
    pub fn api_url(&self) -> String {
        self.api_url.clone()
    }
}
