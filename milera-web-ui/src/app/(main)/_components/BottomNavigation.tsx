"use client";

import { Button } from "@/components/ui/button";
import { Bell, Home, MailIcon, Search, User } from "lucide-react";
import Link from "next/link";

interface BottomNavigationProps {
    activeTab?: string;
}

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
    return (
        <nav className="sticky bottom-0 bg-background border-t border-border">
            <div className="flex items-center justify-around py-2">
                <Link href="/">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex flex-col items-center gap-1 p-2"
                    >
                        <Home
                            className={`w-6 h-6 ${
                                activeTab === "home"
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
                                activeTab === "search"
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
                                activeTab === "notifications"
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
                                activeTab === "messages"
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
                                activeTab === "profile"
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
