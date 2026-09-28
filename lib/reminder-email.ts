import { Resend } from "resend"
import { reservationWhatsAppLink, formatDate, formatMxn } from "@/lib/reservation"
import { getActivityDetails } from "@/lib/activity-details"
import type { Locale } from "@/lib/i18n"
import { SITE_URL, FROM, OWNER_EMAIL, heroUrl, type OwnerNotifyData } from "@/lib/email"

/**
 * Recordatorios programados que dispara el cron diario según la fecha del tour.
 * Cliente: 7 y 1 día antes.  Dueño: 7, 2 y 1 día antes.
 */

function dayLabel(n: number, locale: string): string {
	const words: Record<string, [string, string]> = { es: ["día", "días"], en: ["day", "days"], fr: ["jour", "jours"], zh: ["天", "天"], ca: ["dia", "dies"] }
	const [s, p] = words[locale] ?? words.es
	return `${n} ${n === 1 ? s : p}`
}

const remT: Record<string, { subject: (dl: string) => string; heading: (dl: string) => string; hello: string; intro: string; bringTitle: string; tour: string; date: string; people: string; wa: string; voucher: string; footer: string }> = {
	es: { subject: (dl) => `🌊 Tu aventura Keabelmet es en ${dl}`, heading: (dl) => `¡Faltan ${dl}!`, hello: "Hola", intro: "Ya casi es tu expedición. Aquí un recordatorio con lo esencial.", bringTitle: "Qué llevar", tour: "Expedición", date: "Fecha", people: "Personas", wa: "Coordinar por WhatsApp", voucher: "Ver mi voucher", footer: "Keabelmet Expeditions · La Paz, Baja California Sur" },
	en: { subject: (dl) => `🌊 Your Keabelmet adventure is in ${dl}`, heading: (dl) => `Only ${dl} to go!`, hello: "Hi", intro: "Your expedition is almost here. A quick reminder with the essentials.", bringTitle: "What to bring", tour: "Expedition", date: "Date", people: "People", wa: "Coordinate on WhatsApp", voucher: "View my voucher", footer: "Keabelmet Expeditions · La Paz, Baja California Sur" },
	fr: { subject: (dl) => `🌊 Votre aventure Keabelmet est dans ${dl}`, heading: (dl) => `Plus que ${dl} !`, hello: "Bonjour", intro: "Votre expédition approche. Un petit rappel avec l'essentiel.", bringTitle: "Quoi apporter", tour: "Expédition", date: "Date", people: "Personnes", wa: "Coordonner sur WhatsApp", voucher: "Voir mon voucher", footer: "Keabelmet Expeditions · La Paz, Basse-Californie du Sud" },
	zh: { subject: (dl) => `🌊 您的 Keabelmet 探险将在 ${dl}后开始`, heading: (dl) => `还有 ${dl}!`, hello: "你好", intro: "您的探险即将开始。这里是重点提醒。", bringTitle: "需要携带", tour: "探险项目", date: "日期", people: "人数", wa: "通过 WhatsApp 协调", voucher: "查看我的凭证", footer: "Keabelmet Expeditions · 拉巴斯,南下加利福尼亚" },
	ca: { subject: (dl) => `🌊 La teva aventura Keabelmet és d'aquí a ${dl}`, heading: (dl) => `Falten ${dl}!`, hello: "Hola", intro: "Ja gairebé és la teva expedició. Aquí un recordatori amb l'essencial.", bringTitle: "Què portar", tour: "Expedició", date: "Data", people: "Persones", wa: "Coordinar per WhatsApp", voucher: "Veure el meu voucher", footer: "Keabelmet Expeditions · La Paz, Baixa Califòrnia Sud" },
}

export async function sendClientReminder(d: OwnerNotifyData, daysBefore: number): Promise<{ ok: boolean; id?: string; error?: string }> {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) return { ok: false, error: "RESEND_API_KEY no configurada" }
	const L = remT[d.locale] ?? remT.es
	const dl = dayLabel(daysBefore, d.locale)
	const ink = "#0d222f", cardBg = "#0f2836", teal = "#28c2a0", sand = "#f4efe4", dim = "#a9c0cc", line = "rgba(244,239,228,0.14)"
	const waLink = reservationWhatsAppLink({ folio: d.folio, expeditionName: d.expeditionName, cardName: d.cardName, dateISO: d.dateISO, people: d.people, totalMxn: d.totalMxn, locale: d.locale }, "confirm")
	const voucherLink = `${SITE_URL}/${d.locale}/reserva/${d.paymentIntentId}`
	const bring = (d.slug ? getActivityDetails(d.slug, d.locale as Locale, d.cardName).bring.flatMap((g) => g.items) : []).slice(0, 8)
	const row = (label: string, value: string) => `<tr><td style="padding:10px 0;border-bottom:1px solid ${line};color:${dim};font-size:13px">${label}</td><td style="padding:10px 0;border-bottom:1px solid ${line};color:${sand};font-size:14px;text-align:right">${value}</td></tr>`
	const html = `<!doctype html><html><body style="margin:0;background:${ink};font-family:'Poppins',Segoe UI,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ink};padding:28px 16px"><tr><td align="center">
<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:${cardBg};border:1px solid ${line};border-radius:20px;overflow:hidden">
	<tr><td style="padding:0"><img src="${heroUrl(d.slug)}" width="480" alt="${d.expeditionName}" style="display:block;width:100%;height:170px;object-fit:cover;border:0" /></td></tr>
	<tr><td style="padding:22px 32px 0;text-align:center"><div style="color:${teal};letter-spacing:0.22em;font-size:12px;font-weight:700">KEABELMET</div><h1 style="margin:10px 0 0;color:${sand};font-size:24px;font-weight:800">${L.heading(dl)}</h1></td></tr>
	<tr><td style="padding:8px 32px 0;text-align:center"><p style="color:${dim};font-size:14px;line-height:1.55;margin:8px 0 18px">${L.hello} ${d.customerName}, ${L.intro}</p></td></tr>
	<tr><td style="padding:0 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${row(L.tour, `${d.expeditionName} — ${d.cardName}`)}${row(L.date, formatDate(d.dateISO, d.locale))}${row(L.people, String(d.people))}</table></td></tr>
	${bring.length ? `<tr><td style="padding:18px 32px 2px"><div style="color:${teal};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;margin-bottom:8px">${L.bringTitle}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${bring.map((it) => `<tr><td width="22" style="padding:5px 0;color:${teal};font-size:14px;vertical-align:top">&#8226;</td><td style="padding:5px 0;color:${sand};font-size:13.5px;line-height:1.45">${it}</td></tr>`).join("")}</table></td></tr>` : ""}
	<tr><td style="padding:22px 32px 8px" align="center"><a href="${waLink}" style="display:inline-block;background:${teal};color:#04121a;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px">${L.wa}</a></td></tr>
	<tr><td style="padding:4px 32px 24px" align="center"><a href="${voucherLink}" style="color:${teal};font-size:13px;text-decoration:underline">${L.voucher}</a></td></tr>
	<tr><td style="padding:14px 32px 22px;text-align:center;border-top:1px solid ${line}"><p style="color:${dim};font-size:11px;margin:0">${L.footer}</p></td></tr>
</table></td></tr></table></body></html>`
	try {
		const resend = new Resend(apiKey)
		const { data, error } = await resend.emails.send({ from: FROM, to: [d.customerEmail], subject: L.subject(dl), html })
		if (error) return { ok: false, error: error.message }
		return { ok: true, id: data?.id }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : "send_failed" }
	}
}

export async function sendOwnerReminder(d: OwnerNotifyData, daysBefore: number): Promise<{ ok: boolean; id?: string; error?: string }> {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) return { ok: false, error: "RESEND_API_KEY no configurada" }
	const to = OWNER_EMAIL.split(",").map((s) => s.trim()).filter(Boolean)
	if (to.length === 0) return { ok: false, error: "OWNER_NOTIFY_EMAIL vacío" }
	const dl = dayLabel(daysBefore, "es")
	const ink = "#0d222f", teal = "#28c2a0", sand = "#f4efe4", dim = "#cdc6b4", line = "rgba(244,239,228,0.14)"
	const waNum = (d.customerPhone || "").replace(/[^\d]/g, "")
	const row = (label: string, value: string, strong = false) => `<tr><td style="padding:11px 0;border-bottom:1px solid ${line};color:${dim};font-size:13px">${label}</td><td style="padding:11px 0;border-bottom:1px solid ${line};color:${strong ? teal : sand};font-size:${strong ? "16px" : "14px"};font-weight:${strong ? 700 : 400};text-align:right">${value}</td></tr>`
	const html = `<!doctype html><html><body style="margin:0;background:${ink};font-family:'Poppins',Segoe UI,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ink};padding:24px 0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0f2734;border:1px solid ${line};border-radius:16px;overflow:hidden">
	<tr><td style="padding:26px 32px 8px"><div style="color:${teal};font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700">Recordatorio · Falta ${dl}</div><h1 style="color:${sand};font-size:22px;margin:8px 0 2px">⏰ ${d.expeditionName}</h1><div style="color:${dim};font-size:14px">${d.cardName}</div></td></tr>
	<tr><td style="padding:12px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${row("Fecha", formatDate(d.dateISO, "es"))}${row("Personas", String(d.people))}${d.rideAddon ? row("Raite La Paz ⇄ La Ventana", "Sí") : ""}${row("Total", `${formatMxn(d.totalMxn)} MXN`, true)}</table></td></tr>
	<tr><td style="padding:6px 32px 4px"><div style="color:${teal};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;margin-bottom:8px">Contacto del cliente</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${row("Nombre", d.customerName)}${d.customerPhone ? `<tr><td style="padding:11px 0;border-bottom:1px solid ${line};color:${dim};font-size:13px">Tel / WhatsApp</td><td style="padding:11px 0;border-bottom:1px solid ${line};text-align:right"><a href="https://wa.me/${waNum}" style="color:${teal};font-size:14px;text-decoration:none">${d.customerPhone}</a></td></tr>` : ""}<tr><td style="padding:11px 0;border-bottom:1px solid ${line};color:${dim};font-size:13px">Correo</td><td style="padding:11px 0;border-bottom:1px solid ${line};text-align:right"><a href="mailto:${d.customerEmail}" style="color:${teal};font-size:14px;text-decoration:none">${d.customerEmail}</a></td></tr></table></td></tr>
	<tr><td style="padding:20px 32px 26px" align="center"><p style="color:${dim};font-size:12px;margin:0">Contacta al cliente para afinar el punto de encuentro y la hora.</p></td></tr>
</table></td></tr></table></body></html>`
	try {
		const resend = new Resend(apiKey)
		const { data, error } = await resend.emails.send({ from: FROM, to, subject: `⏰ Recordatorio (falta ${dl}): ${d.expeditionName} · ${d.customerName} · ${formatDate(d.dateISO, "es")}`, html })
		if (error) return { ok: false, error: error.message }
		return { ok: true, id: data?.id }
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : "send_failed" }
	}
}
