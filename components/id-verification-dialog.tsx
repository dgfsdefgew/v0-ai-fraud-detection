"use client"

import { useState } from "react"
import { X, CreditCard, FileText, Award as IdCard, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IDVerificationDialogProps {
  isOpen: boolean
  onClose: () => void
  customerName: string
}

type DocumentType = "passport" | "id-card" | "drivers-license" | null
type VerificationStatus = "idle" | "scanning" | "success" | "failed"

interface VerificationResult {
  status: VerificationStatus
  documentType: DocumentType
  documentNumber?: string
  expiryDate?: string
  issueDate?: string
  matchScore?: number
  biometricMatch?: boolean
  documentAuthentic?: boolean
  suggestion?: string
}

export function IDVerificationDialog({ isOpen, onClose, customerName }: IDVerificationDialogProps) {
  const [selectedDocument, setSelectedDocument] = useState<DocumentType>(null)
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("idle")
  const [result, setResult] = useState<VerificationResult | null>(null)

  if (!isOpen) return null

  const handleDocumentSelect = (type: DocumentType) => {
    setSelectedDocument(type)
    setVerificationStatus("idle")
    setResult(null)
  }

  const simulateVerification = () => {
    if (!selectedDocument) return

    setVerificationStatus("scanning")
    setResult(null)

    // Simulate scanning delay
    setTimeout(() => {
      // Simulate random verification result (80% success rate)
      const isSuccess = Math.random() > 0.2
      const matchScore = isSuccess ? Math.floor(Math.random() * 10) + 90 : Math.floor(Math.random() * 30) + 40

      const mockResult: VerificationResult = {
        status: isSuccess ? "success" : "failed",
        documentType: selectedDocument,
        documentNumber:
          selectedDocument === "passport"
            ? "P" + Math.random().toString().slice(2, 10)
            : selectedDocument === "drivers-license"
              ? "DL" + Math.random().toString().slice(2, 10)
              : "ID" + Math.random().toString().slice(2, 10),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 3).toLocaleDateString(),
        issueDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000 * 2).toLocaleDateString(),
        matchScore,
        biometricMatch: isSuccess ? true : Math.random() > 0.5,
        documentAuthentic: isSuccess ? true : Math.random() > 0.5,
        suggestion: isSuccess
          ? `Identity verification successful. ${customerName}'s identity has been confirmed with ${matchScore}% confidence. The document appears authentic and biometric data matches our records. You may proceed with the transaction.`
          : `Identity verification failed. The document provided shows inconsistencies. Match score of ${matchScore}% is below the required threshold. Recommend requesting additional documentation or scheduling an in-person verification appointment.`,
      }

      setResult(mockResult)
      setVerificationStatus(isSuccess ? "success" : "failed")
    }, 3000)
  }

  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case "passport":
        return <FileText className="w-8 h-8" />
      case "id-card":
        return <IdCard className="w-8 h-8" />
      case "drivers-license":
        return <CreditCard className="w-8 h-8" />
      default:
        return null
    }
  }

  const getDocumentLabel = (type: DocumentType) => {
    switch (type) {
      case "passport":
        return "Passport"
      case "id-card":
        return "ID Card"
      case "drivers-license":
        return "Driver's License"
      default:
        return ""
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003781] to-[#0052A3] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IdCard className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-semibold">ID Verification System</h2>
              <p className="text-sm text-blue-100">Verify customer identity documents</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Verifying identity for:</p>
            <p className="text-lg font-semibold text-gray-900">{customerName}</p>
          </div>

          {/* Document Selection */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Select Document Type</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleDocumentSelect("passport")}
                className={`p-4 border-2 rounded-lg transition-all hover:border-[#0066CC] hover:bg-blue-50 ${
                  selectedDocument === "passport" ? "border-[#0066CC] bg-blue-50" : "border-gray-200 bg-white"
                }`}
              >
                <FileText className="w-8 h-8 mx-auto mb-2 text-[#0066CC]" />
                <p className="text-sm font-medium text-gray-900">Passport</p>
              </button>
              <button
                onClick={() => handleDocumentSelect("id-card")}
                className={`p-4 border-2 rounded-lg transition-all hover:border-[#0066CC] hover:bg-blue-50 ${
                  selectedDocument === "id-card" ? "border-[#0066CC] bg-blue-50" : "border-gray-200 bg-white"
                }`}
              >
                <IdCard className="w-8 h-8 mx-auto mb-2 text-[#0066CC]" />
                <p className="text-sm font-medium text-gray-900">ID Card</p>
              </button>
              <button
                onClick={() => handleDocumentSelect("drivers-license")}
                className={`p-4 border-2 rounded-lg transition-all hover:border-[#0066CC] hover:bg-blue-50 ${
                  selectedDocument === "drivers-license" ? "border-[#0066CC] bg-blue-50" : "border-gray-200 bg-white"
                }`}
              >
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-[#0066CC]" />
                <p className="text-sm font-medium text-gray-900">Driver's License</p>
              </button>
            </div>
          </div>

          {/* Verification Status */}
          {verificationStatus === "scanning" && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-[#0066CC] animate-spin mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900 mb-2">Scanning Document...</p>
                <p className="text-sm text-gray-600">
                  Verifying {getDocumentLabel(selectedDocument)} authenticity and biometric data
                </p>
              </div>
            </div>
          )}

          {/* Verification Result */}
          {result && verificationStatus !== "scanning" && (
            <div
              className={`border-2 rounded-lg p-6 ${
                verificationStatus === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-start gap-4">
                {verificationStatus === "success" ? (
                  <CheckCircle className="w-12 h-12 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-600 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      verificationStatus === "success" ? "text-green-900" : "text-red-900"
                    }`}
                  >
                    {verificationStatus === "success" ? "Verification Successful" : "Verification Failed"}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Document Type:</span>
                      <span className="font-medium text-gray-900">{getDocumentLabel(result.documentType)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Document Number:</span>
                      <span className="font-medium text-gray-900">{result.documentNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Issue Date:</span>
                      <span className="font-medium text-gray-900">{result.issueDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expiry Date:</span>
                      <span className="font-medium text-gray-900">{result.expiryDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Match Score:</span>
                      <span
                        className={`font-bold ${
                          result.matchScore && result.matchScore >= 80 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {result.matchScore}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Biometric Match:</span>
                      <span className={`font-medium ${result.biometricMatch ? "text-green-600" : "text-red-600"}`}>
                        {result.biometricMatch ? "✓ Passed" : "✗ Failed"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Document Authentic:</span>
                      <span className={`font-medium ${result.documentAuthentic ? "text-green-600" : "text-red-600"}`}>
                        {result.documentAuthentic ? "✓ Verified" : "✗ Suspicious"}
                      </span>
                    </div>
                  </div>

                  {result.suggestion && (
                    <div
                      className={`p-4 rounded-lg border ${
                        verificationStatus === "success" ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"
                      }`}
                    >
                      <p className="text-sm font-semibold mb-1">Recommendation:</p>
                      <p className="text-sm leading-relaxed">{result.suggestion}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {selectedDocument && verificationStatus === "idle" && (
              <Button onClick={simulateVerification} className="flex-1 bg-[#0066CC] hover:bg-[#0052A3]">
                Start Verification
              </Button>
            )}
            {result && (
              <Button onClick={() => handleDocumentSelect(selectedDocument)} variant="outline" className="flex-1">
                Verify Again
              </Button>
            )}
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
