import { User, MapPin, Phone, Mail, Car, Home, FileText } from "lucide-react"
import { customerInfo, policies } from "@/lib/mock-data"

export function CustomerOverview() {
  const getPolicyIcon = (type: string) => {
    switch (type) {
      case "car":
        return <Car className="h-4 w-4 text-gray-500" />
      case "home":
        return <Home className="h-4 w-4 text-gray-500" />
      case "life":
        return <FileText className="h-4 w-4 text-gray-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Overview</h2>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="text-gray-500">{customerInfo.name}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-600"></span>
                <span className="text-gray-500">{customerInfo.action}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Address</span>
                <span className="text-gray-500">{customerInfo.addressType}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-600">{customerInfo.address}</span>
                <span className="text-gray-500">{customerInfo.addressType}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Phone less</span>
                <span className="text-green-600 font-medium">{customerInfo.phone}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="text-gray-500">{customerInfo.email}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-600"></span>
                <span className="text-gray-500">{customerInfo.emailType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Policies</h3>

        <div className="space-y-2">
          {policies.map((policy) => (
            <div key={policy.id} className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center gap-3">
                {getPolicyIcon(policy.type)}
                <span className="text-gray-700">{policy.name}</span>
              </div>
              {policy.value && <span className="text-gray-600 font-medium">{policy.value}</span>}
              {policy.status && <span className="text-green-600 font-medium">{policy.status}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
