import { WHATSAPP_NUMBER } from "@/config/whatsapp"

/** Datos de una reserva, compartidos entre cliente, servidor y voucher. */
export interface ReservationDetails {
	slug: string
	expeditionName: string
	cardName: string
	unitAmountMxn: number
	quantity: number
	people: number
	totalMxn: number
	dateISO: string
	customerName: string
	customerEmail: string
	customerPhone: string
	locale: string
}

/** Máximo global de personas por reserva (respaldo del máximo por tour). */
export const MAX_PEOPLE = 12

/** Folio legible y estable derivado del id del PaymentIntent. */
export function folioFromPaymentIntent(id: string): string {
	return `KEA-${id.slice(-8).toUpperCase()}`
}

export function formatMxn(amount: number): string {
	return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(amount)
}

const DATE_LOCALES: Record<string, string> = { es: "es-MX", en: "en-US", fr: "fr-FR", zh: "zh-CN" }

/** Fecha ISO (yyyy-mm-dd) a texto largo localizado, sin desfase de zona horaria. */
export function formatDate(dateISO: string, locale: string): string {
	const [y, m, d] = dateISO.split("-").map(Number)
	const date = new Date(y, (m || 1) - 1, d || 1)
	return date.toLocaleDateString(DATE_LOCALES[locale] ?? "es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
}

interface WaLabels {
	confirm: string
	change: string
}
const WA_LABELS: Record<string, WaLabels> = {
	es: { confirm: "Hola! Acabo de reservar y pagar. Aquí están mis datos:", change: "Hola! Necesito cambiar o cancelar mi reserva:" },
	en: { confirm: "Hi! I just booked and paid. Here are my details:", change: "Hi! I need to change or cancel my reservation:" },
	fr: { confirm: "Bonjour! Je viens de réserver et payer. Voici mes informations:", change: "Bonjour! Je dois modifier ou annuler ma réservation:" },
	zh: { confirm: "你好!我刚刚预订并付款。以下是我的信息:", change: "你好!我需要更改或取消我的预订:" },
}

function reservationLines(r: { folio: string; expeditionName: string; cardName: string; dateISO: string; people: number; totalMxn: number; locale: string }): string {
	const L = r.locale
	const fecha = formatDate(r.dateISO, L)
	const labels: Record<string, { folio: string; tour: string; fecha: string; personas: string; total: string }> = {
		es: { folio: "Folio", tour: "Tour", fecha: "Fecha", personas: "Personas", total: "Total pagado" },
		en: { folio: "Ref", tour: "Tour", fecha: "Date", personas: "People", total: "Total paid" },
		fr: { folio: "Réf", tour: "Tour", fecha: "Date", personas: "Personnes", total: "Total payé" },
		zh: { folio: "编号", tour: "行程", fecha: "日期", personas: "人数", total: "已付总额" },
	}
	const t = labels[L] ?? labels.es
	return [
		`${t.folio}: ${r.folio}`,
		`${t.tour}: ${r.expeditionName} — ${r.cardName}`,
		`${t.fecha}: ${fecha}`,
		`${t.personas}: ${r.people}`,
		`${t.total}: ${formatMxn(r.totalMxn)} MXN`,
	].join("\n")
}

/** Link de WhatsApp para confirmar la reserva (post-pago) con folio y datos. */
export function reservationWhatsAppLink(r: { folio: string; expeditionName: string; cardName: string; dateISO: string; people: number; totalMxn: number; locale: string }, kind: "confirm" | "change" = "confirm"): string {
	const labels = WA_LABELS[r.locale] ?? WA_LABELS.es
	const header = kind === "confirm" ? labels.confirm : labels.change
	const message = `${header}\n\n${reservationLines(r)}`
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
