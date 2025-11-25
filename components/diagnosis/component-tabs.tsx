"use client"

import { useMemo } from "react"

import { COMPONENT_DEFINITIONS, PRIMARY_COMPONENTS, SECONDARY_COMPONENTS } from "@/lib/diagnosis/component-config"
import type { DiagnosisComponentKey } from "@/lib/diagnosis/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface ComponentTabsProps {
  active: DiagnosisComponentKey
  onChange: (component: DiagnosisComponentKey) => void
}

const primaryButtonPalette: Record<DiagnosisComponentKey, string> = {
  bayLines: "bg-blue-600 hover:bg-blue-700",
  transformer: "bg-emerald-600 hover:bg-emerald-700",
  circuitBreaker: "bg-purple-600 hover:bg-purple-700",
  busbar: "bg-orange-500 hover:bg-orange-600",
  isolator: "bg-teal-600 hover:bg-teal-700",
  relay: "bg-slate-600 hover:bg-slate-700",
  pmu: "bg-slate-600 hover:bg-slate-700",
  gis: "bg-slate-600 hover:bg-slate-700",
  battery: "bg-slate-600 hover:bg-slate-700",
  environment: "bg-slate-600 hover:bg-slate-700",
}

export function DiagnosisComponentTabs({ active, onChange }: ComponentTabsProps) {
  const activeSecondary = useMemo(
    () => (SECONDARY_COMPONENTS.includes(active) ? COMPONENT_DEFINITIONS[active] : null),
    [active],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {PRIMARY_COMPONENTS.map((component) => {
            const isActive = active === component
            return (
              <Button
                key={component}
                type="button"
                variant="default"
                className={cn(
                  "text-white shadow-md transition-all",
                  primaryButtonPalette[component],
                  isActive && "ring-2 ring-offset-2 ring-blue-100",
                )}
                onClick={() => onChange(component)}
              >
                {COMPONENT_DEFINITIONS[component].title}
              </Button>
            )
          })}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "border-dashed font-semibold",
                activeSecondary ? "text-blue-700 border-blue-200" : "text-slate-600",
              )}
            >
              {activeSecondary ? `Others • ${activeSecondary.title}` : "Others"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            {SECONDARY_COMPONENTS.map((component) => {
              const definition = COMPONENT_DEFINITIONS[component]
              return (
                <DropdownMenuItem
                  key={component}
                  onClick={() => onChange(component)}
                  className={cn(
                    "flex flex-col items-start space-y-0.5",
                    active === component && "bg-blue-50 text-blue-700",
                  )}
                >
                  <span className="text-sm font-semibold">{definition.title}</span>
                  <span className="text-xs text-slate-500">{definition.description}</span>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-xs text-slate-500">
        Primary equipment mirrors the Live Trend navigation. Secondary systems are grouped under “Others”.
      </p>
    </div>
  )
}

