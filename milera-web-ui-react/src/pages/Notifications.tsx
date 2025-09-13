import { NotificationCard } from "@/components/NotificationCard";
import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";

interface Notification {
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
}

const mockNotifications: Notification[] = [
    {
        id: "1",
        type: "like",
        user: {
            name: "Elon Musk",
            username: "elonmusk",
            avatar: "/elon-musk-portrait.png",
            verified: true,
        },
        tweet: {
            id: "tweet1",
            content:
                "Just shipped a new feature! The feeling of seeing your code in production never gets old.",
        },
        timestamp: "2h",
        read: false,
        additionalUsers: [
            {
                name: "Vercel",
                username: "vercel",
                avatar: "/vercel-logo.png",
            },
            {
                name: "OpenAI",
                username: "OpenAI",
                avatar: "/abstract-geometric-logo.png",
            },
        ],
    },
    {
        id: "2",
        type: "follow",
        user: {
            name: "Vercel",
            username: "vercel",
            avatar: "/vercel-logo.png",
            verified: true,
        },
        timestamp: "4h",
        read: false,
    },
    {
        id: "3",
        type: "retweet",
        user: {
            name: "OpenAI",
            username: "OpenAI",
            avatar: "/abstract-geometric-logo.png",
            verified: true,
        },
        tweet: {
            id: "tweet2",
            content:
                "Hot take: The best code is the code you don't have to write. Sometimes the simplest solution is the most elegant one.",
        },
        timestamp: "6h",
        read: true,
    },
    {
        id: "4",
        type: "reply",
        user: {
            name: "Tech Enthusiast",
            username: "techenthusiast",
            avatar: "/placeholder.svg?key=tech",
            verified: false,
        },
        content:
            "This is exactly what I needed to hear today! Thanks for sharing your insights.",
        tweet: {
            id: "tweet3",
            content:
                "Teaching fundamentals today. Remember: understanding closures and async/await will make you a better developer!",
        },
        timestamp: "8h",
        read: true,
    },
    {
        id: "5",
        type: "mention",
        user: {
            name: "Developer Friend",
            username: "devfriend",
            avatar: "/placeholder.svg?key=friend",
            verified: false,
        },
        content:
            "Hey @johndoe, check out this amazing new JavaScript feature! You'll love it.",
        timestamp: "1d",
        read: true,
    },
    {
        id: "6",
        type: "quote",
        user: {
            name: "Code Mentor",
            username: "codementor",
            avatar: "/placeholder.svg?key=mentor",
            verified: true,
        },
        content: "This is so true! I always tell my students the same thing.",
        tweet: {
            id: "tweet4",
            content:
                "The best way to learn programming is by building projects, not just watching tutorials.",
        },
        timestamp: "2d",
        read: true,
    },
];

export default function Notifications() {
    const [activeTab, setActiveTab] = useState("All");
    const [notifications, setNotifications] = useState(mockNotifications);

    const tabs = ["All", "Verified", "Mentions"];

    const markAsRead = (notificationId: string) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === notificationId
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notification) => ({ ...notification, read: true }))
        );
    };

    const filteredNotifications = notifications.filter((notification) => {
        if (activeTab === "Verified") {
            return notification.user.verified;
        }
        if (activeTab === "Mentions") {
            return notification.type === "mention";
        }
        return true;
    });

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="min-h-screen bg-background">
            <div className="flex flex-col h-screen">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="font-bold text-xl">
                                    Notifications
                                </h1>
                                {unreadCount > 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        {unreadCount} new notifications
                                    </p>
                                )}
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="p-2">
                            <SettingsIcon className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex border-b border-border">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
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
                </header>

                {/* Mark All Read Button */}
                {unreadCount > 0 && (
                    <div className="p-4 border-b border-border">
                        <Button
                            variant="outline"
                            onClick={markAllAsRead}
                            className="w-full bg-transparent"
                        >
                            Mark all as read
                        </Button>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1">
                    {filteredNotifications.length > 0 ? (
                        <div className="divide-y divide-border">
                            {filteredNotifications.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    onMarkAsRead={() =>
                                        markAsRead(notification.id)
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <h3 className="font-bold text-xl mb-2">
                                No notifications yet
                            </h3>
                            <p className="text-muted-foreground">
                                When someone interacts with your posts, you'll
                                see it here.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
