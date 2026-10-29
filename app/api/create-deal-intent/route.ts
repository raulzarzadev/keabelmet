import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { folioFromPaymentIntent } from "@/lib/reservation"
import { verifyDeal, computeDealTotals, chunkToken } from "@/lib/deal"

export const runtime = "nodejs"

function bad(error: string, status = 400) {
	return NextResponse.json({ error }, { status })
}
function isEmail(v: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

/**
 * Crea el PaymentIntent del anticipo de un deal personalizado. Re-verifica la
 * firma del token en el servidor y recalcula los montos desde el deal sellado:
 * nunca confía en montos que mande el cliente.
 */
export async function POST(req: NextRequest) {
	let body: unknown
	try {
		body = await req.json()
	} catch {
		return bad("JSON inválido")
	}

	const { token, customerName, customerEmail, customerPhone, locale } = (body ?? {}) as Record<string, unknown>

	const deal = verifyDeal(typeof token === "string" ? token : "")
	if (!deal) return bad("El link del deal no es válido o venció.", 410)

	const name = typeof customerName === "string" ? customerName.trim() : ""
	const emailRaw = typeof customerEmail === "string" ? customerEmail.trim() : ""
	const phone = typeof customerPhone === "string" ? customerPhone.trim() : ""
	if (name.length < 2) return bad("Falta tu nombre")
	if (!isEmail(emailRaw)) return bad("Correo inválido")
	if (phone.length < 7) return bad("Teléfono inválido")

	const { totalMxn, depositMxn, remainingMxn } = computeDealTotals(deal)
	if (depositMxn <= 0) return bad("Total inválido")

	const loc = typeof locale === "string" ? locale : "es"
	const tokenChunks = chunkToken(token as string)

	try {
		const stripe = getStripe()
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(depositMxn * 100),
			currency: "mxn",
			description: `Keabelmet · Anticipo deal · ${deal.title}`.slice(0, 500),
			receipt_email: emailRaw,
			automatic_payment_methods: { enabled: true },
			metadata: {
				kind: "deal",
				...tokenChunks,
				dealTitle: deal.title.slice(0, 120),
				totalMxn: String(totalMxn),
				depositMxn: String(depositMxn),
				remainingMxn: String(remainingMxn),
				customerName: name.slice(0, 120),
				customerEmail: emailRaw.slice(0, 120),
				customerPhone: phone.slice(0, 40),
				locale: loc,
			},
		})

		return NextResponse.json({
			clientSecret: paymentIntent.client_secret,
			paymentIntentId: paymentIntent.id,
			folio: folioFromPaymentIntent(paymentIntent.id),
			totalMxn,
			depositMxn,
			remainingMxn,
		})
	} catch (err) {
		const message = err instanceof Error ? err.message : "Error desconocido"
		console.error("[create-deal-intent] Stripe error:", message)
		return NextResponse.json({ error: "No pudimos iniciar el pago.", detail: message }, { status: 502 })
	}
}
