import { isValidPrice } from "@/lib/pricing-catalog"
import { getSeason, isDateInSeason } from "@/lib/expedition-seasons"
import { experiences } from "@/constants/experiences"
import { defaultLocale, type Locale } from "@/lib/i18n"
import { computePackageDiscount, type AppliedPackage } from "@/lib/packages"

/** Anticipo: 20% del total; el resto se liquida el día del tour. */
export const DEPOSIT_RATE = 0.2
/** Máximo de actividades por reserva (acotado para que quepa en la metadata de Stripe). */
export const MAX_DEPOSIT_ITEMS = 6

export interface DepositItem {
	slug: string
	cardName: string
	expeditionName: string
	unitAmountMxn: number
	people: number
	dateISO: string
	subtotalMxn: number
}

/** Nombre de la actividad localizado (desde el catálogo de experiencias). */
export function activityName(slug: string, locale: string): string {
	const exp = experiences.find((e) => e.slug === slug)
	if (!exp) return slug
	const i = (exp.i18n as Record<string, { title: string }>)[locale]
	return (i ?? exp.i18n.es).title
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/** Valida y normaliza un item del carrito; lanza Error con mensaje si algo falla. */
export function validateDepositItem(raw: unknown): DepositItem {
	const it = (raw ?? {}) as Record<string, unknown>
	const slug = typeof it.slug === "string" ? it.slug : ""
	if (!slug) throw new Error("Actividad inválida")
	const unit = Number(it.unitAmountMxn)
	if (!Number.isFinite(unit) || unit <= 0) throw new Error("Monto inválido")
	if (!isValidPrice(slug, unit)) throw new Error("El precio no coincide con el catálogo")
	const people = Number(it.people)
	const season = getSeason(slug)
	if (!Number.isInteger(people) || people < 1 || people > season.maxPeople) throw new Error("Número de personas inválido")
	const dateISO = typeof it.dateISO === "string" ? it.dateISO : ""
	if (!DATE_RE.test(dateISO)) throw new Error("Fecha inválida")
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	const [y, m, d] = dateISO.split("-").map(Number)
	if (new Date(y, m - 1, d).getTime() <= today.getTime()) throw new Error("Elige fechas futuras")
	if (!isDateInSeason(slug, dateISO)) throw new Error("Una de las fechas está fuera de temporada")
	const cardName = typeof it.cardName === "string" ? it.cardName.slice(0, 120) : ""
	const expeditionName =
		typeof it.expeditionName === "string" && it.expeditionName ? it.expeditionName.slice(0, 120) : activityName(slug, defaultLocale)
	return { slug, cardName, expeditionName, unitAmountMxn: unit, people, dateISO, subtotalMxn: unit * people }
}

export function computeDeposit(
	items: DepositItem[],
	locale: Locale = defaultLocale,
): {
	subtotalMxn: number
	discountMxn: number
	totalMxn: number
	depositMxn: number
	remainingMxn: number
	packages: AppliedPackage[]
} {
	const subtotalMxn = items.reduce((s, it) => s + it.subtotalMxn, 0)
	const { discountMxn, applied } = computePackageDiscount(items, locale)
	const totalMxn = subtotalMxn - discountMxn
	const depositMxn = Math.round(totalMxn * DEPOSIT_RATE)
	return { subtotalMxn, discountMxn, totalMxn, depositMxn, remainingMxn: totalMxn - depositMxn, packages: applied }
}

/** Serialización compacta de los items para la metadata de Stripe (≤500 chars). */
export function packItems(items: DepositItem[]): string {
	return JSON.stringify(items.map((it) => ({ s: it.slug, u: it.unitAmountMxn, p: it.people, d: it.dateISO })))
}

export interface PackedItem {
	slug: string
	unitAmountMxn: number
	people: number
	dateISO: string
}

export function unpackItems(json: string | undefined): PackedItem[] {
	if (!json) return []
	try {
		const arr = JSON.parse(json)
		if (!Array.isArray(arr)) return []
		return arr
			.map((x) => ({ slug: String(x.s), unitAmountMxn: Number(x.u), people: Number(x.p), dateISO: String(x.d) }))
			.filter((x) => x.slug && Number.isFinite(x.unitAmountMxn))
	} catch {
		return []
	}
}
