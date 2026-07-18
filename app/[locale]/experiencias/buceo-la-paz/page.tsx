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
  return buildPageMeta("buceoLaPaz", "/experiencias/buceo-la-paz", locale)
}

export default async function BuceoLaPazPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const story = getStoryPage("buceo-la-paz", locale)
  if (story) return <StoryPage data={story} locale={locale} />
  return <ExpeditionDetail data={getExpeditionPage("buceo-la-paz", locale)} locale={locale} />
}
