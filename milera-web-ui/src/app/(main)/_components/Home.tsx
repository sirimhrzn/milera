"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/logo";
import { MoreHorizontal } from "lucide-react";
import { TweetCard } from "./TweetCard";
import { TweetComposer } from "./TweetComposer";
import { BottomNavigation } from "./BottomNavigation";

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
    },
];

export function Home() {
    const [activeTab, setActiveTab] = useState("For you");

    return (
        <div className="min-h-screen bg-background container mx-auto">
            {/* Mobile Layout */}
            <div className="flex flex-col h-screen">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="flex items-center justify-between p-4">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="/diverse-user-avatars.png" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Logo className="w-8 h-8" />
                        <Button variant="ghost" size="sm" className="p-2">
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex border-b border-border">
                        {["For you", "Following"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                                    activeTab === tab
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    {/* Tweet Composer */}
                    <TweetComposer />

                    {/* Timeline */}
                    <div className="divide-y divide-border">
                        {mockTweets.map((tweet) => (
                            <TweetCard key={tweet.id} tweet={tweet} />
                        ))}
                    </div>
                </main>

                {/* Bottom Navigation */}
                <BottomNavigation activeTab="home" />
            </div>
        </div>
    );
}
