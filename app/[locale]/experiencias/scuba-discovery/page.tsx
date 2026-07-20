import type { Metadata } from "next"
import { isValidLocale, defaultLocale } from "@/lib/i18n"

import { buildPageMeta } from "@/lib/seo"
import ExpeditionDetail from "@/components/ExpeditionDetail"
import StoryPage from "@/components/StoryPage"
import { getExpeditionPage } from "@/constants/expedition-pages"
import { getStoryPage } from "@/constants/story-pages"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("scubaDiscovery", "/experiencias/scuba-discovery", locale)
}

export default async function ScubaDiscoveryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const story = getStoryPage("scuba-discovery", locale)
  if (story) return <StoryPage data={story} locale={locale} slug="scuba-discovery" />
  return <ExpeditionDetail data={getExpeditionPage("scuba-discovery", locale)} locale={locale} slug="scuba-discovery" />
}
