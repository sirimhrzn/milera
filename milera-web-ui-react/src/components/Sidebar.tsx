import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
    Bell,
    Bookmark,
    Home,
    Mail,
    MoreHorizontal,
    Search,
    Settings,
    User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./logo";

export function Sidebar() {
    const location = useLocation();

    const navigationItems = [
        {
            icon: Home,
            label: "Home",
            path: "/",
        },
        {
            icon: Search,
            label: "Explore",
            path: "/explore",
        },
        {
            icon: Bell,
            label: "Notifications",
            path: "/notifications",
        },
        {
            icon: Mail,
            label: "Messages",
            path: "/messages",
        },
        {
            icon: Bookmark,
            label: "Bookmarks",
            path: "/bookmarks",
        },
        {
            icon: Settings,
            label: "Settings",
            path: "/settings",
        },
    ];

    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="w-65 h-screen sticky top-0 p-3 border-r border-border">
            <div className="flex flex-col h-full">
                <div className="mb-6 p-1">
                    <Link to={"/"} className="flex items-center space-x-3">
                        <Logo />
                        <span className="text-2xl font-bold text-primary hidden md:block">
                            Milera
                        </span>
                    </Link>
                </div>
                <nav className="flex-1 flex flex-col space-y-2">
                    {navigationItems.map((item) => (
                        <Link key={item.label} to={item.path}>
                            <div
                                className={cn(
                                    "flex items-center w-full p-2 md:p-4 rounded-full transition-colors duration-200",
                                    isActive(item.path)
                                        ? "text-black font-semibold"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                )}
                            >
                                <item.icon className="mr-3 size-6" />
                                <span className="text-xl">{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto mb-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center justify-between p-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div className="hidden xl:block">
                                        <p className="font-bold text-base text-black dark:text-white">
                                            John Doe
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            @johndoe
                                        </p>
                                    </div>
                                </div>
                                <MoreHorizontal className="w-5 h-5 text-black dark:text-white hidden xl:block" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem>
                                Add an existing account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Log out @johndoe
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
