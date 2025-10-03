export interface CompoundInterestResult {
  finalAmount: number
  totalInterest: number
  monthlyRate: number
}

/**
 * Calculate compound interest using discrete model
 * P(t) = P₀ × (1 + r/n)^(nt)
 */
export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFrequency: number,
): CompoundInterestResult {
  const r = annualRate / 100 // Convert percentage to decimal
  const n = compoundingFrequency
  const t = years

  const finalAmount = principal * Math.pow(1 + r / n, n * t)
  const totalInterest = finalAmount - principal
  const monthlyRate = r / 12

  return {
    finalAmount,
    totalInterest,
    monthlyRate,
  }
}

/**
 * Calculate compound interest using continuous model
 * P(t) = P₀ × e^(rt)
 */
export function calculateContinuousInterest(
  principal: number,
  annualRate: number,
  years: number,
): CompoundInterestResult {
  const r = annualRate / 100 // Convert percentage to decimal
  const t = years

  const finalAmount = principal * Math.exp(r * t)
  const totalInterest = finalAmount - principal
  const monthlyRate = r / 12

  return {
    finalAmount,
    totalInterest,
    monthlyRate,
  }
}
