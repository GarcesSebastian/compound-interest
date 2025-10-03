"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { banks } from "@/lib/banks"
import { calculateCompoundInterest, calculateContinuousInterest } from "@/lib/calculations"
import { formatCurrency } from "@/lib/utils"
import { AlertCircle, TrendingDown, Calculator } from "lucide-react"

interface ResultsProps {
  capital: number
  years: number
  selectedBank: string | null
}

export function Results({ capital, years, selectedBank }: ResultsProps) {
  if (!selectedBank) {
    return (
      <Card className="shadow-lg">
        <CardContent className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Calculator className="w-24 h-24 mb-4" />
          <p className="text-xl font-semibold">Selecciona un banco</p>
          <p className="text-sm">para ver el análisis detallado</p>
        </CardContent>
      </Card>
    )
  }

  const bank = banks.find((b) => b.id === selectedBank)!
  const discreteResult = calculateCompoundInterest(capital, bank.rate, years, 12)
  const continuousResult = calculateContinuousInterest(capital, bank.rate, years)
  const difference = continuousResult.finalAmount - discreteResult.finalAmount
  const percentDifference = (difference / discreteResult.finalAmount) * 100

  // Calculate all banks for comparison
  const allResults = banks
    .map((b) => ({
      ...b,
      ...calculateCompoundInterest(capital, b.rate, years, 12),
    }))
    .sort((a, b) => a.finalAmount - b.finalAmount)

  const bankRank = allResults.findIndex((r) => r.id === bank.id) + 1
  const bestBank = allResults[0]
  const potentialSavings = discreteResult.finalAmount - bestBank.finalAmount

  return (
    <div className="space-y-6">
      {/* Main Results */}
      <Card className="shadow-lg border-2 border-[#DC2626]">
        <CardHeader className="bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white">
          <CardTitle className="text-2xl">Análisis Completo: {bank.name}</CardTitle>
          <CardDescription className="text-red-100">
            Resultados detallados para tu préstamo de {formatCurrency(capital)} a {years} años
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[#DC2626] to-[#EF4444] text-white p-6 rounded-lg shadow-md">
              <p className="text-sm opacity-90 mb-1">Monto Final</p>
              <p className="text-3xl font-bold">{formatCurrency(discreteResult.finalAmount)}</p>
              <p className="text-xs opacity-75 mt-2">Modelo Discreto (Real)</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">Intereses Totales</p>
              <p className="text-3xl font-bold text-[#DC2626]">{formatCurrency(discreteResult.totalInterest)}</p>
              <p className="text-xs text-gray-500 mt-2">Lo que pagas de más</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Tasa Efectiva</p>
              <p className="text-3xl font-bold text-blue-600">{bank.rate}%</p>
              <p className="text-xs text-gray-500 mt-2">Anual (E.A.)</p>
            </div>
          </div>

          {/* Formula Used */}
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#DC2626]" />
              Fórmula Utilizada (Modelo Discreto)
            </h3>
            <div className="bg-white p-4 rounded border-2 border-gray-300 mb-4">
              <p className="text-center font-mono text-lg">P(t) = P₀ × (1 + r/n)^(nt)</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <span className="font-semibold">P₀:</span> {formatCurrency(capital)}
                </p>
                <p>
                  <span className="font-semibold">r:</span> {bank.rate}% = {(bank.rate / 100).toFixed(3)}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">n:</span> 12 (mensual)
                </p>
                <p>
                  <span className="font-semibold">t:</span> {years} años
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Comparison */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50">
          <CardTitle>Comparación: Modelo Discreto vs Continuo</CardTitle>
          <CardDescription>Diferencia entre el modelo real bancario y el modelo teórico</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Discrete Model */}
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300">
              <h3 className="font-bold text-lg mb-3 text-green-900">Modelo Discreto (Real)</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600">Fórmula</p>
                  <p className="font-mono text-sm">P(t) = P₀(1 + r/n)^(nt)</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600">Resultado</p>
                  <p className="text-xl font-bold text-green-700">{formatCurrency(discreteResult.finalAmount)}</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600">Capitalización</p>
                  <p className="font-semibold">Mensual (n=12)</p>
                </div>
              </div>
            </div>

            {/* Continuous Model */}
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
              <h3 className="font-bold text-lg mb-3 text-blue-900">Modelo Continuo (Teórico)</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600">Fórmula</p>
                  <p className="font-mono text-sm">P(t) = P₀e^(rt)</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600">Resultado</p>
                  <p className="text-xl font-bold text-blue-700">{formatCurrency(continuousResult.finalAmount)}</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600">Capitalización</p>
                  <p className="font-semibold">Continua (n→∞)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Difference Analysis */}
          <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300">
            <h3 className="font-bold text-lg mb-3 text-yellow-900">Análisis de Diferencia</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded border">
                <p className="text-sm text-gray-600 mb-1">Diferencia Absoluta</p>
                <p className="text-xl font-bold text-yellow-700">{formatCurrency(Math.abs(difference))}</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="text-sm text-gray-600 mb-1">Diferencia Relativa</p>
                <p className="text-xl font-bold text-yellow-700">{Math.abs(percentDifference).toFixed(2)}%</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="text-sm text-gray-600 mb-1">Modelo Mayor</p>
                <p className="text-xl font-bold text-yellow-700">{difference > 0 ? "Continuo" : "Discreto"}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-4">
              El modelo continuo proporciona una aproximación muy cercana al comportamiento real, con una diferencia de
              solo {Math.abs(percentDifference).toFixed(2)}%. Los bancos utilizan el modelo discreto para sus cálculos
              reales.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ranking and Recommendations */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50">
          <CardTitle>Posición Competitiva y Recomendaciones</CardTitle>
          <CardDescription>Cómo se compara {bank.name} con otras opciones del mercado</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Ranking */}
          <div
            className={`p-6 rounded-lg border-2 ${
              bankRank === 1
                ? "bg-green-50 border-green-300"
                : bankRank === allResults.length
                  ? "bg-red-50 border-red-300"
                  : "bg-blue-50 border-blue-300"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Ranking de Mercado</h3>
              <span
                className={`text-4xl font-bold ${
                  bankRank === 1 ? "text-green-600" : bankRank === allResults.length ? "text-red-600" : "text-blue-600"
                }`}
              >
                #{bankRank}
              </span>
            </div>
            <p className="text-gray-700">
              {bank.name} ocupa la posición <span className="font-bold">#{bankRank}</span> de {allResults.length} bancos
              analizados.
            </p>
          </div>

          {/* Savings Potential */}
          {bankRank > 1 && (
            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-300">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-orange-900 mb-2">Oportunidad de Ahorro</h3>
                  <p className="text-gray-700 mb-3">
                    Podrías ahorrar{" "}
                    <span className="font-bold text-orange-600">{formatCurrency(potentialSavings)}</span> eligiendo{" "}
                    {bestBank.name}
                    (la mejor opción del mercado).
                  </p>
                  <div className="bg-white p-4 rounded border-2 border-orange-200">
                    <p className="text-sm text-gray-600 mb-2">Comparación:</p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-semibold">{bank.name}:</span> {formatCurrency(discreteResult.finalAmount)}
                      </p>
                      <p>
                        <span className="font-semibold">{bestBank.name}:</span> {formatCurrency(bestBank.finalAmount)}
                      </p>
                      <p className="text-orange-600 font-bold">Diferencia: {formatCurrency(potentialSavings)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Best Option Message */}
          {bankRank === 1 && (
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300">
              <div className="flex items-start gap-3">
                <TrendingDown className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-green-900 mb-2">¡Excelente Elección!</h3>
                  <p className="text-gray-700">
                    {bank.name} ofrece la tasa más competitiva del mercado. Esta es la mejor opción disponible para
                    minimizar el costo total de tu préstamo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* All Banks Comparison */}
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-lg mb-4">Comparación con Todas las Opciones</h3>
            <div className="space-y-2">
              {allResults.map((result, index) => (
                <div
                  key={result.id}
                  className={`flex items-center justify-between p-3 rounded border-2 ${
                    result.id === bank.id ? "bg-[#DC2626] text-white border-[#DC2626]" : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-lg ${result.id === bank.id ? "text-white" : "text-gray-400"}`}>
                      #{index + 1}
                    </span>
                    <span className="font-semibold">{result.name}</span>
                    <span className={`text-sm ${result.id === bank.id ? "text-red-100" : "text-gray-500"}`}>
                      ({result.rate}%)
                    </span>
                  </div>
                  <span className="font-bold">{formatCurrency(result.finalAmount)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
