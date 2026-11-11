import { getSeason } from "@/lib/expedition-seasons"

/**
 * Disponibilidad desde Google Calendar, leída por la "dirección secreta en
 * formato iCal" del calendario de salidas (GOOGLE_CALENDAR_ICS_URL). Así no hace
 * falta OAuth: el equipo solo anota eventos en su calendario.
 *
 * Convención para los eventos (ver docs/whatsapp-bot.md):
 * - "BLOQUEADO", "CERRADO" o "SIN SALIDAS" → ese día no hay salidas. Si además
 *   nombra una actividad, solo esa queda bloqueada.
 * - Actividad + "LLENO" → esa actividad ya no tiene lugar ese día.
 * - Actividad + "4 pax" (o "4 personas") → reserva existente: se suman.
 * Los nombres de clientes en los eventos nunca se pasan al modelo.
 */

const TZ = "America/Mazatlan"

/** Palabras con que el equipo nombra cada actividad en el calendario (sin acentos, minúsculas). */
const KEYWORDS: Record<string, string[]> = {
	"tiburon-ballena": ["tiburon", "whale shark"],
	"tour-espiritu-santo": ["espiritu santo", "espiritu", "lobos"],
	"buceo-la-paz": ["buceo la paz", "buceo lp", "fun dive"],
	"scuba-discovery": ["discovery", "bautizo"],
	"certificacion-open-water": ["open water", "certificacion", "curso padi"],
	"safari-la-ventana": ["ventana", "ocean safari"],
	"buceo-cabo-pulmo": ["pulmo"],
	"tour-ballena-gris": ["ballena gris", "chale"],
	"safari-bahia-magdalena": ["magdalena", "sardina", "sardine"],
}

const BLOCK_RE = /\b(bloquead[oa]|cerrado|sin salidas?|no hay salidas?|descanso)\b/
const FULL_RE = /\b(llen[oa]|full|agotad[oa])\b/
const PAX_RE = /(\d{1,3})\s*(pax|personas?|people|ppl)\b/

interface CalEvent {
	text: string
	/** Fechas locales que ocupa (AAAA-MM-DD). */
	dates: string[]
}

export interface DayAvailability {
	date: string
	/** null: no hay calendario configurado o no se pudo leer. */
	known: boolean
	blocked: boolean
	full: boolean
	/** Personas ya anotadas en esa actividad ese día. */
	bookedPeople: number
	maxPeople: number
}

const norm = (s: string) =>
	s
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()

function localDate(d: Date): string {
	return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d)
}

function addDays(iso: string, n: number): string {
	const d = new Date(`${iso}T12:00:00Z`)
	d.setUTCDate(d.getUTCDate() + n)
	return d.toISOString().slice(0, 10)
}

/** Convierte un valor DTSTART/DTEND de iCal en fecha local y si es de día completo. */
function parseIcsDate(value: string): { date: string; allDay: boolean } | null {
	const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/)
	if (!m) return null
	const [, y, mo, d, h, mi, s, z] = m
	if (!h) return { date: `${y}-${mo}-${d}`, allDay: true }
	if (z) return { date: localDate(new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi, +s))), allDay: false }
	// Hora "flotante" o con TZID: Google la da en la zona del calendario; tomamos la fecha tal cual.
	return { date: `${y}-${mo}-${d}`, allDay: false }
}

export function parseIcs(ics: string): CalEvent[] {
	const lines = ics.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "").split(/\r?\n/)
	const events: CalEvent[] = []
	let cur: Record<string, { params: string; value: string }> | null = null
	for (const line of lines) {
		if (line === "BEGIN:VEVENT") cur = {}
		else if (line === "END:VEVENT") {
			if (cur && cur.STATUS?.value !== "CANCELLED" && cur.DTSTART) {
				const start = parseIcsDate(cur.DTSTART.value)
				const end = cur.DTEND ? parseIcsDate(cur.DTEND.value) : null
				if (start) {
					const dates = [start.date]
					// DTEND de día completo es exclusivo; los de hora, inclusivo.
					const last = end ? (end.allDay ? addDays(end.date, -1) : end.date) : start.date
					for (let d = addDays(start.date, 1); d <= last && dates.length < 60; d = addDays(d, 1)) dates.push(d)
					const unescape = (s = "") => s.replace(/\\n/gi, " ").replace(/\\([,;\\])/g, "$1")
					events.push({ text: norm(`${unescape(cur.SUMMARY?.value)} ${unescape(cur.DESCRIPTION?.value)}`), dates })
				}
			}
			cur = null
		} else if (cur) {
			const idx = line.indexOf(":")
			if (idx < 0) continue
			const [name, ...params] = line.slice(0, idx).split(";")
			cur[name.toUpperCase()] = { params: params.join(";"), value: line.slice(idx + 1) }
		}
	}
	return events
}

async function loadEvents(): Promise<CalEvent[] | null> {
	const url = process.env.GOOGLE_CALENDAR_ICS_URL
	if (!url) return null
	try {
		const res = await fetch(url, { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) } as RequestInit)
		if (!res.ok) {
			console.error("[whatsapp] calendario", res.status)
			return null
		}
		return parseIcs(await res.text())
	} catch (err) {
		console.error("[whatsapp] calendario falló", err)
		return null
	}
}

function mentions(text: string, slug: string): boolean {
	return (KEYWORDS[slug] ?? []).some((k) => text.includes(k)) || text.includes(slug)
}

function mentionsAnyActivity(text: string): boolean {
	return Object.keys(KEYWORDS).some((slug) => mentions(text, slug))
}

export function availabilityFrom(events: CalEvent[] | null, slug: string, dates: string[]): DayAvailability[] {
	const maxPeople = getSeason(slug).maxPeople
	return dates.map((date) => {
		if (!events) return { date, known: false, blocked: false, full: false, bookedPeople: 0, maxPeople }
		let blocked = false
		let full = false
		let bookedPeople = 0
		for (const ev of events) {
			if (!ev.dates.includes(date)) continue
			const mine = mentions(ev.text, slug)
			if (BLOCK_RE.test(ev.text) && (mine || !mentionsAnyActivity(ev.text))) blocked = true
			if (!mine) continue
			if (FULL_RE.test(ev.text)) full = true
			const pax = ev.text.match(PAX_RE)
			if (pax) bookedPeople += Number(pax[1])
		}
		return { date, known: true, blocked, full, bookedPeople, maxPeople }
	})
}

export async function availabilityFor(slug: string, dates: string[]): Promise<DayAvailability[]> {
	return availabilityFrom(await loadEvents(), slug, dates)
}

export function describeAvailability(a: DayAvailability, people: number): string {
	if (!a.known) return "calendario no disponible: el equipo confirma el lugar después del anticipo"
	if (a.blocked) return "NO HAY SALIDA ese día (bloqueado en el calendario)"
	if (a.full) return "LLENO ese día"
	if (a.bookedPeople && a.bookedPeople + people > a.maxPeople)
		return `ya hay ${a.bookedPeople} personas anotadas (máximo ${a.maxPeople} por salida): el equipo debe confirmar si cabe el grupo`
	if (a.bookedPeople) return `con lugar (ya hay ${a.bookedPeople} personas anotadas; salida confirmada con grupo)`
	return "con lugar (sin reservas anotadas aún)"
}
