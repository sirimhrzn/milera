import type { Discussion } from "@/lib/type";
import { formatTime } from "@/lib/utils";
import { MessageCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface DiscussionCardProps {
    discussion: Discussion;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
    return (
        <div className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
            <Link to={`/${discussion.slug}`} className="space-y-3">
                {/* Discussion Header */}
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg leading-tight mb-1 cursor-pointer hover:text-primary transition-colors">
                            {discussion.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>by {discussion.author}</span>
                            <span>•</span>
                            <span>{discussion.category}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                    {formatTime(discussion.uploadTime)}{" "}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Discussion Stats */}
                <div className="flex items-center space-x-4 pt-2">
                    <div className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">
                            {discussion.postCount} posts
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
