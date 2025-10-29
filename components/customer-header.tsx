"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { FraudVerificationModal } from "./fraud-verification-modal"
import type { FraudReport } from "@/lib/fraud-types"
import { performFraudCheck } from "@/lib/fraud-service"

type TabType = "gemstone" | "phone-record" | "sales" | "claims" | "research"

const tabs: { id: TabType; label: string }[] = [
  { id: "gemstone", label: "Gemstone" },
  { id: "phone-record", label: "Phone Record" },
  { id: "sales", label: "Sales" },
  { id: "claims", label: "Claims" },
  { id: "research", label: "Research" },
]

export function CustomerHeader() {
  const [activeTab, setActiveTab] = useState<TabType>("gemstone")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reports, setReports] = useState<FraudReport[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handlePerformCheck = async () => {
    setIsLoading(true)

    try {
      const checkData = await performFraudCheck("Maria Schmidt")

      const newReport: FraudReport = {
        id: `report-${Date.now()}`,
        checkData,
        status: "completed",
        performedBy: "Current Agent",
      }

      setReports([newReport, ...reports])
    } catch (error) {
      console.error("[v0] Error performing fraud check:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
    // Perform initial check if no reports exist
    if (reports.length === 0) {
      handlePerformCheck()
    }
  }

  return (
    <>
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-700">Maria Schmidt</h1>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleOpenModal}
                className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#003781] text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <Bot className="w-5 h-5" />
                AI Fraud Check
                {reports.length > 0 && (
                  <span className="bg-white text-[#0066CC] text-xs font-bold px-2 py-0.5 rounded-full">
                    {reports.length}
                  </span>
                )}
              </Button>

              <Button className="bg-[#0066CC] hover:bg-[#0052A3] text-white">Macala Nearmoa</Button>
            </div>
          </div>

          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-none px-6 hover:bg-transparent transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-[#0066CC] text-[#0066CC]"
                    : "text-gray-600 hover:text-[#0066CC]"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <FraudVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reports={reports}
        onPerformCheck={handlePerformCheck}
        isLoading={isLoading}
      />
    </>
  )
}
