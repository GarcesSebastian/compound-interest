"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getBanks } from "@/lib/banks"
import { calculateCompoundInterest } from "@/lib/calculations"
import { formatCurrency } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

interface BankComparisonProps {
  capital: number
  years: number
  refreshKey: number
}

const DEFAULT_BANKS = [
  { id: "bbva", name: "BBVA Colombia", rate: 18.0 },
  { id: "bancolombia", name: "Bancolombia", rate: 17.2 },
  { id: "davivienda", name: "Davivienda", rate: 16.5 },
  { id: "bogota", name: "Banco de Bogotá", rate: 17.0 },
]

export function BankComparison({ capital, years, refreshKey }: BankComparisonProps) {
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

  // Calculate results for all banks
  const results = banks.map((bank) => {
    const result = calculateCompoundInterest(capital, bank.rate, years, 12)
    return {
      ...bank,
      ...result,
    }
  })

  // Sort by final amount (best to worst)
  const sortedResults = [...results].sort((a, b) => a.finalAmount - b.finalAmount)
  const bestOption = sortedResults[0]
  const worstOption = sortedResults[sortedResults.length - 1]
  const savings = worstOption.finalAmount - bestOption.finalAmount

  // Prepare data for charts
  const comparisonData = results.map((r) => ({
    name: r.name,
    "Monto Final": r.finalAmount,
    Intereses: r.totalInterest,
  }))

  // Evolution over time data
  const timePoints = Array.from({ length: years + 1 }, (_, i) => i)
  const evolutionData = timePoints.map((t) => {
    const point: any = { year: t }
    results.forEach((bank) => {
      const result = calculateCompoundInterest(capital, bank.rate, t, 12)
      point[bank.name] = result.finalAmount
    })
    return point
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="shadow-lg animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <Card className="shadow-lg border-l-4 border-green-500 bg-white">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-gray-900 text-base sm:text-lg">Mejor Opción</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Menor costo total</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 truncate">{bestOption.name}</p>
              <p className="text-xs sm:text-sm text-gray-600">Tasa: {bestOption.rate}% E.A.</p>
              <p className="text-base sm:text-lg font-semibold text-green-600 mt-2 sm:mt-3 break-words">{formatCurrency(bestOption.finalAmount)}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-l-4 border-gray-400 bg-white">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-gray-900 text-base sm:text-lg">Opción Más Costosa</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Mayor costo total</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 truncate">{worstOption.name}</p>
              <p className="text-xs sm:text-sm text-gray-600">Tasa: {worstOption.rate}% E.A.</p>
              <p className="text-base sm:text-lg font-semibold text-gray-700 mt-2 sm:mt-3 break-words">{formatCurrency(worstOption.finalAmount)}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-l-4 border-[#DC2626] bg-white sm:col-span-2 md:col-span-1">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-gray-900 text-base sm:text-lg">Ahorro Potencial</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Eligiendo la mejor opción</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-2xl sm:text-3xl font-bold text-[#DC2626] mb-1 sm:mb-2 break-words">{formatCurrency(savings)}</p>
              <p className="text-xs sm:text-sm text-gray-600">Diferencia entre mejor y peor opción</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Comparison Table */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50 p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg md:text-xl">Comparación Detallada</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Análisis completo de todas las entidades bancarias</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b">
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-5 bg-gray-200 rounded w-32"></div>
                  <div className="h-5 bg-gray-200 rounded w-32"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Banco</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Tasa E.A.</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Monto Final</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Intereses</th>
                    <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Ranking</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedResults.map((result, index) => (
                    <tr
                      key={result.id}
                      className={`border-b ${
                        index === 0
                          ? "bg-green-50"
                          : index === sortedResults.length - 1
                            ? "bg-red-50"
                            : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm">{result.name}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-xs sm:text-sm">{result.rate}%</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-right font-semibold text-xs sm:text-sm">{formatCurrency(result.finalAmount)}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-[#DC2626] font-semibold text-xs sm:text-sm">
                        {formatCurrency(result.totalInterest)}
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm ${
                            index === 0
                              ? "bg-green-500 text-white"
                              : index === sortedResults.length - 1
                                ? "bg-red-500 text-white"
                                : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bar Chart Comparison */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50 p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg md:text-xl">Comparación Visual: Montos Finales</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Monto total a pagar por cada banco</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
          {isLoading ? (
            <div className="h-[300px] sm:h-[400px] w-full bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-gray-400 text-sm sm:text-base md:text-lg font-semibold">Cargando gráfica...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: "white", border: "2px solid #DC2626" }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Monto Final" fill="#DC2626" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Interest Comparison */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50 p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg md:text-xl">Comparación de Intereses Totales</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Cuánto pagas solo en intereses</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
          {isLoading ? (
            <div className="h-[300px] sm:h-[400px] w-full bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-gray-400 text-sm sm:text-base md:text-lg font-semibold">Cargando gráfica...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: "white", border: "2px solid #EF4444" }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Intereses" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Evolution Over Time */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50 p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg md:text-xl">Evolución del Capital en el Tiempo</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Crecimiento exponencial del préstamo</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
          {isLoading ? (
            <div className="h-[300px] sm:h-[400px] md:h-[500px] w-full bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-gray-400 text-sm sm:text-base md:text-lg font-semibold">Cargando gráfica...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={evolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: "Años", position: "insideBottom", offset: -5, fontSize: 12 }} tick={{ fontSize: 11 }} />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  label={{ value: "Capital (COP)", angle: -90, position: "insideLeft", fontSize: 12 }}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: "white", border: "2px solid #DC2626", fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {results.map((bank, index) => (
                  <Line
                    key={bank.id}
                    type="monotone"
                    dataKey={bank.name}
                    stroke={["#DC2626", "#3B82F6", "#10B981", "#F59E0B"][index]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
