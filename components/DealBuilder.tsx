"use client"

import { useMemo, useState, type FormEvent } from "react"
import { formatMxn } from "@/lib/reservation"
import { DEAL_PHOTOS, MAX_DEAL_PHOTOS } from "@/lib/deal-photos"

interface Line {
	key: string
	label: string
	amount: string
}

let k = 0
const newLine = (label = "", amount = ""): Line => ({ key: `l${k++}`, label, amount })

export default function DealBuilder({ locale = "es" }: { locale?: string }) {
	const [adminKey, setAdminKey] = useState("")
	const [title, setTitle] = useState("")
	const [subtitle, setSubtitle] = useState("")
	const [depositPct, setDepositPct] = useState("20")
	const [startISO, setStartISO] = useState("")
	const [endISO, setEndISO] = useState("")
	const [includes, setIncludes] = useState("")
	const [excludes, setExcludes] = useState("")
	const [note, setNote] = useState("")
	const [lines, setLines] = useState<Line[]>([newLine(), newLine()])
	const [photos, setPhotos] = useState<string[]>([])

	function togglePhoto(key: string) {
		setPhotos((c) => (c.includes(key) ? c.filter((k) => k !== key) : c.length >= MAX_DEAL_PHOTOS ? c : [...c, key]))
	}
	const [busy, setBusy] = useState(false)
	const [err, setErr] = useState<string | null>(null)
	const [link, setLink] = useState<string | null>(null)
	const [copied, setCopied] = useState(false)

	const total = useMemo(() => lines.reduce((s, l) => s + (Number(l.amount) || 0), 0), [lines])
	const rate = Math.max(1, Math.min(100, Number(depositPct) || 20)) / 100
	const deposit = Math.round(total * rate)

	function addLine() { setLines((c) => [...c, newLine()]) }
	function updateLine(key: string, patch: Partial<Line>) { setLines((c) => c.map((l) => (l.key === key ? { ...l, ...patch } : l))) }
	function removeLine(key: string) { setLines((c) => c.filter((l) => l.key !== key)) }

	async function generate(e: FormEvent) {
		e.preventDefault()
		setErr(null)
		setLink(null)
		setCopied(false)
		const cleanLines = lines.map((l) => ({ label: l.label.trim(), amountMxn: Number(l.amount) })).filter((l) => l.label && l.amountMxn > 0)
		if (!adminKey) return setErr("Escribe la contraseña de editor.")
		if (title.trim().length < 2) return setErr("Escribe el título del deal.")
		if (!cleanLines.length) return setErr("Agrega al menos un concepto con su monto.")
		setBusy(true)
		try {
			const res = await fetch("/api/create-deal-link", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					adminKey,
					deal: {
						title: title.trim(),
						subtitle: subtitle.trim() || undefined,
						depositRate: rate,
						startISO: startISO || undefined,
						endISO: endISO || undefined,
						includes: includes.trim() || undefined,
						excludes: excludes.trim() || undefined,
						note: note.trim() || undefined,
						photos,
						lines: cleanLines,
					},
				}),
			})
			const data = await res.json()
			if (!res.ok) throw new Error(data.error || "Error")
			const base = typeof window !== "undefined" ? window.location.origin : "https://keabelmet.com"
			const prefix = locale === "es" ? "" : `/${locale}`
			setLink(`${base}${prefix}/deal?d=${encodeURIComponent(data.token)}`)
		} catch (e2) {
			setErr(e2 instanceof Error ? e2.message : "No se pudo generar el link.")
		} finally {
			setBusy(false)
		}
	}

	async function copy() {
		if (!link) return
		try { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* no-op */ }
	}

	return (
		<div className="deal-wrap">
			<div className="deal-head">
				<span className="deal-kicker">Panel de editor</span>
				<h1>Armar deal personalizado</h1>
				<p className="deal-subtitle">Crea un paquete con precios negociados y genera un link para que el grupo aparte con anticipo.</p>
			</div>

			<form onSubmit={generate} className="deal-card deal-builder">
				<label className="res-field"><span>Contraseña de editor</span><input type="password" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} placeholder="•••••••" autoComplete="off" /></label>

				<label className="res-field"><span>Título</span><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Buceo en Baja · La Paz" /></label>
				<label className="res-field"><span>Subtítulo (opcional)</span><input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="4 amigas · 2 al 8 de noviembre de 2026" /></label>

				<div className="deal-row2">
					<label className="res-field"><span>Anticipo (%)</span><input type="number" min={1} max={100} value={depositPct} onChange={(e) => setDepositPct(e.target.value)} /></label>
					<label className="res-field"><span>Inicio (opcional)</span><input type="date" value={startISO} onChange={(e) => setStartISO(e.target.value)} /></label>
					<label className="res-field"><span>Fin (opcional)</span><input type="date" value={endISO} onChange={(e) => setEndISO(e.target.value)} /></label>
				</div>

				<h2 className="dep-sec-title">Conceptos (nombre + monto)</h2>
				{lines.map((l) => (
					<div key={l.key} className="deal-line-edit">
						<input type="text" value={l.label} onChange={(e) => updateLine(l.key, { label: e.target.value })} placeholder="Ane — Paquete La Paz" />
						<input type="number" value={l.amount} onChange={(e) => updateLine(l.key, { amount: e.target.value })} placeholder="11500" min={0} />
						<button type="button" className="dep-item-remove" onClick={() => removeLine(l.key)} aria-label="Quitar">×</button>
					</div>
				))}
				<button type="button" className="btn btn-ghost deal-add-line" onClick={addLine}>+ Agregar concepto</button>

				<h2 className="dep-sec-title">Fotos (la 1ª es la portada · máx. {MAX_DEAL_PHOTOS})</h2>
				<div className="deal-photo-picker">
					{DEAL_PHOTOS.map((p) => {
						const idx = photos.indexOf(p.key)
						const on = idx >= 0
						return (
							<button
								key={p.key}
								type="button"
								className={`deal-photo-opt${on ? " on" : ""}`}
								style={{ backgroundImage: `url("${p.src}")` }}
								onClick={() => togglePhoto(p.key)}
								aria-pressed={on}
								title={p.label}
							>
								{on && <span className="deal-photo-num">{idx === 0 ? "1 · Portada" : idx + 1}</span>}
								<span className="deal-photo-label">{p.label}</span>
							</button>
						)
					})}
				</div>

				<label className="res-field"><span>Incluye (una línea por punto)</span><textarea rows={4} value={includes} onChange={(e) => setIncludes(e.target.value)} placeholder={"Guía certificado\nEquipo de buceo\nLanchas"} /></label>
				<label className="res-field"><span>No incluye (una línea por punto)</span><textarea rows={4} value={excludes} onChange={(e) => setExcludes(e.target.value)} placeholder={"Vuelos\nComidas fuera de los tours\nSeguro médico"} /></label>
				<label className="res-field"><span>Nota (opcional)</span><textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Traslado a La Ventana: $300 por persona · Hospedaje y coche aparte" /></label>

				<div className="dep-sum">
					<div className="dep-sum-row"><span>Total del grupo</span><strong>{formatMxn(total)} MXN</strong></div>
					<div className="dep-sum-row dep-sum-paid"><span>Anticipo ({Math.round(rate * 100)}%)</span><strong>{formatMxn(deposit)} MXN</strong></div>
				</div>

				{err && <p className="checkout-error">⚠️ {err}</p>}
				<button type="submit" className="btn btn-teal dep-pay-btn" disabled={busy}>{busy ? "Generando…" : "Generar link del deal"}</button>
			</form>

			{link && (
				<div className="deal-card deal-link-box">
					<h2 className="dep-sec-title">Link listo para compartir</h2>
					<div className="deal-link-value">{link}</div>
					<div className="deal-link-actions">
						<button type="button" className="btn btn-teal" onClick={copy}>{copied ? "¡Copiado!" : "Copiar link"}</button>
						<a className="btn btn-ghost" href={link} target="_blank" rel="noopener noreferrer">Previsualizar</a>
					</div>
					<p className="dep-email-sent">Compártelo por WhatsApp. Al abrirlo, el grupo verá el desglose y pagará el anticipo; recibirán el voucher por correo.</p>
				</div>
			)}
		</div>
	)
}
