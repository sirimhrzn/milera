use std::net::SocketAddr;

use jsonrpsee::core::client::ClientT;
use jsonrpsee::http_client::HttpClient;
use jsonrpsee::rpc_params;
use jsonrpsee::server::{RpcModule, Server};
use milera_common::response::RegistrationResponse;
use milera_common::rpc::MileraApiServer;
use tracing_subscriber::util::SubscriberInitExt;
use std::sync::Arc;

use crate::app::AppState;
use crate::error::ServerError;
use crate::rpc::MileraServer;

pub async fn main() -> anyhow::Result<()> {
	// let filter = tracing_subscriber::EnvFilter::try_from_default_env()?
		// .add_directive("jsonrpsee[method_call{name = \"say_hello\"}]=trace".parse()?);
	// tracing_subscriber::FmtSubscriber::builder().with_env_filter(filter).finish().try_init()?;

	let app = Arc::new(AppState::new().await?);
	let server_addr = run_server(app.clone()).await?;
	// let url = format!("http://{}", server_addr);

	// let client = HttpClient::builder().build(url)?;
	// let params = rpc_params!["siriri".to_string(), "mahasdklj".to_string()];
	// let response: Result<RegistrationResponse, _> = client.request("registerUser", params).await;

	// match response {
	// 	Ok(response) => println!("{}", response.access_token),
	// 	Err(err) => tracing::error!("Error: {:?}", err),
	// }
	// tracing::info!("r: {:?}", response);

	Ok(())
}

async fn run_server(app: Arc<AppState>) -> anyhow::Result<SocketAddr> {
	let server = Server::builder().build("127.0.0.1:7777".parse::<SocketAddr>()?).await?;
	let rpc = MileraServer::new(app.clone());
	let module = rpc.into_rpc();

	println!("Available methods: {:?}", module.method_names().collect::<Vec<_>>());

	let addr = server.local_addr()?;
	let handle = server.start(module);

	// In this example we don't care about doing shutdown so let's it run forever.
	// You may use the `ServerHandle` to shut it down or manage it yourself.
	// tokio::spawn(handle.stopped());

	tokio::signal::ctrl_c().await?;
	handle.stop()?;

	Ok(addr)
}
