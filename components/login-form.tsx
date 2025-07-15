"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2Icon, Mail } from "lucide-react"
import Link from "next/link"
import { useActionState, useEffect } from "react";
import { loginUserFn } from "@/lib/actions";
import { useAppDispatch } from "@/lib/hooks";
import { loginUser } from "@/lib/auth-slice";

const LoginForm = ({
  className,
  ...props
}: {
  className?:string,
}) => {
  const [state, formAction, pending] = useActionState(loginUserFn, {});
  const dispatch = useAppDispatch();
  
  useEffect(() =>{
    if(state.success){
      dispatch(loginUser(state.user));
    }
  }, [state])
  
  return (
    <div className={cn("flex flex-col gap-6 font-inter", className)} {...props}>
      <Card className="p-0 border-none">
        <CardContent className="grid p-0 lg:grid-cols-2 grid-cols-1 items-center justify-center h-screen">
            <div className="relative bg-black text-white flex flex-col justify-center items-center gap-8 font-inter h-full">
                <h1 className="sm:text-6xl text-4xl font-bold gradient-text text-center pb-4 mb-5">SMART-TASK MANAGEMENT</h1>
                <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-xl font-bold text-center leading-15">
                    Hey you, welcome back!
                </h1>
                <p className="text-[#E0E0E0] lg:text-xl md:text-lg sm:text-sm text-xs text-center max-w-[450px]">
                    Log in to start manage your tasks easily.
                </p>
            </div>
          <form action={formAction} className="p-6 md:p-8 w-full max-w-[450px] mx-auto">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-1">
                <h1 className="text-2xl font-extrabold">Sign In to your account</h1>
                <p className="text-muted-foreground text-balance text-sm">
                  Don't have an account? <Link href="register" className="gradient-text font-medium cursor-pointer">Sign Up</Link>
                </p>
              </div>
              <div className="relative grid gap-3">
                <Label className="text-[#333333]" htmlFor="email">Email address</Label>
                <Mail className="absolute left-3 top-[66%] -translate-y-1/2 text-gray-400" size={18} />
                <Input
                    className="relative rounded-sm py-6 pl-10"  
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                />
                {state?.email && <p className="text-xs text-red-500">{state.email[0]}</p>}
              </div>
              <div className="grid gap-3">
                <Label className="text-[#333333]" htmlFor="email">Password</Label>
                <Input
                className="rounded-sm py-6"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  required
                />
                {state?.password && <p className="text-xs text-red-500">{state.password[0]}</p>}
              </div>
                <div className="flex justify-between items-center gap-3">
                    <div className="flex items-center gap-2">
                    <Checkbox id="terms" className="border-gray-500" />
                    <Label htmlFor="terms" className="text-gray-500 font-medium text-xs">Remember me</Label>
                    </div>
                    <p className="gradient-text text-xs font-semibold">Forgot password?</p>
                </div>
              <Button type="submit" className="w-full gradient-button font-bold font-san py-5 cursor-pointer">
                {pending && <Loader2Icon className="animate-spin" />}
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm