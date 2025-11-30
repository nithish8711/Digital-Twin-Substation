"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"
import { BookOpen, Cpu, Folder, LineChart, PlayCircle, AlertTriangle, LogOut, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

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
    accent: "text-blue-600",
    bgAccent: "bg-blue-50",
    hoverBg: "hover:bg-blue-50",
  },
  {
    title: "Live Trend",
    url: "/live-trend",
    icon: LineChart,
    accent: "text-emerald-600",
    bgAccent: "bg-emerald-50",
    hoverBg: "hover:bg-emerald-50",
  },
  {
    title: "Simulation",
    url: "/simulation",
    icon: PlayCircle,
    accent: "text-purple-600",
    bgAccent: "bg-purple-50",
    hoverBg: "hover:bg-purple-50",
  },
  {
    title: "Diagnosis",
    url: "/diagnosis",
    icon: AlertTriangle,
    accent: "text-rose-600",
    bgAccent: "bg-rose-50",
    hoverBg: "hover:bg-rose-50",
  },
  {
    title: "Courses",
    url: "/resources",
    icon: BookOpen,
    accent: "text-sky-600",
    bgAccent: "bg-sky-50",
    hoverBg: "hover:bg-sky-50",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 shadow-lg" {...props}>
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-4">
        <div className="flex items-center gap-3 font-bold text-2xl group-data-[collapsible=icon]:hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-black shadow-md">
            <Cpu className="h-6 w-6 text-white" />
          </div>
          <span className="text-black">OCEANBERG</span>
        </div>
        <div className="hidden group-data-[collapsible=icon]:block">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-black shadow-md">
            <Cpu className="h-6 w-6 text-white" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-transparent pt-6 px-3 group-data-[collapsible=icon]:px-2">
        <SidebarMenu className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.url) || (item.url === "/view-substations" && pathname === "/")
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title} 
                  className={cn(
                    "h-auto",
                    isActive && "[&:hover]:!bg-[#3A3A3A] [&:hover]:!text-white [&_a:hover]:!bg-[#3A3A3A] [&_a:hover]:!text-white"
                  )}
                >
                  <a
                    href={item.url}
                    className={cn(
                      "flex items-center rounded-xl transition-all duration-200",
                      "w-full gap-3 px-4 py-3",
                      "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-auto",
                      "text-base font-semibold",
                      "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                      isActive
                        ? "bg-[#1A1A1A] text-white shadow-md hover:!bg-[#3A3A3A] hover:!text-white active:bg-[#0F0F0F]"
                        : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200",
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center rounded-lg transition-colors flex-shrink-0",
                      "w-9 h-9",
                      "group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10",
                      isActive ? "bg-white/20 hover:bg-white/30" : "bg-slate-100"
                    )}>
                      <item.icon className={cn(
                        "h-5 w-5 flex-shrink-0",
                        "group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5",
                        isActive ? "text-white" : "text-slate-600"
                      )} />
                    </div>
                    <span className={cn(
                      "flex-1 truncate text-left",
                      "group-data-[collapsible=icon]:hidden",
                      isActive ? "text-white" : "text-slate-700"
                    )}>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="bg-gradient-to-t from-slate-50 to-transparent p-4 border-t border-slate-200 space-y-3 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
          <Avatar className="h-10 w-10 ring-2 ring-gray-200 flex-shrink-0">
            <AvatarFallback className="bg-black text-white font-semibold shadow-md">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-black">John Doe</p>
            <p className="text-xs text-black">john.doe@oceanberg.com</p>
          </div>
        </div>

        <div className="flex gap-2 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 group-data-[collapsible=icon]:flex-none group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center text-black hover:text-black hover:bg-gray-100 rounded-lg"
          >
            <Settings className="h-4 w-4" />
            <span className="ml-2 group-data-[collapsible=icon]:hidden">Settings</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 group-data-[collapsible=icon]:flex-none group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center text-black hover:text-black hover:bg-gray-100 rounded-lg"
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
