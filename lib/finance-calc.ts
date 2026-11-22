/**
 * Cálculos de finanzas del panel (sin dependencias de servidor: lo usa también
 * la interfaz). Parte del libro "Presupuesto Keabelmet" y de la plantilla de
 * contabilidad de Jaime: ventas y costo por reserva, un libro de movimientos
 * (gastos de operación, compras de equipo, reparto real, pagos de Argo Navis),
 * utilidad real, reparto planeado contra real, aportaciones de socios y metas.
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

/**
 * Tipo de movimiento del libro:
 * - operacion: gasto para operar (gasolina extra, publicidad, software, comisiones…)
 * - equipo: compra de equipo o activos (inversión; no se resta de la utilidad de operación)
 * - reparto: dinero que de verdad se separó o se pagó a un destino del reparto
 * - pagoArgo: Argo Navis le pagó a Keabelmet su parte de gastos compartidos
 * - reembolso: Keabelmet le devolvió dinero a quien pagó algo de su bolsa
 */
export type MovementKind = "operacion" | "equipo" | "reparto" | "pagoArgo" | "reembolso"

export const MOVEMENT_KINDS: { id: MovementKind; label: string; hint: string }[] = [
	{ id: "operacion", label: "Gasto de operación", hint: "Gasolina extra, publicidad, Google, Lightroom, comisiones de Stripe, teléfono…" },
	{ id: "equipo", label: "Compra de equipo", hint: "Neoprenos, visores, equipo de buceo… (inversión)" },
	{ id: "reparto", label: "Reparto (dinero separado)", hint: "Lo que de verdad se apartó o se pagó a un destino del reparto" },
	{ id: "pagoArgo", label: "Pago de Argo Navis", hint: "Argo Navis le pagó a Keabelmet su parte de gastos compartidos" },
	{ id: "reembolso", label: "Reembolso", hint: "Keabelmet le devolvió dinero a alguien que pagó algo de su bolsa" },
]

/** Cuenta de la empresa (Banregio de Mau, donde deposita Stripe). Lo demás es dinero personal = aportación. */
export const COMPANY_ACCOUNT = "Cuenta Keabelmet"

export const OPEX_CATEGORIES = [
	"Gasolina",
	"Renta de lancha",
	"Capitanes y guías",
	"Comida y bebidas",
	"Transporte",
	"Mantenimiento de equipo",
	"Publicidad",
	"Suscripciones y software",
	"Comisiones (Stripe, bancos)",
	"Teléfono e internet",
	"Cursos y certificaciones",
	"Impuestos y trámites",
	"Otros",
]

export interface Expense {
	id: string
	dateISO: string
	item: string
	unitPrice: number | null
	qty: number | null
	total: number
	provider: string
	/** Quién lo pagó (los gastos viejos lo guardan aquí). */
	investor: string
	category: string
	notes: string
	/** Sin tipo = gasto viejo del libro de presupuesto (compra de equipo). */
	kind?: MovementKind
	/** De dónde salió el dinero: "Cuenta Keabelmet" o el nombre de quien pagó de su bolsa. */
	paidFrom?: string
	/** Parte de Argo Navis en un gasto compartido (0–1). */
	argoPct?: number
	/** Destino del reparto (kind = "reparto") o a quién se le devolvió (kind = "reembolso"). */
	destino?: string
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
	/** Porcentaje de lo que queda (modo "pct"). */
	pct: number
	desc: string
	/** "fixed" = monto fijo al mes (sale antes de los porcentajes). Sin modo = porcentaje. */
	mode?: "pct" | "fixed"
	/** Monto fijo al mes (modo "fixed"). */
	amount?: number
}

export const isFixedCat = (c: RepartoCat) => c.mode === "fixed"

/** Compromiso fijo que se paga antes del reparto por porcentajes (p. ej. la vivienda de Mau). */
export interface FixedCommitment {
	name: string
	monthly: number
	desc: string
}

export interface FinSettings {
	reparto: RepartoCat[]
	/** Montos fijos al mes que salen de la utilidad antes de repartir porcentajes. */
	fixed: FixedCommitment[]
	/** Personas que pagaron de su bolsa pero a las que ya no se les debe nada (saldado fuera de Keabelmet). */
	settled: string[]
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
	fixed: [],
	settled: [],
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

/**
 * Reparto combinado (panel + plantilla de Jaime), con la decisión de los socios
 * (2026-11-21): primero la vivienda de Mau como monto fijo y todo lo demás a
 * crecimiento. Es un punto de partida: los porcentajes se ajustan en el panel.
 */
export const COMBINED_REPARTO: Pick<FinSettings, "reparto" | "fixed" | "goalIndex"> = {
	fixed: [{ name: "Sostén de Mau", monthly: 0, desc: "Renta y gastos de vida de Mau en La Paz: pon el monto mensual" }],
	reparto: [
		{ name: "Impuestos (apartado)", pct: 0.1, desc: "Para IVA/ISR: ajústalo con su contador" },
		{ name: "Fondo de emergencia", pct: 0.1, desc: "Meta: unos 3 meses de gastos fijos (temporada baja)" },
		{ name: "Reinversión Equipo Operativo", pct: 0.2, desc: "Neoprenos, snorkels, hidrófono, mantenimiento" },
		{ name: "Publicidad", pct: 0.15, desc: "Anuncios, contenido y fotos" },
		{ name: "Activos Mayores", pct: 0.25, desc: "Ahorro para una pickup ($250,000–$300,000)" },
		{ name: "Proyectos nuevos", pct: 0.1, desc: "Nuevas expediciones, web, equipo especial" },
		{ name: "Formación", pct: 0.1, desc: "Cursos y certificaciones" },
		{ name: "Inversión (GBM / Acciones)", pct: 0, desc: "Por ahora 0%: todo va al crecimiento de la empresa" },
	],
	goalIndex: 4,
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

/** Tipo del movimiento (los gastos viejos, sin tipo, son compras de equipo). */
export const kindOf = (e: Expense): MovementKind => e.kind ?? "equipo"

/** De dónde salió el dinero (los viejos guardan el nombre en "investor"). */
export function payerOf(e: Expense): string {
	const p = (e.paidFrom ?? e.investor ?? "").trim()
	return p || COMPANY_ACCOUNT
}

export const isCompanyPayer = (p: string) => /keabelmet|empresa|banregio/i.test(p)

/** Parte del gasto que le toca a Keabelmet (descuenta la parte de Argo Navis). */
export const keabelmetShare = (e: Expense) => (e.total || 0) * (1 - Math.max(0, Math.min(1, e.argoPct ?? 0)))

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
	/** Utilidad de los tours: ventas con costo menos lo pagado al proveedor. */
	profit: number
	missingCost: number
	/** Ventas de reservas todavía sin costo (no cuentan en la utilidad). */
	salesNoCost: number
	/** Gastos de operación (parte de Keabelmet). */
	opex: number
	/** Compras de equipo (inversión). */
	expenses: number
	/** Utilidad real: utilidad de tours menos gastos de operación. */
	netProfit: number
	/** Compromisos fijos del mes (vivienda de Mau…). */
	fixed: number
	/** Lo que queda para repartir por porcentajes. */
	toDistribute: number
	reparto: number[]
}

export function yearSummary(bookings: FinBooking[], expenses: Expense[], settings: FinSettings, year: number) {
	const fixedMonthly = settings.fixed.reduce((a, f) => a + (f.monthly || 0), 0)
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
		opex: 0,
		expenses: 0,
		netProfit: 0,
		fixed: 0,
		toDistribute: 0,
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

	// Libro de movimientos del año
	const repartoReal = settings.reparto.map(() => 0)
	const otherReparto: Record<string, number> = {}
	const contributions: Record<string, number> = {}
	const refunds: Record<string, number> = {}
	let argoShare = 0
	let argoPaid = 0
	for (const e of expenses) {
		if (!e.dateISO.startsWith(y)) continue
		const m = months[Number(e.dateISO.slice(5, 7)) - 1]
		const k = kindOf(e)
		const payer = payerOf(e)
		if (k === "pagoArgo") {
			argoPaid += e.total || 0
			continue
		}
		if (k === "reembolso") {
			const who = (e.destino || "Sin nombre").trim()
			refunds[who] = (refunds[who] ?? 0) + (e.total || 0)
			continue
		}
		if (k === "reparto") {
			const i = settings.reparto.findIndex((c) => c.name === e.destino)
			if (i >= 0) repartoReal[i] += e.total || 0
			else otherReparto[e.destino || "Sin destino"] = (otherReparto[e.destino || "Sin destino"] ?? 0) + (e.total || 0)
			continue
		}
		// Gasto de operación o compra de equipo
		if (m) {
			if (k === "operacion") m.opex += keabelmetShare(e)
			else m.expenses += keabelmetShare(e)
		}
		if (e.argoPct && isCompanyPayer(payer)) argoShare += (e.total || 0) * e.argoPct
		if (!isCompanyPayer(payer)) contributions[payer] = (contributions[payer] ?? 0) + keabelmetShare(e)
	}

	for (const m of months) {
		// Utilidad de tours: lo cobrado menos lo pagado al proveedor, solo de reservas con costo.
		m.profit = m.salesWithCost - m.costs
		m.netProfit = m.profit - m.opex
		const active = m.sales || m.costs || m.opex
		m.fixed = active ? Math.min(fixedMonthly, Math.max(0, m.netProfit)) : 0
		m.toDistribute = Math.max(0, m.netProfit - m.fixed)
		// Primero los destinos con monto fijo (en orden, hasta donde alcance) y luego los porcentajes sobre lo que queda
		let rest = m.toDistribute
		const fixedAlloc = settings.reparto.map((c) => {
			if (!isFixedCat(c) || !active) return 0
			const v = Math.min(c.amount || 0, rest)
			rest -= v
			return v
		})
		m.reparto = settings.reparto.map((c, i) => (isFixedCat(c) ? fixedAlloc[i] : rest * c.pct))
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
		opex: sum("opex"),
		expenses: sum("expenses"),
		netProfit: sum("netProfit"),
		fixed: sum("fixed"),
		toDistribute: sum("toDistribute"),
		reparto: settings.reparto.map((_, i) => months.reduce((a, m) => a + m.reparto[i], 0)),
	}
	const margin = totals.salesWithCost ? totals.profit / totals.salesWithCost : 0
	/** Margen real: utilidad después de gastos de operación sobre ventas con costo. */
	const netMargin = totals.salesWithCost ? totals.netProfit / totals.salesWithCost : 0
	const ticket = totals.bookings ? totals.sales / totals.bookings : 0
	const goalPct = settings.reparto[settings.goalIndex]?.pct ?? 0
	// La meta avanza con lo que de verdad se separó (movimientos de reparto), no con lo planeado.
	const goalSaved = repartoReal[settings.goalIndex] ?? 0
	const goalPlanned = totals.reparto[settings.goalIndex] ?? 0
	const goalLeft = Math.max(0, settings.goalMin - goalSaved)
	const goalCat = settings.reparto[settings.goalIndex]
	const fixedCats = settings.reparto.reduce((a, c) => a + (isFixedCat(c) ? c.amount || 0 : 0), 0)
	const months_ = Math.max(1, settings.goalMonths)
	// Si la meta es monto fijo: lo que hace falta es subir ese monto a lo necesario; si es %, que el resto rinda lo suficiente
	const profitNeededMonthly = goalCat && isFixedCat(goalCat)
		? fixedMonthly + fixedCats - (goalCat.amount || 0) + goalLeft / months_
		: goalPct > 0
			? fixedMonthly + fixedCats + goalLeft / (months_ * goalPct)
			: 0
	const salesNeededMonthly = netMargin > 0 ? profitNeededMonthly / netMargin : 0
	const scenarios = settings.scenarios.map((s) => {
		const monthlyProfit = s.profit / 12
		const monthlySales = netMargin > 0 ? monthlyProfit / netMargin : 0
		return { ...s, monthlyProfit, monthlySales, yearlySales: monthlySales * 12, toursPerMonth: ticket ? monthlySales / ticket : 0 }
	})
	return {
		months,
		totals,
		margin,
		netMargin,
		ticket,
		fixedMonthly,
		repartoReal,
		otherReparto,
		contributions,
		refunds,
		argo: { share: argoShare, paid: argoPaid, owes: Math.max(0, argoShare - argoPaid) },
		goal: { saved: goalSaved, planned: goalPlanned, left: goalLeft, pctMin: settings.goalMin ? goalSaved / settings.goalMin : 0, pctMax: settings.goalMax ? goalSaved / settings.goalMax : 0, profitNeededMonthly, salesNeededMonthly, toursNeededMonthly: ticket ? salesNeededMonthly / ticket : 0 },
		scenarios,
	}
}

export function sanitizeFinSettings(raw: unknown): FinSettings {
	const r = (raw ?? {}) as Partial<FinSettings>
	const num = (v: unknown, d: number) => (typeof v === "number" && Number.isFinite(v) ? v : d)
	const reparto = Array.isArray(r.reparto) && r.reparto.length
		? r.reparto.slice(0, 12).map((c) => ({
				name: String(c?.name ?? "").slice(0, 60) || "Categoría",
				pct: Math.max(0, Math.min(1, num(c?.pct, 0))),
				desc: String(c?.desc ?? "").slice(0, 160),
				...(c?.mode === "fixed" ? { mode: "fixed" as const, amount: Math.max(0, num(c?.amount, 0)) } : {}),
			}))
		: DEFAULT_FIN.reparto
	const fixed = Array.isArray(r.fixed)
		? r.fixed.slice(0, 6).map((f) => ({ name: String(f?.name ?? "").slice(0, 60) || "Compromiso", monthly: Math.max(0, num(f?.monthly, 0)), desc: String(f?.desc ?? "").slice(0, 160) }))
		: DEFAULT_FIN.fixed
	const scenarios = Array.isArray(r.scenarios) && r.scenarios.length
		? r.scenarios.slice(0, 6).map((s) => ({ name: String(s?.name ?? "").slice(0, 40) || "Escenario", profit: Math.max(0, num(s?.profit, 0)) }))
		: DEFAULT_FIN.scenarios
	const settled = Array.isArray(r.settled) ? [...new Set(r.settled.map((x) => String(x ?? "").trim().slice(0, 120)).filter(Boolean))].slice(0, 50) : []
	return {
		reparto,
		fixed,
		settled,
		goalIndex: Math.max(0, Math.min(reparto.length - 1, Math.round(num(r.goalIndex, 0)))),
		goalName: String(r.goalName ?? DEFAULT_FIN.goalName).slice(0, 60),
		goalMin: Math.max(0, num(r.goalMin, DEFAULT_FIN.goalMin)),
		goalMax: Math.max(0, num(r.goalMax, DEFAULT_FIN.goalMax)),
		goalMonths: Math.max(1, Math.min(120, Math.round(num(r.goalMonths, DEFAULT_FIN.goalMonths)))),
		scenarios,
	}
}
