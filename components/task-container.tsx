import React from 'react'
import {Clock} from 'lucide-react'


interface TaskContainerProps{
    heading: string
    tasks: { 
    userId: number;
    title: string;
    description: string;
    status: string;
    priority: "high" | "normal" | "low";
    dueDate: Date;
    completedAt: null|Date}[]
}

const TaskContainer = ({heading, tasks}:TaskContainerProps) => {
    // filtering task based on status
    const filteredTasks = tasks.filter((task) => task.status === heading);
    
    const priorityColors = {
        low: "#7bf1a8",
        normal: "#8ec5ff",
        high: "#ffa2a2"
    }

  return (
    <section className='w-full flex flex-col items-start justify-start gap-6 bg-gray-100 p-5 rounded-lg font-roboto shadow-md'>
    <h2 className='text-xs font-bold uppercase'>{heading} <span className='bg-gray-300 p-1 px-2 rounded-sm'>{filteredTasks.length || 0}</span></h2>
    
    {filteredTasks?.map((task) => (
        <div key={task.title} className='flex flex-col items-start justify-start bg-white border-gray-300 w-full p-4 px-6 rounded-lg'>
            <div className='flex font-bold text-base gap-5'>
            <h1>{task.title}</h1> 
            <div
                style={{backgroundColor: priorityColors[task.priority]}}
                className='p-1 px-2 font-semibold text-[10px] rounded-2xl text-gray-800 text-center'
            >
                {task.priority} priority
            </div>
            </div>

            <div className='text-xs text-gray-500 flex gap-4 mt-3'>
            <div>overdue: {new Date(task.dueDate).toISOString()}</div>
            <div className='flex justify-center items-center gap-1'><Clock size={10}/>5 days left</div>
            </div>
        </div>
    ))}
    </section>
  )
}

export default TaskContainer