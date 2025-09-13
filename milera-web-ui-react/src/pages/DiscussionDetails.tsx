import { Chat } from "@/components/Chat";
import { TweetCard } from "@/components/TweetCard";
import { getDiscussionBySlug, getPostsByDiscussion } from "@/lib/data";
import { formatTime } from "@/lib/utils";
import { ArrowLeft, Bookmark, Flag, MoreHorizontal, Share } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function DiscussionDetails() {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState<"top" | "latest">("top");

    const discussion = getDiscussionBySlug(slug);

    const discussionPosts = getPostsByDiscussion(discussion?.id);

    const sortedPosts = [...discussionPosts].sort((a, b) => {
        if (activeTab === "top") {
            return b.likes - a.likes;
        } else {
            // Sort by timestamp string for latest
            if (a.timestamp.includes("h") && b.timestamp.includes("h")) {
                return (
                    Number.parseInt(a.timestamp) - Number.parseInt(b.timestamp)
                );
            }
            if (a.timestamp.includes("m") && b.timestamp.includes("m")) {
                return (
                    Number.parseInt(a.timestamp) - Number.parseInt(b.timestamp)
                );
            }
            return a.timestamp.localeCompare(b.timestamp);
        }
    });

    const handleLike = (
        tweetId: string,
        isLiked: boolean,
        newCount: number
    ) => {
        console.log(
            `Tweet ${tweetId} ${
                isLiked ? "liked" : "unliked"
            }, new count: ${newCount}`
        );
    };

    const handleRetweet = (
        tweetId: string,
        isRetweeted: boolean,
        newCount: number
    ) => {
        console.log(
            `Tweet ${tweetId} ${
                isRetweeted ? "retweeted" : "unretweeted"
            }, new count: ${newCount}`
        );
    };

    const handleBookmark = (tweetId: string, isBookmarked: boolean) => {
        console.log(
            `Tweet ${tweetId} ${isBookmarked ? "bookmarked" : "unbookmarked"}`
        );
    };

    const handleShare = (tweetId: string) => {
        console.log(`Tweet ${tweetId} shared`);
    };

    const handleMenuClick = (tweetId: string, action: string) => {
        console.log(`Tweet ${tweetId} menu action: ${action}`);
    };

    return (
        <div className="flex flex-1">
            {/* Left discussion contents */}
            <div className="flex-1 w-[600px] border-r border-border">
                <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border p-4">
                    <div className="flex items-center justify-between">
                        <ArrowLeft className="size-5" />
                        <div className="flex items-center gap-6">
                            <Bookmark className="size-5" />
                            <Flag className="size-5" />
                            <Share className="size-5" />
                            <MoreHorizontal className="size-5" />
                        </div>
                    </div>
                </div>

                <div className="p-4 border-b border-border">
                    <h1 className="text-2xl font-bold mb-2">
                        {discussion?.title}
                    </h1>
                    <p className="text-sm text-muted-foreground mb-4">
                        Last updated {formatTime(discussion?.uploadTime)} ago{" "}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        {discussion?.description}
                    </p>
                </div>

                <div className="border-b border-border">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab("top")}
                            className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                                activeTab === "top"
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Top
                            {activeTab === "top" && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("latest")}
                            className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                                activeTab === "latest"
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Latest
                            {activeTab === "latest" && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-border">
                    {sortedPosts.map((post) => (
                        <TweetCard
                            key={post.id}
                            tweet={post}
                            onLike={handleLike}
                            onRetweet={handleRetweet}
                            onBookmark={handleBookmark}
                            onShare={handleShare}
                            onMenuClick={handleMenuClick}
                        />
                    ))}
                </div>
            </div>

            {/* Right live chat */}
            <Chat discussionId={discussion?.id} />
        </div>
    );
}
