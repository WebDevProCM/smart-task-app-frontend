"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface DateTimePickerProps{
    date:Date | undefined,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    time: string | undefined,
    setTime: React.Dispatch<React.SetStateAction<string | undefined>>
}

export function DateTimePicker({date, setDate, time, setTime}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}


  return (
    <div>
        <div className="flex gap-4">
        <div className="flex flex-col gap-3">
            <Label htmlFor="date-picker" className="px-1 text-gray-500">
            Date
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                id="date-picker"
                className="w-32 justify-between font-normal"
                >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                    setDate(date)
                    setOpen(false)
                }}
                />
            </PopoverContent>
            </Popover>
        </div>
        <div className="flex flex-col gap-3">
            <Label htmlFor="time-picker" className="px-1 text-gray-500">
            Time
            </Label>
            <Input
            type="time"
            id="time-picker"
            step="1"
            onChange={(e) => setTime(e.target.value)}
            value={time ? time : "10:30:00"}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
        </div>
        </div>
        <div className="text-muted-foreground px-1 text-sm mt-1">
            Your task will be due on{" "}
            <span className="font-medium">{formatDate(date)}</span>.
        </div>
    </div>
  )
}
