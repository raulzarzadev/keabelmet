import type { Metadata } from "next"
import { BallenaGrisLanding } from "@/components/ballena-gris-landing"
import { getPageDictionary, isValidLocale, defaultLocale } from "@/lib/i18n"

import { buildPageMeta } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("ballenaGris", "/experiencias/ballena-gris", locale)
}

export default async function BallenaGrisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("ballena-gris", locale)

  return <BallenaGrisLanding translations={t} />
}
