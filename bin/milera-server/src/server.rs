use crate::app::AppState;
use crate::rpc::{MileraAuthServer, MileraRpcServer};
use crate::utils::jwt::validate_jwt;
use jsonrpsee::core::middleware::{
    Batch, BatchEntry, BatchEntryErr, Notification, ResponseFuture, RpcServiceBuilder, RpcServiceT,
};
use jsonrpsee::server::{Server, ServerHandle};
use jsonrpsee::types::{ErrorObject, Request};
use jsonrpsee::{Extensions, MethodResponse};
use milera_common::rpc::MileraAuthenticationServer;
use std::sync::Arc;

use jsonrpsee::core::http_helpers::{Request as HttpRequest, Response as HttpResponse};
use milera_common::rpc::{AuthenticatedUser, MileraGatedServer};
use std::task::{Context, Poll};
use tower::{Layer, Service};

pub async fn main() -> anyhow::Result<()> {
    let app = Arc::new(AppState::new().await?);
    let _ = run_server(app.clone()).await?;
    Ok(())
}
async fn run_server(app: Arc<AppState>) -> anyhow::Result<()> {
    let state = app.clone();

    let auth_handle = tokio::spawn(async move {
        match start_auth_service(app.clone()).await {
            Ok(handle) => {
                let _ = tokio::signal::ctrl_c().await;
                let _ = handle.stop();
            }
            Err(err) => {
                eprintln!("Error starting auth service: {}", err);
                std::process::exit(1);
            }
        }
    });

    let gated_handle = tokio::spawn(async move {
        match start_gated_service(state).await {
            Ok(handle) => {
                let _ = tokio::signal::ctrl_c().await;
                let _ = handle.stop();
            }
            Err(err) => {
                eprintln!("Error starting gated service: {}", err);
                std::process::exit(1);
            }
        }
    });

    let _ = tokio::join!(auth_handle, gated_handle);

    Ok(())
}

async fn start_auth_service(app: Arc<AppState>) -> anyhow::Result<ServerHandle> {
    let server = Server::builder().build("0.0.0.0:7778").await?;

    let rpc = MileraAuthServer::new(app.clone());
    let module = rpc.into_rpc();

    println!(
        "Authentication service available methods: {:?}",
        module.method_names().collect::<Vec<_>>()
    );

    let addr = server.local_addr()?;
    let handle = server.start(module);
    println!("Authentication service listening on {}", addr);
    Ok(handle)
}

// This ws service requires authentication
async fn start_gated_service(app: Arc<AppState>) -> anyhow::Result<ServerHandle> {
    let rpc_middleware =
        tower::ServiceBuilder::new().layer_fn(|service| Authenticator::new(service));

    let server = Server::builder()
        .set_http_middleware(rpc_middleware)
        .set_rpc_middleware(RpcServiceBuilder::new().layer_fn(|s| Authorizer::new(s)))
        .build("0.0.0.0:7777")
        .await?;

    let rpc = MileraRpcServer::new(app.clone());
    let module = rpc.into_rpc();

    println!(
        "Gated service available methods: {:?}",
        module.method_names().collect::<Vec<_>>()
    );

    let addr = server.local_addr()?;
    let handle = server.start(module);
    println!("Gated service listening on {}", addr);
    Ok(handle)
}

#[derive(Clone)]
struct Authenticator<S> {
    service: S,
}

impl<S> Authenticator<S> {
    fn new(service: S) -> Self {
        Authenticator { service }
    }
}

impl<S> Layer<S> for Authenticator<S> {
    type Service = Authenticator<S>;

    fn layer(&self, service: S) -> Self::Service {
        Authenticator { service }
    }
}

impl<S> Service<HttpRequest> for Authenticator<S>
where
    S: Service<HttpRequest, Response = HttpResponse>,
{
    type Response = HttpResponse;
    type Error = S::Error;
    type Future = S::Future;

    fn poll_ready(&mut self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
        self.service.poll_ready(cx)
    }

    fn call(&mut self, mut req: HttpRequest) -> Self::Future {
        let query_params: std::collections::HashMap<String, String> = req
            .uri()
            .query()
            .map(|q| serde_qs::from_str(q).unwrap_or_default())
            .unwrap_or_default();

        if let Some(token) = query_params.get("token") {
            if let Ok(claims) = validate_jwt(token) {
                req.extensions_mut().insert(AuthenticatedUser {
                    user_id: claims.claims.sub,
                });
            }
        }
        self.service.call(req)
    }
}

#[derive(Clone)]
pub struct Authorizer<S> {
    service: S,
}

impl<S> Authorizer<S> {
    fn new(service: S) -> Self {
        Self { service }
    }
    // Currently, the http middleware checks the query param for `token` then
    // inserts the `AuthenticatedUser` extension. The RPC middleware authorized
    // based on it's existence. We shall move to closing the connection on multiple failures or even a single.
    fn authenticate(&self, ext: &Extensions) -> bool {
        ext.get::<AuthenticatedUser>().is_some()
    }
}

impl<S> RpcServiceT for Authorizer<S>
where
    S: RpcServiceT<
            MethodResponse = MethodResponse,
            BatchResponse = MethodResponse,
            NotificationResponse = MethodResponse,
        > + Send
        + Sync
        + Clone
        + 'static,
{
    type MethodResponse = S::MethodResponse;
    type NotificationResponse = S::NotificationResponse;
    type BatchResponse = S::BatchResponse;

    fn call<'a>(&self, req: Request<'a>) -> impl Future<Output = Self::MethodResponse> + Send + 'a {
        if !self.authenticate(&req.extensions) {
            ResponseFuture::ready(MethodResponse::error(
                req.id,
                ErrorObject::borrowed(-32000, "Unauthorized", None),
            ))
        } else {
            ResponseFuture::future(self.service.call(req))
        }
    }

    fn batch<'a>(
        &self,
        mut batch: Batch<'a>,
    ) -> impl Future<Output = Self::BatchResponse> + Send + 'a {
        if !self.authenticate(&batch.extensions()) {
            //XXX
            for entry in batch.iter_mut() {
                let id = match entry {
                    Ok(BatchEntry::Call(req)) => req.id.clone(),
                    Ok(BatchEntry::Notification(_)) => continue,
                    Err(_) => continue,
                };
                *entry = Err(BatchEntryErr::new(
                    id,
                    ErrorObject::borrowed(-32000, "Unauthorized", None),
                ));
            }
        }

        self.service.batch(batch)
    }

    fn notification<'a>(
        &self,
        n: Notification<'a>,
    ) -> impl Future<Output = Self::NotificationResponse> + Send + 'a {
        if !self.authenticate(&n.extensions) {
            ResponseFuture::ready(MethodResponse::notification())
        } else {
            ResponseFuture::future(self.service.notification(n))
        }
    }
}
