import type { Metadata } from "next"
import { isValidLocale, defaultLocale } from "@/lib/i18n"
import { buildPageMeta } from "@/lib/seo"
import { getBookableActivities } from "@/lib/bookable-activities"
import DepositBuilder from "@/components/DepositBuilder"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("buildReservation", "/arma-tu-reserva", locale)
}

export default async function ArmaTuReservaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const activities = getBookableActivities(locale)
  return (
    <main className="dep-page">
      <DepositBuilder locale={locale} activities={activities} />
    </main>
  )
}
