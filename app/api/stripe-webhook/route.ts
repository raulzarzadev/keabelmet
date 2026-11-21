import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { sendOwnerNotification, sendDepositOwnerNotification, sendDealOwnerNotification } from "@/lib/email"
import { buildCustomerEmail, sendCustomerEmail } from "@/lib/customer-confirmation"
import { recordPaymentIntent } from "@/lib/bookings"

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

		// Panel de reservas: la reserva entra sola (idempotente; no hace nada sin Redis).
		try {
			await recordPaymentIntent(pi)
		} catch (err) {
			console.error("[stripe-webhook] no se pudo registrar en el panel de reservas:", err)
		}

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

		// Correo de confirmación al cliente + aviso interno al dueño. Enviamos ambos;
		// ninguno bloquea al otro. El correo del cliente se arma en
		// lib/customer-confirmation (el panel lo reutiliza para reenviarlo).
		const email = buildCustomerEmail(pi)
		if (!email) {
			if (m.kind === "deal") console.error("[stripe-webhook] deal token inválido en metadata")
			return NextResponse.json({ received: true })
		}
		const owner =
			email.kind === "deposit"
				? sendDepositOwnerNotification(email.data)
				: email.kind === "deal"
					? sendDealOwnerNotification(email.data)
					: sendOwnerNotification({ ...email.data, customerPhone: m.customerPhone || "" })
		const [cust, ownerResult] = await Promise.all([sendCustomerEmail(email), owner])
		if (!ownerResult.ok) console.error(`[stripe-webhook] ${email.kind} owner email error:`, ownerResult.error)
		if (cust.ok) await markSent()
		else console.error(`[stripe-webhook] ${email.kind} customer email error:`, cust.error)
	}

	return NextResponse.json({ received: true })
}
