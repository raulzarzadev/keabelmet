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
	/** Descuento en porcentaje sobre todas las actividades del paquete (0.15 = 15%). */
	off: number
	/**
	 * Descuento fijo en pesos por persona en actividades concretas (en lugar del
	 * porcentaje). P. ej. { "tiburon-ballena": 300 }: el Sardine Run queda igual.
	 */
	perPersonOffMxn?: Record<string, number>
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
	{
		// Temporada nov–dic: Sardine Run a precio normal y $300 menos por persona en el tiburón ballena.
		id: "temporada",
		off: 0,
		perPersonOffMxn: { "tiburon-ballena": 300 },
		slugs: ["safari-bahia-magdalena", "tiburon-ballena"],
		name: { es: "Paquete Temporada", en: "Season Combo", fr: "Combo Saison", zh: "季节套餐", ca: "Paquet Temporada" },
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
	/** Descuento total por actividad (slug → MXN), para repartirlo por renglón. */
	perSlug: Record<string, number>
	/** Etiqueta corta del descuento: "−15%" o "−$300". */
	offLabel: string
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
		const perSlug: Record<string, number> = {}
		for (const s of pkg.slugs) {
			const unit = bySlug.get(s)?.unit ?? 0
			const d = pkg.perPersonOffMxn
				? Math.min(pkg.perPersonOffMxn[s] ?? 0, unit) * units
				: Math.round(pkg.off * unit * units)
			if (d > 0) perSlug[s] = d
		}
		const discountMxn = Object.values(perSlug).reduce((a, b) => a + b, 0)
		if (discountMxn <= 0) continue
		const fixedVals = Object.values(pkg.perPersonOffMxn ?? {})
		const offLabel = fixedVals.length ? `−$${fixedVals[0].toLocaleString("en-US")} c/u` : `−${Math.round(pkg.off * 100)}%`
		applied.push({ id: pkg.id, name: pkg.name[locale] ?? pkg.name.es, off: pkg.off, units, discountMxn, perSlug, offLabel })
		for (const s of pkg.slugs) consumed.set(s, (consumed.get(s) ?? 0) + units)
	}

	return { discountMxn: applied.reduce((s, a) => s + a.discountMxn, 0), applied }
}
