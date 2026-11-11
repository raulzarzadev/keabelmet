/**
 * Pronóstico por actividad para el bot de WhatsApp.
 *
 * Datos: Open-Meteo (gratis, sin llave; usa los mismos modelos globales que
 * Windy: ECMWF, GFS, ICON) para viento, ráfagas, lluvia y oleaje. Al cliente se
 * le manda además el link de Windy del punto para que vea el mapa.
 *
 * El bot nunca cancela ni confirma por el clima: informa y, si se ve mal,
 * propone otra fecha. La decisión final la toma el capitán uno o dos días antes.
 */

export interface Spot {
	name: string
	lat: number
	lon: number
	/** Horas (locales) en que la actividad está en el agua. */
	fromHour: number
	toHour: number
}

/** Punto de referencia en el agua de cada expedición. */
export const SPOTS: Record<string, Spot> = {
	"tiburon-ballena": { name: "Bahía de La Paz (El Mogote)", lat: 24.18, lon: -110.4, fromHour: 8, toHour: 13 },
	"tour-espiritu-santo": { name: "Isla Espíritu Santo", lat: 24.5, lon: -110.37, fromHour: 8, toHour: 16 },
	"buceo-la-paz": { name: "Isla Espíritu Santo", lat: 24.5, lon: -110.37, fromHour: 8, toHour: 15 },
	"scuba-discovery": { name: "Bahía de La Paz (Pichilingue)", lat: 24.27, lon: -110.33, fromHour: 8, toHour: 14 },
	"certificacion-open-water": { name: "Bahía de La Paz (Pichilingue)", lat: 24.27, lon: -110.33, fromHour: 8, toHour: 15 },
	"safari-la-ventana": { name: "La Ventana · Canal de Cerralvo", lat: 24.05, lon: -109.95, fromHour: 8, toHour: 14 },
	"buceo-cabo-pulmo": { name: "Cabo Pulmo", lat: 23.44, lon: -109.42, fromHour: 8, toHour: 14 },
	"tour-ballena-gris": { name: "Puerto Chale (Bahía Magdalena)", lat: 24.4, lon: -111.98, fromHour: 8, toHour: 13 },
	"safari-bahia-magdalena": { name: "Mar abierto frente a Bahía Magdalena", lat: 24.5, lon: -112.2, fromHour: 7, toHour: 14 },
}

/** Más allá de esto Open-Meteo ya no da pronóstico. */
export const FORECAST_DAYS = 16

const TZ = "America/Mazatlan"

export type Outlook = "bueno" | "movido" | "riesgoso"

export interface DayForecast {
	date: string
	/** Viento sostenido máximo en el horario de la actividad (nudos). */
	windKn: number | null
	gustKn: number | null
	windFrom: string | null
	waveM: number | null
	rainProb: number | null
	tempC: number | null
	outlook: Outlook | null
}

export function windyUrl(slug: string): string | null {
	const s = SPOTS[slug]
	return s ? `https://www.windy.com/?${s.lat},${s.lon},10` : null
}

/**
 * Umbrales orientativos (no operativos): con ellos el bot decide si menciona
 * el clima como riesgo. El capitán decide la salida.
 */
export function rate(windKn: number | null, gustKn: number | null, waveM: number | null): Outlook | null {
	if (windKn == null && gustKn == null && waveM == null) return null
	const w = windKn ?? 0
	const g = gustKn ?? w
	const h = waveM ?? 0
	if (w > 18 || g > 25 || h > 1.8) return "riesgoso"
	if (w > 12 || g > 18 || h > 1.0) return "movido"
	return "bueno"
}

const COMPASS = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"]
function compass(deg: number): string {
	return COMPASS[Math.round((((deg % 360) + 360) % 360) / 45) % 8]
}

type Hourly = Record<string, (number | null)[]> & { time: string[] }

async function getJson(url: string): Promise<{ hourly?: Hourly } | null> {
	try {
		const res = await fetch(url, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(8000) } as RequestInit)
		if (!res.ok) {
			console.error("[whatsapp] clima", res.status, url)
			return null
		}
		return (await res.json()) as { hourly?: Hourly }
	} catch (err) {
		console.error("[whatsapp] clima falló", err)
		return null
	}
}

function maxOf(values: (number | null | undefined)[]): number | null {
	const nums = values.filter((v): v is number => typeof v === "number" && Number.isFinite(v))
	return nums.length ? Math.max(...nums) : null
}

/** Pronóstico de cada fecha (AAAA-MM-DD) en el horario de la actividad. */
export async function forecastFor(slug: string, dates: string[]): Promise<DayForecast[] | null> {
	const spot = SPOTS[slug]
	if (!spot || !dates.length) return null
	const sorted = [...dates].sort()
	const range = `start_date=${sorted[0]}&end_date=${sorted[sorted.length - 1]}`
	const base = `latitude=${spot.lat}&longitude=${spot.lon}&timezone=${encodeURIComponent(TZ)}&${range}`
	const [weather, marine] = await Promise.all([
		getJson(
			`https://api.open-meteo.com/v1/forecast?${base}&hourly=wind_speed_10m,wind_gusts_10m,wind_direction_10m,precipitation_probability,temperature_2m&wind_speed_unit=kn`,
		),
		getJson(`https://marine-api.open-meteo.com/v1/marine?${base}&hourly=wave_height`),
	])
	if (!weather?.hourly) return null

	const pick = (h: Hourly | undefined, key: string, date: string): (number | null)[] => {
		if (!h?.time || !h[key]) return []
		const out: (number | null)[] = []
		h.time.forEach((t, i) => {
			const hour = Number(t.slice(11, 13))
			if (t.startsWith(date) && hour >= spot.fromHour && hour <= spot.toHour) out.push(h[key][i] ?? null)
		})
		return out
	}

	return dates.map((date) => {
		const wind = pick(weather.hourly, "wind_speed_10m", date)
		const windKn = maxOf(wind)
		const gustKn = maxOf(pick(weather.hourly, "wind_gusts_10m", date))
		const waveM = maxOf(pick(marine?.hourly, "wave_height", date))
		// Dirección a la hora de más viento.
		const dirs = pick(weather.hourly, "wind_direction_10m", date)
		const iMax = windKn == null ? -1 : wind.indexOf(windKn)
		const dir = iMax >= 0 ? dirs[iMax] : null
		return {
			date,
			windKn: windKn == null ? null : Math.round(windKn),
			gustKn: gustKn == null ? null : Math.round(gustKn),
			windFrom: typeof dir === "number" ? compass(dir) : null,
			waveM: waveM == null ? null : Math.round(waveM * 10) / 10,
			rainProb: maxOf(pick(weather.hourly, "precipitation_probability", date)),
			tempC: maxOf(pick(weather.hourly, "temperature_2m", date)),
			outlook: rate(windKn, gustKn, waveM),
		}
	})
}

export function describeForecast(f: DayForecast): string {
	if (!f.outlook) return "sin datos de pronóstico"
	const parts = [
		f.windKn != null ? `viento hasta ${f.windKn} nudos${f.windFrom ? ` del ${f.windFrom}` : ""}` : null,
		f.gustKn != null ? `ráfagas ${f.gustKn} nudos` : null,
		f.waveM != null ? `olas ${f.waveM} m` : null,
		f.rainProb != null ? `lluvia ${Math.round(f.rainProb)} %` : null,
		f.tempC != null ? `máx ${Math.round(f.tempC)} °C` : null,
	].filter(Boolean)
	return `${f.outlook.toUpperCase()} (${parts.join(", ")})`
}
