import type { Metadata } from "next"
import { BallenaGrisLanding } from "@/components/ballena-gris-landing"
import { getPageDictionary, isValidLocale, defaultLocale } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Expedicion Ballena Gris",
  description:
    "Expedicion para avistar ballenas grises en Baja California Sur. Encuentros cercanos en su santuario natural con guias certificados y embarcaciones seguras.",
}

export default async function BallenaGrisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("ballena-gris", locale)

  return <BallenaGrisLanding translations={t} />
}
