"use client"

import type * as React from "react"
import { BookOpen, Cpu, Folder, LineChart, PlayCircle, AlertTriangle, LogOut, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Assets",
    url: "/view-substations",
    icon: Folder,
    color: "text-blue-700",
  },
  {
    title: "Live Trend",
    url: "/live-trend",
    icon: LineChart,
    color: "text-green-700",
  },
  {
    title: "Simulation",
    url: "/simulation",
    icon: PlayCircle,
    color: "text-purple-700",
  },
  {
    title: "Diagnosis",
    url: "/diagnosis",
    icon: AlertTriangle,
    color: "text-red-700",
  },
  {
    title: "Courses",
    url: "/resources",
    icon: BookOpen,
    color: "text-teal-700",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="bg-white border-r" {...props}>
      <SidebarHeader className="h-16 flex items-center justify-center border-b bg-white px-4">
        <div className="flex items-center gap-2 font-bold text-xl group-data-[collapsible=icon]:hidden">
          <Cpu className="h-6 w-6 text-blue-600" />
          <span>OCEANBERG</span>
        </div>
        <div className="hidden group-data-[collapsible=icon]:block">
          <Cpu className="h-6 w-6 text-blue-600" />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white pt-4">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} className="h-12">
                <a href={item.url} className="flex items-center gap-3 px-4">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span className={`font-medium ${item.color} text-base`}>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="bg-white p-4 border-t space-y-3">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@oceanberg.com</p>
          </div>
        </div>

        <div className="flex gap-2 group-data-[collapsible=icon]:justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 group-data-[collapsible=icon]:flex-none text-gray-600 hover:text-gray-900"
          >
            <Settings className="h-4 w-4" />
            <span className="ml-2 group-data-[collapsible=icon]:hidden">Settings</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 group-data-[collapsible=icon]:flex-none text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span className="ml-2 group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
