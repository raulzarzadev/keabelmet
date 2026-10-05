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
    // Algunos navegadores in-app (Instagram/Facebook) bloquean localStorage y
    // lanzan excepción al leerlo; sin este try/catch el error en el efecto
    // desmontaría todo el árbol de React y el header quedaría "congelado".
    try {
      const saved = localStorage.getItem("currency") as Currency | null
      if (saved && currencyConfig.available.includes(saved)) {
        setCurrencyState(saved)
      }
    } catch {
      // storage no disponible: usamos la moneda base.
    }
  }, [])

  function setCurrency(c: Currency) {
    setCurrencyState(c)
    try {
      localStorage.setItem("currency", c)
    } catch {
      // storage no disponible: la preferencia queda solo en memoria.
    }
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
