import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, MapPin, Clock, CheckCircle2, Anchor } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Buceo en Cabo Pulmo",
  description:
    "Bucea en el Parque Nacional Cabo Pulmo, hogar del unico arrecife de coral del Mar de Cortes. Tiburones, tortugas, cardumenes y lobos marinos te esperan.",
}

const marineLifeImages = [
  "/school-of-fish-cabo-pulmo-underwater.jpg",
  "/bull-shark-swimming-cabo-pulmo.jpg",
  "/manta-ray-swimming-underwater.jpg",
  "/sea-turtle-swimming-coral-reef.jpg",
  "/sea-lions-underwater-playful.jpg",
  "/coral-reef-colorful-tropical-fish.jpg",
]

export default async function BuceoCaboPulmoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("buceo-cabo-pulmo", locale) as Record<string, any>
  const l = (path: string) => locale === "es" ? path : `/${locale}${path}`
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg"
            alt={t.hero.image_alt}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur">
            <MapPin className="h-4 w-4" />
            {t.hero.badge}
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
            {t.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#tarifas"
              className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-white transition hover:bg-teal-700"
            >
              {t.hero.cta_primary}
            </Link>
            <Link
              href="#que-incluye"
              className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/10 px-6 py-3 text-white transition hover:bg-white/20"
            >
              {t.hero.cta_secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="border-b bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                <Clock className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{t.details.duration_title}</h3>
                <p className="text-sm text-gray-600">{t.details.duration_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{t.details.group_title}</h3>
                <p className="text-sm text-gray-600">{t.details.group_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{t.details.season_title}</h3>
                <p className="text-sm text-gray-600">{t.details.season_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                <Anchor className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{t.details.dives_title}</h3>
                <p className="text-sm text-gray-600">{t.details.dives_text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">{t.about.title}</h2>
          <div className="mt-6 space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">
              {t.about.description_1}
            </p>
            <p className="text-lg leading-relaxed">
              {t.about.description_2}
            </p>
            <p className="text-lg leading-relaxed">
              {t.about.description_3}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifas" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">{t.pricing.title}</h2>
            <p className="mt-2 text-gray-600">{t.pricing.subtitle}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Tour para Buzos Certificados - Colectivo */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{t.pricing.collective.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{t.pricing.collective.subtitle}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-teal-600">{t.pricing.collective.price_own_gear}</span>
                  <span className="text-gray-600">{t.pricing.collective.currency}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{t.pricing.collective.price_own_gear_note}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-teal-600">{t.pricing.collective.price_full_gear}</span>
                  <span className="text-gray-600">{t.pricing.collective.currency}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{t.pricing.collective.price_full_gear_note}</p>
              </div>
              <ul className="space-y-3">
                {(t.pricing.collective.features as string[]).map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={l("/contacto")}
                  className="block w-full rounded-xl bg-teal-600 py-3 text-center font-semibold text-white transition hover:bg-teal-700"
                >
                  {t.pricing.collective.cta}
                </Link>
              </div>
            </div>

            {/* Tour para Buzos Certificados - Privado */}
            <div className="rounded-2xl border-2 border-teal-500 bg-gradient-to-br from-teal-50 to-white p-8 shadow-lg">
              <div className="mb-2 inline-block rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                {t.pricing.private.badge}
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{t.pricing.private.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{t.pricing.private.subtitle}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-teal-600">{t.pricing.private.price_base}</span>
                  <span className="text-gray-600">{t.pricing.private.currency}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{t.pricing.private.price_base_note}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-teal-600">{t.pricing.private.price_extra}</span>
                  <span className="text-gray-600">{t.pricing.private.currency}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{t.pricing.private.price_extra_note}</p>
              </div>
              <ul className="space-y-3">
                {(t.pricing.private.features as string[]).map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={l("/contacto")}
                  className="block w-full rounded-xl bg-teal-600 py-3 text-center font-semibold text-white transition hover:bg-teal-700"
                >
                  {t.pricing.private.cta}
                </Link>
              </div>
            </div>

            {/* Discovery Scuba Diver - Colectivo */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{t.pricing.discovery.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{t.pricing.discovery.subtitle}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-teal-600">{t.pricing.discovery.price}</span>
                  <span className="text-gray-600">{t.pricing.discovery.currency}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{t.pricing.discovery.price_note}</p>
              </div>
              <ul className="space-y-3">
                {(t.pricing.discovery.features as string[]).map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={l("/contacto")}
                  className="block w-full rounded-xl bg-teal-600 py-3 text-center font-semibold text-white transition hover:bg-teal-700"
                >
                  {t.pricing.discovery.cta}
                </Link>
              </div>
            </div>

            {/* Discovery Scuba Diver - Privado */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{t.pricing.discovery_private.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{t.pricing.discovery_private.subtitle}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-teal-600">{t.pricing.discovery_private.price_base}</span>
                  <span className="text-gray-600">{t.pricing.discovery_private.currency}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{t.pricing.discovery_private.price_base_note}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-teal-600">{t.pricing.discovery_private.price_extra}</span>
                  <span className="text-gray-600">{t.pricing.discovery_private.currency}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{t.pricing.discovery_private.price_extra_note}</p>
              </div>
              <ul className="space-y-3">
                {(t.pricing.discovery_private.features as string[]).map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={l("/contacto")}
                  className="block w-full rounded-xl bg-teal-600 py-3 text-center font-semibold text-white transition hover:bg-teal-700"
                >
                  {t.pricing.discovery_private.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section id="que-incluye" className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">{t.includes.title}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{t.includes.gear_title}</h3>
                <p className="text-sm text-gray-600">{t.includes.gear_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{t.includes.divemaster_title}</h3>
                <p className="text-sm text-gray-600">{t.includes.divemaster_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{t.includes.dives_title}</h3>
                <p className="text-sm text-gray-600">{t.includes.dives_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{t.includes.park_title}</h3>
                <p className="text-sm text-gray-600">{t.includes.park_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{t.includes.refreshments_title}</h3>
                <p className="text-sm text-gray-600">{t.includes.refreshments_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{t.includes.insurance_title}</h3>
                <p className="text-sm text-gray-600">{t.includes.insurance_text}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-amber-50 border border-amber-200 p-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {t.requirements.title}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-amber-900">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>{t.requirements.certified}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>{t.requirements.discovery}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>{t.requirements.health}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Marine Life */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-teal-600">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{t.marine_life.title}</h2>
            <p className="mt-2 text-gray-600">
              {t.marine_life.subtitle}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(t.marine_life.species as Array<{ name: string; description: string; season: string }>).map((species, i) => (
              <article
                key={i}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={marineLifeImages[i] || "/placeholder.svg"}
                    alt={species.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute right-3 top-3 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    {species.season}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">{species.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{species.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-blue-50 p-6 text-center">
            <p className="text-sm text-blue-900">
              {t.marine_life.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">{t.recommendations.title}</h2>
          <div className="mt-6 space-y-4 text-gray-700">
            {(t.recommendations.items as Array<{ title: string; text: string }>).map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-600">
                  {i + 1}
                </div>
                <p>
                  <strong>{item.title}</strong> {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.cta.title}</h2>
          <p className="mt-4 text-lg text-teal-50">
            {t.cta.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={l("/contacto")}
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-teal-700 transition hover:bg-gray-100"
            >
              {t.cta.cta_primary}
            </Link>
            <Link
              href={l("/")}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              {t.cta.cta_secondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
