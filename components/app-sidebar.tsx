"use client"

import * as React from "react"
import {
  ClipboardList,
  CalendarCheck,
  ChartColumnBig,
  CalendarClock,
  CalendarSearch,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { redirect, usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { NavMain } from "./nav-main"
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible"

// This is sample data.
const data = {
  navMain:[
    {
      title: "Dashboard",
      url: "/",
      icon: ChartColumnBig
    },
    {
      title: "All Tasks",
      url: "/all",
      icon: ClipboardList
    },
    {
      title: "Today",
      url: "/today",
      icon: CalendarCheck
    },
    {
      title: "Yesterday",
      url: "/yesterday",
      icon: CalendarClock
    },
    {
      title: "Future",
      url: "/future",
      icon: CalendarSearch
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();

  const logoutHandler = () =>{
    redirect("/login")
  }

  return (
    <Sidebar className="bg-white/20 backdrop-blur-md" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="gradient-button text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Avatar className="size-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold">Jhon smith</span>
                  <span className="text-xs font-medium text-gray-400">Task management</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="mt-4">
        {/* We create a SidebarGroup for each parent. */}
        <NavMain items={data.navMain}/>
      </SidebarContent>

      <SidebarFooter>
        <Collapsible
          key="logout"
          asChild
          defaultOpen={false}
          className="group/collapsible my-1 text-center flex items-center justify-center"
        >
            <CollapsibleTrigger className="py-6 px-4 cursor-pointer" asChild>
              <SidebarMenuButton 
                className="bg-red-600 font-inter text-white font-medium flex justify-center items-center gap-3 max-w-[100px] text-xs py-3 px-2 rounded-md cursor-pointer" 
                tooltip="logout"
                onClick={logoutHandler}
              >
                <LogOut size={12} color="black" /> <span>Log out</span>
                {/* {item.icon && <item.icon />}
                <span className="font-inter text-sm font-bold my-1 text-[#3a3a3b]">{item.title}</span> */}
              </SidebarMenuButton>
            </CollapsibleTrigger>
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  )
}
