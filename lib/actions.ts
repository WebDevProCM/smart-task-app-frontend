"use server"

import { success } from "zod";
import { loginUser } from "./auth-slice";
import axiosApi from "./axios-instance";
import { loginFormValidation } from "./form-validation";
import { useAppDispatch } from "./hooks";

 
export const loginUserFn = async (prevState: any, formData: FormData,) => {

  try {
    
    const validationResult = loginFormValidation.safeParse({email:formData.get('email'), password:formData.get('password')});
    if(!validationResult.success){
      return validationResult.error.flatten().fieldErrors;
    }
    const form = validationResult.data;
    const response = await axiosApi.post("/api/auth/login", form);
    const data = await response.data;

    if(!data.success){
      return {error: data.message}
    }

    return data;

  }catch(error){
    console.log(error);
    return {
      success: false,
      message: "something went wrong"
    }
  }
}