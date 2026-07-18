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
  return buildPageMeta("tourBallenaGris", "/experiencias/tour-ballena-gris", locale)
}

export default async function TourBallenaGrisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const seo = getPageSeo("tourBallenaGris", locale)
  const url = buildUrl("/experiencias/tour-ballena-gris", locale)
  const year = new Date().getFullYear()
  const schemas = [
    breadcrumbSchema([
      { name: getPageSeo("experiences", locale).title, url: buildUrl("/experiencias", locale) },
      { name: seo.title, url },
    ]),
    touristTripSchema({
      name: seo.title,
      description: seo.description,
      image: `${SITE_URL}/gray-whale-breaching-sea-of-cortez.jpg`,
      url,
      priceMxn: 2800,
      touristType: ["Wildlife", "Whale Watching", "Family"],
      validFrom: `${year}-01-01`,
      validThrough: `${year}-03-31`,
    }, locale),
    seasonalEventSchema({
      name: `Temporada de Ballena Gris ${year}`,
      description: "Avistamiento de ballenas grises en su santuario natural en Bahia Magdalena.",
      startDate: `${year}-01-01`,
      endDate: `${year}-03-31`,
      location: "Bahia Magdalena, Baja California Sur, Mexico",
      url,
    }),
  ]
  const story = getStoryPage("tour-ballena-gris", locale)
  return (
    <>
      <JsonLd data={schemas} />
      {story ? (
        <StoryPage data={story} locale={locale} />
      ) : (
        <ExpeditionDetail data={getExpeditionPage("tour-ballena-gris", locale)} locale={locale} />
      )}
    </>
  )
}
