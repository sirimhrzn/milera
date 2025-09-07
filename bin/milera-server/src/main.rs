mod api;
mod app;
mod db;
mod dto;
mod error;
mod server;
mod utils;

use server::start as start_http_server;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_writer(std::io::stdout)
        .json()
        .compact()
        .init();

    start_http_server().await.unwrap();
}
