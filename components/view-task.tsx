import React, { useRef } from 'react'
import { Button } from './ui/button'
import {X, ChartColumnBig, Clock} from "lucide-react"
import { Badge } from './ui/badge'
import { format } from 'date-fns'
import { Task } from '@/types'
import { AnimatePresence, motion } from "motion/react"
import UpdateTaskModal from './update-task-modal'
import { RemoveAlertDialogDemo } from './remove-alert-box'


interface TaskViewProps{
    setViewTask: React.Dispatch<React.SetStateAction<boolean>>
    task: Task
}

const ViewTask = ({setViewTask, task}:TaskViewProps) => {
    const taskDiv = useRef<HTMLDivElement | null>(null);
    const dueDate = new Date(task.dueDate);
    const formattedDate = format(dueDate, "EEE MMM d y h:m aa");
    const daysLeft = new Date().getDate()-dueDate.getDate()

    const closeModalHandler = (e:React.MouseEvent<HTMLElement|SVGSVGElement>) =>{
        if(taskDiv.current && taskDiv.current.contains(e.currentTarget)){
            setViewTask(false);
            return;
        }
    }

    const updateTaskHandler = (status:string) =>{

    }

    const priorityColors = {
        low: "#7bf1a8",
        normal: "#8ec5ff",
        high: "#ffa2a2"
    }

    const nextTaskStatus = {
        "pending": "in-progress",
        "in-progress": "completed",
        "completed": "completed"
    }

  return (
    <AnimatePresence>
        <motion.main 
            initial={{
                opacity: 0,
                translateX: 100
            }}
            animate={{
                opacity: 1,
                translateX: 0
            }}
            exit={{
                opacity: 0,
                translateX: 100
            }}
            className='fixed w-[100%] h-screen top-0 right-0 bg-white/10 backdrop-blur-xs z-10 font-roboto' 
            onClick={closeModalHandler}
        >
            <div className='absolute sm:w-[50%] w-[70%] h-full top-0 right-0 bg-white border-2 border-gray-100 p-5 z-10' ref={taskDiv}>
                <div className='flex justify-between items-center border-b-2 border-gray-300 pb-5'>
                    <div className='flex gap-3'>
                        <UpdateTaskModal />
                        <RemoveAlertDialogDemo />
                    </div>

                    <X size={20} color='black' className='cursor-pointer' onClick={closeModalHandler}/>
                </div>

                <section className='py-5'>
                    <div className='flex justify-start items-start'>
                        <div className='flex font-bold gap-1'><ChartColumnBig size={18} color='gray'/> <span className='text-gray-600'>Task</span></div>
                    </div>

                    <h1 className='sm:text-2xl text-xl font-bold my-4'>{task.title}</h1>
                    
                    <div className='flex flex-wrap justify-start items-center sm:gap-2 gap-3 mt-4'>
                        <Badge style={{backgroundColor: priorityColors[task.priority]}} variant="secondary" className='bg-red-300'>{task.priority}</Badge>
                        <Badge variant="outline" className='bg-white'>{task.status}</Badge>
                        <Badge variant="secondary"><Clock size={10}/> {formattedDate}</Badge>
                        <Badge variant="secondary"><Clock size={10}/> {daysLeft < 0 ? 0 : daysLeft} days left</Badge>
                    </div>

                    <h1 className='sm:text-2xl text-xl font-bold my-6 mb-1'>Description</h1>

                    <p className='sm:text-sm text-xs text-gray-500'>{task.description}</p>

                    <Button 
                        className='md:py-4 md:px-8 py-2 px-4 sm:text-sm text-xs cursor-pointe mt-10 cursor-pointer hover:bg-black hover:text-white' 
                        variant="outline"
                        disabled={task.status === "completed"}
                    >
                        {nextTaskStatus[task.status]}
                    </Button>
                </section>
            </div>
        </motion.main>
    </AnimatePresence>
  )
}

export default ViewTask