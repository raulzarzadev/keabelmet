import Anthropic from "@anthropic-ai/sdk"
import { SITE_URL } from "@/lib/seo"
import type { Locale } from "@/lib/i18n"
import { buildQuote, catalogText, createDepositDeal, optionIds, quoteSummary, type QuoteItemInput } from "@/lib/whatsapp/catalog"
import { appendMessage, saveShortLink, updateConversation, PAUSE_FOREVER_MS, type WaMessage } from "@/lib/whatsapp/store"
import { notifyOwner } from "@/lib/whatsapp/notify"

/**
 * Asistente de WhatsApp: contesta dudas, cotiza con precios del catálogo y
 * manda el link de anticipo (20 %). Cuando algo se sale de lo normal, pausa el
 * bot en ese chat y avisa al equipo.
 */

const MODEL = "claude-opus-5-5"
const MAX_TURNS = 6

let client: Anthropic | null = null
function anthropic(): Anthropic {
	client ??= new Anthropic()
	return client
}

const SYSTEM = `Eres el asistente de WhatsApp de Keabelmet Expeditions, operador de ecoturismo marino en La Paz y La Ventana, Baja California Sur (México). Atiendes el número de WhatsApp Business de la empresa, junto con el equipo humano, que puede entrar a la conversación en cualquier momento.

Tu trabajo: resolver dudas sobre las expediciones, cotizar y, cuando el cliente quiera reservar, mandarle su link de anticipo. Escribe como alguien del equipo: cálido, breve y claro, en el idioma del cliente, con el formato de WhatsApp (*negritas* con un asterisco, sin tablas ni encabezados markdown, emojis con moderación). Mensajes cortos; si hay varias opciones, una lista sencilla.

Cómo trabajar:
- Usa solo la información del catálogo de abajo. Si algo no está (disponibilidad de un día concreto, clima, traslados especiales, peticiones médicas, etc.), no lo inventes: dilo y ofrece que alguien del equipo lo confirme.
- Nunca escribas un precio que no venga del catálogo o de la herramienta cotizar. Para totales, descuentos y anticipos usa siempre cotizar; no hagas cuentas por tu cuenta.
- Para cotizar necesitas actividad (y modalidad si hay varias), número de personas y, de preferencia, fecha. Pregunta lo que falte, de una o dos cosas a la vez.
- Para reservar: el cliente paga un anticipo del 20 % con tarjeta en el link y el resto el día de la actividad. Antes de mandar el link necesitas fecha, personas y el nombre del cliente, y que el cliente diga que quiere reservar. Usa enviar_link_anticipo e incluye en tu mensaje el link exacto que te devuelva.
- El equipo confirma punto de encuentro y logística después del anticipo.
- Si el cliente pide algo de un precio "a cotizar" (privados, grupos grandes), quiere pagar por transferencia o en efectivo, tiene una queja, quiere cancelar, cambiar o pedir reembolso de una reserva, pide hablar con una persona, o la conversación se sale de lo que puedes resolver con seguridad, usa pasar_a_humano y despídete diciendo que alguien del equipo le escribe en breve.
- Mensajes marcados como [Equipo Keabelmet] los escribió una persona del equipo: respeta lo que haya dicho o acordado.
- Si el cliente manda una nota de voz, foto o archivo que no puedes ver, pídele amablemente que lo escriba; si insiste o parece importante, pasa a humano.

Web: ${SITE_URL} · Instagram: @keabelmet__expeditions · Correo: contacto@keabelmet.com`

let catalogCache: string | null = null
function catalog(): string {
	catalogCache ??= `# Catálogo vigente (precios en pesos mexicanos)\n\n${catalogText()}`
	return catalogCache
}

const ITEM_SCHEMA = {
	type: "object",
	properties: {
		opcion: { type: "string", enum: optionIds(), description: "Id de la opción del catálogo, p. ej. tiburon-ballena#0" },
		personas: { type: "integer", description: "Número de personas" },
		fecha: { type: "string", description: "Fecha AAAA-MM-DD, o cadena vacía si aún no se sabe" },
	},
	required: ["opcion", "personas", "fecha"],
	additionalProperties: false,
} as const

const TOOLS: Anthropic.Beta.BetaTool[] = [
	{
		name: "cotizar",
		description:
			"Calcula el precio de una o varias actividades con los precios del catálogo: subtotal por actividad, descuentos de paquete, total y anticipo del 20 %. Valida temporada, fecha y cupo máximo. No crea ninguna reserva.",
		strict: true,
		input_schema: {
			type: "object",
			properties: { actividades: { type: "array", items: ITEM_SCHEMA } },
			required: ["actividades"],
			additionalProperties: false,
		},
	},
	{
		name: "enviar_link_anticipo",
		description:
			"Genera el link de pago del anticipo (20 %) para la reserva y avisa al equipo. Úsalo solo cuando el cliente ya confirmó que quiere reservar y tienes fecha, personas y su nombre. Devuelve el link que debes incluir en tu respuesta.",
		strict: true,
		input_schema: {
			type: "object",
			properties: {
				actividades: { type: "array", items: ITEM_SCHEMA },
				nombre_cliente: { type: "string", description: "Nombre del cliente para la reserva" },
			},
			required: ["actividades", "nombre_cliente"],
			additionalProperties: false,
		},
	},
	{
		name: "pasar_a_humano",
		description:
			"Pausa el asistente en esta conversación y avisa al equipo para que una persona siga atendiendo. Úsalo en los casos que indican las instrucciones.",
		strict: true,
		input_schema: {
			type: "object",
			properties: {
				motivo: { type: "string", description: "Por qué hace falta una persona, en una frase" },
				resumen: { type: "string", description: "Resumen para el equipo: qué quiere el cliente, fechas, personas, lo ya cotizado" },
			},
			required: ["motivo", "resumen"],
			additionalProperties: false,
		},
	},
]

export interface AgentContext {
	phone: string
	name?: string
	locale: Locale
}

type ToolOutcome = { content: string; isError?: boolean; handoff?: boolean }

function asItems(raw: unknown): QuoteItemInput[] {
	const list = Array.isArray(raw) ? raw : []
	return list.map((r) => {
		const o = (r ?? {}) as Record<string, unknown>
		return { opcion: String(o.opcion ?? ""), personas: Number(o.personas), fecha: typeof o.fecha === "string" && o.fecha ? o.fecha : null }
	})
}

async function runTool(name: string, input: Record<string, unknown>, ctx: AgentContext): Promise<ToolOutcome> {
	if (name === "cotizar") {
		const q = buildQuote(asItems(input.actividades), ctx.locale)
		return q.ok ? { content: quoteSummary(q) } : { content: q.error, isError: true }
	}

	if (name === "enviar_link_anticipo") {
		const q = buildQuote(asItems(input.actividades), ctx.locale)
		if (!q.ok) return { content: q.error, isError: true }
		if (q.lines.some((l) => !l.dateISO)) return { content: "Falta la fecha de alguna actividad; pídesela al cliente.", isError: true }
		const customer = String(input.nombre_cliente ?? "").trim() || ctx.name || ""
		if (!customer) return { content: "Falta el nombre del cliente.", isError: true }
		const { path } = createDepositDeal(q, customer, ctx.locale)
		const id = await saveShortLink(path)
		const url = `${SITE_URL}/api/pago/${id}`
		const summary = quoteSummary(q)
		await appendMessage(ctx.phone, { id: `note-${Date.now()}`, by: "bot", text: "", at: Date.now(), note: `Link de anticipo enviado (${url})` })
		await notifyOwner("💬 Link de anticipo enviado por el bot", { phone: ctx.phone, name: customer, body: `${summary}\n\nLink: ${url}` })
		return { content: `Link de anticipo (vence en 7 días): ${url}\n\n${summary}` }
	}

	if (name === "pasar_a_humano") {
		const motivo = String(input.motivo ?? "").slice(0, 300)
		const resumen = String(input.resumen ?? "").slice(0, 2000)
		await updateConversation(ctx.phone, {
			pausedUntil: Date.now() + PAUSE_FOREVER_MS,
			pauseReason: "handoff",
			needsHuman: true,
			handoffSummary: `${motivo}\n${resumen}`,
		})
		await notifyOwner("🙋 Un cliente necesita atención", { phone: ctx.phone, name: ctx.name, body: `Motivo: ${motivo}\n\n${resumen}` })
		return { content: "Listo: el asistente queda en pausa en este chat y el equipo ya fue avisado. Despídete en una o dos frases.", handoff: true }
	}

	return { content: `Herramienta desconocida: ${name}`, isError: true }
}

/** Convierte el historial guardado en turnos para Claude (empieza siempre con el cliente). */
function toMessages(history: WaMessage[]): Anthropic.Beta.BetaMessageParam[] {
	const msgs: Anthropic.Beta.BetaMessageParam[] = []
	for (const m of history) {
		if (m.note || !m.text.trim()) continue
		if (m.by === "customer") msgs.push({ role: "user", content: m.text })
		else if (msgs.length) msgs.push({ role: "assistant", content: m.by === "owner" ? `[Equipo Keabelmet] ${m.text}` : m.text })
	}
	return msgs
}

export interface AgentReply {
	text: string
	handoff: boolean
}

/**
 * Genera la respuesta del bot para el historial dado (que debe terminar en
 * mensajes del cliente). No envía nada: quien llama manda el texto.
 */
export async function runAgent(history: WaMessage[], ctx: AgentContext): Promise<AgentReply> {
	const messages = toMessages(history)
	if (!messages.length || messages[messages.length - 1].role !== "user") return { text: "", handoff: false }

	const today = new Intl.DateTimeFormat("es-MX", { timeZone: "America/Mazatlan", dateStyle: "full" }).format(new Date())
	// Datos que cambian (fecha, cliente) van al final como mensaje de sistema para no romper el caché del prefijo.
	messages.push({
		role: "system",
		content: `Hoy es ${today} (hora de La Paz). Cliente: ${ctx.name || "sin nombre"} (+${ctx.phone}).`,
	})

	let handoff = false
	for (let turn = 0; turn < MAX_TURNS; turn++) {
		const response = await anthropic().beta.messages.create({
			model: MODEL,
			max_tokens: 16000,
			betas: ["server-side-fallback-2026-07-01"],
			fallbacks: "default",
			output_config: { effort: "medium" },
			system: [
				{ type: "text", text: SYSTEM },
				{ type: "text", text: catalog(), cache_control: { type: "ephemeral" } },
			],
			tools: TOOLS,
			messages,
		})

		if (response.stop_reason === "refusal") {
			await runTool("pasar_a_humano", { motivo: "El asistente no pudo responder este mensaje", resumen: "Revisar la conversación." }, ctx)
			return { text: "", handoff: true }
		}

		const text = response.content
			.filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
			.map((b) => b.text)
			.join("\n")
			.trim()

		if (response.stop_reason !== "tool_use") return { text, handoff }

		messages.push({ role: "assistant", content: response.content })
		const results: Anthropic.Beta.BetaToolResultBlockParam[] = []
		for (const block of response.content) {
			if (block.type !== "tool_use") continue
			let out: ToolOutcome
			try {
				out = await runTool(block.name, (block.input ?? {}) as Record<string, unknown>, ctx)
			} catch (err) {
				console.error("[whatsapp] herramienta falló", block.name, err)
				out = { content: "La herramienta falló; ofrece que alguien del equipo dé seguimiento.", isError: true }
			}
			if (out.handoff) handoff = true
			results.push({ type: "tool_result", tool_use_id: block.id, content: out.content, is_error: out.isError })
		}
		messages.push({ role: "user", content: results })
	}

	return { text: "", handoff }
}
