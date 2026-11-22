"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import s from "./ReservasPanel.module.css"
import type { RadarPoint, RadarQuery, RadarResult } from "@/lib/ai-radar"

interface Data {
	queries: RadarQuery[]
	results: RadarResult[]
	history: Record<string, RadarPoint[]>
	indexnow: { at: string; sent: number } | null
}

/** Sitios de reseñas y reservas donde conviene tener perfil propio si las IA los citan. */
const LISTING_SITES: Record<string, string> = {
	"tripadvisor.com": "TripAdvisor",
	"tripadvisor.com.mx": "TripAdvisor",
	"getyourguide.com": "GetYourGuide",
	"viator.com": "Viator",
	"google.com": "Google Maps",
	"airbnb.com": "Airbnb Experiences",
	"reddit.com": "Reddit",
	"yelp.com": "Yelp",
	"expedia.com": "Expedia",
	"klook.com": "Klook",
	"civitatis.com": "Civitatis",
}

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short" })
const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9áéíóúñü ]/g, "").replace(/\s+/g, " ").trim()

/** Lunes de la semana de una fecha AAAA-MM-DD, para agrupar el historial. */
function weekOf(d: string): string {
	const t = new Date(`${d}T12:00:00Z`)
	t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 6) % 7))
	return t.toISOString().slice(0, 10)
}

export default function PanelRadarIA() {
	const [data, setData] = useState<Data | null>(null)
	const [error, setError] = useState("")
	const [running, setRunning] = useState(false)
	const [msg, setMsg] = useState("")
	const [lang, setLang] = useState<"all" | "es" | "en">("all")
	const [open, setOpen] = useState<string | null>(null)

	const load = useCallback(async () => {
		try {
			const res = await fetch("/api/radar", { cache: "no-store" })
			const j = await res.json()
			if (!res.ok) throw new Error(j.error || "No se pudo cargar el radar")
			setData(j as Data)
			setError("")
		} catch (e) {
			setError(e instanceof Error ? e.message : "Error")
		}
	}, [])
	useEffect(() => {
		load()
	}, [load])

	const runNow = async () => {
		setRunning(true)
		setMsg("Preguntando a la IA… tarda unos 4 minutos. Puedes seguir usando el panel en otra pestaña.")
		try {
			const res = await fetch("/api/radar", { method: "POST" })
			const j = await res.json()
			if (!res.ok) throw new Error(j.error || "No se pudo correr el radar")
			setMsg(`Listo: ${j.ran} preguntas revisadas${j.pending ? `, ${j.pending} quedan para mañana` : ""}${j.errors ? ` (${j.errors} con error)` : ""}.`)
			await load()
		} catch (e) {
			setMsg(e instanceof Error ? e.message : "Error")
		} finally {
			setRunning(false)
		}
	}

	const results = useMemo(() => (data?.results ?? []).filter((r) => lang === "all" || r.lang === lang), [data, lang])
	const ok = results.filter((r) => !r.error)
	const hits = ok.filter((r) => r.mentioned)
	const positions = hits.map((r) => r.position).filter((p): p is number => p !== null)
	const lastRun = ok.reduce((m, r) => (r.date > m ? r.date : m), "")

	// Competidores: quién aparece en las respuestas en lugar de Keabelmet
	const competitors = useMemo(() => {
		const map = new Map<string, { name: string; n: number; top3: number }>()
		for (const r of ok) {
			const seen = new Set<string>()
			r.operators.forEach((o, i) => {
				const k = norm(o)
				if (!k || /keabelmet/.test(k) || seen.has(k)) return
				seen.add(k)
				const e = map.get(k) ?? { name: o, n: 0, top3: 0 }
				e.n++
				if (i < 3) e.top3++
				map.set(k, e)
			})
		}
		return [...map.values()].sort((a, b) => b.n - a.n || b.top3 - a.top3).slice(0, 12)
	}, [ok])

	// Fuentes que la IA cita en sus respuestas
	const sources = useMemo(() => {
		const map = new Map<string, number>()
		for (const r of ok) new Set(r.cited.map((c) => c.domain)).forEach((d) => d && map.set(d, (map.get(d) ?? 0) + 1))
		return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14)
	}, [ok])

	// Historial semanal: % de preguntas donde aparece Keabelmet
	const weeks = useMemo(() => {
		const ids = new Set(results.map((r) => r.id))
		const map = new Map<string, { m: number; n: number }>()
		for (const [id, pts] of Object.entries(data?.history ?? {})) {
			if (!ids.has(id)) continue
			const perWeek = new Map<string, RadarPoint>()
			for (const p of pts) if (!perWeek.has(weekOf(p.d))) perWeek.set(weekOf(p.d), p)
			perWeek.forEach((p, w) => {
				const e = map.get(w) ?? { m: 0, n: 0 }
				e.n++
				e.m += p.m
				map.set(w, e)
			})
		}
		return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0])).slice(-12)
	}, [data, results])

	if (error) return <p className={s.error}>{error}</p>
	if (!data) return <p className={s.muted}>Cargando radar…</p>

	const zones = [...new Set(results.map((r) => r.zone))]
	const pct = ok.length ? Math.round((hits.length / ok.length) * 100) : 0

	return (
		<div className={s.fin}>
			<div className={s.monthBar}>
				<h2 className={s.month} style={{ textAlign: "left" }}>Radar de IA</h2>
				<div className={s.tabs}>
					{(["all", "es", "en"] as const).map((l) => (
						<button key={l} className={lang === l ? s.tabOn : ""} onClick={() => setLang(l)}>{l === "all" ? "Todas" : l === "es" ? "Español" : "Inglés"}</button>
					))}
				</div>
				<button className={`${s.btn} ${s.btnOn}`} disabled={running} onClick={runNow}>{running ? "Revisando…" : "Correr ahora"}</button>
			</div>
			<p className={s.muted} style={{ margin: 0 }}>
				Cada semana le hacemos a una IA con búsqueda web ({data.queries.length} preguntas) lo mismo que preguntaría un viajero, sin decirle quiénes somos, y anotamos a quién recomienda y de dónde saca la información.
			</p>
			{msg && <p className={s.notice} onClick={() => setMsg("")}>{msg} ✕</p>}

			{data.results.length === 0 ? (
				<div className={s.card}>
					<h3>Todavía no hay resultados</h3>
					<p>El radar corre solo cada semana. Para ver la primera foto ahora, toca <b>Correr ahora</b>.</p>
				</div>
			) : (
				<>
					<div className={s.kpis}>
						<div className={`${s.kpi} ${hits.length ? s.kpiGood : s.kpiBad}`}>
							<span className={s.muted}>Te recomienda</span>
							<b>{hits.length} de {ok.length}</b>
							<span className={s.muted}>preguntas ({pct} %)</span>
						</div>
						<div className={s.kpi}>
							<span className={s.muted}>Lugar promedio cuando apareces</span>
							<b>{positions.length ? `#${(positions.reduce((a, b) => a + b, 0) / positions.length).toFixed(1)}` : "—"}</b>
							<span className={s.muted}>entre los operadores que nombra</span>
						</div>
						<div className={s.kpi}>
							<span className={s.muted}>Última revisión</span>
							<b>{lastRun ? fmtDate(lastRun) : "—"}</b>
							<span className={s.muted}>se repite cada semana</span>
						</div>
						<div className={s.kpi}>
							<span className={s.muted}>Aviso a Bing (IndexNow)</span>
							<b>{data.indexnow ? fmtDate(data.indexnow.at) : "Pendiente"}</b>
							<span className={s.muted}>{data.indexnow ? `${data.indexnow.sent} páginas avisadas` : "se manda tras la próxima publicación"}</span>
						</div>
					</div>

					{weeks.length > 1 && (
						<div className={s.chartBox}>
							<p className={s.subh} style={{ marginTop: 0 }}>Semanas: % de preguntas donde te recomienda</p>
							<div className={s.radarWeeks}>
								{weeks.map(([w, e]) => {
									const p = e.n ? Math.round((e.m / e.n) * 100) : 0
									return (
										<div key={w} className={s.radarWeek} title={`${e.m} de ${e.n}`}>
											<span>{p} %</span>
											<i style={{ height: `${Math.max(p, 2)}%` }} />
											<small>{fmtDate(w)}</small>
										</div>
									)
								})}
							</div>
						</div>
					)}

					<div className={s.twoCols}>
						<div className={s.chartBox}>
							<p className={s.subh} style={{ marginTop: 0 }}>Quién aparece en tu lugar</p>
							{competitors.length === 0 && <p className={s.muted}>Nadie todavía.</p>}
							{competitors.map((c) => (
								<div key={c.name} className={s.radarRow}>
									<span>{c.name}</span>
									<span className={s.muted}>{c.n} {c.n === 1 ? "pregunta" : "preguntas"}{c.top3 ? ` · ${c.top3} en top 3` : ""}</span>
									<div className={s.bar2}><i style={{ width: `${(c.n / Math.max(1, ok.length)) * 100}%` }} /></div>
								</div>
							))}
						</div>
						<div className={s.chartBox}>
							<p className={s.subh} style={{ marginTop: 0 }}>De dónde saca la información la IA</p>
							{sources.length === 0 && <p className={s.muted}>Sin fuentes citadas todavía.</p>}
							{sources.map(([d, n]) => (
								<div key={d} className={s.radarRow}>
									<span>
										{d}
										{d.endsWith("keabelmet.com") ? <b className={s.radarOwn}> · tu sitio</b> : LISTING_SITES[d] ? <b className={s.radarTip}> · conviene tener perfil aquí</b> : null}
									</span>
									<span className={s.muted}>citada en {n} {n === 1 ? "respuesta" : "respuestas"}</span>
									<div className={s.bar2}><i style={{ width: `${(n / Math.max(1, ok.length)) * 100}%` }} /></div>
								</div>
							))}
						</div>
					</div>

					{zones.map((z) => (
						<div key={z}>
							<p className={s.subh}>{z}</p>
							<div className={s.tableWrap}>
								<table className={`${s.table} ${s.radarTable}`}>
									<thead><tr><th>Pregunta</th><th>¿Te recomienda?</th><th>Recomienda a</th><th>Fecha</th></tr></thead>
									<tbody>
										{results.filter((r) => r.zone === z).map((r) => (
											<RadarRow key={r.id} r={r} open={open === r.id} toggle={() => setOpen(open === r.id ? null : r.id)} />
										))}
									</tbody>
								</table>
							</div>
						</div>
					))}
				</>
			)}
		</div>
	)
}

function RadarRow({ r, open, toggle }: { r: RadarResult; open: boolean; toggle: () => void }) {
	return (
		<>
			<tr onClick={toggle}>
				<td>{r.q}</td>
				<td className={r.error ? s.warn : r.mentioned ? s.radarYes : s.bad}>
					{r.error ? "Error" : r.mentioned ? (r.position ? `Sí · #${r.position}` : "Sí, como fuente") : "No"}
				</td>
				<td>{r.operators.filter((o) => !/keabelmet/i.test(o)).slice(0, 3).join(", ") || "—"}</td>
				<td>{fmtDate(r.date)}</td>
			</tr>
			{open && (
				<tr className={s.static}>
					<td colSpan={4}>
						{r.error ? (
							<p className={s.warn}>{r.error}</p>
						) : (
							<div className={s.radarDetail}>
								<p className={s.subh}>Lo que contestó la IA</p>
								<div className={s.radarAnswer}>{r.answer ? <Md text={r.answer} /> : "Sin texto."}</div>
								{r.cited.length > 0 && (
									<>
										<p className={s.subh}>Páginas que citó</p>
										<ul>
											{r.cited.map((c) => (
												<li key={c.url}><a href={c.url} target="_blank" rel="noopener noreferrer">{c.title || c.url}</a> <span className={s.muted}>{c.domain}</span></li>
											))}
										</ul>
									</>
								)}
							</div>
						)}
					</td>
				</tr>
			)}
		</>
	)
}

/** Markdown mínimo de las respuestas: negritas y títulos, sin meter HTML ajeno. */
function Md({ text }: { text: string }) {
	return (
		<>
			{text.split("\n").map((line, i) => {
				const head = /^#{1,6}\s+/.test(line)
				const parts = line.replace(/^#{1,6}\s+/, "").split(/\*\*(.+?)\*\*/g)
				return (
					<span key={i}>
						{parts.map((p, j) => (j % 2 || head ? <b key={j}>{p}</b> : p))}
						{"\n"}
					</span>
				)
			})}
		</>
	)
}
