import crypto from "node:crypto"
import { sanitizePhotoKeys } from "@/lib/deal-photos"

/**
 * Deals personalizados ("hechos por fuera"): el editor arma un paquete con
 * actividades y precios negociados que NO están en el catálogo, y el sistema
 * genera un link firmado (HMAC). Los precios viajan sellados en el token, así
 * que nadie puede alterarlos; el servidor re-verifica la firma antes de cobrar.
 *
 * Solo quien conozca DEAL_ADMIN_KEY puede generar deals (ver la ruta
 * /api/create-deal-link). La clave de firma sale de DEAL_SECRET, o como
 * respaldo de STRIPE_SECRET_KEY (server-only), para no requerir configuración
 * extra en producción.
 */
export const DEAL_DEPOSIT_RATE = 0.2
export const MAX_DEAL_LINES = 12

export interface DealLine {
	label: string
	amountMxn: number
}

export interface Deal {
	v: 1
	title: string
	subtitle?: string
	lines: DealLine[]
	depositRate: number
	startISO?: string
	endISO?: string
	includes?: string
	excludes?: string
	note?: string
	/** Claves de fotos (ver lib/deal-photos); la primera es la portada. */
	photos?: string[]
	exp?: number
}

function signingKey(): string {
	return process.env.DEAL_SECRET || `${process.env.STRIPE_SECRET_KEY || "keabelmet"}:deal-v1`
}

function b64url(buf: Buffer): string {
	return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}
function b64urlDecode(s: string): Buffer {
	let t = s.replace(/-/g, "+").replace(/_/g, "/")
	while (t.length % 4) t += "="
	return Buffer.from(t, "base64")
}

export function signDeal(deal: Deal): string {
	const payload = b64url(Buffer.from(JSON.stringify(deal), "utf8"))
	const sig = b64url(crypto.createHmac("sha256", signingKey()).update(payload).digest())
	return `${payload}.${sig}`
}

export function verifyDeal(token: string | undefined | null): Deal | null {
	if (!token || typeof token !== "string") return null
	const i = token.lastIndexOf(".")
	if (i <= 0) return null
	const payload = token.slice(0, i)
	const sig = token.slice(i + 1)
	const expected = b64url(crypto.createHmac("sha256", signingKey()).update(payload).digest())
	const a = Buffer.from(sig)
	const b = Buffer.from(expected)
	if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
	try {
		const raw = JSON.parse(b64urlDecode(payload).toString("utf8")) as Deal
		if (!raw || raw.v !== 1 || !Array.isArray(raw.lines)) return null
		if (raw.exp && Date.now() > raw.exp) return null
		const lines = raw.lines
			.filter((l) => l && typeof l.label === "string" && Number.isFinite(l.amountMxn) && l.amountMxn > 0)
			.slice(0, MAX_DEAL_LINES)
			.map((l) => ({ label: String(l.label).slice(0, 140), amountMxn: Math.round(l.amountMxn) }))
		if (!lines.length) return null
		const rate =
			Number.isFinite(raw.depositRate) && raw.depositRate > 0 && raw.depositRate <= 1 ? raw.depositRate : DEAL_DEPOSIT_RATE
		return {
			v: 1,
			title: String(raw.title || "Reserva Keabelmet").slice(0, 160),
			subtitle: raw.subtitle ? String(raw.subtitle).slice(0, 200) : undefined,
			lines,
			depositRate: rate,
			startISO: typeof raw.startISO === "string" ? raw.startISO : undefined,
			endISO: typeof raw.endISO === "string" ? raw.endISO : undefined,
			includes: raw.includes ? String(raw.includes).slice(0, 1200) : undefined,
			excludes: raw.excludes ? String(raw.excludes).slice(0, 1200) : undefined,
			note: raw.note ? String(raw.note).slice(0, 600) : undefined,
			photos: sanitizePhotoKeys(raw.photos),
			exp: typeof raw.exp === "number" ? raw.exp : undefined,
		}
	} catch {
		return null
	}
}

export function computeDealTotals(deal: Deal): { totalMxn: number; depositMxn: number; remainingMxn: number; rate: number } {
	const totalMxn = deal.lines.reduce((s, l) => s + l.amountMxn, 0)
	const rate = deal.depositRate || DEAL_DEPOSIT_RATE
	const depositMxn = Math.round(totalMxn * rate)
	return { totalMxn, depositMxn, remainingMxn: totalMxn - depositMxn, rate }
}

/** Trocea el token para la metadata de Stripe (límite 500 chars por valor). */
export function chunkToken(token: string, size = 450): Record<string, string> {
	const out: Record<string, string> = {}
	let n = 0
	for (let i = 0; i < token.length; i += size) out[`dt${n++}`] = token.slice(i, i + size)
	out.dtN = String(n)
	return out
}
export function unchunkToken(m: Record<string, string | undefined>): string {
	const n = Number(m.dtN) || 0
	let s = ""
	for (let i = 0; i < n; i++) s += m[`dt${i}`] ?? ""
	return s
}

/** Compara dos secretos en tiempo constante (hasheados a longitud fija). */
export function safeKeyEqual(a: string, b: string): boolean {
	const ha = crypto.createHash("sha256").update(String(a)).digest()
	const hb = crypto.createHash("sha256").update(String(b)).digest()
	return crypto.timingSafeEqual(ha, hb)
}
