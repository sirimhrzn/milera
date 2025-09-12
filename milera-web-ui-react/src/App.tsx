import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import { Login } from "./pages/(auth)/Login";
import { SignUp } from "./pages/(auth)/SignUp";

import { useAuthStore } from "./store/AuthStore";
import { Home } from "./pages/Home";

function App() {
    const { initializeFromCookies } = useAuthStore();

    useEffect(() => {
        initializeFromCookies();
    }, [initializeFromCookies]);

    return (
        <>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
