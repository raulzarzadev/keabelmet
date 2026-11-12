/**
 * Reservas para el panel /panel-reservas: disponibilidad, cupos y logística.
 *
 * - Las reservas pagadas en la página (Stripe) entran solas desde el webhook,
 *   y además el panel revisa Stripe al abrirse por si alguna se escapó.
 * - Las de efectivo, WhatsApp o amigos se agregan a mano en el panel.
 * - El dueño puede editar cualquier reserva (fecha, personas, capitán…); la
 *   sincronización con Stripe nunca sobrescribe lo editado, solo agrega lo nuevo.
 *
 * Redis (Upstash):
 *   bk          hash  id -> JSON de la reserva
 *   bk:pis      hash  paymentIntentId -> "1" (ya registrado; idempotencia)
 *   bk:since    unix (segundos): pagos de Stripe anteriores ya venían en el Excel importado
 *   bk:synced   unix (segundos) de la última revisión de Stripe
 */
import crypto from "node:crypto"
import type Stripe from "stripe"
import { kv, kvPipeline, kvConfigured } from "@/lib/kv"
import { getSeason } from "@/lib/expedition-seasons"
import { unpackItems } from "@/lib/deposit"
import { unchunkToken, verifyDeal, computeDealTotals } from "@/lib/deal"
import { folioFromPaymentIntent } from "@/lib/reservation"

export { kvConfigured }

export type Cell = string | number | null

export interface Booking {
	id: string
	source: "web" | "manual" | "excel"
	piId?: string
	folio?: string
	dateISO: string
	/** slug de la expedición, u "otro". */
	activity: string
	/** Texto libre de la actividad (como lo escribes en el Excel). */
	activityLabel: string
	name: string
	people: number
	phone: string
	email: string
	/** Columnas de pago tal como en tu Excel (número o texto: "nd", "si", "5000 cash"). */
	paidFull: Cell
	deposit: Cell
	settled: Cell
	balance: Cell
	guide: string
	captain: string
	/** "si" / "no" / "" */
	transport: string
	notes: string
	status: "active" | "cancelled"
	createdAt: number
	updatedAt: number
}

/** Expediciones del catálogo para el panel (nombre corto y cupo por lancha). */
export const ACTIVITIES: { slug: string; label: string; max: number; months: number[] | null }[] = [
	{ slug: "safari-la-ventana", label: "Safari La Ventana" },
	{ slug: "safari-bahia-magdalena", label: "Sardine Run" },
	{ slug: "tiburon-ballena", label: "Tiburon Ballena" },
	{ slug: "tour-espiritu-santo", label: "Snorkel Isla Espíritu Santo" },
	{ slug: "tour-ballena-gris", label: "Ballena Gris" },
	{ slug: "buceo-la-paz", label: "Buceo La Paz" },
	{ slug: "buceo-cabo-pulmo", label: "Buceo Cabo Pulmo" },
	{ slug: "scuba-discovery", label: "Scuba Discovery" },
	{ slug: "certificacion-open-water", label: "Open Water" },
].map((a) => {
	const s = getSeason(a.slug)
	return { ...a, max: s.maxPeople, months: s.months }
})

export function activityLabel(slug: string): string {
	return ACTIVITIES.find((a) => a.slug === slug)?.label ?? slug
}

/** Adivina la expedición a partir del texto del Excel ("Sardine Run", "Snorkel Tiburón Ballena"…). */
export function guessActivity(text: string): string {
	const t = text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
	if (/ventana|safari la/.test(t)) return "safari-la-ventana"
	if (/sardine|magdalena|sardina/.test(t)) return "safari-bahia-magdalena"
	if (/tiburon|whale shark/.test(t)) return "tiburon-ballena"
	if (/ballena gris|gray whale|chale/.test(t)) return "tour-ballena-gris"
	if (/cabo pulmo/.test(t)) return "buceo-cabo-pulmo"
	if (/discovery/.test(t)) return "scuba-discovery"
	if (/open water|certific/.test(t)) return "certificacion-open-water"
	if (/buceo|dive|diving/.test(t)) return "buceo-la-paz"
	if (/espiritu|snorkel/.test(t)) return "tour-espiritu-santo"
	return "otro"
}

export function newId(prefix = "m"): string {
	return `${prefix}_${crypto.randomBytes(6).toString("hex")}`
}

function parse(raw: unknown): Booking | null {
	if (typeof raw !== "string") return null
	try {
		return JSON.parse(raw) as Booking
	} catch {
		return null
	}
}

// ── Lectura / escritura ────────────────────────────────────────────────────

export async function listBookings(): Promise<Booking[]> {
	const raw = (await kv("HGETALL", "bk")) as string[] | null
	const out: Booking[] = []
	if (Array.isArray(raw)) for (let i = 1; i < raw.length; i += 2) {
		const b = parse(raw[i])
		if (b) out.push(b)
	}
	return out.sort((a, b) => a.dateISO.localeCompare(b.dateISO) || a.createdAt - b.createdAt)
}

export async function getBooking(id: string): Promise<Booking | null> {
	return parse(await kv("HGET", "bk", id))
}

export async function saveBookings(list: Booking[]): Promise<void> {
	if (!list.length) return
	const args: (string | number)[] = ["HSET", "bk"]
	for (const b of list) args.push(b.id, JSON.stringify(b))
	await kv(...args)
}

export async function deleteBooking(id: string): Promise<void> {
	await kv("HDEL", "bk", id)
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : typeof v === "number" ? String(v) : "")
const cell = (v: unknown): Cell => {
	if (v === null || v === undefined || v === "") return null
	if (typeof v === "number" && Number.isFinite(v)) return v
	const s = String(v).trim().slice(0, 60)
	if (/^-?\d+(\.\d+)?$/.test(s.replace(/[$,\s]/g, ""))) return Number(s.replace(/[$,\s]/g, ""))
	return s
}

/** Limpia lo que manda el panel. */
export function sanitizeBooking(input: Record<string, unknown>, base?: Booking): Booking {
	const now = Date.now()
	const dateISO = str(input.dateISO, 10)
	if (!DATE_RE.test(dateISO)) throw new Error("Fecha inválida")
	const activity = str(input.activity, 60) || "otro"
	const people = Math.max(0, Math.min(200, Math.round(Number(input.people) || 0)))
	const transport = str(input.transport, 4).toLowerCase()
	return {
		id: base?.id ?? newId(),
		source: base?.source ?? "manual",
		piId: base?.piId,
		folio: base?.folio,
		dateISO,
		activity,
		activityLabel: str(input.activityLabel, 120) || activityLabel(activity),
		name: str(input.name, 120),
		people,
		phone: str(input.phone, 40),
		email: str(input.email, 120),
		paidFull: cell(input.paidFull),
		deposit: cell(input.deposit),
		settled: cell(input.settled),
		balance: cell(input.balance),
		guide: str(input.guide, 80),
		captain: str(input.captain, 80),
		transport: transport === "si" || transport === "sí" ? "si" : transport === "no" ? "no" : "",
		notes: str(input.notes, 1000),
		status: input.status === "cancelled" ? "cancelled" : "active",
		createdAt: base?.createdAt ?? now,
		updatedAt: now,
	}
}

// ── Desde Stripe ───────────────────────────────────────────────────────────

/** "+524141010268" -> "52 414 101 0268" (como en el Excel). */
export function prettyPhone(raw: string): string {
	const d = (raw || "").replace(/\D/g, "")
	if (!d) return ""
	if (d.length === 10) return `52 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`
	if (d.startsWith("521") && d.length === 13) return `52 ${d.slice(3, 6)} ${d.slice(6, 9)} ${d.slice(9)}`
	if (d.startsWith("52") && d.length === 12) return `52 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}`
	if (d.startsWith("1") && d.length === 11) return `1 ${d.slice(1, 4)} ${d.slice(4, 7)} ${d.slice(7)}`
	const cc = d.length > 11 ? d.slice(0, 3) : d.slice(0, 2)
	return `${cc} ${d.slice(cc.length).replace(/(\d{3})(?=\d)/g, "$1 ")}`.trim()
}

/** Convierte un pago exitoso en una o varias reservas (una por actividad). */
export function bookingsFromPaymentIntent(pi: Stripe.PaymentIntent): Booking[] {
	const m = pi.metadata ?? {}
	const now = Date.now()
	const created = (pi.created || Math.floor(now / 1000)) * 1000
	const base = {
		source: "web" as const,
		piId: pi.id,
		folio: folioFromPaymentIntent(pi.id),
		name: m.customerName || "",
		phone: prettyPhone(m.customerPhone || ""),
		email: m.customerEmail || "",
		guide: "",
		captain: "",
		transport: "",
		notes: "",
		status: "active" as const,
		createdAt: created,
		updatedAt: now,
	}
	const total = Math.round((pi.amount_received || pi.amount || 0) / 100)

	if (m.kind === "deposit") {
		const items = unpackItems(m.items)
		const deposit = Number(m.depositMxn) || total
		const remaining = Number(m.remainingMxn) || 0
		return items.map((it, i) => ({
			...base,
			id: `${pi.id}#${i}`,
			dateISO: it.dateISO,
			activity: it.slug,
			activityLabel: activityLabel(it.slug),
			people: it.people,
			// Como en tu Excel: el anticipo y el saldo van en el primer renglón del paquete.
			paidFull: null,
			deposit: i === 0 ? deposit : null,
			settled: null,
			balance: i === 0 ? remaining : null,
			notes: items.length > 1 ? `Paquete con anticipo (${items.length} actividades), folio ${base.folio}` : "",
		}))
	}

	if (m.kind === "deal") {
		const deal = verifyDeal(unchunkToken(m))
		const totals = deal ? computeDealTotals(deal) : null
		return [
			{
				...base,
				id: `${pi.id}#0`,
				dateISO: deal?.startISO && DATE_RE.test(deal.startISO) ? deal.startISO : new Date(created).toISOString().slice(0, 10),
				activity: "otro",
				activityLabel: deal?.title || "Reserva personalizada",
				people: 0,
				paidFull: null,
				deposit: totals?.depositMxn ?? total,
				settled: null,
				balance: totals?.remainingMxn ?? null,
				notes: deal
					? `Deal: ${deal.lines.map((l) => `${l.label} ($${l.amountMxn.toLocaleString("en-US")})`).join("; ")}${deal.endISO ? `. Hasta ${deal.endISO}` : ""}. Revisa fechas y personas.`
					: "Deal: revisa los detalles en el correo.",
			},
		]
	}

	if (!m.slug || !m.dateISO) return []
	return [
		{
			...base,
			id: `${pi.id}#0`,
			dateISO: m.dateISO,
			activity: m.slug,
			activityLabel: activityLabel(m.slug),
			people: Number(m.people) || 1,
			paidFull: Number(m.totalMxn) || total,
			deposit: "nd",
			settled: "si",
			balance: "nd",
			transport: m.rideAddon === "true" ? "si" : "",
		},
	]
}

/** Registra un pago (idempotente). No hace nada si Redis no está conectado. */
export async function recordPaymentIntent(pi: Stripe.PaymentIntent): Promise<number> {
	if (!kvConfigured()) return 0
	const list = bookingsFromPaymentIntent(pi)
	if (!list.length) return 0
	const fresh = await kv("HSETNX", "bk:pis", pi.id, "1")
	if (Number(fresh) !== 1) return 0
	await saveBookings(list)
	return list.length
}

/** Revisa Stripe por pagos que no hayan entrado (webhook caído, etc.). */
export async function syncFromStripe(stripe: Stripe, opts: { force?: boolean } = {}): Promise<{ added: number; checked: number; skipped?: string }> {
	const [sinceRaw, syncedRaw] = (await kvPipeline([
		["GET", "bk:since"],
		["GET", "bk:synced"],
	])) as (string | null)[]
	const since = Number(sinceRaw) || 0
	if (!since) return { added: 0, checked: 0, skipped: "Primero importa tu Excel" }
	const nowS = Math.floor(Date.now() / 1000)
	if (!opts.force && Number(syncedRaw) > nowS - 300) return { added: 0, checked: 0, skipped: "Revisado hace menos de 5 min" }
	await kv("SET", "bk:synced", nowS)

	let added = 0
	let checked = 0
	const query = `status:'succeeded' AND created>${since}`
	let page = await stripe.paymentIntents.search({ query, limit: 100, expand: ["data.latest_charge"] })
	for (;;) {
		for (const pi of page.data) {
			checked++
			const charge = pi.latest_charge as Stripe.Charge | null
			if (charge && typeof charge === "object" && charge.refunded) continue
			added += await recordPaymentIntent(pi)
		}
		if (!page.has_more || !page.next_page) break
		page = await stripe.paymentIntents.search({ query, limit: 100, page: page.next_page, expand: ["data.latest_charge"] })
	}
	return { added, checked }
}

export async function setSince(unixSeconds: number): Promise<void> {
	await kvPipeline([
		["SET", "bk:since", Math.floor(unixSeconds)],
		["DEL", "bk:synced"],
	])
}

export async function getSince(): Promise<number> {
	return Number(await kv("GET", "bk:since")) || 0
}

/** Reemplaza lo importado antes del Excel (no toca reservas web ni manuales posteriores). */
export async function replaceImported(list: Booking[]): Promise<void> {
	const current = await listBookings()
	const old = current.filter((b) => b.source === "excel").map((b) => b.id)
	if (old.length) await kv("HDEL", "bk", ...old)
	await saveBookings(list)
}
