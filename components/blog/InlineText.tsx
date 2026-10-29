import Link from "next/link"
import type { ReactNode } from "react"
import type { Locale } from "@/lib/i18n"
import { localizeHref } from "@/lib/blog"

const TOKEN = /(\*\*[^*]+\*\*)|(\[\^\d+\])|(\[[^\]]+\]\([^)\s]+\))|(\*[^*\s][^*]*?\*)/g

/** Renderiza **negritas**, *cursivas*, [enlaces](ruta) y citas [^n] de un texto del blog. */
export default function InlineText({ text, locale }: { text: string; locale: Locale }) {
	const out: ReactNode[] = []
	let last = 0
	let i = 0
	for (const m of text.matchAll(TOKEN)) {
		const idx = m.index ?? 0
		if (idx > last) out.push(text.slice(last, idx))
		const tok = m[0]
		if (m[1]) {
			out.push(<strong key={i++}>{tok.slice(2, -2)}</strong>)
		} else if (m[2]) {
			const n = tok.slice(2, -1)
			out.push(
				<sup key={i++} className="blog-cite">
					<a href={`#fuente-${n}`} aria-label={`Fuente ${n}`}>[{n}]</a>
				</sup>,
			)
		} else if (m[3]) {
			const label = tok.slice(1, tok.indexOf("]("))
			const href = tok.slice(tok.indexOf("](") + 2, -1)
			if (href.startsWith("/")) {
				out.push(<Link key={i++} href={localizeHref(href, locale)}>{label}</Link>)
			} else {
				out.push(<a key={i++} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)
			}
		} else if (m[4]) {
			out.push(<em key={i++}>{tok.slice(1, -1)}</em>)
		}
		last = idx + tok.length
	}
	if (last < text.length) out.push(text.slice(last))
	return <>{out}</>
}
