"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    ArrowLeftIcon,
    CalendarIcon,
    LinkIcon,
    LocationEdit,
    MoreHorizontalIcon,
    Verified,
} from "lucide-react";
import { useState } from "react";
import { TweetCard } from "../_components/TweetCard";

const mockUser = {
    name: "John Doe",
    username: "johndoe",
    bio: "Software Engineer | Tech Enthusiast | Building the future one line of code at a time 🚀",
    location: "San Francisco, CA",
    website: "johndoe.dev",
    joinDate: "March 2019",
    following: 1234,
    followers: 5678,
    avatar: "/diverse-user-avatars.png",
    banner: "/abstract-tech-banner.png",
    verified: false,
    tweets: 2847,
};

const mockUserTweets = [
    {
        id: "1",
        user: {
            name: "John Doe",
            username: "johndoe",
            avatar: "/diverse-user-avatars.png",
            verified: false,
        },
        content:
            "Just shipped a new feature! The feeling of seeing your code in production never gets old. What's everyone working on today?",
        timestamp: "3h",
        likes: 42,
        retweets: 8,
        replies: 12,
    },
    {
        id: "2",
        user: {
            name: "John Doe",
            username: "johndoe",
            avatar: "/diverse-user-avatars.png",
            verified: false,
        },
        content:
            "Hot take: The best code is the code you don't have to write. Sometimes the simplest solution is the most elegant one.",
        timestamp: "1d",
        likes: 156,
        retweets: 23,
        replies: 34,
    },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("Posts");
    const tabs = [
        "Posts",
        "Replies",
        "Highlights",
        "Videos",
        "Photos",
        "Articles",
        "Media",
        "Likes",
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="flex flex-col h-screen">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="flex items-center gap-4 p-4">
                        <Button variant="ghost" size="sm" className="p-2">
                            <ArrowLeftIcon className="w-5 h-5" />
                        </Button>
                        <div className="flex-1">
                            <h1 className="font-bold text-xl">
                                {mockUser.name}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {mockUser.tweets.toLocaleString()} posts
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" className="p-2">
                            <MoreHorizontalIcon className="w-5 h-5" />
                        </Button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Profile Header */}
                    <div className="relative">
                        {/* Banner */}
                        <div className="h-48 bg-muted">
                            <img
                                src={mockUser.banner || "/placeholder.svg"}
                                alt="Profile banner"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Profile Info */}
                        <div className="px-4 pb-4">
                            {/* Avatar and Edit Button */}
                            <div className="flex justify-between items-end mb-4">
                                <Avatar className="w-24 h-24 -mt-12 border-4 border-background">
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
                                <Button
                                    variant="outline"
                                    className="mt-4 font-bold bg-transparent"
                                >
                                    Edit profile
                                </Button>
                            </div>

                            {/* User Info */}
                            <div className="space-y-3">
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h2 className="text-xl font-bold">
                                            {mockUser.name}
                                        </h2>
                                        {mockUser.verified && (
                                            <Verified className="w-5 h-5 text-primary" />
                                        )}
                                    </div>
                                    <p className="text-muted-foreground">
                                        @{mockUser.username}
                                    </p>
                                </div>

                                <p className="text-foreground leading-relaxed">
                                    {mockUser.bio}
                                </p>

                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    {mockUser.location && (
                                        <div className="flex items-center gap-1">
                                            <LocationEdit className="w-4 h-4" />
                                            <span>{mockUser.location}</span>
                                        </div>
                                    )}
                                    {mockUser.website && (
                                        <div className="flex items-center gap-1">
                                            <LinkIcon className="w-4 h-4" />
                                            <a
                                                href={`https://${mockUser.website}`}
                                                className="text-primary hover:underline"
                                            >
                                                {mockUser.website}
                                            </a>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>Joined {mockUser.joinDate}</span>
                                    </div>
                                </div>

                                {/* Follow Stats */}
                                <div className="flex gap-4 text-sm">
                                    <button className="hover:underline">
                                        <span className="font-bold text-foreground">
                                            {mockUser.following.toLocaleString()}
                                        </span>
                                        <span className="text-muted-foreground ml-1">
                                            Following
                                        </span>
                                    </button>
                                    <button className="hover:underline">
                                        <span className="font-bold text-foreground">
                                            {mockUser.followers.toLocaleString()}
                                        </span>
                                        <span className="text-muted-foreground ml-1">
                                            Followers
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-b border-border">
                        <div className="flex overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-shrink-0 px-4 py-4 text-sm font-medium transition-colors relative ${
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
                    </div>

                    {/* Content */}
                    <div className="divide-y divide-border">
                        {activeTab === "Posts" &&
                            mockUserTweets.map((tweet) => (
                                <TweetCard key={tweet.id} tweet={tweet} />
                            ))}
                        {activeTab !== "Posts" && (
                            <div className="p-8 text-center">
                                <p className="text-muted-foreground">
                                    No {activeTab.toLowerCase()} yet
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
