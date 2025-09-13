import type { Discussion } from "@/lib/type";
import { Link } from "react-router-dom";

interface DiscussionCardProps {
    discussion: Discussion;
}

function formatRelativeTime(inputDate: Date): string {
    // Convert input to Date object if it's not already
    const date = new Date(inputDate);
    const now = new Date();

    // Check if date is valid
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    // Calculate difference in milliseconds
    const diffMs = now.getTime() - date.getTime();

    // If the date is in the future, handle it
    if (diffMs < 0) {
        return "Future date";
    }

    // Convert to different time units
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // If less than 24 hours (1440 minutes)
    if (diffMinutes < 1440) {
        if (diffMinutes < 1) {
            return "Just now";
        } else if (diffMinutes < 60) {
            return `${diffMinutes} min${diffMinutes === 1 ? "" : "s"} ago`;
        } else {
            return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
        }
    } else {
        // If 24 hours or more, return formatted date
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const month = months[date.getMonth()];
        const day = date.getDate();

        return `${month} ${day}`;
    }
}

function formatPostCount(count: number): string {
    if (count >= 1000) {
        const thousands = Math.floor(count / 1000);
        return `${thousands}k posts`;
    }
    return `${count} post${count === 1 ? "" : "s"}`;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
    return (
        <div className="p-6 hover:bg-muted/50 cursor-pointer transition-colors">
            <Link to={`/${discussion.slug}`} className="space-y-3">
                {/* Discussion Header */}
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg leading-tight mb-1 cursor-pointer hover:text-primary transition-colors">
                            {discussion.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>
                                {formatRelativeTime(discussion.uploadTime)}
                            </span>
                            <span>•</span>
                            <span>{discussion.category}</span>
                            <span>•</span>
                            <span>{formatPostCount(discussion.postCount)}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
