/**
 * Excel de reservas con el mismo formato que usa el equipo:
 * bloques por mes (MES | NOMBRE | ACTIVIDAD | PERSONAS | PAGO COMPLETO | ANTICIPO |
 * LIQUIDADO | POR LIQUIDAR | TELEFONO | GUIA | CAPITAN | TRANSPORTE), un renglón por
 * día y uno extra por cada reserva adicional de ese día.
 */
import ExcelJS from "exceljs"
import { guessActivity, newId, type Booking, type Cell } from "@/lib/bookings"

export const HEADERS = ["MES", "NOMBRE", "ACTIVIDAD", "PERSONAS", "PAGO COMPLETO", "ANTICIPO", "LIQUIDADO", "POR LIQUIDAR", "TELEFONO", "GUIA", "CAPITAN", "TRANSPORTE"]
const WIDTHS = [8, 22, 35, 11, 17, 11, 11, 14, 16, 12, 16, 13]
export const MONTH_NAMES = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]

function cellValue(v: ExcelJS.CellValue): Cell {
	if (v === null || v === undefined) return null
	if (typeof v === "number") return v
	if (typeof v === "string") return v.trim() || null
	if (typeof v === "boolean") return v ? "si" : "no"
	if (v instanceof Date) return v.toISOString().slice(0, 10)
	const o = v as { result?: unknown; text?: unknown; richText?: { text: string }[] }
	if (o.richText) return o.richText.map((r) => r.text).join("").trim() || null
	if (typeof o.result === "number" || typeof o.result === "string") return o.result
	if (typeof o.text === "string") return o.text.trim() || null
	return null
}

const txt = (c: Cell) => (c === null ? "" : String(c).trim())

/** Lee el Excel del equipo y devuelve reservas (fuente "excel"). */
export async function parseBookingsExcel(data: ArrayBuffer, today = new Date()): Promise<{ bookings: Booking[]; warnings: string[] }> {
	const wb = new ExcelJS.Workbook()
	await wb.xlsx.load(data)
	const ws = wb.worksheets[0]
	if (!ws) throw new Error("El archivo no tiene hojas")
	const warnings: string[] = []
	const out: Booking[] = []
	const curMonth = today.getMonth() + 1
	const curYear = today.getFullYear()
	let month = 0
	let year = curYear
	const now = Date.now()

	ws.eachRow({ includeEmpty: false }, (row, i) => {
		const a = cellValue(row.getCell(1).value)
		const label = typeof a === "string" ? a.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "") : ""
		const mIdx = MONTH_NAMES.indexOf(label)
		if (mIdx >= 0) {
			month = mIdx + 1
			// Meses que ya pasaron hace más de 3 meses son del año siguiente (p. ej. ENERO visto en noviembre).
			year = month < curMonth - 3 ? curYear + 1 : curYear
			return
		}
		if (label === "MES") return
		const name = txt(cellValue(row.getCell(2).value))
		if (!name) return
		const day = typeof a === "number" ? a : Number(a)
		if (!month || !Number.isInteger(day) || day < 1 || day > 31) {
			warnings.push(`Renglón ${i}: no supe la fecha de "${name}"`)
			return
		}
		const activityText = txt(cellValue(row.getCell(3).value))
		const people = Number(cellValue(row.getCell(4).value)) || 0
		const transport = txt(cellValue(row.getCell(12).value)).toLowerCase()
		out.push({
			id: newId("x"),
			source: "excel",
			dateISO: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
			activity: guessActivity(activityText),
			activityLabel: activityText || "Actividad",
			name,
			people,
			phone: txt(cellValue(row.getCell(9).value)),
			email: "",
			paidFull: cellValue(row.getCell(5).value),
			deposit: cellValue(row.getCell(6).value),
			settled: cellValue(row.getCell(7).value),
			balance: cellValue(row.getCell(8).value),
			guide: txt(cellValue(row.getCell(10).value)),
			captain: txt(cellValue(row.getCell(11).value)),
			transport: transport.startsWith("s") ? "si" : transport === "no" ? "no" : "",
			notes: "",
			status: "active",
			createdAt: now + i,
			updatedAt: now,
		})
	})
	if (!out.length) warnings.push("No encontré reservas. ¿Es el Excel con columnas MES, NOMBRE, ACTIVIDAD…?")
	return { bookings: out, warnings }
}

/** Genera el Excel para los meses [desde, hasta] (yyyy-mm). */
export async function buildBookingsExcel(bookings: Booking[], fromYm: string, toYm: string): Promise<ArrayBuffer> {
	const wb = new ExcelJS.Workbook()
	wb.creator = "Keabelmet"
	const ws = wb.addWorksheet("Hoja1")
	ws.columns = WIDTHS.map((width) => ({ width }))
	const bold = { bold: true }
	const active = bookings.filter((b) => b.status === "active")

	let [y, m] = fromYm.split("-").map(Number)
	const [ty, tm] = toYm.split("-").map(Number)
	let guard = 0
	while ((y < ty || (y === ty && m <= tm)) && guard++ < 24) {
		const head = ws.addRow(HEADERS)
		head.font = bold
		const mRow = ws.addRow([MONTH_NAMES[m - 1]])
		mRow.font = bold
		const days = new Date(Date.UTC(y, m, 0)).getUTCDate()
		for (let d = 1; d <= days; d++) {
			const iso = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
			const list = active.filter((b) => b.dateISO === iso)
			if (!list.length) {
				ws.addRow([d])
				continue
			}
			for (const b of list) {
				ws.addRow([d, b.name, b.activityLabel, b.people || null, b.paidFull, b.deposit, b.settled, b.balance, b.phone, b.guide || null, b.captain || null, b.transport || null])
			}
		}
		ws.addRow([])
		m++
		if (m > 12) {
			m = 1
			y++
		}
	}
	return (await wb.xlsx.writeBuffer()) as ArrayBuffer
}
