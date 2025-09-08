"use client";

import type React from "react";
import { EmojiPicker } from "@/app/(main)/_components/EmojiPicker";
import { MediaUpload } from "@/app/(main)/_components/MediaUpload";
import { PollCreator } from "@/app/(main)/_components/PollCreator";
import { ScheduleModal } from "@/app/(main)/_components/ScheduleModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Image, Laugh, LocationEdit } from "lucide-react";
import { useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { MdOutlineGifBox } from "react-icons/md";

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
                        className="min-h-[80px] text-xl placeholder:text-muted-foreground border-0 resize-none focus-visible:ring-0 bg-muted"
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
                                <MdOutlineGifBox className="w-5 h-5" />
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
                                <BiPoll className="w-5 h-5" />
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
