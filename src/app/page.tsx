"use client"

import { useState } from "react"
import { Calculator } from "@/components/calculator"
import { AdvancedCalculator } from "@/components/advanced-calculator"
import { MathExplanation } from "@/components/math-explanation"
import { BankComparison } from "@/components/bank-comparison"
import { RateUpdater } from "@/components/rate-updater"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { LoanModeProvider } from "@/contexts/loan-mode-context"

type Section = "calculator" | "advanced" | "math" | "comparison"

export default function Home() {
  const [capital, setCapital] = useState(15000000)
  const [years, setYears] = useState(4)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<Section>("calculator")
  const [showRateUpdater, setShowRateUpdater] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleUpdateRates = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <LoanModeProvider>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#DC2626] text-white shadow-xl">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-2xl sm:text-3xl text-[#DC2626] font-bold">∫</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-balance leading-tight">Sistema Interactivo de Interés Compuesto</h1>
              <p className="text-red-100 text-sm sm:text-base md:text-lg mt-0.5 sm:mt-1">Ecuaciones Diferenciales Aplicadas a Finanzas Bancarias</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="flex gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveSection("calculator")}
              className={`px-3 sm:px-6 md:px-8 py-3 sm:py-4 font-semibold text-xs sm:text-sm md:text-base transition-all relative whitespace-nowrap ${
                activeSection === "calculator" ? "text-[#DC2626]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Calculadora Básica
              {activeSection === "calculator" && <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-[#DC2626]" />}
            </button>
            <button
              onClick={() => setActiveSection("advanced")}
              className={`px-3 sm:px-6 md:px-8 py-3 sm:py-4 font-semibold text-xs sm:text-sm md:text-base transition-all relative whitespace-nowrap ${
                activeSection === "advanced" ? "text-[#DC2626]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Calculadora Avanzada
              {activeSection === "advanced" && <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-[#DC2626]" />}
            </button>
            <button
              onClick={() => setActiveSection("math")}
              className={`px-3 sm:px-6 md:px-8 py-3 sm:py-4 font-semibold text-xs sm:text-sm md:text-base transition-all relative whitespace-nowrap ${
                activeSection === "math" ? "text-[#DC2626]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Fundamentos Matemáticos
              {activeSection === "math" && <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-[#DC2626]" />}
            </button>
            <button
              onClick={() => setActiveSection("comparison")}
              className={`px-3 sm:px-6 md:px-8 py-3 sm:py-4 font-semibold text-xs sm:text-sm md:text-base transition-all relative whitespace-nowrap ${
                activeSection === "comparison" ? "text-[#DC2626]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Comparación de Bancos
              {activeSection === "comparison" && <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-[#DC2626]" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
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

        {activeSection === "advanced" && <AdvancedCalculator />}

        {activeSection === "math" && <MathExplanation />}

        {activeSection === "comparison" && <BankComparison capital={capital} years={years} refreshKey={refreshKey} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 sm:mt-12 md:mt-16 py-6 sm:py-8 pb-20 sm:pb-8">
        <div className="container mx-auto px-4 sm:px-6 text-center text-gray-600">
          <p className="font-bold text-base sm:text-lg">Universidad Del Sinú - Elías Bechara Zainum</p>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2">Proyecto de Ecuaciones Diferenciales - 2025</p>
          <p className="text-xs mt-1 text-gray-500">Sebastian Garces, Isail Florez, Luis Brieva, Marcos Jacome</p>
        </div>
      </footer>

      <Button
        onClick={() => setShowRateUpdater(true)}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base md:text-lg bg-[#DC2626] hover:bg-[#B91C1C] shadow-2xl hover:shadow-3xl hover:scale-105 transition-all z-50 ring-2 sm:ring-4 ring-red-100"
      >
        <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Actualizar Tasas</span>
        <span className="sm:hidden">Tasas</span>
      </Button>

      {showRateUpdater && <RateUpdater onClose={() => setShowRateUpdater(false)} onUpdate={handleUpdateRates} />}
    </div>
    </LoanModeProvider>
  )
}
