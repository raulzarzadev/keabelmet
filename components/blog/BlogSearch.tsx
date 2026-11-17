"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { searchItems, type SearchItem } from "@/lib/blog/search"
import { blogCopy } from "@/lib/blog/copy"
import type { BlogLocale } from "@/lib/blog/types"

/**
 * Buscador por palabras clave del blog. Sin texto muestra `children` (las
 * tarjetas de temas y artículos); con texto, los resultados. Guarda la búsqueda
 * en la URL (?q=) para poder compartirla.
 */
export default function BlogSearch({
	items,
	lang,
	placeholder,
	everywhereLabel,
	suggestions,
	everywhereHref,
	children,
}: {
	items: SearchItem[]
	lang: BlogLocale
	placeholder: string
	everywhereLabel?: string
	suggestions: string[]
	/** Enlace para buscar en todo el blog (en las subpáginas de tema). */
	everywhereHref?: string
	children: ReactNode
}) {
	const c = blogCopy[lang]
	const labels = { placeholder, results: c.results, none: c.none, try: c.try, clear: c.clear, min: c.min, everywhere: everywhereLabel }
	const [q, setQ] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const initial = new URLSearchParams(window.location.search).get("q")
		if (initial) setQ(initial)
	}, [])

	useEffect(() => {
		const url = new URL(window.location.href)
		if (q.trim()) url.searchParams.set("q", q.trim())
		else url.searchParams.delete("q")
		window.history.replaceState(null, "", url.toString())
	}, [q])

	const results = useMemo(() => searchItems(items, q), [items, q])
	const searching = q.trim().length >= 2

	return (
		<>
			<form className="blog-search" role="search" onSubmit={(e) => { e.preventDefault(); inputRef.current?.blur() }}>
				<svg viewBox="0 0 24 24" aria-hidden="true" className="blog-search-icon"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
				<input
					ref={inputRef}
					type="search"
					value={q}
					onChange={(e) => setQ(e.target.value)}
					placeholder={labels.placeholder}
					aria-label={labels.placeholder}
					enterKeyHint="search"
				/>
				{q && (
					<button type="button" className="blog-search-clear" onClick={() => setQ("")} aria-label={labels.clear}>
						×
					</button>
				)}
			</form>
			<div className="blog-search-suggest">
				<span>{labels.try}</span>
				{suggestions.map((s) => (
					<button key={s} type="button" onClick={() => setQ(s)} className={q === s ? "on" : undefined}>
						{s}
					</button>
				))}
			</div>

			{searching ? (
				<section className="blog-results" aria-live="polite">
					<p className="blog-results-count">{results.length ? labels.results(results.length, q.trim()) : labels.none(q.trim())}</p>
					{results.length > 0 && (
						<div className="blog-grid">
							{results.map((it) => (
								<Link key={it.id} href={it.href} className="blog-tile">
									<div className="blog-tile-img">
										<Image src={it.cover} alt={it.coverAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 360px" style={{ objectFit: "cover" }} />
									</div>
									<div className="blog-tile-body">
										<span className="blog-tile-cat">{it.categoryLabel} · {it.minutes} {labels.min}</span>
										<h2>{it.title}</h2>
										<p>{it.excerpt}</p>
									</div>
								</Link>
							))}
						</div>
					)}
					{everywhereHref && labels.everywhere && (
						<p className="blog-results-more">
							<Link href={`${everywhereHref}?q=${encodeURIComponent(q.trim())}`}>{labels.everywhere}</Link>
						</p>
					)}
				</section>
			) : (
				children
			)}
		</>
	)
}
