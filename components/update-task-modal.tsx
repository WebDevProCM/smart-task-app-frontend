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
import { Loader2Icon, Plus } from "lucide-react"
import { Task } from "@/types"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { createTaskValidation } from "@/lib/form-validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import z from "zod"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { updateTask } from "@/lib/apis"
import { TaskViewProps } from "./view-task"


interface UpdateTaskModalprops extends Pick<TaskViewProps, "setViewTask">{
  taskDetails:Task
}

const UpdateTaskModal = ({taskDetails, setViewTask}:UpdateTaskModalprops) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<z.infer<typeof createTaskValidation>>({
    resolver: zodResolver(createTaskValidation)
  });

  const queryClient = useQueryClient();

  const {mutateAsync} = useMutation({
    mutationFn:(form:{data:z.infer<typeof createTaskValidation>, id:string}) => updateTask(form.data, form.id),
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
      mutateAsync({data, id: taskDetails._id });
    }catch(e){
      console.log(e);
      console.log("something went wrong in updating task");
    }finally{
      setOpen(false);
      setViewTask(false);
    }
  };

  console.log(new Date(taskDetails.dueDate).toLocaleDateString())

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='md:py-4 md:px-8 py-2 px-4 text-[10px] sm:text-xs cursor-pointer' variant="default">Update</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Task Title</Label>
            <Input id="title" defaultValue={taskDetails.title} {...register("title", { required: true })} />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Task Description</Label>
            <Textarea defaultValue={taskDetails.description} id="description" {...register("description", { required: true })} />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>

          <div className="flex gap-5">
            <div className="grid gap-3">
              <Label htmlFor="status">Task Status</Label>
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                defaultValue={taskDetails.status}
                render={({ field }) => (
                  <Select defaultValue={taskDetails.status} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent >
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
                defaultValue={taskDetails.priority}
                render={({ field }) => (
                  <Select defaultValue={taskDetails.priority} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue defaultValue={taskDetails.priority} placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent defaultValue={taskDetails.priority}>
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
            <input defaultValue={new Date(taskDetails.dueDate).toUTCString()} type="datetime-local" {...register("dueDate", { required: true })} id="dueDate" />
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
  )
}

export default UpdateTaskModal