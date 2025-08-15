import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail } from "lucide-react"
import Link from "next/link"

const SignupForm = ({
  className,
  ...props
}: {className?:string}) => {
  return (
    <div className={cn("flex flex-col gap-6 font-inter h-screen", className)} {...props}>
      <Card className="p-0 border-none h-full">
        <CardContent className="grid p-0 lg:grid-cols-2 grid-cols-1 streth h-full">
          <div className="relative bg-black text-white flex flex-col justify-center items-center gap-8 font-inter lg:py-0 py-10">
              {/* <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              /> */}
              <h1 className="sm:text-6xl text-4xl font-bold gradient-text text-center pb-5 mb-5">SMART-TASK MANAGEMENT</h1>
              <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-xl font-bold text-center sm:leading-10 md:leading-15 leading-8">
                  Hey friend! Ready to start manage your tasks?
              </h1>
              <p className="text-[#E0E0E0] lg:text-xl md:text-lg sm:text-sm text-xs text-center max-w-[450px]">Create your account and start manage your most important tasks easily. It only takes a minute!</p>
          </div>

          <form className="p-6 md:p-8 w-full max-w-[450px] mx-auto place-content-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-1">
                <h1 className="text-2xl font-extrabold">Create your account</h1>
                <p className="text-gray-600 text-balance text-sm">
                  Already have an account? <Link href="/login" className="gradient-text cursor-pointer font-medium">Sign In</Link>
                </p>
              </div>
              <div className="relative grid gap-3">
                <Label className="text-[#333333]" htmlFor="email">User Name</Label>
                <User className="absolute left-3 top-[66%] -translate-y-1/2 text-gray-400" size={18} />
                <Input
                    className="relative rounded-sm py-6 pl-10"
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                />
              </div>
              <div className="relative grid gap-3">
                <Label className="text-[#333333]" htmlFor="email">Email Address</Label>
                <Mail className="absolute left-3 top-[66%] -translate-y-1/2 text-gray-400" size={18} />
                <Input
                    className="relative rounded-sm py-6 pl-10"  
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                />
              </div>
              <div className="grid gap-3">
                <Label className="text-[#333333]" htmlFor="email">Password</Label>
                <Input
                className="rounded-sm py-6"
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label className="text-[#333333]" htmlFor="email">Confirm password</Label>
                <Input
                className="rounded-sm py-6"
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <Button type="button" className="w-full gradient-button font-bold font-san py-5">
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignupForm