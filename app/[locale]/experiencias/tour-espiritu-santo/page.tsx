import type { Metadata } from "next"
import { isValidLocale, defaultLocale } from "@/lib/i18n"

import { buildPageMeta, buildUrl, getPageSeo } from "@/lib/seo"
import { JsonLd, breadcrumbSchema, touristTripSchema } from "@/lib/jsonLd"
import ExpeditionDetail from "@/components/ExpeditionDetail"
import { expeditionPages } from "@/constants/expedition-pages"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("tourEspirituSanto", "/experiencias/tour-espiritu-santo", locale)
}

export default async function TourEspirituSantoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const seo = getPageSeo("tourEspirituSanto", locale)
  const url = buildUrl("/experiencias/tour-espiritu-santo", locale)
  const schemas = [
    breadcrumbSchema([
      { name: getPageSeo("experiences", locale).title, url: buildUrl("/experiencias", locale) },
      { name: seo.title, url },
    ]),
    touristTripSchema({
      name: seo.title,
      description: seo.description,
      image: `${buildUrl("/", locale).replace(/\/$/, "")}/espiritu-santo-island-paradise-beach.jpg`,
      url,
      priceMxn: 1800,
      touristType: ["Snorkeling", "Wildlife", "Beach", "Family"],
    }, locale),
  ]
  return (
    <>
      <JsonLd data={schemas} />
      <ExpeditionDetail data={expeditionPages["tour-espiritu-santo"]} locale={locale} />
    </>
  )
}
