"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDiagnosisNav } from "./diagnosis-context"
import { SECONDARY_COMPONENTS, PRIMARY_COMPONENTS, COMPONENT_DEFINITIONS } from "@/lib/diagnosis/component-config"

const palette: Record<string, string> = {
  bayLines: "bg-blue-600 hover:bg-blue-700",
  transformer: "bg-green-600 hover:bg-green-700",
  circuitBreaker: "bg-purple-600 hover:bg-purple-700",
  busbar: "bg-orange-500 hover:bg-orange-600",
  isolator: "bg-teal-600 hover:bg-teal-700",
}

export function DiagnosisTopNav() {
  const { activeComponent, setActiveComponent } = useDiagnosisNav()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center gap-4 px-4">
        <div className="mr-4 hidden md:flex">
          <div className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl tracking-tight">
              OCEANBERG <span className="text-blue-600">DIGITAL TWIN</span>
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4 overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
            {PRIMARY_COMPONENTS.map((key) => (
              <Button
                key={key}
                size="sm"
                variant="default"
                className={`text-white shadow ${palette[key] ?? "bg-slate-600 hover:bg-slate-700"} ${
                  activeComponent === key ? "ring-2 ring-offset-2 ring-white" : ""
                }`}
                onClick={() => setActiveComponent(key)}
              >
                {COMPONENT_DEFINITIONS[key].title}
              </Button>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className={activeComponent && SECONDARY_COMPONENTS.includes(activeComponent) ? "border-blue-300" : ""}
                >
                  Others
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {SECONDARY_COMPONENTS.map((key) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setActiveComponent(key)}
                    className={activeComponent === key ? "bg-blue-50 text-blue-700" : ""}
                  >
                    {COMPONENT_DEFINITIONS[key].title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

