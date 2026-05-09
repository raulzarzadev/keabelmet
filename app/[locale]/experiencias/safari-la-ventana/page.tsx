import type { Metadata } from "next"
import { SafariLanding } from "@/components/safari-landing"
import { getPageDictionary, isValidLocale, defaultLocale } from "@/lib/i18n"

import { buildPageMeta, getPageSeo } from "@/lib/seo"
import Breadcrumbs from "@/components/Breadcrumbs"
import { getExperience } from "@/constants/experiences"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("safariLaVentana", "/experiencias/safari-la-ventana", locale)
}

export default async function SafariLaVentanaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("safari-la-ventana", locale)
  const lh = (path: string) => locale === defaultLocale ? path : `/${locale}${path}`
  const experience = getExperience("safari-la-ventana")!

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: getPageSeo("experiences", locale).title, href: lh("/experiencias") },
          { label: getPageSeo("safariLaVentana", locale).title },
        ]}
      />
      <SafariLanding translations={t} experience={experience} />
    </>
  )
}
