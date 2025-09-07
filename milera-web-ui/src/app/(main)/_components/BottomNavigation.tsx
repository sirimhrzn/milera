"use client";

import { Button } from "@/components/ui/button";
import { Bell, Home, MailIcon, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavigationProps {
    activeTab?: string;
}

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
    const pathname = usePathname();

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
            <div className="flex items-center justify-between py-2 px-4 lg:px-0 container mx-auto">
                <Link href="/">
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
                <Link href="/search">
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
                <Link href="/notifications">
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
                <Link href="/messages">
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
                <Link href="/profile">
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
