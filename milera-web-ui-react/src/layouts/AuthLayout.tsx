import Logo from "@/components/logo";
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link
                    to="/"
                    className="flex items-center gap-2 self-center font-medium text-xl md:text-2xl"
                >
                    <Logo />
                    <span>Milera</span>
                </Link>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
