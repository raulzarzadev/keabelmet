import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { isValidPrice } from "@/lib/pricing-catalog"
import { isDateInSeason, getSeason } from "@/lib/expedition-seasons"
import { folioFromPaymentIntent, MAX_PEOPLE } from "@/lib/reservation"

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

	const {
		slug,
		unitAmountMxn,
		quantity,
		people,
		dateISO,
		customerName,
		customerEmail,
		customerPhone,
		cardName,
		expeditionName,
		locale,
	} = (body ?? {}) as Record<string, unknown>

	// --- Validaciones ---
	if (typeof slug !== "string" || !slug) return bad("Falta slug")
	if (typeof unitAmountMxn !== "number" || !Number.isFinite(unitAmountMxn) || unitAmountMxn <= 0) return bad("Monto inválido")
	if (!isValidPrice(slug, unitAmountMxn)) return bad("El precio no coincide con el catálogo")

	const qty = Number(quantity)
	if (!Number.isInteger(qty) || qty < 1 || qty > MAX_PEOPLE) return bad("Cantidad inválida")

	const season = getSeason(slug)
	const headcount = Number(people)
	if (!Number.isInteger(headcount) || headcount < 1 || headcount > season.maxPeople) return bad("Número de personas inválido")

	if (typeof dateISO !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) return bad("Fecha inválida")
	// La fecha solicitada debe ser a futuro (al menos mañana) y en temporada.
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	const [y, m, d] = dateISO.split("-").map(Number)
	const picked = new Date(y, m - 1, d)
	if (picked.getTime() <= today.getTime()) return bad("Elige una fecha futura")
	if (!isDateInSeason(slug, dateISO)) return bad("Esa fecha está fuera de la temporada de esta expedición")

	const name = typeof customerName === "string" ? customerName.trim() : ""
	const emailRaw = typeof customerEmail === "string" ? customerEmail.trim() : ""
	const phone = typeof customerPhone === "string" ? customerPhone.trim() : ""
	if (name.length < 2) return bad("Falta tu nombre")
	if (!isEmail(emailRaw)) return bad("Correo inválido")
	if (phone.length < 7) return bad("Teléfono inválido")

	const totalMxn = unitAmountMxn * qty
	const expedition = typeof expeditionName === "string" ? expeditionName : slug
	const card = typeof cardName === "string" ? cardName : ""
	const loc = typeof locale === "string" ? locale : "es"

	try {
		const stripe = getStripe()
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(totalMxn * 100),
			currency: "mxn",
			description: `Keabelmet · ${expedition} — ${card}`.slice(0, 500),
			receipt_email: emailRaw,
			automatic_payment_methods: { enabled: true },
			metadata: {
				slug,
				expeditionName: expedition.slice(0, 120),
				cardName: card.slice(0, 120),
				unitAmountMxn: String(unitAmountMxn),
				quantity: String(qty),
				people: String(headcount),
				totalMxn: String(totalMxn),
				dateISO,
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
		})
	} catch (err) {
		const message = err instanceof Error ? err.message : "Error desconocido"
		console.error("[create-payment-intent] Stripe error:", message)
		return NextResponse.json({ error: "No pudimos iniciar el pago.", detail: message }, { status: 502 })
	}
}
