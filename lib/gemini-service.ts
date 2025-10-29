"use server"

import { generateObject } from "ai"
import { z } from "zod"
import type { Activity, AnalysisResult } from "./types"

const analysisSchema = z.object({
  summary: z.string().describe("Overall summary of the fraud analysis"),
  suspiciousActivities: z.array(
    z.object({
      activityId: z.string().describe("The ID of the suspicious activity"),
      reason: z.string().describe("Detailed explanation of why this activity is suspicious"),
      riskScore: z.number().min(0).max(100).describe("Risk score from 0-100"),
    }),
  ),
})

export async function analyzeFraudWithAI(activities: Activity[]): Promise<AnalysisResult> {
  const prompt = `You are an expert fraud detection analyst for an insurance company. Analyze the following customer activities and identify any suspicious patterns that may indicate fraud.

Common fraud indicators to look for:
- **Inception Fraud**: A new policy followed quickly (within days) by a high-value claim
- **Account Takeover**: Logins from unusual/different locations followed by changes to sensitive information (bank details, contact info)
- **Coverage Inflation**: Significant increase in policy coverage shortly before filing a large claim
- **Rapid Claims**: Multiple claims filed in a short time period
- **Geographic Anomalies**: Activities from impossible or suspicious locations
- **Timing Patterns**: Suspicious timing between policy changes and claims

Activities to analyze:
${JSON.stringify(activities, null, 2)}

Provide a comprehensive analysis identifying any suspicious activities with detailed reasoning and risk scores.`

  try {
    const { object } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: analysisSchema,
      prompt,
    })

    return object as AnalysisResult
  } catch (error) {
    console.error("[v0] Error analyzing fraud:", error)
    throw new Error("Failed to analyze activities. Please try again.")
  }
}
