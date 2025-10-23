"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  calculateWithContributions,
  calculateContinuousWithContributions,
  calculateWithVariableRates,
  calculateVariableRatesWithContributions,
  type RatePeriod,
} from "@/lib/calculations"
import { formatCurrency } from "@/lib/utils"
import { PlusCircle, Calculator as CalcIcon } from "lucide-react"
import { useNumericInput } from "@/hooks/use-numeric-input"
import { RatePeriodInput } from "@/components/rate-period-input"

type CalculatorMode = "contributions" | "variableRates" | "complete"

export function AdvancedCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("contributions")

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
  const [contribResult, setContribResult] = useState<any>(null)
  const [varRatesResult, setVarRatesResult] = useState<any>(null)
  const [completeResult, setCompleteResult] = useState<any>(null)

  const calculateContributions = () => {
    const discrete = calculateWithContributions(principal.numericValue, annualRate.numericValue, years.numericValue, 12, monthlyContribution.numericValue)
    const continuous = calculateContinuousWithContributions(
      principal.numericValue,
      annualRate.numericValue,
      years.numericValue,
      monthlyContribution.numericValue * 12,
    )
    setContribResult({ discrete, continuous })
  }

  const calculateVariableRates = () => {
    const result = calculateWithVariableRates(varPrincipal.numericValue, ratePeriods, 12)
    setVarRatesResult(result)
  }

  const calculateComplete = () => {
    const result = calculateVariableRatesWithContributions(
      completePrincipal.numericValue,
      completeRatePeriods,
      12,
      completeContribution.numericValue,
    )
    setCompleteResult(result)
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
            <CardHeader className="bg-cyan-50">
              <CardTitle className="text-lg sm:text-xl">Calculadora con Aportes Regulares</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Modelo discreto y continuo</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
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
            <Card className="shadow-lg border-2 border-cyan-300">
              <CardHeader className="bg-gradient-to-br from-cyan-50 to-teal-50">
                <CardTitle className="text-lg sm:text-xl">Resultados</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Comparación de modelos</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-3">Modelo Discreto (Real)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valor Final:</span>
                      <span className="font-bold text-blue-900">{formatCurrency(contribResult.discrete.finalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Aportado:</span>
                      <span className="font-semibold">{formatCurrency(principal.numericValue + contribResult.discrete.totalContributions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Intereses Ganados:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(contribResult.discrete.totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 rounded-lg p-4 border-2 border-teal-200">
                  <h4 className="font-bold text-teal-900 mb-3">Modelo Continuo (Teórico)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valor Final:</span>
                      <span className="font-bold text-teal-900">{formatCurrency(contribResult.continuous.finalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Aportado:</span>
                      <span className="font-semibold">{formatCurrency(principal.numericValue + contribResult.continuous.totalContributions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Intereses Ganados:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(contribResult.continuous.totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-4 border-2 border-green-300">
                  <h4 className="font-bold text-green-900 mb-2">Resumen</h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700">
                      Capital inicial: <span className="font-semibold">{formatCurrency(principal.numericValue)}</span>
                    </p>
                    <p className="text-gray-700">
                      Total invertido:{" "}
                      <span className="font-semibold">
                        {formatCurrency(principal.numericValue + contribResult.discrete.totalContributions)}
                      </span>
                    </p>
                    <p className="text-green-900 font-bold text-base mt-2">
                      Rendimiento:{" "}
                      {(
                        (contribResult.discrete.totalInterest /
                          (principal.numericValue + contribResult.discrete.totalContributions)) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Variable Rates Calculator */}
      {mode === "variableRates" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-amber-50">
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
            <Card className="shadow-lg border-2 border-amber-300">
              <CardHeader className="bg-gradient-to-br from-amber-50 to-orange-50">
                <CardTitle className="text-lg sm:text-xl">Resultado</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Cálculo con tasas variables</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg p-5 border-2 border-orange-300">
                  <h4 className="font-bold text-orange-900 mb-4 text-lg">Monto Final</h4>
                  <p className="text-3xl font-bold text-[#DC2626] mb-3">{formatCurrency(varRatesResult.finalAmount)}</p>
                  <div className="space-y-2 text-sm border-t-2 border-orange-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital Inicial:</span>
                      <span className="font-semibold">{formatCurrency(varPrincipal.numericValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Intereses Totales:</span>
                      <span className="font-bold text-red-600">{formatCurrency(varRatesResult.totalInterest)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
                  <h4 className="font-bold text-yellow-900 mb-3">Estructura de Tasas</h4>
                  <div className="space-y-2">
                    {ratePeriods.map((period, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {period.years === 1 ? "Año" : "Años"} {index === 0 ? "1" : index === 1 ? "2" : `${index + 1}`}
                          {period.years > 1 ? `-${index + period.years}` : ""}:
                        </span>
                        <span className="font-semibold text-yellow-900">{period.rate}% E.A.</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">Tiempo Total</h4>
                  <p className="text-2xl font-bold text-[#DC2626]">
                    {ratePeriods.reduce((sum, p) => sum + p.years, 0)} años
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Complete Model Calculator */}
      {mode === "complete" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-rose-50 to-pink-50">
              <CardTitle className="text-lg sm:text-xl">Modelo Completo</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Tasas variables + Aportes periódicos</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
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
            <Card className="shadow-lg border-2 border-rose-300">
              <CardHeader className="bg-gradient-to-br from-rose-50 to-pink-50">
                <CardTitle className="text-lg sm:text-xl">Resultado Completo</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Análisis detallado</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-5 border-2 border-purple-300">
                  <h4 className="font-bold text-purple-900 mb-4 text-lg">Valor Final</h4>
                  <p className="text-3xl font-bold text-[#DC2626] mb-4">{formatCurrency(completeResult.finalAmount)}</p>
                  
                  <div className="space-y-2 text-sm border-t-2 border-purple-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital Inicial:</span>
                      <span className="font-semibold">{formatCurrency(completePrincipal.numericValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Aportado:</span>
                      <span className="font-semibold">{formatCurrency(completePrincipal.numericValue + completeResult.totalContributions)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-purple-200">
                      <span className="text-gray-700 font-semibold">Intereses Ganados:</span>
                      <span className="font-bold text-green-600">{formatCurrency(completeResult.totalInterest)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-lg p-4 border-2 border-emerald-200">
                  <h4 className="font-bold text-emerald-900 mb-3">Rendimiento</h4>
                  <p className="text-2xl font-bold text-emerald-700">
                    {(
                      (completeResult.totalInterest / (completePrincipal.numericValue + completeResult.totalContributions)) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Sobre el total invertido</p>
                </div>

                <div className="bg-violet-50 rounded-lg p-4 border-2 border-violet-200">
                  <h4 className="font-bold text-violet-900 mb-3">Estructura de Tasas</h4>
                  <div className="space-y-2">
                    {completeRatePeriods.map((period, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          Período {index + 1} ({period.years} {period.years === 1 ? "año" : "años"}):
                        </span>
                        <span className="font-semibold text-violet-900">{period.rate}% E.A.</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-violet-200">
                    <div className="flex justify-between text-sm font-bold">
                      <span>Tiempo Total:</span>
                      <span className="text-[#DC2626]">
                        {completeRatePeriods.reduce((sum, p) => sum + p.years, 0)} años
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
