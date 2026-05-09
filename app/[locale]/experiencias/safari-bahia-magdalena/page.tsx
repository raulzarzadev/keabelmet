import type { Metadata } from "next"
import { SafariBahiaMagdalena } from "@/components/safari-bahia-magdalena"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"

import { buildPageMeta, getPageSeo } from "@/lib/seo"
import Breadcrumbs from "@/components/Breadcrumbs"
import { getExperience } from "@/constants/experiences"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("safariBahiaMagdalena", "/experiencias/safari-bahia-magdalena", locale)
}

export default async function SafariBahiaMagdalenaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("safari-bahia-magdalena", locale) as Record<string, any>
  const lh = (path: string) => locale === defaultLocale ? path : `/${locale}${path}`
  const experience = getExperience("safari-bahia-magdalena")!

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: getPageSeo("experiences", locale).title, href: lh("/experiencias") },
          { label: getPageSeo("safariBahiaMagdalena", locale).title },
        ]}
      />
      <SafariBahiaMagdalena translations={t} experience={experience} />
    </>
  )
}
