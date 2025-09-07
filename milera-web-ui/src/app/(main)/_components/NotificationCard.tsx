"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    AtSignIcon,
    HeartIcon,
    MessageCircleIcon,
    QuoteIcon,
    RepeatIcon,
    UserPlusIcon,
    Verified as VerifiedIcon,
} from "lucide-react";

interface NotificationCardProps {
    notification: {
        id: string;
        type: "like" | "retweet" | "reply" | "follow" | "mention" | "quote";
        user: {
            name: string;
            username: string;
            avatar: string;
            verified?: boolean;
        };
        content?: string;
        tweet?: {
            id: string;
            content: string;
            image?: string;
        };
        timestamp: string;
        read: boolean;
        additionalUsers?: Array<{
            name: string;
            username: string;
            avatar: string;
        }>;
    };
    onMarkAsRead: () => void;
}

export function NotificationCard({
    notification,
    onMarkAsRead,
}: NotificationCardProps) {
    const getNotificationIcon = () => {
        switch (notification.type) {
            case "like":
                return (
                    <HeartIcon className="w-8 h-8 text-red-500 fill-current" />
                );
            case "retweet":
                return <RepeatIcon className="w-8 h-8 text-green-500" />;
            case "reply":
                return <MessageCircleIcon className="w-8 h-8 text-primary" />;
            case "follow":
                return <UserPlusIcon className="w-8 h-8 text-primary" />;
            case "mention":
                return <AtSignIcon className="w-8 h-8 text-primary" />;
            case "quote":
                return <QuoteIcon className="w-8 h-8 text-primary" />;
            default:
                return null;
        }
    };

    const getNotificationText = () => {
        const userName = notification.user.name;
        const additionalCount = notification.additionalUsers?.length || 0;

        switch (notification.type) {
            case "like":
                if (additionalCount > 0) {
                    return `${userName} and ${additionalCount} other${
                        additionalCount > 1 ? "s" : ""
                    } liked your post`;
                }
                return `${userName} liked your post`;
            case "retweet":
                return `${userName} reposted your post`;
            case "reply":
                return `${userName} replied to your post`;
            case "follow":
                return `${userName} followed you`;
            case "mention":
                return `${userName} mentioned you`;
            case "quote":
                return `${userName} quoted your post`;
            default:
                return "";
        }
    };

    const handleClick = () => {
        if (!notification.read) {
            onMarkAsRead();
        }
    };

    return (
        <article
            className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                !notification.read
                    ? "bg-primary/5 border-l-4 border-l-primary"
                    : ""
            }`}
            onClick={handleClick}
        >
            <div className="flex gap-3">
                {/* Notification Icon */}
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                    {getNotificationIcon()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* User Info and Additional Users */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex -space-x-2">
                            <Avatar className="w-8 h-8 border-2 border-background">
                                <AvatarImage
                                    src={
                                        notification.user.avatar ||
                                        "/placeholder.svg"
                                    }
                                />
                                <AvatarFallback>
                                    {notification.user.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            {notification.additionalUsers
                                ?.slice(0, 2)
                                .map((user, index) => (
                                    <Avatar
                                        key={index}
                                        className="w-8 h-8 border-2 border-background"
                                    >
                                        <AvatarImage
                                            src={
                                                user.avatar ||
                                                "/placeholder.svg"
                                            }
                                        />
                                        <AvatarFallback>
                                            {user.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                        </div>
                        {notification.user.verified && (
                            <VerifiedIcon className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                        <span className="text-sm text-muted-foreground">
                            {notification.timestamp}
                        </span>
                    </div>

                    {/* Notification Text */}
                    <p className="text-sm font-medium mb-2">
                        {getNotificationText()}
                    </p>

                    {/* Reply/Mention Content */}
                    {(notification.type === "reply" ||
                        notification.type === "mention" ||
                        notification.type === "quote") &&
                        notification.content && (
                            <div className="bg-muted/50 rounded-lg p-3 mb-2">
                                <p className="text-sm">
                                    {notification.content}
                                </p>
                            </div>
                        )}

                    {/* Original Tweet */}
                    {notification.tweet && (
                        <div className="bg-muted/30 rounded-lg p-3 border border-border">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {notification.tweet.content}
                            </p>
                            {notification.tweet.image && (
                                <div className="mt-2 rounded-lg overflow-hidden">
                                    <img
                                        src={
                                            notification.tweet.image ||
                                            "/placeholder.svg"
                                        }
                                        alt="Tweet image"
                                        className="w-full h-24 object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Follow Button for Follow Notifications */}
                    {notification.type === "follow" && (
                        <div className="mt-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="font-bold bg-transparent"
                            >
                                Follow back
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
