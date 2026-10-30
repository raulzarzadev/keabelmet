/**
 * Almacenamiento del bot de WhatsApp en Upstash Redis (vía su API REST, sin
 * dependencias). Se conecta desde el Marketplace de Vercel, que crea las
 * variables KV_REST_API_URL / KV_REST_API_TOKEN (o UPSTASH_REDIS_REST_*).
 *
 * Claves:
 *   wa:convs            sorted set (score = último mensaje) con los teléfonos
 *   wa:conv:<tel>       JSON con el estado de la conversación
 *   wa:msgs:<tel>       lista de mensajes (JSON), el más reciente al final
 *   wa:seen:<wamid>     marca de idempotencia (Meta reintenta los webhooks)
 *   wa:sent:<wamid>     mensajes que mandó el bot o el panel (para no confundir ecos)
 *   wa:lock:<tel>       candado mientras el bot contesta esa conversación
 *   wa:settings         JSON con la configuración global
 */

const MAX_MSGS = 300

function creds(): { url: string; token: string } | null {
	const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
	const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
	return url && token ? { url: url.replace(/\/$/, ""), token } : null
}

export function storeConfigured(): boolean {
	return creds() !== null
}

type Cmd = (string | number)[]

async function pipeline(cmds: Cmd[]): Promise<unknown[]> {
	const c = creds()
	if (!c) throw new Error("Falta conectar Upstash Redis (KV_REST_API_URL / KV_REST_API_TOKEN)")
	const res = await fetch(`${c.url}/pipeline`, {
		method: "POST",
		headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
		body: JSON.stringify(cmds.map((cmd) => cmd.map(String))),
		cache: "no-store",
	})
	if (!res.ok) throw new Error(`Redis ${res.status}: ${await res.text()}`)
	const out = (await res.json()) as { result?: unknown; error?: string }[]
	return out.map((r) => {
		if (r.error) throw new Error(`Redis: ${r.error}`)
		return r.result
	})
}

async function cmd(...c: Cmd): Promise<unknown> {
	return (await pipeline([c]))[0]
}

function parse<T>(raw: unknown): T | null {
	if (typeof raw !== "string") return null
	try {
		return JSON.parse(raw) as T
	} catch {
		return null
	}
}

// ── Tipos ──────────────────────────────────────────────────────────────────

/** customer = el cliente; bot = respuesta automática; owner = el equipo (app o panel). */
export type MsgBy = "customer" | "bot" | "owner"

export interface WaMessage {
	id: string
	by: MsgBy
	text: string
	at: number
	/** Notas internas que no son texto del chat (p. ej. "link de anticipo creado"). */
	note?: string
}

export interface Conversation {
	phone: string
	name?: string
	lastAt: number
	lastText: string
	lastBy: MsgBy
	/** Último mensaje del cliente: la ventana de 24 h de WhatsApp cuenta desde aquí. */
	lastCustomerAt?: number
	/** Bot en pausa para este chat hasta esta fecha (ms). 0 = activo. Infinity no se guarda: usamos un año. */
	pausedUntil: number
	pauseReason?: "owner" | "handoff" | "manual"
	needsHuman?: boolean
	handoffSummary?: string
	unread: number
}

export interface Settings {
	botEnabled: boolean
	/** Horas que el bot se queda callado en un chat después de que el equipo escribe desde la app. */
	ownerPauseHours: number
}

const DEFAULT_SETTINGS: Settings = { botEnabled: true, ownerPauseHours: 12 }

// ── Configuración ──────────────────────────────────────────────────────────

export async function getSettings(): Promise<Settings> {
	const s = parse<Partial<Settings>>(await cmd("GET", "wa:settings"))
	return { ...DEFAULT_SETTINGS, ...(s ?? {}) }
}

export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
	const next = { ...(await getSettings()), ...patch }
	await cmd("SET", "wa:settings", JSON.stringify(next))
	return next
}

// ── Idempotencia y candados ────────────────────────────────────────────────

/** true si es la primera vez que vemos este id (y lo marca por 3 días). */
export async function firstSeen(id: string): Promise<boolean> {
	return (await cmd("SET", `wa:seen:${id}`, "1", "NX", "EX", 3 * 24 * 3600)) === "OK"
}

export async function rememberSent(id: string): Promise<void> {
	await cmd("SET", `wa:sent:${id}`, "1", "EX", 7 * 24 * 3600)
}

export async function wasSentByUs(id: string): Promise<boolean> {
	return (await cmd("EXISTS", `wa:sent:${id}`)) === 1
}

export async function acquireLock(phone: string, seconds = 240): Promise<boolean> {
	return (await cmd("SET", `wa:lock:${phone}`, "1", "NX", "EX", seconds)) === "OK"
}

export async function releaseLock(phone: string): Promise<void> {
	await cmd("DEL", `wa:lock:${phone}`)
}

// ── Conversaciones ─────────────────────────────────────────────────────────

export async function getConversation(phone: string): Promise<Conversation | null> {
	return parse<Conversation>(await cmd("GET", `wa:conv:${phone}`))
}

export async function saveConversation(c: Conversation): Promise<void> {
	await pipeline([
		["SET", `wa:conv:${c.phone}`, JSON.stringify(c)],
		["ZADD", "wa:convs", c.lastAt, c.phone],
	])
}

export async function updateConversation(phone: string, patch: Partial<Conversation>): Promise<Conversation | null> {
	const c = await getConversation(phone)
	if (!c) return null
	const next = { ...c, ...patch }
	await saveConversation(next)
	return next
}

/** Guarda un mensaje y actualiza el resumen de la conversación. */
export async function appendMessage(phone: string, msg: WaMessage, name?: string): Promise<Conversation> {
	const prev = await getConversation(phone)
	const conv: Conversation = {
		phone,
		pausedUntil: 0,
		unread: 0,
		...(prev ?? {}),
		name: name || prev?.name,
		lastAt: msg.at,
		lastText: msg.note ? `📝 ${msg.note}` : msg.text,
		lastBy: msg.by,
	}
	if (msg.by === "customer") {
		conv.lastCustomerAt = msg.at
		conv.unread = (prev?.unread ?? 0) + 1
	}
	await pipeline([
		["RPUSH", `wa:msgs:${phone}`, JSON.stringify(msg)],
		["LTRIM", `wa:msgs:${phone}`, -MAX_MSGS, -1],
		["SET", `wa:conv:${phone}`, JSON.stringify(conv)],
		["ZADD", "wa:convs", conv.lastAt, phone],
	])
	return conv
}

export async function getMessages(phone: string, last = 60): Promise<WaMessage[]> {
	const raw = (await cmd("LRANGE", `wa:msgs:${phone}`, -last, -1)) as unknown[]
	return (raw ?? []).map((r) => parse<WaMessage>(r)).filter((m): m is WaMessage => m !== null)
}

export async function listConversations(limit = 100): Promise<Conversation[]> {
	const phones = (await cmd("ZRANGE", "wa:convs", 0, limit - 1, "REV")) as string[]
	if (!phones?.length) return []
	const raw = await pipeline(phones.map((p) => ["GET", `wa:conv:${p}`]))
	return raw.map((r) => parse<Conversation>(r)).filter((c): c is Conversation => c !== null)
}

// ── Links cortos de pago ───────────────────────────────────────────────────

/** Guarda la ruta del deal tras un id corto (/api/pago/<id>); expira con el deal. */
export async function saveShortLink(path: string, ttlSeconds = 8 * 24 * 3600): Promise<string> {
	const alphabet = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"
	const bytes = crypto.getRandomValues(new Uint8Array(8))
	const id = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")
	await cmd("SET", `wa:link:${id}`, path, "EX", ttlSeconds)
	return id
}

export async function resolveShortLink(id: string): Promise<string | null> {
	if (!/^[A-Za-z0-9]{6,16}$/.test(id)) return null
	const v = await cmd("GET", `wa:link:${id}`)
	return typeof v === "string" ? v : null
}

export function botActiveFor(c: Conversation | null, settings: Settings, now = Date.now()): boolean {
	if (!settings.botEnabled) return false
	if (!c) return true
	return !(c.pausedUntil && c.pausedUntil > now)
}

export const PAUSE_FOREVER_MS = 365 * 24 * 3600 * 1000
