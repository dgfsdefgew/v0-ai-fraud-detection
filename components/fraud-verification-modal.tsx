"use client"

import { useState } from "react"
import { X, Shield, MapPin, Wifi, AlertTriangle, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IDVerificationDialog } from "./id-verification-dialog"
import type { FraudReport } from "@/lib/fraud-types"

interface FraudVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  reports: FraudReport[]
  onPerformCheck: () => void
  isLoading: boolean
}

export function FraudVerificationModal({
  isOpen,
  onClose,
  reports,
  onPerformCheck,
  isLoading,
}: FraudVerificationModalProps) {
  const [showHistory, setShowHistory] = useState(false)
  const [showIDVerification, setShowIDVerification] = useState(false)

  if (!isOpen) return null

  const latestReport = reports[0]
  const historicalReports = reports.slice(1)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50"
      case "high":
        return "text-orange-600 bg-orange-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-orange-600"
    if (score >= 40) return "text-yellow-600"
    return "text-green-600"
  }

  const handleAction = (action: string) => {
    console.log("[v0] Action triggered:", action)
    if (action === "verify-identity") {
      setShowIDVerification(true)
      return
    }
    alert(`Action triggered: ${action}`)
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#003781] to-[#0052A3] text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-semibold">AI Fraud Verification</h2>
                <p className="text-sm text-blue-100">Real-time customer behavior analysis</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-[#0066CC] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Performing fraud analysis...</p>
                </div>
              </div>
            ) : latestReport ? (
              <div className="p-6 space-y-6">
                {/* Risk Score */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Overall Risk Score</p>
                      <p className={`text-4xl font-bold ${getRiskScoreColor(latestReport.checkData.riskScore)}`}>
                        {latestReport.checkData.riskScore}/100
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Last Check</p>
                      <p className="text-sm font-medium text-gray-900">
                        {latestReport.checkData.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Analysis */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-[#0066CC]" />
                    <h3 className="font-semibold text-gray-900">Location Analysis</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Registered Address:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {latestReport.checkData.location.registered}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current Location:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {latestReport.checkData.location.current}
                      </span>
                    </div>
                    {latestReport.checkData.location.mismatch && (
                      <div className="bg-red-50 border border-red-200 rounded p-3 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-red-900">Location Mismatch Detected</p>
                          <p className="text-xs text-red-700">Distance: {latestReport.checkData.location.distance}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* IP Login History */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Wifi className="w-5 h-5 text-[#0066CC]" />
                    <h3 className="font-semibold text-gray-900">Recent IP Logins</h3>
                  </div>
                  <div className="space-y-2">
                    {latestReport.checkData.ipLogins.map((login, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border ${
                          login.suspicious ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{login.ip}</p>
                            <p className="text-xs text-gray-600">
                              {login.location} • {login.device}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{login.timestamp.toLocaleTimeString()}</p>
                            {login.suspicious && <span className="text-xs font-medium text-red-600">⚠️ Suspicious</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suspicious Behavior */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-[#0066CC]" />
                    <h3 className="font-semibold text-gray-900">Suspicious Behavior Detected</h3>
                  </div>
                  <div className="space-y-3">
                    {latestReport.checkData.suspiciousBehavior.map((behavior, idx) => (
                      <div key={idx} className={`p-4 rounded-lg border ${getSeverityColor(behavior.severity)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium text-sm">{behavior.type}</p>
                          <span className="text-xs font-semibold uppercase px-2 py-1 rounded">{behavior.severity}</span>
                        </div>
                        <p className="text-sm mb-2">{behavior.description}</p>
                        <p className="text-xs opacity-75 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {behavior.detectedAt.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    AI Analysis & Recommendation
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {latestReport.checkData.aiSuggestion}
                  </p>
                </div>

                {/* Recommended Actions */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Recommended Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {latestReport.checkData.recommendedActions.map((action) => (
                      <Button
                        key={action.id}
                        onClick={() => handleAction(action.action)}
                        variant={
                          action.type === "danger" ? "destructive" : action.type === "primary" ? "default" : "outline"
                        }
                        className={action.type === "primary" ? "bg-[#0066CC] hover:bg-[#0052A3]" : ""}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Standard Actions */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Standard Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={() => handleAction("request-documents")}>
                      Request Documents
                    </Button>
                    <Button variant="outline" onClick={() => handleAction("schedule-call")}>
                      Schedule Call
                    </Button>
                    <Button variant="outline" onClick={() => handleAction("add-note")}>
                      Add Note
                    </Button>
                    <Button variant="outline" onClick={() => handleAction("mark-reviewed")}>
                      Mark as Reviewed
                    </Button>
                  </div>
                </div>

                {/* History Section */}
                {historicalReports.length > 0 && (
                  <div className="border border-gray-200 rounded-lg p-5">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <h3 className="font-semibold text-gray-900">Previous Reports ({historicalReports.length})</h3>
                      {showHistory ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    {showHistory && (
                      <div className="mt-4 space-y-3">
                        {historicalReports.map((report) => (
                          <div key={report.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-900">
                                Risk Score: {report.checkData.riskScore}/100
                              </span>
                              <span className="text-xs text-gray-500">
                                {report.checkData.timestamp.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">Performed by: {report.performedBy}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No fraud checks performed yet</p>
                  <Button onClick={onPerformCheck} className="bg-[#0066CC] hover:bg-[#0052A3]">
                    Run First Check
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {latestReport && (
              <Button onClick={onPerformCheck} disabled={isLoading} className="bg-[#0066CC] hover:bg-[#0052A3]">
                {isLoading ? "Analyzing..." : "Run New Check"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ID Verification Dialog */}
      <IDVerificationDialog
        isOpen={showIDVerification}
        onClose={() => setShowIDVerification(false)}
        customerName="Maria Schmidt"
      />
    </>
  )
}
