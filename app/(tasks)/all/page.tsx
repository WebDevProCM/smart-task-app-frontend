"use client";

import LayoutHeaderText from '@/components/layout-header-text'
import React, { useState } from 'react'
import {Clock} from 'lucide-react'
import TaskContainer from '@/components/task-container';
import { Task } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAllTasks } from '@/lib/apis';
import { Progress } from '@/components/ui/progress';


const AllTaskPage = () => {
  const queryClient = useQueryClient();
  const [fetchingProgress, setFetchingProgress] = useState(0);

  const {data, error, isLoading} = useQuery({ queryKey: ['getTasks'], queryFn: () => fetchAllTasks(setFetchingProgress) })

  // const dummyTasks: Task[] = [
  //   {
  //     _id: "1", // Replace with real userId if needed
  //     title: "Buy groceries",
  //     description: "Milk, Bread, Eggs, and Fruits",
  //     status: "pending",
  //     priority: "normal",
  //     dueDate: new Date(Date.now() + 86400000 * 2).toString(), // 2 days from now
  //     completedAt: null
  //   },
  //   {
  //     userId: 2,
  //     title: "Finish project report",
  //     description: "Complete the final section and submit via email",
  //     status: "in-progress",
  //     priority: "high",
  //     dueDate: new Date(Date.now() + 86400000 * 3),
  //     completedAt: null
  //   },
  //   {
  //     userId: 2,
  //     title: "Clean the house",
  //     description: "Vacuum all rooms and clean the bathrooms",
  //     status: "completed",
  //     priority: "low",
  //     dueDate: new Date(Date.now() + 86400000),
  //     completedAt: new Date(Date.now() - 3600000) // 1 hour ago
  //   },
  //   {
  //     userId:2,
  //     title: "Call the electrician",
  //     description: "Fix kitchen light issue",
  //     status: "pending",
  //     priority: "normal",
  //     dueDate: new Date(Date.now() + 86400000 * 5),
  //     completedAt: null
  //   },
  //   {
  //     userId: 2,
  //     title: "Write blog post",
  //     description: "Topic: Improving productivity with time blocking",
  //     status: "in-progress",
  //     priority: "high",
  //     dueDate: new Date(Date.now() + 86400000 * 4),
  //     completedAt: null
  //   }
  // ];

  return (
    <div className='min-h-screen max-h-full w-full bg-white rounded-md sm:p-10 p-5'>
      <LayoutHeaderText />

      {/* <section className='flex flex-col items-start justify-start gap-6 bg-gray-100 p-5 rounded-lg font-roboto'>
        <h2 className='text-xs font-bold uppercase'>In progress <span className='bg-gray-300 p-1 px-2 rounded-sm'>2</span></h2>

        <div className='flex flex-col items-start justify-start bg-white border-gray-300 w-full p-4 px-6 rounded-lg'>
          <div className='flex font-bold text-base gap-5'>
            <h1>Something new</h1> 
            <div className='bg-red-300 p-1 px-2 font-semibold text-[10px] rounded-2xl text-gray-800 text-center'>hight priority</div>
          </div>

          <div className='text-xs text-gray-500 flex gap-4 mt-3'>
            <div>overdue: 2025/05/25 18.00</div>
            <div className='flex justify-center items-center gap-1'><Clock size={10}/>5 days left</div>
          </div>
        </div>
      </section> */}
      <section className='w-full h-full flex flex-col justify-start items-start gap-5 mt-5'>
        {isLoading ? 
          <Progress value={fetchingProgress} />
          :
          <>
          <TaskContainer heading='pending' tasks={data!}/>
          <TaskContainer heading='in-progress' tasks={data!}/>
          <TaskContainer heading='completed' tasks={data!}/>
          </>
        }

      </section>
    </div>
  )
}

export default AllTaskPage