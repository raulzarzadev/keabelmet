/**
 * Envío de mensajes por la API de WhatsApp (formato Cloud API de Meta).
 *
 * Con coexistencia el número 612 se conecta a través de un proveedor; por
 * defecto Dualhook, cuya API es compatible con Graph:
 *   POST https://api.dualhook.com/v25.0/<PHONE_NUMBER_ID>/messages
 *   Authorization: Bearer dh_live_...
 * Si algún día se usa la Cloud API de Meta directo, basta con cambiar
 * WHATSAPP_API_BASE a https://graph.facebook.com/v25.0 y poner su token.
 */

function config() {
	const base = (process.env.WHATSAPP_API_BASE || "https://api.dualhook.com/v25.0").replace(/\/$/, "")
	const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
	const token = process.env.WHATSAPP_API_TOKEN
	if (!phoneNumberId || !token) throw new Error("Faltan WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_API_TOKEN")
	return { url: `${base}/${phoneNumberId}/messages`, token }
}

async function post(body: Record<string, unknown>): Promise<{ id?: string }> {
	const { url, token } = config()
	const res = await fetch(url, {
		method: "POST",
		headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
		body: JSON.stringify({ messaging_product: "whatsapp", ...body }),
		cache: "no-store",
	})
	const data = (await res.json().catch(() => ({}))) as { messages?: { id: string }[]; error?: { message?: string } }
	if (!res.ok) throw new Error(`WhatsApp ${res.status}: ${data.error?.message ?? "error"}`)
	return { id: data.messages?.[0]?.id }
}

/** WhatsApp limita el texto a 4096 caracteres; partimos en párrafos si hace falta. */
function chunks(text: string, max = 3800): string[] {
	if (text.length <= max) return [text]
	const out: string[] = []
	let cur = ""
	for (const para of text.split(/\n{2,}/)) {
		if ((cur + "\n\n" + para).length > max && cur) {
			out.push(cur)
			cur = para
		} else cur = cur ? `${cur}\n\n${para}` : para
	}
	if (cur) out.push(cur)
	return out.flatMap((c) => (c.length > max ? c.match(new RegExp(`[\\s\\S]{1,${max}}`, "g")) ?? [] : [c]))
}

/** Manda texto libre (solo válido dentro de la ventana de 24 h desde el último mensaje del cliente). */
export async function sendText(to: string, text: string): Promise<string[]> {
	const ids: string[] = []
	for (const body of chunks(text)) {
		const { id } = await post({ recipient_type: "individual", to, type: "text", text: { body, preview_url: true } })
		if (id) ids.push(id)
	}
	return ids
}

/** Palomitas azules + "escribiendo…" mientras el bot piensa (se apaga solo al responder o a los 25 s). */
export async function markReadTyping(messageId: string): Promise<void> {
	await post({ status: "read", message_id: messageId, typing_indicator: { type: "text" } }).catch(() => {})
}
