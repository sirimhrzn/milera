import { TweetCard } from "@/components/TweetCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Verified, X } from "lucide-react";
import { useEffect, useState } from "react";

const mockSearchSuggestions = [
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "AI",
    "Machine Learning",
    "Web Development",
    "Programming",
];

const mockUsers = [
    {
        id: "1",
        name: "Elon Musk",
        username: "elonmusk",
        avatar: "/elon-musk-portrait.png",
        verified: true,
        followers: "150M",
        bio: "CEO of Tesla, SpaceX, and X",
    },
    {
        id: "2",
        name: "Vercel",
        username: "vercel",
        avatar: "/vercel-logo.png",
        verified: true,
        followers: "567K",
        bio: "Develop. Preview. Ship.",
    },
    {
        id: "3",
        name: "OpenAI",
        username: "OpenAI",
        avatar: "/abstract-geometric-logo.png",
        verified: true,
        followers: "2.1M",
        bio: "AI research company",
    },
];

const mockTweets = [
    {
        id: "1",
        user: {
            name: "Tech News",
            username: "technews",
            avatar: "/placeholder.svg?key=tech",
            verified: false,
        },
        content:
            "Breaking: New JavaScript framework announced! This could change everything we know about web development.",
        timestamp: "1h",
        likes: 234,
        retweets: 56,
        replies: 23,
        views: 1200,
    },
    {
        id: "2",
        user: {
            name: "Developer Tips",
            username: "devtips",
            avatar: "/placeholder.svg?key=dev",
            verified: false,
        },
        content:
            "Pro tip: Always use TypeScript for large projects. The type safety will save you hours of debugging! 🚀",
        timestamp: "3h",
        likes: 189,
        retweets: 34,
        replies: 12,
        views: 1200,
    },
];

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("Top");
    const [searchResults, setSearchResults] = useState<
        "users" | "tweets" | "suggestions"
    >("suggestions");
    const [showSuggestions, setShowSuggestions] = useState(true);

    const tabs = ["Top", "Latest", "People", "Media"];

    useEffect(() => {
        if (searchQuery.trim()) {
            setShowSuggestions(false);
            // Simulate search logic
            if (
                searchQuery.toLowerCase().includes("elon") ||
                searchQuery.toLowerCase().includes("vercel")
            ) {
                setSearchResults("users");
            } else {
                setSearchResults("tweets");
            }
        } else {
            setShowSuggestions(true);
            setSearchResults("suggestions");
        }
    }, [searchQuery]);

    const clearSearch = () => {
        setSearchQuery("");
        setShowSuggestions(true);
        setSearchResults("suggestions");
    };

    const filteredUsers = mockUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSuggestions = mockSearchSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <div className="flex flex-col h-screen">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="flex items-center gap-3 p-4">
                        <div className="flex-1 relative">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search X"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-12 pr-10 bg-muted border-0 rounded-full"
                                />
                                {searchQuery && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearSearch}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6 rounded-full"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation - only show when there are search results */}
                    {!showSuggestions && (
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
                    )}
                </header>

                {/* Main Content */}
                <main className="flex-1">
                    {showSuggestions && (
                        <div className="p-4">
                            <h2 className="font-bold text-lg mb-4">
                                Recent searches
                            </h2>
                            <div className="space-y-2">
                                {mockSearchSuggestions
                                    .slice(0, 5)
                                    .map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSearchQuery(suggestion)
                                            }
                                            className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
                                        >
                                            <Search className="w-5 h-5 text-muted-foreground" />
                                            <span>{suggestion}</span>
                                        </button>
                                    ))}
                            </div>
                        </div>
                    )}

                    {!showSuggestions && searchQuery && (
                        <>
                            {/* Search Suggestions */}
                            {filteredSuggestions.length > 0 && (
                                <div className="border-b border-border">
                                    {filteredSuggestions
                                        .slice(0, 3)
                                        .map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setSearchQuery(suggestion)
                                                }
                                                className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                                            >
                                                <Search className="w-5 h-5 text-muted-foreground" />
                                                <span className="font-medium">
                                                    {suggestion}
                                                </span>
                                            </button>
                                        ))}
                                </div>
                            )}

                            {/* Search Results */}
                            {activeTab === "People" ||
                            (searchResults === "users" &&
                                activeTab === "Top") ? (
                                <div className="divide-y divide-border">
                                    {filteredUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="p-4 hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-12 h-12">
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
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1">
                                                        <h3 className="font-bold truncate">
                                                            {user.name}
                                                        </h3>
                                                        {user.verified && (
                                                            <Verified className="w-4 h-4 text-primary flex-shrink-0" />
                                                        )}
                                                    </div>
                                                    <p className="text-muted-foreground text-sm">
                                                        @{user.username}
                                                    </p>
                                                    <p className="text-sm mt-1 line-clamp-2">
                                                        {user.bio}
                                                    </p>
                                                    <p className="text-muted-foreground text-sm mt-1">
                                                        {user.followers}{" "}
                                                        followers
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="font-bold bg-transparent"
                                                >
                                                    Follow
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="divide-y divide-border">
                                    {mockTweets.map((tweet) => (
                                        <TweetCard
                                            key={tweet.id}
                                            tweet={tweet}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* No Results */}
                            {((activeTab === "People" ||
                                searchResults === "users") &&
                                filteredUsers.length === 0) ||
                            (activeTab !== "People" &&
                                searchResults === "tweets" &&
                                mockTweets.length === 0) ? (
                                <div className="p-8 text-center">
                                    <h3 className="font-bold text-xl mb-2">
                                        No results for "{searchQuery}"
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Try searching for something else.
                                    </p>
                                </div>
                            ) : null}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
