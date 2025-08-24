"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarMenuButton } from "./ui/sidebar";
import { Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { createTaskValidation } from "@/lib/form-validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/lib/apis";
import { Loader2Icon } from "lucide-react"


const CreateTaskModal = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<z.infer<typeof createTaskValidation>>({
    resolver: zodResolver(createTaskValidation)
  });

  const queryClient = useQueryClient();

  const {mutateAsync} = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      // Invalidate and refetch
      if(data.success){
        console.log(data.message);
      }
      queryClient.invalidateQueries({ queryKey: ['getTasks'] })
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof createTaskValidation>> = (data) => {
    try{
      console.log(data);
      mutateAsync(data);
    }catch(e){
      console.log(e);
      console.log("something went wrong in creating task");
    }finally{
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton
          className="py-6 px-4 cursor-pointer text-[#3a3a3b] hover:bg-black hover:text-white"
          tooltip="Create Task"
        >
          <Plus />
          <span className="font-inter text-base font-semibold my-1">Create Task</span>
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Task Title</Label>
            <Input id="title" {...register("title", { required: true })} />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Task Description</Label>
            <Textarea id="description" {...register("description", { required: true })} />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>

          <div className="flex gap-5">
            <div className="grid gap-3">
              <Label htmlFor="status">Task Status</Label>
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In-Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="priority">Task Priority</Label>
              <Controller
                name="priority"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && <span className="text-red-500 text-sm">{errors.priority.message}</span>}
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="dueDate">Task Due Date</Label>
            <input type="datetime-local" {...register("dueDate", { required: true })} id="dueDate" />
            {errors.dueDate && <span className="text-red-500 text-sm">{errors.dueDate.message}</span>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <Button disabled={isSubmitting} className="bg-btn-theme" type="submit">
              Save changes {isSubmitting && <Loader2Icon className="animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal;
