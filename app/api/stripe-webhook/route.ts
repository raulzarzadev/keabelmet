import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { folioFromPaymentIntent } from "@/lib/reservation"
import { sendReservationEmail } from "@/lib/email"

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
		const pi = event.data.object as Stripe.PaymentIntent
		const m = pi.metadata ?? {}

		// Evita correos duplicados si Stripe reintenta el evento.
		if (m.emailSent === "1" || !m.customerEmail || !m.slug) {
			return NextResponse.json({ received: true })
		}

		const result = await sendReservationEmail({
			folio: folioFromPaymentIntent(pi.id),
			paymentIntentId: pi.id,
			expeditionName: m.expeditionName || m.slug,
			cardName: m.cardName || "",
			dateISO: m.dateISO || "",
			people: Number(m.people) || 1,
			totalMxn: Number(m.totalMxn) || Math.round((pi.amount || 0) / 100),
			customerName: m.customerName || "",
			customerEmail: m.customerEmail,
			locale: m.locale || "es",
		})

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
