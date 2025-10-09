export interface CompoundInterestResult {
  finalAmount: number
  totalInterest: number
  monthlyRate: number
}

export interface RatePeriod {
  rate: number // Tasa anual en decimal (0.14 para 14%)
  years: number // Duración del período en años
}

export interface ContributionResult {
  finalAmount: number
  totalContributions: number
  totalInterest: number
  netReturn: number
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

/**
 * Calculate compound interest with regular contributions (Discrete Model)
 * P(t) = P₀(1 + r/n)^(nt) + A × [(1 + r/n)^(nt) - 1] / (r/n)
 * @param principal - Capital inicial
 * @param annualRate - Tasa anual en porcentaje
 * @param years - Años
 * @param compoundingFrequency - Frecuencia de capitalización (12 para mensual)
 * @param regularContribution - Aporte regular al final de cada período
 */
export function calculateWithContributions(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFrequency: number,
  regularContribution: number,
): ContributionResult {
  const r = annualRate / 100
  const n = compoundingFrequency
  const t = years

  // Valor futuro del capital inicial
  const principalFV = principal * Math.pow(1 + r / n, n * t)

  // Valor futuro de los aportes
  const contributionFV = regularContribution * (Math.pow(1 + r / n, n * t) - 1) / (r / n)

  const finalAmount = principalFV + contributionFV
  const totalContributions = regularContribution * n * t
  const totalInterest = finalAmount - principal - totalContributions
  const netReturn = totalInterest

  return {
    finalAmount,
    totalContributions,
    totalInterest,
    netReturn,
  }
}

/**
 * Calculate compound interest with regular contributions (Continuous Model)
 * P(t) = P₀e^(rt) + (a/r)(e^(rt) - 1)
 * @param principal - Capital inicial
 * @param annualRate - Tasa anual en porcentaje
 * @param years - Años
 * @param continuousContribution - Tasa de aporte continuo (COP/año)
 */
export function calculateContinuousWithContributions(
  principal: number,
  annualRate: number,
  years: number,
  continuousContribution: number,
): ContributionResult {
  const r = annualRate / 100
  const t = years
  const a = continuousContribution

  // Valor futuro del capital inicial
  const principalFV = principal * Math.exp(r * t)

  // Valor futuro de los aportes continuos
  const contributionFV = (a / r) * (Math.exp(r * t) - 1)

  const finalAmount = principalFV + contributionFV
  const totalContributions = a * t
  const totalInterest = finalAmount - principal - totalContributions
  const netReturn = totalInterest

  return {
    finalAmount,
    totalContributions,
    totalInterest,
    netReturn,
  }
}

/**
 * Calculate compound interest with variable rates (Discrete Model)
 * P(t) = P₀ × ∏[i=1 to m] (1 + rᵢ/n)^(n·tᵢ)
 * @param principal - Capital inicial
 * @param ratePeriods - Array de períodos con sus tasas y duraciones
 * @param compoundingFrequency - Frecuencia de capitalización (12 para mensual)
 */
export function calculateWithVariableRates(
  principal: number,
  ratePeriods: RatePeriod[],
  compoundingFrequency: number,
): CompoundInterestResult {
  const n = compoundingFrequency
  let finalAmount = principal

  // Aplicar cada período de tasa
  for (const period of ratePeriods) {
    const r = period.rate / 100
    const t = period.years
    finalAmount *= Math.pow(1 + r / n, n * t)
  }

  const totalInterest = finalAmount - principal
  const avgRate = ratePeriods.reduce((sum, p) => sum + p.rate, 0) / ratePeriods.length

  return {
    finalAmount,
    totalInterest,
    monthlyRate: avgRate / 100 / 12,
  }
}

/**
 * Calculate compound interest with variable rates (Continuous Model)
 * P(t) = P₀ × e^(r₁t₁) × e^(r₂t₂) × e^(r₃t₃) × ...
 * @param principal - Capital inicial
 * @param ratePeriods - Array de períodos con sus tasas y duraciones
 */
export function calculateContinuousWithVariableRates(
  principal: number,
  ratePeriods: RatePeriod[],
): CompoundInterestResult {
  let exponentSum = 0

  // Sumar todos los productos r_i * t_i
  for (const period of ratePeriods) {
    const r = period.rate / 100
    exponentSum += r * period.years
  }

  const finalAmount = principal * Math.exp(exponentSum)
  const totalInterest = finalAmount - principal
  const avgRate = ratePeriods.reduce((sum, p) => sum + p.rate, 0) / ratePeriods.length

  return {
    finalAmount,
    totalInterest,
    monthlyRate: avgRate / 100 / 12,
  }
}

/**
 * Calculate compound interest with variable rates and regular contributions
 * Modelo más complejo que combina tasas variables con aportes periódicos
 * @param principal - Capital inicial
 * @param ratePeriods - Array de períodos con sus tasas
 * @param compoundingFrequency - Frecuencia de capitalización
 * @param regularContribution - Aporte al final de cada período
 */
export function calculateVariableRatesWithContributions(
  principal: number,
  ratePeriods: RatePeriod[],
  compoundingFrequency: number,
  regularContribution: number,
): ContributionResult {
  const n = compoundingFrequency

  // Paso 1: Calcular el valor futuro del capital inicial
  let principalFV = principal
  for (const period of ratePeriods) {
    const r = period.rate / 100
    const t = period.years
    principalFV *= Math.pow(1 + r / n, n * t)
  }

  // Paso 2: Calcular el valor futuro de los aportes en cada período
  let contributionsFV = 0
  
  for (let i = 0; i < ratePeriods.length; i++) {
    const currentPeriod = ratePeriods[i]
    const r = currentPeriod.rate / 100
    const t = currentPeriod.years

    // S_i = [(1 + r/n)^(nt) - 1] / (r/n)
    const S = (Math.pow(1 + r / n, n * t) - 1) / (r / n)

    // Multiplicar por el factor de crecimiento de los períodos siguientes
    let growthFactor = 1
    for (let j = i + 1; j < ratePeriods.length; j++) {
      const futureR = ratePeriods[j].rate / 100
      const futureT = ratePeriods[j].years
      growthFactor *= Math.pow(1 + futureR / n, n * futureT)
    }

    contributionsFV += regularContribution * S * growthFactor
  }

  const finalAmount = principalFV + contributionsFV
  const totalYears = ratePeriods.reduce((sum, p) => sum + p.years, 0)
  const totalContributions = regularContribution * n * totalYears
  const totalInterest = finalAmount - principal - totalContributions

  return {
    finalAmount,
    totalContributions,
    totalInterest,
    netReturn: totalInterest,
  }
}
