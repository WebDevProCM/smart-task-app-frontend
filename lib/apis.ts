import axios from "axios";
import axiosApi from "./axios-instance";
import { Task } from "@/types";

export const fetchAllTasks = async (updatingProgress:React.Dispatch<React.SetStateAction<number>>):Promise<Task[]> => {
    try{
        const response = await axios.get("http://localhost:3000/api/tasks", {
            onDownloadProgress(progressEvent) {
                if(progressEvent.lengthComputable){
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                    updatingProgress(percentCompleted);
                }else{
                    updatingProgress(100);
                }
            },
        });
        const data = response.data;
        if(!data.success){
            throw new Error(data.message);
        }

        return data.data;

    }catch(e){
        console.log(e);
        return [];
    }
}