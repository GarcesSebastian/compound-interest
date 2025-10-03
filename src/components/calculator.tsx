"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { getBanks } from "@/lib/banks"
import { formatCurrency } from "@/lib/utils"
import { calculateCompoundInterest, calculateContinuousInterest } from "@/lib/calculations"
import { TrendingUp, DollarSign, Calendar, Building2, AlertCircle, CheckCircle2 } from "lucide-react"
import { GrowthChart } from "@/components/growth-chart"

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
    <div className="space-y-8">
      {/* Controls Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#DC2626] rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          Parámetros del Préstamo
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Capital Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#DC2626]" />
                Capital Inicial (P₀)
              </Label>
              <span className="text-3xl font-bold text-[#DC2626]">{formatCurrency(capital)}</span>
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#DC2626]" />
                Plazo (t)
              </Label>
              <span className="text-3xl font-bold text-[#DC2626]">
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
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#DC2626] rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          Selecciona una Entidad Bancaria
        </h2>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 rounded-xl border-2 border-gray-200 bg-white animate-pulse">
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
          <div className="grid md:grid-cols-2 gap-4">
            {banks.map((b) => {
              const bankResult = calculateCompoundInterest(capital, b.rate, years, 12)
              const isSelected = selectedBank === b.id
              const isBest = b.id === bestBank.id

              return (
                <button
                  key={b.id}
                  onClick={() => onBankChange(b.id)}
                  className={`p-6 rounded-xl border-2 transition-all text-left relative ${
                    isSelected
                      ? "border-[#DC2626] bg-red-50 shadow-lg scale-[1.02]"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {isBest && (
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      MEJOR OPCIÓN
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{b.name}</h3>
                    {isSelected && <CheckCircle2 className="w-6 h-6 text-[#DC2626]" />}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#DC2626]">{b.rate}%</span>
                      <span className="text-sm text-gray-500">E.A.</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="font-semibold">Monto Final:</p>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(bankResult.finalAmount)}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="font-semibold">Intereses:</p>
                      <p className="text-lg font-bold text-[#DC2626]">{formatCurrency(bankResult.totalInterest)}</p>
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
          <div className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-2xl shadow-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-8">Resultados del Análisis: {bank.name}</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-red-100 text-sm mb-2">Capital Inicial</p>
                <p className="text-4xl font-bold">{formatCurrency(capital)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-red-100 text-sm mb-2">Monto Final</p>
                <p className="text-4xl font-bold">{formatCurrency(result.finalAmount)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-red-100 text-sm mb-2">Intereses Totales</p>
                <p className="text-4xl font-bold">{formatCurrency(result.totalInterest)}</p>
              </div>
            </div>

            {/* Formula Display */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">Fórmula Utilizada (Modelo Discreto)</h3>
              <div className="bg-white rounded-lg p-6 mb-4">
                <p className="text-center text-2xl font-bold text-gray-900">
                  P(t) = P₀ × (1 + r/n)<sup>nt</sup>
                </p>
              </div>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-red-100 mb-1">P₀</p>
                  <p className="font-bold">{formatCurrency(capital)}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-red-100 mb-1">r</p>
                  <p className="font-bold">
                    {bank.rate}% = {(bank.rate / 100).toFixed(3)}
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-red-100 mb-1">n</p>
                  <p className="font-bold">12 (mensual)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-red-100 mb-1">t</p>
                  <p className="font-bold">{years} años</p>
                </div>
              </div>
            </div>
          </div>

          {/* Model Comparison */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparación: Modelo Discreto vs Continuo</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-300">
                <h3 className="text-xl font-bold text-green-900 mb-4">Modelo Discreto (Real)</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-gray-600 mb-2">Fórmula</p>
                    <p className="text-lg font-bold text-gray-900">
                      P(t) = P₀(1 + r/n)<sup>nt</sup>
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-gray-600 mb-2">Resultado</p>
                    <p className="text-2xl font-bold text-green-700">{formatCurrency(result.finalAmount)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-gray-600 mb-2">Capitalización</p>
                    <p className="font-bold text-gray-900">Mensual (n = 12)</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Modelo Continuo (Teórico)</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-2">Fórmula</p>
                    <p className="text-lg font-bold text-gray-900">
                      P(t) = P₀e<sup>rt</sup>
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-2">Resultado</p>
                    <p className="text-2xl font-bold text-blue-700">{formatCurrency(continuousResult.finalAmount)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-2">Capitalización</p>
                    <p className="font-bold text-gray-900">Continua (n → ∞)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-300">
              <h3 className="text-lg font-bold text-yellow-900 mb-4">Análisis de Diferencia</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-gray-600 mb-1">Diferencia Absoluta</p>
                  <p className="text-xl font-bold text-yellow-700">
                    {formatCurrency(Math.abs(continuousResult.finalAmount - result.finalAmount))}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-gray-600 mb-1">Diferencia Relativa</p>
                  <p className="text-xl font-bold text-yellow-700">
                    {(Math.abs((continuousResult.finalAmount - result.finalAmount) / result.finalAmount) * 100).toFixed(
                      2,
                    )}
                    %
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-gray-600 mb-1">Modelo Mayor</p>
                  <p className="text-xl font-bold text-yellow-700">
                    {continuousResult.finalAmount > result.finalAmount ? "Continuo" : "Discreto"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Alert */}
          {potentialSavings > 0 && (
            <div className="bg-orange-50 rounded-2xl shadow-lg p-8 border-2 border-orange-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-orange-900 mb-3">Oportunidad de Ahorro Detectada</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    Podrías ahorrar{" "}
                    <span className="font-bold text-orange-600 text-2xl">{formatCurrency(potentialSavings)}</span>{" "}
                    eligiendo {bestBank.name}, la mejor opción del mercado.
                  </p>
                  <div className="bg-white rounded-xl p-6 border-2 border-orange-200">
                    <p className="text-sm text-gray-600 mb-3 font-semibold">Comparación de Costos:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">{bank.name}:</span>
                        <span className="text-xl font-bold text-gray-900">{formatCurrency(result.finalAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">{bestBank.name}:</span>
                        <span className="text-xl font-bold text-green-600">{formatCurrency(bestBank.finalAmount)}</span>
                      </div>
                      <div className="pt-2 border-t-2 border-orange-200 flex justify-between items-center">
                        <span className="font-bold text-orange-900">Ahorro Potencial:</span>
                        <span className="text-2xl font-bold text-orange-600">{formatCurrency(potentialSavings)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {potentialSavings === 0 && (
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 border-2 border-green-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">¡Excelente Elección!</h3>
                  <p className="text-lg text-gray-700">
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
