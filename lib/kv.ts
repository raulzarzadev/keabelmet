/**
 * Upstash Redis vía su API REST (sin dependencias). Se conecta desde el
 * Marketplace de Vercel, que crea KV_REST_API_URL / KV_REST_API_TOKEN
 * (o UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN).
 */

function creds(): { url: string; token: string } | null {
	const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
	const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
	return url && token ? { url: url.replace(/\/$/, ""), token } : null
}

export function kvConfigured(): boolean {
	return creds() !== null
}

export type KvCmd = (string | number)[]

export async function kvPipeline(cmds: KvCmd[]): Promise<unknown[]> {
	const c = creds()
	if (!c) throw new Error("Falta conectar Upstash Redis (KV_REST_API_URL / KV_REST_API_TOKEN)")
	if (!cmds.length) return []
	const res = await fetch(`${c.url}/pipeline`, {
		method: "POST",
		headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
		body: JSON.stringify(cmds.map((cmd) => cmd.map(String))),
		cache: "no-store",
	})
	if (!res.ok) throw new Error(`Redis ${res.status}: ${await res.text()}`)
	const out = (await res.json()) as { result?: unknown; error?: string }[]
	return out.map((r) => {
		if (r.error) throw new Error(`Redis: ${r.error}`)
		return r.result
	})
}

export async function kv(...cmd: KvCmd): Promise<unknown> {
	return (await kvPipeline([cmd]))[0]
}
