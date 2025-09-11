/* tslint:disable */
/* eslint-disable */
export interface Post {
    id: number;
    created_by: number;
    anonymous: boolean;
    discussion_id: number;
    parent_post_id: number | undefined;
    content: string;
    created_at: DateTime<Utc>;
    updated_at: DateTime<Utc>;
}

export interface Discussion {
    id: number;
    title: string;
    description: string;
    location: string | undefined;
    lon: Decimal | undefined;
    lat: Decimal | undefined;
    location_detail: string | undefined;
    total_post_count: number;
    anonymous: boolean;
    created_by: number;
    created_date: DateTime<Utc>;
    updated_date: DateTime<Utc>;
}

export interface User {
    id: number;
    username: string;
    password: string;
}

export interface NewDiscussion {
    title: string;
    description: string;
    location: string | undefined;
    lon: Decimal | undefined;
    lat: Decimal | undefined;
    location_detail: string | undefined;
    anonymous: boolean;
}

export interface NewPost {
    discussion_id: number;
    parent_post_id: number | undefined;
    content: string;
    anonymous: boolean;
}

export interface RegistrationResponse {
    message: string;
    access_token: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string | undefined;
}

export interface Pagination {
    order_by: string | undefined;
    order_field: string | undefined;
    page: number;
    per_page: number;
}

export class MileraAuthClient {
  free(): void;
  constructor(auth: string);
  register_user(username: string, password: string): Promise<RegistrationResponse>;
  login_user(username: string, password: string): Promise<LoginResponse>;
}
export class MileraRpcClient {
  free(): void;
  constructor(gated_url: string);
  create_post(post: NewPost): Promise<any>;
  get_posts(pagination: Pagination): Promise<any>;
  create_discussion(discussion: NewDiscussion): Promise<any>;
  get_discussions(pagination: Pagination): Promise<any>;
  delete_post(id: number): Promise<any>;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_milerarpcclient_free: (a: number, b: number) => void;
  readonly milerarpcclient_new: (a: number, b: number) => any;
  readonly milerarpcclient_create_post: (a: number, b: any) => any;
  readonly milerarpcclient_get_posts: (a: number, b: any) => any;
  readonly milerarpcclient_create_discussion: (a: number, b: any) => any;
  readonly milerarpcclient_get_discussions: (a: number, b: any) => any;
  readonly milerarpcclient_delete_post: (a: number, b: number) => any;
  readonly __wbg_mileraauthclient_free: (a: number, b: number) => void;
  readonly mileraauthclient_new: (a: number, b: number) => any;
  readonly mileraauthclient_register_user: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly mileraauthclient_login_user: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly post_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => any;
  readonly post_createPost: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => any;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_4: WebAssembly.Table;
  readonly __wbindgen_export_5: WebAssembly.Table;
  readonly wasm_bindgen__convert__closures_____invoke__hee455712f4395a57: (a: number, b: number) => void;
  readonly closure269_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure368_externref_shim: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h1157dd7f943ccb3e: (a: number, b: number) => void;
  readonly closure394_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
