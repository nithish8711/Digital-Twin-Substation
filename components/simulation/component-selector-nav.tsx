"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSimulation } from "./simulation-context"

export function ComponentSelectorNav() {
  const { selectedComponent, setSelectedComponent } = useSimulation()

  return (
    <div className="flex-shrink-0">
      <Tabs value={selectedComponent} onValueChange={(v) => setSelectedComponent(v as any)}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="transformer">Transformer</TabsTrigger>
          <TabsTrigger value="bayLines">Bay Lines</TabsTrigger>
          <TabsTrigger value="circuitBreaker">Circuit Breaker</TabsTrigger>
          <TabsTrigger value="isolator">Isolator</TabsTrigger>
          <TabsTrigger value="busbar">Busbar</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

