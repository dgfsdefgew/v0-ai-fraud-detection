"use client"

import { useState } from "react"
import type { Activity, SuspiciousActivity } from "@/lib/types"
import { MOCK_ACTIVITIES } from "@/lib/constants"
import { analyzeFraudWithAI } from "@/lib/gemini-service"
import { CRMHeader } from "@/components/crm-header"
import { CustomerHeader } from "@/components/customer-header"
import { CustomerOverview } from "@/components/customer-overview"
import { CommunicationTimeline } from "@/components/communication-timeline"
import { ClaimsHistory } from "@/components/claims-history"
import { useToast } from "@/hooks/use-toast"
import { AnalysisModal } from "@/components/analysis-modal"

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES)
  const [suspiciousMap, setSuspiciousMap] = useState<Map<string, SuspiciousActivity>>(new Map())
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisSummary, setAnalysisSummary] = useState<string | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [selectedSuspicious, setSelectedSuspicious] = useState<SuspiciousActivity | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const { toast } = useToast()

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setAnalysisSummary(null)
    setSuspiciousMap(new Map())

    try {
      const result = await analyzeFraudWithAI(activities)
      setAnalysisSummary(result.summary)

      const newMap = new Map<string, SuspiciousActivity>()
      result.suspiciousActivities.forEach((suspicious) => {
        newMap.set(suspicious.activityId, suspicious)
      })
      setSuspiciousMap(newMap)

      toast({
        title: "Analysis Complete",
        description: `Found ${result.suspiciousActivities.length} suspicious activities`,
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleAddActivity = (newActivity: Omit<Activity, "id">) => {
    const activity: Activity = {
      ...newActivity,
      id: `act-${Date.now()}`,
    }
    setActivities([activity, ...activities])
    toast({
      title: "Activity Added",
      description: "New activity has been logged successfully",
    })
  }

  const handleViewAnalysis = (activity: Activity, suspicious: SuspiciousActivity) => {
    setSelectedActivity(activity)
    setSelectedSuspicious(suspicious)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CRMHeader />
      <CustomerHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
            <CustomerOverview />
          </div>

          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
            <CommunicationTimeline />
          </div>

          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
            <ClaimsHistory />
          </div>
        </div>
      </main>

      <AnalysisModal
        activity={selectedActivity}
        suspicious={selectedSuspicious}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  )
}
