import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { removeTask } from "@/lib/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TaskViewProps } from "./view-task";

interface RemoveTaskModalprops extends Pick<TaskViewProps, "setViewTask">{
  id:string
}

export function RemoveAlertDialogDemo({id, setViewTask}: RemoveTaskModalprops) {
  const [open, setOpen] = useState(false);
  
  const queryClient = useQueryClient();

  const {mutateAsync} = useMutation({
    mutationFn: removeTask,
    onSuccess: (data) => {
      // Invalidate and refetch
      if(data.success){
        console.log(data.message);
      }
      queryClient.invalidateQueries({ queryKey: ['getTasks'] })
    },
  })

  const onSubmit = () => {
    try{
      mutateAsync(id);
    }catch(e){
      console.log(e);
      console.log("something went wrong in updating task");
    }finally{
      setOpen(false);
      setViewTask(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className='md:py-4 md:px-8 py-2 px-4 text-[10px] sm:text-xs cursor-pointer' variant="destructive">Remove</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            task and remove task data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} className="bg-destructive hover:bg-destructive/80">Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
