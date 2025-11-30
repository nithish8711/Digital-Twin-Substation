"use client"

import { Button } from "@/components/ui/button"
import { useLiveTrend } from "./live-trend-context"

export function LiveTrendTopNav() {
  const { activeCategory, setActiveCategory } = useLiveTrend()
  
  const navButtons = [
    { id: "substation", label: "Substation" },
    { id: "bayLines", label: "Bay Lines" },
    { id: "transformer", label: "Transformer" },
    { id: "circuitBreaker", label: "Circuit Breaker" },
    { id: "busbar", label: "Busbar" },
    { id: "isolator", label: "Isolator" },
    { id: "others", label: "Others" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="mr-4 hidden md:flex">
          <span className="hidden font-bold sm:inline-block text-xl tracking-tight text-black">
            OCEANBERG <span className="text-black">DIGITAL TWIN</span>
          </span>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {navButtons.map((button) => (
              <Button
                key={button.id}
                variant="default"
                className={`shadow-md transition-all ${
                  activeCategory === button.id ? "ring-2 ring-offset-2 ring-white" : ""
                }`}
                onClick={() => setActiveCategory(button.id)}
              >
                {button.label}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

