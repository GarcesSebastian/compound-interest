export interface Bank {
  id: string
  name: string
  rate: number // Annual rate as percentage
}

const DEFAULT_BANKS: Bank[] = [
  {
    id: "bbva",
    name: "BBVA Colombia",
    rate: 18.0,
  },
  {
    id: "bancolombia",
    name: "Bancolombia",
    rate: 17.2,
  },
  {
    id: "davivienda",
    name: "Davivienda",
    rate: 16.5,
  },
  {
    id: "bogota",
    name: "Banco de Bogotá",
    rate: 17.0,
  },
]

export function getBanks(): Bank[] {
  if (typeof window === "undefined") {
    return DEFAULT_BANKS
  }

  const stored = localStorage.getItem("bankRates")
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      // Validate and ensure all rates are valid numbers
      return parsed.map((bank: Bank) => ({
        ...bank,
        rate: isNaN(bank.rate) || bank.rate === null || bank.rate === undefined ? 0 : bank.rate,
      }))
    } catch (e) {
      console.error("Error parsing stored rates:", e)
      return DEFAULT_BANKS
    }
  }

  return DEFAULT_BANKS
}

export const banks = getBanks()
