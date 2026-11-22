import { NextRequest, NextResponse } from "next/server"
import { RADAR_QUERIES, listRadar, runRadar } from "@/lib/ai-radar"
import { indexNowState } from "@/lib/indexnow"
import { kvConfigured } from "@/lib/kv"
import { isReservasRequest } from "@/lib/reservas-auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 300

const noStore = { "Cache-Control": "no-store" }

export async function GET(req: NextRequest) {
	if (!isReservasRequest(req)) return NextResponse.json({ auth: false }, { status: 401, headers: noStore })
	if (!kvConfigured()) return NextResponse.json({ error: "Falta conectar la base de datos" }, { status: 400, headers: noStore })
	const [{ results, history }, indexnow] = await Promise.all([listRadar(), indexNowState()])
	return NextResponse.json({ queries: RADAR_QUERIES, results, history, indexnow }, { headers: noStore })
}

/** "Correr ahora" desde el panel: revisa todas las preguntas (lo que no alcance, sigue mañana). */
export async function POST(req: NextRequest) {
	if (!isReservasRequest(req)) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
	if (!kvConfigured()) return NextResponse.json({ error: "Falta conectar la base de datos" }, { status: 400 })
	if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: "Falta ANTHROPIC_API_KEY en Vercel" }, { status: 400 })
	const r = await runRadar({ force: true, concurrency: 8 })
	return NextResponse.json({ ok: true, ...r })
}
