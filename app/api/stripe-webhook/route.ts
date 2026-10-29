import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { folioFromPaymentIntent } from "@/lib/reservation"
import { sendReservationEmail, sendOwnerNotification, sendDepositEmail, sendDepositOwnerNotification, sendDealEmail, sendDealOwnerNotification, type DepositEmailData, type DealEmailData } from "@/lib/email"
import { unpackItems, activityName } from "@/lib/deposit"
import { unchunkToken, verifyDeal, computeDealTotals } from "@/lib/deal"
import { dealPhoto } from "@/lib/deal-photos"
import { SITE_URL } from "@/lib/email"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
	const secret = process.env.STRIPE_WEBHOOK_SECRET
	if (!secret) {
		console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET no configurado")
		return NextResponse.json({ error: "webhook no configurado" }, { status: 500 })
	}

	const sig = req.headers.get("stripe-signature")
	const body = await req.text()

	let event: Stripe.Event
	const stripe = getStripe()
	try {
		event = stripe.webhooks.constructEvent(body, sig ?? "", secret)
	} catch (err) {
		const message = err instanceof Error ? err.message : "invalid"
		console.error("[stripe-webhook] firma inválida:", message)
		return NextResponse.json({ error: "firma inválida" }, { status: 400 })
	}

	if (event.type === "payment_intent.succeeded") {
		let pi = event.data.object as Stripe.PaymentIntent

		// Con el estilo de payload "Resumen" (thin), el objeto del evento puede
		// llegar sin metadata completa. Releemos el PaymentIntent desde Stripe
		// para garantizar que el correo tenga todos los datos de la reserva.
		if (!pi.metadata?.slug) {
			try {
				pi = await stripe.paymentIntents.retrieve(pi.id)
			} catch (err) {
				console.error("[stripe-webhook] no se pudo releer el PaymentIntent:", err)
			}
		}

		const m = pi.metadata ?? {}

		// Evita correos duplicados si Stripe reintenta el evento.
		if (m.emailSent === "1" || !m.customerEmail) {
			return NextResponse.json({ received: true })
		}

		const markSent = async () => {
			try {
				await stripe.paymentIntents.update(pi.id, { metadata: { ...m, emailSent: "1" } })
			} catch {
				/* no bloqueamos por esto */
			}
		}

		// --- Reserva con anticipo (multi-actividad): voucher de bienvenida ---
		if (m.kind === "deposit") {
			const locale = m.locale || "es"
			const items = unpackItems(m.items).map((p) => ({
				slug: p.slug,
				expeditionName: activityName(p.slug, locale),
				dateISO: p.dateISO,
				people: p.people,
				subtotalMxn: p.unitAmountMxn * p.people,
			}))
			const dep: DepositEmailData = {
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
			}
			const [cust, owner] = await Promise.all([sendDepositEmail(dep), sendDepositOwnerNotification(dep)])
			if (!owner.ok) console.error("[stripe-webhook] deposit owner email error:", owner.error)
			if (cust.ok) await markSent()
			else console.error("[stripe-webhook] deposit customer email error:", cust.error)
			return NextResponse.json({ received: true })
		}

		// --- Deal personalizado (precios negociados): voucher de bienvenida ---
		if (m.kind === "deal") {
			const deal = verifyDeal(unchunkToken(m))
			if (!deal) {
				console.error("[stripe-webhook] deal token inválido en metadata")
				return NextResponse.json({ received: true })
			}
			const totals = computeDealTotals(deal)
			const dealData: DealEmailData = {
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
			}
			const [cust, owner] = await Promise.all([sendDealEmail(dealData), sendDealOwnerNotification(dealData)])
			if (!owner.ok) console.error("[stripe-webhook] deal owner email error:", owner.error)
			if (cust.ok) await markSent()
			else console.error("[stripe-webhook] deal customer email error:", cust.error)
			return NextResponse.json({ received: true })
		}

		// --- Reserva de una sola actividad (flujo original) ---
		if (!m.slug) {
			return NextResponse.json({ received: true })
		}

		const reservation = {
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
		}

		// Correo de confirmación al cliente + aviso interno al dueño (con invitación
		// de calendario). Enviamos ambos; ninguno bloquea al otro.
		const [result, ownerResult] = await Promise.all([
			sendReservationEmail(reservation),
			sendOwnerNotification({ ...reservation, customerPhone: m.customerPhone || "" }),
		])

		if (!ownerResult.ok) {
			console.error("[stripe-webhook] error enviando aviso al dueño:", ownerResult.error)
		}

		if (result.ok) {
			try {
				await stripe.paymentIntents.update(pi.id, { metadata: { ...m, emailSent: "1" } })
			} catch {
				/* no bloqueamos por esto */
			}
		} else {
			console.error("[stripe-webhook] error enviando correo:", result.error)
		}
	}

	return NextResponse.json({ received: true })
}
