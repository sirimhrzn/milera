/* tslint:disable */
/* eslint-disable */
export type ApiError = "LibraryUninitialized" | { RequestError: { status_code: number; message: string } } | "NetworkError" | { HttpError: string } | { ParseError: string };

export interface MileraApi {
    config: MileraConfig;
}

export interface MileraConfig {
    api_url: string;
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

