import { plainText } from "./index"
import type { BlogLocale, BlogPost } from "./types"

const SITE = "https://www.keabelmet.com"

export function blogPostUrl(post: BlogPost, lang: BlogLocale): string {
	return lang === "es" ? `${SITE}/blog/${post.es.slug}` : `${SITE}/en/blog/${post.en.slug}`
}

/**
 * Artículo completo en texto plano para ingestión por LLMs (llms-full.txt).
 * Las citas [^n] se conservan como [n] para que el lector pueda ubicar la fuente.
 */
export function blogPostToText(post: BlogPost, lang: BlogLocale): string[] {
	const c = post[lang]
	const txt = (s: string) => plainText(s.replace(/\[\^(\d+)\]/g, " [$1]"))
	const out: string[] = []
	out.push(`### ${c.title}`)
	out.push("")
	out.push(`URL: ${blogPostUrl(post, lang)}`)
	out.push(`Actualizado: ${post.updated ?? post.date}`)
	out.push("")
	out.push(`Respuesta corta: ${txt(c.answer)}`)
	out.push("")
	for (const b of c.blocks) {
		if (b.type === "h2") out.push(`#### ${b.text}`)
		else if (b.type === "h3") out.push(`##### ${b.text}`)
		else if (b.type === "p" || b.type === "tip" || b.type === "fact") out.push(txt(b.text))
		else if (b.type === "ul" || b.type === "ol") b.items.forEach((x) => out.push(`- ${txt(x)}`))
		else if (b.type === "table") {
			out.push(b.head.join(" | "))
			b.rows.forEach((r) => out.push(r.map(txt).join(" | ")))
		} else if (b.type === "chart") {
			out.push(`[${lang === "es" ? "Gráfica" : "Chart"}] ${b.alt}${b.caption ? " " + txt(b.caption) : ""}`)
			if (b.data) {
				out.push(b.data.head.join(" | "))
				b.data.rows.forEach((r) => out.push(r.join(" | ")))
			}
		} else if (b.type === "anim") {
			if (!b.caption) continue
			out.push(`[${lang === "es" ? "Animación" : "Animation"}] ${txt(b.caption)}`)
		} else continue
		out.push("")
	}
	if (c.faq.length) {
		out.push(lang === "es" ? "Preguntas frecuentes:" : "FAQ:")
		for (const f of c.faq) out.push(`- ${f.q} ${txt(f.a)}`)
		out.push("")
	}
	if (post.sources.length) {
		out.push(lang === "es" ? "Fuentes:" : "Sources:")
		for (const s of post.sources) out.push(`[${s.id}] ${s.authors} (${s.year}). ${s.title}. ${s.publication}. ${s.url}`)
		out.push("")
	}
	return out
}
