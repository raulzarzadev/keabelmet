import type { Metadata } from "next"
import { SafariLanding } from "@/components/safari-landing"
import { getPageDictionary, isValidLocale, defaultLocale } from "@/lib/i18n"

import { buildPageMeta } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("safariLaVentana", "/experiencias/safari-la-ventana", locale)
}

export default async function SafariLaVentanaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("safari-la-ventana", locale)

  return <SafariLanding translations={t} />
}
