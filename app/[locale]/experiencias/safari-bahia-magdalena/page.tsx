import type { Metadata } from "next"
import { isValidLocale, defaultLocale } from "@/lib/i18n"

import { buildPageMeta } from "@/lib/seo"
import ExpeditionDetail from "@/components/ExpeditionDetail"
import { getExpeditionPage } from "@/constants/expedition-pages"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("safariBahiaMagdalena", "/experiencias/safari-bahia-magdalena", locale)
}

export default async function SafariBahiaMagdalenaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  return <ExpeditionDetail data={getExpeditionPage("safari-bahia-magdalena", locale)} locale={locale} />
}
