import { experiences } from "@/constants/experiences"
import { isDateInSeason, seasonLabel } from "@/lib/expedition-seasons"
import { availabilityFor, describeAvailability } from "@/lib/whatsapp/availability"
import { describeForecast, forecastFor, FORECAST_DAYS, windyUrl } from "@/lib/whatsapp/weather"

/** Herramienta revisar_fechas: temporada + calendario + clima en un solo paso. */

const TZ = "America/Mazatlan"
const MAX_DATES = 7

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
			? describeForecast(f)
			: daysBetween(today, d) >= FORECAST_DAYS
				? "aún sin pronóstico (muy lejano; el capitán lo revisa 1–2 días antes)"
				: "pronóstico no disponible por ahora"
		lines.push(`• ${weekday(d)} (${d}): ${a ? describeAvailability(a, people) : "sin dato de calendario"}. Clima: ${clima}.`)
	}
	const windy = windyUrl(slug)
	if (windy && forecastable.length) lines.push(`Mapa del clima en Windy: ${windy}`)
	lines.push("(Viento en nudos en el horario de la actividad. Calificación orientativa: la salida la decide el capitán.)")
	return lines.join("\n")
}
