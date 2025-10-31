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

export interface AmortizationRow {
  period: number // Número de período (mes)
  payment: number // Pago del período
  interest: number // Interés del período
  principal: number // Capital amortizado en el período
  balance: number // Saldo restante después del pago
}

export interface LoanResult {
  finalBalance: number // Saldo final (deuda restante)
  totalPaid: number // Total pagado
  totalInterest: number // Total de intereses pagados
  principalPaid: number // Capital amortizado
  warning?: string // Advertencia si los pagos no cubren intereses
  monthsUsed?: number // Meses reales utilizados para pagar
  lastPaymentAdjusted?: number // Monto del último pago ajustado
  amortizationTable?: AmortizationRow[] // Tabla de amortización mes a mes
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
 * @param monthlyContribution - Aporte mensual (COP/mes)
 */
export function calculateContinuousWithContributions(
  principal: number,
  annualRate: number,
  years: number,
  monthlyContribution: number,
): ContributionResult {
  const r = annualRate / 100
  const t = years
  const a = monthlyContribution * 12 // Convertir aporte mensual a anual

  // Valor futuro del capital inicial
  const principalFV = principal * Math.exp(r * t)

  // Valor futuro de los aportes continuos
  const contributionFV = (a / r) * (Math.exp(r * t) - 1)

  const finalAmount = principalFV + contributionFV
  const totalContributions = monthlyContribution * 12 * t // Total aportado correctamente
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

/**
 * Calculate loan with regular payments (Discrete Model)
 * Cada período: nuevo_saldo = saldo_anterior × (1 + r/n) - pago
 * @param principal - Deuda inicial
 * @param annualRate - Tasa anual en porcentaje
 * @param years - Años
 * @param compoundingFrequency - Frecuencia de capitalización (12 para mensual)
 * @param regularPayment - Pago regular al final de cada período
 */
export function calculateLoanWithPayments(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFrequency: number,
  regularPayment: number,
): LoanResult {
  const r = annualRate / 100
  const n = compoundingFrequency
  const totalPeriods = n * years
  const periodRate = r / n

  let balance = principal
  let totalInterest = 0
  let totalPaid = 0
  let warning: string | undefined
  let monthsUsed = 0
  let lastPaymentAdjusted: number | undefined
  const amortizationTable: AmortizationRow[] = []

  // Simular cada período
  for (let i = 0; i < totalPeriods; i++) {
    // Calcular interés del período
    const interestThisPeriod = balance * periodRate
    totalInterest += interestThisPeriod

    // Verificar si el pago cubre al menos los intereses
    if (regularPayment < interestThisPeriod && !warning) {
      warning = "Los pagos no cubren los intereses, la deuda crecerá"
    }

    // Determinar el pago real de este período
    let actualPayment = regularPayment
    let principalPayment = regularPayment - interestThisPeriod

    // Aplicar pago
    balance = balance + interestThisPeriod - regularPayment
    totalPaid += regularPayment
    monthsUsed++

    // Si el saldo se vuelve negativo (pagaste de más)
    if (balance < 0) {
      // Ajustar el último pago
      const overpayment = -balance
      lastPaymentAdjusted = regularPayment - overpayment
      actualPayment = lastPaymentAdjusted
      principalPayment = actualPayment - interestThisPeriod
      totalPaid += balance // balance es negativo, así que esto resta
      balance = 0
      
      // Agregar fila a la tabla
      amortizationTable.push({
        period: i + 1,
        payment: actualPayment,
        interest: interestThisPeriod,
        principal: principalPayment,
        balance: 0,
      })
      break
    }

    // Agregar fila a la tabla
    amortizationTable.push({
      period: i + 1,
      payment: actualPayment,
      interest: interestThisPeriod,
      principal: principalPayment,
      balance: balance,
    })
  }

  const principalPaid = principal - balance

  return {
    finalBalance: Math.max(0, balance),
    totalPaid,
    totalInterest,
    principalPaid,
    warning,
    monthsUsed,
    lastPaymentAdjusted,
    amortizationTable,
  }
}

/**
 * Calculate loan with regular payments (Continuous Model)
 * Cada período: nuevo_saldo = saldo_anterior × e^(r/n) - pago
 * @param principal - Deuda inicial
 * @param annualRate - Tasa anual en porcentaje
 * @param years - Años
 * @param regularPayment - Pago anual continuo
 */
export function calculateContinuousLoanWithPayments(
  principal: number,
  annualRate: number,
  years: number,
  regularPayment: number,
): LoanResult {
  const r = annualRate / 100
  const n = 12 // Simulamos mensualmente para el modelo continuo
  const totalPeriods = n * years
  const periodRate = r / n

  let balance = principal
  let totalInterest = 0
  let totalPaid = 0
  let warning: string | undefined
  let monthsUsed = 0
  let lastPaymentAdjusted: number | undefined
  const amortizationTable: AmortizationRow[] = []

  // Simular cada período
  for (let i = 0; i < totalPeriods; i++) {
    // Calcular interés continuo del período
    const interestThisPeriod = balance * (Math.exp(periodRate) - 1)
    totalInterest += interestThisPeriod

    // Verificar si el pago cubre al menos los intereses
    if (regularPayment < interestThisPeriod && !warning) {
      warning = "Los pagos no cubren los intereses, la deuda crecerá"
    }

    // Determinar el pago real de este período
    let actualPayment = regularPayment
    let principalPayment = regularPayment - interestThisPeriod

    // Aplicar pago
    balance = balance + interestThisPeriod - regularPayment
    totalPaid += regularPayment
    monthsUsed++

    // Si el saldo se vuelve negativo (pagaste de más)
    if (balance < 0) {
      const overpayment = -balance
      lastPaymentAdjusted = regularPayment - overpayment
      actualPayment = lastPaymentAdjusted
      principalPayment = actualPayment - interestThisPeriod
      totalPaid += balance // balance es negativo
      balance = 0
      
      // Agregar fila a la tabla
      amortizationTable.push({
        period: i + 1,
        payment: actualPayment,
        interest: interestThisPeriod,
        principal: principalPayment,
        balance: 0,
      })
      break
    }

    // Agregar fila a la tabla
    amortizationTable.push({
      period: i + 1,
      payment: actualPayment,
      interest: interestThisPeriod,
      principal: principalPayment,
      balance: balance,
    })
  }

  const principalPaid = principal - balance

  return {
    finalBalance: Math.max(0, balance),
    totalPaid,
    totalInterest,
    principalPaid,
    warning,
    monthsUsed,
    lastPaymentAdjusted,
    amortizationTable,
  }
}

/**
 * Calculate loan with variable rates and regular payments
 * @param principal - Deuda inicial
 * @param ratePeriods - Array de períodos con sus tasas y duraciones
 * @param compoundingFrequency - Frecuencia de capitalización (12 para mensual)
 * @param regularPayment - Pago regular
 */
export function calculateVariableRatesLoanWithPayments(
  principal: number,
  ratePeriods: RatePeriod[],
  compoundingFrequency: number,
  regularPayment: number,
): LoanResult {
  const n = compoundingFrequency
  let balance = principal
  let totalInterest = 0
  let totalPaid = 0
  let warning: string | undefined
  let monthsUsed = 0
  let lastPaymentAdjusted: number | undefined
  const amortizationTable: AmortizationRow[] = []

  // Procesar cada período de tasa
  for (const period of ratePeriods) {
    const r = period.rate / 100
    const periodRate = r / n
    const periodsInThisRate = n * period.years

    // Simular cada subperíodo dentro de este período de tasa
    for (let i = 0; i < periodsInThisRate; i++) {
      const interestThisPeriod = balance * periodRate
      totalInterest += interestThisPeriod

      if (regularPayment < interestThisPeriod && !warning) {
        warning = "Los pagos no cubren los intereses, la deuda crecerá"
      }

      // Determinar el pago real de este período
      let actualPayment = regularPayment
      let principalPayment = regularPayment - interestThisPeriod

      balance = balance + interestThisPeriod - regularPayment
      totalPaid += regularPayment
      monthsUsed++

      if (balance < 0) {
        const overpayment = -balance
        lastPaymentAdjusted = regularPayment - overpayment
        actualPayment = lastPaymentAdjusted
        principalPayment = actualPayment - interestThisPeriod
        totalPaid += balance
        balance = 0
        
        // Agregar fila a la tabla
        amortizationTable.push({
          period: monthsUsed,
          payment: actualPayment,
          interest: interestThisPeriod,
          principal: principalPayment,
          balance: 0,
        })
        break
      }

      // Agregar fila a la tabla
      amortizationTable.push({
        period: monthsUsed,
        payment: actualPayment,
        interest: interestThisPeriod,
        principal: principalPayment,
        balance: balance,
      })
    }

    if (balance === 0) break
  }

  const principalPaid = principal - balance

  return {
    finalBalance: Math.max(0, balance),
    totalPaid,
    totalInterest,
    principalPaid,
    warning,
    monthsUsed,
    lastPaymentAdjusted,
    amortizationTable,
  }
}
