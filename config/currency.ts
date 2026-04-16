export type Currency = "MXN" | "USD"

export const currencyConfig = {
  base: "MXN" as const,
  available: ["MXN", "USD"] as const,
  exchangeRates: {
    MXN: 1,
    USD: 0.057,
  },
  symbols: {
    MXN: "$",
    USD: "$",
  },
} as const
