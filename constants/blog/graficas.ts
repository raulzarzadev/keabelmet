import type { BlogBlock, BlogLocale } from "@/lib/blog/types"

/**
 * Gráficas del blog generadas en MATLAB con datos públicos de NOAA/NASA.
 * Archivos: /public/blog/graficas/<nombre>-<es|en>.svg
 */
const tam = {
	"surgencia-mensual": [795, 462],
	"magdalena-mes-a-mes": [843, 559],
	"oni-1980-2026": [795, 462],
	"anomalia-magdalena": [795, 462],
	"temperatura-2026": [795, 461],
	"clorofila-2015": [795, 462],
	"marlin-ataques": [795, 462],
} as const satisfies Record<string, readonly [number, number]>

type Grafica = keyof typeof tam

export function grafica(
	nombre: Grafica,
	lang: BlogLocale,
	alt: string,
	caption?: string,
	data?: { head: string[]; rows: string[][] },
): BlogBlock {
	const [width, height] = tam[nombre]
	return { type: "chart", src: `/blog/graficas/${nombre}-${lang}.svg`, alt, caption, width, height, data }
}
