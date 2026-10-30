import { NextRequest, NextResponse } from "next/server"
import { resolveShortLink } from "@/lib/whatsapp/store"
import { SITE_URL } from "@/lib/seo"

export const runtime = "nodejs"

/** Link corto que manda el bot de WhatsApp → página /deal con el token firmado. */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const path = await resolveShortLink(id).catch(() => null)
	if (!path) return NextResponse.redirect(`${SITE_URL}/contacto`, 302)
	return NextResponse.redirect(`${SITE_URL}${path}`, 302)
}
