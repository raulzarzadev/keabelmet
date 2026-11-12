"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import s from "./ReservasPanel.module.css"

type Cell = string | number | null
interface Booking {
	id: string
	source: "web" | "manual" | "excel"
	folio?: string
	dateISO: string
	activity: string
	activityLabel: string
	name: string
	people: number
	phone: string
	email: string
	paidFull: Cell
	deposit: Cell
	settled: Cell
	balance: Cell
	guide: string
	captain: string
	transport: string
	notes: string
	status: "active" | "cancelled"
}
interface Activity {
	slug: string
	label: string
	max: number
	months: number[] | null
}
interface State {
	auth: boolean
	configured?: boolean
	since?: number
	sync?: { added: number; checked: number; skipped?: string; error?: string }
	bookings?: Booking[]
	activities?: Activity[]
}

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
const WEEK = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"]
const COLORS: Record<string, string> = {
	"safari-la-ventana": "#28c2a0",
	"safari-bahia-magdalena": "#e9b949",
	"tiburon-ballena": "#6fa8ff",
	"tour-espiritu-santo": "#f08a5d",
	"tour-ballena-gris": "#b39ddb",
	"buceo-la-paz": "#4dd0e1",
	"buceo-cabo-pulmo": "#81c784",
	"scuba-discovery": "#f48fb1",
	"certificacion-open-water": "#90a4ae",
	otro: "#bdbdbd",
}

const pad = (n: number) => String(n).padStart(2, "0")
const ym = (y: number, m: number) => `${y}-${pad(m)}`
const num = (c: Cell) => (typeof c === "number" ? c : 0)
const money = (n: number) => `$${n.toLocaleString("en-US")}`
const show = (c: Cell) => (c === null || c === "" ? "" : typeof c === "number" ? money(c) : c)

function todayBcs() {
	const d = new Date(Date.now() - 7 * 3600 * 1000)
	return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, iso: d.toISOString().slice(0, 10) }
}

interface Group {
	key: string
	slug: string
	label: string
	items: Booking[]
	people: number
	max: number
	trips: number
	free: number
	offSeason: boolean
}

function addMonths(y: number, m: number, n: number) {
	const t = (y * 12 + (m - 1)) + n
	return ym(Math.floor(t / 12), (t % 12) + 1)
}

const EMPTY: Booking = {
	id: "",
	source: "manual",
	dateISO: "",
	activity: "safari-la-ventana",
	activityLabel: "",
	name: "",
	people: 2,
	phone: "",
	email: "",
	paidFull: null,
	deposit: null,
	settled: null,
	balance: null,
	guide: "",
	captain: "",
	transport: "",
	notes: "",
	status: "active",
}

export default function ReservasPanel() {
	const t0 = todayBcs()
	const [state, setState] = useState<State | null>(null)
	const [error, setError] = useState("")
	const [busy, setBusy] = useState(false)
	const [password, setPassword] = useState("")
	const [y, setY] = useState(t0.y)
	const [m, setM] = useState(t0.m)
	const [view, setView] = useState<"cal" | "list">("cal")
	const [day, setDay] = useState<string>(t0.iso)
	const [edit, setEdit] = useState<Booking | null>(null)
	const [showCancelled, setShowCancelled] = useState(false)
	const [importOpen, setImportOpen] = useState(false)
	const [notice, setNotice] = useState("")

	const load = useCallback(async (sync = false) => {
		setError("")
		try {
			const res = await fetch(`/api/reservas${sync ? "?sync=1" : ""}`, { cache: "no-store" })
			const j = (await res.json()) as State
			setState(j)
			if (sync && j.sync) {
				setNotice(j.sync.error ? `No pude revisar Stripe: ${j.sync.error}` : j.sync.skipped ? j.sync.skipped : `Revisé ${j.sync.checked} pagos; ${j.sync.added} reservas nuevas.`)
			} else if (j.sync?.added) {
				setNotice(`Entraron ${j.sync.added} reservas nuevas de la página.`)
			}
		} catch {
			setError("No pude cargar las reservas")
		}
	}, [])

	useEffect(() => {
		load()
	}, [load])

	async function post(body: Record<string, unknown>) {
		setBusy(true)
		setError("")
		try {
			const res = await fetch("/api/reservas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
			const j = await res.json().catch(() => ({}))
			if (!res.ok) throw new Error(j.error || "Error")
			return j
		} catch (e) {
			setError(e instanceof Error ? e.message : "Error")
			return null
		} finally {
			setBusy(false)
		}
	}

	const activities = state?.activities ?? []
	const actMax = (slug: string) => activities.find((a) => a.slug === slug)?.max ?? 0
	const all = useMemo(() => state?.bookings ?? [], [state])
	const visible = useMemo(() => all.filter((b) => showCancelled || b.status === "active"), [all, showCancelled])
	const monthKey = ym(y, m)
	const inMonth = visible.filter((b) => b.dateISO.startsWith(monthKey))
	const activeMonth = inMonth.filter((b) => b.status === "active")
	const totals = {
		n: activeMonth.length,
		people: activeMonth.reduce((a, b) => a + (b.people || 0), 0),
		collected: activeMonth.reduce((a, b) => a + num(b.paidFull) + num(b.deposit), 0),
		pending: activeMonth.reduce((a, b) => a + num(b.balance), 0),
	}

	function byActivity(list: Booking[]): Group[] {
		const map = new Map<string, Booking[]>()
		for (const b of list) {
			const k = b.activity === "otro" ? `otro:${b.activityLabel}` : b.activity
			map.set(k, [...(map.get(k) ?? []), b])
		}
		return [...map.entries()].map(([k, items]) => {
			const slug = items[0].activity
			const people = items.filter((b) => b.status === "active").reduce((a, b) => a + (b.people || 0), 0)
			const max = actMax(slug)
			const trips = max ? Math.max(1, Math.ceil(people / max)) : 0
			const free = max ? trips * max - people : 0
			const months = activities.find((a) => a.slug === slug)?.months
			const offSeason = !!months && !months.includes(Number(items[0].dateISO.slice(5, 7)))
			return { key: k, slug, label: slug === "otro" ? items[0].activityLabel : activities.find((a) => a.slug === slug)?.label ?? items[0].activityLabel, items, people, max, trips, free, offSeason }
		})
	}

	function prevMonth() {
		if (m === 1) { setY(y - 1); setM(12) } else setM(m - 1)
	}
	function nextMonth() {
		if (m === 12) { setY(y + 1); setM(1) } else setM(m + 1)
	}

	async function save(b: Booking) {
		const j = await post({ action: "save", booking: b })
		if (j) {
			setEdit(null)
			setDay(b.dateISO)
			await load()
		}
	}
	async function remove(b: Booking) {
		const msg = b.source === "web" ? "¿Marcar esta reserva como cancelada? (No reembolsa nada en Stripe.)" : "¿Borrar esta reserva? No se puede deshacer."
		if (!confirm(msg)) return
		const j = await post({ action: "delete", id: b.id })
		if (j) {
			setEdit(null)
			await load()
		}
	}

	if (!state) return <main className={s.page}><p className={s.muted}>Cargando…</p></main>

	if (!state.auth) {
		return (
			<main className={s.page}>
				<form
					className={s.login}
					onSubmit={async (e) => {
						e.preventDefault()
						if (await post({ action: "login", password })) load()
					}}
				>
					<h1 className={s.title}>Reservas Keabelmet</h1>
					<input className={s.input} type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
					<button className={`${s.btn} ${s.btnOn}`} disabled={busy}>Entrar</button>
					{error && <p className={s.error}>{error}</p>}
				</form>
			</main>
		)
	}

	if (!state.configured) {
		return (
			<main className={s.page}>
				<h1 className={s.title}>Reservas Keabelmet</h1>
				<div className={s.card}>
					<p>Falta conectar la base de datos (una sola vez):</p>
					<ol>
						<li>En Vercel, abre el proyecto keabelmet → Storage → Marketplace → <b>Upstash for Redis</b>.</li>
						<li>Créala (el plan gratis alcanza) y conéctala al proyecto.</li>
						<li>Haz redeploy. Vuelve aquí e importa tu Excel.</li>
					</ol>
				</div>
			</main>
		)
	}

	// Calendario del mes (lunes primero)
	const first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay()
	const offset = (first + 6) % 7
	const days = new Date(Date.UTC(y, m, 0)).getUTCDate()
	const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
	while (cells.length % 7) cells.push(null)

	const dayList = visible.filter((b) => b.dateISO === day)
	const daysWithBookings = [...new Set(inMonth.map((b) => b.dateISO))].sort()

	return (
		<main className={s.page}>
			<div className={s.bar}>
				<h1 className={s.title}>Reservas</h1>
				<div className={s.row}>
					<button className={`${s.btn} ${s.btnOn}`} onClick={() => setEdit({ ...EMPTY, dateISO: day })}>+ Nueva reserva</button>
					<a className={s.btn} href={`/api/reservas/excel?from=${monthKey}&to=${addMonths(y, m, 2)}`}>Descargar Excel (3 meses)</a>
					<button className={s.btn} onClick={() => setImportOpen(true)}>Importar Excel</button>
					<button className={s.btn} disabled={busy} onClick={() => load(true)}>Revisar pagos</button>
					<button className={s.btn} onClick={async () => { await post({ action: "logout" }); load() }}>Salir</button>
				</div>
			</div>

			{notice && <p className={s.notice} onClick={() => setNotice("")}>{notice} ✕</p>}
			{error && <p className={s.error}>{error}</p>}

			{(!state.since || importOpen) && (
				<ImportCard
					first={!state.since}
					onClose={() => setImportOpen(false)}
					onDone={async (msg) => {
						setImportOpen(false)
						setNotice(msg)
						await load(true)
					}}
				/>
			)}

			<div className={s.monthBar}>
				<button className={s.btn} onClick={prevMonth}>‹</button>
				<h2 className={s.month}>{MONTHS[m - 1]} {y}</h2>
				<button className={s.btn} onClick={nextMonth}>›</button>
				<div className={s.stats}>
					<span><b>{totals.n}</b> reservas</span>
					<span><b>{totals.people}</b> personas</span>
					<span>Cobrado <b>{money(totals.collected)}</b></span>
					<span>Por cobrar <b>{money(totals.pending)}</b></span>
				</div>
				<div className={s.row}>
					<button className={`${s.btn} ${view === "cal" ? s.btnOn : ""}`} onClick={() => setView("cal")}>Calendario</button>
					<button className={`${s.btn} ${view === "list" ? s.btnOn : ""}`} onClick={() => setView("list")}>Lista</button>
					<label className={s.muted}><input type="checkbox" checked={showCancelled} onChange={(e) => setShowCancelled(e.target.checked)} /> Canceladas</label>
				</div>
			</div>

			{view === "cal" ? (
				<div className={s.layout}>
					<div className={s.cal}>
						{WEEK.map((w) => <div key={w} className={s.wd}>{w}</div>)}
						{cells.map((d, i) => {
							if (!d) return <div key={i} className={s.empty} />
							const iso = `${monthKey}-${pad(d)}`
							const groups = byActivity(visible.filter((b) => b.dateISO === iso))
							return (
								<button key={i} className={`${s.day} ${iso === day ? s.dayOn : ""} ${iso === t0.iso ? s.today : ""}`} onClick={() => setDay(iso)}>
									<span className={s.dnum}>{d}</span>
									{groups.map((g) => (
										<span key={g.key} className={s.chip} style={{ borderColor: COLORS[g.slug] ?? COLORS.otro }} title={g.label}>
											<i style={{ background: COLORS[g.slug] ?? COLORS.otro }} />
											{short(g.label)} {g.people}
											{g.trips > 1 ? ` · ${g.trips}🚤` : ""}
											{g.offSeason ? " ⚠" : ""}
										</span>
									))}
								</button>
							)
						})}
					</div>
					<DayDetail iso={day} list={dayList} groups={byActivity(dayList)} onEdit={setEdit} onAdd={() => setEdit({ ...EMPTY, dateISO: day })} />
				</div>
			) : (
				<div className={s.tableWrap}>
					<table className={s.table}>
						<thead>
							<tr>
								<th>Día</th><th>Nombre</th><th>Actividad</th><th>Pers.</th><th>Pago completo</th><th>Anticipo</th><th>Liquidado</th><th>Por liquidar</th><th>Teléfono</th><th>Guía</th><th>Capitán</th><th>Transp.</th>
							</tr>
						</thead>
						<tbody>
							{daysWithBookings.length === 0 && <tr><td colSpan={12} className={s.muted}>Sin reservas este mes.</td></tr>}
							{daysWithBookings.flatMap((iso) =>
								inMonth.filter((b) => b.dateISO === iso).map((b) => (
									<tr key={b.id} className={b.status === "cancelled" ? s.cancelled : ""} onClick={() => setEdit(b)}>
										<td>{Number(iso.slice(8))}</td>
										<td>{b.name}{b.source === "web" && <span className={s.web}>web</span>}</td>
										<td><i className={s.dot} style={{ background: COLORS[b.activity] ?? COLORS.otro }} />{b.activityLabel}</td>
										<td>{b.people || ""}</td>
										<td>{show(b.paidFull)}</td>
										<td>{show(b.deposit)}</td>
										<td>{show(b.settled)}</td>
										<td>{show(b.balance)}</td>
										<td>{b.phone}</td>
										<td>{b.guide}</td>
										<td>{b.captain}</td>
										<td>{b.transport}</td>
									</tr>
								)),
							)}
						</tbody>
					</table>
				</div>
			)}

			{edit && <Editor booking={edit} activities={activities} busy={busy} onSave={save} onDelete={remove} onClose={() => setEdit(null)} />}
		</main>
	)
}

function short(label: string) {
	return label.replace(/^Safari /, "").replace(/^Snorkel Isla /, "").replace(/^Buceo /, "B. ").slice(0, 16)
}

function DayDetail({ iso, list, groups, onEdit, onAdd }: { iso: string; list: Booking[]; groups: Group[]; onEdit: (b: Booking) => void; onAdd: () => void }) {
	const [yy, mm, dd] = iso.split("-").map(Number)
	return (
		<aside className={s.detail}>
			<div className={s.detailHead}>
				<h3>{dd} de {MONTHS[mm - 1].toLowerCase()} {yy}</h3>
				<button className={s.btn} onClick={onAdd}>+ Agregar</button>
			</div>
			{list.length === 0 && <p className={s.muted}>Sin reservas este día.</p>}
			{groups.map((g) => (
				<div key={g.key} className={s.group}>
					<div className={s.groupHead} style={{ borderColor: COLORS[g.slug] ?? COLORS.otro }}>
						<b>{g.label}</b>
						<span>
							{g.people} personas
							{g.max ? ` · ${g.trips} ${g.trips === 1 ? "salida" : "salidas"} (máx ${g.max}) · ${g.free === 0 ? "lleno" : `quedan ${g.free} lugares`}` : ""}
						</span>
						{g.offSeason && <span className={s.warn}>Fuera de temporada</span>}
						{captains(g.items) && <span className={s.muted}>Capitán: {captains(g.items)}</span>}
						{transportCount(g.items) > 0 && <span className={s.muted}>Transporte: {transportCount(g.items)} reserva(s)</span>}
					</div>
					{g.items.map((b) => (
						<button key={b.id} className={`${s.item} ${b.status === "cancelled" ? s.cancelled : ""}`} onClick={() => onEdit(b)}>
							<span className={s.itemTop}>
								<b>{b.name || "(sin nombre)"}</b>
								<span>{b.people} pers.</span>
							</span>
							<span className={s.muted}>
								{payLine(b)}
								{b.phone ? ` · ${b.phone}` : ""}
								{b.source === "web" ? ` · web ${b.folio ?? ""}` : ""}
							</span>
							{(b.captain || b.guide || b.transport || b.notes) && (
								<span className={s.muted}>
									{[b.captain && `Capitán ${b.captain}`, b.guide && `Guía ${b.guide}`, b.transport === "si" && "Transporte", b.notes].filter(Boolean).join(" · ")}
								</span>
							)}
						</button>
					))}
				</div>
			))}
		</aside>
	)
}

function captains(items: Booking[]) {
	return [...new Set(items.map((b) => b.captain).filter(Boolean))].join(", ")
}
function transportCount(items: Booking[]) {
	return items.filter((b) => b.transport === "si").length
}
function payLine(b: Booking) {
	if (typeof b.paidFull === "number") return `Pagado ${money(b.paidFull)}`
	const parts: string[] = []
	if (b.deposit !== null && b.deposit !== "nd") parts.push(`Anticipo ${show(b.deposit)}`)
	if (b.balance !== null && b.balance !== "nd") parts.push(`Por liquidar ${show(b.balance)}`)
	if (b.settled === "si") parts.push("Liquidado")
	return parts.join(" · ") || "Sin pago registrado"
}

function Editor({ booking, activities, busy, onSave, onDelete, onClose }: { booking: Booking; activities: Activity[]; busy: boolean; onSave: (b: Booking) => void; onDelete: (b: Booking) => void; onClose: () => void }) {
	const [b, setB] = useState<Booking>(booking)
	const set = (k: keyof Booking, v: unknown) => setB((x) => ({ ...x, [k]: v }))
	const cellIn = (k: "paidFull" | "deposit" | "settled" | "balance") => (
		<input className={s.input} value={b[k] === null ? "" : String(b[k])} onChange={(e) => set(k, e.target.value)} placeholder="número, nd, si…" />
	)
	return (
		<div className={s.modalBg} onClick={onClose}>
			<form
				className={s.modal}
				onClick={(e) => e.stopPropagation()}
				onSubmit={(e) => {
					e.preventDefault()
					onSave(b)
				}}
			>
				<div className={s.detailHead}>
					<h3>{b.id ? "Editar reserva" : "Nueva reserva"}</h3>
					{b.source === "web" && <span className={s.web}>De la página · {b.folio}</span>}
				</div>
				<div className={s.grid}>
					<label>Fecha<input className={s.input} type="date" required value={b.dateISO} onChange={(e) => set("dateISO", e.target.value)} /></label>
					<label>Actividad
						<select className={s.input} value={b.activity} onChange={(e) => { set("activity", e.target.value); set("activityLabel", activities.find((a) => a.slug === e.target.value)?.label ?? b.activityLabel) }}>
							{activities.map((a) => <option key={a.slug} value={a.slug}>{a.label}</option>)}
							<option value="otro">Otra</option>
						</select>
					</label>
					<label className={s.wide}>Cómo aparece en el Excel<input className={s.input} value={b.activityLabel} onChange={(e) => set("activityLabel", e.target.value)} /></label>
					<label className={s.wide}>Nombre<input className={s.input} value={b.name} onChange={(e) => set("name", e.target.value)} required /></label>
					<label>Personas<input className={s.input} type="number" min={0} value={b.people} onChange={(e) => set("people", Number(e.target.value))} /></label>
					<label>Teléfono<input className={s.input} value={b.phone} onChange={(e) => set("phone", e.target.value)} /></label>
					<label className={s.wide}>Correo<input className={s.input} type="email" value={b.email} onChange={(e) => set("email", e.target.value)} /></label>
					<label>Pago completo{cellIn("paidFull")}</label>
					<label>Anticipo{cellIn("deposit")}</label>
					<label>Liquidado{cellIn("settled")}</label>
					<label>Por liquidar{cellIn("balance")}</label>
					<label>Guía<input className={s.input} value={b.guide} onChange={(e) => set("guide", e.target.value)} /></label>
					<label>Capitán<input className={s.input} value={b.captain} onChange={(e) => set("captain", e.target.value)} /></label>
					<label>Transporte
						<select className={s.input} value={b.transport} onChange={(e) => set("transport", e.target.value)}>
							<option value="">—</option>
							<option value="si">Sí</option>
							<option value="no">No</option>
						</select>
					</label>
					<label>Estado
						<select className={s.input} value={b.status} onChange={(e) => set("status", e.target.value)}>
							<option value="active">Activa</option>
							<option value="cancelled">Cancelada</option>
						</select>
					</label>
					<label className={s.full}>Notas<textarea className={s.input} rows={2} value={b.notes} onChange={(e) => set("notes", e.target.value)} /></label>
				</div>
				<div className={s.modalFoot}>
					{b.id ? <button type="button" className={`${s.btn} ${s.btnWarn}`} onClick={() => onDelete(b)} disabled={busy}>{b.source === "web" ? "Cancelar reserva" : "Borrar"}</button> : <span />}
					<div className={s.row}>
						<button type="button" className={s.btn} onClick={onClose}>Cerrar</button>
						<button className={`${s.btn} ${s.btnOn}`} disabled={busy}>Guardar</button>
					</div>
				</div>
			</form>
		</div>
	)
}

function ImportCard({ first, onClose, onDone }: { first: boolean; onClose: () => void; onDone: (msg: string) => void }) {
	const [file, setFile] = useState<File | null>(null)
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState("")
	return (
		<div className={s.card}>
			<h3>{first ? "Empieza importando tu Excel" : "Importar Excel"}</h3>
			<p className={s.muted}>
				Sube el Excel de actividades (columnas MES, NOMBRE, ACTIVIDAD…). Las reservas de la página pagadas antes de la última vez que guardaste el archivo se toman del Excel; las posteriores entran solas desde Stripe.
				{!first && " Reemplaza lo importado antes; no toca lo que agregaste en el panel ni las reservas que llegaron de la página después."}
			</p>
			<div className={s.row}>
				<input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
				<button
					className={`${s.btn} ${s.btnOn}`}
					disabled={!file || busy}
					onClick={async () => {
						if (!file) return
						setBusy(true)
						setError("")
						const fd = new FormData()
						fd.append("file", file)
						fd.append("since", String(file.lastModified || Date.now()))
						const res = await fetch("/api/reservas/import", { method: "POST", body: fd })
						const j = await res.json().catch(() => ({}))
						setBusy(false)
						if (!res.ok) return setError(j.error || "No pude importar")
						onDone(`Importé ${j.imported} reservas.${j.warnings?.length ? " Avisos: " + j.warnings.join(" · ") : ""}`)
					}}
				>
					{busy ? "Importando…" : "Importar"}
				</button>
				{!first && <button className={s.btn} onClick={onClose}>Cerrar</button>}
			</div>
			{error && <p className={s.error}>{error}</p>}
		</div>
	)
}
