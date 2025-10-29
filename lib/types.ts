export interface CustomerInfo {
  name: string
  action: string
  address: string
  addressType: string
  phone: string
  phoneType: string
  email: string
  emailType: string
}

export interface Policy {
  id: string
  type: "car" | "home" | "life"
  name: string
  policyNumber: string
  value?: string
  status?: string
}

export interface Communication {
  id: string
  date: string
  type: string
  description: string
  avatar: string
}

export interface Claim {
  id: string
  type: string
  date: string
  description: string
  status: string
  avatar: string
}

export interface NextStep {
  id: string
  title: string
  icon: string
}
