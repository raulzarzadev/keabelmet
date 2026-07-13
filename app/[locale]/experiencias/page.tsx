import type { Metadata } from "next"
import Link from "next/link"
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
  const l = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)
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
          aggregateRating: { "@type": "AggregateRating", ratingValue: e.rating, reviewCount: e.reviews },
          ...(offers ? { offers } : {}),
        },
      }
    }),
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Breadcrumbs locale={locale} items={[{ label: getPageSeo("experiences", locale).title }]} />

      <div className="section-head" style={{ paddingBottom: 40 }}>
        <span className="kicker">{getPageSeo("experiences", locale).title}</span>
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      <section className="tours" style={{ paddingTop: 0 }}>
        <div className="tour-grid">
          {experiences.map((exp) => {
            const i = localizeExperience(exp, locale)
            return (
              <Link key={exp.slug} className="tour-card" href={l(exp.href)}>
                <div className="tour-media">
                  <span className="tour-tag">{i.durationLabel}</span>
                  <img src={exp.image} alt={i.title} />
                </div>
                <div className="tour-body">
                  <h3>{i.title}</h3>
                  <div className="tour-meta">
                    <span>{i.capacityLabel}</span>
                    {i.highlights.slice(0, 2).map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  </div>
                  <div className="tour-foot">
                    <div className="tour-price">
                      {exp.fromMxn != null ? (
                        <><b><Price amount={exp.fromMxn} /></b><span>{t.perPerson}</span></>
                      ) : (
                        <b style={{ fontSize: 16 }}>{t.book}</b>
                      )}
                    </div>
                    <span className="tour-link">{t.book}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
