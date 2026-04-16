import type { Metadata } from "next"
import { Check } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"
import { Price } from "@/contexts/CurrencyContext"

export const metadata: Metadata = {
  title: "Tarifas y Precios",
  description:
    "Consulta las tarifas de nuestras expediciones marinas en Baja California Sur. Paquetes con todo incluido.",
}

export default async function Tarifas({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("rates", locale) as Record<string, any>

  const pkgKeys = ["safariBahiaMagdalena", "safariLaVentana", "surfCamp"]
  const prices = [2900, 3150, 3400]
  const featured = [false, true, false]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pkgKeys.map((key, i) => {
            const pkg = t.packages?.[key] || {}
            return (
              <div
                key={key}
                className={`bg-white rounded-2xl p-8 shadow-lg ${featured[i] ? "ring-2 ring-teal-600 relative" : ""}`}
              >
                {featured[i] && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {t.mostPopular}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-6">{pkg.duration}</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-teal-600"><Price amount={prices[i]} /></span>
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.includes?.map((item: string) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                  {t.bookNow}
                </button>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
