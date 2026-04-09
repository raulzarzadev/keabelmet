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
  Heart,
  Users,
  AlertCircle,
} from "lucide-react"

interface BallenaGrisLandingProps {
  translations: Record<string, any>
}

export function BallenaGrisLanding({ translations: t }: BallenaGrisLandingProps) {
  const hero = t.hero || {}
  const story = t.story || {}
  const features = story.features || {}
  const itinerary = t.itinerary || {}
  const steps = itinerary.steps || {}
  const includes = t.includes || {}
  const includeItems = includes.items || {}
  const wildlife = t.wildlife || {}
  const species = wildlife.species || {}
  const testimonials = t.testimonials || {}
  const reviews = testimonials.reviews || []
  const pricing = t.pricing || {}
  const card = pricing.card || {}
  const cardFeatures = card.features || []
  const limitedSeason = pricing.limitedSeason || {}
  const details = t.details || {}
  const cta = t.cta || {}

  const includeIcons = [MapPin, Anchor, Check, Camera, Coffee, Binoculars]
  const includeKeys = ["transport", "boat", "guide", "photo", "snack", "observation"]

  const itineraryIcons = [Clock, Anchor, Binoculars, Coffee, MapPin]
  const itineraryKeys = ["departure", "arrival", "navigation", "snack", "return"]

  const speciesData = [
    { key: "grayWhale", src: "/images/especies/ballena-gris-real.jpeg", alt: "Ballena gris emergiendo en las tranquilas aguas de Bahia Magdalena" },
    { key: "dolphins", src: "/images/especies/delfinsaltando.jpeg", alt: "Delfin saltando en las aguas de Bahia Magdalena" },
    { key: "seaLions", src: "/images/especies/lobomarinonadando.jpeg", alt: "Lobos marinos descansando en las rocas de Bahia Magdalena" },
    { key: "seabirds", src: "/placeholder.svg?height=400&width=600&text=Aves+Marinas", alt: "Fragatas y pelicanos volando sobre Bahia Magdalena" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/ballena-gris-hero.jpeg"
              alt={hero.imageAlt}
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-slate-800/20" />
          </div>
          <div className="container mx-auto relative py-20 md:py-28 lg:py-36 px-4">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                {hero.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                {hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  {hero.cta}
                </button>
                <button className="text-white border border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors">
                  {hero.ctaSecondary}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Storytelling Section */}
        <section id="story" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-slate-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">{story.title}</h2>
              </div>

              <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl text-center mb-8">
                  {story.intro}
                </p>

                <div className="bg-slate-50 p-8 rounded-lg border border-slate-100">
                  <p className="text-lg mb-4">
                    {story.description}
                  </p>
                  <p className="text-lg font-medium text-slate-800">
                    {story.highlight}
                  </p>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{features.puertoChale?.title}</h3>
                  <p className="text-gray-600">{features.puertoChale?.description}</p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Anchor className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{features.lagoon?.title}</h3>
                  <p className="text-gray-600">{features.lagoon?.description}</p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{features.intimate?.title}</h3>
                  <p className="text-gray-600">{features.intimate?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Section */}
        <section id="itinerary" className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{itinerary.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {itinerary.subtitle}
            </p>

            <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
              <div className="space-y-8">
                {itineraryKeys.map((key, i) => {
                  const step = steps[key] || {}
                  const Icon = itineraryIcons[i]
                  return (
                    <div key={key} className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="h-7 w-7 text-slate-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-xl mb-2">{step.time}</h4>
                        <p className="text-gray-700 text-lg">{step.description}</p>
                        {key === "navigation" && step.activities && (
                          <div className="bg-slate-50 p-4 rounded-lg mt-3">
                            <p className="text-gray-600 font-medium">{step.activitiesLabel}</p>
                            <ul className="text-gray-600 mt-2 space-y-1">
                              {(step.activities as string[]).map((activity: string, j: number) => (
                                <li key={j}>• {activity}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Includes Section */}
        <section id="includes" className="py-16 md:py-24 bg-slate-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">{includes.title}</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto text-center mb-16">
              {includes.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {includeKeys.map((key, i) => {
                const item = includeItems[key] || {}
                const Icon = includeIcons[i]
                return (
                  <div key={key} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="opacity-90">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Wildlife Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{wildlife.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {wildlife.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {speciesData.map((s) => {
                const sp = species[s.key] || {}
                return (
                  <div key={s.key} className="bg-slate-50 rounded-lg overflow-hidden">
                    <div className="h-64 relative">
                      <Image
                        src={s.src}
                        alt={s.alt}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-slate-600 text-white text-xs font-medium px-2 py-1 rounded">
                        {sp.season}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{sp.name}</h3>
                      <p className="text-gray-700">{sp.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{testimonials.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {testimonials.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review: { name: string; location: string; text: string }, i: number) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden mr-4 flex items-center justify-center">
                      <span className="text-slate-600 font-semibold text-lg">{review.name.charAt(0)}</span>
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

        {/* Pricing Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{pricing.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {pricing.subtitle}
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.name}</h3>
                <div className="text-4xl font-bold text-slate-600 mb-6">
                  {card.price} <span className="text-lg text-gray-600 font-normal">{card.currency}</span>
                </div>
                <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                  {cardFeatures.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-slate-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-md font-medium transition-colors">
                  {card.cta}
                </button>
              </div>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg border border-slate-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-slate-800 mb-3 text-center">{limitedSeason.title}</h3>
              <p className="text-gray-700 text-center">
                {limitedSeason.description}
              </p>
            </div>
          </div>
        </section>

        {/* Important Details Section */}
        <section id="details" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{details.title}</h2>
                <p className="text-lg text-gray-700">
                  {details.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">{details.realisticNote?.title}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {details.realisticNote?.description}
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">{details.sharedExperience?.title}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {details.sharedExperience?.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800">{details.forWhom?.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {details.forWhom?.description}
                </p>
              </div>

              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 bg-slate-100 px-6 py-3 rounded-full">
                  <Heart className="h-5 w-5 text-slate-600" />
                  <span className="text-slate-700 font-medium">{details.seasonBadge}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-16 md:py-24 bg-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {cta.title}
              </h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                {cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-slate-800 hover:bg-slate-100 px-8 py-4 rounded-md text-lg font-medium transition-colors">
                  {cta.button}
                </button>
                <button className="text-white border border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/10 px-8 py-4 rounded-md text-lg font-medium transition-colors">
                  {cta.buttonSecondary}
                </button>
              </div>
              <p className="text-sm opacity-75 mt-6">{cta.footnote}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
