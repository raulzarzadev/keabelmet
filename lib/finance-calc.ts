/**
 * Cálculos de finanzas del panel (sin dependencias de servidor: lo usa también
 * la interfaz). Replica el libro "Presupuesto Keabelmet": ventas y costo por
 * reserva, utilidad, gastos de equipo, reparto de utilidades y metas.
 */

export type Cell = string | number | null

export interface FinBooking {
	dateISO: string
	people: number
	paidFull: Cell
	deposit: Cell
	settled: Cell
	balance: Cell
	cost?: number | null
	status: "active" | "cancelled"
}

export interface Expense {
	id: string
	dateISO: string
	item: string
	unitPrice: number | null
	qty: number | null
	total: number
	provider: string
	investor: string
	category: string
	notes: string
	imported?: boolean
	createdAt: number
	updatedAt: number
}

export interface InventoryItem {
	id: string
	item: string
	category: string
	qty: number | null
	condition: string
	location: string
	description: string
	imported?: boolean
	createdAt: number
	updatedAt: number
}

export interface RepartoCat {
	name: string
	pct: number
	desc: string
}

export interface FinSettings {
	reparto: RepartoCat[]
	/** Índice de la categoría que junta para la meta (pickup). */
	goalIndex: number
	goalName: string
	goalMin: number
	goalMax: number
	goalMonths: number
	scenarios: { name: string; profit: number }[]
}

export const DEFAULT_FIN: FinSettings = {
	reparto: [
		{ name: "Activos Mayores", pct: 0.15, desc: "Ahorro para una pickup ($250,000–$300,000)" },
		{ name: "Salarios", pct: 0.25, desc: "Pago para ustedes (dueños/operadores)" },
		{ name: "Publicidad", pct: 0.15, desc: "Marketing y anuncios" },
		{ name: "Inversión Personal", pct: 0.1, desc: "Cursos y certificaciones" },
		{ name: "Reinversión Equipo Operativo", pct: 0.1, desc: "Neoprenos, snorkels, hidrófono, etc." },
		{ name: "Inversión (GBM / Acciones)", pct: 0.25, desc: "Inversión a largo plazo en bolsa" },
	],
	goalIndex: 0,
	goalName: "Pickup",
	goalMin: 250000,
	goalMax: 300000,
	goalMonths: 12,
	scenarios: [
		{ name: "Conservador", profit: 150000 },
		{ name: "Moderado", profit: 250000 },
		{ name: "Ambicioso", profit: 400000 },
	],
}

export function cellNum(c: Cell | undefined): number {
	if (typeof c === "number") return c
	if (typeof c === "string") {
		const m = c.replace(/,/g, "").match(/-?\d+(\.\d+)?/)
		return m ? Number(m[0]) : 0
	}
	return 0
}

/** Venta total de la reserva: pago completo, o anticipo + saldo. */
export function saleOf(b: FinBooking): number {
	if (typeof b.paidFull === "number") return b.paidFull
	return cellNum(b.deposit) + cellNum(b.balance)
}

/** Ya cobrado: pago completo, o anticipo (+ saldo si está liquidado). */
export function collectedOf(b: FinBooking): number {
	if (typeof b.paidFull === "number") return b.paidFull
	return cellNum(b.deposit) + (b.settled === "si" ? cellNum(b.balance) : 0)
}

export function pendingOf(b: FinBooking): number {
	return Math.max(0, saleOf(b) - collectedOf(b))
}

export interface MonthFin {
	month: number
	bookings: number
	people: number
	sales: number
	collected: number
	pending: number
	costs: number
	/** Ventas de reservas que ya tienen costo capturado (base de la utilidad). */
	salesWithCost: number
	profit: number
	missingCost: number
	/** Ventas de reservas todavía sin costo (no cuentan en la utilidad). */
	salesNoCost: number
	expenses: number
	reparto: number[]
}

export function yearSummary(bookings: FinBooking[], expenses: Expense[], settings: FinSettings, year: number) {
	const months: MonthFin[] = Array.from({ length: 12 }, (_, i) => ({
		month: i + 1,
		bookings: 0,
		people: 0,
		sales: 0,
		collected: 0,
		pending: 0,
		costs: 0,
		salesWithCost: 0,
		profit: 0,
		missingCost: 0,
		salesNoCost: 0,
		expenses: 0,
		reparto: settings.reparto.map(() => 0),
	}))
	const y = String(year)
	for (const b of bookings) {
		if (b.status !== "active" || !b.dateISO.startsWith(y)) continue
		const sale = saleOf(b)
		if (!sale && !b.cost) continue
		const m = months[Number(b.dateISO.slice(5, 7)) - 1]
		if (!m) continue
		m.bookings++
		m.people += b.people || 0
		m.sales += sale
		m.collected += collectedOf(b)
		m.pending += pendingOf(b)
		if (typeof b.cost === "number") {
			m.costs += b.cost
			m.salesWithCost += sale
		} else if (sale) {
			m.missingCost++
			m.salesNoCost += sale
		}
	}
	for (const e of expenses) {
		if (!e.dateISO.startsWith(y)) continue
		const m = months[Number(e.dateISO.slice(5, 7)) - 1]
		if (m) m.expenses += e.total || 0
	}
	for (const m of months) {
		// Como en el libro: utilidad = lo cobrado menos lo pagado al proveedor, solo de las
		// reservas con costo capturado (una venta sin costo aún no tiene utilidad real).
		m.profit = m.salesWithCost - m.costs
		m.reparto = settings.reparto.map((c) => Math.max(0, m.profit) * c.pct)
	}
	const sum = (k: keyof Omit<MonthFin, "reparto" | "month">) => months.reduce((a, m) => a + (m[k] as number), 0)
	const totals = {
		bookings: sum("bookings"),
		people: sum("people"),
		sales: sum("sales"),
		collected: sum("collected"),
		pending: sum("pending"),
		costs: sum("costs"),
		salesWithCost: sum("salesWithCost"),
		profit: sum("profit"),
		missingCost: sum("missingCost"),
		salesNoCost: sum("salesNoCost"),
		expenses: sum("expenses"),
		reparto: settings.reparto.map((_, i) => months.reduce((a, m) => a + m.reparto[i], 0)),
	}
	const margin = totals.salesWithCost ? totals.profit / totals.salesWithCost : 0
	const ticket = totals.bookings ? totals.sales / totals.bookings : 0
	const goalPct = settings.reparto[settings.goalIndex]?.pct ?? 0
	const goalSaved = totals.reparto[settings.goalIndex] ?? 0
	const goalLeft = Math.max(0, settings.goalMin - goalSaved)
	const profitNeededMonthly = settings.goalMonths > 0 && goalPct > 0 ? goalLeft / (settings.goalMonths * goalPct) : 0
	const salesNeededMonthly = margin ? profitNeededMonthly / margin : 0
	const scenarios = settings.scenarios.map((s) => {
		const monthlyProfit = s.profit / 12
		const monthlySales = margin ? monthlyProfit / margin : 0
		return { ...s, monthlyProfit, monthlySales, yearlySales: monthlySales * 12, toursPerMonth: ticket ? monthlySales / ticket : 0 }
	})
	return {
		months,
		totals,
		margin,
		ticket,
		goal: { saved: goalSaved, left: goalLeft, pctMin: settings.goalMin ? goalSaved / settings.goalMin : 0, pctMax: settings.goalMax ? goalSaved / settings.goalMax : 0, profitNeededMonthly, salesNeededMonthly, toursNeededMonthly: ticket ? salesNeededMonthly / ticket : 0 },
		scenarios,
	}
}

export function sanitizeFinSettings(raw: unknown): FinSettings {
	const r = (raw ?? {}) as Partial<FinSettings>
	const num = (v: unknown, d: number) => (typeof v === "number" && Number.isFinite(v) ? v : d)
	const reparto = Array.isArray(r.reparto) && r.reparto.length
		? r.reparto.slice(0, 10).map((c) => ({ name: String(c?.name ?? "").slice(0, 60) || "Categoría", pct: Math.max(0, Math.min(1, num(c?.pct, 0))), desc: String(c?.desc ?? "").slice(0, 160) }))
		: DEFAULT_FIN.reparto
	const scenarios = Array.isArray(r.scenarios) && r.scenarios.length
		? r.scenarios.slice(0, 6).map((s) => ({ name: String(s?.name ?? "").slice(0, 40) || "Escenario", profit: Math.max(0, num(s?.profit, 0)) }))
		: DEFAULT_FIN.scenarios
	return {
		reparto,
		goalIndex: Math.max(0, Math.min(reparto.length - 1, Math.round(num(r.goalIndex, 0)))),
		goalName: String(r.goalName ?? DEFAULT_FIN.goalName).slice(0, 60),
		goalMin: Math.max(0, num(r.goalMin, DEFAULT_FIN.goalMin)),
		goalMax: Math.max(0, num(r.goalMax, DEFAULT_FIN.goalMax)),
		goalMonths: Math.max(1, Math.min(120, Math.round(num(r.goalMonths, DEFAULT_FIN.goalMonths)))),
		scenarios,
	}
}
