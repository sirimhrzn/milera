import * as wasm from "./milera_api_bg.wasm";
export * from "./milera_api_bg.js";
import { __wbg_set_wasm } from "./milera_api_bg.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
