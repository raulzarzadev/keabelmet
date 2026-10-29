import { NextRequest, NextResponse } from "next/server"
import { signDeal, computeDealTotals, safeKeyEqual, MAX_DEAL_LINES, DEAL_DEPOSIT_RATE, type Deal, type DealLine } from "@/lib/deal"
import { sanitizePhotoKeys } from "@/lib/deal-photos"

export const runtime = "nodejs"

function bad(error: string, status = 400) {
	return NextResponse.json({ error }, { status })
}

/**
 * Genera un link firmado para un deal personalizado. Solo quien conoce
 * DEAL_ADMIN_KEY puede llamarla (el editor). Nunca expone la clave de firma.
 */
export async function POST(req: NextRequest) {
	const admin = process.env.DEAL_ADMIN_KEY
	if (!admin) return bad("Falta configurar DEAL_ADMIN_KEY en el servidor.", 500)

	let body: unknown
	try {
		body = await req.json()
	} catch {
		return bad("JSON inválido")
	}

	const { adminKey, deal } = (body ?? {}) as Record<string, unknown>
	if (typeof adminKey !== "string" || !safeKeyEqual(adminKey, admin)) return bad("Contraseña incorrecta", 401)

	const d = (deal ?? {}) as Record<string, unknown>
	const title = typeof d.title === "string" ? d.title.trim() : ""
	if (title.length < 2) return bad("Falta el título del deal")

	const rawLines = Array.isArray(d.lines) ? d.lines : []
	const lines: DealLine[] = rawLines
		.map((l) => {
			const li = (l ?? {}) as Record<string, unknown>
			return { label: typeof li.label === "string" ? li.label.trim() : "", amountMxn: Math.round(Number(li.amountMxn)) }
		})
		.filter((l) => l.label.length > 0 && Number.isFinite(l.amountMxn) && l.amountMxn > 0)
	if (!lines.length) return bad("Agrega al menos un concepto con su monto")
	if (lines.length > MAX_DEAL_LINES) return bad(`Máximo ${MAX_DEAL_LINES} conceptos`)

	const rate = Number(d.depositRate)
	const depositRate = Number.isFinite(rate) && rate > 0 && rate <= 1 ? rate : DEAL_DEPOSIT_RATE

	const str = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined)

	const built: Deal = {
		v: 1,
		title: title.slice(0, 160),
		subtitle: str(d.subtitle, 200),
		lines,
		depositRate,
		startISO: str(d.startISO, 10),
		endISO: str(d.endISO, 10),
		includes: str(d.includes, 1200),
		excludes: str(d.excludes, 1200),
		note: str(d.note, 600),
		photos: sanitizePhotoKeys(d.photos),
		exp: Number.isFinite(Number(d.exp)) && Number(d.exp) > 0 ? Number(d.exp) : undefined,
	}

	const token = signDeal(built)
	const totals = computeDealTotals(built)
	return NextResponse.json({ token, totals, title: built.title })
}
