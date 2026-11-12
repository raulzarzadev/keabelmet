import { NextRequest, NextResponse } from "next/server"
import { kvConfigured, listBookings } from "@/lib/bookings"
import { buildBookingsExcel } from "@/lib/bookings-excel"
import { isReservasRequest } from "@/lib/reservas-auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const YM = /^\d{4}-\d{2}$/

/** Descarga el Excel de reservas (?from=2026-11&to=2027-01) con el formato del equipo. */
export async function GET(req: NextRequest) {
	if (!isReservasRequest(req)) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
	if (!kvConfigured()) return NextResponse.json({ error: "Falta conectar la base de datos" }, { status: 400 })
	const from = req.nextUrl.searchParams.get("from") ?? ""
	const to = req.nextUrl.searchParams.get("to") ?? from
	if (!YM.test(from) || !YM.test(to) || to < from) return NextResponse.json({ error: "Rango inválido" }, { status: 400 })
	const buf = await buildBookingsExcel(await listBookings(), from, to)
	return new NextResponse(buf, {
		headers: {
			"Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"Content-Disposition": `attachment; filename="Reservas Keabelmet ${from} a ${to}.xlsx"`,
			"Cache-Control": "no-store",
		},
	})
}
