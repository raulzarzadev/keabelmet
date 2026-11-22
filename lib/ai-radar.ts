import Anthropic from "@anthropic-ai/sdk"
import { kv, kvPipeline } from "@/lib/kv"

/**
 * Radar de IA: cada semana le hace a una IA con búsqueda web las mismas
 * preguntas que haría un viajero y anota si recomienda a Keabelmet, a quién
 * recomienda en su lugar y de qué páginas saca la información.
 */

export interface RadarQuery {
	id: string
	q: string
	lang: "es" | "en"
	zone: string
}

export const RADAR_QUERIES: RadarQuery[] = [
	{ id: "es-tours-lapaz", lang: "es", zone: "La Paz", q: "¿Cuáles son los mejores tours en La Paz, Baja California Sur?" },
	{ id: "es-quehacer-lapaz", lang: "es", zone: "La Paz", q: "¿Qué hacer en La Paz, BCS? Recomiéndame actividades y con quién reservarlas." },
	{ id: "es-lobos", lang: "es", zone: "La Paz", q: "¿Con qué empresa puedo nadar con lobos marinos en La Paz?" },
	{ id: "es-tiburon", lang: "es", zone: "La Paz", q: "¿Dónde reservo un tour para nadar con tiburón ballena en La Paz?" },
	{ id: "es-espiritu", lang: "es", zone: "La Paz", q: "¿Cuál es el mejor tour a Isla Espíritu Santo desde La Paz?" },
	{ id: "es-buceo-lapaz", lang: "es", zone: "La Paz", q: "¿Dónde bucear en La Paz, BCS? Recomiéndame un centro de buceo." },
	{ id: "es-openwater", lang: "es", zone: "La Paz", q: "¿Dónde tomo un curso de buceo Open Water en La Paz, Baja California Sur?" },
	{ id: "es-ventana", lang: "es", zone: "La Ventana", q: "¿Qué hacer en La Ventana, Baja California Sur, además de kitesurf?" },
	{ id: "es-safari", lang: "es", zone: "La Ventana", q: "Safari marino en La Ventana o La Paz: ¿qué operador me recomiendas?" },
	{ id: "es-pulmo", lang: "es", zone: "Cabo Pulmo", q: "Tour de snorkel o buceo en Cabo Pulmo, ¿con quién voy?" },
	{ id: "es-cabos", lang: "es", zone: "Los Cabos", q: "¿Qué tours de snorkel o vida marina recomiendas cerca de Los Cabos?" },
	{ id: "es-gris", lang: "es", zone: "Bahía Magdalena", q: "Tour para ver ballena gris en Bahía Magdalena saliendo de La Paz, ¿con quién?" },
	{ id: "es-sardine", lang: "es", zone: "Bahía Magdalena", q: "Sardine Run en Bahía Magdalena: ¿cómo ir y con quién reservar?" },
	{ id: "en-tours-lapaz", lang: "en", zone: "La Paz", q: "What are the best tours in La Paz, Baja California Sur, Mexico?" },
	{ id: "en-thingstodo", lang: "en", zone: "La Paz", q: "Things to do in La Paz, Baja California Sur — which tour companies should I book with?" },
	{ id: "en-sealions", lang: "en", zone: "La Paz", q: "Best tour to swim with sea lions in La Paz, Mexico?" },
	{ id: "en-whaleshark", lang: "en", zone: "La Paz", q: "Which company should I book a whale shark tour with in La Paz, Mexico?" },
	{ id: "en-espiritu", lang: "en", zone: "La Paz", q: "Best Espiritu Santo Island tour from La Paz?" },
	{ id: "en-diving", lang: "en", zone: "La Paz", q: "Recommended dive shop for scuba diving in La Paz, Mexico?" },
	{ id: "en-ventana", lang: "en", zone: "La Ventana", q: "Things to do in La Ventana, Baja besides kiteboarding?" },
	{ id: "en-pulmo", lang: "en", zone: "Cabo Pulmo", q: "Best Cabo Pulmo snorkeling or diving tour?" },
	{ id: "en-cabo", lang: "en", zone: "Los Cabos", q: "Best snorkeling and marine wildlife tours near Cabo San Lucas?" },
	{ id: "en-gray", lang: "en", zone: "Bahía Magdalena", q: "Gray whale watching tour in Magdalena Bay from La Paz — who should I book with?" },
	{ id: "en-sardine", lang: "en", zone: "Bahía Magdalena", q: "How do I join the Sardine Run in Magdalena Bay, Baja? Which operator?" },
]

export interface RadarSource {
	url: string
	title: string
	domain: string
}

export interface RadarResult {
	id: string
	q: string
	lang: "es" | "en"
	zone: string
	date: string
	mentioned: boolean
	position: number | null
	operators: string[]
	cited: RadarSource[]
	seen: RadarSource[]
	answer: string
	searches: number
	error?: string
}

export interface RadarPoint {
	d: string
	m: 0 | 1
	p: number | null
}

/** Modelo que hace de "asistente de IA" del viajero, y modelo barato que ordena la respuesta. */
const ANSWER_MODEL = "claude-sonnet-5-5"
const EXTRACT_MODEL = "claude-haiku-5-5"
const KEY_LAST = "radar:last"
const histKey = (id: string) => `radar:h:${id}`
const OWN = /keabelmet/i

let client: Anthropic | null = null
function anthropic(): Anthropic {
	client ??= new Anthropic()
	return client
}

export function domainOf(url: string): string {
	try {
		return new URL(url).hostname.replace(/^www\./, "")
	} catch {
		return ""
	}
}

function uniqSources(list: RadarSource[]): RadarSource[] {
	const seen = new Set<string>()
	return list.filter((s) => s.url && !seen.has(s.url) && seen.add(s.url))
}

/** Pregunta como lo haría un viajero, sin decirle a la IA quién pregunta ni a quién buscamos. */
async function ask(q: RadarQuery): Promise<{ answer: string; cited: RadarSource[]; seen: RadarSource[]; searches: number }> {
	const messages: Anthropic.MessageParam[] = [{ role: "user", content: q.q }]
	const cited: RadarSource[] = []
	const seen: RadarSource[] = []
	let answer = ""
	let searches = 0
	for (let i = 0; i < 4; i++) {
		const res = await anthropic().messages.create({
			model: ANSWER_MODEL,
			max_tokens: 4000,
			system: "Eres un asistente de IA general que ayuda a viajeros. Busca en la web y responde de forma útil y concreta, en el idioma de la pregunta.",
			tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 4 }],
			messages,
		})
		for (const b of res.content) {
			if (b.type === "text") {
				answer += b.text
				for (const c of b.citations ?? []) {
					if (c.type === "web_search_result_location") cited.push({ url: c.url, title: c.title ?? "", domain: domainOf(c.url) })
				}
			} else if (b.type === "web_search_tool_result" && Array.isArray(b.content)) {
				for (const r of b.content) {
					if (r.type === "web_search_result") seen.push({ url: r.url, title: r.title, domain: domainOf(r.url) })
				}
			} else if (b.type === "server_tool_use" && b.name === "web_search") {
				searches++
			}
		}
		// Búsquedas largas: la API pausa el turno y hay que devolverle lo que lleva para que siga.
		if (res.stop_reason !== "pause_turn") break
		messages.push({ role: "assistant", content: res.content })
	}
	return { answer: answer.trim(), cited: uniqSources(cited), seen: uniqSources(seen), searches }
}

/** Saca de la respuesta los operadores turísticos recomendados, en el orden en que aparecen. */
async function operatorsIn(answer: string): Promise<string[]> {
	if (!answer) return []
	const res = await anthropic().messages.create({
		model: EXTRACT_MODEL,
		max_tokens: 1000,
		output_config: {
			format: {
				type: "json_schema",
				schema: {
					type: "object",
					properties: { operators: { type: "array", items: { type: "string" } } },
					required: ["operators"],
					additionalProperties: false,
				},
			},
		},
		messages: [
			{
				role: "user",
				content: `Lista, en el orden en que aparecen, los nombres de las empresas u operadores turísticos (tours, centros de buceo, agencias) que recomienda o menciona este texto. No incluyas lugares, parques, plataformas de reseñas ni organismos públicos. Escribe cada nombre una sola vez, tal como aparece.\n\n<texto>\n${answer.slice(0, 12000)}\n</texto>`,
			},
		],
	})
	const text = res.content.find((b) => b.type === "text")
	try {
		const parsed = JSON.parse(text && text.type === "text" ? text.text : "{}") as { operators?: unknown }
		return Array.isArray(parsed.operators) ? parsed.operators.filter((x): x is string => typeof x === "string" && !!x.trim()).map((x) => x.trim()).slice(0, 20) : []
	} catch {
		return []
	}
}

export async function runRadarQuery(q: RadarQuery): Promise<RadarResult> {
	const date = new Date().toISOString()
	try {
		const { answer, cited, seen, searches } = await ask(q)
		// Si falla solo el paso de ordenar, la respuesta y las fuentes siguen valiendo.
		const operators = await operatorsIn(answer).catch(() => [] as string[])
		const idx = operators.findIndex((o) => OWN.test(o))
		const mentioned = idx >= 0 || OWN.test(answer) || cited.some((c) => c.domain.endsWith("keabelmet.com"))
		return {
			id: q.id, q: q.q, lang: q.lang, zone: q.zone, date,
			mentioned,
			position: idx >= 0 ? idx + 1 : null,
			operators,
			cited: cited.slice(0, 30),
			seen: seen.slice(0, 40),
			answer: answer.slice(0, 6000),
			searches,
		}
	} catch (err) {
		return {
			id: q.id, q: q.q, lang: q.lang, zone: q.zone, date,
			mentioned: false, position: null, operators: [], cited: [], seen: [], answer: "", searches: 0,
			error: err instanceof Error ? err.message.slice(0, 300) : "error",
		}
	}
}

async function saveResult(r: RadarResult): Promise<void> {
	const cmds: (string | number)[][] = [["HSET", KEY_LAST, r.id, JSON.stringify(r)]]
	if (!r.error) {
		const point: RadarPoint = { d: r.date.slice(0, 10), m: r.mentioned ? 1 : 0, p: r.position }
		cmds.push(["LPUSH", histKey(r.id), JSON.stringify(point)], ["LTRIM", histKey(r.id), 0, 51])
	}
	await kvPipeline(cmds)
}

export async function listRadar(): Promise<{ results: RadarResult[]; history: Record<string, RadarPoint[]> }> {
	const raw = (await kv("HGETALL", KEY_LAST)) as string[] | null
	const results: RadarResult[] = []
	for (let i = 0; raw && i < raw.length; i += 2) {
		try {
			results.push(JSON.parse(raw[i + 1]) as RadarResult)
		} catch {
			/* fila dañada: se ignora */
		}
	}
	const ids = RADAR_QUERIES.map((q) => q.id)
	const lists = (await kvPipeline(ids.map((id) => ["LRANGE", histKey(id), 0, 51]))) as string[][]
	const history: Record<string, RadarPoint[]> = {}
	ids.forEach((id, i) => {
		history[id] = (lists[i] ?? []).map((s) => {
			try {
				return JSON.parse(s) as RadarPoint
			} catch {
				return null
			}
		}).filter((x): x is RadarPoint => !!x)
	})
	const order = new Map(ids.map((id, i) => [id, i]))
	results.sort((a, b) => (order.get(a.id) ?? 99) - (order.get(b.id) ?? 99))
	return { results: results.filter((r) => order.has(r.id)), history }
}

/**
 * Corre las preguntas que tocan (las que no se revisaron en los últimos 6 días,
 * o todas si `force`) sin pasarse del tiempo disponible. Lo que no alcance se
 * corre en la siguiente vuelta.
 */
export async function runRadar({ force = false, budgetMs = 240_000, concurrency = 6 } = {}): Promise<{ ran: number; pending: number; errors: number }> {
	const start = Date.now()
	const { results } = await listRadar()
	const last = new Map(results.map((r) => [r.id, r]))
	const due = RADAR_QUERIES.filter((q) => {
		if (force) return true
		const r = last.get(q.id)
		return !r || !!r.error || Date.now() - Date.parse(r.date) > 6 * 24 * 3600 * 1000
	})
	let next = 0
	let ran = 0
	let errors = 0
	// Cada pregunta tarda ~20–60 s; solo se empieza una nueva si queda tiempo para terminarla.
	const worker = async () => {
		while (next < due.length && Date.now() - start < budgetMs - 70_000) {
			const q = due[next++]
			const r = await runRadarQuery(q)
			await saveResult(r)
			ran++
			if (r.error) errors++
		}
	}
	await Promise.all(Array.from({ length: Math.min(concurrency, due.length) }, worker))
	return { ran, pending: due.length - ran, errors }
}
