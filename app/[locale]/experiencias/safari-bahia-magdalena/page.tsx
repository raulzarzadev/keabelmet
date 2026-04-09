import type { Metadata } from "next"
import { SafariBahiaMagdalena } from "@/components/safari-bahia-magdalena"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Safari Bahia Magdalena",
  description:
    "Safari marino en Bahia Magdalena, BCS. Nada con lobos marinos, avista marlines y disfruta la corrida de sardinas. Una expedicion unica de noviembre a diciembre.",
}

export default async function SafariBahiaMagdalenaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("safari-bahia-magdalena", locale) as Record<string, any>

  return <SafariBahiaMagdalena translations={t} />
}
