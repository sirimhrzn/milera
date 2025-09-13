import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { Login } from "./pages/(auth)/Login";
import { SignUp } from "./pages/(auth)/SignUp";
import Bookmarks from "./pages/Bookmarks";
import Explore from "./pages/Explore";
import { Home } from "./pages/Home";
import MessageDetails from "./pages/MessageDetails";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import PostDetails from "./pages/PostDetails";
import Settings from "./pages/Settings";
import { useAuthStore } from "./store/AuthStore";
import DiscussionDetails from "./pages/DiscussionDetails";

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
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/:slug" element={<DiscussionDetails />} />
                    <Route path="/post/:id" element={<PostDetails />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/messages/:id" element={<MessageDetails />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
