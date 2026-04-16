import { currencyConfig, type Currency } from "@/config/currency"

export function formatPrice(amountMXN: number, currency: Currency): string {
  const rate = currencyConfig.exchangeRates[currency]
  const converted = Math.round(amountMXN * rate)
  const symbol = currencyConfig.symbols[currency]
  const formatted = converted.toLocaleString("en-US")
  return `${symbol}${formatted} ${currency}`
}
