import { Sidebar } from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto flex">
                <Sidebar />
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
