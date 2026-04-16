import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Check, Star, Anchor } from "lucide-react"
import { getPageDictionary, isValidLocale, defaultLocale } from "@/lib/i18n"
import { Price } from "@/contexts/CurrencyContext"

export const metadata: Metadata = {
  title: "Tour Ballena Gris en Bahia Magdalena",
  description:
    "Vive la experiencia de avistar ballenas grises en Bahia Magdalena, BCS. Tour guiado con encuentros cercanos en su santuario natural de reproduccion.",
}

export default async function TourBallenaGrisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("tour-ballena-gris", locale) as Record<string, any>
  const l = (path: string) => locale === "es" ? path : `/${locale}${path}`
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/gray-whale-breaching-sunset-sea-of-cortez.jpg"
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t.about.title}
              </h2>
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
                  src="/gray-whale-mother-calf-magdalena.jpg"
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.about.meeting_title}</h3>
                      <p className="text-gray-700">{t.about.meeting_text}</p>
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
                    <Anchor className="h-6 w-6 text-teal-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.about.season_title}</h3>
                      <p className="text-gray-700">
                        {t.about.season_text}
                      </p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              {t.itinerary.title}
            </h2>
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
                    <p className="text-gray-700 mb-3">
                      {t.itinerary.step3_text}
                    </p>
                    <p className="text-gray-700 font-medium">
                      {t.itinerary.step3_extra}
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

        {/* Wildlife Section */}
        <section id="especies" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              {t.species.title}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {t.species.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/gray-whale-mother-and-calf-swimming-together-in-ba.jpg"
                    alt={t.species.gray_whale.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {t.species.gray_whale.season}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.species.gray_whale.name}</h3>
                  <p className="text-gray-700">
                    {t.species.gray_whale.description}
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/sea-lions-resting-on-rocks-in-baja-california-sur.jpg"
                    alt={t.species.sea_lions.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {t.species.sea_lions.season}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.species.sea_lions.name}</h3>
                  <p className="text-gray-700">
                    {t.species.sea_lions.description}
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/dolphins-jumping-in-the-sea-of-cortez.jpg"
                    alt={t.species.dolphins.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {t.species.dolphins.season}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.species.dolphins.name}</h3>
                  <p className="text-gray-700">
                    {t.species.dolphins.description}
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/osprey-fishing-eagle-diving-for-fish-in-baja.jpg"
                    alt={t.species.ospreys.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {t.species.ospreys.season}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.species.ospreys.name}</h3>
                  <p className="text-gray-700">
                    {t.species.ospreys.description}
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/brown-pelicans-flying-over-ocean-in-baja-californi.jpg"
                    alt={t.species.pelicans.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {t.species.pelicans.season}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.species.pelicans.name}</h3>
                  <p className="text-gray-700">
                    {t.species.pelicans.description}
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/magnificent-frigatebird-soaring-over-ocean-in-baja.jpg"
                    alt={t.species.frigatebirds.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {t.species.frigatebirds.season}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.species.frigatebirds.name}</h3>
                  <p className="text-gray-700">
                    {t.species.frigatebirds.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-teal-50 p-6 rounded-lg border border-teal-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">{t.species.disclaimer_title}</h3>
              <p className="text-gray-700 text-center">
                {t.species.disclaimer_text}
              </p>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 md:py-24 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              {t.includes.title}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {t.includes.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.transport_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.transport_text}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.captain_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.captain_text}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.guide_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.guide_text}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.photos_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.photos_text}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.snacks_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.snacks_text}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.includes.binoculars_title}</h3>
                  <p className="text-sm text-gray-600">{t.includes.binoculars_text}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">{t.pricing.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {t.pricing.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Shared 2 hours */}
              <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-teal-300 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.pricing.shared_2h.name}</h3>
                  <p className="text-gray-600 mb-4">{t.pricing.shared_2h.duration}</p>
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    <Price amount={2400} />
                  </div>
                  <p className="text-sm text-gray-600">{t.pricing.shared_2h.per}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {t.pricing.shared_2h.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  {t.pricing.shared_2h.cta}
                </button>
              </div>

              {/* Shared 3 hours */}
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-8 rounded-xl border-2 border-teal-600 relative transform scale-105 shadow-xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full">
                    {t.pricing.shared_3h.badge}
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{t.pricing.shared_3h.name}</h3>
                  <p className="text-teal-50 mb-4">{t.pricing.shared_3h.duration}</p>
                  <div className="text-4xl font-bold text-white mb-2">
                    <Price amount={3000} />
                  </div>
                  <p className="text-sm text-teal-100">{t.pricing.shared_3h.per}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {t.pricing.shared_3h.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm text-white${i === t.pricing.shared_3h.features.length - 1 ? " font-medium" : ""}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-white hover:bg-gray-100 text-teal-600 px-6 py-3 rounded-lg font-medium transition-colors">
                  {t.pricing.shared_3h.cta}
                </button>
              </div>

              {/* Private Premium */}
              <div className="bg-white p-8 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-colors">
                <div className="text-center mb-6">
                  <div className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {t.pricing.private.badge}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.pricing.private.name}</h3>
                  <p className="text-gray-600 mb-4">{t.pricing.private.duration}</p>
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    <Price amount={14000} />
                  </div>
                  <p className="text-sm text-gray-600">{t.pricing.private.per}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {t.pricing.private.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm text-gray-700${i === 0 ? " font-medium" : ""}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  {t.pricing.private.cta}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">{t.recommendations.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {t.recommendations.items.map((item: { title: string; text: string }, i: number) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 max-w-3xl mx-auto bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">{t.recommendations.important_title}</h3>
              <p className="text-gray-700 text-center">
                {t.recommendations.important_text}
              </p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t.cta.title}
            </h2>
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
