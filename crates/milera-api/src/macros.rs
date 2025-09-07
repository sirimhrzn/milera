#[macro_export]
macro_rules! http_post {
    ($url: expr, $body:expr, $response: ident) => {{
        let request_body = $body;

        let mut request = ehttp::Request::post($url, request_body.into_bytes());
        request
            .headers
            .insert("Content-Type".to_string(), "application/json".to_string());

        let (tx, rx) = std::sync::mpsc::channel();

        ehttp::fetch(request, move |response| {
            tx.send(response).ok();
        });

        let response = rx.recv().map_err(|_| ApiError::NetworkError)?;
        let response = response.map_err(|e| ApiError::HttpError(e.to_string()))?;

        if !response.ok {
            return Err(ApiError::HttpError(format!("HTTP {}", response.status)));
        }

        let response_text = String::from_utf8(response.bytes)
            .map_err(|_| ApiError::ParseError("Invalid UTF-8".to_string()))?;

        let registration_response: $response = serde_json::from_str(&response_text)
            .map_err(|e| ApiError::ParseError(e.to_string()))?;

        Ok(registration_response)
    }};
}
