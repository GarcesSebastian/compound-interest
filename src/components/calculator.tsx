"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { getBanks } from "@/lib/banks"
import { formatCurrency } from "@/lib/utils"
import { calculateCompoundInterest, calculateContinuousInterest } from "@/lib/calculations"
import { TrendingUp, DollarSign, Calendar, Building2, AlertCircle, CheckCircle2 } from "lucide-react"
import { GrowthChart } from "@/components/growth-chart"
import { BlockMath, InlineMath } from "@/components/math-renderer"

interface CalculatorProps {
  capital: number
  years: number
  onCapitalChange: (value: number) => void
  onYearsChange: (value: number) => void
  selectedBank: string | null
  onBankChange: (value: string | null) => void
  refreshKey: number
}

const DEFAULT_BANKS = [
  { id: "bbva", name: "BBVA Colombia", rate: 18.0 },
  { id: "bancolombia", name: "Bancolombia", rate: 17.2 },
  { id: "davivienda", name: "Davivienda", rate: 16.5 },
  { id: "bogota", name: "Banco de Bogotá", rate: 17.0 },
]

export function Calculator({
  capital,
  years,
  onCapitalChange,
  onYearsChange,
  selectedBank,
  onBankChange,
  refreshKey,
}: CalculatorProps) {
  const [banks, setBanks] = useState(DEFAULT_BANKS)
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    setBanks(getBanks())
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isClient) {
      setBanks(getBanks())
    }
  }, [refreshKey, isClient])

  const bank = selectedBank ? banks.find((b) => b.id === selectedBank) : null
  const result = bank ? calculateCompoundInterest(capital, bank.rate, years, 12) : null
  const continuousResult = bank ? calculateContinuousInterest(capital, bank.rate, years) : null

  // Calculate all banks for comparison
  const allResults = banks
    .map((b) => ({
      ...b,
      ...calculateCompoundInterest(capital, b.rate, years, 12),
    }))
    .sort((a, b) => a.finalAmount - b.finalAmount)

  const bestBank = allResults[0]
  const potentialSavings = result ? result.finalAmount - bestBank.finalAmount : 0

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Controls Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#DC2626] rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="truncate">Parámetros del Préstamo</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Capital Input */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-2">
              <Label className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[#DC2626] flex-shrink-0" />
                <span className="truncate">Capital Inicial (P₀)</span>
              </Label>
              <span className="text-lg sm:text-2xl md:text-3xl font-bold text-[#DC2626] whitespace-nowrap text-right">{formatCurrency(capital)}</span>
            </div>
            <Slider
              value={[capital]}
              onValueChange={([value]) => onCapitalChange(value)}
              min={1000000}
              max={50000000}
              step={500000}
              className="[&_[role=slider]]:bg-[#DC2626] [&_[role=slider]]:border-[#DC2626] [&_[role=slider]]:w-5 [&_[role=slider]]:h-5"
            />
            <div className="flex justify-between text-sm text-gray-500 font-medium">
              <span>$1M</span>
              <span>$50M</span>
            </div>
          </div>

          {/* Years Input */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-2">
              <Label className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#DC2626] flex-shrink-0" />
                Plazo (t)
              </Label>
              <span className="text-lg sm:text-2xl md:text-3xl font-bold text-[#DC2626] whitespace-nowrap">
                {years} {years === 1 ? "año" : "años"}
              </span>
            </div>
            <Slider
              value={[years]}
              onValueChange={([value]) => onYearsChange(value)}
              min={1}
              max={10}
              step={1}
              className="[&_[role=slider]]:bg-[#DC2626] [&_[role=slider]]:border-[#DC2626] [&_[role=slider]]:w-5 [&_[role=slider]]:h-5"
            />
            <div className="flex justify-between text-sm text-gray-500 font-medium">
              <span>1 año</span>
              <span>10 años</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Selection */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#DC2626] rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="truncate">Selecciona una Entidad Bancaria</span>
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 sm:p-6 rounded-xl border-2 border-gray-200 bg-white animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {banks.map((b) => {
              const bankResult = calculateCompoundInterest(capital, b.rate, years, 12)
              const isSelected = selectedBank === b.id
              const isBest = b.id === bestBank.id

              return (
                <button
                  key={b.id}
                  onClick={() => onBankChange(b.id)}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left relative ${
                    isSelected
                      ? "border-[#DC2626] bg-red-50 shadow-lg scale-[1.02]"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {isBest && (
                    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-lg">
                      MEJOR OPCIÓN
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">{b.name}</h3>
                    {isSelected && <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#DC2626] flex-shrink-0" />}
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-[#DC2626]">{b.rate}%</span>
                      <span className="text-xs sm:text-sm text-gray-500">E.A.</span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      <p className="font-semibold">Monto Final:</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">{formatCurrency(bankResult.finalAmount)}</p>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      <p className="font-semibold">Intereses:</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-[#DC2626] truncate">{formatCurrency(bankResult.totalInterest)}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && bank && continuousResult && (
        <>
          <GrowthChart capital={capital} rate={bank.rate} years={years} bankName={bank.name} />

          {/* Main Results */}
          <div className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 text-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 truncate">Resultados: {bank.name}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-white/20">
                <p className="text-red-100 text-xs sm:text-sm mb-1 sm:mb-2">Capital Inicial</p>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold break-words">{formatCurrency(capital)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-white/20">
                <p className="text-red-100 text-xs sm:text-sm mb-1 sm:mb-2">Monto Final</p>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold break-words">{formatCurrency(result.finalAmount)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-white/20 sm:col-span-2 md:col-span-1">
                <p className="text-red-100 text-xs sm:text-sm mb-1 sm:mb-2">Intereses Totales</p>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold break-words">{formatCurrency(result.totalInterest)}</p>
              </div>
            </div>

            {/* Formula Display */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">Fórmula Utilizada (Modelo Discreto)</h3>
              <div className="bg-white rounded-lg p-4 sm:p-6 mb-3 sm:mb-4 [&_.katex]:text-gray-900">
                <BlockMath>{"P(t) = P_0 \\times \\left(1 + \\frac{r}{n}\\right)^{nt}"}</BlockMath>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                <div className="bg-white/10 rounded-lg p-2 sm:p-3">
                  <p className="text-red-100 mb-1 text-xs">P₀</p>
                  <p className="font-bold text-xs sm:text-sm break-words">{formatCurrency(capital)}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-2 sm:p-3">
                  <p className="text-red-100 mb-1 text-xs">r</p>
                  <p className="font-bold text-xs sm:text-sm">
                    {bank.rate}% = {(bank.rate / 100).toFixed(3)}
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-2 sm:p-3">
                  <p className="text-red-100 mb-1 text-xs">n</p>
                  <p className="font-bold text-xs sm:text-sm">12 (mensual)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-2 sm:p-3">
                  <p className="text-red-100 mb-1 text-xs">t</p>
                  <p className="font-bold text-xs sm:text-sm">{years} años</p>
                </div>
              </div>
            </div>
          </div>

          {/* Model Comparison */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Comparación: Modelo Discreto vs Continuo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="bg-white p-4 sm:p-6 border-l-4 border-[#DC2626] shadow-sm">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Modelo Discreto (Real)</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-gray-50 p-3 sm:p-4 border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Fórmula</p>
                    <div className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                      <InlineMath>{"P(t) = P_0\\left(1 + \\frac{r}{n}\\right)^{nt}"}</InlineMath>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Resultado</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#DC2626] break-words">{formatCurrency(result.finalAmount)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Capitalización</p>
                    <p className="text-sm sm:text-base font-bold text-gray-900">Mensual (n = 12)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 border-l-4 border-gray-400 shadow-sm">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Modelo Continuo (Teórico)</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-gray-50 p-3 sm:p-4 border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Fórmula</p>
                    <div className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                      <InlineMath>{"P(t) = P_0 e^{rt}"}</InlineMath>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Resultado</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 break-words">{formatCurrency(continuousResult.finalAmount)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Capitalización</p>
                    <p className="text-sm sm:text-base font-bold text-gray-900">Continua (n → ∞)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 sm:p-6 border border-gray-300">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Análisis de Diferencia</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 border border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Diferencia Absoluta</p>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 break-words">
                    {formatCurrency(Math.abs(continuousResult.finalAmount - result.finalAmount))}
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 border border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Diferencia Relativa</p>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                    {(Math.abs((continuousResult.finalAmount - result.finalAmount) / result.finalAmount) * 100).toFixed(
                      2,
                    )}
                    %
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 border border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Modelo Mayor</p>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                    {continuousResult.finalAmount > result.finalAmount ? "Continuo" : "Discreto"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Alert */}
          {potentialSavings > 0 && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626]">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#DC2626] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Oportunidad de Ahorro Detectada</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 sm:mb-4">
                    Podrías ahorrar{" "}
                    <span className="font-bold text-[#DC2626] text-base sm:text-lg md:text-xl lg:text-2xl">{formatCurrency(potentialSavings)}</span>{" "}
                    eligiendo {bestBank.name}, la mejor opción del mercado.
                  </p>
                  <div className="bg-gray-50 p-4 sm:p-6 border border-gray-300">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-semibold">Comparación de Costos:</p>
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-semibold text-gray-700 text-xs sm:text-sm truncate">{bank.name}:</span>
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 whitespace-nowrap">{formatCurrency(result.finalAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-semibold text-gray-700 text-xs sm:text-sm truncate">{bestBank.name}:</span>
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-green-600 whitespace-nowrap">{formatCurrency(bestBank.finalAmount)}</span>
                      </div>
                      <div className="pt-2 border-t-2 border-gray-300 flex justify-between items-center gap-2">
                        <span className="font-bold text-gray-900 text-xs sm:text-sm">Ahorro Potencial:</span>
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#DC2626] whitespace-nowrap">{formatCurrency(potentialSavings)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {potentialSavings === 0 && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border-l-4 border-green-500">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">¡Excelente Elección!</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700">
                    {bank.name} ofrece la tasa más competitiva del mercado. Esta es la mejor opción disponible para
                    minimizar el costo total de tu préstamo.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
