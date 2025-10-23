import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MinusCircle } from "lucide-react"

interface RatePeriodInputProps {
  rate: number
  years: number
  index: number
  canRemove: boolean
  onRateChange: (index: number, value: number) => void
  onYearsChange: (index: number, value: number) => void
  onRemove: (index: number) => void
}

export function RatePeriodInput({
  rate,
  years,
  index,
  canRemove,
  onRateChange,
  onYearsChange,
  onRemove,
}: RatePeriodInputProps) {
  const [rateDisplay, setRateDisplay] = useState(String(rate))
  const [yearsDisplay, setYearsDisplay] = useState(String(years))

  // Sincronizar con los valores externos cuando cambien
  useEffect(() => {
    setRateDisplay(String(rate))
  }, [rate])

  useEffect(() => {
    setYearsDisplay(String(years))
  }, [years])

  const handleRateChange = (value: string) => {
    // Permitir números, punto decimal y strings vacíos
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setRateDisplay(value)
    }
  }

  const handleRateBlur = () => {
    const parsed = parseFloat(rateDisplay)
    if (!isNaN(parsed) && rateDisplay !== "") {
      onRateChange(index, parsed)
      setRateDisplay(String(parsed))
    } else {
      setRateDisplay(String(rate))
    }
  }

  const handleYearsChange = (value: string) => {
    // Permitir números, punto decimal y strings vacíos
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setYearsDisplay(value)
    }
  }

  const handleYearsBlur = () => {
    const parsed = parseFloat(yearsDisplay)
    if (!isNaN(parsed) && yearsDisplay !== "") {
      onYearsChange(index, parsed)
      setYearsDisplay(String(parsed))
    } else {
      setYearsDisplay(String(years))
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-3 space-y-2 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">Período {index + 1}</span>
        {canRemove && (
          <Button
            onClick={() => onRemove(index)}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-7 px-2"
          >
            <MinusCircle className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-gray-600">Tasa (%)</Label>
          <Input
            type="text"
            inputMode="decimal"
            value={rateDisplay}
            onChange={(e) => handleRateChange(e.target.value)}
            onBlur={handleRateBlur}
            className="text-sm h-9"
            placeholder="Ej: 18.5"
          />
        </div>
        <div>
          <Label className="text-xs text-gray-600">Años</Label>
          <Input
            type="text"
            inputMode="decimal"
            value={yearsDisplay}
            onChange={(e) => handleYearsChange(e.target.value)}
            onBlur={handleYearsBlur}
            className="text-sm h-9"
            placeholder="Ej: 1.5"
          />
        </div>
      </div>
    </div>
  )
}
