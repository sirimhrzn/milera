use serde::{Deserialize, Serialize};

pub mod auth;
pub mod discussion;
pub mod middleware;
pub mod post;

#[derive(Debug, Deserialize, Serialize)]
pub struct Pagination {
    pub order_by: Option<String>,
    pub order_field: Option<String>,
    pub page: u32,
    pub per_page: u32,
}

impl Pagination {
    pub fn new(page: u32, per_page: u32) -> Self {
        Self {
            order_by: None,
            order_field: None,
            page: page.max(1),
            per_page: per_page.clamp(1, 100),
        }
    }

    pub fn offset(&self) -> u32 {
        (self.page - 1) * self.per_page
    }
}
