import type { Metadata } from "next"
import { isValidLocale, defaultLocale } from "@/lib/i18n"
import DealView from "./deal-view"

export const metadata: Metadata = {
	title: "Tu reserva · Keabelmet Expeditions",
	robots: { index: false, follow: false },
}

export default async function DealPage({
	params,
	searchParams,
}: {
	params: Promise<{ locale: string }>
	searchParams: Promise<{ d?: string }>
}) {
	const { locale: loc } = await params
	const locale = isValidLocale(loc) ? loc : defaultLocale
	const { d } = await searchParams
	return <DealView dealRef={d} locale={locale} />
}
