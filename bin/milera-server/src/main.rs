mod server;
mod app;
mod error;
mod api;
mod db;
mod utils;
mod dto;

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
