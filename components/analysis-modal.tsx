"use client"

import type { Activity, SuspiciousActivity } from "@/lib/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

interface AnalysisModalProps {
  activity: Activity | null
  suspicious: SuspiciousActivity | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AnalysisModal({ activity, suspicious, open, onOpenChange }: AnalysisModalProps) {
  if (!activity || !suspicious) return null

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { label: "Critical", color: "bg-red-500 text-white" }
    if (score >= 60) return { label: "High", color: "bg-orange-500 text-white" }
    if (score >= 40) return { label: "Medium", color: "bg-yellow-500 text-black" }
    return { label: "Low", color: "bg-blue-500 text-white" }
  }

  const riskLevel = getRiskLevel(suspicious.riskScore)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            Fraud Analysis Report
          </DialogTitle>
          <DialogDescription>Detailed AI-generated analysis for suspicious activity</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Risk Score</div>
              <div className="text-3xl font-bold text-foreground">{suspicious.riskScore}/100</div>
            </div>
            <Badge className={`${riskLevel.color} text-lg px-4 py-1`}>{riskLevel.label} Risk</Badge>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Analysis</h3>
            <p className="text-sm text-foreground leading-relaxed">{suspicious.reason}</p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Activity Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Customer:</span>
                <div className="font-medium text-foreground">{activity.customerName}</div>
                <div className="text-muted-foreground">{activity.customerId}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Activity Type:</span>
                <div className="font-medium text-foreground">{activity.activityType}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Timestamp:</span>
                <div className="font-medium text-foreground">{new Date(activity.timestamp).toLocaleString()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <div className="font-medium text-foreground">{activity.location || "N/A"}</div>
                <div className="text-muted-foreground">{activity.ipAddress}</div>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Description:</span>
              <div className="font-medium text-foreground mt-1">{activity.description}</div>
            </div>
            {activity.metadata && Object.keys(activity.metadata).length > 0 && (
              <div>
                <span className="text-muted-foreground">Additional Information:</span>
                <div className="mt-1 space-y-1">
                  {Object.entries(activity.metadata).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="text-muted-foreground">{key}:</span>{" "}
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
