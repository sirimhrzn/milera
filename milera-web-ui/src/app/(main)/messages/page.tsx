"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MailIcon, SearchIcon, SettingsIcon } from "lucide-react";
import { BottomNavigation } from "../_components/BottomNavigation";
import Link from "next/link";

const conversations = [
    {
        id: 1,
        user: {
            name: "Sarah Johnson",
            username: "sarahj",
            avatar: "/diverse-woman-portrait.png",
        },
        lastMessage: "Thanks for sharing that article! Really insightful.",
        timestamp: "2m",
        unread: true,
    },
    {
        id: 2,
        user: {
            name: "Tech News",
            username: "technews",
            avatar: "/interconnected-tech.png",
        },
        lastMessage: "Breaking: New AI breakthrough announced",
        timestamp: "1h",
        unread: false,
    },
    {
        id: 3,
        user: {
            name: "Mike Chen",
            username: "mikechen",
            avatar: "/thoughtful-man.png",
        },
        lastMessage: "Let's catch up soon!",
        timestamp: "3h",
        unread: false,
    },
    {
        id: 4,
        user: {
            name: "Design Team",
            username: "designteam",
            avatar: "/abstract-design-elements.png",
        },
        lastMessage: "New mockups are ready for review",
        timestamp: "1d",
        unread: true,
    },
];

export function MessagesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredConversations = conversations.filter(
        (conv) =>
            conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-10">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-xl font-bold">Messages</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                            <SettingsIcon className="w-5 h-5" />
                        </Button>
                        <Link href="/messages/compose">
                            <Button variant="ghost" size="sm">
                                <MailIcon className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Search */}
            <div className="p-4 border-b border-border">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search Direct Messages"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-muted/50 border-0 rounded-full"
                    />
                </div>
            </div>

            {/* Conversations List */}
            <div className="pb-20">
                {filteredConversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                        <MailIcon className="w-16 h-16 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            No messages found
                        </h3>
                        <p className="text-muted-foreground text-center">
                            {searchQuery
                                ? "Try a different search term"
                                : "Start a conversation to see your messages here"}
                        </p>
                    </div>
                ) : (
                    filteredConversations.map((conversation) => (
                        <Link
                            key={conversation.id}
                            href={`/messages/${conversation.id}`}
                        >
                            <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border/50">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage
                                        src={
                                            conversation.user.avatar ||
                                            "/placeholder.svg"
                                        }
                                    />
                                    <AvatarFallback>
                                        {conversation.user.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-sm">
                                                {conversation.user.name}
                                            </span>
                                            <span className="text-muted-foreground text-sm">
                                                @{conversation.user.username}
                                            </span>
                                        </div>
                                        <span className="text-muted-foreground text-sm">
                                            {conversation.timestamp}
                                        </span>
                                    </div>
                                    <p
                                        className={`text-sm truncate ${
                                            conversation.unread
                                                ? "font-medium"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        {conversation.lastMessage}
                                    </p>
                                </div>
                                {conversation.unread && (
                                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                )}
                            </div>
                        </Link>
                    ))
                )}
            </div>

            <BottomNavigation activeTab="messages" />
        </div>
    );
}
