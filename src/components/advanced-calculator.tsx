"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  calculateWithContributions,
  calculateContinuousWithContributions,
  calculateWithVariableRates,
  calculateVariableRatesWithContributions,
  calculateLoanWithPayments,
  calculateContinuousLoanWithPayments,
  calculateVariableRatesLoanWithPayments,
  type RatePeriod,
  type ContributionResult,
  type LoanResult,
} from "@/lib/calculations"
import { formatCurrency } from "@/lib/utils"
import { PlusCircle, Calculator as CalcIcon } from "lucide-react"
import { useNumericInput } from "@/hooks/use-numeric-input"
import { RatePeriodInput } from "@/components/rate-period-input"
import { useLoanMode } from "@/contexts/loan-mode-context"

type CalculatorMode = "contributions" | "variableRates" | "complete"

export function AdvancedCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("contributions")
  const { isLoanMode, setIsLoanMode } = useLoanMode()

  // Contributions state with flexible inputs
  const principal = useNumericInput(5000000, 0)
  const annualRate = useNumericInput(8, 0, 100)
  const years = useNumericInput(2, 0, 100)
  const monthlyContribution = useNumericInput(200000, 0)

  // Variable rates state with flexible inputs
  const varPrincipal = useNumericInput(20000000, 0)
  const [ratePeriods, setRatePeriods] = useState<RatePeriod[]>([
    { rate: 14, years: 1 },
    { rate: 17, years: 1 },
    { rate: 18.5, years: 3 },
  ])

  // Complete model state with flexible inputs
  const completePrincipal = useNumericInput(5000000, 0)
  const completeContribution = useNumericInput(200000, 0)
  const [completeRatePeriods, setCompleteRatePeriods] = useState<RatePeriod[]>([
    { rate: 8, years: 1 },
    { rate: 10, years: 1 },
  ])

  // Results state
  const [contribResult, setContribResult] = useState<{ discrete: ContributionResult | LoanResult; continuous: ContributionResult | LoanResult } | null>(
    null,
  )
  const [varRatesResult, setVarRatesResult] = useState<any>(null)
  const [completeResult, setCompleteResult] = useState<ContributionResult | LoanResult | null>(null)

  const calculateContributions = () => {
    if (isLoanMode) {
      // Modo préstamo: usar funciones de préstamo
      const discrete = calculateLoanWithPayments(
        principal.numericValue,
        annualRate.numericValue,
        years.numericValue,
        12,
        monthlyContribution.numericValue
      )
      const continuous = calculateContinuousLoanWithPayments(
        principal.numericValue,
        annualRate.numericValue,
        years.numericValue,
        monthlyContribution.numericValue
      )
      setContribResult({ discrete, continuous })
    } else {
      // Modo ahorro: usar funciones de ahorro
      const discrete = calculateWithContributions(
        principal.numericValue,
        annualRate.numericValue,
        years.numericValue,
        12,
        monthlyContribution.numericValue
      )
      const continuous = calculateContinuousWithContributions(
        principal.numericValue,
        annualRate.numericValue,
        years.numericValue,
        monthlyContribution.numericValue
      )
      setContribResult({ discrete, continuous })
    }
  }

  const calculateVariableRates = () => {
    const result = calculateWithVariableRates(varPrincipal.numericValue, ratePeriods, 12)
    setVarRatesResult(result)
  }

  const calculateComplete = () => {
    if (isLoanMode) {
      // Modo préstamo
      const result = calculateVariableRatesLoanWithPayments(
        completePrincipal.numericValue,
        completeRatePeriods,
        12,
        completeContribution.numericValue,
      )
      setCompleteResult(result)
    } else {
      // Modo ahorro
      const result = calculateVariableRatesWithContributions(
        completePrincipal.numericValue,
        completeRatePeriods,
        12,
        completeContribution.numericValue,
      )
      setCompleteResult(result)
    }
  }

  const addRatePeriod = () => {
    setRatePeriods([...ratePeriods, { rate: 15, years: 1 }])
  }

  const removeRatePeriod = (index: number) => {
    setRatePeriods(ratePeriods.filter((_, i) => i !== index))
  }

  const updateRatePeriodRate = (index: number, value: number) => {
    const updated = [...ratePeriods]
    updated[index] = { ...updated[index], rate: value }
    setRatePeriods(updated)
  }

  const updateRatePeriodYears = (index: number, value: number) => {
    const updated = [...ratePeriods]
    updated[index] = { ...updated[index], years: value }
    setRatePeriods(updated)
  }

  const addCompleteRatePeriod = () => {
    setCompleteRatePeriods([...completeRatePeriods, { rate: 10, years: 1 }])
  }

  const removeCompleteRatePeriod = (index: number) => {
    setCompleteRatePeriods(completeRatePeriods.filter((_, i) => i !== index))
  }

  const updateCompleteRatePeriodRate = (index: number, value: number) => {
    const updated = [...completeRatePeriods]
    updated[index] = { ...updated[index], rate: value }
    setCompleteRatePeriods(updated)
  }

  const updateCompleteRatePeriodYears = (index: number, value: number) => {
    const updated = [...completeRatePeriods]
    updated[index] = { ...updated[index], years: value }
    setCompleteRatePeriods(updated)
  }

  // Auto-recalculate when loan mode changes if results exist
  useEffect(() => {
    if (contribResult) {
      calculateContributions()
    }
  }, [isLoanMode])

  useEffect(() => {
    if (completeResult) {
      calculateComplete()
    }
  }, [isLoanMode])

  // Helper functions para type guards
  const isLoanResult = (result: ContributionResult | LoanResult): result is LoanResult => {
    return 'finalBalance' in result
  }

  const isContributionResult = (result: ContributionResult | LoanResult): result is ContributionResult => {
    return 'finalAmount' in result
  }

  // Helper para calcular cuota necesaria para liquidar un préstamo
  const calculateRequiredPayment = (principal: number, annualRate: number, years: number): number => {
    const r = annualRate / 100 / 12 // Tasa mensual
    const n = years * 12 // Número de pagos
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  }

  // Helper para calcular meses adicionales necesarios con la cuota actual
  const calculateAdditionalMonths = (balance: number, monthlyPayment: number, annualRate: number): number => {
    const r = annualRate / 100 / 12
    if (monthlyPayment <= balance * r) return Infinity // Pago no cubre intereses
    return Math.ceil(Math.log(monthlyPayment / (monthlyPayment - balance * r)) / Math.log(1 + r))
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mode Selection */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-1.5 sm:p-2 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
          <button
            onClick={() => setMode("contributions")}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              mode === "contributions" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Con Aportes Regulares
          </button>
          <button
            onClick={() => setMode("variableRates")}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              mode === "variableRates" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Tasas Variables
          </button>
          <button
            onClick={() => setMode("complete")}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              mode === "complete" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Modelo Completo
          </button>
        </div>
      </div>

      {/* Contributions Calculator */}
      {mode === "contributions" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-white border-b border-gray-200">
              <CardTitle className="text-lg sm:text-xl">Calculadora con Aportes Regulares</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Modelo discreto y continuo</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Mode Toggle */}
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-[#DC2626]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Contexto</h4>
                    <p className="text-xs text-gray-600">{isLoanMode ? "Pagos reducen deuda" : "Aportes aumentan capital"}</p>
                  </div>
                  <div className="flex items-center gap-0 border-2 border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setIsLoanMode(false)}
                      className={`px-3 py-1.5 text-xs font-semibold transition-all ${
                        !isLoanMode ? "bg-[#DC2626] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Ahorro
                    </button>
                    <button
                      onClick={() => setIsLoanMode(true)}
                      className={`px-3 py-1.5 text-xs font-semibold transition-all border-l-2 border-gray-300 ${
                        isLoanMode ? "bg-[#DC2626] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Préstamo
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contrib-principal" className="text-sm font-semibold">
                  Capital Inicial (COP)
                </Label>
                <Input
                  id="contrib-principal"
                  type="text"
                  inputMode="numeric"
                  value={principal.displayValue}
                  onChange={(e) => principal.handleChange(e.target.value)}
                  onBlur={principal.handleBlur}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contrib-rate" className="text-sm font-semibold">
                  Tasa Anual (%)
                </Label>
                <Input
                  id="contrib-rate"
                  type="text"
                  inputMode="decimal"
                  value={annualRate.displayValue}
                  onChange={(e) => annualRate.handleChange(e.target.value)}
                  onBlur={annualRate.handleBlur}
                  className="text-base"
                  placeholder="Ej: 18.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contrib-years" className="text-sm font-semibold">
                  Tiempo (años)
                </Label>
                <Input
                  id="contrib-years"
                  type="text"
                  inputMode="numeric"
                  value={years.displayValue}
                  onChange={(e) => years.handleChange(e.target.value)}
                  onBlur={years.handleBlur}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly-contrib" className="text-sm font-semibold">
                  Aporte Mensual (COP)
                </Label>
                <Input
                  id="monthly-contrib"
                  type="text"
                  inputMode="numeric"
                  value={monthlyContribution.displayValue}
                  onChange={(e) => monthlyContribution.handleChange(e.target.value)}
                  onBlur={monthlyContribution.handleBlur}
                  className="text-base"
                />
              </div>

              <Button onClick={calculateContributions} className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-base py-6">
                <CalcIcon className="w-5 h-5 mr-2" />
                Calcular
              </Button>
            </CardContent>
          </Card>

          {contribResult && (
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Resultados</h3>
              
              {/* Advertencia si es préstamo y los pagos no cubren intereses */}
              {isLoanResult(contribResult.discrete) && contribResult.discrete.warning && (
                <div className="bg-red-50 border-l-4 border-[#DC2626] p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">{contribResult.discrete.warning}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Modelo Discreto */}
                <div className="bg-white p-4 sm:p-5 border-l-4 border-[#DC2626] shadow-sm rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3 text-base">Modelo Discreto (Real)</h4>
                  <div className="space-y-3 text-sm">
                    {isLoanResult(contribResult.discrete) ? (
                      // Modo Préstamo
                      <>
                        {/* Estado del préstamo */}
                        <div className="mb-2">
                          {contribResult.discrete.finalBalance > 0 ? (
                            <div className="bg-gray-50 border-l-4 border-[#DC2626] p-2">
                              <span className="text-xs font-bold text-gray-900">DEUDA PENDIENTE</span>
                            </div>
                          ) : (
                            <div className="bg-gray-50 border-l-4 border-gray-400 p-2">
                              <span className="text-xs font-bold text-gray-900">PRÉSTAMO LIQUIDADO</span>
                            </div>
                          )}
                        </div>

                        {/* Datos principales */}
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Saldo Final:</span>
                          <span className={`font-bold text-base ${contribResult.discrete.finalBalance > 0 ? 'text-[#DC2626]' : 'text-gray-900'}`}>
                            {formatCurrency(contribResult.discrete.finalBalance)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Pagado:</span>
                          <span className="font-semibold">{formatCurrency(contribResult.discrete.totalPaid)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Capital Amortizado:</span>
                          <span className="font-semibold text-gray-900">{formatCurrency(contribResult.discrete.principalPaid)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <span className="text-gray-700 font-medium">Intereses Pagados:</span>
                          <span className="font-bold text-[#DC2626]">
                            {formatCurrency(contribResult.discrete.totalInterest)}
                          </span>
                        </div>

                        {/* Barra de progreso */}
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600">Progreso de Pago:</span>
                            <span className="text-xs font-bold text-gray-900">
                              {((contribResult.discrete.principalPaid / principal.numericValue) * 100).toFixed(2)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded h-1.5">
                            <div 
                              className="h-1.5 rounded bg-[#DC2626]"
                              style={{ width: `${(contribResult.discrete.principalPaid / principal.numericValue) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Información adicional */}
                        {contribResult.discrete.finalBalance > 0 && (
                          <div className="pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-600 mb-2">Opciones para liquidar la deuda:</p>
                            <div className="bg-gray-50 p-2 rounded space-y-1 text-xs text-gray-700">
                              <div className="flex justify-between">
                                <span>Pago único:</span>
                                <span className="font-semibold">{formatCurrency(contribResult.discrete.finalBalance)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Cuota para {years.numericValue} años:</span>
                                <span className="font-semibold">{formatCurrency(calculateRequiredPayment(principal.numericValue, annualRate.numericValue, years.numericValue))}/mes</span>
                              </div>
                              {calculateAdditionalMonths(contribResult.discrete.finalBalance, monthlyContribution.numericValue, annualRate.numericValue) !== Infinity && (
                                <div className="flex justify-between">
                                  <span>Meses adicionales (cuota actual):</span>
                                  <span className="font-semibold">{calculateAdditionalMonths(contribResult.discrete.finalBalance, monthlyContribution.numericValue, annualRate.numericValue)} meses</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      // Modo Ahorro
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Valor Final:</span>
                          <span className="font-bold text-gray-900 text-base">{formatCurrency(contribResult.discrete.finalAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Aportado:</span>
                          <span className="font-semibold">{formatCurrency(contribResult.discrete.totalContributions)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <span className="text-gray-700 font-medium">Intereses Ganados:</span>
                          <span className="font-bold text-[#DC2626]">
                            {formatCurrency(contribResult.discrete.totalInterest)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Modelo Continuo */}
                <div className="bg-white p-4 sm:p-5 border-l-4 border-gray-400 shadow-sm rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3 text-base">Modelo Continuo (Teórico)</h4>
                  <div className="space-y-3 text-sm">
                    {isLoanResult(contribResult.continuous) ? (
                      // Modo Préstamo
                      <>
                        {/* Estado del préstamo */}
                        <div className="mb-2">
                          {contribResult.continuous.finalBalance > 0 ? (
                            <div className="bg-gray-50 border-l-4 border-[#DC2626] p-2">
                              <span className="text-xs font-bold text-gray-900">DEUDA PENDIENTE</span>
                            </div>
                          ) : (
                            <div className="bg-gray-50 border-l-4 border-gray-400 p-2">
                              <span className="text-xs font-bold text-gray-900">PRÉSTAMO LIQUIDADO</span>
                            </div>
                          )}
                        </div>

                        {/* Datos principales */}
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Saldo Final:</span>
                          <span className={`font-bold text-base ${contribResult.continuous.finalBalance > 0 ? 'text-[#DC2626]' : 'text-gray-900'}`}>
                            {formatCurrency(contribResult.continuous.finalBalance)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Pagado:</span>
                          <span className="font-semibold">{formatCurrency(contribResult.continuous.totalPaid)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Capital Amortizado:</span>
                          <span className="font-semibold text-gray-900">{formatCurrency(contribResult.continuous.principalPaid)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <span className="text-gray-700 font-medium">Intereses Pagados:</span>
                          <span className="font-bold text-[#DC2626]">
                            {formatCurrency(contribResult.continuous.totalInterest)}
                          </span>
                        </div>

                        {/* Barra de progreso */}
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600">Progreso de Pago:</span>
                            <span className="text-xs font-bold text-gray-900">
                              {((contribResult.continuous.principalPaid / principal.numericValue) * 100).toFixed(2)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded h-1.5">
                            <div 
                              className="h-1.5 rounded bg-[#DC2626]"
                              style={{ width: `${(contribResult.continuous.principalPaid / principal.numericValue) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Información adicional */}
                        {contribResult.continuous.finalBalance > 0 && (
                          <div className="pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-600 mb-2">Opciones para liquidar la deuda:</p>
                            <div className="bg-gray-50 p-2 rounded space-y-1 text-xs text-gray-700">
                              <div className="flex justify-between">
                                <span>Pago único:</span>
                                <span className="font-semibold">{formatCurrency(contribResult.continuous.finalBalance)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Cuota para {years.numericValue} años:</span>
                                <span className="font-semibold">{formatCurrency(calculateRequiredPayment(principal.numericValue, annualRate.numericValue, years.numericValue))}/mes</span>
                              </div>
                              {calculateAdditionalMonths(contribResult.continuous.finalBalance, monthlyContribution.numericValue, annualRate.numericValue) !== Infinity && (
                                <div className="flex justify-between">
                                  <span>Meses adicionales (cuota actual):</span>
                                  <span className="font-semibold">{calculateAdditionalMonths(contribResult.continuous.finalBalance, monthlyContribution.numericValue, annualRate.numericValue)} meses</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      // Modo Ahorro
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Valor Final:</span>
                          <span className="font-bold text-gray-900 text-base">{formatCurrency(contribResult.continuous.finalAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Aportado:</span>
                          <span className="font-semibold">{formatCurrency(contribResult.continuous.totalContributions)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <span className="text-gray-700 font-medium">Intereses Ganados:</span>
                          <span className="font-bold text-[#DC2626]">
                            {formatCurrency(contribResult.continuous.totalInterest)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Variable Rates Calculator */}
      {mode === "variableRates" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-white border-b border-gray-200">
              <CardTitle className="text-lg sm:text-xl">Calculadora con Tasas Variables</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Múltiples períodos con diferentes tasas</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="var-principal" className="text-sm font-semibold">
                  Capital Inicial (COP)
                </Label>
                <Input
                  id="var-principal"
                  type="text"
                  inputMode="numeric"
                  value={varPrincipal.displayValue}
                  onChange={(e) => varPrincipal.handleChange(e.target.value)}
                  onBlur={varPrincipal.handleBlur}
                  className="text-base"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold">Períodos de Tasas</Label>
                  <Button
                    onClick={addRatePeriod}
                    variant="outline"
                    size="sm"
                    className="text-xs border-[#DC2626] text-[#DC2626] hover:bg-red-50"
                  >
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Agregar
                  </Button>
                </div>

                {ratePeriods.map((period, index) => (
                  <RatePeriodInput
                    key={index}
                    rate={period.rate}
                    years={period.years}
                    index={index}
                    canRemove={ratePeriods.length > 1}
                    onRateChange={updateRatePeriodRate}
                    onYearsChange={updateRatePeriodYears}
                    onRemove={removeRatePeriod}
                  />
                ))}
              </div>

              <Button onClick={calculateVariableRates} className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-base py-6">
                <CalcIcon className="w-5 h-5 mr-2" />
                Calcular
              </Button>
            </CardContent>
          </Card>

          {varRatesResult && (
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Resultados</h3>
              
              <div className="bg-white p-5 sm:p-6 border-l-4 border-[#DC2626] shadow-lg rounded-lg">
                <div className="flex items-baseline gap-2 mb-4">
                  <h4 className="font-bold text-gray-900 text-base">Valor Final:</h4>
                  <p className="text-2xl sm:text-3xl font-bold text-[#DC2626]">{formatCurrency(varRatesResult.finalAmount)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-200 pt-4">
                  <div className="flex justify-between sm:flex-col sm:gap-1">
                    <span className="text-gray-600">Capital Inicial:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(varPrincipal.numericValue)}</span>
                  </div>
                  <div className="flex justify-between sm:flex-col sm:gap-1">
                    <span className="text-gray-600">Intereses Totales:</span>
                    <span className="font-bold text-[#DC2626]">{formatCurrency(varRatesResult.totalInterest)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 border-l-4 border-gray-400 shadow-sm rounded-lg">
                <div className="flex items-baseline justify-between mb-3">
                  <h4 className="font-bold text-gray-900 text-base">Estructura de Tasas</h4>
                  <span className="text-sm font-bold text-[#DC2626]">
                    Total: {ratePeriods.reduce((sum, p) => sum + p.years, 0)} años
                  </span>
                </div>
                <div className="space-y-2">
                  {ratePeriods.map((period, index) => (
                    <div key={index} className="flex justify-between items-center text-sm py-1">
                      <span className="text-gray-700">
                        Período {index + 1} ({period.years} {period.years === 1 ? "año" : "años"})
                      </span>
                      <span className="font-semibold text-gray-900">{period.rate}% E.A.</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Complete Model Calculator */}
      {mode === "complete" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-white border-b border-gray-200">
              <CardTitle className="text-lg sm:text-xl">Modelo Completo</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Tasas variables + Aportes periódicos</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Mode Toggle */}
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-[#DC2626]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Contexto</h4>
                    <p className="text-xs text-gray-600">{isLoanMode ? "Pagos reducen deuda" : "Aportes aumentan capital"}</p>
                  </div>
                  <div className="flex items-center gap-0 border-2 border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setIsLoanMode(false)}
                      className={`px-3 py-1.5 text-xs font-semibold transition-all ${
                        !isLoanMode ? "bg-[#DC2626] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Ahorro
                    </button>
                    <button
                      onClick={() => setIsLoanMode(true)}
                      className={`px-3 py-1.5 text-xs font-semibold transition-all border-l-2 border-gray-300 ${
                        isLoanMode ? "bg-[#DC2626] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Préstamo
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complete-principal" className="text-sm font-semibold">
                  Capital Inicial (COP)
                </Label>
                <Input
                  id="complete-principal"
                  type="text"
                  inputMode="numeric"
                  value={completePrincipal.displayValue}
                  onChange={(e) => completePrincipal.handleChange(e.target.value)}
                  onBlur={completePrincipal.handleBlur}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complete-contribution" className="text-sm font-semibold">
                  Aporte Mensual (COP)
                </Label>
                <Input
                  id="complete-contribution"
                  type="text"
                  inputMode="numeric"
                  value={completeContribution.displayValue}
                  onChange={(e) => completeContribution.handleChange(e.target.value)}
                  onBlur={completeContribution.handleBlur}
                  className="text-base"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold">Períodos de Tasas</Label>
                  <Button
                    onClick={addCompleteRatePeriod}
                    variant="outline"
                    size="sm"
                    className="text-xs border-[#DC2626] text-[#DC2626] hover:bg-red-50"
                  >
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Agregar
                  </Button>
                </div>

                {completeRatePeriods.map((period, index) => (
                  <RatePeriodInput
                    key={index}
                    rate={period.rate}
                    years={period.years}
                    index={index}
                    canRemove={completeRatePeriods.length > 1}
                    onRateChange={updateCompleteRatePeriodRate}
                    onYearsChange={updateCompleteRatePeriodYears}
                    onRemove={removeCompleteRatePeriod}
                  />
                ))}
              </div>

              <Button onClick={calculateComplete} className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-base py-6">
                <CalcIcon className="w-5 h-5 mr-2" />
                Calcular
              </Button>
            </CardContent>
          </Card>

          {completeResult && (
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Resultado Completo</h3>
              
              {/* Advertencia si es préstamo y los pagos no cubren intereses */}
              {isLoanResult(completeResult) && completeResult.warning && (
                <div className="bg-red-50 border-l-4 border-[#DC2626] p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">{completeResult.warning}</p>
                </div>
              )}
              
              <div className="bg-white p-5 sm:p-6 border-l-4 border-[#DC2626] shadow-lg rounded-lg space-y-3">
                {/* Estado del préstamo (solo en modo préstamo) */}
                {isLoanResult(completeResult) && (
                  <div>
                    {completeResult.finalBalance > 0 ? (
                      <div className="bg-gray-50 border-l-4 border-[#DC2626] p-2">
                        <span className="text-xs font-bold text-gray-900">DEUDA PENDIENTE</span>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-l-4 border-gray-400 p-2">
                        <span className="text-xs font-bold text-gray-900">PRÉSTAMO LIQUIDADO</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-baseline gap-2">
                  <h4 className="font-bold text-gray-900 text-base">
                    {isLoanResult(completeResult) ? "Saldo Final:" : "Valor Final:"}
                  </h4>
                  <p className={`text-2xl sm:text-3xl font-bold ${
                    isLoanResult(completeResult) 
                      ? (completeResult.finalBalance > 0 ? 'text-[#DC2626]' : 'text-gray-900')
                      : 'text-[#DC2626]'
                  }`}>
                    {formatCurrency(isLoanResult(completeResult) ? completeResult.finalBalance : completeResult.finalAmount)}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm border-t border-gray-200 pt-3">
                  <div className="flex justify-between sm:flex-col sm:gap-1">
                    <span className="text-gray-600">
                      {isLoanResult(completeResult) ? "Deuda Inicial:" : "Capital Inicial:"}
                    </span>
                    <span className="font-semibold text-gray-900">{formatCurrency(completePrincipal.numericValue)}</span>
                  </div>
                  <div className="flex justify-between sm:flex-col sm:gap-1">
                    <span className="text-gray-600">
                      {isLoanResult(completeResult) ? "Total Pagado:" : "Total Aportado:"}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(isLoanResult(completeResult) ? completeResult.totalPaid : completeResult.totalContributions)}
                    </span>
                  </div>
                  {isLoanResult(completeResult) && (
                    <div className="flex justify-between sm:flex-col sm:gap-1">
                      <span className="text-gray-600">Capital Amortizado:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(completeResult.principalPaid)}</span>
                    </div>
                  )}
                  <div className="flex justify-between sm:flex-col sm:gap-1 sm:col-span-2 pt-2 border-t border-gray-200">
                    <span className="text-gray-700 font-medium">
                      {isLoanResult(completeResult) ? "Intereses Pagados:" : "Intereses Ganados:"}
                    </span>
                    <span className="font-bold text-[#DC2626] text-base">{formatCurrency(completeResult.totalInterest)}</span>
                  </div>
                </div>

                {/* Barra de progreso (solo en modo préstamo) */}
                {isLoanResult(completeResult) && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Progreso de Pago:</span>
                      <span className="text-xs font-bold text-gray-900">
                        {((completeResult.principalPaid / completePrincipal.numericValue) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-1.5">
                      <div 
                        className="h-1.5 rounded bg-[#DC2626]"
                        style={{ width: `${(completeResult.principalPaid / completePrincipal.numericValue) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Información adicional (solo en modo préstamo con deuda pendiente) */}
                {isLoanResult(completeResult) && completeResult.finalBalance > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">Opciones para liquidar la deuda:</p>
                    <div className="bg-gray-50 p-3 rounded space-y-1 text-xs text-gray-700">
                      <div className="flex justify-between">
                        <span>Pago único:</span>
                        <span className="font-semibold">{formatCurrency(completeResult.finalBalance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cuota necesaria:</span>
                        <span className="font-semibold">{formatCurrency(calculateRequiredPayment(completePrincipal.numericValue, completeRatePeriods[0].rate, completeRatePeriods.reduce((sum, p) => sum + p.years, 0)))}/mes</span>
                      </div>
                      {calculateAdditionalMonths(completeResult.finalBalance, completeContribution.numericValue, completeRatePeriods[completeRatePeriods.length - 1].rate) !== Infinity && (
                        <div className="flex justify-between">
                          <span>Meses adicionales (cuota actual):</span>
                          <span className="font-semibold">{calculateAdditionalMonths(completeResult.finalBalance, completeContribution.numericValue, completeRatePeriods[completeRatePeriods.length - 1].rate)} meses</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white p-4 sm:p-5 border-l-4 border-gray-400 shadow-sm rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3 text-base">Estructura de Tasas</h4>
                <div className="space-y-2">
                  {completeRatePeriods.map((period, index) => (
                    <div key={index} className="flex justify-between items-center text-sm py-1">
                      <span className="text-gray-700">
                        Período {index + 1} ({period.years} {period.years === 1 ? "año" : "años"})
                      </span>
                      <span className="font-semibold text-gray-900">{period.rate}% E.A.</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                    <span className="font-bold text-gray-900 text-sm">Tiempo Total:</span>
                    <span className="font-bold text-[#DC2626] text-sm">
                      {completeRatePeriods.reduce((sum, p) => sum + p.years, 0)} años
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
