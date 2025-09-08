use jsonrpsee::{core::RpcResult, proc_macros::rpc};

use crate::response::RegistrationResponse;


#[cfg_attr(feature = "server", rpc(server))]
#[cfg_attr(feature = "client", rpc(client))]
pub trait MileraApi {
    #[method(name = "registerUser")]
    async fn register_user(&self, username: &str, password: &str) -> RpcResult<RegistrationResponse>;
}
