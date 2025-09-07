use sqlx::{Row, FromRow};
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use rust_decimal::Decimal;

#[derive(Debug, Clone, FromRow, Serialize, Deserialize)]
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

// Struct for creating new discussions (without auto-generated fields)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewDiscussion {
    pub title: String,
    pub description: String,
    pub location: Option<String>,
    pub lon: Option<Decimal>,
    pub lat: Option<Decimal>,
    pub location_detail: Option<String>,
    pub anonymous: bool,
    pub created_by: i32,
}

// Struct for updating discussions (all fields optional except id)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpdateDiscussion {
    pub id: i32,
    pub title: Option<String>,
    pub description: Option<String>,
    pub location: Option<String>,
    pub lon: Option<Decimal>,
    pub lat: Option<Decimal>,
    pub location_detail: Option<String>,
    pub anonymous: Option<bool>,
}

impl Discussion {
    // Create a new discussion
    pub async fn create(
        pool: &sqlx::PgPool,
        new_discussion: NewDiscussion,
    ) -> Result<Discussion, sqlx::Error> {
        let discussion = sqlx::query_as!(
            Discussion,
            r#"
            INSERT INTO discussions (title, description, location, lon, lat, location_detail, anonymous, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            "#,
            new_discussion.title,
            new_discussion.description,
            new_discussion.location,
            new_discussion.lon,
            new_discussion.lat,
            new_discussion.location_detail,
            new_discussion.anonymous,
            new_discussion.created_by
        )
        .fetch_one(pool)
        .await?;

        Ok(discussion)
    }

    // Find discussion by ID
    pub async fn find_by_id(
        pool: &sqlx::PgPool,
        id: i32,
    ) -> Result<Option<Discussion>, sqlx::Error> {
        let discussion = sqlx::query_as!(
            Discussion,
            "SELECT * FROM discussions WHERE id = $1",
            id
        )
        .fetch_optional(pool)
        .await?;

        Ok(discussion)
    }

    // Get all discussions
    pub async fn find_all(pool: &sqlx::PgPool) -> Result<Vec<Discussion>, sqlx::Error> {
        let discussions = sqlx::query_as!(
            Discussion,
            "SELECT * FROM discussions ORDER BY created_date DESC"
        )
        .fetch_all(pool)
        .await?;

        Ok(discussions)
    }

    // Find discussions by user
    pub async fn find_by_user(
        pool: &sqlx::PgPool,
        user_id: i32,
    ) -> Result<Vec<Discussion>, sqlx::Error> {
        let discussions = sqlx::query_as!(
            Discussion,
            "SELECT * FROM discussions WHERE created_by = $1 ORDER BY created_date DESC",
            user_id
        )
        .fetch_all(pool)
        .await?;

        Ok(discussions)
    }

    // Find discussions by location (within radius)
    pub async fn find_by_location(
        pool: &sqlx::PgPool,
        center_lat: Decimal,
        center_lon: Decimal,
        radius_km: f64,
    ) -> Result<Vec<Discussion>, sqlx::Error> {
        let discussions = sqlx::query_as!(
            Discussion,
            r#"
            SELECT * FROM discussions
            WHERE lat IS NOT NULL
            AND lon IS NOT NULL
            AND (
                6371 * acos(
                    cos(radians($1::float)) * cos(radians(lat::float)) *
                    cos(radians(lon::float) - radians($2::float)) +
                    sin(radians($1::float)) * sin(radians(lat::float))
                )
            ) <= $3
            ORDER BY created_date DESC
            "#,
            center_lat,
            center_lon,
            radius_km
        )
        .fetch_all(pool)
        .await?;

        Ok(discussions)
    }

    // Update discussion
    pub async fn update(
        pool: &sqlx::PgPool,
        update_data: UpdateDiscussion,
    ) -> Result<Option<Discussion>, sqlx::Error> {
        let discussion = sqlx::query_as!(
            Discussion,
            r#"
            UPDATE discussions
            SET
                title = COALESCE($2, title),
                description = COALESCE($3, description),
                location = COALESCE($4, location),
                lon = COALESCE($5, lon),
                lat = COALESCE($6, lat),
                location_detail = COALESCE($7, location_detail),
                anonymous = COALESCE($8, anonymous),
                updated_date = NOW()
            WHERE id = $1
            RETURNING *
            "#,
            update_data.id,
            update_data.title,
            update_data.description,
            update_data.location,
            update_data.lon,
            update_data.lat,
            update_data.location_detail,
            update_data.anonymous
        )
        .fetch_optional(pool)
        .await?;

        Ok(discussion)
    }

    // Delete discussion
    pub async fn delete(pool: &sqlx::PgPool, id: i32) -> Result<bool, sqlx::Error> {
        let result = sqlx::query!("DELETE FROM discussions WHERE id = $1", id)
            .execute(pool)
            .await?;

        Ok(result.rows_affected() > 0)
    }

    // Increment post count
    pub async fn increment_post_count(
        pool: &sqlx::PgPool,
        id: i32,
    ) -> Result<Option<Discussion>, sqlx::Error> {
        let discussion = sqlx::query_as!(
            Discussion,
            r#"
            UPDATE discussions
            SET total_post_count = total_post_count + 1,
                updated_date = NOW()
            WHERE id = $1
            RETURNING *
            "#,
            id
        )
        .fetch_optional(pool)
        .await?;

        Ok(discussion)
    }

    // Decrement post count
    pub async fn decrement_post_count(
        pool: &sqlx::PgPool,
        id: i32,
    ) -> Result<Option<Discussion>, sqlx::Error> {
        let discussion = sqlx::query_as!(
            Discussion,
            r#"
            UPDATE discussions
            SET total_post_count = GREATEST(0, total_post_count - 1),
                updated_date = NOW()
            WHERE id = $1
            RETURNING *
            "#,
            id
        )
        .fetch_optional(pool)
        .await?;

        Ok(discussion)
    }
}
