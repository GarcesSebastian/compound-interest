import { useState, useCallback } from "react"

/**
 * Hook para inputs numéricos flexibles que permite:
 * - Editar sin que aparezcan ceros automáticamente
 * - Manejar decimales correctamente
 * - Validar el valor solo al finalizar la edición
 */
export function useNumericInput(initialValue: number, min?: number, max?: number) {
  const [displayValue, setDisplayValue] = useState<string>(String(initialValue))
  const [numericValue, setNumericValue] = useState<number>(initialValue)

  const handleChange = useCallback((value: string) => {
    // Permitir string vacío, números, decimales y punto decimal
    if (value === "" || value === "-" || /^-?\d*\.?\d*$/.test(value)) {
      setDisplayValue(value)
    }
  }, [])

  const handleBlur = useCallback(() => {
    const parsed = parseFloat(displayValue)
    
    // Si el valor es inválido o vacío, restaurar el último valor válido
    if (isNaN(parsed) || displayValue === "" || displayValue === "-" || displayValue === ".") {
      setDisplayValue(String(numericValue))
      return
    }

    // Aplicar límites si existen
    let finalValue = parsed
    if (min !== undefined && finalValue < min) {
      finalValue = min
    }
    if (max !== undefined && finalValue > max) {
      finalValue = max
    }

    setNumericValue(finalValue)
    setDisplayValue(String(finalValue))
  }, [displayValue, numericValue, min, max])

  const setValue = useCallback((value: number) => {
    setNumericValue(value)
    setDisplayValue(String(value))
  }, [])

  return {
    displayValue,
    numericValue,
    handleChange,
    handleBlur,
    setValue,
  }
}
