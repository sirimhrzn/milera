"use client";

import type React from "react";

import { EmojiPicker } from "@/app/(main)/_components/EmojiPicker";
import { MediaUpload } from "@/app/(main)/_components/MediaUpload";
import { PollCreator } from "@/app/(main)/_components/PollCreator";
import { ScheduleModal } from "@/app/(main)/_components/ScheduleModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Calendar,
    Image,
    Laugh,
    LocationEdit,
    Sticker,
    Vote,
} from "lucide-react";
import { useRef, useState } from "react";

interface TweetComposerProps {
    placeholder?: string;
    isReply?: boolean;
}

export function TweetComposer({
    placeholder = "What is happening?!",
    isReply = false,
}: TweetComposerProps) {
    const [tweetText, setTweetText] = useState("");
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [showPoll, setShowPoll] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [pollData, setPollData] = useState<{
        options: string[];
        duration: string;
    } | null>(null);
    const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const maxLength = 280;

    const handleTweet = () => {
        if (tweetText.trim() || uploadedImages.length > 0 || pollData) {
            // Handle tweet submission
            console.log("Tweet:", {
                text: tweetText,
                images: uploadedImages,
                poll: pollData,
                scheduledDate,
                isReply,
            });
            // Reset form
            setTweetText("");
            setUploadedImages([]);
            setPollData(null);
            setShowPoll(false);
            setScheduledDate(null);
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        setUploadedImages((prev) => [
                            ...prev,
                            e.target!.result as string,
                        ]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEmojiSelect = (emoji: string) => {
        setTweetText((prev) => prev + emoji);
        setShowEmojiPicker(false);
    };

    const canPost =
        (tweetText.trim() || uploadedImages.length > 0 || pollData) &&
        tweetText.length <= maxLength;

    return (
        <div className="border-b border-border p-4">
            <div className="flex gap-3">
                {/* Avatar */}
                <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src="/diverse-user-avatars.png" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>

                {/* Composer */}
                <div className="flex-1">
                    <Textarea
                        placeholder={placeholder}
                        value={tweetText}
                        onChange={(e) => setTweetText(e.target.value)}
                        className="min-h-[120px] text-xl placeholder:text-muted-foreground border-0 resize-none focus-visible:ring-0 p-0"
                        maxLength={maxLength}
                    />

                    {uploadedImages.length > 0 && (
                        <MediaUpload
                            images={uploadedImages}
                            onRemove={removeImage}
                        />
                    )}

                    {showPoll && (
                        <PollCreator
                            onSave={(poll) => {
                                setPollData(poll);
                                setShowPoll(false);
                            }}
                            onCancel={() => setShowPoll(false)}
                        />
                    )}

                    {/* Media Options */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 text-primary hover:bg-primary/10 rounded-full"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploadedImages.length >= 4}
                            >
                                <Image className="w-5 h-5" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 text-primary hover:bg-primary/10 rounded-full"
                            >
                                <Sticker className="w-5 h-5" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className={`p-2 rounded-full ${
                                    showPoll || pollData
                                        ? "text-primary bg-primary/10"
                                        : "text-primary hover:bg-primary/10"
                                }`}
                                onClick={() => setShowPoll(!showPoll)}
                                disabled={uploadedImages.length > 0}
                            >
                                <Vote className="w-5 h-5" />
                            </Button>

                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-2 text-primary hover:bg-primary/10 rounded-full"
                                    onClick={() =>
                                        setShowEmojiPicker(!showEmojiPicker)
                                    }
                                >
                                    <Laugh className="w-5 h-5" />
                                </Button>
                                {showEmojiPicker && (
                                    <EmojiPicker
                                        onEmojiSelect={handleEmojiSelect}
                                        onClose={() =>
                                            setShowEmojiPicker(false)
                                        }
                                    />
                                )}
                            </div>

                            {!isReply && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`p-2 rounded-full ${
                                        scheduledDate
                                            ? "text-primary bg-primary/10"
                                            : "text-primary hover:bg-primary/10"
                                    }`}
                                    onClick={() => setShowScheduleModal(true)}
                                >
                                    <Calendar className="w-5 h-5" />
                                </Button>
                            )}

                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 text-primary hover:bg-primary/10 rounded-full"
                            >
                                <LocationEdit className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Character Count */}
                            <div className="flex items-center gap-2">
                                <div className="relative w-6 h-6">
                                    <svg
                                        className="w-6 h-6 transform -rotate-90"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            className="text-muted-foreground/20"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray={`${
                                                (tweetText.length / maxLength) *
                                                62.83
                                            } 62.83`}
                                            className={
                                                tweetText.length >
                                                maxLength * 0.8
                                                    ? tweetText.length >
                                                      maxLength
                                                        ? "text-red-500"
                                                        : "text-yellow-500"
                                                    : "text-primary"
                                            }
                                        />
                                    </svg>
                                </div>
                                {tweetText.length > maxLength * 0.8 && (
                                    <span
                                        className={`text-sm ${
                                            tweetText.length > maxLength
                                                ? "text-red-500"
                                                : "text-yellow-500"
                                        }`}
                                    >
                                        {maxLength - tweetText.length}
                                    </span>
                                )}
                            </div>

                            {/* Tweet Button */}
                            <Button
                                onClick={handleTweet}
                                disabled={!canPost}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-2 rounded-full disabled:opacity-50"
                            >
                                {isReply
                                    ? "Reply"
                                    : scheduledDate
                                    ? "Schedule"
                                    : "Post"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {!isReply && showScheduleModal && (
                <ScheduleModal
                    onSchedule={(date) => {
                        setScheduledDate(date);
                        setShowScheduleModal(false);
                    }}
                    onClose={() => setShowScheduleModal(false)}
                />
            )}
        </div>
    );
}
