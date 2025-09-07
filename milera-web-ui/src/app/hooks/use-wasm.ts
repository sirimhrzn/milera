"use client";

import { useState, useEffect } from "react";
import init, {
    MileraConfig,
    MileraApi,
} from "../../../../web-js/milera_api.js";

export default function useMileraApi(url = "http://localhost:7777") {
    const [api, setApi] = useState<MileraApi | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initializeWasm() {
            try {
                setLoading(true);
                // Initialize the WebAssembly module
                await init();
                const config = new MileraConfig(url);
                const apiInstance = new MileraApi(config);
                setApi(apiInstance);
            } catch (err) {
                console.error("Failed to initialize WASM:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        initializeWasm();
    }, []);

    return { api, loading, error };
}
