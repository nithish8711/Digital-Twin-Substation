"use client"

import { use, useState } from "react"
import { getSubstationById } from "@/lib/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Calendar, FileText, Wrench, Activity } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EditableMasterForm } from "@/components/forms/editable-master-form"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface EditSubstationPageProps {
  params: Promise<{ id: string }>
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function EditSubstationPage({ params }: EditSubstationPageProps) {
  const resolvedParams = use(params)
  const substation = getSubstationById(resolvedParams.id)
  const [isSaving, setIsSaving] = useState(false)

  if (!substation) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h1 className="text-2xl font-bold">Substation Not Found</h1>
        <p className="text-muted-foreground">The substation you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/manage-substations">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Manage
          </Link>
        </Button>
      </div>
    )
  }

  const handleSaveMaster = async (data: any) => {
    setIsSaving(true)
    try {
      // Update in Firestore
      const substationRef = doc(db, "substations", substation.id)
      await updateDoc(substationRef, {
        master: data,
        updatedAt: new Date().toISOString(),
      })
      alert("Master data saved successfully!")
    } catch (error) {
      console.error("Error saving master data:", error)
      alert("Error saving data. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/manage-substations">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{substation.master.name}</h1>
              <p className="text-sm text-muted-foreground">
                {substation.master.areaName} • {substation.master.substationCode}
              </p>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          form="master-form"
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={isSaving}
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Master Data Section */}
      <Card>
        <CardHeader>
          <CardTitle>Master Data</CardTitle>
        </CardHeader>
        <CardContent>
          <EditableMasterForm substation={substation} onSave={handleSaveMaster} />
        </CardContent>
      </Card>

      {/* Assets Section */}
      <Tabs defaultValue="transformers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1 overflow-x-auto">
          <TabsTrigger value="transformers">Transformers</TabsTrigger>
          <TabsTrigger value="breakers">Breakers</TabsTrigger>
          <TabsTrigger value="ctvt">CT/VT</TabsTrigger>
          <TabsTrigger value="busbars">Busbars</TabsTrigger>
          <TabsTrigger value="relays">Relays</TabsTrigger>
          <TabsTrigger value="pmu">PMU</TabsTrigger>
          <TabsTrigger value="battery">Battery</TabsTrigger>
          <TabsTrigger value="gis">GIS</TabsTrigger>
          <TabsTrigger value="isolators">Isolators</TabsTrigger>
          <TabsTrigger value="powerFlowLines">Power Flow Lines</TabsTrigger>
          <TabsTrigger value="earthing">Earthing</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
        </TabsList>

        {/* Transformers Tab */}
        <TabsContent value="transformers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transformers ({substation.assets.transformers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.transformers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No transformers available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.transformers.map((transformer) => (
                    <AccordionItem key={transformer.id} value={transformer.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{transformer.id}</Badge>
                          <span className="font-medium">
                            {transformer.manufacturer} - {transformer.model}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Rated MVA</p>
                              <p className="font-medium">{transformer.ratedMVA} MVA</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">HV/LV</p>
                              <p className="font-medium">
                                {transformer.HV_kV}kV / {transformer.LV_kV}kV
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Cooling Type</p>
                              <p className="font-medium">{transformer.coolingType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Vector Group</p>
                              <p className="font-medium">{transformer.vectorGroup}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Installation Year</p>
                              <p className="font-medium">{transformer.installationYear}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge
                                variant={transformer.conditionAssessment.status === "Good" ? "default" : "secondary"}
                              >
                                {transformer.conditionAssessment.status}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Core Material</p>
                              <p className="font-medium">{transformer.coreMaterial}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Winding Material</p>
                              <p className="font-medium">{transformer.windingMaterial}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Oil Type</p>
                              <p className="font-medium">{transformer.oilType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Oil Moisture</p>
                              <p className="font-medium">{transformer.oilMoisture_ppm} ppm</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">OLTC Operations</p>
                              <p className="font-medium">{transformer.oltcOpsCount}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Buchholz Installed</p>
                              <p className="font-medium">{transformer.buchholzInstalled ? "Yes" : "No"}</p>
                            </div>
                          </div>

                          {/* DGA Data */}
                          {transformer.DGA && (
                            <div className="mt-4 p-3 bg-white rounded border">
                              <p className="text-sm font-medium mb-2">Dissolved Gas Analysis (DGA)</p>
                              <div className="grid grid-cols-5 gap-2 text-xs">
                                <div>
                                  <span className="text-muted-foreground">H2:</span> {transformer.DGA.H2} ppm
                                </div>
                                <div>
                                  <span className="text-muted-foreground">CH4:</span> {transformer.DGA.CH4} ppm
                                </div>
                                <div>
                                  <span className="text-muted-foreground">C2H2:</span> {transformer.DGA.C2H2} ppm
                                </div>
                                <div>
                                  <span className="text-muted-foreground">C2H4:</span> {transformer.DGA.C2H4} ppm
                                </div>
                                <div>
                                  <span className="text-muted-foreground">CO:</span> {transformer.DGA.CO} ppm
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Maintenance History */}
                          {transformer.maintenanceHistory && transformer.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {transformer.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                    {maintenance.documents && maintenance.documents.length > 0 && (
                                      <div className="mt-2 flex items-center gap-2 text-xs text-blue-600">
                                        <FileText className="h-3 w-3" />
                                        {maintenance.documents.length} document(s)
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Operation History */}
                          {transformer.operationHistory && transformer.operationHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Activity className="h-4 w-4" />
                                Operation History
                              </p>
                              <div className="space-y-2">
                                {transformer.operationHistory.map((operation: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDateTime(operation.date)}</span>
                                      <Badge variant="outline">{operation.eventType}</Badge>
                                    </div>
                                    <p className="mt-1">{operation.description}</p>
                                    {operation.comtradeUrl && (
                                      <Button variant="link" size="sm" className="mt-2 p-0 h-auto text-xs">
                                        View COMTRADE
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Breakers Tab */}
        <TabsContent value="breakers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Circuit Breakers ({substation.assets.breakers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.breakers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No breakers available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.breakers.map((breaker) => (
                    <AccordionItem key={breaker.id} value={breaker.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{breaker.id}</Badge>
                          <span className="font-medium">
                            {breaker.manufacturer} - {breaker.model}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Type</p>
                              <p className="font-medium">{breaker.type}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Rated Voltage</p>
                              <p className="font-medium">{breaker.ratedVoltage_kV} kV</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Rated Current</p>
                              <p className="font-medium">{breaker.ratedCurrent_A} A</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Short Circuit Breaking</p>
                              <p className="font-medium">{breaker.shortCircuitBreaking_kA} kA</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Making Capacity</p>
                              <p className="font-medium">{breaker.makingCapacity_kA} kA</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Mechanism</p>
                              <p className="font-medium">{breaker.mechanismType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Operation Count</p>
                              <p className="font-medium">{breaker.opCount}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Operating Time</p>
                              <p className="font-medium">{breaker.operatingTime_ms} ms</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">SF6 Pressure</p>
                              <p className="font-medium">{breaker.sf6Pressure} bar</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge variant={breaker.conditionAssessment.status === "Good" ? "default" : "secondary"}>
                                {breaker.conditionAssessment.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Maintenance History */}
                          {breaker.maintenanceHistory && breaker.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {breaker.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Operation History */}
                          {breaker.operationHistory && breaker.operationHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Activity className="h-4 w-4" />
                                Operation History
                              </p>
                              <div className="space-y-2">
                                {breaker.operationHistory.map((operation: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDateTime(operation.date)}</span>
                                      <Badge variant="outline">{operation.eventType}</Badge>
                                    </div>
                                    <p className="mt-1">{operation.description}</p>
                                    {operation.comtradeUrl && (
                                      <Button variant="link" size="sm" className="mt-2 p-0 h-auto text-xs">
                                        View COMTRADE
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* CT/VT Tab */}
        <TabsContent value="ctvt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Current & Voltage Transformers ({substation.assets.ctvt.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.ctvt.length === 0 ? (
                <p className="text-sm text-muted-foreground">No CT/VT data available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.ctvt.map((ctvt) => (
                    <AccordionItem key={ctvt.id} value={ctvt.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{ctvt.id}</Badge>
                          <span className="font-medium">
                            {ctvt.manufacturer} - {ctvt.model}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Ratio</p>
                              <p className="font-medium">{ctvt.ratio}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Accuracy Class</p>
                              <p className="font-medium">{ctvt.accuracyClass}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Burden</p>
                              <p className="font-medium">{ctvt.burdenVA} VA</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Last Calibration</p>
                              <p className="font-medium">{formatDate(ctvt.lastCalibrationDate)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge variant={ctvt.conditionAssessment.status === "Good" ? "default" : "secondary"}>
                                {ctvt.conditionAssessment.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Maintenance History */}
                          {ctvt.maintenanceHistory && ctvt.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {ctvt.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Busbars Tab */}
        <TabsContent value="busbars" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Busbars ({substation.assets.busbars.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.busbars.length === 0 ? (
                <p className="text-sm text-muted-foreground">No busbars available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.busbars.map((busbar) => (
                    <AccordionItem key={busbar.id} value={busbar.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{busbar.id}</Badge>
                          <span className="font-medium">
                            {busbar.manufacturer} - {busbar.model}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Bus Type</p>
                              <p className="font-medium">{busbar.busType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Material</p>
                              <p className="font-medium">{busbar.material}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Capacity</p>
                              <p className="font-medium">{busbar.capacity_A} A</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Last IR Scan</p>
                              <p className="font-medium">{formatDate(busbar.lastIRScanDate)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge variant={busbar.conditionAssessment.status === "Good" ? "default" : "secondary"}>
                                {busbar.conditionAssessment.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Maintenance History */}
                          {busbar.maintenanceHistory && busbar.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {busbar.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relays Tab */}
        <TabsContent value="relays" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Protection Relays ({substation.assets.relays.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.relays.length === 0 ? (
                <p className="text-sm text-muted-foreground">No relay data available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.relays.map((relay) => (
                    <AccordionItem key={relay.id} value={relay.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{relay.id}</Badge>
                          <span className="font-medium">
                            {relay.manufacturer} - {relay.model}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Relay Type</p>
                              <p className="font-medium">{relay.relayType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Firmware Version</p>
                              <p className="font-medium">{relay.firmwareVersion}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Last Config Upload</p>
                              <p className="font-medium">{formatDateTime(relay.lastConfigUpload)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Enabled Functions</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {relay.enabledFunctions.map((func: string, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {func}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge variant={relay.conditionAssessment.status === "Good" ? "default" : "secondary"}>
                                {relay.conditionAssessment.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Maintenance History */}
                          {relay.maintenanceHistory && relay.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {relay.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PMU Tab */}
        <TabsContent value="pmu" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PMU ({substation.assets.pmu.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.pmu.length === 0 ? (
                <p className="text-sm text-muted-foreground">No PMU data available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.pmu.map((pmu) => (
                    <AccordionItem key={pmu.id} value={pmu.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{pmu.id}</Badge>
                          <span className="font-medium">
                            {pmu.manufacturer} - {pmu.model}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">GPS Sync Status</p>
                              <Badge variant={pmu.gpsSyncStatus === "Locked" ? "default" : "secondary"}>
                                {pmu.gpsSyncStatus}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Accuracy</p>
                              <p className="font-medium">{pmu.accuracy} ms</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Last Sync</p>
                              <p className="font-medium">{formatDateTime(pmu.lastSync)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge variant={pmu.conditionAssessment.status === "Good" ? "default" : "secondary"}>
                                {pmu.conditionAssessment.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Maintenance History */}
                          {pmu.maintenanceHistory && pmu.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {pmu.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Battery Tab */}
        <TabsContent value="battery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Battery Systems ({substation.assets.battery.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.battery.length === 0 ? (
                <p className="text-sm text-muted-foreground">No battery data available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.battery.map((battery) => (
                    <AccordionItem key={battery.id} value={battery.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{battery.id}</Badge>
                          <span className="font-medium">
                            {battery.manufacturer} - {battery.model}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Battery Type</p>
                              <p className="font-medium">{battery.batteryType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Rated Voltage</p>
                              <p className="font-medium">{battery.ratedVoltage_V} V</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Capacity</p>
                              <p className="font-medium">{battery.capacity_Ah} Ah</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Float Voltage</p>
                              <p className="font-medium">{battery.floatVoltage} V</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Internal Resistance</p>
                              <p className="font-medium">{battery.internalResistance} Ω</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge variant={battery.conditionAssessment.status === "Good" ? "default" : "secondary"}>
                                {battery.conditionAssessment.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Maintenance History */}
                          {battery.maintenanceHistory && battery.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {battery.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* GIS Tab */}
        <TabsContent value="gis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">GIS Equipment ({substation.assets.gis.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.gis.length === 0 ? (
                <p className="text-sm text-muted-foreground">No GIS data available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.gis.map((gis) => (
                    <AccordionItem key={gis.id} value={gis.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{gis.id}</Badge>
                          <span className="font-medium">
                            {gis.manufacturer} - {gis.model}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">PD Monitoring</p>
                              <p className="font-medium">{gis.pdMonitoringInstalled ? "Installed" : "Not Installed"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Last PD Test</p>
                              <p className="font-medium">{formatDate(gis.lastPDTest)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge variant={gis.conditionAssessment.status === "Good" ? "default" : "secondary"}>
                                {gis.conditionAssessment.status}
                              </Badge>
                            </div>
                          </div>

                          {/* SF6 Compartments */}
                          {gis.sf6Compartment && gis.sf6Compartment.length > 0 && (
                            <div className="mt-4 p-3 bg-white rounded border">
                              <p className="text-sm font-medium mb-2">SF6 Compartments</p>
                              <div className="space-y-2">
                                {gis.sf6Compartment.map((comp: any, idx: number) => (
                                  <div key={idx} className="flex items-center justify-between text-sm">
                                    <span>
                                      <span className="font-medium">{comp.compartmentId}:</span> {comp.pressure} bar
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Maintenance History */}
                          {gis.maintenanceHistory && gis.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {gis.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Isolators Tab */}
        <TabsContent value="isolators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Isolators ({substation.assets.isolators.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.isolators.length === 0 ? (
                <p className="text-sm text-muted-foreground">No isolators available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.isolators.map((isolator) => (
                    <AccordionItem key={isolator.id} value={isolator.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{isolator.id}</Badge>
                          <span className="font-medium">
                            {isolator.manufacturer} - {isolator.model}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Type</p>
                              <p className="font-medium">{isolator.type}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Drive Mechanism</p>
                              <p className="font-medium">{isolator.driveMechanism}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Interlock Info</p>
                              <p className="font-medium text-xs">{isolator.interlockInfo}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge variant={isolator.conditionAssessment.status === "Good" ? "default" : "secondary"}>
                                {isolator.conditionAssessment.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Maintenance History */}
                          {isolator.maintenanceHistory && isolator.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {isolator.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Power Flow Lines Tab */}
        <TabsContent value="powerFlowLines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Power Flow Lines ({substation.assets.powerFlowLines.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.powerFlowLines.length === 0 ? (
                <p className="text-sm text-muted-foreground">No power flow lines available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.powerFlowLines.map((line) => (
                    <AccordionItem key={line.id} value={line.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{line.id}</Badge>
                          <span className="font-medium">
                            {line.model} - {line.lineVoltage_kV}kV
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Line Voltage</p>
                              <p className="font-medium">{line.lineVoltage_kV} kV</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Length</p>
                              <p className="font-medium">{line.length_km} km</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Conductor Type</p>
                              <p className="font-medium">{line.conductorType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Thermal Limit</p>
                              <p className="font-medium">{line.thermalLimit_A} A</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Impedance (R/X)</p>
                              <p className="font-medium">
                                {line.impedance_R_X.R} / {line.impedance_R_X.X}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge variant={line.conditionAssessment.status === "Good" ? "default" : "secondary"}>
                                {line.conditionAssessment.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Maintenance History */}
                          {line.maintenanceHistory && line.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {line.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Earthing Tab */}
        <TabsContent value="earthing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Earthing ({substation.assets.earthing.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.earthing.length === 0 ? (
                <p className="text-sm text-muted-foreground">No earthing data available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.earthing.map((earthing) => (
                    <AccordionItem key={earthing.id} value={earthing.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{earthing.id}</Badge>
                          <span className="font-medium">
                            {earthing.manufacturer} - {earthing.model}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Grid Resistance</p>
                              <p className="font-medium">{earthing.gridResistance} Ω</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Soil Type</p>
                              <p className="font-medium">{earthing.soilType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Last Test Date</p>
                              <p className="font-medium">{formatDate(earthing.lastTestDate)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge variant={earthing.conditionAssessment.status === "Good" ? "default" : "secondary"}>
                                {earthing.conditionAssessment.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Maintenance History */}
                          {earthing.maintenanceHistory && earthing.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {earthing.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Environment Tab */}
        <TabsContent value="environment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Environment ({substation.assets.environment.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {substation.assets.environment.length === 0 ? (
                <p className="text-sm text-muted-foreground">No environment data available</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {substation.assets.environment.map((env) => (
                    <AccordionItem key={env.id} value={env.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{env.id}</Badge>
                          <span className="font-medium">
                            {env.manufacturer} - {env.model}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-slate-50 rounded-md">
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Last Calibration</p>
                              <p className="font-medium">{formatDate(env.lastCalibration)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Condition</p>
                              <Badge variant={env.conditionAssessment.status === "Good" ? "default" : "secondary"}>
                                {env.conditionAssessment.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Sensors */}
                          {env.sensors && env.sensors.length > 0 && (
                            <div className="mt-4 p-3 bg-white rounded border">
                              <p className="text-sm font-medium mb-2">Sensors</p>
                              <div className="space-y-2">
                                {env.sensors.map((sensor: any, idx: number) => (
                                  <div key={idx} className="flex items-center justify-between text-sm">
                                    <span className="capitalize font-medium">{sensor.type}:</span>
                                    <span className="text-muted-foreground">Threshold: {sensor.threshold}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Maintenance History */}
                          {env.maintenanceHistory && env.maintenanceHistory.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Maintenance History
                              </p>
                              <div className="space-y-2">
                                {env.maintenanceHistory.map((maintenance: any, idx: number) => (
                                  <div key={idx} className="p-3 bg-white rounded border text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{formatDate(maintenance.date)}</span>
                                      <Badge variant="outline">{maintenance.vendor}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs">Technician: {maintenance.technician}</p>
                                    <p className="mt-1">{maintenance.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
