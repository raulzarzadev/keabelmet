import crypto from "node:crypto"
import type { NextRequest } from "next/server"
import { safeKeyEqual } from "@/lib/deal"

/**
 * Acceso al panel de reservas: una contraseña (RESERVAS_PANEL_KEY, o la de los
 * deals si no hay una propia) que al entrar deja una cookie httpOnly firmada.
 */
export const RESERVAS_COOKIE = "rs_panel"

function key(): string | undefined {
	return process.env.RESERVAS_PANEL_KEY || process.env.DEAL_ADMIN_KEY
}

export function reservasToken(): string | null {
	const k = key()
	return k ? crypto.createHmac("sha256", k).update("reservas-panel-v1").digest("hex") : null
}

export function checkReservasPassword(password: string): boolean {
	const k = key()
	return !!k && safeKeyEqual(password, k)
}

export function isReservasRequest(req: NextRequest): boolean {
	const token = reservasToken()
	const cookie = req.cookies.get(RESERVAS_COOKIE)?.value
	return !!token && !!cookie && safeKeyEqual(cookie, token)
}
