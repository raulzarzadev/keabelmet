"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Currency, currencyConfig } from "@/config/currency"
import { formatPrice } from "@/lib/currency"

type CurrencyContextType = {
  currency: Currency
  setCurrency: (c: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: currencyConfig.base,
  setCurrency: () => {},
})

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencyConfig.base)

  useEffect(() => {
    const saved = localStorage.getItem("currency") as Currency | null
    if (saved && currencyConfig.available.includes(saved)) {
      setCurrencyState(saved)
    }
  }, [])

  function setCurrency(c: Currency) {
    setCurrencyState(c)
    localStorage.setItem("currency", c)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}

export function Price({ amount }: { amount: number }) {
  const { currency } = useCurrency()
  return <>{formatPrice(amount, currency)}</>
}
