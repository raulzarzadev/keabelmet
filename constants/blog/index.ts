import type { BlogPost } from "@/lib/blog/types"
import { tiburonBallenaTemporada } from "./posts/tiburon-ballena-temporada"
import { tiburonBallenaReglas } from "./posts/tiburon-ballena-reglas"
import { tiburonBallenaPeligroso } from "./posts/tiburon-ballena-peligroso"
import { ballenaGrisTemporada } from "./posts/ballena-gris-temporada"
import { ballenaGrisMigracion } from "./posts/ballena-gris-migracion"
import { lobosMarinosNadar } from "./posts/lobos-marinos-nadar"
import { mobulasTemporada } from "./posts/mobulas-temporada"
import { mobulasSaltan } from "./posts/mobulas-saltan"
import { orcasMarDeCortes } from "./posts/orcas-mar-de-cortes"
import { caboPulmoRecuperacion } from "./posts/cabo-pulmo-recuperacion"
import { marDeCortesAcuario } from "./posts/mar-de-cortes-acuario"
import { islaEspirituSanto } from "./posts/isla-espiritu-santo"

/**
 * Todos los artículos del blog. Cada artículo vive en su propio archivo en
 * ./posts y se registra aquí. Los datos científicos llevan cita a su fuente.
 * Mapa completo de temas (publicados y pendientes): docs/blog/mapa-de-temas.md
 */
export const blogPosts: BlogPost[] = [
	tiburonBallenaTemporada,
	tiburonBallenaReglas,
	tiburonBallenaPeligroso,
	ballenaGrisTemporada,
	ballenaGrisMigracion,
	lobosMarinosNadar,
	mobulasTemporada,
	mobulasSaltan,
	orcasMarDeCortes,
	caboPulmoRecuperacion,
	marDeCortesAcuario,
	islaEspirituSanto,
]
