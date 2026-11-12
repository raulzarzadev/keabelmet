import { NextRequest, NextResponse } from "next/server"
import { kvConfigured, replaceImported, setSince } from "@/lib/bookings"
import { parseBookingsExcel } from "@/lib/bookings-excel"
import { isReservasRequest } from "@/lib/reservas-auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Importa el Excel del equipo. Reemplaza lo importado antes (no toca reservas
 * agregadas en el panel ni las que llegaron de la página después). `since` es la
 * fecha del archivo: los pagos de la página anteriores a ella ya venían en el Excel.
 */
export async function POST(req: NextRequest) {
	if (!isReservasRequest(req)) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
	if (!kvConfigured()) return NextResponse.json({ error: "Falta conectar la base de datos" }, { status: 400 })
	const form = await req.formData().catch(() => null)
	const file = form?.get("file")
	if (!file || typeof file === "string") return NextResponse.json({ error: "Falta el archivo" }, { status: 400 })
	if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "El archivo pesa más de 5 MB" }, { status: 400 })

	const sinceMs = Number(form?.get("since")) || Date.now()
	try {
		const { bookings, warnings } = await parseBookingsExcel(await file.arrayBuffer())
		await replaceImported(bookings)
		await setSince(Math.min(sinceMs, Date.now()) / 1000)
		return NextResponse.json({ ok: true, imported: bookings.length, warnings })
	} catch (err) {
		return NextResponse.json({ error: err instanceof Error ? err.message : "No pude leer el Excel" }, { status: 400 })
	}
}
