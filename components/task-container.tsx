"use client"

import React, { useState } from 'react'
import {Clock} from 'lucide-react'
import {format} from 'date-fns'
import ViewTask from './view-task'
import { motion } from "motion/react"
import { Task } from '@/types'

interface TaskContainerProps{
    heading: string
    tasks: Task[]
}

const TaskContainer = ({heading, tasks}:TaskContainerProps) => {
    // filtering task based on status
    const filteredTasks = tasks.filter((task) => task.status === heading);

    //managing clicked task data state
    const [viewTask, setViewTask] = useState(false);
    const [viewTaskData, setViewTaskData] = useState<Task|null>(null);
    
    //priority status colors
    type Priority = 'low' | 'normal' | 'high';
    const priorityColors = {
        low: "#7bf1a8",
        normal: "#8ec5ff",
        high: "#ffa2a2"
    }

    //view task handler
    const viewTaskHandler = (task:Task) => {
        setViewTask(true);
        setViewTaskData(task);
    }

  return (
    <>
        <section className='w-full flex flex-col items-start justify-start sm:gap-6 gap-4 bg-gray-100 sm:p-5 p-3 rounded-lg font-roboto shadow-md'>
        <h2 className='text-xs font-bold uppercase'>{heading} <span className='bg-gray-300 p-1 px-2 rounded-sm'>{filteredTasks.length || 0}</span></h2>
        
        {filteredTasks?.map((task) => {
            const dueDate = new Date(task.dueDate);
            const formattedDate = format(dueDate, "EEE MMM d y h:m aa");
            const daysLeft = new Date().getDate()-dueDate.getDate()
            return (
            <motion.div 
                whileHover={{
                    scale: 1.02
                }}
                key={task.title} 
                className='flex flex-col items-start justify-start bg-white border-gray-300 w-full p-4 sm:px-6 px-2 rounded-lg cursor-pointer'
                onClick={() => viewTaskHandler(task)}
            >
                <div className='flex justify-start items-center font-bold sm:text-base text-sm gap-5'>
                    <h1>{task.title}</h1> 
                    <div
                        style={{backgroundColor: priorityColors[task.priority as Priority]}}
                        className='p-1 px-2 font-semibold sm:text-[10px] text-[8px] rounded-2xl text-gray-800 text-center'
                    >
                        <span>{task.priority} priority</span>
                    </div>
                </div>

                <div className='sm:text-xs text-[10px] text-gray-500 flex gap-4 mt-5'>
                <div><span className='text-gray-600'>overdue:</span> {formattedDate}</div>
                <div className='flex justify-center items-start gap-1'>
                    <Clock size={11}/>
                    <span>{daysLeft < 0 ? 0 : daysLeft} days left</span>
                </div>
                </div>
            </motion.div>
            )
        })}
        </section>

        {viewTask && <ViewTask setViewTask={setViewTask} task={viewTaskData!}/> }
    </>
  )
}

export default TaskContainer