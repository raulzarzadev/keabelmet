import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Anchor, Camera, Coffee, TelescopeIcon as Binoculars, Check } from "lucide-react"
import { Price } from "@/contexts/CurrencyContext"

interface SafariLandingProps {
  translations: Record<string, any>
}

export function SafariLanding({ translations: t }: SafariLandingProps) {
  const hero = t.hero || {}
  const about = t.about || {}
  const experience = t.experience || {}
  const cards = experience.cards || {}
  const itinerary = experience.itinerary || {}
  const wildlife = t.wildlife || {}
  const species = wildlife.species || {}
  const includes = t.includes || {}
  const includeItems = includes.items || {}
  const pricing = t.pricing || {}
  const testimonials = t.testimonials || {}
  const cta = t.cta || {}

  const speciesKeys = ["mobulas", "dolphins", "humpbackWhale", "seaLions", "spermWhales", "orcas"] as const
  const speciesImages = [
    "/images/especies/mobulaschafa.jpeg",
    "/images/especies/delfinsaltando.jpeg",
    "/images/especies/ballenasaltando2.jpeg",
    "/images/especies/lobomarinonadando.jpeg",
    "/images/especies/cachalote2.jpeg",
    "/images/especies/orcalaventana.jpeg",
  ]
  const speciesAlts = [
    "Grupo de mobulas nadando juntas en las aguas cristalinas del Mar de Cortes",
    "Delfin saltando fuera del agua en el Mar de Cortes",
    "Ballena jorobada saltando frente a las montanas de Baja California Sur",
    "Lobo marino nadando bajo el agua en las cristalinas aguas del Mar de Cortes",
    "Cachalote nadando en las profundidades del Mar de Cortes",
    "Orca emergiendo en las aguas del Mar de Cortes",
  ]

  const includeKeys = ["boat", "guide", "snorkel", "photo", "food", "binoculars"] as const
  const includeIcons = [Anchor, Check, Check, Camera, Coffee, Binoculars]

  const experienceCardKeys = ["meetingPoint", "schedule", "activities", "refreshment"] as const
  const experienceCardIcons = [MapPin, Clock, Anchor, Coffee]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/images/orca-safari.jpg"
              alt={hero.imageAlt || ""}
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
                {hero.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                {hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  {hero.cta}
                </button>
                <button className="text-white border border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors">
                  {hero.ctaSecondary}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{about.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {about.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
              <div className="order-2 md:order-1 flex flex-col justify-center space-y-6">
                <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                  <h3 className="text-xl font-semibold text-teal-800 mb-3">{about.commitment?.title}</h3>
                  <p className="text-gray-700">
                    {about.commitment?.description}
                  </p>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                  <h3 className="text-xl font-semibold text-teal-800 mb-3">{about.guidedExperience?.title}</h3>
                  <p className="text-gray-700">
                    {about.guidedExperience?.description}
                  </p>
                </div>
              </div>

              <div className="order-1 md:order-2 rounded-xl overflow-hidden mx-auto md:mx-0 w-[80%] md:w-[60%] shadow-md">
                <Image
                  src="/images/safari/nuestrocompromiso2.jpeg"
                  alt={about.imageAlt || ""}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "4/5", objectPosition: "center" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 md:py-24 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{experience.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {experience.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {experienceCardKeys.map((key, i) => {
                const card = cards[key] || {}
                const Icon = experienceCardIcons[i]
                return (
                  <div key={key} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-700">
                      {key === "schedule"
                        ? card.description?.split("\n").map((line: string, j: number) => (
                            <span key={j}>
                              {line}
                              {j === 0 && <br />}
                            </span>
                          ))
                        : card.description}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-16">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{itinerary.title}</h3>
                <ol className="space-y-4">
                  {(itinerary.steps || []).map((step: { title: string; description: string }, i: number) => (
                    <li key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{step.title}</h4>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Wildlife Section */}
        <section id="wildlife" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{wildlife.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {wildlife.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {speciesKeys.map((key, i) => {
                const sp = species[key] || {}
                return (
                  <div key={key} className="bg-teal-50 rounded-lg overflow-hidden">
                    <div className="h-64 relative">
                      <Image
                        src={speciesImages[i]}
                        alt={speciesAlts[i]}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
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

            <div className="mt-12 bg-teal-50 p-6 rounded-lg border border-teal-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">{wildlife.realismNote?.title}</h3>
              <p className="text-gray-700 text-center">
                {wildlife.realismNote?.description}
              </p>
            </div>
          </div>
        </section>

        {/* Includes Section */}
        <section className="py-16 md:py-24 bg-teal-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">{includes.title}</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto text-center mb-16">
              {includes.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {includeKeys.map((key, i) => {
                const item = includeItems[key] || {}
                const Icon = includeIcons[i]
                return (
                  <div key={key} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-white" />
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

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{pricing.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {pricing.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Group Safari */}
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{pricing.group?.name}</h3>
                <div className="text-4xl font-bold text-teal-600 mb-6">
                  <Price amount={3000} />
                </div>
                <ul className="space-y-3 mb-8">
                  {(pricing.group?.features || []).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-medium transition-colors">
                  {pricing.group?.cta}
                </button>
              </div>

              {/* Private Safari */}
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{pricing.private?.name}</h3>
                <div className="text-4xl font-bold text-teal-600 mb-6">
                  <Price amount={16000} />
                </div>
                <ul className="space-y-3 mb-8">
                  {(pricing.private?.features || []).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-medium transition-colors">
                  {pricing.private?.cta}
                </button>
              </div>
            </div>

            <div className="mt-12 bg-teal-50 p-6 rounded-lg border border-teal-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">{pricing.kids?.title}</h3>
              <p className="text-gray-700 text-center">
                {pricing.kids?.line1}
                <br />
                {pricing.kids?.line2}
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{testimonials.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              {testimonials.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(testimonials.reviews || []).map((review: { name: string; location: string; text: string }, i: number) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                      <Image
                        src={`/placeholder.svg?height=100&width=100&text=${review.name?.charAt(0) || ""}`}
                        alt={review.name || ""}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{cta.title}</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              {cta.subtitle}
            </p>
            <button className="bg-white text-teal-800 hover:bg-teal-100 px-8 py-4 rounded-md text-lg font-medium transition-colors">
              {cta.button}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
