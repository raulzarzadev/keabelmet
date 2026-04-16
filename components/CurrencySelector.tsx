"use client"

import { useCurrency } from "@/contexts/CurrencyContext"
import { currencyConfig } from "@/config/currency"

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className="flex items-center rounded-lg border border-gray-200 text-sm overflow-hidden">
      {currencyConfig.available.map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`px-2.5 py-1 font-medium transition-colors ${
            currency === c
              ? "bg-teal-700 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
