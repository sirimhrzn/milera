"use client";

import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Image, Laugh, LocationEdit } from "lucide-react";
import { useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { MdOutlineGifBox } from "react-icons/md";
import { MediaUpload } from "./MediaUpload";
import { PollCreator } from "./PollCreator";
import { EmojiPicker } from "./EmojiPicker";
import { ScheduleModal } from "./ScheduleModal";

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

    const canPost = tweetText.trim() || uploadedImages.length > 0 || pollData;

    return (
        <div className="border-b border-border p-3 sm:p-4">
            <div className="flex flex-row gap-2 sm:gap-3">
                {/* Avatar */}
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                    <AvatarImage src="/diverse-user-avatars.png" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>

                {/* Composer */}
                <div className="flex-1 min-w-0">
                    <Textarea
                        placeholder={placeholder}
                        value={tweetText}
                        onChange={(e) => setTweetText(e.target.value)}
                        className="min-h-[60px] sm:min-h-[80px] text-base sm:text-xl placeholder:text-muted-foreground border-0 resize-none focus-visible:ring-0 bg-muted w-full"
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
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mt-2 sm:mt-4 gap-2 sm:gap-0">
                        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
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
                                className="p-1.5 sm:p-2 text-primary hover:bg-primary/10 rounded-full"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploadedImages.length >= 4}
                            >
                                <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1.5 sm:p-2 text-primary hover:bg-primary/10 rounded-full"
                            >
                                <MdOutlineGifBox className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className={`p-1.5 sm:p-2 rounded-full ${
                                    showPoll || pollData
                                        ? "text-primary bg-primary/10"
                                        : "text-primary hover:bg-primary/10"
                                }`}
                                onClick={() => setShowPoll(!showPoll)}
                                disabled={uploadedImages.length > 0}
                            >
                                <BiPoll className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>

                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-1.5 sm:p-2 text-primary hover:bg-primary/10 rounded-full"
                                    onClick={() =>
                                        setShowEmojiPicker(!showEmojiPicker)
                                    }
                                >
                                    <Laugh className="w-4 h-4 sm:w-5 sm:h-5" />
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
                                    className={`p-1.5 sm:p-2 rounded-full ${
                                        scheduledDate
                                            ? "text-primary bg-primary/10"
                                            : "text-primary hover:bg-primary/10"
                                    }`}
                                    onClick={() => setShowScheduleModal(true)}
                                >
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                            )}

                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1.5 sm:p-2 text-primary hover:bg-primary/10 rounded-full"
                            >
                                <LocationEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Tweet Button */}
                            <Button
                                onClick={handleTweet}
                                disabled={!canPost}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base rounded-full disabled:opacity-50"
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

            {!isReply && (
                <ScheduleModal
                    open={showScheduleModal}
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
