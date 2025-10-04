"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Save } from "lucide-react"
import { getBanks, type Bank } from "@/lib/banks"

interface RateUpdaterProps {
  onClose: () => void
  onUpdate: () => void
}

type BankInput = Omit<Bank, "rate"> & { rate: string }

const DEFAULT_BANKS = [
  { id: "bbva", name: "BBVA Colombia", rate: 18.0 },
  { id: "bancolombia", name: "Bancolombia", rate: 17.2 },
  { id: "davivienda", name: "Davivienda", rate: 16.5 },
  { id: "bogota", name: "Banco de Bogotá", rate: 17.0 },
]

export function RateUpdater({ onClose, onUpdate }: RateUpdaterProps) {
  const [rates, setRates] = useState<BankInput[]>(
    DEFAULT_BANKS.map((bank) => ({ ...bank, rate: bank.rate.toString().replace(".", ",") }))
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const banks = getBanks()
    setRates(banks.map((bank) => ({ ...bank, rate: bank.rate.toString().replace(".", ",") })))
    setIsLoading(false)
  }, [])

  const handleRateChange = (id: string, value: string) => {
    // Solo permitir números y comas
    const sanitized = value.replace(/[^\d,]/g, "")

    // Asegurar solo una coma
    const parts = sanitized.split(",")
    const formatted = parts.length > 2 ? `${parts[0]},${parts.slice(1).join("")}` : sanitized

    setRates((prev) => prev.map((bank) => (bank.id === id ? { ...bank, rate: formatted } : bank)))
  }

  const handleSave = () => {
    const banksToSave = rates.map((bank) => ({
      ...bank,
      rate: bank.rate === "" ? 0 : Number.parseFloat(bank.rate.replace(",", ".")) || 0,
    }))

    localStorage.setItem("bankRates", JSON.stringify(banksToSave))
    onUpdate()
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-50" onClick={onClose} />

      <div className="fixed bottom-16 sm:bottom-24 left-4 right-4 sm:left-auto sm:right-6 bg-white rounded-xl shadow-2xl z-50 sm:w-[380px] max-h-[70vh] sm:max-h-[600px] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white p-3 sm:p-4 rounded-t-xl flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-bold truncate">Actualizar Tasas</h3>
            <p className="text-red-100 text-xs">Modifica en tiempo real</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-3">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-9 bg-gray-200 rounded flex-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {rates.map((bank) => (
                <div key={bank.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <Label className="text-xs sm:text-sm font-bold text-gray-900 mb-2 block truncate">{bank.name}</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={bank.rate}
                      onChange={(e) => handleRateChange(bank.id, e.target.value)}
                      placeholder="0"
                      className="text-base sm:text-lg font-bold h-9 sm:h-10 text-[#DC2626]"
                    />
                    <span className="text-xs sm:text-sm font-bold text-gray-600 whitespace-nowrap">% E.A.</span>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="bg-blue-50 rounded-lg p-2 sm:p-3 border border-blue-200">
            <p className="text-xs text-blue-900 leading-relaxed">
              • Usa coma (,) como separador decimal, no punto (.)
              <br />• Solo se permiten números y comas
              <br />• Los cambios se guardan en tu navegador
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1 h-9 sm:h-10 text-xs sm:text-sm bg-[#DC2626] hover:bg-[#B91C1C]">
              <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Guardar
            </Button>
            <Button onClick={onClose} variant="outline" className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm bg-transparent">
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
