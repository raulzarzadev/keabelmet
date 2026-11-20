import type Stripe from "stripe"
import { folioFromPaymentIntent } from "@/lib/reservation"
import { sendReservationEmail, sendDepositEmail, sendDealEmail, SITE_URL, type DepositEmailData, type DealEmailData } from "@/lib/email"
import { unpackItems, activityName } from "@/lib/deposit"
import { unchunkToken, verifyDeal, computeDealTotals } from "@/lib/deal"
import { dealPhoto } from "@/lib/deal-photos"
import { rideAddonMxn, rideRoute } from "@/lib/ride-addon"
import { optionLabel } from "@/lib/bookable-activities"

/**
 * Arma el correo de confirmación al cliente a partir de un PaymentIntent, para
 * los tres tipos de pago del sitio: reserva de una actividad, anticipo de varias
 * actividades y deal personalizado. Lo usan el webhook de Stripe (correo al
 * pagar) y el panel de reservas (botón "Reenviar confirmación").
 */
const RIDE_WORD: Record<string, string> = { es: "transporte", en: "transport", fr: "transfert", zh: "接送", ca: "transport" }

export type ReservationEmailData = Parameters<typeof sendReservationEmail>[0]

export type CustomerEmail =
	| { kind: "deposit"; data: DepositEmailData }
	| { kind: "deal"; data: DealEmailData }
	| { kind: "single"; data: ReservationEmailData }

export function buildCustomerEmail(pi: Stripe.PaymentIntent): CustomerEmail | null {
	const m = pi.metadata ?? {}
	if (!m.customerEmail) return null

	if (m.kind === "deposit") {
		const locale = m.locale || "es"
		const items = unpackItems(m.items).map((p) => ({
			slug: p.slug,
			expeditionName:
				activityName(p.slug, locale) +
				(optionLabel(p.slug, p.unitAmountMxn, locale) ? ` — ${optionLabel(p.slug, p.unitAmountMxn, locale)}` : "") +
				(p.ride ? ` + ${RIDE_WORD[locale] ?? RIDE_WORD.es} ${rideRoute(p.slug, locale)}` : ""),
			dateISO: p.dateISO,
			people: p.people,
			subtotalMxn: p.unitAmountMxn * p.people + (p.ride ? rideAddonMxn(p.slug, p.people) : 0),
		}))
		return {
			kind: "deposit",
			data: {
				folio: folioFromPaymentIntent(pi.id),
				paymentIntentId: pi.id,
				customerName: m.customerName || "",
				customerEmail: m.customerEmail,
				customerPhone: m.customerPhone || "",
				locale,
				items,
				subtotalMxn: Number(m.subtotalMxn) || undefined,
				discountMxn: Number(m.discountMxn) || undefined,
				totalMxn: Number(m.totalMxn) || 0,
				depositMxn: Number(m.depositMxn) || Math.round((pi.amount || 0) / 100),
				remainingMxn: Number(m.remainingMxn) || 0,
			},
		}
	}

	if (m.kind === "deal") {
		const deal = verifyDeal(unchunkToken(m))
		if (!deal) return null
		const totals = computeDealTotals(deal)
		return {
			kind: "deal",
			data: {
				folio: folioFromPaymentIntent(pi.id),
				paymentIntentId: pi.id,
				customerName: m.customerName || "",
				customerEmail: m.customerEmail,
				customerPhone: m.customerPhone || "",
				locale: m.locale || "es",
				title: deal.title,
				subtitle: deal.subtitle,
				lines: deal.lines.map((l) => ({ label: l.label, amountMxn: l.amountMxn })),
				totalMxn: totals.totalMxn,
				depositMxn: totals.depositMxn,
				remainingMxn: totals.remainingMxn,
				rate: totals.rate,
				includes: deal.includes,
				excludes: deal.excludes,
				note: deal.note,
				startISO: deal.startISO,
				endISO: deal.endISO,
				photos: (deal.photos ?? [])
					.map((k) => dealPhoto(k))
					.filter((p): p is NonNullable<typeof p> => !!p)
					.map((p) => ({ src: `${SITE_URL}${p.src}`, label: p.label })),
			},
		}
	}

	if (!m.slug) return null
	return {
		kind: "single",
		data: {
			folio: folioFromPaymentIntent(pi.id),
			paymentIntentId: pi.id,
			slug: m.slug,
			expeditionName: m.expeditionName || m.slug,
			cardName: m.cardName || "",
			dateISO: m.dateISO || "",
			people: Number(m.people) || 1,
			totalMxn: Number(m.totalMxn) || Math.round((pi.amount || 0) / 100),
			rideAddon: m.rideAddon === "true",
			customerName: m.customerName || "",
			customerEmail: m.customerEmail,
			locale: m.locale || "es",
		},
	}
}

/** Envía (o reenvía) solo el correo del cliente. */
export async function sendCustomerEmail(email: CustomerEmail): Promise<{ ok: boolean; id?: string; error?: string }> {
	if (email.kind === "deposit") return sendDepositEmail(email.data)
	if (email.kind === "deal") return sendDealEmail(email.data)
	return sendReservationEmail(email.data)
}
