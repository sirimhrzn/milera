"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Heart,
    MessageCircle,
    MoreHorizontal,
    Repeat,
    Share,
    Verified,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Tweet {
    id: string;
    user: {
        name: string;
        username: string;
        avatar: string;
        verified?: boolean;
    };
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
    replies: number;
    image?: string;
}

interface TweetCardProps {
    tweet: Tweet;
}

export function TweetCard({ tweet }: TweetCardProps) {
    const [liked, setLiked] = useState(false);
    const [retweeted, setRetweeted] = useState(false);

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    };

    const handleTweetClick = (e: React.MouseEvent) => {
        // Don't navigate if clicking on interactive elements
        if ((e.target as HTMLElement).closest("button, a")) {
            return;
        }
        window.location.href = `/tweet/${tweet.id}`;
    };

    return (
        <article
            className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={handleTweetClick}
        >
            <div className="flex gap-3">
                {/* Avatar */}
                <Link
                    href={`/profile/${tweet.user.username}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage
                            src={tweet.user.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>{tweet.user.name[0]}</AvatarFallback>
                    </Avatar>
                </Link>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-1 mb-1">
                        <Link
                            href={`/profile/${tweet.user.username}`}
                            className="hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="font-bold text-foreground truncate">
                                {tweet.user.name}
                            </span>
                        </Link>
                        {tweet.user.verified && (
                            <Verified className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                        <Link
                            href={`/profile/${tweet.user.username}`}
                            className="hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="text-muted-foreground truncate">
                                @{tweet.user.username}
                            </span>
                        </Link>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground flex-shrink-0">
                            {tweet.timestamp}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto p-1 h-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Tweet Content */}
                    <div className="mb-3">
                        <p className="text-foreground leading-relaxed">
                            {tweet.content}
                        </p>
                        {tweet.image && (
                            <div className="mt-3 rounded-2xl overflow-hidden border border-border">
                                <img
                                    src={tweet.image || "/placeholder.svg"}
                                    alt="Tweet image"
                                    className="w-full h-auto max-h-96 object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between max-w-md">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10 p-2 rounded-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">
                                {formatNumber(tweet.replies)}
                            </span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setRetweeted(!retweeted);
                            }}
                            className={`flex items-center gap-2 p-2 rounded-full ${
                                retweeted
                                    ? "text-green-500 hover:text-green-600 hover:bg-green-500/10"
                                    : "text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
                            }`}
                        >
                            <Repeat className="w-4 h-4" />
                            <span className="text-sm">
                                {formatNumber(
                                    tweet.retweets + (retweeted ? 1 : 0)
                                )}
                            </span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLiked(!liked);
                            }}
                            className={`flex items-center gap-2 p-2 rounded-full ${
                                liked
                                    ? "text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                    : "text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                            }`}
                        >
                            <Heart
                                className={`w-4 h-4 ${
                                    liked ? "fill-current" : ""
                                }`}
                            />
                            <span className="text-sm">
                                {formatNumber(tweet.likes + (liked ? 1 : 0))}
                            </span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10 p-2 rounded-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Share className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
