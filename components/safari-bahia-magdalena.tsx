import Image from "next/image"
import Link from "next/link"
import {
  Clock,
  MapPin,
  Anchor,
  Camera,
  Coffee,
  Binary as Binoculars,
  Check,
  Waves,
  Fish,
  Eye,
} from "lucide-react"
import { Price } from "@/contexts/CurrencyContext"

export function SafariBahiaMagdalena({ translations }: { translations: Record<string, any> }) {
  const t = translations
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/images/marlin-bahia-magdalena-hero.jpeg"
              alt={t.hero.imageAlt}
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 to-teal-800/30" />
          </div>
          <div className="container mx-auto relative py-20 md:py-28 lg:py-36 px-4">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  {t.hero.cta}
                </button>
                <button className="text-white border border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors">
                  {t.hero.ctaSecondary}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.about.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t.about.description1}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.about.description2}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fish className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.about.features.migration.title}</h3>
                <p className="text-gray-700">
                  {t.about.features.migration.description}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.about.features.frenzy.title}</h3>
                <p className="text-gray-700">
                  {t.about.features.frenzy.description}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.about.features.unique.title}</h3>
                <p className="text-gray-700">
                  {t.about.features.unique.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 md:py-24 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{t.experience.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center mb-16">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t.experience.description1}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t.experience.description2}
                </p>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/gallery/marlin-cazando.jpeg"
                  alt={t.experience.imageAlt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Itinerario */}
            <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">{t.experience.itinerary.title}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{t.experience.itinerary.step1.time}</h4>
                    <p className="text-gray-700">
                      {t.experience.itinerary.step1.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Anchor className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{t.experience.itinerary.step2.time}</h4>
                    <p className="text-gray-700 mb-3">
                      {t.experience.itinerary.step2.description}
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      {t.experience.itinerary.step2.activities.map((activity: string, i: number) => (
                        <li key={i}>• {activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{t.experience.itinerary.step3.time}</h4>
                    <p className="text-gray-700">
                      {t.experience.itinerary.step3.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wildlife Section */}
        <section id="wildlife" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{t.wildlife.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {t.wildlife.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {([
                { key: "sardines", src: "/images/especies/sardinas-banco.jpeg", alt: "Sardines bait ball" },
                { key: "stripedMarlin", src: "/images/gallery/marlin-cazando.jpeg", alt: "Striped marlin hunting" },
                { key: "seaLions", src: "/images/especies/lobomarinonadando.jpeg", alt: "Sea lions hunting" },
                { key: "dorado", src: "/images/especies/dorado.jpeg", alt: "Dorado fish" },
                { key: "humpbackWhales", src: "/images/especies/ballena-jorobada-saltando.jpeg", alt: "Humpback whale breaching" },
                { key: "brydeWhales", src: "/images/especies/ballena-bryde-underwater.jpeg", alt: "Bryde's whale underwater" },
              ] as const).map((species) => (
                <div key={species.key} className="bg-teal-50 rounded-lg overflow-hidden">
                  <div className="h-64 relative">
                    <Image
                      src={species.src}
                      alt={species.alt}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                      {t.wildlife.season}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.wildlife.species[species.key].name}</h3>
                    <p className="text-gray-700">
                      {t.wildlife.species[species.key].description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-teal-50 p-6 rounded-lg border border-teal-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">{t.wildlife.limitedSeason.title}</h3>
              <p className="text-gray-700 text-center">
                {t.wildlife.limitedSeason.description}
              </p>
            </div>
          </div>
        </section>

        {/* Includes Section */}
        <section className="py-16 md:py-24 bg-teal-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">{t.includes.title}</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto text-center mb-16">
              {t.includes.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {([
                { key: "transport", Icon: Anchor },
                { key: "guide", Icon: Check },
                { key: "snorkel", Icon: Check },
                { key: "photo", Icon: Camera },
                { key: "refreshment", Icon: Coffee },
                { key: "observation", Icon: Binoculars },
              ] as const).map((item) => (
                <div key={item.key} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t.includes.items[item.key].title}</h3>
                    <p className="opacity-90">
                      {t.includes.items[item.key].description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{t.pricing.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {t.pricing.subtitle}
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.pricing.card.name}</h3>
                <div className="text-4xl font-bold text-teal-600 mb-6">
                  <Price amount={3500} />
                </div>
                <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                  {t.pricing.card.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-medium transition-colors">
                  {t.pricing.card.cta}
                </button>
              </div>
            </div>

            <div className="mt-12 bg-teal-50 p-6 rounded-lg border border-teal-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">{t.pricing.availability.title}</h3>
              <p className="text-gray-700 text-center">
                {t.pricing.availability.description}
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{t.testimonials.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {t.testimonials.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.testimonials.reviews.map((review: { name: string; location: string; text: string }, i: number) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                      <Image
                        src={`/placeholder.svg?height=100&width=100&text=${review.name.charAt(0)}`}
                        alt={review.name}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.location}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-16 md:py-24 bg-teal-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              {t.cta.subtitle}
            </p>
            <button className="bg-white text-teal-800 hover:bg-teal-100 px-8 py-4 rounded-md text-lg font-medium transition-colors">
              {t.cta.button}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
