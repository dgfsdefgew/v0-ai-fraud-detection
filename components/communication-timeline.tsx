import { communications } from "@/lib/mock-data"

export function CommunicationTimeline() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Communication Timeline</h2>

      <div className="space-y-4">
        {communications.map((comm) => (
          <div key={comm.id} className="flex gap-3">
            <img src={comm.avatar || "/placeholder.svg"} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="text-sm">
                <span className="font-medium text-gray-800">{comm.date}</span>
                <span className="text-gray-600 ml-2">{comm.type}.</span>
                <span className="text-gray-700 ml-1">{comm.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
