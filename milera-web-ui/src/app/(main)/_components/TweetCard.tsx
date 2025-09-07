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

    return (
        <article className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex gap-3">
                {/* Avatar */}
                <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage
                        src={tweet.user.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>{tweet.user.name[0]}</AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-1 mb-1">
                        <span className="font-bold text-foreground truncate">
                            {tweet.user.name}
                        </span>
                        {tweet.user.verified && (
                            <Verified className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                        <span className="text-muted-foreground truncate">
                            @{tweet.user.username}
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground flex-shrink-0">
                            {tweet.timestamp}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto p-1 h-auto"
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
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">
                                {formatNumber(tweet.replies)}
                            </span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setRetweeted(!retweeted)}
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
                            onClick={() => setLiked(!liked)}
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
                        >
                            <Share className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
