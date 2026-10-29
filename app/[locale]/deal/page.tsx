import type { Metadata } from "next"
import { isValidLocale, defaultLocale } from "@/lib/i18n"
import { verifyDeal, computeDealTotals } from "@/lib/deal"
import { dealPhoto } from "@/lib/deal-photos"
import DealCheckout from "@/components/DealCheckout"

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
	const deal = verifyDeal(d)

	if (!deal) {
		return (
			<main className="deal-page">
				<div className="deal-wrap">
					<div className="deal-invalid">
						<h1>Enlace no válido</h1>
						<p>Este enlace de reserva no es válido o ya venció. Escríbenos por WhatsApp y te compartimos uno nuevo.</p>
					</div>
				</div>
			</main>
		)
	}

	const totals = computeDealTotals(deal)
	const view = {
		title: deal.title,
		subtitle: deal.subtitle,
		lines: deal.lines,
		totalMxn: totals.totalMxn,
		depositMxn: totals.depositMxn,
		remainingMxn: totals.remainingMxn,
		rate: totals.rate,
		includes: deal.includes,
		excludes: deal.excludes,
		note: deal.note,
		photos: (deal.photos ?? [])
			.map((k) => dealPhoto(k))
			.filter((p): p is NonNullable<typeof p> => !!p)
			.map((p) => ({ src: p.src, label: p.label })),
	}

	return (
		<main className="deal-page">
			<DealCheckout deal={view} token={d as string} locale={locale} />
		</main>
	)
}
