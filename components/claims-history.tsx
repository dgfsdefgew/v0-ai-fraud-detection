import { Upload } from "lucide-react"
import { claims, nextSteps } from "@/lib/mock-data"

export function ClaimsHistory() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Claims History</h2>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Sealan Npatile</span>
              <span className="text-sm text-gray-600">Settling</span>
            </div>
          </div>

          {claims.map((claim) => (
            <div key={claim.id} className="flex gap-3 py-2">
              <img
                src={claim.avatar || "/placeholder.svg"}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{claim.type}</div>
                    {claim.date && <div className="text-xs text-gray-600 mt-0.5">{claim.date}</div>}
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium ${
                        claim.status.includes("Separation")
                          ? "text-green-600"
                          : claim.status.includes("Sentalaan")
                            ? "text-green-600"
                            : "text-gray-700"
                      }`}
                    >
                      {claim.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-3 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Home Use Damage</span>
              <span className="text-sm text-gray-600">Sega fest then</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Next Steps</h3>

        <div className="space-y-2">
          {nextSteps.map((step) => (
            <div key={step.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Upload className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-gray-800">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
