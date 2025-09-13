import { LivestreamChat } from "@/components/LiveStreamChat";
import { TweetCard } from "@/components/TweetCard";
import { getDiscussionBySlug, getPostsByDiscussion } from "@/lib/data";
import { formatTime } from "@/lib/utils";
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
                    <div className="flex items-center space-x-2">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                        </svg>
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684z"
                            />
                        </svg>
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 105.367-2.684 1 1 0 00-5.367 2.684z"
                            />
                        </svg>
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                        </svg>
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
                    <p className="text-sm text-muted-foreground">
                        This story is a summary of posts on Milera and may
                        evolve over time. Milera can make mistakes, verify its
                        outputs.
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
            <LivestreamChat discussionId={discussion?.id} />
        </div>
    );
}
