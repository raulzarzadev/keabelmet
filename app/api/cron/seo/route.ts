import { NextRequest, NextResponse } from "next/server"
import { runRadar } from "@/lib/ai-radar"
import { indexNowSync } from "@/lib/indexnow"
import { kvConfigured } from "@/lib/kv"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 300

/**
 * Tarea diaria de buscadores:
 * 1) avisa a Bing (IndexNow) si hubo una publicación nueva;
 * 2) corre las preguntas del radar de IA que no se revisaron en la última semana.
 */
async function run(req: NextRequest) {
	const secret = process.env.CRON_SECRET
	if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
		return NextResponse.json({ error: "no autorizado" }, { status: 401 })
	}
	if (!kvConfigured()) return NextResponse.json({ error: "Falta conectar la base de datos" }, { status: 500 })

	const out: Record<string, unknown> = {}
	try {
		out.indexnow = await indexNowSync()
	} catch (err) {
		out.indexnow = { error: err instanceof Error ? err.message : "error" }
	}
	if (process.env.ANTHROPIC_API_KEY) {
		try {
			out.radar = await runRadar()
		} catch (err) {
			out.radar = { error: err instanceof Error ? err.message : "error" }
		}
	} else {
		out.radar = { skipped: "falta ANTHROPIC_API_KEY" }
	}
	return NextResponse.json(out)
}

export async function GET(req: NextRequest) {
	return run(req)
}
export async function POST(req: NextRequest) {
	return run(req)
}
