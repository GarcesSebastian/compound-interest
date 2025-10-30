"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface LoanModeContextType {
  isLoanMode: boolean
  setIsLoanMode: (value: boolean) => void
  toggleMode: () => void
}

const LoanModeContext = createContext<LoanModeContextType | undefined>(undefined)

export function LoanModeProvider({ children }: { children: ReactNode }) {
  const [isLoanMode, setIsLoanMode] = useState(false)

  const toggleMode = () => setIsLoanMode((prev) => !prev)

  return (
    <LoanModeContext.Provider value={{ isLoanMode, setIsLoanMode, toggleMode }}>
      {children}
    </LoanModeContext.Provider>
  )
}

export function useLoanMode() {
  const context = useContext(LoanModeContext)
  if (context === undefined) {
    throw new Error("useLoanMode must be used within a LoanModeProvider")
  }
  return context
}
