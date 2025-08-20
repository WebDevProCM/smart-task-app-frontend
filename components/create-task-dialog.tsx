"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SidebarMenuButton } from "./ui/sidebar"
import { Plus } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { DateTimePicker } from "./date-time-picker"
import { useState } from "react"

const CreateTaskModal = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>("10:30:00");


  return (
    <Dialog>
      <form className="w-full mx-auto">
        <DialogTrigger asChild className="w-full flex items-center justify-start mx-auto">
            <SidebarMenuButton
                className="py-6 px-4 cursor-pointer text-[#3a3a3b] hover:bg-black hover:text-white"
                tooltip="Create Task"
            >
                {<Plus />}
                <span className="font-inter text-base font-semibold my-1">Create Task</span>
            </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Task Title</Label>
              <Input id="title" name="title" defaultValue="Task title" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Task Description</Label>
              <Textarea id="description" name="description" defaultValue="Task description" />
            </div>
            <div className="flex gap-5">
              <div className="grid gap-3">
                <Label htmlFor="status">Task Status</Label>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="pending" defaultValue="pending" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In-Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="priority">Task Priority</Label>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="low" defaultValue="low" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="priority">Task Due Date</Label>
              <DateTimePicker date={date} setDate={setDate} time={time} setTime={setTime}/>
            </div>  
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <Button className="bg-btn-theme" type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateTaskModal