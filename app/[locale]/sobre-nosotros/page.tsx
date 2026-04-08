import type { Metadata } from "next"
import { Compass, Heart, Shield, Users } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce al equipo de Keabelmet Expeditions. Mas de 15 anos de experiencia en expediciones marinas en Baja California Sur.",
}

export default async function SobreNosotros({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("about", locale) as Record<string, any>

  const icons = [
    <Heart key="h" className="text-teal-600" />,
    <Shield key="s" className="text-teal-600" />,
    <Compass key="c" className="text-teal-600" />,
    <Users key="u" className="text-teal-600" />,
  ]

  return (
    <div className="min-h-screen">
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">{t.historyTitle}</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{t.historyP1}</p>
          <p className="text-gray-700 mb-8 leading-relaxed">{t.historyP2}</p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {t.values?.map((v: any, i: number) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    {icons[i]}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-sm">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
