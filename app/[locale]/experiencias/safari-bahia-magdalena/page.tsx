import type { Metadata } from "next"
import { SafariBahiaMagdalena } from "@/components/safari-bahia-magdalena"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"

import { buildPageMeta } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("safariBahiaMagdalena", "/experiencias/safari-bahia-magdalena", locale)
}

export default async function SafariBahiaMagdalenaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("safari-bahia-magdalena", locale) as Record<string, any>

  return <SafariBahiaMagdalena translations={t} />
}
