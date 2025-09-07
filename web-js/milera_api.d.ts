/* tslint:disable */
/* eslint-disable */
export function register_user(api: MileraApi): Promise<RegistrationResponse>;
export type ApiError = "LibraryUninitialized" | { RequestError: { status_code: number; message: string } } | "NetworkError" | { HttpError: string } | { ParseError: string } | { JsonError: string };

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

export class MileraApi {
  free(): void;
  constructor(config: MileraConfig);
  register_user(username: string, password: string): Promise<RegistrationResponse>;
  login_user(username: string, password: string): Promise<LoginResponse>;
}
export class MileraConfig {
  free(): void;
  constructor(api_url: string);
  readonly api_url: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_mileraapi_free: (a: number, b: number) => void;
  readonly mileraapi_new: (a: number) => number;
  readonly mileraapi_register_user: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly mileraapi_login_user: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly register_user: (a: number) => any;
  readonly __wbg_mileraconfig_free: (a: number, b: number) => void;
  readonly mileraconfig_new: (a: number, b: number) => number;
  readonly mileraconfig_api_url: (a: number) => [number, number];
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_4: WebAssembly.Table;
  readonly __wbindgen_export_5: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly closure89_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure198_externref_shim: (a: number, b: number, c: any, d: any) => void;
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
