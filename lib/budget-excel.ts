/**
 * Lee el libro "Presupuesto Keabelmet 20XX" tal como lo lleva el equipo:
 *   - Ingresos 20XX: Fecha, Producto o Servicio, Costo Unitario, Cantidad, Costo Total,
 *     Precio Unitario al cliente, Total Pagado, Utilidades, Proveedor, Cliente
 *   - Gastos 20XX: Fecha, Artículos, Precio unitario, Cantidad, Precio total, Proveedor,
 *     Inversionista, Cantidad, Categoría
 *   - Inventario: Artículo, Categoría, Cantidad, Estado, Ubicación, Descripción
 *   - Reparto de Utilidades: categorías con % y la meta (pickup)
 */
import ExcelJS from "exceljs"
import { cellValue } from "@/lib/bookings-excel"
import { guessActivity, newId, type Booking, type Cell } from "@/lib/bookings"
import { DEFAULT_FIN, type Expense, type FinSettings, type InventoryItem } from "@/lib/finance-calc"

const MONTHS: Record<string, number> = {
	enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6, julio: 7, agosto: 8,
	septiembre: 9, setiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
}

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim()
const txt = (c: Cell) => (c === null ? "" : String(c).trim())
const num = (c: Cell): number | null => {
	if (typeof c === "number") return c
	if (typeof c === "string") {
		const n = Number(c.replace(/[$,\s]/g, ""))
		return Number.isFinite(n) && c.trim() !== "" ? n : null
	}
	return null
}

/** "7 de Enero 2026", "3 de Mayo", "9 Julio", "2026-10-13" o fecha de Excel -> yyyy-mm-dd. */
export function parseSpanishDate(c: Cell, defaultYear: number): string | null {
	if (c === null) return null
	if (typeof c === "number" && c > 30000 && c < 80000) {
		// Número de serie de Excel
		const d = new Date(Date.UTC(1899, 11, 30) + c * 86400000)
		return d.toISOString().slice(0, 10)
	}
	const s = norm(String(c))
	const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
	if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`
	const m = s.match(/(\d{1,2})\s*(?:de\s+)?([a-z]+)(?:\s*(?:de|del)?\s*(\d{4}))?/)
	if (!m) return null
	const month = MONTHS[m[2]]
	const day = Number(m[1])
	if (!month || day < 1 || day > 31) return null
	const year = m[3] ? Number(m[3]) : defaultYear
	return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export function isBudgetWorkbook(wb: ExcelJS.Workbook): boolean {
	return wb.worksheets.some((w) => /^ingresos/i.test(w.name.trim()))
}

export interface BudgetData {
	bookings: Booking[]
	expenses: Expense[]
	inventory: InventoryItem[]
	settings: FinSettings | null
	warnings: string[]
	year: number
}

export function parseBudgetWorkbook(wb: ExcelJS.Workbook): BudgetData {
	const warnings: string[] = []
	const now = Date.now()
	const ingresos = wb.worksheets.find((w) => /^ingresos/i.test(w.name.trim()))
	const gastos = wb.worksheets.find((w) => /^gastos/i.test(w.name.trim()))
	const inventario = wb.worksheets.find((w) => /^inventario/i.test(w.name.trim()))
	const reparto = wb.worksheets.find((w) => /^reparto/i.test(w.name.trim()))
	const year = Number((ingresos?.name.match(/\d{4}/) ?? gastos?.name.match(/\d{4}/) ?? [])[0]) || new Date().getFullYear()

	const bookings: Booking[] = []
	ingresos?.eachRow({ includeEmpty: false }, (row, i) => {
		const v = (c: number) => cellValue(row.getCell(c).value)
		const product = txt(v(2))
		const first = norm(txt(v(1)))
		if (!product || first.startsWith("fecha") || first.startsWith("total") || first.startsWith("ingresos")) return
		const costTotal = num(v(5))
		const paid = num(v(7))
		if (costTotal === null && paid === null) return // renglón todavía vacío
		const dateISO = parseSpanishDate(v(1), year)
		if (!dateISO) {
			warnings.push(`Ingresos, renglón ${i}: no entendí la fecha "${txt(v(1))}"`)
			return
		}
		const people = Number(num(v(4))) || 0
		const unit = num(v(6))
		bookings.push({
			id: newId("p"),
			source: "presupuesto",
			dateISO,
			activity: guessActivity(product),
			activityLabel: product,
			name: txt(v(10)) || "(sin nombre)",
			people,
			phone: "",
			email: "",
			paidFull: paid,
			deposit: "nd",
			settled: "si",
			balance: "nd",
			guide: "",
			captain: txt(v(9)),
			transport: "",
			notes: unit ? `Precio por persona $${Math.round(unit).toLocaleString("en-US")} (del presupuesto)` : "Del presupuesto",
			status: "active",
			cost: costTotal,
			createdAt: now + i,
			updatedAt: now,
		})
	})

	const expenses: Expense[] = []
	gastos?.eachRow({ includeEmpty: false }, (row, i) => {
		const v = (c: number) => cellValue(row.getCell(c).value)
		const first = norm(txt(v(1)))
		if (!first || first.startsWith("fecha") || first.startsWith("total") || first.startsWith("gastos")) return
		const total = num(v(5)) ?? (num(v(3)) !== null && num(v(4)) !== null ? num(v(3))! * num(v(4))! : null)
		if (total === null) return
		const dateISO = parseSpanishDate(v(1), year)
		if (!dateISO) {
			warnings.push(`Gastos, renglón ${i}: no entendí la fecha "${txt(v(1))}"`)
			return
		}
		const category = txt(v(9))
		expenses.push({
			id: newId("g"),
			dateISO,
			item: txt(v(2)) || category || "Gasto",
			unitPrice: num(v(3)),
			qty: num(v(4)),
			total,
			provider: txt(v(6)),
			investor: txt(v(7)),
			category,
			notes: "",
			imported: true,
			createdAt: now + i,
			updatedAt: now,
		})
	})

	const inventory: InventoryItem[] = []
	inventario?.eachRow({ includeEmpty: false }, (row, i) => {
		const v = (c: number) => cellValue(row.getCell(c).value)
		const item = txt(v(2))
		if (!item || /^articulo/.test(norm(item)) || /^inventario/.test(norm(item))) return
		inventory.push({
			id: newId("i"),
			item,
			category: txt(v(3)),
			qty: num(v(4)),
			condition: txt(v(5)),
			location: txt(v(6)),
			description: txt(v(7)),
			imported: true,
			createdAt: now + i,
			updatedAt: now,
		})
	})

	let settings: FinSettings | null = null
	if (reparto) {
		const cats: FinSettings["reparto"] = []
		let goalMin = DEFAULT_FIN.goalMin
		let goalMax = DEFAULT_FIN.goalMax
		reparto.eachRow({ includeEmpty: false }, (row) => {
			const a = txt(cellValue(row.getCell(1).value))
			const b = cellValue(row.getCell(2).value)
			const c = txt(cellValue(row.getCell(3).value))
			const na = norm(a)
			if (typeof b === "number" && b > 0 && b <= 1 && na && na !== "total" && !na.startsWith("%")) cats.push({ name: a, pct: b, desc: c })
			if (na.startsWith("meta") && na.includes("minimo") && typeof b === "number") goalMin = b
			if (na.startsWith("meta") && na.includes("maximo") && typeof b === "number") goalMax = b
		})
		if (cats.length) settings = { ...DEFAULT_FIN, reparto: cats, goalMin, goalMax }
	}

	if (!ingresos) warnings.push("No encontré la hoja de Ingresos")
	return { bookings, expenses, inventory, settings, warnings, year }
}
