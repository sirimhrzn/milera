("use client");

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
import { TweetCard } from "../../_components/TweetCard";

interface ProfilePageProps {
    params: {
        username: string;
    };
}

const mockUsers: Record<string, any> = {
    elonmusk: {
        name: "Elon Musk",
        username: "elonmusk",
        bio: "CEO of Tesla, SpaceX, and X. Building the future of sustainable transport and space exploration.",
        location: "Austin, Texas",
        website: "tesla.com",
        joinDate: "June 2009",
        following: 104,
        followers: 150000000,
        avatar: "/elon-musk-portrait.png",
        banner: "/tesla-factory.jpg",
        verified: true,
        tweets: 25847,
    },
    vercel: {
        name: "Vercel",
        username: "vercel",
        bio: "Develop. Preview. Ship. The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
        location: "San Francisco, CA",
        website: "vercel.com",
        joinDate: "April 2015",
        following: 1234,
        followers: 567890,
        avatar: "/vercel-logo.png",
        banner: "/modern-tech-gradient.jpg",
        verified: true,
        tweets: 8934,
    },
};

export default function UserProfilePage({ params }: ProfilePageProps) {
    const { username } = params;
    const [activeTab, setActiveTab] = useState("Posts");
    const [isFollowing, setIsFollowing] = useState(false);
    const tabs = ["Posts", "Replies", "Highlights", "Media", "Likes"];

    const user = mockUsers[username] || {
        name: "User Not Found",
        username: username,
        bio: "This user doesn't exist.",
        following: 0,
        followers: 0,
        avatar: "/placeholder.svg",
        banner: "/placeholder.svg",
        verified: false,
        tweets: 0,
    };

    const mockTweets =
        username === "elonmusk"
            ? [
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
              ]
            : [];

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
                            <h1 className="font-bold text-xl">{user.name}</h1>
                            <p className="text-sm text-muted-foreground">
                                {user.tweets.toLocaleString()} posts
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
                                src={user.banner || "/placeholder.svg"}
                                alt="Profile banner"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Profile Info */}
                        <div className="px-4 pb-4">
                            {/* Avatar and Follow Button */}
                            <div className="flex justify-between items-end mb-4">
                                <Avatar className="w-24 h-24 -mt-12 border-4 border-background">
                                    <AvatarImage
                                        src={user.avatar || "/placeholder.svg"}
                                    />
                                    <AvatarFallback>
                                        {user.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex gap-2 mt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="p-2 bg-transparent"
                                    >
                                        <MoreHorizontalIcon className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant={
                                            isFollowing ? "outline" : "default"
                                        }
                                        onClick={() =>
                                            setIsFollowing(!isFollowing)
                                        }
                                        className="font-bold px-6"
                                    >
                                        {isFollowing ? "Following" : "Follow"}
                                    </Button>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="space-y-3">
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h2 className="text-xl font-bold">
                                            {user.name}
                                        </h2>
                                        {user.verified && (
                                            <Verified className="w-5 h-5 text-primary" />
                                        )}
                                    </div>
                                    <p className="text-muted-foreground">
                                        @{user.username}
                                    </p>
                                </div>

                                <p className="text-foreground leading-relaxed">
                                    {user.bio}
                                </p>

                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    {user.location && (
                                        <div className="flex items-center gap-1">
                                            <LocationEdit className="w-4 h-4" />
                                            <span>{user.location}</span>
                                        </div>
                                    )}
                                    {user.website && (
                                        <div className="flex items-center gap-1">
                                            <LinkIcon className="w-4 h-4" />
                                            <a
                                                href={`https://${user.website}`}
                                                className="text-primary hover:underline"
                                            >
                                                {user.website}
                                            </a>
                                        </div>
                                    )}
                                    {user.joinDate && (
                                        <div className="flex items-center gap-1">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span>Joined {user.joinDate}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Follow Stats */}
                                <div className="flex gap-4 text-sm">
                                    <button className="hover:underline">
                                        <span className="font-bold text-foreground">
                                            {user.following.toLocaleString()}
                                        </span>
                                        <span className="text-muted-foreground ml-1">
                                            Following
                                        </span>
                                    </button>
                                    <button className="hover:underline">
                                        <span className="font-bold text-foreground">
                                            {user.followers.toLocaleString()}
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
                            mockTweets.length > 0 &&
                            mockTweets.map((tweet) => (
                                <TweetCard key={tweet.id} tweet={tweet} />
                            ))}
                        {(activeTab !== "Posts" || mockTweets.length === 0) && (
                            <div className="p-8 text-center">
                                <p className="text-muted-foreground">
                                    {mockTweets.length === 0
                                        ? "No posts yet"
                                        : `No ${activeTab.toLowerCase()} yet`}
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
