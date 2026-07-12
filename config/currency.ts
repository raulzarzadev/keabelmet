export type Currency = "MXN" | "USD" | "EUR" | "CAD"

export const currencyConfig = {
  base: "MXN" as const,
  available: ["MXN", "USD", "EUR", "CAD"] as const,
  exchangeRates: {
    MXN: 1,
    USD: 0.057,
    EUR: 0.049,
    CAD: 0.078,
  },
  symbols: {
    MXN: "$",
    USD: "$",
    EUR: "€",
    CAD: "$",
  },
  names: {
    MXN: "Peso mexicano",
    USD: "Dólar EE.UU.",
    EUR: "Euro",
    CAD: "Dólar canadiense",
  },
} as const
