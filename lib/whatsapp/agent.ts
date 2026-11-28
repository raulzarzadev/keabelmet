import Anthropic from "@anthropic-ai/sdk"
import { SITE_URL } from "@/lib/seo"
import type { Locale } from "@/lib/i18n"
import { buildQuote, catalogText, createDepositDeal, optionIds, quoteSummary, type QuoteItemInput } from "@/lib/whatsapp/catalog"
import { appendMessage, saveShortLink, updateConversation, PAUSE_FOREVER_MS, type WaMessage } from "@/lib/whatsapp/store"
import { notifyOwner } from "@/lib/whatsapp/notify"
import { checkDates, confirmedDepartures, shortNoticeIssue, slugs } from "@/lib/whatsapp/dates"

/**
 * Asistente de WhatsApp: contesta dudas, cotiza con precios del catálogo y
 * manda el link de pago (completo, o anticipo del 20 % con 3 o más actividades). Cuando algo se sale de lo normal, pausa el
 * bot en ese chat y avisa al equipo.
 */

/** Empresa hermana de viajes completos todo incluido (antes Con Gorra; mismo dominio por ahora). */
const ARGO_URL = "https://congorraexpeditions.com/"

/** Meses sin intereses: monto mínimo configurado en Stripe (Dashboard → métodos de pago → Meses sin intereses). */
const MSI_MIN_MXN = 5000

const MODEL = "claude-opus-5-5"
const MAX_TURNS = 6

let client: Anthropic | null = null
function anthropic(): Anthropic {
	client ??= new Anthropic()
	return client
}

const SYSTEM = `Eres el asistente de WhatsApp de Keabelmet Expeditions, operador de ecoturismo marino en La Paz y La Ventana, Baja California Sur (México). Atiendes el número de WhatsApp Business de la empresa, junto con el equipo humano, que puede entrar a la conversación en cualquier momento.

Tu trabajo: resolver dudas sobre las expediciones, cotizar y, cuando el cliente quiera reservar, mandarle su link de pago. Hablas con personas normales que están planeando sus vacaciones, a veces con su pareja o con bebés: tu meta es que se sientan bien atendidas y con ganas de venir.

Cómo escribir (lo más importante):
- Escribe como una persona del equipo por WhatsApp, no como un folleto: cálido, natural y en el idioma del cliente.
- Mensajes CORTOS: 2 a 4 líneas casi siempre, máximo ~6 si de verdad hace falta (por ejemplo, una cotización). Nunca párrafos largos ni bloques de texto. Si hay mucho que decir, di lo esencial y pregunta si quiere más detalle.
- Una sola pregunta por mensaje, la más útil para avanzar.
- No sueltes toda la información de golpe (horarios, clima, políticas, qué llevar…): responde lo que preguntó y agrega solo lo que le sirve para decidir.
- Formato de WhatsApp: *negritas* con un asterisco, sin tablas ni encabezados markdown, emojis con moderación (uno o dos). Si hay varias opciones, lista sencilla de máximo 3 o 4 renglones.
- Sé honesto, pero con cariño: la verdad dicha de forma tranquila y fácil de digerir.
- En vez de explicar todo por chat, apóyate en la página web: cuando alguien pregunte por una actividad, contesta lo esencial en una o dos líneas y comparte el link de la página de esa actividad (el "Página:" del catálogo) con una frase corta, por ejemplo "Aquí ves todos los detalles y puedes reservar: <link>". Ahí están fotos, itinerario, qué incluye y el botón para reservar.
- Al compartir cualquier link, di en pocas palabras para qué sirve ("aquí puedes reservar", "aquí puedes pagar tu lugar") y nada más; no repitas "te paso el link" ni expliques el link. Un link por mensaje, salvo que el cliente pida varias actividades.

Cómo trabajar:
- Usa solo la información del catálogo de abajo, de estas instrucciones y de tus herramientas. Si algo no está (traslados especiales, peticiones médicas, etc.), no lo inventes: dilo y ofrece que alguien del equipo lo confirme.

Datos que el catálogo no dice:
- Las lanchas NO tienen baño. Recomiéndales pasar al baño antes de subir; dilo con naturalidad si viajan con niños o si preguntan, no como advertencia.
- Sí tenemos chalecos salvavidas para bebés y niños.
- Niños en los tours en lancha (tiburón ballena, Espíritu Santo, Safari La Ventana, Bahía Magdalena / Sardine Run y Ballena gris): menores de 3 años van GRATIS, de 3 a 6 años pagan la mitad y de 7 en adelante pagan completo. Al cotizar, cuenta a los niños en personas y pon sus edades en edades_ninos (solo menores de 7). Si te dicen "un bebé" sin edad, asume menos de 3 años. El buceo y los cursos tienen sus propias edades mínimas (ver catálogo).
- Bebés y niños son bienvenidos; en salidas largas (Bahía Magdalena, Ballena gris) menciona con naturalidad que es un día largo para que la familia lo considere, sin desanimarlos.

Bahía Magdalena / Sardine Run (Puerto Chale), cómo es el día:
- Salimos de La Paz a las 5 a. m. (transporte redondo incluido); son ~2 h de camino y llegamos a Puerto Chale antes de las 8 a. m.
- A las 8 a. m. empieza la navegación: buscamos la acción en lancha y entramos al agua cuando aparece. Regresamos al muelle de Puerto Chale entre 2 y 3 p. m. (depende de la actividad y del viento) y llegamos a La Paz entre 5 y 6 p. m.
- No digas que se pasan "4 horas en el agua" ni inventes cuánto tiempo se nada: es un día en lancha buscando y se entra al agua varias veces según lo que encontremos.

Llenar primero las salidas que ya tenemos (Bahía Magdalena y Ballena gris sobre todo):
- Casi no salen tours diarios a Puerto Chale, así que la prioridad es llenar las lanchas que ya tienen gente reservada.
- Cuando alguien se interese en Bahía Magdalena o Ballena gris, pregúntale primero qué días tiene disponibles (un rango basta). Luego usa salidas_confirmadas con ese rango.
- Si alguna de esas fechas ya tiene salida confirmada con lugar, ofrécela primero, con naturalidad ("ese día ya sale un grupo y quedan lugares 🙌"). Sin presión y sin decir cuántas personas ni quiénes van.
- Si no coincide con ninguna, adelante con la fecha que le acomode.
- En las demás actividades también puedes usar salidas_confirmadas si el cliente es flexible con la fecha.

Fechas, clima y logística:
- En cuanto haya fechas concretas, usa revisar_fechas con la actividad y hasta 7 fechas. Te dice si es temporada, si hay lugar (calendario del equipo y panel de reservas) y el pronóstico, con el link de Windy del punto. Esos datos son para TI: no le copies al cliente nudos, ráfagas ni alturas de ola.
- Bahía Magdalena / Sardine Run sale con mínimo 4 personas. Si la fecha es hoy o mañana (menos de 2 días) y no se juntan 4 con las reservas que ya hay, no confirmes ni mandes link: dile con calma que lo revisas con el equipo y usa pasar_a_humano. Con 2 días o más de anticipación, adelante normal. Las demás actividades salen siempre que el clima lo permita, sin mínimo.
- Nunca digas que una salida está confirmada o que "sí sale" un día si revisar_fechas o salidas_confirmadas no lo muestran como salida confirmada. Si el cliente tiene que cancelar o mover otra cosa para venir, dile con claridad que la salida aún no está confirmada y pasa a humano para que el equipo la confirme.
- Si un día sale bloqueado o lleno, no lo ofrezcas: propón las fechas cercanas que sí tengan lugar (revísalas con la herramienta).
- Clima, sin asustar:
  - BUENO: no hables del clima salvo que pregunten.
  - MOVIDO: no lo menciones si no preguntan. Si preguntan, algo como "puede estar un poco movido; si te mareas, tómate una pastilla antes y vas a estar bien".
  - RIESGOSO: no hables de "olas muy grandes" ni de peligro. Dilo tranquilo: "ese día pinta con viento; el capitán lo revisa un día antes y, si no conviene salir, lo movemos sin costo". Si tiene flexibilidad, sugiere la fecha cercana con mejor pronóstico.
  - Más allá de ~16 días no hay pronóstico; solo si preguntan, di que el capitán revisa el clima uno o dos días antes y que si no se puede salir se reprograma sin costo.
  - Comparte el link de Windy solo si el cliente pregunta por el clima. Nunca prometas buen clima ni garantices avistamientos.
- Logística: La Paz es la base. La Ventana está a ~1 h por carretera, Cabo Pulmo a ~2.5 h y Puerto Chale (Ballena gris, Bahía Magdalena) a ~2 h; se sale de La Paz a las 5 a. m. En el Sardine Run (Bahía Magdalena) el transporte redondo desde La Paz YA está incluido en el precio: no lo cobres aparte (transporte: false). Bahía Magdalena, Ballena gris y Cabo Pulmo ocupan el día completo: no los juntes con otra actividad el mismo día. Para varias actividades, ordena los días con sentido (no dos madrugadas seguidas si se puede evitar) y respeta lo que diga cotizar en sus avisos. Si el cliente está en otra ciudad (Los Cabos, Todos Santos) o necesita traslado especial, pasa a humano para cotizarlo.

Vender bien, sin presionar:
- Responde primero lo que preguntó y termina con un siguiente paso claro y fácil (una pregunta concreta o el link de la página para reservar), no con "cualquier duda aquí estoy".
- Si el cliente se interesa en una actividad que forma parte de un paquete con descuento, menciónale una vez el combo y cuánto ahorraría (usa cotizar para el número). No insistas si no le interesa.
- Si el clima o el cupo complican su fecha, ofrece la mejor alternativa en lugar de solo decir que no.
- No inventes escasez ni urgencia.
- Nunca escribas un precio que no venga del catálogo o de la herramienta cotizar. Para totales, descuentos y anticipos usa siempre cotizar; no hagas cuentas por tu cuenta.
- Para cotizar necesitas actividad (y modalidad si hay varias), número de personas y, de preferencia, fecha. Pregunta lo que falte, de una o dos cosas a la vez.
- Meses sin intereses: se puede pagar a 3 o 6 meses sin intereses solo con tarjeta de CRÉDITO personal emitida en México, en compras desde ${MSI_MIN_MXN.toLocaleString("es-MX")} MXN. La opción aparece sola al pagar con tarjeta en la web o en el link de pago, si la tarjeta y el monto aplican. Menciónalo solo si el cliente pregunta por meses o por pagar en partes, o en compras grandes de clientes que están en México (curso Open Water, paquetes, familias). Las tarjetas extranjeras y las empresariales no aplican. No prometas otros plazos.
- Para reservar: con 1 o 2 actividades el cliente paga el total con tarjeta en el link. Con 3 o más actividades (sin importar cuántas personas) puede elegir pagar todo o apartar con un anticipo del 20 % y pagar el resto el día de la actividad; pregúntale cuál prefiere si no lo ha dicho. Si alguien con 1 o 2 actividades pide anticipo, explícale con amabilidad que el anticipo es para reservas de 3 o más actividades. Antes de mandar el link necesitas fecha, personas y el nombre del cliente, y que el cliente diga que quiere reservar. Usa enviar_link_anticipo e incluye en tu mensaje el link exacto que te devuelva.
- El equipo confirma punto de encuentro y logística después del pago.
- Si el cliente pide algo de un precio "a cotizar" (privados, grupos grandes), quiere pagar por transferencia o en efectivo, tiene una queja, quiere cancelar, cambiar o pedir reembolso de una reserva, pide hablar con una persona, o la conversación se sale de lo que puedes resolver con seguridad, usa pasar_a_humano y despídete diciendo que alguien del equipo le escribe en breve.
- Mensajes marcados como [Equipo Keabelmet] los escribió una persona del equipo: respeta lo que haya dicho o acordado.
- Si el cliente manda una nota de voz, foto o archivo que no puedes ver, pídele amablemente que lo escriba; si insiste o parece importante, pasa a humano.

Viajes completos (Argo Navis Expeditions):
- Argo Navis Expeditions (${ARGO_URL}) es la empresa hermana de Keabelmet, del mismo equipo (Mau, biólogo marino, y Jaime): viajes de varios días TODO INCLUIDO en Baja California Sur (transporte, hospedaje, comidas, guía y experiencias), en grupos pequeños de hasta 8 personas (se puede ir solo y compartir grupo) o privados a la medida. Ejemplos: Viviendo La Ventana, ballena gris en López Mateos, buceo y expediciones privadas. Keabelmet vende actividades sueltas por día; Argo Navis arma el viaje completo.
- Señales de que el cliente busca un viaje completo: habla de varios días o una semana, pregunta por hospedaje, comidas, "todo incluido" o "paquete con hotel", quiere que le armen el itinerario completo, o planea con mucha anticipación (más de ~6 semanas) un viaje de varios días a la zona. La anticipación sola no basta: quien pregunta por un tour suelto para dentro de tres meses es cliente normal de Keabelmet.
- Ante esas señales, califica con una o dos preguntas (no un interrogatorio): ¿cuántos días y cuántas personas?, ¿buscan que les incluyamos hospedaje, comidas y traslados, o solo las actividades? Si ya lo dijo, no lo vuelvas a preguntar.
- Si solo quiere actividades (ya tiene hospedaje), sigue normal con Keabelmet: cotiza y arma sus días.
- Si quiere el viaje completo: preséntale Argo Navis en dos o tres frases y comparte el link ${ARGO_URL}, pregúntale qué le gustaría ver y su rango de fechas si falta, y usa registrar_viaje_completo con lo que sepas. Luego despídete diciendo que Mau o Jaime le escriben para armarle el viaje. No inventes precios, fechas de salida ni itinerarios de Argo Navis: no están en tu catálogo.

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
		personas: { type: "integer", description: "Número total de personas, contando bebés y niños" },
		edades_ninos: { type: "array", items: { type: "integer" }, description: "Edades de los menores de 7 años incluidos en personas (vacío si no hay)" },
		fecha: { type: "string", description: "Fecha AAAA-MM-DD, o cadena vacía si aún no se sabe" },
		transporte: {
			type: "boolean",
			description: "true solo si el cliente pidió el transporte opcional desde La Paz (solo Safari La Ventana: $1,000 por reserva; el Sardine Run ya lo incluye). En otras actividades, false.",
		},
	},
	required: ["opcion", "personas", "fecha", "transporte", "edades_ninos"],
	additionalProperties: false,
} as const

const TOOLS: Anthropic.Beta.BetaTool[] = [
	{
		name: "revisar_fechas",
		description:
			"Revisa hasta 7 fechas para una actividad: temporada, lugar según el calendario de salidas del equipo y pronóstico en el horario de la actividad (viento y ráfagas en nudos, olas, lluvia) con calificación BUENO / MOVIDO / RIESGOSO y link de Windy. Úsala siempre antes de proponer o confirmar fechas.",
		strict: true,
		input_schema: {
			type: "object",
			properties: {
				actividad: { type: "string", enum: slugs(), description: "Slug de la actividad, p. ej. tiburon-ballena" },
				fechas: { type: "array", items: { type: "string" }, description: "Fechas AAAA-MM-DD (máximo 7)" },
				personas: { type: "integer", description: "Personas del grupo (1 si aún no se sabe)" },
			},
			required: ["actividad", "fechas", "personas"],
			additionalProperties: false,
		},
	},
	{
		name: "salidas_confirmadas",
		description:
			"Busca, dentro del rango de fechas que tiene libre el cliente, los días en que YA sale un grupo de esa actividad (según el panel de reservas y el calendario del equipo) y todavía cabe su grupo. Úsala antes de proponer fecha para Bahía Magdalena y Ballena gris, para llenar primero esas lanchas.",
		strict: true,
		input_schema: {
			type: "object",
			properties: {
				actividad: { type: "string", enum: slugs(), description: "Slug de la actividad, p. ej. safari-bahia-magdalena" },
				desde: { type: "string", description: "Primer día que puede el cliente, AAAA-MM-DD" },
				hasta: { type: "string", description: "Último día que puede el cliente, AAAA-MM-DD (máximo ~4 meses después de desde)" },
				personas: { type: "integer", description: "Personas del grupo, contando niños" },
			},
			required: ["actividad", "desde", "hasta", "personas"],
			additionalProperties: false,
		},
	},
	{
		name: "cotizar",
		description:
			"Calcula el precio de una o varias actividades con los precios del catálogo: subtotal por actividad, descuentos de paquete, total y forma de pago (pago completo; anticipo del 20 % solo con 3 o más actividades). Valida temporada, fecha y cupo máximo. No crea ninguna reserva.",
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
			"Genera el link de pago de la reserva y avisa al equipo: cobra el total, o el anticipo del 20 % si son 3 o más actividades y el cliente prefiere apartar. Úsalo solo cuando el cliente ya confirmó que quiere reservar y tienes fecha, personas y su nombre. Devuelve el link que debes incluir en tu respuesta.",
		strict: true,
		input_schema: {
			type: "object",
			properties: {
				actividades: { type: "array", items: ITEM_SCHEMA },
				nombre_cliente: { type: "string", description: "Nombre del cliente para la reserva" },
				anticipo: { type: "boolean", description: "true solo si son 3 o más actividades y el cliente quiere apartar con el 20 %; false para pagar el total. Con 1 o 2 actividades siempre se cobra el total." },
			},
			required: ["actividades", "nombre_cliente", "anticipo"],
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
	{
		name: "registrar_viaje_completo",
		description:
			"Registra a un cliente que busca un viaje completo de varios días todo incluido (Argo Navis Expeditions): avisa a Mau y Jaime con sus datos y pausa el asistente en esta conversación para que ellos le armen el viaje. Úsalo después de compartirle el link de Argo Navis.",
		strict: true,
		input_schema: {
			type: "object",
			properties: {
				fechas: { type: "string", description: "Fechas o rango aproximado (p. ej. 'marzo 2027, una semana'); cadena vacía si no se sabe" },
				personas: { type: "string", description: "Cuántas personas y quiénes (pareja, familia con niños, amigos…); cadena vacía si no se sabe" },
				dias: { type: "string", description: "Cuántos días o noches; cadena vacía si no se sabe" },
				intereses: { type: "string", description: "Qué quiere ver o hacer (ballenas, buceo, tiburón ballena, relajarse…)" },
				notas: { type: "string", description: "Presupuesto, hospedaje que ya tenga, de dónde viene, idioma u otros detalles útiles" },
			},
			required: ["fechas", "personas", "dias", "intereses", "notas"],
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
		const ages = Array.isArray(o.edades_ninos) ? o.edades_ninos.map(Number).filter((n) => Number.isFinite(n)) : []
		return { opcion: String(o.opcion ?? ""), personas: Number(o.personas), fecha: typeof o.fecha === "string" && o.fecha ? o.fecha : null, transporte: o.transporte === true, edadesNinos: ages }
	})
}

async function runTool(name: string, input: Record<string, unknown>, ctx: AgentContext): Promise<ToolOutcome> {
	if (name === "revisar_fechas") {
		return { content: await checkDates(String(input.actividad ?? ""), input.fechas, Number(input.personas) || 1) }
	}
	if (name === "salidas_confirmadas") {
		return { content: await confirmedDepartures(String(input.actividad ?? ""), input.desde, input.hasta, Math.max(1, Number(input.personas) || 1)) }
	}

	if (name === "cotizar") {
		const q = buildQuote(asItems(input.actividades), ctx.locale)
		return q.ok ? { content: quoteSummary(q) } : { content: q.error, isError: true }
	}

	if (name === "enviar_link_anticipo") {
		const q = buildQuote(asItems(input.actividades), ctx.locale)
		if (!q.ok) return { content: q.error, isError: true }
		if (q.lines.some((l) => !l.dateISO)) return { content: "Falta la fecha de alguna actividad; pídesela al cliente.", isError: true }
		for (const l of q.lines) {
			if (l.extra || !l.dateISO) continue
			const rush = await shortNoticeIssue(l.slug, l.dateISO, l.people)
			if (rush) return { content: rush, isError: true }
		}
		const customer = String(input.nombre_cliente ?? "").trim() || ctx.name || ""
		if (!customer) return { content: "Falta el nombre del cliente.", isError: true }
		const deposit = input.anticipo === true && q.depositAllowed
		const { path, totals } = createDepositDeal(q, customer, ctx.locale, !deposit)
		const kind = deposit ? "anticipo" : "pago completo"
		const id = await saveShortLink(path)
		const url = `${SITE_URL}/api/pago/${id}`
		const summary = quoteSummary(q)
		await appendMessage(ctx.phone, { id: `note-${Date.now()}`, by: "bot", text: "", at: Date.now(), note: `Link de ${kind} enviado (${url})` })
		await notifyOwner(`💬 Link de ${kind} enviado por el bot`, { phone: ctx.phone, name: customer, body: `${summary}\n\nCobro en el link: ${totals.depositMxn} MXN (${kind})\nLink: ${url}` })
		const why = input.anticipo === true && !q.depositAllowed ? "\nNota: el anticipo solo aplica con 3 o más actividades, así que el link cobra el total." : ""
		return { content: `Link de ${kind} (vence en 7 días), cobra ${totals.depositMxn} MXN: ${url}${why}\n\n${summary}` }
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

	if (name === "registrar_viaje_completo") {
		const field = (k: string) => String(input[k] ?? "").trim().slice(0, 400) || "—"
		const resumen = [
			`Fechas: ${field("fechas")}`,
			`Personas: ${field("personas")}`,
			`Días: ${field("dias")}`,
			`Quiere: ${field("intereses")}`,
			`Notas: ${field("notas")}`,
		].join("\n")
		await updateConversation(ctx.phone, {
			pausedUntil: Date.now() + PAUSE_FOREVER_MS,
			pauseReason: "handoff",
			needsHuman: true,
			handoffSummary: `🧭 Viaje completo (Argo Navis)\n${resumen}`,
		})
		await notifyOwner("🧭 Lead de viaje completo para Argo Navis", { phone: ctx.phone, name: ctx.name, body: resumen })
		return { content: "Listo: Mau y Jaime ya tienen sus datos y el asistente queda en pausa en este chat. Despídete en una o dos frases diciendo que ellos le escriben para armarle el viaje.", handoff: true }
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
