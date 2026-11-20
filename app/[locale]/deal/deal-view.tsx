import { verifyDeal, computeDealTotals, loadDealToken } from "@/lib/deal"
import { dealPhoto } from "@/lib/deal-photos"
import DealCheckout from "@/components/DealCheckout"

const invalidCopy: Record<string, { title: string; text: string }> = {
	es: { title: "Enlace no válido", text: "Este enlace de reserva no es válido o ya venció. Escríbenos por WhatsApp y te compartimos uno nuevo." },
	en: { title: "Invalid link", text: "This booking link is not valid or has expired. Message us on WhatsApp and we'll send you a new one." },
	fr: { title: "Lien non valide", text: "Ce lien de réservation n'est pas valide ou a expiré. Écrivez-nous sur WhatsApp et nous vous en enverrons un nouveau." },
	zh: { title: "链接无效", text: "此预订链接无效或已过期。请通过 WhatsApp 联系我们，我们会发给您新的链接。" },
	ca: { title: "Enllaç no vàlid", text: "Aquest enllaç de reserva no és vàlid o ha caducat. Escriu-nos per WhatsApp i te'n enviarem un de nou." },
}

/**
 * Página del deal. Acepta el token firmado (links largos, ?d=<token>) o el id
 * corto guardado en Redis (/deal/<id>). En ambos casos se verifica la firma.
 */
export default async function DealView({ dealRef, locale }: { dealRef: string | undefined; locale: string }) {
	const token = dealRef && dealRef.includes(".") ? dealRef : await loadDealToken(dealRef)
	const deal = verifyDeal(token)

	if (!deal || !token) {
		const t = invalidCopy[locale] ?? invalidCopy.es
		return (
			<main className="deal-page">
				<div className="deal-wrap">
					<div className="deal-invalid">
						<h1>{t.title}</h1>
						<p>{t.text}</p>
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
			<DealCheckout deal={view} token={token} locale={locale} />
		</main>
	)
}
