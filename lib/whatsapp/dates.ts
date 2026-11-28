import { experiences } from "@/constants/experiences"
import { isDateInSeason, seasonLabel } from "@/lib/expedition-seasons"
import { availabilityFor, departuresWithRoom, describeAvailability } from "@/lib/whatsapp/availability"
import { describeForecast, forecastFor, FORECAST_DAYS, windyUrl } from "@/lib/whatsapp/weather"

/** Herramienta revisar_fechas: temporada + calendario + clima en un solo paso. */

const TZ = "America/Mazatlan"
const MAX_DATES = 7

/**
 * Bahía Magdalena sale con mínimo 4 personas. Con menos de 2 días de anticipación
 * el equipo tiene que revisar si junta el grupo: el bot no confirma ni cobra.
 * (Las demás actividades salen siempre que el clima lo permita.)
 */
export const SHORT_NOTICE: Record<string, { minPeople: number; days: number }> = {
	"safari-bahia-magdalena": { minPeople: 4, days: 2 },
}

/** Si la fecha es de último minuto y el grupo no llega al mínimo, devuelve el aviso; si no, null. */
export async function shortNoticeIssue(slug: string, date: string, people: number): Promise<string | null> {
	const rule = SHORT_NOTICE[slug]
	if (!rule) return null
	if (daysBetween(todayISO(), date) >= rule.days) return null
	const [a] = await availabilityFor(slug, [date])
	const total = (a?.bookedPeople ?? 0) + people
	if (total >= rule.minPeople) return null
	return `ÚLTIMO MINUTO: faltan menos de ${rule.days} días y la salida necesita mínimo ${rule.minPeople} personas (con este grupo serían ${total}). No confirmes ni mandes link de pago: dile al cliente que lo revisas con el equipo y usa pasar_a_humano.`
}

export function slugs(): string[] {
	return experiences.map((e) => e.slug)
}

function todayISO(): string {
	return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date())
}

function daysBetween(a: string, b: string): number {
	return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000)
}

function weekday(iso: string): string {
	return new Intl.DateTimeFormat("es-MX", { timeZone: "UTC", weekday: "long", day: "numeric", month: "short" }).format(new Date(`${iso}T12:00:00Z`))
}

export async function checkDates(slug: string, rawDates: unknown, people: number): Promise<string> {
	const exp = experiences.find((e) => e.slug === slug)
	if (!exp) return `Actividad desconocida: ${slug}`
	const today = todayISO()
	const valid = [...new Set((Array.isArray(rawDates) ? rawDates : []).map(String))]
		.filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d)))
		.sort()
		.slice(0, MAX_DATES)
	if (!valid.length) return "No hay fechas válidas (usa AAAA-MM-DD)."

	const past = valid.filter((d) => d < today)
	const dates = valid.filter((d) => d >= today)
	const inSeason = dates.filter((d) => isDateInSeason(slug, d))
	const forecastable = inSeason.filter((d) => daysBetween(today, d) < FORECAST_DAYS)

	const [avail, forecast] = await Promise.all([availabilityFor(slug, inSeason), forecastable.length ? forecastFor(slug, forecastable) : null])

	const lines = [`${exp.i18n.es.title} · ${people} ${people === 1 ? "persona" : "personas"}`]
	for (const d of past) lines.push(`• ${d}: ya pasó.`)
	for (const d of dates) {
		if (!isDateInSeason(slug, d)) {
			lines.push(`• ${weekday(d)} (${d}): FUERA DE TEMPORADA (${seasonLabel(slug, "es")}).`)
			continue
		}
		const a = avail.find((x) => x.date === d)
		const f = forecast?.find((x) => x.date === d)
		const clima = f
			? describeForecast(f, slug)
			: daysBetween(today, d) >= FORECAST_DAYS
				? "aún sin pronóstico (muy lejano; el capitán lo revisa 1–2 días antes)"
				: "pronóstico no disponible por ahora"
		const rush = await shortNoticeIssue(slug, d, people)
		lines.push(`• ${weekday(d)} (${d}): ${a ? describeAvailability(a, people) : "sin dato de calendario"}. Clima: ${clima}.${rush ? ` ${rush}` : ""}`)
	}
	const windy = windyUrl(slug)
	if (windy && forecastable.length) lines.push(`Mapa del clima en Windy: ${windy}`)
	lines.push("(Viento en nudos en el horario de la actividad. Calificación orientativa: la salida la decide el capitán.)")
	return lines.join("\n")
}

/**
 * Herramienta salidas_confirmadas: días del rango del cliente en que ya sale un
 * grupo de esa actividad y todavía cabe el suyo. Sirve para llenar primero las
 * lanchas que ya salen (sobre todo Bahía Magdalena y Ballena gris).
 */
export async function confirmedDepartures(slug: string, rawFrom: unknown, rawTo: unknown, people: number): Promise<string> {
	const exp = experiences.find((e) => e.slug === slug)
	if (!exp) return `Actividad desconocida: ${slug}`
	const iso = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) ? v : "")
	const today = todayISO()
	let from = iso(rawFrom) || today
	if (from < today) from = today
	const to = iso(rawTo) || from
	if (to < from) return "El rango de fechas no es válido (desde debe ser antes de hasta)."
	const found = (await departuresWithRoom(slug, from, to, people)).filter((a) => isDateInSeason(slug, a.date))
	if (!found.length)
		return `${exp.i18n.es.title}: no hay salidas ya confirmadas con lugar entre ${from} y ${to} para ${people} ${people === 1 ? "persona" : "personas"}. Ofrece la fecha que más le acomode al cliente (revísala con revisar_fechas).`
	const lines = found.map((a) => `• ${weekday(a.date)} (${a.date}): ya van ${a.bookedPeople}, quedan ${a.maxPeople - a.bookedPeople} lugares`)
	return [`${exp.i18n.es.title}: salidas YA CONFIRMADAS con lugar entre ${from} y ${to} (ofrécelas primero):`, ...lines, "Revisa el clima de la que elija con revisar_fechas."].join("\n")
}
