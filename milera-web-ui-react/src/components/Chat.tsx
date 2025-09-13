import { getChatMessagesByDiscussion } from "@/lib/data";
import type { ChatMessage } from "@/lib/type";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface ChatProps {
    discussionId: string | undefined;
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2);
}

function InitialAvatar({
    name,
    size = "w-6 h-6",
}: {
    name: string;
    size?: string;
}) {
    const initials = getInitials(name);

    return (
        <div
            className={`${size} bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0`}
        >
            <span className="text-white font-bold text-xs">{initials}</span>
        </div>
    );
}

export function Chat({ discussionId }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        return getChatMessagesByDiscussion(discussionId);
    });

    const [newMessage, setNewMessage] = useState("");
    // const messagesEndRef = useRef<HTMLDivElement>(null)
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setMessages(getChatMessagesByDiscussion(discussionId));
    }, [discussionId]);

    useEffect(() => {
        const getRandomMessagesForDiscussion = (discussionId: string) => {
            const messagesByTopic: Record<string, string[]> = {
                "1": [
                    // AI Discussion
                    "AI is changing everything!",
                    "Which AI tool do you prefer?",
                    "The future is here 🤖",
                    "This could replace developers",
                    "Amazing progress in AI lately",
                ],
                "2": [
                    // Remote Work
                    "Working from home today!",
                    "Time zones are tricky",
                    "Love the flexibility",
                    "Missing office interactions",
                    "Productivity tips anyone?",
                ],
                "3": [
                    // Football
                    "What a transfer! 🔥",
                    "This changes everything",
                    "Best signing this window",
                    "Can't believe this happened",
                    "Premier League is crazy",
                ],
                "4": [
                    // Climate
                    "Finally some action! 🌍",
                    "This is so important",
                    "Hope it's not too late",
                    "Great news for the planet",
                    "We need more of this",
                ],
                "5": [
                    // Sustainability
                    "Small changes matter! 🌱",
                    "Love these tips",
                    "Trying this at home",
                    "Every bit helps",
                    "Great for the environment",
                ],
            };

            return (
                messagesByTopic[discussionId] || [
                    "Interesting discussion!",
                    "Thanks for sharing",
                    "Good point!",
                    "What do you think?",
                    "This is helpful",
                ]
            );
        };

        const randomAuthors = [
            "LiveViewer",
            "ChatUser",
            "Observer",
            "Commenter",
            "Participant",
            "Watcher",
        ];

        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                // 30% chance every 3 seconds
                const discussionMessages =
                    getRandomMessagesForDiscussion(discussionId);
                const newMsg: ChatMessage = {
                    id: Date.now().toString(),
                    discussionId: discussionId,
                    author: randomAuthors[
                        Math.floor(Math.random() * randomAuthors.length)
                    ],
                    message:
                        discussionMessages[
                            Math.floor(
                                Math.random() * discussionMessages.length
                            )
                        ],
                    timestamp: new Date(),
                    verified: Math.random() > 0.8, // 20% chance of being verified
                };

                setMessages((prev) => [...prev, newMsg]);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [discussionId]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message: ChatMessage = {
            id: Date.now().toString(),
            discussionId: discussionId,
            author: "You",
            message: newMessage.trim(),
            timestamp: new Date(),
            verified: false,
        };

        setMessages((prev) => [...prev, message]);
        setNewMessage("");
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="w-[350px] bg-background border-l border-border flex flex-col min-h-screen max-h-screen">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-muted/30 flex-shrink-0">
                <h3 className="font-semibold text-sm">Live Chat</h3>
                <p className="text-xs text-muted-foreground">
                    {messages.length} messages
                </p>
            </div>

            {/* Messages Container */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-2 space-y-2 overscroll-contain"
            >
                {messages.map((message) => (
                    <div key={message.id} className="flex space-x-2 text-sm">
                        <InitialAvatar name={message.author} />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-1">
                                <span
                                    className={`font-medium text-xs ${
                                        message.author === "You"
                                            ? "text-blue-500"
                                            : ""
                                    }`}
                                >
                                    {message.author}
                                </span>
                                {message.verified && (
                                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                        <svg
                                            className="h-2 w-2 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                        </svg>
                                    </div>
                                )}
                                <span className="text-xs text-muted-foreground">
                                    {formatTime(message.timestamp)}
                                </span>
                            </div>
                            <p className="text-xs text-foreground break-words leading-relaxed">
                                {message.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="p-3 border-t border-border bg-muted/30 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Say something..."
                        className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        maxLength={200}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <FaPaperPlane className="h-3 w-3" />
                    </button>
                </form>
                <p className="text-xs text-muted-foreground mt-1 text-center">
                    {newMessage.length}/200
                </p>
            </div>
        </div>
    );
}
