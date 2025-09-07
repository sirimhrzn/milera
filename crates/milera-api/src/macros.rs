#[macro_export]
macro_rules! http_post {
    ($url: expr, $body:expr, $response: ident) => {{

        #[cfg(target_family = "wasm")]
        use reqwest_wasm as reqwest;

        let client = reqwest::Client::new();
        let res = client.post(&$url)
            .json($body)
            .send()
            .await?;

        Ok(res.json::<$response>().await?)

    }};
}
