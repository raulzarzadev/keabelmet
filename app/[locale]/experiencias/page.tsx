import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, Star } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary, type Locale } from "@/lib/i18n"
import { buildPageMeta, getPageSeo } from "@/lib/seo"
import Breadcrumbs from "@/components/Breadcrumbs"
import { Price } from "@/contexts/CurrencyContext"
import { experiences, localizeExperience } from "@/constants/experiences"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("experiences", "/experiencias", locale)
}

export default async function Experiencias({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale: Locale = isValidLocale(loc) ? loc : defaultLocale
  const l = (path: string) => locale === defaultLocale ? path : `/${locale}${path}`
  const t = await getPageDictionary("experiences", locale) as Record<string, any>

  const SITE = "https://www.keabelmet.com"
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: getPageSeo("experiences", locale).title,
    itemListElement: experiences.map((e, idx) => {
      const i = localizeExperience(e, locale)
      const offers = e.fromMxn != null ? {
        "@type": "Offer",
        price: e.fromMxn,
        priceCurrency: "MXN",
        url: `${SITE}${e.href}`,
        availability: "https://schema.org/InStock",
      } : undefined
      return {
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "TouristTrip",
          name: i.title,
          description: i.description,
          url: `${SITE}${e.href}`,
          image: `${SITE}${e.image}`,
          touristType: i.badge,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: e.rating,
            reviewCount: e.reviews,
          },
          ...(offers ? { offers } : {}),
        },
      }
    }),
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Breadcrumbs locale={locale} items={[{ label: getPageSeo("experiences", locale).title }]} />
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => {
            const i = localizeExperience(exp, locale)
            const href = l(exp.href)
            return (
              <Link
                key={exp.slug}
                href={href}
                className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={i.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4 fill-teal-600 text-teal-600" />
                    <span className="font-semibold text-sm">{exp.rating.toFixed(1)}</span>
                    <span className="text-gray-600 text-sm">({exp.reviews})</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-teal-700 transition-colors">{i.title}</h3>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{i.durationLabel}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{i.capacityLabel}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{i.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {i.highlights.map((f) => (
                      <span key={f} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      {exp.fromMxn != null ? (
                        <>
                          <span className="text-gray-600 text-sm">{t.perPerson}</span>
                          <p className="text-3xl font-bold text-teal-600"><Price amount={exp.fromMxn} /></p>
                        </>
                      ) : (
                        <span className="text-gray-600 text-sm">{t.book}</span>
                      )}
                    </div>
                    <span className="px-6 py-3 bg-teal-600 text-white rounded-lg group-hover:bg-teal-700 transition-colors font-medium">
                      {t.book}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
