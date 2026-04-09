import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, MapPin, Camera, Clock } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Buceo en La Paz",
  description:
    "Bucea con lobos marinos en Los Islotes, La Paz. Explora cuevas submarinas y formaciones rocosas en el Mar de Cortes con guias certificados y equipo completo.",
}

export default async function BuceoLaPazPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("buceo-la-paz", locale) as Record<string, any>
  const l = (path: string) => locale === "es" ? path : `/${locale}${path}`
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <Image src="/scuba-diving-underwater-sea-lions-swimming-playful.jpg" alt={t.hero.image_alt} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur">
            <MapPin className="h-4 w-4" />
            {t.hero.badge}
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{t.hero.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            {t.hero.description}
          </p>
          <div className="mt-8">
            <Link
              href="#reservar"
              className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-white transition hover:bg-teal-700"
            >
              {t.hero.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Clock className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{t.details.duration_title}</h3>
                <p className="text-gray-600">{t.details.duration_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{t.details.group_title}</h3>
                <p className="text-gray-600">{t.details.group_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{t.details.season_title}</h3>
                <p className="text-gray-600">{t.details.season_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Camera className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{t.details.includes_title}</h3>
                <p className="text-gray-600">{t.details.includes_text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold">{t.about.title}</h2>
          <p className="mt-4 text-lg text-gray-700">
            {t.about.description}
          </p>
          <h3 className="mt-8 text-2xl font-bold">{t.includes.title}</h3>
          <ul className="mt-4 grid gap-3 text-gray-700 sm:grid-cols-2">
            {(t.includes.items as string[]).map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-teal-600" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-blue-900">
              {t.includes.note}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="reservar" className="bg-teal-700 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-3xl font-bold">{t.cta.title}</h2>
          <p className="mt-4 text-lg">{t.cta.description}</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href={l("/contacto")}
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-teal-700 transition hover:bg-gray-100"
            >
              {t.cta.cta_primary}
            </Link>
            <Link
              href={l("/")}
              className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {t.cta.cta_secondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
