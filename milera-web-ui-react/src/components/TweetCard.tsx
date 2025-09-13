import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Bookmark,
    BookmarkCheck,
    ChartNoAxesColumn,
    Heart,
    MessageCircle,
    MoreHorizontal,
    Repeat,
    Share,
    Verified,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    views: number;
    image?: string;
}

interface TweetCardProps {
    tweet: Tweet;
    isOwnTweet?: boolean; // New prop to determine if this is the current user's tweet
    onLike?: (tweetId: string, isLiked: boolean, newCount: number) => void;
    onRetweet?: (
        tweetId: string,
        isRetweeted: boolean,
        newCount: number
    ) => void;
    onBookmark?: (tweetId: string, isBookmarked: boolean) => void;
    onShare?: (tweetId: string) => void;
    onMenuClick?: (tweetId: string, action: string) => void; // Updated to pass action (e.g., 'delete', 'report')
}

export function TweetCard({
    tweet,
    isOwnTweet = false,
    onLike,
    onRetweet,
    onBookmark,
    onShare,
    onMenuClick,
}: TweetCardProps) {
    // Single state object for all tweet interactions
    const [tweetState, setTweetState] = useState({
        liked: false,
        retweeted: false,
        bookmarked: false,
        likes: tweet.likes,
        retweets: tweet.retweets,
    });

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    };

    const formatTimestamp = (timestamp: string) => {
        // Handle different timestamp formats
        if (
            timestamp.includes("h") ||
            timestamp.includes("m") ||
            timestamp.includes("d")
        ) {
            return timestamp; // Already formatted
        }

        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor(
            (now.getTime() - date.getTime()) / 1000
        );

        if (diffInSeconds < 60) {
            return `${diffInSeconds}s`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)}m`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)}h`;
        } else if (diffInSeconds < 604800) {
            return `${Math.floor(diffInSeconds / 86400)}d`;
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year:
                    date.getFullYear() !== now.getFullYear()
                        ? "numeric"
                        : undefined,
            });
        }
    };

    const handleTweetClick = (e: React.MouseEvent) => {
        // Don't navigate if clicking on interactive elements
        if ((e.target as HTMLElement).closest("button, a")) {
            return;
        }
        // Simulate navigation - in real app, use Next.js router
        window.location.href = `/post/${tweet.id}`;
    };

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newLikedState = !tweetState.liked;
        const newLikes = newLikedState
            ? tweetState.likes + 1
            : tweetState.likes - 1;

        setTweetState((prev) => ({
            ...prev,
            liked: newLikedState,
            likes: newLikes,
        }));

        onLike?.(tweet.id, newLikedState, newLikes);
    };

    const handleRetweet = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newRetweetedState = !tweetState.retweeted;
        const newRetweets = newRetweetedState
            ? tweetState.retweets + 1
            : tweetState.retweets - 1;

        setTweetState((prev) => ({
            ...prev,
            retweeted: newRetweetedState,
            retweets: newRetweets,
        }));

        onRetweet?.(tweet.id, newRetweetedState, newRetweets);
    };

    const handleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newBookmarkedState = !tweetState.bookmarked;

        setTweetState((prev) => ({
            ...prev,
            bookmarked: newBookmarkedState,
        }));

        onBookmark?.(tweet.id, newBookmarkedState);
    };

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${tweet.user.name} on X`,
                    text: tweet.content,
                    url: `${window.location.origin}/tweet/${tweet.id}`,
                });
            } catch (err) {
                console.log("Share cancelled", err);
            }
        } else {
            const tweetUrl = `${window.location.origin}/tweet/${tweet.id}`;
            try {
                await navigator.clipboard.writeText(tweetUrl);
                console.log("Link copied to clipboard");
            } catch (err) {
                console.error("Failed to copy link", err);
            }
        }

        onShare?.(tweet.id);
    };

    // Updated menu handler to pass action
    const handleMenuAction = (e: React.MouseEvent, action: string) => {
        e.stopPropagation();
        onMenuClick?.(tweet.id, action);
    };

    return (
        <article
            className="p-3 sm:p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border"
            onClick={handleTweetClick}
        >
            <div className="flex gap-2 sm:gap-3">
                {/* Avatar */}
                <Link
                    to={`/profile/${tweet.user.username}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-shrink-0"
                >
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 hover:brightness-95 transition-all">
                        <AvatarImage
                            src={tweet.user.avatar || "/placeholder.svg"}
                            alt={`${tweet.user.name} avatar`}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {tweet.user.name[0]?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Link>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-1 mb-1 flex-wrap sm:flex-nowrap">
                        <div className="flex items-center gap-1 min-w-0">
                            <Link
                                to={`/profile/${tweet.user.username}`}
                                className="hover:underline min-w-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="font-bold text-foreground truncate text-sm sm:text-base hover:underline">
                                    {tweet.user.name}
                                </span>
                            </Link>
                            {tweet.user.verified && (
                                <Verified className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-blue-500 flex-shrink-0" />
                            )}
                        </div>

                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                            <Link
                                to={`/profile/${tweet.user.username}`}
                                className="hover:underline truncate"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="truncate">
                                    @{tweet.user.username}
                                </span>
                            </Link>
                            <span>·</span>
                            <span className="flex-shrink-0 hover:underline cursor-pointer">
                                {formatTimestamp(tweet.timestamp)}
                            </span>
                        </div>

                        <div className="ml-auto flex items-center">
                            {/* DropdownMenu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-1 p-1 h-auto w-auto hover:bg-primary/10 rounded-full"
                                        aria-label="More options"
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="rounded-xl border-border bg-background text-foreground shadow-lg"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-muted/50 px-2 py-1.5 text-sm"
                                        onClick={(e) =>
                                            handleMenuAction(
                                                e,
                                                "not-interested"
                                            )
                                        }
                                    >
                                        Not interested in this post
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-muted/50 px-2 py-1.5 text-sm"
                                        onClick={(e) =>
                                            handleMenuAction(e, "follow")
                                        }
                                    >
                                        Follow @{tweet.user.username}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-muted/50 px-2 py-1.5 text-sm"
                                        onClick={(e) =>
                                            handleMenuAction(e, "mute")
                                        }
                                    >
                                        Mute @{tweet.user.username}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-muted/50 px-2 py-1.5 text-sm"
                                        onClick={(e) =>
                                            handleMenuAction(e, "block")
                                        }
                                    >
                                        Block @{tweet.user.username}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-muted/50 px-2 py-1.5 text-sm"
                                        onClick={(e) =>
                                            handleMenuAction(e, "report")
                                        }
                                    >
                                        Report post
                                    </DropdownMenuItem>
                                    {isOwnTweet && (
                                        <DropdownMenuItem
                                            className="cursor-pointer hover:bg-muted/50 px-2 py-1.5 text-sm text-destructive"
                                            onClick={(e) =>
                                                handleMenuAction(e, "delete")
                                            }
                                        >
                                            Delete post
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Tweet Content */}
                    <div className="mb-3">
                        <p className="text-foreground leading-relaxed">
                            {tweet.content}
                        </p>
                        {tweet.image && (
                            <div className="mt-3 rounded-xl sm:rounded-2xl overflow-hidden border border-border">
                                <img
                                    src={tweet.image || "/placeholder.svg"}
                                    alt="Tweet image"
                                    className="w-full h-auto max-h-64 sm:max-h-96 object-cover cursor-pointer hover:brightness-95 transition-all"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(tweet.image, "_blank");
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between max-w-md">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 p-1.5 sm:p-2 rounded-full -ml-1.5 sm:-ml-2 transition-colors group"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Comments"
                        >
                            <MessageCircle className="w-4 h-4 group-hover:scale-105 transition-transform" />
                            <span className="text-xs sm:text-sm">
                                {formatNumber(tweet.replies)}
                            </span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRetweet}
                            className={`flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full transition-colors group ${
                                tweetState.retweeted
                                    ? "text-green-500 hover:text-green-600 hover:bg-green-500/10"
                                    : "text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
                            }`}
                            aria-label={
                                tweetState.retweeted
                                    ? "Undo retweet"
                                    : "Retweet"
                            }
                        >
                            <Repeat className="w-4 h-4 group-hover:scale-105 transition-transform" />
                            <span className="text-xs sm:text-sm">
                                {formatNumber(tweetState.retweets)}
                            </span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            className={`flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full transition-all group ${
                                tweetState.liked
                                    ? "text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                    : "text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                            }`}
                            aria-label={tweetState.liked ? "Unlike" : "Like"}
                        >
                            <Heart
                                className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                                    tweetState.liked
                                        ? "fill-current animate-pulse"
                                        : ""
                                }`}
                            />
                            <span className="text-xs sm:text-sm">
                                {formatNumber(tweetState.likes)}
                            </span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 p-1.5 sm:p-2 rounded-full transition-colors group"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="View analytics"
                        >
                            <ChartNoAxesColumn className="w-4 h-4 group-hover:scale-105 transition-transform" />
                            <span className="text-xs sm:text-sm">
                                {formatNumber(tweet.views)}
                            </span>
                        </Button>

                        <div className="flex flex-wrap gap-2 ml-auto">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`p-1.5 sm:p-2 rounded-full transition-colors group ${
                                    tweetState.bookmarked
                                        ? "text-blue-500 hover:bg-blue-500/10"
                                        : "text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10"
                                }`}
                                onClick={handleBookmark}
                                aria-label={
                                    tweetState.bookmarked
                                        ? "Remove bookmark"
                                        : "Bookmark"
                                }
                            >
                                {tweetState.bookmarked ? (
                                    <BookmarkCheck className="w-4 h-4 fill-current group-hover:scale-105 transition-transform" />
                                ) : (
                                    <Bookmark className="w-4 h-4 group-hover:scale-105 transition-transform" />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 p-1.5 sm:p-2 rounded-full transition-colors group"
                                onClick={handleShare}
                                aria-label="Share"
                            >
                                <Share className="w-4 h-4 group-hover:scale-105 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
