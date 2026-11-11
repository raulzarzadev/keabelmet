import crypto from "node:crypto"
import { after, NextRequest, NextResponse } from "next/server"
import { safeKeyEqual } from "@/lib/deal"
import {
	acquireLock,
	appendMessage,
	botActiveFor,
	firstSeen,
	getConversation,
	getMessages,
	getSettings,
	releaseLock,
	rememberSent,
	updateConversation,
	wasSentByUs,
} from "@/lib/whatsapp/store"
import { markReadTyping, sendText } from "@/lib/whatsapp/send"
import { runAgent } from "@/lib/whatsapp/agent"
import { notifyOwner } from "@/lib/whatsapp/notify"

export const runtime = "nodejs"
export const maxDuration = 300

/**
 * Webhook de WhatsApp (coexistencia vía Dualhook → Meta manda directo aquí).
 *
 * Con Dualhook, Meta firma con el App Secret de Dualhook, que no se comparte,
 * así que la autenticidad se basa en lo que su documentación recomienda: una
 * URL secreta de alta entropía (/api/whatsapp/webhook/<WHATSAPP_WEBHOOK_KEY>),
 * y validar object, WABA y phone_number_id. Si algún día se conecta con una app
 * propia de Meta, WHATSAPP_APP_SECRET activa además la firma X-Hub-Signature-256.
 */

/** Espera para juntar mensajes seguidos del cliente antes de contestar. */
const DEBOUNCE_MS = 6000

function keyOk(key: string): boolean {
	const expected = process.env.WHATSAPP_WEBHOOK_KEY
	return !!expected && expected.length >= 24 && safeKeyEqual(key, expected)
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
	const { key } = await params
	if (!keyOk(key)) return new NextResponse("Not found", { status: 404 })
	const q = req.nextUrl.searchParams
	const token = process.env.WHATSAPP_VERIFY_TOKEN
	if (q.get("hub.mode") === "subscribe" && token && safeKeyEqual(q.get("hub.verify_token") ?? "", token)) {
		return new NextResponse(q.get("hub.challenge") ?? "", { status: 200, headers: { "Content-Type": "text/plain" } })
	}
	return new NextResponse("Forbidden", { status: 403 })
}

interface WaInbound {
	from: string
	id: string
	timestamp?: string
	type: string
	text?: { body?: string }
	button?: { text?: string }
	interactive?: { button_reply?: { title?: string }; list_reply?: { title?: string } }
	image?: { caption?: string }
	video?: { caption?: string }
	document?: { caption?: string; filename?: string }
	location?: { name?: string; address?: string }
}

interface WaEcho {
	from: string
	to: string
	id: string
	timestamp?: string
	type: string
	text?: { body?: string }
}

/** Texto legible de un mensaje entrante; null = no amerita respuesta (reacciones, etc.). */
function inboundText(m: WaInbound): { text: string; reply: boolean } | null {
	switch (m.type) {
		case "text":
			return { text: m.text?.body ?? "", reply: true }
		case "button":
			return { text: m.button?.text ?? "", reply: true }
		case "interactive":
			return { text: m.interactive?.button_reply?.title ?? m.interactive?.list_reply?.title ?? "", reply: true }
		case "image":
			return { text: `[Foto]${m.image?.caption ? ` ${m.image.caption}` : ""}`, reply: true }
		case "video":
			return { text: `[Video]${m.video?.caption ? ` ${m.video.caption}` : ""}`, reply: true }
		case "document":
			return { text: `[Archivo ${m.document?.filename ?? ""}]${m.document?.caption ? ` ${m.document.caption}` : ""}`, reply: true }
		case "audio":
			return { text: "[Nota de voz]", reply: true }
		case "location":
			return { text: `[Ubicación] ${[m.location?.name, m.location?.address].filter(Boolean).join(", ")}`, reply: true }
		case "sticker":
			return { text: "[Sticker]", reply: false }
		case "reaction":
		case "unsupported":
			return null
		default:
			return { text: `[${m.type}]`, reply: false }
	}
}

function signatureOk(raw: string, header: string | null): boolean {
	const secret = process.env.WHATSAPP_APP_SECRET
	if (!secret) return true
	if (!header?.startsWith("sha256=")) return false
	const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex")
	const a = Buffer.from(header.slice(7))
	const b = Buffer.from(expected)
	return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
	const { key } = await params
	if (!keyOk(key)) return new NextResponse("Not found", { status: 404 })

	const raw = await req.text()
	if (!signatureOk(raw, req.headers.get("x-hub-signature-256"))) return new NextResponse("Bad signature", { status: 401 })

	let body: { object?: string; entry?: { id?: string; changes?: { field?: string; value?: Record<string, unknown> }[] }[] }
	try {
		body = JSON.parse(raw)
	} catch {
		return new NextResponse("Bad JSON", { status: 400 })
	}
	if (body.object !== "whatsapp_business_account") return NextResponse.json({ ok: true })

	const waba = process.env.WHATSAPP_WABA_ID
	const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
	const toAnswer = new Set<string>()

	for (const entry of body.entry ?? []) {
		if (waba && entry.id !== waba) continue
		for (const change of entry.changes ?? []) {
			const value = change.value ?? {}
			const meta = value.metadata as { phone_number_id?: string } | undefined
			if (meta?.phone_number_id && phoneNumberId && meta.phone_number_id !== phoneNumberId) continue

			if (change.field === "messages") {
				const contacts = (value.contacts as { wa_id?: string; profile?: { name?: string } }[] | undefined) ?? []
				for (const m of (value.messages as WaInbound[] | undefined) ?? []) {
					const parsed = inboundText(m)
					if (!parsed || !(await firstSeen(m.id))) continue
					const name = contacts.find((c) => c.wa_id === m.from)?.profile?.name
					const at = m.timestamp ? Number(m.timestamp) * 1000 : Date.now()
					await appendMessage(m.from, { id: m.id, by: "customer", text: parsed.text, at }, name)
					if (parsed.reply) toAnswer.add(`${m.from}|${m.id}`)
				}
			} else if (change.field === "smb_message_echoes") {
				// Lo que el equipo escribe desde la app de WhatsApp Business: se guarda y el bot se calla en ese chat.
				const settings = await getSettings()
				for (const e of (value.message_echoes as WaEcho[] | undefined) ?? []) {
					if (!(await firstSeen(e.id)) || (await wasSentByUs(e.id))) continue
					const text = e.type === "text" ? (e.text?.body ?? "") : `[${e.type}]`
					if (e.type === "edit" || e.type === "revoke") continue
					const at = e.timestamp ? Number(e.timestamp) * 1000 : Date.now()
					await appendMessage(e.to, { id: e.id, by: "owner", text, at })
					const conv = await getConversation(e.to)
					const pauseUntil = Date.now() + settings.ownerPauseHours * 3600 * 1000
					if (conv && (conv.pausedUntil ?? 0) < pauseUntil)
						await updateConversation(e.to, { pausedUntil: pauseUntil, pauseReason: conv.pauseReason === "handoff" ? "handoff" : "owner", unread: 0 })
				}
			}
		}
	}

	for (const job of toAnswer) {
		const [phone, messageId] = job.split("|")
		after(() => answer(phone, messageId))
	}
	return NextResponse.json({ ok: true })
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Contesta la conversación si este sigue siendo el último mensaje del cliente y el bot está activo. */
async function answer(phone: string, messageId: string): Promise<void> {
	await sleep(DEBOUNCE_MS)
	const latest = (await getMessages(phone, 20)).filter((m) => m.by === "customer").at(-1)
	if (latest?.id !== messageId) return // llegó otro mensaje; ese turno contesta todo junto

	// Si otra respuesta está en curso, esperamos a que termine (máx. ~2 min) para no perder este mensaje.
	let locked = false
	for (let i = 0; i < 40 && !locked; i++) {
		locked = await acquireLock(phone)
		if (!locked) await sleep(3000)
	}
	if (!locked) return

	try {
		const [settings, conv] = await Promise.all([getSettings(), getConversation(phone)])
		if (!botActiveFor(conv, settings)) return
		const history = await getMessages(phone, 40)
		const last = history.at(-1)
		if (!last || last.by !== "customer") return // ya contestó alguien

		await markReadTyping(messageId)
		const locale = phone.startsWith("52") ? "es" : "en"
		const reply = await runAgent(history, { phone, name: conv?.name, locale })

		// El equipo pudo haber entrado mientras el bot pensaba.
		const fresh = await getConversation(phone)
		const lastNow = (await getMessages(phone, 5)).at(-1)
		if (!reply.text) {
			if (!reply.handoff) await handoffSilently(phone, conv?.name)
			return
		}
		if (!reply.handoff && (!botActiveFor(fresh, await getSettings()) || lastNow?.by === "owner")) return

		const ids = await sendText(phone, reply.text)
		await Promise.all(ids.map((id) => rememberSent(id)))
		await appendMessage(phone, { id: ids[0] ?? `bot-${Date.now()}`, by: "bot", text: reply.text, at: Date.now() })
	} catch (err) {
		console.error("[whatsapp] no se pudo contestar", phone, err)
		await handoffSilently(phone, undefined, err instanceof Error ? err.message : String(err))
	} finally {
		await releaseLock(phone)
	}
}

/** Si el bot no logra responder, el chat pasa al equipo sin mandarle nada raro al cliente. */
async function handoffSilently(phone: string, name?: string, error?: string): Promise<void> {
	try {
		await updateConversation(phone, { needsHuman: true, pausedUntil: Date.now() + 365 * 24 * 3600 * 1000, pauseReason: "handoff" })
		await notifyOwner("⚠️ El bot no pudo responder", { phone, name, body: error ? `Error: ${error}` : "Revisa la conversación y contesta desde la app." })
	} catch (err) {
		console.error("[whatsapp] handoff falló", err)
	}
}
