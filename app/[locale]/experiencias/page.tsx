import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, Star } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Experiencias y Tours",
  description:
    "Descubre nuestras experiencias marinas en Baja California Sur: safaris, surf camp, buceo y mas.",
}

export default async function Experiencias({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const l = (path: string) => locale === "es" ? path : `/${locale}${path}`
  const t = await getPageDictionary("experiences", locale) as Record<string, any>

  const expKeys = ["safariBahiaMagdalena", "safariLaVentana", "surfCamp"]
  const expImages = ["/striped-marlin-underwater.jpg", "/killer-whale-breaching.jpg", "/surfer-riding-wave.jpg"]
  const expHrefs = ["/expediciones/safari-bahia-magdalena", "/expediciones/safari-la-ventana", "/surf-camp"]
  const expPrices = [165, 180, 195]
  const expRatings = [4.9, 5.0, 4.9]
  const expReviews = [156, 243, 89]

  return (
    <div className="min-h-screen">
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expKeys.map((key, i) => {
            const exp = t.expeditions?.[key] || {}
            return (
              <div key={key} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden group">
                  <Image
                    src={expImages[i]}
                    alt={exp.title || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4 fill-teal-600 text-teal-600" />
                    <span className="font-semibold text-sm">{expRatings[i]}</span>
                    <span className="text-gray-600 text-sm">({expReviews[i]})</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{exp.capacity}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.features?.map((f: string) => (
                      <span key={f} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-gray-600 text-sm">{t.perPerson}</span>
                      <p className="text-3xl font-bold text-teal-600">${expPrices[i]}</p>
                    </div>
                    <Link
                      href={l(expHrefs[i])}
                      className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                    >
                      {t.book}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
