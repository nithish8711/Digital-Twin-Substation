import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { ConditionalTopNav } from "@/components/layout/conditional-top-nav"
import { LiveTrendWrapper } from "@/components/live-trend/live-trend-wrapper"
import { SimulationWrapper } from "@/components/simulation/simulation-wrapper"
import { DiagnosisWrapper } from "@/components/diagnosis/diagnosis-wrapper"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Oceanberg Digital Twin",
  description: "Substation Management System",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-icon.png",
    shortcut: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-gray-50`}>
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <LiveTrendWrapper>
            <SimulationWrapper>
              <DiagnosisWrapper>
                <SidebarInset className="flex flex-col min-h-screen bg-gray-50">
                  <ConditionalTopNav />
                  <main className="flex-1 overflow-auto p-6">{children}</main>
                </SidebarInset>
              </DiagnosisWrapper>
            </SimulationWrapper>
          </LiveTrendWrapper>
        </SidebarProvider>
      </body>
    </html>
  )
}
