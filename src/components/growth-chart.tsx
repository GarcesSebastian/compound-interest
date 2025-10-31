"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateCompoundInterest } from "@/lib/calculations"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface GrowthChartProps {
  capital: number
  rate: number
  years: number
  bankName: string
  compoundingFrequency: number
}

export function GrowthChart({ capital, rate, years, bankName, compoundingFrequency }: GrowthChartProps) {
  // Generate data points for each month
  const months = years * 12
  const dataPoints = []

  for (let month = 0; month <= months; month++) {
    const yearFraction = month / 12
    const result = calculateCompoundInterest(capital, rate, yearFraction, compoundingFrequency)

    dataPoints.push({
      month,
      year: yearFraction.toFixed(1),
      capital: result.finalAmount,
      interest: result.totalInterest,
      principal: capital,
    })
  }

  // Calculate growth percentage
  const finalAmount = dataPoints[dataPoints.length - 1].capital
  const growthPercentage = (((finalAmount - capital) / capital) * 100).toFixed(1)

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-[#DC2626]">
          <p className="font-bold text-gray-900 mb-2">Año {data.year}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-700">
              <span className="font-semibold">Capital Total:</span>{" "}
              <span className="text-[#DC2626] font-bold">{formatCurrency(data.capital)}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Intereses:</span>{" "}
              <span className="text-orange-600 font-bold">{formatCurrency(data.interest)}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Principal:</span>{" "}
              <span className="text-gray-600 font-bold">{formatCurrency(data.principal)}</span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="shadow-lg border border-gray-200">
      <CardHeader className="bg-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#DC2626]" />
              <span className="truncate">Crecimiento del Capital en el Tiempo</span>
            </CardTitle>
            <CardDescription className="mt-1 sm:mt-2 text-xs sm:text-sm">
              Visualización interactiva del crecimiento exponencial - {bankName}
            </CardDescription>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <div className="text-xs sm:text-sm text-gray-600">Crecimiento Total</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#DC2626]">+{growthPercentage}%</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dataPoints} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="year"
              label={{ value: "Años", position: "insideBottom", offset: -10, fontSize: 11 }}
              stroke="#6b7280"
              tick={{ fill: "#374151", fontSize: 11 }}
            />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              label={{ value: "Capital (COP)", angle: -90, position: "insideLeft", fontSize: 11 }}
              stroke="#6b7280"
              tick={{ fill: "#374151", fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px", fontSize: 12 }} iconType="circle" />
            <Area
              type="monotone"
              dataKey="capital"
              stroke="#DC2626"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCapital)"
              name="Capital Total"
            />
            <Area
              type="monotone"
              dataKey="interest"
              stroke="#F97316"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInterest)"
              name="Intereses Acumulados"
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Key Insights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
          <div className="bg-gradient-to-br from-[#DC2626] to-[#EF4444] rounded-lg sm:rounded-xl p-3 sm:p-4 text-white">
            <p className="text-xs sm:text-sm text-red-100 mb-1">Capital Inicial</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold break-words">{formatCurrency(capital)}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg sm:rounded-xl p-3 sm:p-4 text-white">
            <p className="text-xs sm:text-sm text-orange-100 mb-1">Intereses Totales</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold break-words">{formatCurrency(finalAmount - capital)}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 text-white">
            <p className="text-xs sm:text-sm text-gray-300 mb-1">Monto Final</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold break-words">{formatCurrency(finalAmount)}</p>
          </div>
        </div>

        {/* Growth Explanation */}
        <div className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 border-l-4 border-[#DC2626] shadow-sm">
          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-[#DC2626]" />
            Análisis del Crecimiento Exponencial
          </h4>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            El gráfico muestra cómo tu capital crece de forma{" "}
            <span className="font-bold text-[#DC2626]">exponencial</span> debido al interés compuesto. Cada mes, los
            intereses se calculan sobre el capital acumulado (principal + intereses anteriores), lo que genera un efecto
            de "bola de nieve" que acelera el crecimiento con el tiempo. En {years} {years === 1 ? "año" : "años"}, tu
            inversión inicial de {formatCurrency(capital)} se convierte en {formatCurrency(finalAmount)}, un incremento
            del {growthPercentage}%.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
