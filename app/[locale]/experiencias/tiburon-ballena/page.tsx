import type { Metadata } from "next"
import { isValidLocale, defaultLocale } from "@/lib/i18n"

import { buildPageMeta, buildUrl, getPageSeo, SITE_URL } from "@/lib/seo"
import { JsonLd, breadcrumbSchema, touristTripSchema, seasonalEventSchema } from "@/lib/jsonLd"
import ExpeditionDetail from "@/components/ExpeditionDetail"
import StoryPage from "@/components/StoryPage"
import { getExpeditionPage } from "@/constants/expedition-pages"
import { getStoryPage } from "@/constants/story-pages"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("tiburonBallena", "/experiencias/tiburon-ballena", locale)
}

export default async function TiburonBallenaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const seo = getPageSeo("tiburonBallena", locale)
  const url = buildUrl("/experiencias/tiburon-ballena", locale)
  const year = new Date().getFullYear()
  const schemas = [
    breadcrumbSchema([
      { name: getPageSeo("experiences", locale).title, url: buildUrl("/experiencias", locale) },
      { name: seo.title, url },
    ]),
    touristTripSchema({
      name: seo.title,
      description: seo.description,
      image: `${SITE_URL}/whale-shark-swimming.jpg`,
      url,
      priceMxn: 1800,
      touristType: ["Snorkeling", "Wildlife", "Family"],
      validFrom: `${year}-11-01`,
      validThrough: `${year + 1}-03-31`,
    }, locale),
    seasonalEventSchema({
      name: `Temporada de Tiburon Ballena ${year}-${year + 1}`,
      description: "Nado responsable con tiburones ballena en La Paz, Baja California Sur.",
      startDate: `${year}-11-01`,
      endDate: `${year + 1}-03-31`,
      location: "La Paz, Baja California Sur, Mexico",
      url,
    }),
  ]
  const story = getStoryPage("tiburon-ballena", locale)
  return (
    <>
      <JsonLd data={schemas} />
      {story ? (
        <StoryPage data={story} locale={locale} />
      ) : (
        <ExpeditionDetail data={getExpeditionPage("tiburon-ballena", locale)} locale={locale} />
      )}
    </>
  )
}
