"use client"

import { Button } from "@/components/ui/button"
import { useDiagnosisNav } from "./diagnosis-context"
import { PRIMARY_COMPONENTS, COMPONENT_DEFINITIONS } from "@/lib/diagnosis/component-config"


export function DiagnosisTopNav() {
  const { activeComponent, setActiveComponent } = useDiagnosisNav()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center gap-4 px-4">
        <div className="mr-4 hidden md:flex">
          <div className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl tracking-tight text-black">
              OCEANBERG <span className="text-black">DIGITAL TWIN</span>
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
                className={`shadow ${
                  activeComponent === key ? "ring-2 ring-offset-2 ring-white" : ""
                }`}
                onClick={() => setActiveComponent(key)}
              >
                {COMPONENT_DEFINITIONS[key].title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

