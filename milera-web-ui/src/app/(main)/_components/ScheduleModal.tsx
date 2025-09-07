"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface ScheduleModalProps {
    onSchedule: (date: Date) => void;
    onClose: () => void;
}

export function ScheduleModal({ onSchedule, onClose }: ScheduleModalProps) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleSchedule = () => {
        if (date && time) {
            const scheduledDate = new Date(`${date}T${time}`);
            if (scheduledDate > new Date()) {
                onSchedule(scheduledDate);
            }
        }
    };

    const canSchedule =
        date && time && new Date(`${date}T${time}`) > new Date();

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-2xl w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-xl font-bold">Schedule post</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="p-2"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="p-4 space-y-4">
                    <div>
                        <Label htmlFor="date" className="text-sm font-medium">
                            Date
                        </Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="time" className="text-sm font-medium">
                            Time
                        </Label>
                        <Input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    {date && time && (
                        <div className="p-3 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">
                                Will be posted on{" "}
                                {new Date(`${date}T${time}`).toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex gap-2 p-4 border-t border-border">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSchedule}
                        disabled={!canSchedule}
                        className="flex-1 bg-primary hover:bg-primary/90"
                    >
                        Schedule
                    </Button>
                </div>
            </div>
        </div>
    );
}
