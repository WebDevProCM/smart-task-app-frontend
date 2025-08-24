import axios from "axios";
import axiosApi from "./axios-instance";
import { Task } from "@/types";
import z from "zod";
import { createTaskValidation } from "./form-validation";

interface response{
    success:boolean,
    data: Record<string,string>[],
    message: string
}

export const fetchAllTasks = async (
    updatingProgress:React.Dispatch<React.SetStateAction<number>>,
    page:number, 
    status:string
):Promise<Task[]> => 
    {
    try{
        const response = await axios.get(`http://localhost:3000/api/tasks?page=${page}&status=${status}`, {
            onDownloadProgress(progressEvent) {
                if(progressEvent.lengthComputable){
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                    updatingProgress(percentCompleted);
                }else{
                    updatingProgress(100);
                }
            },
            withCredentials: true
        },);
        const data = response.data;
        if(!data.success){
            throw new Error(data.message);
        }

        return data.data;

    }catch(e){
        console.log(e);
        throw new Error("Something went wrong");
    }
}

export const createTask = async (
    formData: z.infer<typeof createTaskValidation>
):Promise<response> => 
    {
    try{
        const response = await axios.post(`http://localhost:3000/api/tasks`, formData, {
            withCredentials: true
        });

        const data = response.data;
        if(!data.success){
            throw new Error(data.message);
        }

        return data;

    }catch(e){
        console.log(e);
        throw new Error("Something went wrong");
    }
}

export const updateTask = async (
    formData: z.infer<typeof createTaskValidation>,
    id:string
):Promise<response> => 
    {
    try{
        const response = await axios.patch(`http://localhost:3000/api/tasks/${id}`, formData, {
            withCredentials: true
        });

        const data = response.data;
        if(!data.success){
            throw new Error(data.message);
        }

        return data.data;

    }catch(e){
        console.log(e);
        throw new Error("Something went wrong");
    }
}

export const removeTask = async (
    id:string
):Promise<response> => 
    {
    try{
        const response = await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
            withCredentials: true
        });

        const data = response.data;
        if(!data.success){
            throw new Error(data.message);
        }

        return data;

    }catch(e){
        console.log(e);
        throw new Error("Something went wrong");
    }
}