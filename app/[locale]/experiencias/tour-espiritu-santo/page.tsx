import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Check, Star, Users } from "lucide-react"
import { getPageDictionary, isValidLocale, defaultLocale } from "@/lib/i18n"
import { Price } from "@/contexts/CurrencyContext"

export const metadata: Metadata = {
  title: "Tour Isla Espiritu Santo",
  description:
    "Nada con lobos marinos en la Isla Espiritu Santo, Patrimonio UNESCO. Snorkel, playas virgenes y picnic gourmet en el Mar de Cortes desde La Paz, BCS.",
}

export default async function TourEspirituSantoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const l = (path: string) => locale === "es" ? path : `/${locale}${path}`
  const t = await getPageDictionary("tour-espiritu-santo", locale) as Record<string, any>
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/espiritu-santo-island-paradise-beach.jpg"
              alt={t.hero.image_alt}
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 to-teal-800/30" />
          </div>
          <div className="container mx-auto relative py-20 md:py-28 lg:py-36 px-4">
            <div className="max-w-2xl space-y-6">
              <div className="inline-block bg-teal-600/90 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t.hero.badge}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg">
                  {t.hero.cta_primary}
                </button>
                <button className="text-white border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-3 rounded-lg font-medium transition-colors">
                  {t.hero.cta_secondary}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t.about.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t.about.description_1}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.about.description_2}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/picnic-beach-espiritu-santo.jpg"
                  alt={t.about.image_alt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.about.departure_title}</h3>
                      <p className="text-gray-700">{t.about.departure_text}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
                  <div className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.about.duration_title}</h3>
                      <p className="text-gray-700">
                        {t.about.duration_text}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-teal-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.about.group_title}</h3>
                      <p className="text-gray-700">{t.about.group_text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">{t.itinerary.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {t.itinerary.subtitle}
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* Timeline Item 1 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      1
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.itinerary.step1_title}</h3>
                    <p className="text-gray-700">
                      {t.itinerary.step1_text}
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      2
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.itinerary.step2_title}</h3>
                    <p className="text-gray-700">
                      {t.itinerary.step2_text}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 italic">
                      {t.itinerary.step2_note}
                    </p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      3
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.itinerary.step3_title}</h3>
                    <p className="text-gray-700">
                      {t.itinerary.step3_text}
                    </p>
                  </div>
                </div>

                {/* Timeline Item 4 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      4
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.itinerary.step4_title}</h3>
                    <p className="text-gray-700">
                      {t.itinerary.step4_text}
                    </p>
                  </div>
                </div>

                {/* Timeline Item 5 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      5
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.itinerary.step5_title}</h3>
                    <p className="text-gray-700">
                      {t.itinerary.step5_text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              {t.includes.title}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {t.includes.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.boat_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.boat_text}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.guide_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.guide_text}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.snorkel_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.snorkel_text}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.picnic_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.picnic_text}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.photos_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.photos_text}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.park_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.park_text}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">{t.pricing.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {t.pricing.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Standard Tour */}
              <div className="bg-white p-8 rounded-xl border-2 border-teal-200 hover:border-teal-400 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.pricing.standard.name}</h3>
                  <p className="text-gray-600 mb-4">{t.pricing.standard.type}</p>
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    <Price amount={1800} />
                  </div>
                  <p className="text-sm text-gray-600">{t.pricing.standard.per}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {t.pricing.standard.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  {t.pricing.standard.cta}
                </button>
              </div>

              {/* Sailboat Tour */}
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-8 rounded-xl border-2 border-teal-600 relative transform scale-105 shadow-xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full">{t.pricing.sailboat.badge}</span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{t.pricing.sailboat.name}</h3>
                  <p className="text-teal-50 mb-4">{t.pricing.sailboat.type}</p>
                  <div className="text-4xl font-bold text-white mb-2">
                    {t.pricing.sailboat.price} <span className="text-lg font-normal text-teal-100">{t.pricing.sailboat.currency}</span>
                  </div>
                  <p className="text-sm text-teal-100">{t.pricing.sailboat.per}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {t.pricing.sailboat.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm text-white${i === 0 ? " font-medium" : ""}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-white hover:bg-gray-100 text-teal-600 px-6 py-3 rounded-lg font-medium transition-colors">
                  {t.pricing.sailboat.cta}
                </button>
              </div>

              {/* Yacht Tour */}
              <div className="bg-white p-8 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-colors">
                <div className="text-center mb-6">
                  <div className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {t.pricing.yacht.badge}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.pricing.yacht.name}</h3>
                  <p className="text-gray-600 mb-4">{t.pricing.yacht.type}</p>
                  <div className="text-4xl font-bold text-orange-600 mb-2">{t.pricing.yacht.price}</div>
                  <p className="text-sm text-gray-600">{t.pricing.yacht.per}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {t.pricing.yacht.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm text-gray-700${i === 0 ? " font-medium" : ""}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  {t.pricing.yacht.cta}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {t.testimonials.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {t.testimonials.items.map((item: { text: string; author: string; location: string }, i: number) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    &ldquo;{item.text}&rdquo;
                  </p>
                  <p className="font-semibold text-gray-900">&mdash; {item.author}</p>
                  <p className="text-sm text-gray-600">{item.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-teal-600 to-cyan-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.cta.title}</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
                {t.cta.cta_primary}
              </button>
              <Link href={l("/")}>
                <button className="text-white border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                  {t.cta.cta_secondary}
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; {t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
