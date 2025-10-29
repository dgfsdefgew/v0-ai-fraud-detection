import type { CustomerInfo, Policy, Communication, Claim, NextStep } from "./types"

export const customerInfo: CustomerInfo = {
  name: "Doris Seewald",
  action: "Action",
  address: "Example Street 1 /Berlin",
  addressType: "Teststrasse",
  phone: "563 (German-format)",
  phoneType: "",
  email: "MS-2012 @exo12465",
  emailType: "Austria",
}

export const policies: Policy[] = [
  {
    id: "1",
    type: "car",
    name: "Car Insurance - Policy AC 4234",
    policyNumber: "AC-4234",
  },
  {
    id: "2",
    type: "car",
    name: "Car Insurance - Policy AC-8679",
    policyNumber: "AC-8679",
    value: "9.8",
  },
  {
    id: "3",
    type: "home",
    name: "Home Insurance Omnisible",
    policyNumber: "Omnisible",
    status: "5 Aktives",
  },
  {
    id: "4",
    type: "home",
    name: "Home Insurance - Policy H-8879",
    policyNumber: "H-8879",
    value: "30",
  },
  {
    id: "5",
    type: "life",
    name: "Life Insurance - H-816)",
    policyNumber: "H-816",
    value: "3.0",
  },
  {
    id: "6",
    type: "life",
    name: "Life Insurance - L-916)",
    policyNumber: "L-916",
    value: "3.0",
  },
]

export const communications: Communication[] = [
  {
    id: "1",
    date: "Ostara 26, 2023",
    type: "Email",
    description: "Policy update notification (parcel-preconfigured)",
    avatar: "/confident-business-woman.png",
  },
  {
    id: "2",
    date: "Ostara 25",
    type: "Email",
    description: "Policy update notification (Omnisystem)",
    avatar: "/confident-businessman.png",
  },
  {
    id: "3",
    date: "Ostara 22, 283",
    type: "Postal",
    description: "Cotta Insuly (ID: C 2023 889) (palatine)",
    avatar: "/business-agent.png",
  },
  {
    id: "4",
    date: "Ostara 23 283",
    type: "Anual",
    description: "Anual attempt stornent (palatine)",
    avatar: "/customer-service-interaction.png",
  },
  {
    id: "5",
    date: "Sennar 23 28",
    type: "Amata (R)",
    description: "as agreement Mail",
    avatar: "/professional-teamwork.png",
  },
]

export const claims: Claim[] = [
  {
    id: "1",
    type: "Car Accident (D22)",
    date: "Urvin Rottness",
    description: "",
    status: "Settled Clarval",
    avatar: "/woman-customer-browsing.png",
  },
  {
    id: "2",
    type: "Car Accident (D22)",
    date: "Clarval",
    description: "",
    status: "Mantelston Clarval",
    avatar: "/man-customer.png",
  },
  {
    id: "3",
    type: "Transaction Damage",
    date: "",
    description: "",
    status: "Separation",
    avatar: "/diverse-business-person.png",
  },
  {
    id: "4",
    type: "Home Flooding",
    date: "Werres Elbermann (Stent)",
    description: "",
    status: "Sentalaan",
    avatar: "/diverse-customer-group.png",
  },
]

export const nextSteps: NextStep[] = [
  {
    id: "1",
    title: "Upload Beneficiary Information",
    icon: "upload",
  },
]
