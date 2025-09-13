import { SideNavbar } from "@/components/SideNavbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto flex">
                <SideNavbar />
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
