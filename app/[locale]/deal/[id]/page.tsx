import type { Metadata } from "next"
import { isValidLocale, defaultLocale } from "@/lib/i18n"
import DealView from "../deal-view"

export const metadata: Metadata = {
	title: "Tu reserva · Keabelmet Expeditions",
	robots: { index: false, follow: false },
}

/** Link corto de un deal: /deal/<id> (el token firmado vive en Redis). */
export default async function DealShortPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
	const { locale: loc, id } = await params
	const locale = isValidLocale(loc) ? loc : defaultLocale
	return <DealView dealRef={id} locale={locale} />
}
