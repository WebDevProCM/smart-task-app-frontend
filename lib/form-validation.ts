import * as z from 'zod'

//validating login form inputs
export const loginFormValidation = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, {error: "password must be atleast 8 characters"})
        .regex(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\\S{8,}$'), {
            message: 'Password must be at least 8 characters, contain an uppercase letter, lowercase letter, number, and no spaces'
        })
})

export const signupFormValidation = z.object({
    name:z
        .string()
        .min(3,{error: "name must be atleast 3 characters"})
        .max(10,{error: "name must be less than 10 characters"}),
    email: z.email(),
    password: z
        .string()
        .min(8, {error: "password must be atleast 8 characters"})
        .regex(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\\S{8,}$'), {
            message: 'Password must be at least 8 characters, contain an uppercase letter, lowercase letter, number, and no spaces'
        })
})

export const createTaskValidation = z.object({
    title: z
        .string()
        .min(5,{error: "title must be atleast 5 characters"})
        .max(20,{error: "name must be less than 20 characters"}),
    description: z
        .string()
        .min(5,{error: "description must be atleast 5 characters"})
        .max(200,{error: "description must be less than 20 characters"}),
    status: z
        .enum(['pending', 'in-progress', 'completed']),
    priority: z
        .enum(['low', 'normal', 'high']),
    
    dueDate: z
        .string()
})