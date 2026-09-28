import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { folioFromPaymentIntent } from "@/lib/reservation"
import { sendClientReminder, sendOwnerReminder } from "@/lib/reminder-email"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Recordatorios: días antes del tour en que se avisa.
const OWNER_OFFSETS = [7, 2, 1]
const CLIENT_OFFSETS = [7, 1]
const ALL_OFFSETS = Array.from(new Set([...OWNER_OFFSETS, ...CLIENT_OFFSETS])) // [7,2,1]

// Fecha "hoy" en horario de Baja California Sur (UTC-7, sin horario de verano).
function bcsToday(): string {
	const d = new Date(Date.now() - 7 * 3600 * 1000)
	return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`
}

function addDaysISO(iso: string, n: number): string {
	const [y, m, d] = iso.split("-").map(Number)
	const dt = new Date(Date.UTC(y, m - 1, d + n))
	return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`
}

async function searchByDate(stripe: Stripe, dateISO: string): Promise<Stripe.PaymentIntent[]> {
	const out: Stripe.PaymentIntent[] = []
	const query = `status:'succeeded' AND metadata['dateISO']:'${dateISO}'`
	let page = await stripe.paymentIntents.search({ query, limit: 100 })
	out.push(...page.data)
	while (page.has_more && page.next_page) {
		page = await stripe.paymentIntents.search({ query, limit: 100, page: page.next_page })
		out.push(...page.data)
	}
	return out
}

export async function POST(req: NextRequest) {
	return run(req)
}
// Vercel Cron invoca por GET.
export async function GET(req: NextRequest) {
	return run(req)
}

async function run(req: NextRequest) {
	// Seguridad: si hay CRON_SECRET, exige el header que manda Vercel Cron.
	const secret = process.env.CRON_SECRET
	if (secret) {
		const auth = req.headers.get("authorization")
		if (auth !== `Bearer ${secret}`) {
			return NextResponse.json({ error: "no autorizado" }, { status: 401 })
		}
	}

	const stripe = getStripe()
	const today = bcsToday()
	const summary: { date: string; ownerSent: number; clientSent: number; errors: string[] } = {
		date: today, ownerSent: 0, clientSent: 0, errors: [],
	}

	for (const offset of ALL_OFFSETS) {
		const targetDate = addDaysISO(today, offset)
		let pis: Stripe.PaymentIntent[]
		try {
			pis = await searchByDate(stripe, targetDate)
		} catch (err) {
			summary.errors.push(`search ${targetDate}: ${err instanceof Error ? err.message : "error"}`)
			continue
		}

		for (const pi of pis) {
			const m = pi.metadata ?? {}
			if (!m.slug || !m.customerEmail) continue

			const reservation = {
				folio: folioFromPaymentIntent(pi.id),
				paymentIntentId: pi.id,
				slug: m.slug,
				expeditionName: m.expeditionName || m.slug,
				cardName: m.cardName || "",
				dateISO: m.dateISO || targetDate,
				people: Number(m.people) || 1,
				totalMxn: Number(m.totalMxn) || Math.round((pi.amount || 0) / 100),
				rideAddon: m.rideAddon === "true",
				customerName: m.customerName || "",
				customerEmail: m.customerEmail,
				customerPhone: m.customerPhone || "",
				locale: m.locale || "es",
			}

			const marks: Record<string, string> = {}

			// Aviso al dueño (7, 2, 1 días antes), idempotente por metadata.
			if (OWNER_OFFSETS.includes(offset) && m[`remOwn${offset}`] !== "1") {
				const r = await sendOwnerReminder(reservation, offset)
				if (r.ok) { marks[`remOwn${offset}`] = "1"; summary.ownerSent++ }
				else summary.errors.push(`owner ${pi.id} d${offset}: ${r.error}`)
			}

			// Recordatorio al cliente (7, 1 días antes), idempotente por metadata.
			if (CLIENT_OFFSETS.includes(offset) && m[`remCli${offset}`] !== "1") {
				const r = await sendClientReminder(reservation, offset)
				if (r.ok) { marks[`remCli${offset}`] = "1"; summary.clientSent++ }
				else summary.errors.push(`client ${pi.id} d${offset}: ${r.error}`)
			}

			if (Object.keys(marks).length > 0) {
				try {
					await stripe.paymentIntents.update(pi.id, { metadata: { ...m, ...marks } })
				} catch {
					/* no bloqueamos el proceso por un fallo al marcar */
				}
			}
		}
	}

	return NextResponse.json({ ok: true, ...summary })
}
