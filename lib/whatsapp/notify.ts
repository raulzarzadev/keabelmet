import { Resend } from "resend"
import { FROM, OWNER_EMAIL, SITE_URL } from "@/lib/email"

/**
 * Avisos al equipo por correo: cuando el bot manda un link de anticipo y cuando
 * pasa una conversación a una persona. El pago en sí ya avisa por su cuenta
 * (webhook de Stripe → sendDealOwnerNotification).
 */

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string)

export async function notifyOwner(subject: string, opts: { phone: string; name?: string; body: string }): Promise<void> {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) return
	const to = OWNER_EMAIL.split(",").map((s) => s.trim()).filter(Boolean)
	if (!to.length) return
	const who = `${opts.name ? `${opts.name} · ` : ""}+${opts.phone}`
	const html = `<div style="font-family:system-ui,sans-serif;max-width:560px">
<p style="margin:0 0 8px;color:#555">${esc(who)}</p>
<pre style="white-space:pre-wrap;font-family:inherit;background:#f4f7f8;padding:12px;border-radius:8px">${esc(opts.body)}</pre>
<p><a href="${SITE_URL}/panel-whatsapp?c=${opts.phone}">Abrir en el panel</a> · <a href="https://wa.me/${opts.phone}">Abrir en WhatsApp</a></p>
</div>`
	try {
		await new Resend(apiKey).emails.send({ from: FROM, to, subject: `${subject} · ${who}`, html })
	} catch (err) {
		console.error("[whatsapp] aviso por correo falló", err)
	}
}
