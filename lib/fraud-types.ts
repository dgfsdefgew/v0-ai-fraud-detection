export interface FraudCheckData {
  customerId: string
  customerName: string
  ipLogins: IPLogin[]
  location: LocationData
  suspiciousBehavior: SuspiciousBehavior[]
  riskScore: number
  aiSuggestion: string
  recommendedActions: RecommendedAction[]
  timestamp: Date
}

export interface IPLogin {
  ip: string
  location: string
  timestamp: Date
  device: string
  suspicious: boolean
}

export interface LocationData {
  current: string
  registered: string
  mismatch: boolean
  distance?: string
}

export interface SuspiciousBehavior {
  type: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  detectedAt: Date
}

export interface RecommendedAction {
  id: string
  label: string
  type: "primary" | "secondary" | "danger"
  action: string
}

export interface FraudReport {
  id: string
  checkData: FraudCheckData
  status: "completed" | "in-progress"
  performedBy: string
}
