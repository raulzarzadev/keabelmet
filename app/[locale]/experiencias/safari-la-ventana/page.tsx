import type { Metadata } from "next"
import { SafariLanding } from "@/components/safari-landing"
import { getPageDictionary, isValidLocale, defaultLocale } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Safari La Ventana",
  description:
    "Expedicion marina en La Ventana, BCS. Observa la migracion de mobulas y ballenas con guias expertos. Aventura de medio dia de abril a junio en el Mar de Cortes.",
}

export default async function SafariLaVentanaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("safari-la-ventana", locale)

  return <SafariLanding translations={t} />
}
