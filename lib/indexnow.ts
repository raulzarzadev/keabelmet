import sitemap from "@/app/sitemap"
import { kv } from "@/lib/kv"
import { SITE_URL } from "@/lib/seo"

/**
 * IndexNow: avisa a Bing (y a Yandex, Seznam, Naver) en cuanto cambia una
 * página. ChatGPT y Copilot buscan en el índice de Bing, así que esto acorta de
 * semanas a horas lo que tardan en ver lo nuevo.
 *
 * La clave es pública por diseño: el buscador la compara con el archivo
 * /<clave>.txt para comprobar que el aviso viene del dueño del sitio.
 */
export const INDEXNOW_KEY = "0d7f6d08fa601a1d11cccafb7427e894"
const STATE_KEY = "indexnow:state"

interface State {
	sha: string
	at: string
	sent: number
	status?: number
}

export async function submitUrls(urls: string[]): Promise<number> {
	const host = new URL(SITE_URL).host
	const res = await fetch("https://api.indexnow.org/indexnow", {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`, urlList: urls.slice(0, 10000) }),
	})
	return res.status
}

/**
 * Tras cada publicación nueva avisa de las páginas generales (cambian con el
 * código) y de los artículos nuevos o actualizados desde el último aviso. La
 * primera vez manda todo el sitemap.
 */
export async function indexNowSync(): Promise<{ sent: number; status?: number; skipped?: string }> {
	const sha = process.env.VERCEL_GIT_COMMIT_SHA || "local"
	if (sha === "local") return { sent: 0, skipped: "solo corre en Vercel" }
	const prev = (await kv("GET", STATE_KEY).then((s) => (s ? (JSON.parse(String(s)) as State) : null)).catch(() => null)) as State | null
	if (prev?.sha === sha) return { sent: 0, skipped: "sin cambios desde el último aviso" }

	const since = prev ? Date.parse(prev.at) - 24 * 3600 * 1000 : 0
	const urls = sitemap()
		.filter((e) => !prev || !e.lastModified || new Date(e.lastModified).getTime() >= since)
		.map((e) => e.url)
	if (!urls.length) return { sent: 0, skipped: "nada nuevo" }

	const status = await submitUrls(urls)
	const ok = status === 200 || status === 202
	if (ok) await kv("SET", STATE_KEY, JSON.stringify({ sha, at: new Date().toISOString(), sent: urls.length, status } satisfies State))
	return { sent: ok ? urls.length : 0, status }
}

export async function indexNowState(): Promise<State | null> {
	try {
		const s = await kv("GET", STATE_KEY)
		return s ? (JSON.parse(String(s)) as State) : null
	} catch {
		return null
	}
}
