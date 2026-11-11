import crypto from "node:crypto"
import type { NextRequest } from "next/server"
import { safeKeyEqual } from "@/lib/deal"

/**
 * Acceso al panel de WhatsApp: una contraseña (WHATSAPP_PANEL_KEY, o la de los
 * deals si no hay una propia) que al entrar deja una cookie httpOnly firmada.
 */
export const PANEL_COOKIE = "wa_panel"

export function panelKey(): string | undefined {
	return process.env.WHATSAPP_PANEL_KEY || process.env.DEAL_ADMIN_KEY
}

export function panelToken(): string | null {
	const key = panelKey()
	return key ? crypto.createHmac("sha256", key).update("wa-panel-v1").digest("hex") : null
}

export function checkPassword(password: string): boolean {
	const key = panelKey()
	return !!key && safeKeyEqual(password, key)
}

export function isPanelRequest(req: NextRequest): boolean {
	const token = panelToken()
	const cookie = req.cookies.get(PANEL_COOKIE)?.value
	return !!token && !!cookie && safeKeyEqual(cookie, token)
}
