import { NextRequest, NextResponse } from "next/server"
import ExcelJS from "exceljs"
import { kvConfigured, listBookings, replaceImported, saveBookings, setSince, type Booking } from "@/lib/bookings"
import { parseBookingsWorkbook } from "@/lib/bookings-excel"
import { isBudgetWorkbook, parseBudgetWorkbook } from "@/lib/budget-excel"
import { replaceImportedFinance, saveFinSettings } from "@/lib/finance"
import { isReservasRequest } from "@/lib/reservas-auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Importa un Excel del equipo. Reconoce dos formatos:
 *  - Excel de actividades (MES, NOMBRE, ACTIVIDAD…): reemplaza lo importado antes de ese
 *    Excel y fija `since` (fecha del archivo) para la sincronización con Stripe.
 *  - Libro de presupuesto (hojas Ingresos / Gastos / Inventario / Reparto): agrega las
 *    ventas pasadas con su costo, los gastos, el inventario y los % de reparto. Las ventas
 *    que ya están en el panel (mismo día y expedición) no se duplican: solo les pone el costo.
 */
export async function POST(req: NextRequest) {
	if (!isReservasRequest(req)) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
	if (!kvConfigured()) return NextResponse.json({ error: "Falta conectar la base de datos" }, { status: 400 })
	const form = await req.formData().catch(() => null)
	const file = form?.get("file")
	if (!file || typeof file === "string") return NextResponse.json({ error: "Falta el archivo" }, { status: 400 })
	if (file.size > 15 * 1024 * 1024) return NextResponse.json({ error: "El archivo pesa más de 15 MB" }, { status: 400 })

	const wb = new ExcelJS.Workbook()
	try {
		await wb.xlsx.load(await file.arrayBuffer())
	} catch {
		return NextResponse.json({ error: "No pude abrir el archivo. ¿Es un .xlsx?" }, { status: 400 })
	}

	try {
		if (isBudgetWorkbook(wb)) return NextResponse.json(await importBudget(wb))
		const sinceMs = Number(form?.get("since")) || Date.now()
		const { bookings, warnings } = parseBookingsWorkbook(wb)
		await replaceImported(bookings, "excel")
		await setSince(Math.min(sinceMs, Date.now()) / 1000)
		return NextResponse.json({ ok: true, kind: "actividades", imported: bookings.length, warnings })
	} catch (err) {
		return NextResponse.json({ error: err instanceof Error ? err.message : "No pude leer el Excel" }, { status: 400 })
	}
}

async function importBudget(wb: ExcelJS.Workbook) {
	const data = parseBudgetWorkbook(wb)
	const existing = (await listBookings()).filter((b) => b.source !== "presupuesto")
	// Desde aquí el panel ya tiene las reservas (Excel de actividades / página / a mano).
	const panelStart = existing.map((b) => b.dateISO).sort()[0] ?? "9999-12-31"

	const toAdd: Booking[] = []
	const updated = new Map<string, Booking>()
	const skipped: string[] = []
	for (const p of data.bookings) {
		if (p.dateISO < panelStart) {
			toAdd.push(p)
			continue
		}
		// Ya está en el panel: solo le ponemos el costo y el proveedor a la reserva que corresponde.
		const same = existing.filter((b) => b.status === "active" && b.dateISO === p.dateISO && b.activity === p.activity && (b.cost === null || b.cost === undefined) && !updated.has(b.id))
		const match = same.length === 1 ? same[0] : same.find((b) => b.people === p.people)
		if (match) {
			updated.set(match.id, { ...match, cost: p.cost ?? null, captain: match.captain || p.captain, updatedAt: Date.now() })
		} else {
			skipped.push(`${p.dateISO} ${p.activityLabel} (${p.name})`)
		}
	}

	await replaceImported(toAdd, "presupuesto")
	await saveBookings([...updated.values()])
	await replaceImportedFinance(data.expenses, data.inventory)
	if (data.settings) await saveFinSettings(data.settings)

	const warnings = [...data.warnings]
	if (skipped.length) warnings.push(`Ya estaban en el panel y no supe a cuál reserva ponerle el costo: ${skipped.join("; ")}. Captúralo en la reserva.`)
	return {
		ok: true,
		kind: "presupuesto",
		imported: toAdd.length,
		costs: updated.size,
		expenses: data.expenses.length,
		inventory: data.inventory.length,
		reparto: !!data.settings,
		warnings,
	}
}
