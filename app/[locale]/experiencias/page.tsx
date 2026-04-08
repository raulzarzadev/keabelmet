import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, Users, Star } from "lucide-react"
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Experiencias y Tours",
  description:
    "Descubre nuestras experiencias marinas en Baja California Sur: safaris, surf camp, buceo y mas. Aventuras unicas en el Mar de Cortes con guias expertos.",
}

export default async function Experiencias({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const l = (path: string) => locale === "es" ? path : `/${locale}${path}`
  const expeditions = [
    {
      title: "Safari Bahía Magdalena",
      description: "Corrida de sardinas, marlines, lobos marinos. Nov–Dic.",
      image: "/striped-marlin-underwater.jpg",
      duration: "Día completo",
      capacity: "4-8 personas",
      rating: 4.9,
      reviews: 156,
      price: 165,
      features: ["Lobos Marinos", "Marlines", "Snorkel", "Almuerzo"],
      href: l("/expediciones/safari-bahia-magdalena"),
    },
    {
      title: "Safari La Ventana",
      description: "Migración de móbulas. Abril–Junio (según temporada).",
      image: "/killer-whale-breaching.jpg",
      duration: "Medio día",
      capacity: "6-10 personas",
      rating: 5.0,
      reviews: 243,
      price: 180,
      features: ["Móbulas", "Ballenas", "Guía Experto", "Fotos"],
      href: l("/expediciones/safari-la-ventana"),
    },
    {
      title: "Surf Camp La Paz (6 días)",
      description: "Clases, feedback diario, foto/video, transporte y snacks.",
      image: "/surfer-riding-wave.jpg",
      duration: "6 días",
      capacity: "4-10 personas",
      rating: 4.9,
      reviews: 89,
      price: 195,
      features: ["Clases Diarias", "Video Análisis", "Transporte", "Snacks"],
      href: l("/surf-camp"),
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Experiencias</h1>
          <p className="text-xl max-w-2xl mx-auto">Descubre nuestras aventuras marinas únicas</p>
        </div>
      </section>

      {/* Expeditions Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expeditions.map((expedition) => (
            <div
              key={expedition.title}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={expedition.image || "/placeholder.svg"}
                  alt={expedition.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 fill-teal-600 text-teal-600" />
                  <span className="font-semibold text-sm">{expedition.rating}</span>
                  <span className="text-gray-600 text-sm">({expedition.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{expedition.title}</h3>

                {/* Duration & Capacity */}
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{expedition.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{expedition.capacity}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{expedition.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {expedition.features.map((feature) => (
                    <span key={feature} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-gray-600 text-sm">Por persona</span>
                    <p className="text-3xl font-bold text-teal-600">${expedition.price}</p>
                  </div>
                  <Link
                    href={expedition.href}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
