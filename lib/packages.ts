import type { Locale } from "@/lib/i18n"

/**
 * Paquetes/combos: conjuntos de actividades con descuento. Los mismos que
 * aparecen en la sección "Combina y ahorra" del home. Cuando el carrito de
 * "Arma tu reserva" contiene todas las actividades de un paquete, el descuento
 * se aplica automáticamente en pantalla (y se recalcula en el servidor, nunca
 * se confía en el monto que mande el cliente).
 *
 * Ordenados de mayor a menor cobertura para que, al solaparse (p. ej. el Dúo
 * es un subconjunto de la Semana Baja), se aplique primero el más grande y el
 * resto de personas puedan aún calificar al más pequeño.
 */
export interface ActivityPackage {
	id: string
	off: number
	slugs: string[]
	name: Record<Locale, string>
}

export const PACKAGES: ActivityPackage[] = [
	{
		id: "semana-baja",
		off: 0.15,
		slugs: ["tiburon-ballena", "tour-espiritu-santo", "safari-la-ventana"],
		name: { es: "Semana Baja", en: "Baja Week", fr: "Semaine Baja", zh: "下加州一周", ca: "Setmana Baixa" },
	},
	{
		id: "duo-la-paz",
		off: 0.1,
		slugs: ["tiburon-ballena", "tour-espiritu-santo"],
		name: { es: "Dúo La Paz", en: "La Paz Duo", fr: "Duo La Paz", zh: "拉巴斯双人组合", ca: "Duo La Paz" },
	},
]

export interface PricedItem {
	slug: string
	unitAmountMxn: number
	people: number
}

export interface AppliedPackage {
	id: string
	name: string
	off: number
	units: number
	discountMxn: number
}

/**
 * Descuento total por paquetes para un carrito. Un paquete aplica por cada
 * "set" completo (una persona que hace todas sus actividades); el descuento es
 * por persona. Se evita descontar dos veces la misma persona/actividad
 * llevando cuenta de las personas ya consumidas por un paquete mayor.
 */
export function computePackageDiscount(
	items: PricedItem[],
	locale: Locale = "es",
): { discountMxn: number; applied: AppliedPackage[] } {
	// Personas y precio unitario por slug (si se repitiera un slug, se suman personas).
	const bySlug = new Map<string, { people: number; unit: number }>()
	for (const it of items) {
		if (!it.slug || !Number.isFinite(it.unitAmountMxn) || it.people < 1) continue
		const cur = bySlug.get(it.slug)
		if (cur) cur.people += it.people
		else bySlug.set(it.slug, { people: it.people, unit: it.unitAmountMxn })
	}

	const consumed = new Map<string, number>()
	const applied: AppliedPackage[] = []

	for (const pkg of PACKAGES) {
		const avail = pkg.slugs.map((s) => {
			const e = bySlug.get(s)
			return e ? e.people - (consumed.get(s) ?? 0) : 0
		})
		if (avail.some((a) => a <= 0)) continue
		const units = Math.min(...avail)
		const unitSum = pkg.slugs.reduce((sum, s) => sum + (bySlug.get(s)?.unit ?? 0), 0)
		const discountMxn = Math.round(pkg.off * unitSum * units)
		if (discountMxn <= 0) continue
		applied.push({ id: pkg.id, name: pkg.name[locale] ?? pkg.name.es, off: pkg.off, units, discountMxn })
		for (const s of pkg.slugs) consumed.set(s, (consumed.get(s) ?? 0) + units)
	}

	return { discountMxn: applied.reduce((s, a) => s + a.discountMxn, 0), applied }
}
