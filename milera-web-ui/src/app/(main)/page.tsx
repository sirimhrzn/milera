"use client";

import Logo from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { TweetCard } from "./_components/TweetCard";
import { TweetComposer } from "./_components/TweetComposer";
import Link from "next/link";

const mockTweets = [
    {
        id: "1",
        user: {
            name: "Elon Musk",
            username: "elonmusk",
            avatar: "/elon-musk-portrait.png",
            verified: true,
        },
        content:
            "Just had a great conversation about the future of AI and sustainable energy. Exciting times ahead! 🚀",
        timestamp: "2h",
        likes: 12500,
        retweets: 3200,
        replies: 890,
        views: 45600,
        image: "/tesla-factory.jpg",
    },
    {
        id: "2",
        user: {
            name: "OpenAI",
            username: "OpenAI",
            avatar: "/abstract-geometric-logo.png",
            verified: true,
        },
        content:
            "Introducing our latest research on multimodal AI systems. This breakthrough could revolutionize how we interact with technology.",
        timestamp: "4h",
        likes: 8900,
        retweets: 2100,
        replies: 456,
        views: 23400,
    },
    {
        id: "3",
        user: {
            name: "Vercel",
            username: "vercel",
            avatar: "/vercel-logo.png",
            verified: true,
        },
        content:
            "Ship faster with our new deployment pipeline. Zero-config, maximum performance. Try it today!",
        timestamp: "6h",
        likes: 5600,
        retweets: 1200,
        replies: 234,
        views: 18900,
    },
    {
        id: "4",
        user: {
            name: "OpenAI",
            username: "OpenAI",
            avatar: "/abstract-geometric-logo.png",
            verified: true,
        },
        content:
            "Introducing our latest research on multimodal AI systems. This breakthrough could revolutionize how we interact with technology.",
        timestamp: "4h",
        likes: 8900,
        retweets: 2100,
        replies: 456,
        views: 23400,
    },
    {
        id: "5",
        user: {
            name: "Vercel",
            username: "vercel",
            avatar: "/vercel-logo.png",
            verified: true,
        },
        content:
            "Ship faster with our new deployment pipeline. Zero-config, maximum performance. Try it today!",
        timestamp: "6h",
        likes: 5600,
        retweets: 1200,
        replies: 234,
        views: 18900,
    },
];

export default function Home() {
    const [activeTab, setActiveTab] = useState("For you");

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Layout */}
            <div className="flex flex-col min-h-screen">
                {/* Header */}
                <header className="sticky top-1 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="relative flex items-center p-5">
                        {/* Avatar on the left */}
                        <Link href="/profile">
                            <Avatar className="w-7 h-6 md:w-9 md:h-8 flex-shrink-0">
                                <AvatarImage src="/diverse-user-avatars.png" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </Link>

                        {/* Logo and Milera centered absolutely */}
                        <Link
                            href="/"
                            className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2 text-xl md:text-3xl font-bold"
                        >
                            <Logo className="w-9 h-8 flex-shrink-0" />
                            <span className="whitespace-nowrap hidden sm:inline-block">
                                Milera
                            </span>
                        </Link>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex border-b border-border">
                        {["For you", "Following"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-2 py-4 text-sm font-medium transition-colors relative ${
                                    activeTab === tab
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-2">
                    {/* Tweet Composer */}
                    <TweetComposer />

                    {/* Timeline */}
                    <div className="divide-y divide-border">
                        {mockTweets.map((tweet) => (
                            <TweetCard key={tweet.id} tweet={tweet} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
