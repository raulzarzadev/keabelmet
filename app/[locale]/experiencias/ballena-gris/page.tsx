import type { Metadata } from "next"
import { BallenaGrisLanding } from "@/components/ballena-gris-landing"
import { getPageDictionary, isValidLocale, defaultLocale } from "@/lib/i18n"

import { buildPageMeta, getPageSeo } from "@/lib/seo"
import Breadcrumbs from "@/components/Breadcrumbs"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("ballenaGris", "/experiencias/ballena-gris", locale)
}

export default async function BallenaGrisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("ballena-gris", locale)
  const lh = (path: string) => locale === defaultLocale ? path : `/${locale}${path}`

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: getPageSeo("experiences", locale).title, href: lh("/experiencias") },
          { label: getPageSeo("ballenaGris", locale).title },
        ]}
      />
      <BallenaGrisLanding translations={t} />
    </>
  )
}
