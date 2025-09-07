"use client";

import { useState, useEffect } from "react";

export default function useWasm() {
    const [wasm, setWasm] = useState<any>(null);
    useEffect(() => {
        async function loadWasm() {
            try {
                const wasmModule = await import(
                    "../../../../web-js/milera_api.js"
                );
                setWasm(wasmModule);
            } catch (err) {
                console.error("Failed to load WASM:", err);
            }
        }
        loadWasm();
    }, []);
    return wasm;
}
