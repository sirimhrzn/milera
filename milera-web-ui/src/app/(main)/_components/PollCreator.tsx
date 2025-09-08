"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PollCreatorProps {
    onSave: (poll: { options: string[]; duration: string }) => void;
    onCancel: () => void;
}

export function PollCreator({ onSave, onCancel }: PollCreatorProps) {
    const [options, setOptions] = useState(["", ""]);
    const [duration, setDuration] = useState("1 day");

    const addOption = () => {
        if (options.length < 4) {
            setOptions([...options, ""]);
        }
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const updateOption = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const canSave = options.filter((option) => option.trim()).length >= 2;

    return (
        <div className="mt-3 p-4 border border-border rounded-2xl">
            <div className="space-y-3">
                {options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                        <Input
                            placeholder={`Choice ${index + 1}`}
                            value={option}
                            onChange={(e) =>
                                updateOption(index, e.target.value)
                            }
                            className="flex-1"
                        />
                        {options.length > 2 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOption(index)}
                                className="px-2"
                            >
                                ×
                            </Button>
                        )}
                    </div>
                ))}

                {options.length < 4 && (
                    <Button
                        variant="ghost"
                        onClick={addOption}
                        className="w-full text-primary hover:bg-primary/10"
                    >
                        Add choice
                    </Button>
                )}

                <div className="flex items-center justify-between pt-2">
                    <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5 minutes">5 minutes</SelectItem>
                            <SelectItem value="15 minutes">
                                15 minutes
                            </SelectItem>
                            <SelectItem value="30 minutes">
                                30 minutes
                            </SelectItem>
                            <SelectItem value="1 hour">1 hour</SelectItem>
                            <SelectItem value="2 hours">2 hours</SelectItem>
                            <SelectItem value="6 hours">6 hours</SelectItem>
                            <SelectItem value="12 hours">12 hours</SelectItem>
                            <SelectItem value="1 day">1 day</SelectItem>
                            <SelectItem value="3 days">3 days</SelectItem>
                            <SelectItem value="7 days">7 days</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={onCancel} size="sm">
                            Cancel
                        </Button>
                        <Button
                            onClick={() =>
                                onSave({
                                    options: options.filter((o) => o.trim()),
                                    duration,
                                })
                            }
                            disabled={!canSave}
                            size="sm"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
