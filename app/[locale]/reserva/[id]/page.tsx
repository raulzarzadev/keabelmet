import Link from "next/link"
import { isValidLocale, defaultLocale } from "@/lib/i18n"
import { getStripe } from "@/lib/stripe"
import { folioFromPaymentIntent } from "@/lib/reservation"
import Voucher, { type VoucherData } from "@/components/Voucher"

export const metadata = {
	title: "Voucher de reserva · Keabelmet",
	robots: { index: false, follow: false },
}

const notFoundCopy: Record<string, { title: string; body: string; home: string }> = {
	es: { title: "No encontramos esa reserva", body: "El enlace puede ser incorrecto o el pago aún no se completó.", home: "Volver al inicio" },
	en: { title: "We couldn't find that reservation", body: "The link may be incorrect or the payment isn't complete yet.", home: "Back to home" },
	fr: { title: "Réservation introuvable", body: "Le lien est peut-être incorrect ou le paiement n'est pas encore terminé.", home: "Retour à l'accueil" },
	zh: { title: "找不到该预订", body: "链接可能有误,或付款尚未完成。", home: "返回首页" },
}

export default async function ReservaPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
	const { locale: loc, id } = await params
	const locale = isValidLocale(loc) ? loc : defaultLocale
	const nf = notFoundCopy[locale] ?? notFoundCopy.es

	let voucher: VoucherData | null = null
	try {
		const stripe = getStripe()
		const pi = await stripe.paymentIntents.retrieve(id)
		const m = pi.metadata ?? {}
		if ((pi.status === "succeeded" || pi.status === "processing") && m.slug) {
			voucher = {
				folio: folioFromPaymentIntent(pi.id),
				expeditionName: m.expeditionName || m.slug,
				cardName: m.cardName || "",
				dateISO: m.dateISO || "",
				people: Number(m.people) || 1,
				totalMxn: Number(m.totalMxn) || Math.round((pi.amount || 0) / 100),
				locale: m.locale || locale,
				status: pi.status === "processing" ? "processing" : "succeeded",
			}
		}
	} catch {
		voucher = null
	}

	return (
		<main className="reserva-page">
			<div className="reserva-card">
				{voucher ? (
					<Voucher data={voucher} />
				) : (
					<div className="voucher">
						<div className="voucher-ic wait">…</div>
						<h3 className="voucher-title">{nf.title}</h3>
						<p className="voucher-lead">{nf.body}</p>
						<Link href={`/${locale}`} className="btn btn-teal voucher-wa">{nf.home}</Link>
					</div>
				)}
			</div>
		</main>
	)
}
