import { Button } from "@/components/ui/button";
import { Bell, Home, MailIcon, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BottomNavigationProps {
    activeTab?: string;
}

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
    const { pathname } = useLocation();

    const getActiveTab = () => {
        if (pathname === "/") return "home";
        if (pathname.startsWith("/search")) return "search";
        if (pathname.startsWith("/notifications")) return "notifications";
        if (pathname.startsWith("/messages")) return "messages";
        if (pathname.startsWith("/profile")) return "profile";
        return activeTab || "";
    };

    const currentTab = getActiveTab();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
            <div className="flex items-center justify-between py-2 px-4 lg:px-0 max-w-5xl mx-auto">
                <Link to="/">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex flex-col items-center gap-1 p-2"
                    >
                        <Home
                            className={`w-6 h-6 ${
                                currentTab === "home"
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            }`}
                        />
                    </Button>
                </Link>
                <Link to="/search">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex flex-col items-center gap-1 p-2"
                    >
                        <Search
                            className={`w-6 h-6 ${
                                currentTab === "search"
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            }`}
                        />
                    </Button>
                </Link>
                <Link to="/notifications">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex flex-col items-center gap-1 p-2"
                    >
                        <Bell
                            className={`w-6 h-6 ${
                                currentTab === "notifications"
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            }`}
                        />
                    </Button>
                </Link>
                <Link to="/messages">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex flex-col items-center gap-1 p-2"
                    >
                        <MailIcon
                            className={`w-6 h-6 ${
                                currentTab === "messages"
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            }`}
                        />
                    </Button>
                </Link>
                <Link to="/profile">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex flex-col items-center gap-1 p-2"
                    >
                        <User
                            className={`w-6 h-6 ${
                                currentTab === "profile"
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            }`}
                        />
                    </Button>
                </Link>
            </div>
        </nav>
    );
}
