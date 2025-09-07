"use client";

import Logo from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { TweetCard } from "./_components/TweetCard";
import { TweetComposer } from "./_components/TweetComposer";

const mockTweets = [
    {
        id: "0",
        user: {
            name: "Elon Musk",
            username: "elonmusk",
            avatar: "/elon-musk-portrait.png",
            verified: true,
        },
        content:
            "Just had a great conversation about the future of AI and sustainable energy. Exciting times ahead! 🚀",
        timestamp: "1h",
        likes: 12499,
        retweets: 3199,
        replies: 889,
        image: "/tesla-factory.jpg",
    },
    {
        id: "1",
        user: {
            name: "OpenAI",
            username: "OpenAI",
            avatar: "/abstract-geometric-logo.png",
            verified: true,
        },
        content:
            "Introducing our latest research on multimodal AI systems. This breakthrough could revolutionize how we interact with technology.",
        timestamp: "3h",
        likes: 8899,
        retweets: 2099,
        replies: 455,
    },
    {
        id: "2",
        user: {
            name: "Vercel",
            username: "vercel",
            avatar: "/vercel-logo.png",
            verified: true,
        },
        content:
            "Ship faster with our new deployment pipeline. Zero-config, maximum performance. Try it today!",
        timestamp: "5h",
        likes: 5599,
        retweets: 1199,
        replies: 233,
    },
];

export default function Home() {
    const [activeTab, setActiveTab] = useState("For you");

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Layout */}
            <div className="flex flex-col h-screen">
                {/* Header */}
                <header className="sticky top-1 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="flex items-center justify-between p-5">
                        <Avatar className="w-9 h-8">
                            <AvatarImage src="/diverse-user-avatars.png" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Logo className="w-9 h-8" />
                        <Button variant="ghost" size="sm" className="p-3">
                            <MoreHorizontal className="w-6 h-5" />
                        </Button>
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
                <main className="flex-2 overflow-y-auto">
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
