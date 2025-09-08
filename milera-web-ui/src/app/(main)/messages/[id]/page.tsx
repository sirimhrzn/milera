"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowLeftIcon,
    Image,
    MoreHorizontalIcon,
    Smile,
    Sticker,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { use, useEffect, useRef, useState } from "react";

type Params = Promise<{ id: string }>;

const mockUser = {
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "/diverse-woman-portrait.png",
};

const mockMessages = [
    {
        id: 1,
        text: "Hey! How's your day going?",
        timestamp: "2:30 PM",
        isOwn: false,
    },
    {
        id: 2,
        text: "Pretty good! Just finished a big project. How about you?",
        timestamp: "2:32 PM",
        isOwn: true,
    },
    {
        id: 3,
        text: "That's awesome! I'm working on something similar. Would love to hear about your approach.",
        timestamp: "2:33 PM",
        isOwn: false,
    },
    {
        id: 4,
        text: "I'd be happy to share. The key was breaking it down into smaller components.",
        timestamp: "2:35 PM",
        isOwn: true,
    },
    {
        id: 5,
        text: "Thanks for sharing that article! Really insightful.",
        timestamp: "2:45 PM",
        isOwn: false,
    },
];

export default function ChatPage({ params }: { params: Params }) {
    const chatId = use(params).id;
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(mockMessages);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                isOwn: true,
            };
            setMessages([...messages, newMessage]);
            setMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-10">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Link href="/messages">
                            <Button variant="ghost" size="sm">
                                <ArrowLeftIcon className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src={mockUser.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>{mockUser.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="font-semibold text-sm">
                                {mockUser.name}
                            </h1>
                            <p className="text-muted-foreground text-xs">
                                @{mockUser.username}
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm">
                        <MoreHorizontalIcon className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${
                            msg.isOwn ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[80%] ${
                                msg.isOwn ? "order-2" : "order-1"
                            }`}
                        >
                            {!msg.isOwn && (
                                <Avatar className="w-6 h-6 mb-1">
                                    <AvatarImage
                                        src={
                                            mockUser.avatar ||
                                            "/placeholder.svg"
                                        }
                                    />
                                    <AvatarFallback>
                                        {mockUser.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={`rounded-2xl px-4 py-2 ${
                                    msg.isOwn
                                        ? "bg-primary text-primary-foreground ml-2"
                                        : "bg-muted text-foreground mr-2"
                                }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 px-2">
                                {msg.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-background">
                <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                        <Input
                            placeholder="Start a new message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="pr-12 rounded-full border-muted-foreground/20"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <Image className="w-4 h-4 text-muted-foreground" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <Sticker className="w-4 h-4 text-muted-foreground" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <Smile className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>
                    <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        size="sm"
                        className="rounded-full h-10 w-10 p-0"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}
