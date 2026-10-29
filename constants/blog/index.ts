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
import { mejorEpocaLaPaz } from "./posts/mejor-epoca-la-paz"
import { sardineRun } from "./posts/sardine-run"
import { temperaturaAguaLaPaz } from "./posts/temperatura-agua-la-paz"
import { ballenasBcs } from "./posts/ballenas-bcs"
import { elNinoFauna } from "./posts/el-nino-fauna"
import { marlinRayado } from "./posts/marlin-rayado"
import { bloqueadorBiodegradable } from "./posts/bloqueador-biodegradable"
import { queLlevarTourLancha } from "./posts/que-llevar-tour-lancha"
import { fotoidentificacion } from "./posts/fotoidentificacion"
import { playaBalandra } from "./posts/playa-balandra"
import { bucearSinCertificacion } from "./posts/bucear-sin-certificacion"
import { snorkelOBuceo } from "./posts/snorkel-o-buceo"
import { cuantosDiasLaPaz } from "./posts/cuantos-dias-la-paz"

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
	mejorEpocaLaPaz,
	sardineRun,
	temperaturaAguaLaPaz,
	ballenasBcs,
	elNinoFauna,
	marlinRayado,
	bloqueadorBiodegradable,
	queLlevarTourLancha,
	fotoidentificacion,
	playaBalandra,
	bucearSinCertificacion,
	snorkelOBuceo,
	cuantosDiasLaPaz,
]
