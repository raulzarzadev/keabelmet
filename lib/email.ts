import { Resend } from "resend"
import { formatDate, formatMxn, reservationWhatsAppLink, type ReservationDetails } from "@/lib/reservation"
import { getActivityDetails } from "@/lib/activity-details"
import type { Locale } from "@/lib/i18n"

const SITE_URL = "https://www.keabelmet.com"
const FROM = process.env.RESEND_FROM || "Keabelmet <reservas@keabelmet.com>"

const SOCIAL = {
	instagram: "https://www.instagram.com/keabelmet__expeditions/",
	tiktok: "https://www.tiktok.com/@kea_expeditions",
	whatsapp: "https://wa.me/526122347897",
}

type EmailData = Pick<ReservationDetails, "expeditionName" | "cardName" | "dateISO" | "people" | "totalMxn" | "customerName" | "customerEmail" | "locale"> & {
	folio: string
	paymentIntentId: string
	slug?: string
}

/** Foto principal por expedición (misma que el hero de cada página). */
const HERO_BY_SLUG: Record<string, string> = {
	"safari-la-ventana": "/images/orca-safari.jpg",
	"buceo-cabo-pulmo": "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg",
	"tiburon-ballena": "/tiburon-ballena-drone.jpg",
	"buceo-la-paz": "/scuba-diving-underwater-sea-lions-swimming-playful.jpg",
	"tour-ballena-gris": "/ballena-gris-spyhop-drone.jpg",
	"tour-espiritu-santo": "/espiritu-santo-island-paradise-beach.jpg",
	"scuba-discovery": "/scuba-diving-underwater-la-paz-sea-lions-swimming.jpg",
	"safari-bahia-magdalena": "/images/marlin-bahia-magdalena-hero.jpeg",
}

function heroUrl(slug?: string): string {
	const path = (slug && HERO_BY_SLUG[slug]) || "/fondomar1.jpg"
	return `${SITE_URL}${path}`
}

const t: Record<string, {
	subject: string; hello: string; confirmed: string; intro: string; folio: string; tour: string; date: string; people: string; total: string
	requested: string; note: string; wa: string; voucher: string; cancel: string; footer: string; includesTitle: string; follow: string
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
		includesTitle: "Qué incluye tu experiencia", follow: "Síguenos",
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
		includesTitle: "What your experience includes", follow: "Follow us",
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
		includesTitle: "Ce que votre expérience inclut", follow: "Suivez-nous",
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
		includesTitle: "您的体验包含", follow: "关注我们",
	},
}

function buildHtml(d: EmailData): string {
	const L = t[d.locale] ?? t.es
	const ink = "#0d222f", card = "#0f2836", teal = "#28c2a0", sand = "#f4efe4", dim = "#a9c0cc", line = "rgba(244,239,228,0.14)"
	const waLink = reservationWhatsAppLink({ folio: d.folio, expeditionName: d.expeditionName, cardName: d.cardName, dateISO: d.dateISO, people: d.people, totalMxn: d.totalMxn, locale: d.locale }, "confirm")
	const voucherLink = `${SITE_URL}/${d.locale}/reserva/${d.paymentIntentId}`
	const row = (label: string, value: string, strong = false) =>
		`<tr><td style="padding:11px 0;border-bottom:1px solid ${line};color:${dim};font-size:13px">${label}</td><td style="padding:11px 0;border-bottom:1px solid ${line};color:${strong ? teal : sand};font-size:${strong ? "16px" : "14px"};font-weight:${strong ? 700 : 400};text-align:right">${value}</td></tr>`
	const includes = (d.slug ? getActivityDetails(d.slug, d.locale as Locale, d.cardName).includes : []).slice(0, 8)
	const incItem = (it: string) =>
		`<tr><td width="22" style="padding:5px 0;color:${teal};font-size:14px;font-weight:700;vertical-align:top">&#10003;</td><td style="padding:5px 0;color:${sand};font-size:13.5px;line-height:1.45">${it}</td></tr>`
	const pill = (href: string, label: string) =>
		`<a href="${href}" style="display:inline-block;margin:4px;padding:9px 18px;border:1px solid ${line};border-radius:999px;color:${sand};text-decoration:none;font-size:12.5px;font-weight:600">${label}</a>`

	return `<!doctype html><html><body style="margin:0;background:${ink};font-family:'Poppins',Segoe UI,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ink};padding:28px 16px">
<tr><td align="center">
<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:${card};border:1px solid ${line};border-radius:20px;overflow:hidden">
	<tr><td style="padding:0">
		<img src="${heroUrl(d.slug)}" width="480" alt="${d.expeditionName}" style="display:block;width:100%;height:180px;object-fit:cover;border:0" />
	</td></tr>
	<tr><td style="padding:0 32px;text-align:center">
		<img src="${SITE_URL}/logo.png" width="72" height="72" alt="Keabelmet" style="display:block;width:72px;height:72px;margin:-36px auto 0;border-radius:50%;border:4px solid ${card};background:${card}" />
		<div style="color:${teal};letter-spacing:0.22em;font-size:12px;font-weight:700;margin-top:10px">KEABELMET</div>
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
	<tr><td style="padding:4px 32px 22px" align="center">
		<a href="${voucherLink}" style="color:${teal};font-size:13px;text-decoration:underline">${L.voucher}</a>
	</td></tr>
	<tr><td style="padding:16px 32px;border-top:1px solid ${line}">
		<p style="color:${dim};font-size:12px;line-height:1.5;margin:0">${L.cancel}</p>
	</td></tr>
	<tr><td style="padding:16px 32px 4px;text-align:center">
		<div style="color:${dim};font-size:12px;margin-bottom:6px">${L.follow}</div>
		${pill(SOCIAL.instagram, "Instagram")}${pill(SOCIAL.tiktok, "TikTok")}${pill(SOCIAL.whatsapp, "WhatsApp")}
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
