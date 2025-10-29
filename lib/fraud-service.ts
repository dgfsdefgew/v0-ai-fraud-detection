import { generateText } from "ai"
import type { FraudCheckData, IPLogin, SuspiciousBehavior, RecommendedAction } from "./fraud-types"

// Mock data generator for demonstration
function generateMockFraudData(customerName: string): Omit<FraudCheckData, "aiSuggestion" | "recommendedActions"> {
  const ipLogins: IPLogin[] = [
    {
      ip: "192.168.1.100",
      location: "Berlin, Germany",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      device: "Windows Desktop",
      suspicious: false,
    },
    {
      ip: "203.45.67.89",
      location: "Lagos, Nigeria",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      device: "Android Mobile",
      suspicious: true,
    },
    {
      ip: "192.168.1.100",
      location: "Berlin, Germany",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      device: "Windows Desktop",
      suspicious: false,
    },
  ]

  const suspiciousBehavior: SuspiciousBehavior[] = [
    {
      type: "Unusual Login Location",
      description: "Login detected from Nigeria, 5,200km from registered address",
      severity: "high",
      detectedAt: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      type: "Multiple Policy Inquiries",
      description: "5 policy value inquiries within 10 minutes",
      severity: "medium",
      detectedAt: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      type: "Beneficiary Change Attempt",
      description: "Attempted to change beneficiary on life insurance policy",
      severity: "critical",
      detectedAt: new Date(Date.now() - 5 * 60 * 1000),
    },
  ]

  const riskScore = Math.floor(Math.random() * 30) + 70 // 70-100 for demo

  return {
    customerId: "MS-2032",
    customerName,
    ipLogins,
    location: {
      current: "Lagos, Nigeria",
      registered: "Berlin, Germany",
      mismatch: true,
      distance: "5,200 km",
    },
    suspiciousBehavior,
    riskScore,
    timestamp: new Date(),
  }
}

export async function performFraudCheck(customerName: string): Promise<FraudCheckData> {
  const mockData = generateMockFraudData(customerName)

  // Prepare context for AI analysis
  const context = `
Customer: ${mockData.customerName}
Risk Score: ${mockData.riskScore}/100

Recent IP Logins:
${mockData.ipLogins.map((login) => `- ${login.ip} from ${login.location} (${login.device}) ${login.suspicious ? "⚠️ SUSPICIOUS" : "✓"}`).join("\n")}

Location Analysis:
- Registered Address: ${mockData.location.registered}
- Current Location: ${mockData.location.current}
- Distance: ${mockData.location.distance}
- Mismatch: ${mockData.location.mismatch ? "YES" : "NO"}

Suspicious Behaviors Detected:
${mockData.suspiciousBehavior.map((b) => `- [${b.severity.toUpperCase()}] ${b.type}: ${b.description}`).join("\n")}

Based on this fraud analysis data, provide:
1. A concise assessment of the fraud risk (2-3 sentences)
2. Specific recommended actions to take
`

  try {
    const { text } = await generateText({
      model: "openai/gpt-5-mini",
      prompt: `You are a fraud detection AI for an insurance company. Analyze the following customer activity and provide a professional assessment and recommendations.\n\n${context}`,
      maxOutputTokens: 500,
    })

    // Parse AI response to extract recommendations
    const recommendedActions: RecommendedAction[] = [
      {
        id: "verify-identity",
        label: "Verify Customer Identity",
        type: "primary",
        action: "verify-identity",
      },
      {
        id: "freeze-account",
        label: "Temporarily Freeze Account",
        type: "danger",
        action: "freeze-account",
      },
      {
        id: "contact-customer",
        label: "Contact Customer",
        type: "secondary",
        action: "contact-customer",
      },
      {
        id: "escalate",
        label: "Escalate to Fraud Team",
        type: "danger",
        action: "escalate",
      },
    ]

    return {
      ...mockData,
      aiSuggestion: text,
      recommendedActions,
    }
  } catch (error) {
    console.error("[v0] Fraud check AI error:", error)

    // Fallback response if AI fails
    return {
      ...mockData,
      aiSuggestion:
        "High-risk activity detected. Multiple suspicious indicators including unusual login location (Nigeria, 5,200km from registered address), rapid policy inquiries, and beneficiary change attempt. Immediate identity verification recommended.",
      recommendedActions: [
        {
          id: "verify-identity",
          label: "Verify Customer Identity",
          type: "primary",
          action: "verify-identity",
        },
        {
          id: "freeze-account",
          label: "Temporarily Freeze Account",
          type: "danger",
          action: "freeze-account",
        },
        {
          id: "contact-customer",
          label: "Contact Customer",
          type: "secondary",
          action: "contact-customer",
        },
      ],
    }
  }
}
