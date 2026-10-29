/**
 * Fotos disponibles para los deals personalizados. El deal guarda solo la
 * clave (corta, para que el token del link no crezca) y esta lista funciona
 * como allowlist: no se pueden inyectar URLs arbitrarias en la página ni en el
 * correo. La primera foto elegida es la portada.
 */
export interface DealPhoto {
	key: string
	src: string
	label: string
}

export const MAX_DEAL_PHOTOS = 6

export const DEAL_PHOTOS: DealPhoto[] = [
	{ key: "tiburon", src: "/tiburon-ballena-drone.jpg", label: "Tiburón ballena" },
	{ key: "tiburon-snorkel", src: "/tiburon-ballena-snorkel-h.jpg", label: "Snorkel con tiburón ballena" },
	{ key: "sardine", src: "/images/marlin-bahia-magdalena-hero.jpeg", label: "Sardine run · marlin" },
	{ key: "sardine-lancha", src: "/sardine-run-lancha-snorkel.jpg", label: "Sardine run · lancha" },
	{ key: "marlin", src: "/striped-marlin-underwater.jpg", label: "Marlin rayado" },
	{ key: "orca", src: "/images/orca-la-ventana-hero.jpeg", label: "Ocean Safari La Ventana" },
	{ key: "delfines", src: "/delfines-drone-mar-cortes.jpg", label: "Delfines" },
	{ key: "ballena-gris", src: "/ballena-gris-spyhop-drone.jpg", label: "Ballena gris" },
	{ key: "lobos", src: "/lobo-marino-espiritu-hero.jpg", label: "Lobos marinos · Espíritu Santo" },
	{ key: "buceo-espiritu", src: "/buceo-espiritu-santo-lobo-buzo.jpg", label: "Buceo Espíritu Santo" },
	{ key: "open-water", src: "/buceo-la-paz-buzo.jpg", label: "Curso Open Water" },
	{ key: "buceo-playa", src: "/scuba-discovery-grupo-playa.jpg", label: "Buceo desde playa" },
	{ key: "buceo-glide", src: "/scuba-discovery-glide.jpg", label: "Buzo planeando" },
	{ key: "cabo-pulmo", src: "/cabo-pulmo-cardumen-buzo.jpg", label: "Cabo Pulmo" },
	{ key: "espiritu-playa", src: "/espiritu-santo-island-pristine-beach-turquoise-wat.jpg", label: "Isla Espíritu Santo" },
	{ key: "balandra", src: "/playa-balandra-aerea.jpg", label: "Balandra" },
	{ key: "grupo", src: "/images/grupo-feliz-expedicion.jpeg", label: "Grupo en expedición" },
]

const BY_KEY = new Map(DEAL_PHOTOS.map((p) => [p.key, p]))

export function dealPhoto(key: string): DealPhoto | undefined {
	return BY_KEY.get(key)
}

/** Filtra a claves válidas, sin duplicados, máximo MAX_DEAL_PHOTOS. */
export function sanitizePhotoKeys(raw: unknown): string[] {
	if (!Array.isArray(raw)) return []
	const out: string[] = []
	for (const k of raw) {
		if (typeof k === "string" && BY_KEY.has(k) && !out.includes(k)) out.push(k)
		if (out.length >= MAX_DEAL_PHOTOS) break
	}
	return out
}
