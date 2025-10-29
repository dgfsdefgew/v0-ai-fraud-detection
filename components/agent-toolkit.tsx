"use client"

import type React from "react"

import { useState } from "react"
import type { Activity } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Plus, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AgentToolkitProps {
  onAnalyze: () => void
  onAddActivity: (activity: Omit<Activity, "id">) => void
  isAnalyzing: boolean
  analysisSummary: string | null
}

export function AgentToolkit({ onAnalyze, onAddActivity, isAnalyzing, analysisSummary }: AgentToolkitProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    activityType: "",
    description: "",
    location: "",
    ipAddress: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddActivity({
      ...formData,
      timestamp: new Date().toISOString(),
    })
    setFormData({
      customerId: "",
      customerName: "",
      activityType: "",
      description: "",
      location: "",
      ipAddress: "",
    })
    setShowForm(false)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Analysis
          </CardTitle>
          <CardDescription>Use AI to detect suspicious patterns and potential fraud</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={onAnalyze} disabled={isAnalyzing} className="w-full" size="lg">
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Activities...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze with AI
              </>
            )}
          </Button>

          {analysisSummary && (
            <Alert>
              <AlertDescription className="text-sm">{analysisSummary}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Manual Entry
          </CardTitle>
          <CardDescription>Log a new customer activity</CardDescription>
        </CardHeader>
        <CardContent>
          {!showForm ? (
            <Button onClick={() => setShowForm(true)} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add New Activity
            </Button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer ID</Label>
                  <Input
                    id="customerId"
                    value={formData.customerId}
                    onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activityType">Activity Type</Label>
                <Input
                  id="activityType"
                  value={formData.activityType}
                  onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                  placeholder="e.g., Login, Policy Created, Claim Filed"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ipAddress">IP Address</Label>
                  <Input
                    id="ipAddress"
                    value={formData.ipAddress}
                    onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Add Activity
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
