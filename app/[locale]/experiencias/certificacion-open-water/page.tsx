import type { Metadata } from "next"
import { isValidLocale, defaultLocale } from "@/lib/i18n"

import { buildPageMeta } from "@/lib/seo"
import ExpeditionDetail from "@/components/ExpeditionDetail"
import StoryPage from "@/components/StoryPage"
import { getExpeditionPage } from "@/constants/expedition-pages"
import { getStoryPage } from "@/constants/story-pages"

const SLUG = "certificacion-open-water"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("openWater", `/experiencias/${SLUG}`, locale)
}

export default async function OpenWaterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const story = getStoryPage(SLUG, locale)
  if (story) return <StoryPage data={story} locale={locale} slug={SLUG} />
  return <ExpeditionDetail data={getExpeditionPage(SLUG, locale)} locale={locale} slug={SLUG} />
}
