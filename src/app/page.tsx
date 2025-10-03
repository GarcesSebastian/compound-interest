"use client"

import { useState } from "react"
import { Calculator } from "@/components/calculator"
import { MathExplanation } from "@/components/math-explanation"
import { BankComparison } from "@/components/bank-comparison"
import { RateUpdater } from "@/components/rate-updater"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function Home() {
  const [capital, setCapital] = useState(15000000)
  const [years, setYears] = useState(4)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<"calculator" | "math" | "comparison">("calculator")
  const [showRateUpdater, setShowRateUpdater] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleUpdateRates = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#DC2626] text-white shadow-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-3xl text-[#DC2626] font-bold">∫</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-balance">Sistema Interactivo de Interés Compuesto</h1>
              <p className="text-red-100 text-lg mt-1">Ecuaciones Diferenciales Aplicadas a Finanzas Bancarias</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveSection("calculator")}
              className={`px-8 py-4 font-semibold text-lg transition-all relative ${
                activeSection === "calculator" ? "text-[#DC2626]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Calculadora Interactiva
              {activeSection === "calculator" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DC2626]" />}
            </button>
            <button
              onClick={() => setActiveSection("math")}
              className={`px-8 py-4 font-semibold text-lg transition-all relative ${
                activeSection === "math" ? "text-[#DC2626]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Fundamentos Matemáticos
              {activeSection === "math" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DC2626]" />}
            </button>
            <button
              onClick={() => setActiveSection("comparison")}
              className={`px-8 py-4 font-semibold text-lg transition-all relative ${
                activeSection === "comparison" ? "text-[#DC2626]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Comparación de Bancos
              {activeSection === "comparison" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DC2626]" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {activeSection === "calculator" && (
          <Calculator
            capital={capital}
            years={years}
            onCapitalChange={setCapital}
            onYearsChange={setYears}
            selectedBank={selectedBank}
            onBankChange={setSelectedBank}
            refreshKey={refreshKey}
          />
        )}

        {activeSection === "math" && <MathExplanation />}

        {activeSection === "comparison" && <BankComparison capital={capital} years={years} refreshKey={refreshKey} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p className="font-bold text-lg">Universidad Del Sinú - Elías Bechara Zainum</p>
          <p className="text-sm mt-2">Proyecto de Ecuaciones Diferenciales - 2025</p>
          <p className="text-xs mt-1 text-gray-500">Sebastian Garces, Isail Florez, Luis Brieva, Marcos Jacome</p>
        </div>
      </footer>

      <Button
        onClick={() => setShowRateUpdater(true)}
        className="fixed bottom-8 right-8 h-14 px-6 text-lg bg-[#DC2626] hover:bg-[#B91C1C] shadow-2xl hover:shadow-3xl hover:scale-105 transition-all z-50 ring-4 ring-red-100"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Actualizar Tasas
      </Button>

      {showRateUpdater && <RateUpdater onClose={() => setShowRateUpdater(false)} onUpdate={handleUpdateRates} />}
    </div>
  )
}
