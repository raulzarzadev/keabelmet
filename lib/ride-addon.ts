/**
 * Add-on opcional de transporte (raite) redondo La Paz ⇄ La Ventana.
 * Precio fijo por reserva. Solo disponible para el Safari La Ventana.
 * El monto es autoritativo en el servidor; el cliente solo manda un boolean.
 */
export const RIDE_ADDON_MXN = 1000
export const RIDE_ADDON_SLUG = "safari-la-ventana"

export function rideAddonAvailable(slug: string): boolean {
	return slug === RIDE_ADDON_SLUG
}
