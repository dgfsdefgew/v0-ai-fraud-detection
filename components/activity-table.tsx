"use client"

import type { Activity, SuspiciousActivity } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ActivityTableProps {
  activities: Activity[]
  suspiciousMap: Map<string, SuspiciousActivity>
  onViewAnalysis: (activity: Activity, suspicious: SuspiciousActivity) => void
}

export function ActivityTable({ activities, suspiciousMap, onViewAnalysis }: ActivityTableProps) {
  const getRiskColor = (score: number) => {
    if (score >= 80) return "bg-red-500 text-white"
    if (score >= 60) return "bg-orange-500 text-white"
    return "bg-yellow-500 text-black"
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Activity Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {activities.map((activity) => {
              const suspicious = suspiciousMap.get(activity.id)
              const isSuspicious = !!suspicious

              return (
                <tr key={activity.id} className={isSuspicious ? "bg-destructive/5" : "bg-card hover:bg-muted/30"}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {isSuspicious && (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <Badge className={getRiskColor(suspicious.riskScore)}>Risk: {suspicious.riskScore}</Badge>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-foreground">{activity.customerName}</div>
                      <div className="text-sm text-muted-foreground">{activity.customerId}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge variant="outline">{activity.activityType}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-md">
                      <p className="text-sm text-foreground">{activity.description}</p>
                      {activity.metadata && (
                        <div className="mt-1 flex flex-wrap gap-2">
                          {Object.entries(activity.metadata).map(([key, value]) => (
                            <span key={key} className="text-xs text-muted-foreground">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-foreground">{activity.location || "N/A"}</div>
                      <div className="text-muted-foreground">{activity.ipAddress}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {isSuspicious && (
                      <Button size="sm" variant="outline" onClick={() => onViewAnalysis(activity, suspicious)}>
                        View Analysis
                      </Button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
