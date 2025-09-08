"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface EmojiPickerProps {
    onEmojiSelect: (emoji: string) => void;
    onClose: () => void;
}

const emojiCategories = {
    "Smileys & People": [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "😂",
        "🤣",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😉",
        "😌",
        "😍",
        "🥰",
        "😘",
        "😗",
        "😙",
        "😚",
        "😋",
        "😛",
        "😝",
        "😜",
        "🤪",
        "🤨",
        "🧐",
        "🤓",
        "😎",
        "🤩",
        "🥳",
    ],
    "Animals & Nature": [
        "🐶",
        "🐱",
        "🐭",
        "🐹",
        "🐰",
        "🦊",
        "🐻",
        "🐼",
        "🐨",
        "🐯",
        "🦁",
        "🐮",
        "🐷",
        "🐸",
        "🐵",
        "🙈",
        "🙉",
        "🙊",
        "🐒",
        "🐔",
        "🐧",
        "🐦",
        "🐤",
        "🐣",
        "🐥",
        "🦆",
        "🦅",
        "🦉",
        "🦇",
        "🐺",
    ],
    "Food & Drink": [
        "🍎",
        "🍊",
        "🍋",
        "🍌",
        "🍉",
        "🍇",
        "🍓",
        "🍈",
        "🍒",
        "🍑",
        "🥭",
        "🍍",
        "🥥",
        "🥝",
        "🍅",
        "🍆",
        "🥑",
        "🥦",
        "🥬",
        "🥒",
        "🌶️",
        "🌽",
        "🥕",
        "🧄",
        "🧅",
        "🥔",
        "🍠",
        "🥐",
        "🍞",
        "🥖",
    ],
    Activity: [
        "⚽",
        "🏀",
        "🏈",
        "⚾",
        "🥎",
        "🎾",
        "🏐",
        "🏉",
        "🥏",
        "🎱",
        "🪀",
        "🏓",
        "🏸",
        "🏒",
        "🏑",
        "🥍",
        "🏏",
        "🪃",
        "🥅",
        "⛳",
        "🪁",
        "🏹",
        "🎣",
        "🤿",
        "🥊",
        "🥋",
        "🎽",
        "🛹",
        "🛷",
        "⛸️",
    ],
    Objects: [
        "⌚",
        "📱",
        "📲",
        "💻",
        "⌨️",
        "🖥️",
        "🖨️",
        "🖱️",
        "🖲️",
        "🕹️",
        "🗜️",
        "💽",
        "💾",
        "💿",
        "📀",
        "📼",
        "📷",
        "📸",
        "📹",
        "🎥",
        "📽️",
        "🎞️",
        "📞",
        "☎️",
        "📟",
        "📠",
        "📺",
        "📻",
        "🎙️",
        "🎚️",
    ],
};

export function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={pickerRef}
            className="absolute left-0 mb-2 w-80 max-h-64 bg-background border border-border rounded-2xl shadow-lg overflow-hidden z-50"
        >
            <div className="p-3 border-b border-border">
                <h3 className="font-semibold text-sm">Emoji</h3>
            </div>
            <div className="overflow-y-auto max-h-48">
                {Object.entries(emojiCategories).map(([category, emojis]) => (
                    <div key={category} className="p-3">
                        <h4 className="text-xs font-medium text-muted-foreground mb-2">
                            {category}
                        </h4>
                        <div className="grid grid-cols-8 gap-1">
                            {emojis.map((emoji) => (
                                <Button
                                    key={emoji}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onEmojiSelect(emoji)}
                                    className="p-1 h-8 w-8 text-lg hover:bg-muted"
                                >
                                    {emoji}
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
