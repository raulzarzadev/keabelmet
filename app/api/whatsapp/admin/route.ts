import { NextRequest, NextResponse } from "next/server"
import {
	appendMessage,
	getConversation,
	getMessages,
	getSettings,
	listConversations,
	PAUSE_FOREVER_MS,
	rememberSent,
	saveSettings,
	storeConfigured,
	updateConversation,
} from "@/lib/whatsapp/store"
import { sendText } from "@/lib/whatsapp/send"
import { checkPassword, isPanelRequest, PANEL_COOKIE, panelToken } from "@/lib/whatsapp/panel-auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const WINDOW_MS = 24 * 3600 * 1000

function err(error: string, status = 400) {
	return NextResponse.json({ error }, { status })
}

/** GET: lista de conversaciones, o una conversación con sus mensajes (?c=<tel>). */
export async function GET(req: NextRequest) {
	if (!isPanelRequest(req)) return err("No autorizado", 401)
	if (!storeConfigured()) return err("Falta conectar Upstash Redis en Vercel", 503)
	const phone = req.nextUrl.searchParams.get("c")
	if (phone) {
		const conv = await getConversation(phone)
		if (!conv) return err("No existe la conversación", 404)
		if (conv.unread) await updateConversation(phone, { unread: 0 })
		return NextResponse.json({ conversation: { ...conv, unread: 0 }, messages: await getMessages(phone, 200) })
	}
	const [settings, conversations] = await Promise.all([getSettings(), listConversations(150)])
	return NextResponse.json({ settings, conversations, now: Date.now() })
}

export async function POST(req: NextRequest) {
	let body: Record<string, unknown>
	try {
		body = await req.json()
	} catch {
		return err("JSON inválido")
	}

	if (body.action === "login") {
		if (typeof body.password !== "string" || !checkPassword(body.password)) return err("Contraseña incorrecta", 401)
		const res = NextResponse.json({ ok: true })
		res.cookies.set(PANEL_COOKIE, panelToken()!, { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 60 * 24 * 3600 })
		return res
	}
	if (body.action === "logout") {
		const res = NextResponse.json({ ok: true })
		res.cookies.delete(PANEL_COOKIE)
		return res
	}

	if (!isPanelRequest(req)) return err("No autorizado", 401)
	const phone = typeof body.phone === "string" ? body.phone.replace(/\D/g, "") : ""

	switch (body.action) {
		case "settings": {
			const patch: { botEnabled?: boolean; ownerPauseHours?: number } = {}
			if (typeof body.botEnabled === "boolean") patch.botEnabled = body.botEnabled
			const h = Number(body.ownerPauseHours)
			if (Number.isFinite(h) && h >= 0 && h <= 24 * 30) patch.ownerPauseHours = h
			return NextResponse.json({ settings: await saveSettings(patch) })
		}
		case "pause": {
			const hours = Number(body.hours)
			const until = Number.isFinite(hours) && hours > 0 ? Date.now() + hours * 3600 * 1000 : Date.now() + PAUSE_FOREVER_MS
			return NextResponse.json({ conversation: await updateConversation(phone, { pausedUntil: until, pauseReason: "manual" }) })
		}
		case "resume":
			return NextResponse.json({
				conversation: await updateConversation(phone, { pausedUntil: 0, pauseReason: undefined, needsHuman: false }),
			})
		case "resolve":
			return NextResponse.json({ conversation: await updateConversation(phone, { needsHuman: false }) })
		case "send": {
			const text = typeof body.text === "string" ? body.text.trim() : ""
			if (!text) return err("Mensaje vacío")
			const conv = await getConversation(phone)
			if (!conv) return err("No existe la conversación", 404)
			if (!conv.lastCustomerAt || Date.now() - conv.lastCustomerAt > WINDOW_MS)
				return err("Pasaron más de 24 h desde el último mensaje del cliente: WhatsApp solo permite plantillas. Escríbele desde la app.", 409)
			const ids = await sendText(phone, text)
			await Promise.all(ids.map((id) => rememberSent(id)))
			await appendMessage(phone, { id: ids[0] ?? `owner-${Date.now()}`, by: "owner", text, at: Date.now() })
			const settings = await getSettings()
			const until = Date.now() + settings.ownerPauseHours * 3600 * 1000
			if ((conv.pausedUntil ?? 0) < until) await updateConversation(phone, { pausedUntil: until, pauseReason: "owner" })
			return NextResponse.json({ ok: true })
		}
	}
	return err("Acción desconocida")
}
