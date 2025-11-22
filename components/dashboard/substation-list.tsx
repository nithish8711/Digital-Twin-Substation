"use client"

import { Eye, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DUMMY_SUBSTATIONS } from "@/lib/dummy-data"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Substation {
  id: string
  master: {
    name: string
    areaName: string
    voltageClass: string
    operator: string
    installationYear: number
    substationCode: string
  }
}

export function SubstationList() {
  const router = useRouter()

  const getStatus = () => "active" as const

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {DUMMY_SUBSTATIONS.map((substation) => (
        <Card key={substation.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="border-b bg-slate-50/50 p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{substation.master.name}</CardTitle>
                <div className="text-sm text-muted-foreground">{substation.master.areaName}</div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {substation.master.substationCode}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between py-1 border-b border-dashed">
                <span className="text-muted-foreground">Voltage Class</span>
                <span className="font-medium">{substation.master.voltageClass}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed">
                <span className="text-muted-foreground">Operator</span>
                <span className="font-medium">{substation.master.operator}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed">
                <span className="text-muted-foreground">Installation Year</span>
                <span className="font-medium">{substation.master.installationYear}</span>
              </div>
              <div className="flex justify-between py-1 pt-2">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50/50 p-3 flex gap-2">
            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" size="sm">
              <Link href={`/asset-details/${substation.id}`}>
                <Eye className="mr-2 h-4 w-4" /> View
              </Link>
            </Button>
            <Button
              onClick={() => router.push(`/edit-substation/${substation.id}`)}
              variant="outline"
              size="sm"
              className="flex-1 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
            >
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
