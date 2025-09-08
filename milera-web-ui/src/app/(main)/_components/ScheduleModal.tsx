"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, CalendarClockIcon, X } from "lucide-react";

interface ScheduleModalProps {
    open: boolean;
    onSchedule: (date: Date) => void;
    onClose: () => void;
}

export function ScheduleModal({
    open,
    onSchedule,
    onClose,
}: ScheduleModalProps) {
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [ampm, setAmpm] = useState("AM");

    // Initialize with current date/time
    useEffect(() => {
        const now = new Date();
        const currentMonth = now.toLocaleString("default", { month: "long" });
        const currentDay = now.getDate().toString();
        const currentYear = now.getFullYear().toString();
        const currentHour = (now.getHours() % 12 || 12).toString();
        const currentMinute = now.getMinutes().toString().padStart(2, "0");
        const currentAmPm = now.getHours() >= 12 ? "PM" : "AM";

        setMonth(currentMonth);
        setDay(currentDay);
        setYear(currentYear);
        setHour(currentHour);
        setMinute(currentMinute);
        setAmpm(currentAmPm);
    }, [open]);

    const handleSchedule = () => {
        if (month && day && year && hour && minute) {
            const monthIndex = new Date(`${month} 1, 2000`).getMonth();
            let hour24 = Number.parseInt(hour);
            if (ampm === "PM" && hour24 !== 12) hour24 += 12;
            if (ampm === "AM" && hour24 === 12) hour24 = 0;

            const scheduledDate = new Date(
                Number.parseInt(year),
                monthIndex,
                Number.parseInt(day),
                hour24,
                Number.parseInt(minute)
            );
            if (scheduledDate > new Date()) {
                onSchedule(scheduledDate);
            }
        }
    };

    const getScheduledDateString = () => {
        if (month && day && year && hour && minute) {
            const monthIndex = new Date(`${month} 1, 2000`).getMonth();
            let hour24 = Number.parseInt(hour);
            if (ampm === "PM" && hour24 !== 12) hour24 += 12;
            if (ampm === "AM" && hour24 === 12) hour24 = 0;

            const date = new Date(
                Number.parseInt(year),
                monthIndex,
                Number.parseInt(day),
                hour24,
                Number.parseInt(minute)
            );
            const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
            });
            const monthName = date.toLocaleDateString("en-US", {
                month: "short",
            });
            const dayNum = date.getDate();
            const yearNum = date.getFullYear();
            const timeStr = `${hour}:${minute.padStart(2, "0")} ${ampm}`;

            return `${dayName}, ${monthName} ${dayNum}, ${yearNum} at ${timeStr}`;
        }
        return "";
    };

    const canSchedule = month && day && year && hour && minute;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const years = Array.from({ length: 10 }, (_, i) =>
        (new Date().getFullYear() + i).toString()
    );
    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const minutes = Array.from({ length: 60 }, (_, i) =>
        i.toString().padStart(2, "0")
    );

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-background border-border">
                <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <DialogTitle className="text-xl font-bold">
                        Schedule
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {getScheduledDateString() && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarClockIcon />
                            <span>Will send on {getScheduledDateString()}</span>
                        </div>
                    )}

                    <div>
                        <h3 className="font-medium mb-3">Date</h3>
                        <div className="flex gap-4">
                            <Select value={month} onValueChange={setMonth}>
                                <SelectTrigger className="bg-background border-border w-full">
                                    <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    {months.map((m) => (
                                        <SelectItem key={m} value={m}>
                                            {m}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={day} onValueChange={setDay}>
                                <SelectTrigger className="bg-background border-border min-w-[80px]">
                                    <SelectValue placeholder="Day" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    {days.map((d) => (
                                        <SelectItem key={d} value={d}>
                                            {d}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={year} onValueChange={setYear}>
                                <SelectTrigger className="bg-background border-border min-w-[100px]">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    {years.map((y) => (
                                        <SelectItem key={y} value={y}>
                                            {y}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium mb-3">Time</h3>
                        <div className="flex gap-6">
                            <Select value={hour} onValueChange={setHour}>
                                <SelectTrigger className="bg-background border-border w-full">
                                    <SelectValue placeholder="Hour" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    {hours.map((h) => (
                                        <SelectItem key={h} value={h}>
                                            {h}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={minute} onValueChange={setMinute}>
                                <SelectTrigger className="bg-background border-border w-full">
                                    <SelectValue placeholder="Minute" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    {minutes.map((m) => (
                                        <SelectItem key={m} value={m}>
                                            {m}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={ampm} onValueChange={setAmpm}>
                                <SelectTrigger className="bg-background border-border w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="AM">AM</SelectItem>
                                    <SelectItem value="PM">PM</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium mb-1">Time zone</h3>
                            <p className="text-sm text-muted-foreground">
                                {Intl.DateTimeFormat()
                                    .resolvedOptions()
                                    .timeZone.replace("_", " ")}
                            </p>
                        </div>
                        <Button
                            onClick={handleSchedule}
                            disabled={!canSchedule}
                        >
                            Confirm
                        </Button>
                    </div>

                    <div className="pt-4 border-t border-border">
                        <Button
                            variant="ghost"
                            className="text-primary hover:bg-primary/10 font-normal"
                        >
                            Scheduled posts
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
