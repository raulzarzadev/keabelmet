import type { Metadata } from "next"
import { isValidLocale, defaultLocale } from "@/lib/i18n"
import { JsonLd } from "@/lib/jsonLd"
import { experienceMeta, experienceSchemas } from "@/lib/experience-seo"
import ExpeditionDetail from "@/components/ExpeditionDetail"
import StoryPage from "@/components/StoryPage"
import { getExpeditionPage } from "@/constants/expedition-pages"
import { getStoryPage } from "@/constants/story-pages"

const SLUG = "buceo-cabo-pulmo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return experienceMeta(SLUG, locale)
}

export default async function ExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const story = getStoryPage(SLUG, locale)
  return (
    <>
      <JsonLd data={experienceSchemas(SLUG, locale)} />
      {story ? (
        <StoryPage data={story} locale={locale} slug={SLUG} />
      ) : (
        <ExpeditionDetail data={getExpeditionPage(SLUG, locale)} locale={locale} slug={SLUG} />
      )}
    </>
  )
}
