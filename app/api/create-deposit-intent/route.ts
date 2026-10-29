import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { folioFromPaymentIntent } from "@/lib/reservation"
import { DEPOSIT_RATE, MAX_DEPOSIT_ITEMS, computeDeposit, packItems, validateDepositItem } from "@/lib/deposit"

function bad(error: string, status = 400) {
	return NextResponse.json({ error }, { status })
}

function isEmail(v: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export async function POST(req: NextRequest) {
	let body: unknown
	try {
		body = await req.json()
	} catch {
		return bad("JSON inválido")
	}

	const { items, customerName, customerEmail, customerPhone, locale } = (body ?? {}) as Record<string, unknown>

	if (!Array.isArray(items) || items.length === 0) return bad("Agrega al menos una actividad")
	if (items.length > MAX_DEPOSIT_ITEMS) return bad(`Máximo ${MAX_DEPOSIT_ITEMS} actividades por reserva`)

	let validated
	try {
		validated = items.map(validateDepositItem)
	} catch (err) {
		return bad(err instanceof Error ? err.message : "Actividad inválida")
	}

	const name = typeof customerName === "string" ? customerName.trim() : ""
	const emailRaw = typeof customerEmail === "string" ? customerEmail.trim() : ""
	const phone = typeof customerPhone === "string" ? customerPhone.trim() : ""
	if (name.length < 2) return bad("Falta tu nombre")
	if (!isEmail(emailRaw)) return bad("Correo inválido")
	if (phone.length < 7) return bad("Teléfono inválido")

	const loc = typeof locale === "string" ? locale : "es"
	const { subtotalMxn, discountMxn, totalMxn, depositMxn, remainingMxn, packages } = computeDeposit(
		validated,
		loc as Parameters<typeof computeDeposit>[1],
	)
	if (depositMxn <= 0) return bad("Total inválido")

	const packed = packItems(validated)
	if (packed.length > 480) return bad("Demasiadas actividades; divídelas en dos reservas")
	// Resumen compacto de paquetes aplicados para la metadata (p. ej. "semana-baja:1065").
	const packagesMeta = packages.map((p) => `${p.id}:${p.discountMxn}`).join(",").slice(0, 200)

	try {
		const stripe = getStripe()
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(depositMxn * 100),
			currency: "mxn",
			description: `Keabelmet · Anticipo ${Math.round(DEPOSIT_RATE * 100)}% · ${validated.length} actividad(es)`.slice(0, 500),
			receipt_email: emailRaw,
			automatic_payment_methods: { enabled: true },
			metadata: {
				kind: "deposit",
				items: packed,
				itemCount: String(validated.length),
				subtotalMxn: String(subtotalMxn),
				discountMxn: String(discountMxn),
				packages: packagesMeta,
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
			subtotalMxn,
			discountMxn,
			totalMxn,
			depositMxn,
			remainingMxn,
		})
	} catch (err) {
		const message = err instanceof Error ? err.message : "Error desconocido"
		console.error("[create-deposit-intent] Stripe error:", message)
		return NextResponse.json({ error: "No pudimos iniciar el pago.", detail: message }, { status: 502 })
	}
}
