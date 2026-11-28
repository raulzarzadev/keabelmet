/**
 * Pronóstico por actividad para el bot de WhatsApp.
 *
 * Datos: Open-Meteo (gratis, sin llave; usa los mismos modelos globales que
 * Windy: ECMWF, GFS, ICON) para viento, ráfagas, lluvia y oleaje. El link de
 * Windy del punto se comparte solo si el cliente pregunta por el clima.
 *
 * El bot nunca cancela ni confirma por el clima: informa y, si se ve mal,
 * propone otra fecha. La decisión final la toma el capitán uno o dos días antes.
 *
 * Cómo se califica el día (criterio de los capitanes, 2026-11):
 * - Manda el viento sostenido de la MAÑANA (de la salida a las 11 h): "si entre
 *   10 y 11 pinta bien, el día va a estar bonito". Después de mediodía el viento
 *   casi siempre sube; eso se reporta aparte pero no cambia la calificación.
 * - Cada zona tiene sus límites en nudos (calmKn / stopKn).
 * - Viento del oeste en el Golfo (La Paz, Espíritu Santo, La Ventana, Cabo
 *   Pulmo): la tierra lo tapa, así que se tolera más (WEST_SHELTER_KN).
 * - En Bahía Magdalena el viento del norte es el que más afecta (NORTH_PENALTY_KN).
 * - Ráfagas y olas: los capitanes no usan cifras; son límites de respaldo
 *   nuestros, generosos, para no espantar por números del modelo.
 */

interface WaveLimits {
	/** Altura (m) desde la que el día pasa a MOVIDO. */
	movidoM: number
	/** Altura (m) desde la que el día pasa a RIESGOSO. */
	riesgosoM: number
	/** Si es true, cuenta el periodo (Pacífico): ola corta (< 8 s) pesa más y mar de fondo largo (≥ 11 s) pesa menos. */
	shortPeriodMatters?: boolean
}

export interface Spot {
	name: string
	lat: number
	lon: number
	/** Horas (locales) en que la actividad está en el agua. */
	fromHour: number
	toHour: number
	/** Hasta estos nudos (sostenidos, en la mañana) el mar está tranquilo. */
	calmKn: number
	/** Desde estos nudos los capitanes no salen. */
	stopKn: number
	/** true: el viento del oeste viene de tierra y casi no levanta mar. */
	westShelter: boolean
	/** true: el viento del norte es el que más afecta. */
	northWorse?: boolean
	/** null: no se califica por olas (p. ej. dentro del estero). */
	waves: WaveLimits | null
}

const GULF_WAVES: WaveLimits = { movidoM: 1.0, riesgosoM: 1.8 }
const PACIFIC_WAVES: WaveLimits = { movidoM: 2.0, riesgosoM: 3.0, shortPeriodMatters: true }

/** Punto de referencia en el agua de cada expedición y sus límites. */
export const SPOTS: Record<string, Spot> = {
	"tiburon-ballena": { name: "Bahía de La Paz (El Mogote)", lat: 24.18, lon: -110.4, fromHour: 8, toHour: 13, calmKn: 8, stopKn: 14, westShelter: true, waves: GULF_WAVES },
	"tour-espiritu-santo": { name: "Isla Espíritu Santo", lat: 24.5, lon: -110.37, fromHour: 8, toHour: 16, calmKn: 8, stopKn: 14, westShelter: true, waves: GULF_WAVES },
	"buceo-la-paz": { name: "Isla Espíritu Santo", lat: 24.5, lon: -110.37, fromHour: 8, toHour: 15, calmKn: 8, stopKn: 14, westShelter: true, waves: GULF_WAVES },
	"scuba-discovery": { name: "Bahía de La Paz (Pichilingue)", lat: 24.27, lon: -110.33, fromHour: 8, toHour: 14, calmKn: 8, stopKn: 14, westShelter: true, waves: GULF_WAVES },
	"certificacion-open-water": { name: "Bahía de La Paz (Pichilingue)", lat: 24.27, lon: -110.33, fromHour: 8, toHour: 15, calmKn: 8, stopKn: 14, westShelter: true, waves: GULF_WAVES },
	"safari-la-ventana": { name: "La Ventana · Canal de Cerralvo", lat: 24.05, lon: -109.95, fromHour: 8, toHour: 14, calmKn: 8, stopKn: 12, westShelter: true, waves: GULF_WAVES },
	"buceo-cabo-pulmo": { name: "Cabo Pulmo", lat: 23.44, lon: -109.42, fromHour: 8, toHour: 14, calmKn: 8, stopKn: 13, westShelter: true, waves: GULF_WAVES },
	"tour-ballena-gris": { name: "Puerto Chale (Bahía Magdalena)", lat: 24.4, lon: -111.98, fromHour: 8, toHour: 13, calmKn: 8, stopKn: 12, westShelter: false, waves: null },
	"safari-bahia-magdalena": { name: "Mar abierto frente a Bahía Magdalena", lat: 24.5, lon: -112.2, fromHour: 7, toHour: 14, calmKn: 8, stopKn: 12, westShelter: false, northWorse: true, waves: PACIFIC_WAVES },
}

/** Nudos de más que se toleran con viento del oeste en el Golfo. */
const WEST_SHELTER_KN = 4
/** Nudos de menos con viento del norte en Bahía Magdalena. */
const NORTH_PENALTY_KN = 2
/** La calificación usa el viento hasta esta hora; después solo se informa. */
const MORNING_END_HOUR = 11
/** Ráfagas: solo pasan a RIESGOSO si superan el límite de la zona por esto. */
const GUST_MARGIN_KN = 10

/** Más allá de esto Open-Meteo ya no da pronóstico. */
export const FORECAST_DAYS = 16

const TZ = "America/Mazatlan"

export type Outlook = "bueno" | "movido" | "riesgoso"

export interface DayForecast {
	date: string
	/** Viento sostenido máximo en la mañana (de la salida a las 11 h), en nudos. */
	windKn: number | null
	/** Viento sostenido máximo de mediodía al regreso. */
	afternoonKn: number | null
	gustKn: number | null
	windFrom: string | null
	waveM: number | null
	wavePeriodS: number | null
	rainProb: number | null
	tempC: number | null
	outlook: Outlook | null
}

export function windyUrl(slug: string): string | null {
	const s = SPOTS[slug]
	return s ? `https://www.windy.com/?${s.lat},${s.lon},10` : null
}

const COMPASS = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"]
function compass(deg: number): string {
	return COMPASS[Math.round((((deg % 360) + 360) % 360) / 45) % 8]
}

/** Límites de viento de la zona ese día, según de dónde sople. */
export function windLimits(spot: Spot, windFrom: string | null): { calm: number; stop: number; note?: string } {
	if (spot.westShelter && windFrom === "O") return { calm: spot.calmKn + WEST_SHELTER_KN, stop: spot.stopKn + WEST_SHELTER_KN, note: "viento del oeste (lo tapa la tierra)" }
	if (spot.northWorse && windFrom === "N")
		return { calm: spot.calmKn - NORTH_PENALTY_KN, stop: spot.stopKn - NORTH_PENALTY_KN, note: "viento del norte (el que más afecta aquí)" }
	return { calm: spot.calmKn, stop: spot.stopKn }
}

/**
 * Califica el día. Umbrales orientativos (no operativos): con ellos el bot
 * decide si menciona el clima. El capitán decide la salida.
 */
export function rate(
	spot: Spot,
	f: { windKn: number | null; gustKn: number | null; windFrom: string | null; waveM: number | null; wavePeriodS: number | null },
): Outlook | null {
	if (f.windKn == null && f.waveM == null) return null
	const { calm, stop } = windLimits(spot, f.windFrom)
	const w = f.windKn ?? 0
	const g = f.gustKn ?? 0
	let out: Outlook = "bueno"
	const bump = (o: Outlook) => {
		if (o === "riesgoso" || (o === "movido" && out === "bueno")) out = o
	}

	if (w >= stop || g >= stop + GUST_MARGIN_KN) bump("riesgoso")
	else if (w > calm) bump("movido")

	const lim = spot.waves
	if (lim && f.waveM != null) {
		const p = lim.shortPeriodMatters ? f.wavePeriodS : null
		const h = p == null ? f.waveM : p < 8 ? f.waveM * 1.5 : p >= 11 ? f.waveM * 0.8 : f.waveM
		if (h > lim.riesgosoM) bump("riesgoso")
		else if (h > lim.movidoM) bump("movido")
	}
	return out
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
		spot.waves ? getJson(`https://marine-api.open-meteo.com/v1/marine?${base}&hourly=wave_height,wave_period`) : Promise.resolve(null),
	])
	if (!weather?.hourly) return null

	const morningEnd = Math.min(spot.toHour, MORNING_END_HOUR)
	const pick = (h: Hourly | undefined, key: string, date: string, from: number, to: number): (number | null)[] => {
		if (!h?.time || !h[key]) return []
		const out: (number | null)[] = []
		h.time.forEach((t, i) => {
			const hour = Number(t.slice(11, 13))
			if (t.startsWith(date) && hour >= from && hour <= to) out.push(h[key][i] ?? null)
		})
		return out
	}

	return dates.map((date) => {
		const am = (h: Hourly | undefined, key: string) => pick(h, key, date, spot.fromHour, morningEnd)
		const wind = am(weather.hourly, "wind_speed_10m")
		const windKn = maxOf(wind)
		const afternoonKn = morningEnd < spot.toHour ? maxOf(pick(weather.hourly, "wind_speed_10m", date, morningEnd + 1, spot.toHour)) : null
		const gustKn = maxOf(am(weather.hourly, "wind_gusts_10m"))
		const waves = am(marine?.hourly, "wave_height")
		const waveM = maxOf(waves)
		const iWave = waveM == null ? -1 : waves.indexOf(waveM)
		const period = iWave >= 0 ? am(marine?.hourly, "wave_period")[iWave] : null
		// Dirección a la hora de más viento de la mañana.
		const dirs = am(weather.hourly, "wind_direction_10m")
		const iMax = windKn == null ? -1 : wind.indexOf(windKn)
		const dir = iMax >= 0 ? dirs[iMax] : null
		const f = {
			windKn: windKn == null ? null : Math.round(windKn),
			gustKn: gustKn == null ? null : Math.round(gustKn),
			windFrom: typeof dir === "number" ? compass(dir) : null,
			waveM: waveM == null ? null : Math.round(waveM * 10) / 10,
			wavePeriodS: typeof period === "number" ? Math.round(period) : null,
		}
		return {
			date,
			...f,
			afternoonKn: afternoonKn == null ? null : Math.round(afternoonKn),
			rainProb: maxOf(pick(weather.hourly, "precipitation_probability", date, spot.fromHour, spot.toHour)),
			tempC: maxOf(pick(weather.hourly, "temperature_2m", date, spot.fromHour, spot.toHour)),
			outlook: rate(spot, f),
		}
	})
}

/** Texto para el bot (no para el cliente). */
export function describeForecast(f: DayForecast, slug?: string): string {
	if (!f.outlook) return "sin datos de pronóstico"
	const spot = slug ? SPOTS[slug] : undefined
	const lim = spot ? windLimits(spot, f.windFrom) : null
	const parts = [
		f.windKn != null ? `mañana: viento hasta ${f.windKn} nudos${f.windFrom ? ` del ${f.windFrom}` : ""}` : null,
		lim ? `límites de la zona: tranquilo hasta ${lim.calm}, no se sale desde ${lim.stop}${lim.note ? `, ${lim.note}` : ""}` : null,
		f.afternoonKn != null && f.windKn != null && f.afternoonKn > f.windKn ? `después de mediodía sube a ${f.afternoonKn} nudos (normal; no cambia la calificación)` : null,
		f.gustKn != null ? `ráfagas ${f.gustKn}` : null,
		f.waveM != null ? `olas ${f.waveM} m${f.wavePeriodS != null ? ` cada ${f.wavePeriodS} s` : ""}` : null,
		f.rainProb != null ? `lluvia ${Math.round(f.rainProb)} %` : null,
		f.tempC != null ? `máx ${Math.round(f.tempC)} °C` : null,
	].filter(Boolean)
	return `${f.outlook.toUpperCase()} (${parts.join("; ")})`
}
