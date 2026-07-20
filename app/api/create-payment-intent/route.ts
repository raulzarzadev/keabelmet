import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { isValidPrice } from "@/lib/pricing-catalog"

export async function POST(req: NextRequest) {
	let body: unknown
	try {
		body = await req.json()
	} catch {
		return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
	}

	const { slug, amountMxn, cardName, expeditionName } = (body ?? {}) as Record<string, unknown>

	if (typeof slug !== "string" || !slug) {
		return NextResponse.json({ error: "Falta slug" }, { status: 400 })
	}
	if (typeof amountMxn !== "number" || !Number.isFinite(amountMxn) || amountMxn <= 0) {
		return NextResponse.json({ error: "Monto inválido" }, { status: 400 })
	}
	if (!isValidPrice(slug, amountMxn)) {
		return NextResponse.json({ error: "El precio no coincide con el catálogo" }, { status: 400 })
	}

	const name = typeof cardName === "string" ? cardName : ""
	const expedition = typeof expeditionName === "string" ? expeditionName : slug
	const description = name ? `${expedition} — ${name}` : expedition

	const stripe = getStripe()
	const paymentIntent = await stripe.paymentIntents.create({
		amount: Math.round(amountMxn * 100),
		currency: "mxn",
		description: `Keabelmet · ${description}`.slice(0, 500),
		automatic_payment_methods: { enabled: true },
		metadata: { slug, cardName: name },
	})

	return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}
