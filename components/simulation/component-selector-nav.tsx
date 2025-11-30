"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSimulation } from "./simulation-context"

export function ComponentSelectorNav() {
  const { selectedComponent, setSelectedComponent } = useSimulation()

  return (
    <div className="flex-shrink-0">
      <Tabs value={selectedComponent} onValueChange={(v) => setSelectedComponent(v as any)}>
        <TabsList className="grid w-full grid-cols-5 bg-transparent p-0 gap-2">
          <TabsTrigger 
            value="transformer"
            className="bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white data-[state=active]:border-[#1A1A1A]"
          >
            Transformer
          </TabsTrigger>
          <TabsTrigger 
            value="bayLines"
            className="bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white data-[state=active]:border-[#1A1A1A]"
          >
            Bay Lines
          </TabsTrigger>
          <TabsTrigger 
            value="circuitBreaker"
            className="bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white data-[state=active]:border-[#1A1A1A]"
          >
            Circuit Breaker
          </TabsTrigger>
          <TabsTrigger 
            value="isolator"
            className="bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white data-[state=active]:border-[#1A1A1A]"
          >
            Isolator
          </TabsTrigger>
          <TabsTrigger 
            value="busbar"
            className="bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white data-[state=active]:border-[#1A1A1A]"
          >
            Busbar
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

