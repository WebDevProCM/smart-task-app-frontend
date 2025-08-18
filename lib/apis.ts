import axios from "axios";
import axiosApi from "./axios-instance";
import { Task } from "@/types";

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