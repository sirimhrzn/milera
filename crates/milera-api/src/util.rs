use js_sys::wasm_bindgen;
// not mine
use jsonrpsee_wasm_client::types::error::ErrorObjectOwned;

pub fn to_jsonrpsee_error_object(err: Option<impl ToString>, message: &str) -> ErrorObjectOwned {
    ErrorObjectOwned::owned(
        jsonrpsee_types::error::UNKNOWN_ERROR_CODE,
        message,
        err.map(|e| e.to_string()),
    )
}

pub fn to_jsonrpsee_error<T: ToString>(message: &'static str) -> impl Fn(T) -> ErrorObjectOwned {
    move |err: T| to_jsonrpsee_error_object(Some(err), message)
}

// impl Into<wasm_bindgen::JsValue> for ErrorObjectOwned {
//     fn into(self) -> wasm_bindgen::JsValue {
//         wasm_bindgen::JsValue::from_serde(&self).unwrap()
//     }
// }

// impl Into<serde_wasm_bindgen::Value> for ErrorObjectOwned {
//     fn into(self) -> serde_wasm_bindgen::Value {
//         to_value(&self).unwrap()
//     }
// }
