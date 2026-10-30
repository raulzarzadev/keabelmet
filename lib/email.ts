import { Resend } from "resend"
import { formatDate, formatMxn, reservationWhatsAppLink, type ReservationDetails } from "@/lib/reservation"
import { getActivityDetails } from "@/lib/activity-details"
import type { Locale } from "@/lib/i18n"

export const SITE_URL = "https://www.keabelmet.com"
export const FROM = process.env.RESEND_FROM || "Keabelmet <reservas@keabelmet.com>"

const SOCIAL = {
	instagram: "https://www.instagram.com/keabelmet__expeditions/",
	tiktok: "https://www.tiktok.com/@keabelmet_expeditions",
	whatsapp: "https://wa.me/526122347897",
}

type EmailData = Pick<ReservationDetails, "expeditionName" | "cardName" | "dateISO" | "people" | "totalMxn" | "customerName" | "customerEmail" | "locale"> & {
	folio: string
	paymentIntentId: string
	slug?: string
	rideAddon?: boolean
}

const rideLineByLocale: Record<string, string> = {
	es: "Raite redondo La Paz ⇄ La Ventana",
	en: "Round-trip ride La Paz ⇄ La Ventana",
	fr: "Transfert aller-retour La Paz ⇄ La Ventana",
	zh: "往返接送 拉巴斯 ⇄ 拉文塔纳",
	ca: "Transport d'anada i tornada La Paz ⇄ La Ventana",
}

/** Foto principal por expedición (misma que el hero de cada página). */
const HERO_BY_SLUG: Record<string, string> = {
	"safari-la-ventana": "/images/orca-safari.jpg",
	"buceo-cabo-pulmo": "/cabo-pulmo-cardumen-buzo.jpg",
	"tiburon-ballena": "/tiburon-ballena-drone.jpg",
	"buceo-la-paz": "/buceo-espiritu-santo-lobo-buzo.jpg",
	"tour-ballena-gris": "/ballena-gris-spyhop-drone.jpg",
	"tour-espiritu-santo": "/espiritu-santo-island-paradise-beach.jpg",
	"scuba-discovery": "/scuba-diving-underwater-la-paz-sea-lions-swimming.jpg",
	"certificacion-open-water": "/scuba-diving-underwater-la-paz-sea-lions-swimming.jpg",
	"safari-bahia-magdalena": "/images/marlin-bahia-magdalena-hero.jpeg",
}

export function heroUrl(slug?: string): string {
	const path = (slug && HERO_BY_SLUG[slug]) || "/fondomar1.jpg"
	return `${SITE_URL}${path}`
}

const t: Record<string, {
	subject: string; hello: string; confirmed: string; intro: string; folio: string; tour: string; date: string; people: string; total: string
	requested: string; note: string; wa: string; voucher: string; cancel: string; footer: string; includesTitle: string; follow: string; addCalendar: string
}> = {
	es: {
		subject: "Tu reserva en Keabelmet está confirmada",
		hello: "Hola", confirmed: "¡Reserva confirmada!",
		intro: "Gracias por reservar con nosotros. Guarda este correo: coordinaremos la fecha por WhatsApp según disponibilidad.",
		folio: "Folio de reserva", tour: "Expedición", date: "Fecha solicitada", people: "Personas", total: "Total pagado",
		requested: "solicitada", note: "La fecha es una solicitud; la confirmamos según disponibilidad.",
		wa: "Confirmar por WhatsApp", voucher: "Ver mi voucher",
		cancel: "¿Te equivocaste o necesitas cambiar la fecha? Escríbenos por WhatsApp y lo resolvemos.",
		footer: "Keabelmet Expeditions · La Paz, Baja California Sur",
		includesTitle: "Qué incluye tu experiencia", follow: "Síguenos", addCalendar: "Añadir a Google Calendar",
	},
	en: {
		subject: "Your Keabelmet reservation is confirmed",
		hello: "Hi", confirmed: "Reservation confirmed!",
		intro: "Thanks for booking with us. Keep this email: we'll coordinate the date over WhatsApp based on availability.",
		folio: "Booking reference", tour: "Expedition", date: "Requested date", people: "People", total: "Total paid",
		requested: "requested", note: "The date is a request; we confirm based on availability.",
		wa: "Confirm on WhatsApp", voucher: "View my voucher",
		cancel: "Made a mistake or need to change the date? Message us on WhatsApp and we'll sort it out.",
		footer: "Keabelmet Expeditions · La Paz, Baja California Sur",
		includesTitle: "What your experience includes", follow: "Follow us", addCalendar: "Add to Google Calendar",
	},
	fr: {
		subject: "Votre réservation Keabelmet est confirmée",
		hello: "Bonjour", confirmed: "Réservation confirmée !",
		intro: "Merci d'avoir réservé avec nous. Conservez cet e-mail : nous coordonnerons la date sur WhatsApp selon les disponibilités.",
		folio: "Référence de réservation", tour: "Expédition", date: "Date demandée", people: "Personnes", total: "Total payé",
		requested: "demandée", note: "La date est une demande ; nous la confirmons selon les disponibilités.",
		wa: "Confirmer sur WhatsApp", voucher: "Voir mon voucher",
		cancel: "Une erreur ou besoin de changer la date ? Écrivez-nous sur WhatsApp et nous arrangeons cela.",
		footer: "Keabelmet Expeditions · La Paz, Basse-Californie du Sud",
		includesTitle: "Ce que votre expérience inclut", follow: "Suivez-nous", addCalendar: "Ajouter à Google Agenda",
	},
	zh: {
		subject: "您的 Keabelmet 预订已确认",
		hello: "你好", confirmed: "预订已确认!",
		intro: "感谢您的预订。请保存此邮件:我们将根据可用情况通过 WhatsApp 协调日期。",
		folio: "预订编号", tour: "探险项目", date: "申请日期", people: "人数", total: "已付总额",
		requested: "已申请", note: "该日期为申请;我们将根据可用情况确认。",
		wa: "通过 WhatsApp 确认", voucher: "查看我的凭证",
		cancel: "填错了或需要更改日期?请通过 WhatsApp 联系我们,我们会为您处理。",
		footer: "Keabelmet Expeditions · 拉巴斯,南下加利福尼亚",
		includesTitle: "您的体验包含", follow: "关注我们", addCalendar: "添加到 Google 日历",
	},
	ca: {
		subject: "La teva reserva a Keabelmet està confirmada",
		hello: "Hola", confirmed: "Reserva confirmada!",
		intro: "Gràcies per reservar amb nosaltres. Guarda aquest correu: coordinarem la data per WhatsApp segons disponibilitat.",
		folio: "Foli de reserva", tour: "Expedició", date: "Data sol·licitada", people: "Persones", total: "Total pagat",
		requested: "sol·licitada", note: "La data és una sol·licitud; la confirmem segons disponibilitat.",
		wa: "Confirmar per WhatsApp", voucher: "Veure el meu voucher",
		cancel: "T'has equivocat o necessites canviar la data? Escriu-nos per WhatsApp i ho resolem.",
		footer: "Keabelmet Expeditions · La Paz, Baixa Califòrnia Sud",
		includesTitle: "Què inclou la teva experiència", follow: "Segueix-nos", addCalendar: "Afegir a Google Calendar",
	},
}

function buildHtml(d: EmailData): string {
	const L = t[d.locale] ?? t.es
	const ink = "#0d222f", card = "#0f2836", teal = "#28c2a0", sand = "#f4efe4", dim = "#a9c0cc", line = "rgba(244,239,228,0.14)"
	const waLink = reservationWhatsAppLink({ folio: d.folio, expeditionName: d.expeditionName, cardName: d.cardName, dateISO: d.dateISO, people: d.people, totalMxn: d.totalMxn, locale: d.locale }, "confirm")
	const voucherLink = `${SITE_URL}/${d.locale}/reserva/${d.paymentIntentId}`
	const calDetails = encodeURIComponent(`${L.folio}: ${d.folio}\n${L.people}: ${d.people}\n${L.tour}: ${d.cardName}\n${L.voucher}: ${voucherLink}`)
	const calLoc = encodeURIComponent(LOCATION_BY_SLUG[d.slug ?? ""] ?? "La Paz, Baja California Sur, México")
	const calLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Keabelmet: ${d.expeditionName}`)}&dates=${icsDate(d.dateISO)}/${icsDate(d.dateISO, 1)}&details=${calDetails}&location=${calLoc}`
	const row = (label: string, value: string, strong = false) =>
		`<tr><td style="padding:11px 0;border-bottom:1px solid ${line};color:${dim};font-size:13px">${label}</td><td style="padding:11px 0;border-bottom:1px solid ${line};color:${strong ? teal : sand};font-size:${strong ? "16px" : "14px"};font-weight:${strong ? 700 : 400};text-align:right">${value}</td></tr>`
	const baseIncludes = (d.slug ? getActivityDetails(d.slug, d.locale as Locale, d.cardName).includes : []).slice(0, 8)
	const includes = d.rideAddon ? [...baseIncludes, rideLineByLocale[d.locale] ?? rideLineByLocale.es] : baseIncludes
	const incItem = (it: string) =>
		`<tr><td width="22" style="padding:5px 0;color:${teal};font-size:14px;font-weight:700;vertical-align:top">&#10003;</td><td style="padding:5px 0;color:${sand};font-size:13.5px;line-height:1.45">${it}</td></tr>`
	const iconBtn = (href: string, icon: string, alt: string) =>
		`<a href="${href}" style="display:inline-block;padding:10px;margin:0 5px;border-radius:50%;background:rgba(40,194,160,0.12);border:1px solid ${line};line-height:0"><img src="${SITE_URL}/icons/${icon}" width="20" height="20" alt="${alt}" style="display:block;border:0" /></a>`

	return `<!doctype html><html><body style="margin:0;background:${ink};font-family:'Poppins',Segoe UI,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ink};padding:28px 16px">
<tr><td align="center">
<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:${card};border:1px solid ${line};border-radius:20px;overflow:hidden">
	<tr><td style="padding:0">
		<img src="${heroUrl(d.slug)}" width="480" alt="${d.expeditionName}" style="display:block;width:100%;height:180px;object-fit:cover;border:0" />
	</td></tr>
	<tr><td style="padding:24px 32px 0;text-align:center">
		<img src="${SITE_URL}/logo.png" width="60" height="60" alt="Keabelmet" style="display:block;width:60px;height:60px;margin:0 auto 12px;border-radius:50%;border:2px solid rgba(244,239,228,0.16)" />
		<div style="color:${teal};letter-spacing:0.22em;font-size:12px;font-weight:700">KEABELMET</div>
		<h1 style="margin:10px 0 0;color:${sand};font-size:22px;font-weight:800">&#10003; ${L.confirmed}</h1>
	</td></tr>
	<tr><td style="padding:8px 32px 0;text-align:center">
		<p style="color:${dim};font-size:14px;line-height:1.55;margin:8px 0 20px">${L.hello} ${d.customerName}, ${L.intro}</p>
	</td></tr>
	<tr><td style="padding:0 32px">
		<div style="background:rgba(40,194,160,0.1);border:1px dashed rgba(40,194,160,0.5);border-radius:14px;padding:14px;text-align:center">
			<div style="color:${dim};font-size:11px;letter-spacing:0.12em;text-transform:uppercase">${L.folio}</div>
			<div style="color:${teal};font-size:22px;font-weight:800;letter-spacing:0.04em;margin-top:3px">${d.folio}</div>
		</div>
	</td></tr>
	<tr><td style="padding:20px 32px 4px">
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
			${row(L.tour, `${d.expeditionName} — ${d.cardName}`)}
			${row(L.date, `${formatDate(d.dateISO, d.locale)} · ${L.requested}`)}
			${row(L.people, String(d.people))}
			${row(L.total, `${formatMxn(d.totalMxn)} MXN`, true)}
		</table>
		<p style="color:${dim};font-size:12px;font-style:italic;margin:14px 0 0">${L.note}</p>
	</td></tr>
	${includes.length ? `<tr><td style="padding:18px 32px 2px">
		<div style="color:${teal};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;margin-bottom:8px">${L.includesTitle}</div>
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${includes.map(incItem).join("")}</table>
	</td></tr>` : ""}
	<tr><td style="padding:22px 32px 8px" align="center">
		<a href="${waLink}" style="display:inline-block;background:${teal};color:#04121a;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px">${L.wa}</a>
	</td></tr>
	<tr><td style="padding:8px 32px 0" align="center">
		<a href="${calLink}" style="display:inline-block;background:transparent;color:${teal};text-decoration:none;font-weight:700;font-size:15px;padding:12px 26px;border-radius:999px;border:1.5px solid ${teal}">&#128197; ${L.addCalendar}</a>
	</td></tr>
	<tr><td style="padding:12px 32px 22px" align="center">
		<a href="${voucherLink}" style="color:${teal};font-size:13px;text-decoration:underline">${L.voucher}</a>
	</td></tr>
	<tr><td style="padding:16px 32px;border-top:1px solid ${line}">
		<p style="color:${dim};font-size:12px;line-height:1.5;margin:0">${L.cancel}</p>
	</td></tr>
	<tr><td style="padding:16px 32px 4px;text-align:center">
		<div style="color:${dim};font-size:12px;margin-bottom:6px">${L.follow}</div>
		${iconBtn(SOCIAL.instagram, "instagram.png", "Instagram")}${iconBtn(SOCIAL.tiktok, "tiktok.png", "TikTok")}${iconBtn(SOCIAL.whatsapp, "whatsapp.png", "WhatsApp")}
	</td></tr>
	<tr><td style="padding:16px 32px 24px;text-align:center">
		<p style="color:${dim};font-size:11px;margin:0">${L.footer}</p>
	</td></tr>
</table>
</td></tr>
</table>
</body></html>`
}

export async function sendReservationEmail(d: EmailData): Promise<{ ok: boolean; id?: string; error?: string }> {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) return { ok: false, error: "RESEND_API_KEY no configurada" }
	const L = t[d.locale] ?? t.es
	try {
		const resend = new Resend(apiKey)
		const { data, error } = await resend.emails.send({
			from: FROM,
			to: [d.customerEmail],
			subject: L.subject,
			html: buildHtml(d),
		})
		if (error) return { ok: false, error: error.message }
		return { ok: true, id: data?.id }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : "send_failed" }
	}
}

// ---------------------------------------------------------------------------
// Aviso interno al dueño: correo con los datos de la venta + invitación de
// calendario (.ics) para que se anote en Google Calendar automáticamente.
// ---------------------------------------------------------------------------

export const OWNER_EMAIL = process.env.OWNER_NOTIFY_EMAIL || "contacto@keabelmet.com"
const ORGANIZER_EMAIL = "reservas@keabelmet.com"

const LOCATION_BY_SLUG: Record<string, string> = {
	"safari-la-ventana": "La Ventana, Baja California Sur, México",
	"buceo-cabo-pulmo": "Cabo Pulmo, Baja California Sur, México",
	"tiburon-ballena": "Muelle Fiscal de La Paz, Baja California Sur, México",
	"buceo-la-paz": "La Paz, Baja California Sur, México",
	"tour-ballena-gris": "Puerto Chale, Baja California Sur, México",
	"tour-espiritu-santo": "Muelle Fiscal de La Paz, Baja California Sur, México",
	"scuba-discovery": "La Paz, Baja California Sur, México",
	"certificacion-open-water": "La Paz, Baja California Sur, México",
	"safari-bahia-magdalena": "Bahía Magdalena, Baja California Sur, México",
}

export type OwnerNotifyData = EmailData & { customerPhone?: string }

function icsDate(dateISO: string, addDays = 0): string {
	const [y, m, d] = dateISO.split("-").map(Number)
	const dt = new Date(Date.UTC(y, m - 1, d + addDays))
	return `${dt.getUTCFullYear()}${String(dt.getUTCMonth() + 1).padStart(2, "0")}${String(dt.getUTCDate()).padStart(2, "0")}`
}

function icsEscape(s: string): string {
	return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n")
}

function eventTitle(d: OwnerNotifyData): string {
	return `Keabelmet: ${d.expeditionName} — ${d.customerName} (${d.people} pers.)`
}

function eventDetailLines(d: OwnerNotifyData): string[] {
	return [
		`Folio: ${d.folio}`,
		`Cliente: ${d.customerName}`,
		d.customerPhone ? `Tel/WhatsApp: ${d.customerPhone}` : "",
		`Correo: ${d.customerEmail}`,
		`Personas: ${d.people}`,
		`Total: ${formatMxn(d.totalMxn)} MXN`,
		d.rideAddon ? "Raite La Paz ⇄ La Ventana: Sí" : "",
		`Expedición: ${d.cardName}`,
	].filter(Boolean)
}

function buildIcs(d: OwnerNotifyData): string {
	const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
	const loc = LOCATION_BY_SLUG[d.slug ?? ""] ?? "La Paz, Baja California Sur, México"
	const desc = eventDetailLines(d).join("\n")
	return [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//Keabelmet//Reservas//ES",
		"METHOD:REQUEST",
		"CALSCALE:GREGORIAN",
		"BEGIN:VEVENT",
		`UID:${d.folio}@keabelmet.com`,
		`DTSTAMP:${now}`,
		`DTSTART;VALUE=DATE:${icsDate(d.dateISO)}`,
		`DTEND;VALUE=DATE:${icsDate(d.dateISO, 1)}`,
		`SUMMARY:${icsEscape(eventTitle(d))}`,
		`DESCRIPTION:${icsEscape(desc)}`,
		`LOCATION:${icsEscape(loc)}`,
		`ORGANIZER;CN=Keabelmet:mailto:${ORGANIZER_EMAIL}`,
		`ATTENDEE;CN=Keabelmet;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${OWNER_EMAIL}`,
		"STATUS:CONFIRMED",
		"SEQUENCE:0",
		"TRANSP:TRANSPARENT",
		"END:VEVENT",
		"END:VCALENDAR",
	].join("\r\n")
}

function gcalLink(d: OwnerNotifyData): string {
	const dates = `${icsDate(d.dateISO)}/${icsDate(d.dateISO, 1)}`
	const text = encodeURIComponent(eventTitle(d))
	const details = encodeURIComponent(eventDetailLines(d).join("\n"))
	const location = encodeURIComponent(LOCATION_BY_SLUG[d.slug ?? ""] ?? "La Paz, Baja California Sur, México")
	return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`
}

function buildOwnerHtml(d: OwnerNotifyData): string {
	const ink = "#0d222f", sand = "#f4efe4", dim = "#cdc6b4", teal = "#28c2a0", line = "rgba(244,239,228,0.14)"
	const waNum = (d.customerPhone || "").replace(/[^\d]/g, "")
	const row = (label: string, value: string, strong = false) =>
		`<tr><td style="padding:11px 0;border-bottom:1px solid ${line};color:${dim};font-size:13px">${label}</td><td style="padding:11px 0;border-bottom:1px solid ${line};color:${strong ? teal : sand};font-size:${strong ? "16px" : "14px"};font-weight:${strong ? 700 : 400};text-align:right">${value}</td></tr>`
	return `<!doctype html><html><body style="margin:0;background:${ink};font-family:'Poppins',Segoe UI,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ink};padding:24px 0">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0f2734;border:1px solid ${line};border-radius:16px;overflow:hidden">
	<tr><td style="padding:26px 32px 8px">
		<div style="color:${teal};font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700">Nueva reserva pagada</div>
		<h1 style="color:${sand};font-size:22px;margin:8px 0 2px">🎉 ${d.expeditionName}</h1>
		<div style="color:${dim};font-size:14px">${d.cardName}</div>
	</td></tr>
	<tr><td style="padding:12px 32px">
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
			${row("Folio", d.folio)}
			${row("Fecha", formatDate(d.dateISO, "es"))}
			${row("Personas", String(d.people))}
			${d.rideAddon ? row("Raite La Paz ⇄ La Ventana", "Sí") : ""}
			${row("Total", `${formatMxn(d.totalMxn)} MXN`, true)}
		</table>
	</td></tr>
	<tr><td style="padding:6px 32px 4px">
		<div style="color:${teal};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;margin-bottom:8px">Contacto del cliente</div>
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
			${row("Nombre", d.customerName)}
			${d.customerPhone ? `<tr><td style="padding:11px 0;border-bottom:1px solid ${line};color:${dim};font-size:13px">Tel / WhatsApp</td><td style="padding:11px 0;border-bottom:1px solid ${line};text-align:right"><a href="https://wa.me/${waNum}" style="color:${teal};font-size:14px;text-decoration:none">${d.customerPhone}</a></td></tr>` : ""}
			<tr><td style="padding:11px 0;border-bottom:1px solid ${line};color:${dim};font-size:13px">Correo</td><td style="padding:11px 0;border-bottom:1px solid ${line};text-align:right"><a href="mailto:${d.customerEmail}" style="color:${teal};font-size:14px;text-decoration:none">${d.customerEmail}</a></td></tr>
		</table>
	</td></tr>
	<tr><td style="padding:22px 32px 8px" align="center">
		<a href="${gcalLink(d)}" style="display:inline-block;background:${teal};color:#04121a;font-weight:700;font-size:15px;text-decoration:none;padding:13px 26px;border-radius:12px">📅 Añadir a Google Calendar</a>
	</td></tr>
	<tr><td style="padding:2px 32px 26px" align="center">
		<p style="color:${dim};font-size:12px;margin:0">También adjuntamos el evento (.ics). Con "agregar invitaciones automáticamente" en Google Calendar se anota solo.</p>
	</td></tr>
</table>
</td></tr>
</table>
</body></html>`
}

export async function sendOwnerNotification(d: OwnerNotifyData): Promise<{ ok: boolean; id?: string; error?: string }> {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) return { ok: false, error: "RESEND_API_KEY no configurada" }
	const to = OWNER_EMAIL.split(",").map((s) => s.trim()).filter(Boolean)
	if (to.length === 0) return { ok: false, error: "OWNER_NOTIFY_EMAIL vacío" }
	try {
		const resend = new Resend(apiKey)
		const ics = buildIcs(d)
		const { data, error } = await resend.emails.send({
			from: FROM,
			to,
			subject: `🎉 Nueva reserva: ${d.expeditionName} · ${d.people} pers. · ${formatDate(d.dateISO, "es")}`,
			html: buildOwnerHtml(d),
			attachments: [
				{ filename: "reserva.ics", content: Buffer.from(ics, "utf8"), contentType: "text/calendar; method=REQUEST; charset=UTF-8" },
			],
		})
		if (error) return { ok: false, error: error.message }
		return { ok: true, id: data?.id }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : "send_failed" }
	}
}

// ===========================================================================
// RESERVA CON ANTICIPO (multi-actividad): voucher de bienvenida al cliente +
// aviso al dueño, con el total, lo pagado (20%) y el restante por liquidar.
// ===========================================================================

export interface DepositVoucherItem {
	slug: string
	expeditionName: string
	dateISO: string
	people: number
	subtotalMxn: number
}

export interface DepositEmailData {
	folio: string
	paymentIntentId: string
	customerName: string
	customerEmail: string
	customerPhone?: string
	locale: string
	items: DepositVoucherItem[]
	subtotalMxn?: number
	discountMxn?: number
	totalMxn: number
	depositMxn: number
	remainingMxn: number
}

const depositT: Record<string, {
	subject: string; hello: string; intro: string; folio: string; activities: string; people: string;
	subtotal: string; discount: string;
	total: string; paid: string; remaining: string; payRest: string; calNote: string; follow: string; footer: string;
}> = {
	es: {
		subject: "¡Bienvenido/a! Tu reserva en Keabelmet está apartada",
		hello: "¡Bienvenido/a", intro: "Tu aventura en la Baja ya está apartada. Guarda este correo con el resumen de tus actividades.",
		folio: "Folio de reserva", activities: "Tus actividades", people: "personas",
		subtotal: "Subtotal", discount: "Descuento de paquete",
		total: "Total", paid: "Anticipo pagado (20%)", remaining: "Restante por liquidar",
		payRest: "El restante lo puedes pagar en efectivo, transferencia o tarjeta el día de tus tours.",
		calNote: "Adjuntamos un archivo (.ics) con todas tus actividades para agregarlas a tu calendario.",
		follow: "Síguenos", footer: "Keabelmet Expeditions · La Paz, Baja California Sur",
	},
	en: { subject: "Welcome! Your Keabelmet reservation is held", hello: "Welcome", intro: "Your Baja adventure is reserved. Keep this email with the summary of your activities.", folio: "Booking reference", activities: "Your activities", people: "people", subtotal: "Subtotal", discount: "Package discount", total: "Total", paid: "Deposit paid (20%)", remaining: "Balance due", payRest: "You can pay the balance in cash, bank transfer or card on the day of your tours.", calNote: "We've attached a file (.ics) with all your activities to add them to your calendar.", follow: "Follow us", footer: "Keabelmet Expeditions · La Paz, Baja California Sur" },
	fr: { subject: "Bienvenue ! Votre réservation Keabelmet est enregistrée", hello: "Bienvenue", intro: "Votre aventure en Basse-Californie est réservée. Conservez cet e-mail avec le résumé de vos activités.", folio: "Référence de réservation", activities: "Vos activités", people: "personnes", subtotal: "Sous-total", discount: "Remise forfait", total: "Total", paid: "Acompte payé (20%)", remaining: "Solde à régler", payRest: "Vous pouvez régler le solde en espèces, virement ou carte le jour de vos tours.", calNote: "Nous avons joint un fichier (.ics) avec toutes vos activités pour les ajouter à votre agenda.", follow: "Suivez-nous", footer: "Keabelmet Expeditions · La Paz, Basse-Californie du Sud" },
	zh: { subject: "欢迎！您的 Keabelmet 预订已保留", hello: "欢迎", intro: "您的下加州之旅已保留。请保存此邮件及活动摘要。", folio: "预订编号", activities: "您的活动", people: "人", subtotal: "小计", discount: "套餐折扣", total: "总计", paid: "已付定金（20%）", remaining: "待付余额", payRest: "余额可在行程当天以现金、转账或刷卡支付。", calNote: "我们附上了一个文件（.ics），包含您的所有活动，可添加到日历。", follow: "关注我们", footer: "Keabelmet Expeditions · 拉巴斯，南下加利福尼亚" },
	ca: { subject: "Benvingut/da! La teva reserva a Keabelmet està apartada", hello: "Benvingut/da", intro: "La teva aventura a la Baixa ja està apartada. Guarda aquest correu amb el resum de les teves activitats.", folio: "Foli de reserva", activities: "Les teves activitats", people: "persones", subtotal: "Subtotal", discount: "Descompte de paquet", total: "Total", paid: "Bestreta pagada (20%)", remaining: "Pendent de liquidar", payRest: "El pendent el pots pagar en efectiu, transferència o targeta el dia dels teus tours.", calNote: "Adjuntem un fitxer (.ics) amb totes les teves activitats per afegir-les al calendari.", follow: "Segueix-nos", footer: "Keabelmet Expeditions · La Paz, Baixa Califòrnia Sud" },
}

function buildDepositIcs(d: DepositEmailData): string {
	const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
	const lines: string[] = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Keabelmet//Reservas//ES", "METHOD:PUBLISH", "CALSCALE:GREGORIAN"]
	d.items.forEach((it, idx) => {
		const loc = LOCATION_BY_SLUG[it.slug] ?? "La Paz, Baja California Sur, México"
		const title = `Keabelmet: ${it.expeditionName} — ${d.customerName} (${it.people} pers.)`
		const desc = [`Folio: ${d.folio}`, `Cliente: ${d.customerName}`, `Personas: ${it.people}`, `Total reserva: ${formatMxn(d.totalMxn)} MXN`, `Anticipo pagado: ${formatMxn(d.depositMxn)} MXN`, `Restante por liquidar: ${formatMxn(d.remainingMxn)} MXN`].join("\n")
		lines.push("BEGIN:VEVENT", `UID:${d.folio}-${idx}@keabelmet.com`, `DTSTAMP:${now}`, `DTSTART;VALUE=DATE:${icsDate(it.dateISO)}`, `DTEND;VALUE=DATE:${icsDate(it.dateISO, 1)}`, `SUMMARY:${icsEscape(title)}`, `DESCRIPTION:${icsEscape(desc)}`, `LOCATION:${icsEscape(loc)}`, "STATUS:CONFIRMED", "SEQUENCE:0", "TRANSP:TRANSPARENT", "END:VEVENT")
	})
	lines.push("END:VCALENDAR")
	return lines.join("\r\n")
}

function buildDepositHtml(d: DepositEmailData): string {
	const L = depositT[d.locale] ?? depositT.es
	const ink = "#0d222f", card = "#0f2836", teal = "#28c2a0", sand = "#f4efe4", dim = "#a9c0cc", line = "rgba(244,239,228,0.14)"
	const hero = heroUrl(d.items[0]?.slug)
	const iconBtn = (href: string, icon: string, alt: string) =>
		`<a href="${href}" style="display:inline-block;padding:10px;margin:0 5px;border-radius:50%;background:rgba(40,194,160,0.12);border:1px solid ${line};line-height:0"><img src="${SITE_URL}/icons/${icon}" width="20" height="20" alt="${alt}" style="display:block;border:0" /></a>`
	const itemRow = (it: DepositVoucherItem) =>
		`<tr><td style="padding:12px 0;border-bottom:1px solid ${line}"><div style="color:${sand};font-size:15px;font-weight:700">${it.expeditionName}</div><div style="color:${dim};font-size:13px;margin-top:2px">${formatDate(it.dateISO, d.locale)} · ${it.people} ${L.people}</div></td><td style="padding:12px 0;border-bottom:1px solid ${line};text-align:right;color:${sand};font-size:14px;white-space:nowrap;vertical-align:top">${formatMxn(it.subtotalMxn)}</td></tr>`
	const sumRow = (label: string, value: string, strong = false) =>
		`<tr><td style="padding:9px 0;color:${strong ? sand : dim};font-size:${strong ? "15px" : "13px"};font-weight:${strong ? 700 : 400}">${label}</td><td style="padding:9px 0;text-align:right;color:${strong ? teal : sand};font-size:${strong ? "18px" : "14px"};font-weight:${strong ? 800 : 600}">${value}</td></tr>`
	return `<!doctype html><html><body style="margin:0;background:${ink};font-family:'Poppins',Segoe UI,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ink};padding:28px 16px"><tr><td align="center">
<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:${card};border:1px solid ${line};border-radius:20px;overflow:hidden">
	<tr><td style="padding:0"><img src="${hero}" width="480" alt="Keabelmet" style="display:block;width:100%;height:170px;object-fit:cover" /></td></tr>
	<tr><td style="padding:26px 30px 6px;text-align:center">
		<img src="${SITE_URL}/logo.png" width="56" height="56" alt="Keabelmet" style="display:block;width:56px;height:56px;margin:0 auto 12px;border-radius:50%;border:2px solid rgba(244,239,228,0.16)" />
		<h1 style="margin:6px 0 0;color:${sand};font-size:23px;font-weight:800">${L.hello}, ${d.customerName}!</h1>
		<p style="color:${dim};font-size:14px;line-height:1.55;margin:10px 0 18px">${L.intro}</p>
	</td></tr>
	<tr><td style="padding:0 30px">
		<div style="background:rgba(40,194,160,0.1);border:1px dashed rgba(40,194,160,0.5);border-radius:14px;padding:14px;text-align:center">
			<div style="color:${dim};font-size:11px;letter-spacing:0.12em;text-transform:uppercase">${L.folio}</div>
			<div style="color:${teal};font-size:22px;font-weight:800;letter-spacing:0.04em;margin-top:3px">${d.folio}</div>
		</div>
	</td></tr>
	<tr><td style="padding:22px 30px 6px">
		<div style="color:${teal};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;margin-bottom:4px">${L.activities}</div>
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${d.items.map(itemRow).join("")}</table>
	</td></tr>
	<tr><td style="padding:14px 30px 6px">
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
			${d.discountMxn && d.discountMxn > 0 ? `${sumRow(L.subtotal, `${formatMxn(d.subtotalMxn ?? d.totalMxn + d.discountMxn)} MXN`)}<tr><td style="padding:9px 0;color:${teal};font-size:13px;font-weight:600">🎁 ${L.discount}</td><td style="padding:9px 0;text-align:right;color:${teal};font-size:14px;font-weight:700">−${formatMxn(d.discountMxn)} MXN</td></tr>` : ""}
			${sumRow(L.total, `${formatMxn(d.totalMxn)} MXN`)}
			${sumRow(L.paid, `${formatMxn(d.depositMxn)} MXN`, true)}
			${sumRow(L.remaining, `${formatMxn(d.remainingMxn)} MXN`)}
		</table>
	</td></tr>
	<tr><td style="padding:6px 30px 2px">
		<p style="background:rgba(244,239,228,0.04);border:1px solid ${line};border-radius:12px;padding:12px 14px;color:${sand};font-size:13px;line-height:1.5;margin:0">💵 ${L.payRest}</p>
	</td></tr>
	<tr><td style="padding:12px 30px 6px"><p style="color:${dim};font-size:12px;line-height:1.5;margin:0">📅 ${L.calNote}</p></td></tr>
	<tr><td style="padding:16px 30px 24px;text-align:center;border-top:1px solid ${line}">
		<div style="color:${dim};font-size:12px;margin:10px 0 10px">${L.follow}</div>
		${iconBtn(SOCIAL.instagram, "instagram.png", "Instagram")}${iconBtn(SOCIAL.tiktok, "tiktok.png", "TikTok")}${iconBtn(SOCIAL.whatsapp, "whatsapp.png", "WhatsApp")}
		<p style="color:${dim};font-size:11px;margin:14px 0 0">${L.footer}</p>
	</td></tr>
</table></td></tr></table></body></html>`
}

function buildDepositOwnerHtml(d: DepositEmailData): string {
	const ink = "#0d222f", sand = "#f4efe4", dim = "#cdc6b4", teal = "#28c2a0", line = "rgba(244,239,228,0.14)"
	const waNum = (d.customerPhone || "").replace(/[^\d]/g, "")
	const itemRow = (it: DepositVoucherItem) =>
		`<tr><td style="padding:10px 0;border-bottom:1px solid ${line};color:${sand};font-size:14px">${it.expeditionName}<div style="color:${dim};font-size:12px">${formatDate(it.dateISO, "es")} · ${it.people} pers.</div></td><td style="padding:10px 0;border-bottom:1px solid ${line};text-align:right;color:${sand};font-size:14px;vertical-align:top">${formatMxn(it.subtotalMxn)}</td></tr>`
	const row = (label: string, value: string, strong = false) =>
		`<tr><td style="padding:9px 0;color:${dim};font-size:13px">${label}</td><td style="padding:9px 0;color:${strong ? teal : sand};font-size:${strong ? "16px" : "14px"};font-weight:${strong ? 700 : 400};text-align:right">${value}</td></tr>`
	return `<!doctype html><html><body style="margin:0;background:${ink};font-family:'Poppins',Segoe UI,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ink};padding:24px 0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0f2734;border:1px solid ${line};border-radius:16px;overflow:hidden">
	<tr><td style="padding:26px 32px 8px">
		<div style="color:${teal};font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700">Nueva reserva con anticipo</div>
		<h1 style="color:${sand};font-size:22px;margin:8px 0 2px">🎉 ${d.customerName} · ${d.items.length} actividad(es)</h1>
	</td></tr>
	<tr><td style="padding:10px 32px 2px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${d.items.map(itemRow).join("")}</table></td></tr>
	<tr><td style="padding:12px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
		${d.discountMxn && d.discountMxn > 0 ? row("Descuento de paquete", `−${formatMxn(d.discountMxn)} MXN`) : ""}
		${row("Total", `${formatMxn(d.totalMxn)} MXN`)}
		${row("Anticipo pagado (20%)", `${formatMxn(d.depositMxn)} MXN`, true)}
		${row("Restante por liquidar", `${formatMxn(d.remainingMxn)} MXN`)}
	</table></td></tr>
	<tr><td style="padding:6px 32px 4px">
		<div style="color:${teal};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;margin-bottom:8px">Contacto del cliente</div>
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
			${row("Folio", d.folio)}
			${row("Nombre", d.customerName)}
			${d.customerPhone ? `<tr><td style="padding:9px 0;color:${dim};font-size:13px">Tel / WhatsApp</td><td style="padding:9px 0;text-align:right"><a href="https://wa.me/${waNum}" style="color:${teal};font-size:14px;text-decoration:none">${d.customerPhone}</a></td></tr>` : ""}
			<tr><td style="padding:9px 0;color:${dim};font-size:13px">Correo</td><td style="padding:9px 0;text-align:right"><a href="mailto:${d.customerEmail}" style="color:${teal};font-size:14px;text-decoration:none">${d.customerEmail}</a></td></tr>
		</table>
	</td></tr>
	<tr><td style="padding:10px 32px 26px" align="center"><p style="color:${dim};font-size:12px;margin:0">Adjuntamos el .ics con todas las actividades. El restante (${formatMxn(d.remainingMxn)} MXN) se cobra el día del tour.</p></td></tr>
</table></td></tr></table></body></html>`
}

export async function sendDepositEmail(d: DepositEmailData): Promise<{ ok: boolean; id?: string; error?: string }> {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) return { ok: false, error: "RESEND_API_KEY no configurada" }
	const L = depositT[d.locale] ?? depositT.es
	try {
		const resend = new Resend(apiKey)
		const ics = buildDepositIcs(d)
		const { data, error } = await resend.emails.send({
			from: FROM,
			to: [d.customerEmail],
			subject: L.subject,
			html: buildDepositHtml(d),
			attachments: [{ filename: "actividades.ics", content: Buffer.from(ics, "utf8"), contentType: "text/calendar; charset=UTF-8" }],
		})
		if (error) return { ok: false, error: error.message }
		return { ok: true, id: data?.id }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : "send_failed" }
	}
}

// ===== DEAL personalizado: voucher de bienvenida =====

export interface DealEmailLine {
	label: string
	amountMxn: number
}

export interface DealEmailData {
	folio: string
	paymentIntentId: string
	customerName: string
	customerEmail: string
	customerPhone?: string
	locale: string
	title: string
	subtitle?: string
	lines: DealEmailLine[]
	totalMxn: number
	depositMxn: number
	remainingMxn: number
	rate: number
	includes?: string
	excludes?: string
	note?: string
	startISO?: string
	endISO?: string
	/** Fotos con URL absoluta; la primera es la portada. */
	photos?: { src: string; label: string }[]
}

const dealT: Record<string, {
	subject: string; hello: string; intro: string; folio: string; breakdown: string; total: string; paid: string; remaining: string;
	includes: string; excludes: string; payRest: string; calNote: string; follow: string; footer: string;
}> = {
	es: { subject: "¡Bienvenido/a! Tu reserva en Keabelmet está apartada", hello: "¡Bienvenido/a", intro: "Tu aventura en la Baja ya está apartada. Guarda este correo con el resumen de tu reserva.", folio: "Folio de reserva", breakdown: "Desglose", total: "Total del grupo", paid: "Anticipo pagado", remaining: "Restante por liquidar", includes: "Incluye", excludes: "No incluye", payRest: "El restante lo puedes pagar en efectivo, transferencia o tarjeta el día de tus tours.", calNote: "Adjuntamos un archivo (.ics) con tus fechas para agregarlas a tu calendario.", follow: "Síguenos", footer: "Keabelmet Expeditions · La Paz, Baja California Sur" },
	en: { subject: "Welcome! Your Keabelmet reservation is held", hello: "Welcome", intro: "Your Baja adventure is reserved. Keep this email with your booking summary.", folio: "Booking reference", breakdown: "Breakdown", total: "Group total", paid: "Deposit paid", remaining: "Balance due", includes: "Included", excludes: "Not included", payRest: "You can pay the balance in cash, bank transfer or card on the day of your tours.", calNote: "We've attached a file (.ics) with your dates to add them to your calendar.", follow: "Follow us", footer: "Keabelmet Expeditions · La Paz, Baja California Sur" },
	fr: { subject: "Bienvenue ! Votre réservation Keabelmet est enregistrée", hello: "Bienvenue", intro: "Votre aventure en Basse-Californie est réservée. Conservez cet e-mail avec le résumé de votre réservation.", folio: "Référence", breakdown: "Détail", total: "Total du groupe", paid: "Acompte payé", remaining: "Solde à régler", includes: "Inclus", excludes: "Non inclus", payRest: "Vous pouvez régler le solde en espèces, virement ou carte le jour de vos tours.", calNote: "Nous avons joint un fichier (.ics) avec vos dates.", follow: "Suivez-nous", footer: "Keabelmet Expeditions · La Paz, Basse-Californie du Sud" },
	zh: { subject: "欢迎！您的 Keabelmet 预订已保留", hello: "欢迎", intro: "您的下加州之旅已保留。请保存此邮件及预订摘要。", folio: "预订编号", breakdown: "明细", total: "团队总计", paid: "已付定金", remaining: "待付余额", includes: "包含", excludes: "不包含", payRest: "余额可在行程当天以现金、转账或刷卡支付。", calNote: "我们附上了一个文件（.ics），包含您的日期。", follow: "关注我们", footer: "Keabelmet Expeditions · 拉巴斯，南下加利福尼亚" },
	ca: { subject: "Benvingut/da! La teva reserva a Keabelmet està apartada", hello: "Benvingut/da", intro: "La teva aventura a la Baixa ja està apartada. Guarda aquest correu amb el resum de la teva reserva.", folio: "Foli", breakdown: "Desglossament", total: "Total del grup", paid: "Bestreta pagada", remaining: "Pendent de liquidar", includes: "Inclou", excludes: "No inclou", payRest: "El pendent el pots pagar en efectiu, transferència o targeta el dia dels teus tours.", calNote: "Adjuntem un fitxer (.ics) amb les teves dates.", follow: "Segueix-nos", footer: "Keabelmet Expeditions · La Paz, Baixa Califòrnia Sud" },
}

function dealIcsLines(text?: string): string[] {
	return (text || "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
}

function buildDealIcs(d: DealEmailData): string {
	const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
	const lines: string[] = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Keabelmet//Reservas//ES", "METHOD:PUBLISH", "CALSCALE:GREGORIAN"]
	if (d.startISO) {
		const endExclusive = d.endISO || d.startISO
		const title = `Keabelmet: ${d.title} — ${d.customerName}`
		const desc = [`Folio: ${d.folio}`, `Cliente: ${d.customerName}`, `Total reserva: ${formatMxn(d.totalMxn)} MXN`, `Anticipo pagado: ${formatMxn(d.depositMxn)} MXN`, `Restante por liquidar: ${formatMxn(d.remainingMxn)} MXN`].join("\n")
		lines.push("BEGIN:VEVENT", `UID:${d.folio}@keabelmet.com`, `DTSTAMP:${now}`, `DTSTART;VALUE=DATE:${icsDate(d.startISO)}`, `DTEND;VALUE=DATE:${icsDate(endExclusive, 1)}`, `SUMMARY:${icsEscape(title)}`, `DESCRIPTION:${icsEscape(desc)}`, "LOCATION:La Paz, Baja California Sur, México", "STATUS:CONFIRMED", "SEQUENCE:0", "TRANSP:TRANSPARENT", "END:VEVENT")
	}
	lines.push("END:VCALENDAR")
	return lines.join("\r\n")
}

function buildDealHtml(d: DealEmailData): string {
	const L = dealT[d.locale] ?? dealT.es
	const ink = "#0d222f", card = "#0f2836", teal = "#28c2a0", sand = "#f4efe4", dim = "#a9c0cc", line = "rgba(244,239,228,0.14)"
	const photos = d.photos ?? []
	const hero = photos[0]?.src || heroUrl()
	// Mosaico con el resto de las fotos (2 por fila).
	const rest = photos.slice(1, 5)
	const photoCell = (p: { src: string; label: string }) =>
		`<td width="50%" style="padding:4px;vertical-align:top"><img src="${p.src}" width="206" alt="${p.label}" style="display:block;width:100%;height:120px;object-fit:cover;border-radius:12px;border:0" /><div style="color:${dim};font-size:11px;margin-top:4px;text-align:center">${p.label}</div></td>`
	const mosaicRows: string[] = []
	for (let i = 0; i < rest.length; i += 2) {
		const pair = rest.slice(i, i + 2)
		mosaicRows.push(`<tr>${pair.map(photoCell).join("")}${pair.length === 1 ? '<td width="50%"></td>' : ""}</tr>`)
	}
	const mosaic = mosaicRows.length
		? `<tr><td style="padding:18px 26px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${mosaicRows.join("")}</table></td></tr>`
		: ""
	const iconBtn = (href: string, icon: string, alt: string) =>
		`<a href="${href}" style="display:inline-block;padding:10px;margin:0 5px;border-radius:50%;background:rgba(40,194,160,0.12);border:1px solid ${line};line-height:0"><img src="${SITE_URL}/icons/${icon}" width="20" height="20" alt="${alt}" style="display:block;border:0" /></a>`
	const lineRow = (l: DealEmailLine) =>
		`<tr><td style="padding:11px 0;border-bottom:1px solid ${line};color:${sand};font-size:14px">${l.label}</td><td style="padding:11px 0;border-bottom:1px solid ${line};text-align:right;color:${sand};font-size:14px;white-space:nowrap;vertical-align:top">${formatMxn(l.amountMxn)}</td></tr>`
	const sumRow = (label: string, value: string, strong = false) =>
		`<tr><td style="padding:9px 0;color:${strong ? sand : dim};font-size:${strong ? "15px" : "13px"};font-weight:${strong ? 700 : 400}">${label}</td><td style="padding:9px 0;text-align:right;color:${strong ? teal : sand};font-size:${strong ? "18px" : "14px"};font-weight:${strong ? 800 : 600}">${value}</td></tr>`
	const pct = Math.round(d.rate * 100)
	const inexCol = (title: string, text: string, no = false) =>
		`<div style="margin-top:12px"><div style="color:${no ? "#ffb4ac" : teal};font-size:12px;letter-spacing:0.06em;text-transform:uppercase;font-weight:700;margin-bottom:4px">${no ? "✕" : "✓"} ${title}</div><ul style="margin:0;padding-left:18px;color:${dim};font-size:13px;line-height:1.7">${dealIcsLines(text).map((x) => `<li>${x}</li>`).join("")}</ul></div>`
	return `<!doctype html><html><body style="margin:0;background:${ink};font-family:'Poppins',Segoe UI,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ink};padding:28px 16px"><tr><td align="center">
<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:${card};border:1px solid ${line};border-radius:20px;overflow:hidden">
	<tr><td style="padding:0"><img src="${hero}" width="480" alt="Keabelmet" style="display:block;width:100%;height:170px;object-fit:cover" /></td></tr>
	<tr><td style="padding:26px 30px 6px;text-align:center">
		<img src="${SITE_URL}/logo.png" width="56" height="56" alt="Keabelmet" style="display:block;width:56px;height:56px;margin:0 auto 12px;border-radius:50%;border:2px solid rgba(244,239,228,0.16)" />
		<h1 style="margin:6px 0 0;color:${sand};font-size:23px;font-weight:800">${L.hello}, ${d.customerName}!</h1>
		<p style="color:${dim};font-size:14px;line-height:1.55;margin:10px 0 4px">${L.intro}</p>
		<div style="color:${teal};font-size:15px;font-weight:700;margin-top:8px">${d.title}</div>
		${d.subtitle ? `<div style="color:${dim};font-size:13px;margin-top:2px">${d.subtitle}</div>` : ""}
	</td></tr>
	<tr><td style="padding:16px 30px 0">
		<div style="background:rgba(40,194,160,0.1);border:1px dashed rgba(40,194,160,0.5);border-radius:14px;padding:14px;text-align:center">
			<div style="color:${dim};font-size:11px;letter-spacing:0.12em;text-transform:uppercase">${L.folio}</div>
			<div style="color:${teal};font-size:22px;font-weight:800;letter-spacing:0.04em;margin-top:3px">${d.folio}</div>
		</div>
	</td></tr>
	${mosaic}
	<tr><td style="padding:22px 30px 6px">
		<div style="color:${teal};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;margin-bottom:4px">${L.breakdown}</div>
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${d.lines.map(lineRow).join("")}</table>
	</td></tr>
	<tr><td style="padding:14px 30px 6px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
		${sumRow(L.total, `${formatMxn(d.totalMxn)} MXN`)}
		${sumRow(`${L.paid} (${pct}%)`, `${formatMxn(d.depositMxn)} MXN`, true)}
		${sumRow(L.remaining, `${formatMxn(d.remainingMxn)} MXN`)}
	</table></td></tr>
	<tr><td style="padding:6px 30px 2px">
		<p style="background:rgba(244,239,228,0.04);border:1px solid ${line};border-radius:12px;padding:12px 14px;color:${sand};font-size:13px;line-height:1.5;margin:0">💵 ${L.payRest}</p>
	</td></tr>
	${d.note ? `<tr><td style="padding:10px 30px 0"><p style="color:${dim};font-size:12px;line-height:1.5;margin:0">${d.note}</p></td></tr>` : ""}
	${d.includes || d.excludes ? `<tr><td style="padding:8px 30px 0">${d.includes ? inexCol(L.includes, d.includes) : ""}${d.excludes ? inexCol(L.excludes, d.excludes, true) : ""}</td></tr>` : ""}
	<tr><td style="padding:12px 30px 6px"><p style="color:${dim};font-size:12px;line-height:1.5;margin:0">📅 ${L.calNote}</p></td></tr>
	<tr><td style="padding:16px 30px 24px;text-align:center;border-top:1px solid ${line}">
		<div style="color:${dim};font-size:12px;margin:10px 0 10px">${L.follow}</div>
		${iconBtn(SOCIAL.instagram, "instagram.png", "Instagram")}${iconBtn(SOCIAL.tiktok, "tiktok.png", "TikTok")}${iconBtn(SOCIAL.whatsapp, "whatsapp.png", "WhatsApp")}
		<p style="color:${dim};font-size:11px;margin:14px 0 0">${L.footer}</p>
	</td></tr>
</table></td></tr></table></body></html>`
}

function buildDealOwnerHtml(d: DealEmailData): string {
	const ink = "#0d222f", sand = "#f4efe4", dim = "#cdc6b4", teal = "#28c2a0", line = "rgba(244,239,228,0.14)"
	const waNum = (d.customerPhone || "").replace(/[^\d]/g, "")
	const lineRow = (l: DealEmailLine) =>
		`<tr><td style="padding:9px 0;border-bottom:1px solid ${line};color:${sand};font-size:14px">${l.label}</td><td style="padding:9px 0;border-bottom:1px solid ${line};text-align:right;color:${sand};font-size:14px;vertical-align:top">${formatMxn(l.amountMxn)}</td></tr>`
	const row = (label: string, value: string, strong = false) =>
		`<tr><td style="padding:9px 0;color:${dim};font-size:13px">${label}</td><td style="padding:9px 0;color:${strong ? teal : sand};font-size:${strong ? "16px" : "14px"};font-weight:${strong ? 700 : 400};text-align:right">${value}</td></tr>`
	const pct = Math.round(d.rate * 100)
	return `<!doctype html><html><body style="margin:0;background:${ink};font-family:'Poppins',Segoe UI,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ink};padding:24px 0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0f2734;border:1px solid ${line};border-radius:16px;overflow:hidden">
	<tr><td style="padding:26px 32px 8px">
		<div style="color:${teal};font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700">Nueva reserva · deal personalizado</div>
		<h1 style="color:${sand};font-size:22px;margin:8px 0 2px">🎉 ${d.customerName}</h1>
		<div style="color:${dim};font-size:13px">${d.title}${d.subtitle ? ` · ${d.subtitle}` : ""}</div>
	</td></tr>
	<tr><td style="padding:10px 32px 2px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${d.lines.map(lineRow).join("")}</table></td></tr>
	<tr><td style="padding:12px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
		${row("Total", `${formatMxn(d.totalMxn)} MXN`)}
		${row(`Anticipo pagado (${pct}%)`, `${formatMxn(d.depositMxn)} MXN`, true)}
		${row("Restante por liquidar", `${formatMxn(d.remainingMxn)} MXN`)}
	</table></td></tr>
	<tr><td style="padding:6px 32px 4px">
		<div style="color:${teal};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;margin-bottom:8px">Contacto del cliente</div>
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
			${row("Folio", d.folio)}
			${row("Nombre", d.customerName)}
			${d.customerPhone ? `<tr><td style="padding:9px 0;color:${dim};font-size:13px">Tel / WhatsApp</td><td style="padding:9px 0;text-align:right"><a href="https://wa.me/${waNum}" style="color:${teal};font-size:14px;text-decoration:none">${d.customerPhone}</a></td></tr>` : ""}
			<tr><td style="padding:9px 0;color:${dim};font-size:13px">Correo</td><td style="padding:9px 0;text-align:right"><a href="mailto:${d.customerEmail}" style="color:${teal};font-size:14px;text-decoration:none">${d.customerEmail}</a></td></tr>
		</table>
	</td></tr>
	<tr><td style="padding:10px 32px 26px" align="center"><p style="color:${dim};font-size:12px;margin:0">El restante (${formatMxn(d.remainingMxn)} MXN) se cobra el día del tour.</p></td></tr>
</table></td></tr></table></body></html>`
}

export async function sendDealEmail(d: DealEmailData): Promise<{ ok: boolean; id?: string; error?: string }> {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) return { ok: false, error: "RESEND_API_KEY no configurada" }
	const L = dealT[d.locale] ?? dealT.es
	try {
		const resend = new Resend(apiKey)
		const attachments = d.startISO
			? [{ filename: "reserva.ics", content: Buffer.from(buildDealIcs(d), "utf8"), contentType: "text/calendar; charset=UTF-8" }]
			: undefined
		const { data, error } = await resend.emails.send({ from: FROM, to: [d.customerEmail], subject: L.subject, html: buildDealHtml(d), attachments })
		if (error) return { ok: false, error: error.message }
		return { ok: true, id: data?.id }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : "send_failed" }
	}
}

export async function sendDealOwnerNotification(d: DealEmailData): Promise<{ ok: boolean; id?: string; error?: string }> {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) return { ok: false, error: "RESEND_API_KEY no configurada" }
	const to = OWNER_EMAIL.split(",").map((s) => s.trim()).filter(Boolean)
	if (to.length === 0) return { ok: false, error: "OWNER_NOTIFY_EMAIL vacío" }
	try {
		const resend = new Resend(apiKey)
		const { data, error } = await resend.emails.send({
			from: FROM,
			to,
			subject: `🎉 Nueva reserva (deal): ${d.customerName} · ${formatMxn(d.depositMxn)} de ${formatMxn(d.totalMxn)}`,
			html: buildDealOwnerHtml(d),
		})
		if (error) return { ok: false, error: error.message }
		return { ok: true, id: data?.id }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : "send_failed" }
	}
}

export async function sendDepositOwnerNotification(d: DepositEmailData): Promise<{ ok: boolean; id?: string; error?: string }> {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) return { ok: false, error: "RESEND_API_KEY no configurada" }
	const to = OWNER_EMAIL.split(",").map((s) => s.trim()).filter(Boolean)
	if (to.length === 0) return { ok: false, error: "OWNER_NOTIFY_EMAIL vacío" }
	try {
		const resend = new Resend(apiKey)
		const ics = buildDepositIcs(d)
		const { data, error } = await resend.emails.send({
			from: FROM,
			to,
			subject: `🎉 Nueva reserva con anticipo: ${d.customerName} · ${d.items.length} act. · ${formatMxn(d.depositMxn)} de ${formatMxn(d.totalMxn)}`,
			html: buildDepositOwnerHtml(d),
			attachments: [{ filename: "actividades.ics", content: Buffer.from(ics, "utf8"), contentType: "text/calendar; charset=UTF-8" }],
		})
		if (error) return { ok: false, error: error.message }
		return { ok: true, id: data?.id }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : "send_failed" }
	}
}
