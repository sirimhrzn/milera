"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    ArrowLeftIcon,
    HeartIcon,
    MessageCircleIcon,
    MoreHorizontalIcon,
    RepeatIcon,
    ShareIcon,
    Verified,
} from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { TweetCard } from "../../_components/TweetCard";
import { TweetComposer } from "../../_components/TweetComposer";

type Params = Promise<{ id: string }>;

export default function TweetDetailPage({ params }: { params: Params }) {
    const tweetId = use(params).id;
    const [liked, setLiked] = useState(false);
    const [retweeted, setRetweeted] = useState(false);
    const [showReplyComposer, setShowReplyComposer] = useState(false);

    const tweet = {
        id: tweetId,
        user: {
            name: "Sarah Chen",
            username: "sarahchen",
            avatar: "/woman-portrait.png",
            verified: true,
        },
        content:
            "Just shipped a new feature that I'm really excited about! The team worked incredibly hard on this and I can't wait for everyone to try it out. What do you think? 🚀",
        timestamp: "2:34 PM · Dec 15, 2024",
        fullTimestamp: "2:34 PM · Dec 15, 2024 · 1.2M Views",
        likes: 1247,
        retweets: 89,
        replies: 156,
        views: 1200000,
        image: "/product-launch-celebration.jpg",
    };

    const replies = [
        {
            id: "reply1",
            user: {
                name: "Alex Rodriguez",
                username: "alexr",
                avatar: "/thoughtful-man-portrait.png",
            },
            content:
                "This looks amazing! Can't wait to try it out. When will it be available for everyone?",
            timestamp: "2h",
            likes: 23,
            retweets: 2,
            replies: 5,
            views: 10,
        },
        {
            id: "reply2",
            user: {
                name: "Emma Wilson",
                username: "emmaw",
                avatar: "/professional-woman.png",
            },
            content:
                "Congratulations on the launch! The UI looks really clean and intuitive.",
            timestamp: "1h",
            likes: 45,
            retweets: 8,
            replies: 2,
            views: 10,
        },
    ];

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="flex items-center gap-4 p-4">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="p-2">
                            <ArrowLeftIcon className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Post</h1>
                    </div>
                </div>
            </div>

            {/* Main Tweet */}
            <article className="p-4 border-b border-border">
                <div className="flex gap-3 mb-4">
                    <Link href={`/profile/${tweet.user.username}`}>
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src={tweet.user.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                                {tweet.user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                    <div className="flex-1">
                        <div className="flex items-center gap-1 mb-1">
                            <Link
                                href={`/profile/${tweet.user.username}`}
                                className="hover:underline"
                            >
                                <span className="font-bold text-foreground">
                                    {tweet.user.name}
                                </span>
                            </Link>
                            {tweet.user.verified && (
                                <Verified className="w-4 h-4 text-primary" />
                            )}
                        </div>
                        <Link
                            href={`/profile/${tweet.user.username}`}
                            className="hover:underline"
                        >
                            <span className="text-muted-foreground">
                                @{tweet.user.username}
                            </span>
                        </Link>
                    </div>
                    <Button variant="ghost" size="sm" className="p-2">
                        <MoreHorizontalIcon className="w-5 h-5" />
                    </Button>
                </div>

                <div className="mb-4">
                    <p className="text-foreground text-xl leading-relaxed mb-4">
                        {tweet.content}
                    </p>
                    {tweet.image && (
                        <div className="rounded-2xl overflow-hidden border border-border">
                            <img
                                src={tweet.image || "/placeholder.svg"}
                                alt="Tweet image"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="text-muted-foreground text-sm mb-4 pb-4 border-b border-border">
                    {tweet.fullTimestamp}
                </div>

                {/* Engagement Stats */}
                <div className="flex gap-6 py-3 border-b border-border">
                    <span className="text-sm">
                        <span className="font-bold text-foreground">
                            {formatNumber(tweet.retweets)}
                        </span>{" "}
                        <span className="text-muted-foreground">Reposts</span>
                    </span>
                    <span className="text-sm">
                        <span className="font-bold text-foreground">
                            {formatNumber(tweet.likes)}
                        </span>{" "}
                        <span className="text-muted-foreground">Likes</span>
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-around py-3 border-b border-border">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowReplyComposer(!showReplyComposer)}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10 p-3 rounded-full"
                    >
                        <MessageCircleIcon className="w-5 h-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setRetweeted(!retweeted)}
                        className={`flex items-center gap-2 p-3 rounded-full ${
                            retweeted
                                ? "text-green-500 hover:text-green-600 hover:bg-green-500/10"
                                : "text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
                        }`}
                    >
                        <RepeatIcon className="w-5 h-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setLiked(!liked)}
                        className={`flex items-center gap-2 p-3 rounded-full ${
                            liked
                                ? "text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                : "text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                        }`}
                    >
                        <HeartIcon
                            className={`w-5 h-5 ${liked ? "fill-current" : ""}`}
                        />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10 p-3 rounded-full"
                    >
                        <ShareIcon className="w-5 h-5" />
                    </Button>
                </div>
            </article>

            {/* Reply Composer */}
            {showReplyComposer && (
                <div className="border-b border-border">
                    <TweetComposer
                        placeholder={`Reply to @${tweet.user.username}`}
                        isReply={true}
                    />
                </div>
            )}

            {/* Replies */}
            <div>
                {replies.map((reply) => (
                    <TweetCard key={reply.id} tweet={reply} />
                ))}
            </div>
        </div>
    );
}
