import type { Metadata } from "next"
import { SurfCampLanding } from "@/components/surf-camp-landing"
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n"
import { buildPageMeta, getPageSeo } from "@/lib/seo"
import Breadcrumbs from "@/components/Breadcrumbs"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("surfCamp", "/surf-camp", locale)
}

export default async function SurfCampPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: getPageSeo("surfCamp", locale).title }]} />
      <SurfCampLanding />
    </>
  )
}
