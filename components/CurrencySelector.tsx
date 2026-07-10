"use client"

import { useState, useRef, useEffect } from "react"
import { useCurrency } from "@/contexts/CurrencyContext"
import { currencyConfig } from "@/config/currency"

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={`switcher${open ? " open" : ""}`}>
      <button className="switcher-btn" onClick={() => setOpen(!open)} aria-label="Elegir moneda">
        <span>{currency}</span>
        <svg viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
      <div className="switcher-menu">
        {currencyConfig.available.map((c) => (
          <button
            key={c}
            className={c === currency ? "active" : undefined}
            onClick={() => {
              setCurrency(c)
              setOpen(false)
            }}
          >
            {c} <span style={{ color: "var(--sand-dim)", marginLeft: "auto" }}>{currencyConfig.names[c]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
