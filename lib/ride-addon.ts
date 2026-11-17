/**
 * Transporte opcional (raite) redondo desde La Paz, por expedición.
 * El monto es autoritativo en el servidor; el cliente solo manda un boolean.
 *
 *   - Safari La Ventana: precio fijo por reserva (hasta 4 personas).
 *   - Sardine Run (Bahía Magdalena): por persona. El safari sale a las 8:00 a. m. de
 *     Puerto Chale; con transporte, la salida desde La Paz es a las 5:00 a. m.
 */
export interface RideAddon {
	mode: "booking" | "person"
	mxn: number
	route: Record<string, string>
}

export const RIDE_ADDONS: Record<string, RideAddon> = {
	"safari-la-ventana": {
		mode: "booking",
		mxn: 1000,
		route: { es: "La Paz ⇄ La Ventana", en: "La Paz ⇄ La Ventana", fr: "La Paz ⇄ La Ventana", zh: "拉巴斯 ⇄ 拉文塔纳", ca: "La Paz ⇄ La Ventana" },
	},
	"safari-bahia-magdalena": {
		mode: "person",
		mxn: 500,
		route: { es: "La Paz ⇄ Puerto Chale", en: "La Paz ⇄ Puerto Chale", fr: "La Paz ⇄ Puerto Chale", zh: "拉巴斯 ⇄ 查莱港", ca: "La Paz ⇄ Puerto Chale" },
	},
}

export function rideAddonAvailable(slug: string): boolean {
	return slug in RIDE_ADDONS
}

/** Costo del transporte para esa reserva (0 si la expedición no lo ofrece). */
export function rideAddonMxn(slug: string, people: number): number {
	const r = RIDE_ADDONS[slug]
	if (!r) return 0
	return r.mode === "person" ? r.mxn * Math.max(1, Math.round(people) || 1) : r.mxn
}

export function rideRoute(slug: string, locale: string): string {
	const r = RIDE_ADDONS[slug]
	return r ? r.route[locale] ?? r.route.es : "La Paz"
}

/** "por reserva" / "por persona" en cada idioma. */
export function rideUnitLabel(slug: string, locale: string): string {
	const per = RIDE_ADDONS[slug]?.mode === "person"
	const t: Record<string, [string, string]> = {
		es: ["por reserva", "por persona"],
		en: ["per booking", "per person"],
		fr: ["par réservation", "par personne"],
		zh: ["每次预订", "每人"],
		ca: ["per reserva", "per persona"],
	}
	return (t[locale] ?? t.es)[per ? 1 : 0]
}
