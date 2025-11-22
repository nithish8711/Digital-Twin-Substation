"use client"

import { use } from "react"
import { getSubstationById } from "@/lib/dummy-data"
import { AssetDetails } from "@/components/dashboard/asset-details"

interface AssetDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function AssetDetailsPage({ params }: AssetDetailsPageProps) {
  const resolvedParams = use(params)
  const substation = getSubstationById(resolvedParams.id)

  if (!substation) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h1 className="text-2xl font-bold">Substation Not Found</h1>
        <p className="text-muted-foreground">The substation you're looking for doesn't exist.</p>
      </div>
    )
  }

  return <AssetDetails substation={substation} />
}
