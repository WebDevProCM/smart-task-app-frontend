"use client"

import { type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { motion } from "motion/react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={item.isActive}
          className="group/collapsible my-1 text-center flex items-center justify-center"
        >
          <SidebarMenuItem>
            <Link className="w-full flex items-center justify-center" href={`${item?.url}`}>
              <SidebarMenuButton
                className="py-6 px-4 cursor-pointer text-[#3a3a3b] hover:bg-black hover:text-white"
                tooltip={item.title}>
                {item.icon && <item.icon/>}
                <span className="font-inter text-base font-semibold my-1">{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  )
}
