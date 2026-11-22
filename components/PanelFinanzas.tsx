"use client"

import { useMemo, useState } from "react"
import s from "./ReservasPanel.module.css"
import {
	COMBINED_REPARTO,
	isFixedCat,
	COMPANY_ACCOUNT,
	MOVEMENT_KINDS,
	OPEX_CATEGORIES,
	keabelmetShare,
	kindOf,
	payerOf,
	yearSummary,
	type Expense,
	type FinBooking,
	type FinSettings,
	type MovementKind,
} from "@/lib/finance-calc"

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
const MON = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
const money = (n: number) => `${n < 0 ? "−" : ""}$${Math.round(Math.abs(n)).toLocaleString("en-US")}`
const pct = (n: number) => `${(n * 100).toFixed(1)}%`
/** Fecha de hoy en la hora local (no UTC: de noche ya sería mañana). */
const todayISO = () => {
	const d = new Date()
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}
/** Quien pagó con dinero ya saldado fuera de Keabelmet: cuenta como dinero de fuera, pero no se le debe. */
const SETTLED_RE = /externo|saldado/i
const KIND_LABEL: Record<MovementKind, string> = { operacion: "Operación", equipo: "Equipo", reparto: "Reparto", pagoArgo: "Pago de Argo", reembolso: "Reembolso" }

type Post = (body: Record<string, unknown>) => Promise<unknown>

export default function PanelFinanzas({ bookings, expenses, fin, post, reload }: { bookings: FinBooking[]; expenses: Expense[]; fin: FinSettings; post: Post; reload: () => Promise<void> }) {
	const [year, setYear] = useState(new Date().getFullYear())
	const [editExp, setEditExp] = useState<Partial<Expense> | null>(null)
	const [settings, setSettings] = useState<FinSettings>(fin)
	const [dirty, setDirty] = useState(false)
	const [filter, setFilter] = useState<MovementKind | "todos">("todos")
	// Mes del corte: el actual en el año en curso; en otros años, diciembre.
	const [cutMonth, setCutMonth] = useState(new Date().getMonth() + 1)
	const sum = useMemo(() => yearSummary(bookings, expenses, settings, year), [bookings, expenses, settings, year])
	const yearMoves = expenses.filter((e) => e.dateISO.startsWith(String(year))).sort((a, b) => a.dateISO.localeCompare(b.dateISO) || a.createdAt - b.createdAt)
	const shownMoves = filter === "todos" ? yearMoves : yearMoves.filter((e) => kindOf(e) === filter)
	// Solo los destinos por porcentaje deben sumar 100%
	const pctCats = settings.reparto.filter((c) => !isFixedCat(c))
	const pctTotal = pctCats.reduce((a, c) => a + c.pct, 0)
	const t = sum.totals
	const payers = useMemo(() => [...new Set([COMPANY_ACCOUNT, ...expenses.map(payerOf)])], [expenses])
	const destinos = [...settings.fixed.map((f) => f.name), ...settings.reparto.map((c) => c.name)]
	const cut = sum.months[Math.min(12, Math.max(1, cutMonth)) - 1]
	const cutName = MONTHS[cut.month - 1].toLowerCase()

	function change(next: FinSettings) {
		setDirty(true)
		setSettings(next)
	}
	function setCat(i: number, k: "pct" | "name" | "desc", v: string) {
		change({ ...settings, reparto: settings.reparto.map((c, j) => (j === i ? { ...c, [k]: k === "pct" ? Math.max(0, Math.min(100, Number(v) || 0)) / 100 : v } : c)) })
	}
	function setAmount(i: number, v: string) {
		change({ ...settings, reparto: settings.reparto.map((c, j) => (j === i ? { ...c, amount: Math.max(0, Number(String(v).replace(/[$,\s]/g, "")) || 0) } : c)) })
	}
	function toggleMode(i: number) {
		change({ ...settings, reparto: settings.reparto.map((c, j) => (j === i ? (isFixedCat(c) ? { name: c.name, pct: c.pct, desc: c.desc } : { ...c, mode: "fixed", amount: c.amount ?? 0 }) : c)) })
	}
	function setFixed(i: number, k: "monthly" | "name" | "desc", v: string) {
		change({ ...settings, fixed: settings.fixed.map((f, j) => (j === i ? { ...f, [k]: k === "monthly" ? Math.max(0, Number(v) || 0) : v } : f)) })
	}

	const saveBar = dirty ? (
		<div className={s.row}>
			<button className={`${s.btn} ${s.btnOn}`} onClick={async () => { if (await post({ action: "saveFin", fin: settings })) { setDirty(false); await reload() } }}>Guardar cambios</button>
			<button className={s.btn} onClick={() => { setSettings(fin); setDirty(false) }}>Deshacer</button>
		</div>
	) : null

	const newMove = (kind: MovementKind, extra: Partial<Expense> = {}) =>
		setEditExp({ dateISO: todayISO(), kind, paidFrom: kind === "pagoArgo" ? "Argo Navis" : COMPANY_ACCOUNT, ...extra })

	// Quién puso dinero de su bolsa, cuánto se le ha devuelto y cuánto se le debe
	const people = [...new Set([...Object.keys(sum.contributions), ...Object.keys(sum.refunds)])]
		.map((who) => ({ who, paid: sum.contributions[who] ?? 0, back: sum.refunds[who] ?? 0, settled: SETTLED_RE.test(who) || settings.settled.includes(who) }))
		.sort((a, b) => b.paid - a.paid)
	const contribTotal = people.reduce((a, p) => a + p.paid, 0)
	const owedTotal = people.reduce((a, p) => a + (p.settled ? 0 : Math.max(0, p.paid - p.back)), 0)

	return (
		<div className={s.fin}>
			<div className={s.monthBar}>
				<button className={s.btn} onClick={() => setYear(year - 1)}>‹</button>
				<h2 className={s.month}>Finanzas {year}</h2>
				<button className={s.btn} onClick={() => setYear(year + 1)}>›</button>
			</div>

			<div className={s.kpis}>
				<Kpi label="Ventas" value={money(t.sales)} sub={`${t.bookings} reservas · ${t.people} personas`} />
				<Kpi label="Costos de los tours" value={money(t.costs)} sub="Pagado a proveedores" />
				<Kpi label="Gastos de operación" value={money(t.opex)} sub="Gasolina extra, publicidad, software…" />
				<Kpi label="Utilidad real" value={money(t.netProfit)} sub={`Margen real ${pct(sum.netMargin)}`} tone={t.netProfit >= 0 ? "good" : "bad"} />
				<Kpi label="Compras de equipo" value={money(t.expenses)} sub="Inversión en la empresa" />
				<Kpi label="Por cobrar a clientes" value={money(t.pending)} />
				<Kpi label="Argo Navis le debe" value={money(sum.argo.owes)} sub="Gastos compartidos pendientes" />
				<Kpi label="Pagado de fuera de la caja" value={money(contribTotal)} sub={owedTotal ? `Pendiente de devolver ${money(owedTotal)}` : "Pagado de la bolsa de alguien"} />
			</div>
			{t.missingCost > 0 && (
				<p className={s.notice}>Hay {t.missingCost} reservas sin costo de proveedor ({money(t.salesNoCost)} en ventas). No cuentan en la utilidad ni en el reparto hasta que captures su costo (Reservas → abre la reserva → Costo).</p>
			)}

			<h3 className={s.h3}>Así va el año</h3>
			<MonthChart months={sum.months} />

			<h3 className={s.h3}>Estado de resultados {year}</h3>
			<div className={s.card}>
				<StatementRow label="Ventas de reservas con costo" value={t.salesWithCost} />
				<StatementRow label="− Costos de los tours (proveedores)" value={-t.costs} />
				<StatementRow label="= Utilidad de los tours" value={t.profit} strong />
				<StatementRow label="− Gastos de operación" value={-t.opex} />
				<StatementRow label="= Utilidad real" value={t.netProfit} strong />
				<StatementRow label="− Compromisos fijos (vivienda de Mau…)" value={-t.fixed} />
				<StatementRow label="= Para repartir" value={t.toDistribute} strong />
				<p className={s.muted} style={{ marginTop: 10 }}>
					Aparte, como inversión: {money(t.expenses)} en compras de equipo. Después de esa inversión quedan <b>{money(t.netProfit - t.expenses)}</b>.
				</p>
			</div>

			<h3 className={s.h3}>Mes por mes</h3>
			<div className={s.tableWrap}>
				<table className={s.table}>
					<thead>
						<tr><th>Mes</th><th>Reservas</th><th>Ventas</th><th>Costos tours</th><th>Utilidad tours</th><th>Operación</th><th>Utilidad real</th><th>Equipo</th><th>Por cobrar</th><th>Sin costo</th></tr>
					</thead>
					<tbody>
						{sum.months.map((m) => (
							<tr key={m.month} className={s.static}>
								<td>{MONTHS[m.month - 1]}</td>
								<td>{m.bookings || ""}</td>
								<td>{m.sales ? money(m.sales) : ""}</td>
								<td>{m.costs ? money(m.costs) : ""}</td>
								<td>{m.sales || m.costs ? money(m.profit) : ""}</td>
								<td>{m.opex ? money(m.opex) : ""}</td>
								<td className={m.netProfit < 0 ? s.warn : ""}>{m.sales || m.costs || m.opex ? money(m.netProfit) : ""}</td>
								<td>{m.expenses ? money(m.expenses) : ""}</td>
								<td>{m.pending ? money(m.pending) : ""}</td>
								<td className={m.missingCost ? s.warn : ""}>{m.missingCost || ""}</td>
							</tr>
						))}
						<tr className={`${s.static} ${s.totalRow}`}>
							<td>Total</td><td>{t.bookings}</td><td>{money(t.sales)}</td><td>{money(t.costs)}</td><td>{money(t.profit)}</td><td>{money(t.opex)}</td><td>{money(t.netProfit)}</td><td>{money(t.expenses)}</td><td>{money(t.pending)}</td><td>{t.missingCost || ""}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className={s.detailHead} style={{ marginTop: 18 }}>
				<h3 className={s.h3}>Reparto de utilidades</h3>
				<button className={s.btn} onClick={() => { if (confirm("¿Cargar el reparto combinado (tu panel + la plantilla de Jaime)? Revisa y luego Guardar.")) change({ ...settings, ...COMBINED_REPARTO, fixed: settings.fixed.length ? settings.fixed : COMBINED_REPARTO.fixed }) }}>Usar reparto combinado</button>
			</div>
			<p className={s.muted}>
				Cada mes, de la <b>utilidad real</b> (ya sin gastos de operación) primero salen los compromisos fijos y los destinos con monto fijo, y lo que queda se reparte con los porcentajes. Toca el <b>%</b> o el <b>$</b> de un destino para cambiarlo entre porcentaje y monto fijo al mes. Los porcentajes deben sumar 100%: ahora suman <b className={pctCats.length && Math.abs(pctTotal - 1) > 0.001 ? s.warn : ""}>{pct(pctTotal)}</b>.
			</p>
					<div className={s.cutBar}>
				<label className={s.row}>
					Corte de
					<select className={s.input} value={cut.month} onChange={(e) => setCutMonth(Number(e.target.value))}>
						{MONTHS.map((n, i) => <option key={i} value={i + 1}>{n} {year}</option>)}
					</select>
				</label>
				<span>Utilidad real: <b className={cut.netProfit < 0 ? s.bad : ""}>{money(cut.netProfit)}</b></span>
				<span>Compromisos fijos: <b>{money(cut.fixed)}</b></span>
				<span>Por repartir: <b>{money(cut.toDistribute)}</b></span>
			</div>
			{cut.missingCost > 0 && <p className={s.muted}>Ojo: en {cutName} hay {cut.missingCost} reservas sin costo ({money(cut.salesNoCost)} en ventas) que todavía no cuentan en la utilidad.</p>}
			{cut.netProfit <= 0 && (cut.sales || cut.opex) ? <p className={s.muted}>En {cutName} no hubo utilidad, así que no toca separar nada.</p> : null}
			<div className={s.repGrid}>
			<div className={s.repCards}>
			<h4 className={s.subh}>Compromisos fijos al mes</h4>
			<div className={s.cats}>
				{settings.fixed.map((f, i) => (
					<label key={i} className={s.cat}>
						<input className={s.input} value={f.name} onChange={(e) => setFixed(i, "name", e.target.value)} />
						<span className={s.row}>$<input className={`${s.input} ${s.pctIn}`} inputMode="decimal" value={f.monthly || ""} placeholder="0" onChange={(e) => setFixed(i, "monthly", e.target.value)} /> al mes</span>
						<span className={s.muted}>{f.desc}</span>
						<CutAmount month={cutName} value={cut.fixedSplit[i] ?? 0} of={f.monthly || 0} />
						<button type="button" className={s.linkBtn} onClick={() => change({ ...settings, fixed: settings.fixed.filter((_, j) => j !== i) })}>Quitar</button>
					</label>
				))}
				<button type="button" className={`${s.cat} ${s.addCat}`} onClick={() => change({ ...settings, fixed: [...settings.fixed, { name: "Nuevo compromiso", monthly: 0, desc: "" }] })}>+ Compromiso fijo</button>
			</div>
			<h4 className={s.subh}>Destinos (porcentaje o monto fijo)</h4>
			<div className={s.cats}>
				{settings.reparto.map((c, i) => (
					<label key={i} className={s.cat}>
						<input className={s.input} value={c.name} onChange={(e) => setCat(i, "name", e.target.value)} />
						{isFixedCat(c) ? (
							<span className={s.row}>
								<button type="button" className={s.modeBtn} title="Cambiar a porcentaje" onClick={(e) => { e.preventDefault(); toggleMode(i) }}>$</button>
								<input className={`${s.input} ${s.amountIn}`} inputMode="decimal" value={c.amount || ""} placeholder="0" onChange={(e) => setAmount(i, e.target.value)} /> al mes
							</span>
						) : (
							<span className={s.row}>
								<input className={`${s.input} ${s.pctIn}`} type="number" min={0} max={100} step={1} value={Math.round(c.pct * 1000) / 10} onChange={(e) => setCat(i, "pct", e.target.value)} />
								<button type="button" className={s.modeBtn} title="Cambiar a monto fijo al mes" onClick={(e) => { e.preventDefault(); toggleMode(i) }}>%</button>
							</span>
						)}
						<input className={`${s.input} ${s.descIn}`} value={c.desc} placeholder="Para qué es" onChange={(e) => setCat(i, "desc", e.target.value)} />
						<CutAmount month={cutName} value={cut.reparto[i] ?? 0} of={isFixedCat(c) ? c.amount || 0 : undefined} />
						{settings.reparto.length > 1 && (
							<button type="button" className={s.linkBtn} onClick={() => change({ ...settings, reparto: settings.reparto.filter((_, j) => j !== i), goalIndex: Math.max(0, settings.goalIndex - (i < settings.goalIndex ? 1 : 0)) })}>Quitar</button>
						)}
					</label>
				))}
				<button type="button" className={`${s.cat} ${s.addCat}`} onClick={() => change({ ...settings, reparto: [...settings.reparto, { name: "Nuevo destino", pct: 0, desc: "" }] })}>+ Destino</button>
			</div>
			</div>
			<RepartoDonut settings={settings} cut={cut} monthName={cutName} pctTotal={pctTotal} />
			</div>
			{saveBar}

			<h4 className={s.subh}>Planeado contra lo que de verdad se separó ({year})</h4>
			<p className={s.muted}>"Planeado" es lo que toca según los porcentajes. "Separado" sale de los movimientos de reparto: cada vez que transfieran o aparten dinero, regístrenlo con el botón del destino.</p>
			<div className={s.pvrList}>
				{settings.fixed.map((f) => {
					const real = yearMoves.filter((e) => kindOf(e) === "reparto" && e.destino === f.name).reduce((a, e) => a + e.total, 0)
					return <PlanVsReal key={"f" + f.name} name={f.name} planned={t.fixed} real={real} onAdd={() => newMove("reparto", { destino: f.name, item: f.name })} />
				})}
				{settings.reparto.map((c, i) => (
					<PlanVsReal key={c.name + i} name={c.name} planned={t.reparto[i] ?? 0} real={sum.repartoReal[i] ?? 0} onAdd={() => newMove("reparto", { destino: c.name, item: c.name })} />
				))}
				{Object.entries(sum.otherReparto).map(([name, v]) => (
					<PlanVsReal key={"o" + name} name={`${name} (ya no está en el reparto)`} planned={0} real={v} />
				))}
			</div>

			<h3 className={s.h3}>Meta: {settings.goalName}</h3>
			<div className={s.card}>
				<p>
					Separado de verdad: <b>{money(sum.goal.saved)}</b> en {settings.reparto[settings.goalIndex]?.name ?? "la categoría de la meta"} (planeado {money(sum.goal.planned)}) de una meta de {money(settings.goalMin)}–{money(settings.goalMax)}.
				</p>
				<div className={s.bar2}><i style={{ width: `${Math.min(100, sum.goal.pctMin * 100)}%` }} /></div>
				<p className={s.muted}>{pct(sum.goal.pctMin)} del mínimo · faltan {money(sum.goal.left)}</p>
				<p>
					Para juntarlo en{" "}
					<input className={`${s.input} ${s.pctIn}`} type="number" min={1} max={120} value={settings.goalMonths} onChange={(e) => change({ ...settings, goalMonths: Math.max(1, Number(e.target.value) || 1) })} />{" "}
					meses necesitan una utilidad real de <b>{money(sum.goal.profitNeededMonthly)}</b> al mes (incluye los compromisos fijos): unas ventas de <b>{money(sum.goal.salesNeededMonthly)}</b> al mes (≈ {sum.goal.toursNeededMonthly.toFixed(1)} reservas al mes con su margen real y ticket actuales).
				</p>
				<label className={s.row}>
					Categoría de la meta:{" "}
					<select className={s.input} value={settings.goalIndex} onChange={(e) => change({ ...settings, goalIndex: Number(e.target.value) })}>
						{settings.reparto.map((c, i) => <option key={i} value={i}>{c.name}</option>)}
					</select>
				</label>
				{saveBar}
			</div>

			<h3 className={s.h3}>Escenarios de utilidad anual</h3>
			<p className={s.muted}>Con el margen real ({pct(sum.netMargin)}) y el ticket promedio ({money(sum.ticket)}) de {year}.</p>
			<div className={s.tableWrap}>
				<table className={s.table}>
					<thead><tr><th>Escenario</th><th>Utilidad anual</th><th>Utilidad mensual</th><th>Ventas mensuales</th><th>Ventas anuales</th><th>Reservas al mes</th></tr></thead>
					<tbody>
						{sum.scenarios.map((x) => (
							<tr key={x.name} className={s.static}>
								<td>{x.name}</td><td>{money(x.profit)}</td><td>{money(x.monthlyProfit)}</td><td>{money(x.monthlySales)}</td><td>{money(x.yearlySales)}</td><td>{x.toursPerMonth.toFixed(1)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className={s.detailHead} style={{ marginTop: 24 }}>
				<h3 className={s.h3}>Libro de movimientos {year}</h3>
				<div className={s.row}>
					<button className={`${s.btn} ${s.btnOn}`} onClick={() => newMove("operacion")}>+ Gasto de operación</button>
					<button className={s.btn} onClick={() => newMove("equipo")}>+ Compra de equipo</button>
					<button className={s.btn} onClick={() => newMove("reparto")}>+ Reparto</button>
					<button className={s.btn} onClick={() => newMove("pagoArgo", { item: "Pago de Argo Navis" })}>+ Pago de Argo</button>
					<button className={s.btn} onClick={() => newMove("reembolso", { item: "Reembolso" })}>+ Reembolso</button>
				</div>
			</div>
			<p className={s.muted}>Todo lo que sale de la cuenta de Keabelmet (Banregio) o de la bolsa de un socio. Las reservas y sus costos ya se suman solos desde la pestaña Reservas.</p>
			<div className={s.row}>
				{(["todos", "operacion", "equipo", "reparto", "pagoArgo", "reembolso"] as const).map((k) => (
					<button key={k} className={`${s.btn} ${filter === k ? s.btnOn : ""}`} onClick={() => setFilter(k)}>{k === "todos" ? "Todos" : KIND_LABEL[k]}</button>
				))}
			</div>
			<div className={s.tableWrap}>
				<table className={s.table}>
					<thead><tr><th>Fecha</th><th>Tipo</th><th>Concepto</th><th>Categoría / destino</th><th>Total</th><th>Parte Keabelmet</th><th>Pagó</th><th>Argo</th></tr></thead>
					<tbody>
						{shownMoves.length === 0 && <tr><td colSpan={8} className={s.muted}>Sin movimientos.</td></tr>}
						{shownMoves.map((e) => {
							const k = kindOf(e)
							return (
								<tr key={e.id} onClick={() => setEditExp(e)}>
									<td>{e.dateISO}</td>
									<td>{KIND_LABEL[k]}</td>
									<td>{e.item}</td>
									<td>{k === "reparto" ? e.destino : k === "reembolso" ? `A ${e.destino ?? ""}` : e.category}</td>
									<td>{money(e.total)}</td>
									<td>{k === "operacion" || k === "equipo" ? money(keabelmetShare(e)) : ""}</td>
									<td>{payerOf(e)}</td>
									<td>{e.argoPct ? `${Math.round(e.argoPct * 100)}%` : ""}</td>
								</tr>
							)
						})}
						{shownMoves.length > 0 && (
							<tr className={`${s.static} ${s.totalRow}`}><td>Total</td><td /><td /><td /><td>{money(shownMoves.reduce((a, e) => a + e.total, 0))}</td><td colSpan={3} /></tr>
						)}
					</tbody>
				</table>
			</div>

			<div className={s.twoCols}>
				<div className={s.card}>
					<h3>Dinero que no salió de la cuenta de Keabelmet ({year})</h3>
					<p className={s.muted}>Lo que alguien pagó de su bolsa (socios o gente de fuera, como el equipo que se pagó con dinero externo), cuánto se le ha devuelto con "+ Reembolso" y cuánto se le debe.</p>
					{people.length === 0 && <p className={s.muted}>Nada este año.</p>}
					{people.map((p) => (
						<div key={p.who} className={s.pvr}>
							<b>{p.who}</b>
							<span className={s.row} style={{ justifyContent: "space-between" }}><span className={s.muted}>Pagó de su bolsa</span><span>{money(p.paid)}</span></span>
							<span className={s.row} style={{ justifyContent: "space-between" }}><span className={s.muted}>Ya se le devolvió</span><span>{money(p.back)}</span></span>
							{p.settled ? (
								<span className={s.muted}>Ya no se le debe nada (saldado fuera de Keabelmet).</span>
							) : (
								<span className={s.row} style={{ justifyContent: "space-between" }}><span className={s.muted}>Pendiente</span><b className={p.paid - p.back > 0 ? s.warn : ""}>{money(Math.max(0, p.paid - p.back))}</b></span>
							)}
							{!SETTLED_RE.test(p.who) && (
								<button
									type="button"
									className={s.linkBtn}
									onClick={async () => {
										const on = settings.settled.includes(p.who)
										if (!confirm(on ? `¿Volver a contar lo que pagó ${p.who} como pendiente?` : `¿Marcar que a ${p.who} ya no se le debe nada?`)) return
										const settled = on ? settings.settled.filter((x) => x !== p.who) : [...settings.settled, p.who]
										// Solo guarda este cambio (no otros cambios sin guardar del reparto)
										setSettings((x) => ({ ...x, settled }))
										if (await post({ action: "saveFin", fin: { ...fin, settled } })) await reload()
									}}
								>
									{settings.settled.includes(p.who) ? "Volver a contarlo como pendiente" : "Ya no se le debe nada"}
								</button>
							)}
						</div>
					))}
				</div>
				<div className={s.card}>
					<h3>Cuenta con Argo Navis ({year})</h3>
					<p className={s.muted}>Gastos compartidos (Google, Lightroom…) pagados desde la cuenta de Keabelmet.</p>
					<p className={s.row} style={{ justifyContent: "space-between" }}><span>Parte de Argo</span><b>{money(sum.argo.share)}</b></p>
					<p className={s.row} style={{ justifyContent: "space-between" }}><span>Ya pagó</span><b>{money(sum.argo.paid)}</b></p>
					<p className={s.row} style={{ justifyContent: "space-between" }}><span>Le debe a Keabelmet</span><b className={sum.argo.owes > 0 ? s.warn : ""}>{money(sum.argo.owes)}</b></p>
				</div>
			</div>

			{editExp && (
				<MoveEditor
					move={editExp}
					payers={payers}
					destinos={destinos}
					onClose={() => setEditExp(null)}
					onSave={async (e) => { if (await post({ action: "saveExpense", expense: e })) { setEditExp(null); await reload() } }}
					onDelete={async (id) => { if (confirm("¿Borrar este movimiento?") && (await post({ action: "deleteExpense", id }))) { setEditExp(null); await reload() } }}
				/>
			)}
		</div>
	)
}

function Kpi({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "good" | "bad" }) {
	return (
		<div className={`${s.kpi} ${tone === "good" ? s.kpiGood : tone === "bad" ? s.kpiBad : ""}`}>
			<span className={s.muted}>{label}</span>
			<b>{value}</b>
			{sub && <span className={s.muted}>{sub}</span>}
		</div>
	)
}

function StatementRow({ label, value, strong }: { label: string; value: number; strong?: boolean }) {
	return (
		<p className={`${s.row} ${strong ? s.stmtStrong : ""}`} style={{ justifyContent: "space-between", margin: "4px 0" }}>
			<span>{label}</span>
			<span className={value < 0 && strong ? s.warn : ""}>{money(value)}</span>
		</p>
	)
}

function PlanVsReal({ name, planned, real, onAdd }: { name: string; planned: number; real: number; onAdd?: () => void }) {
	const max = Math.max(planned, real, 1)
	return (
		<div className={s.pvr}>
			<div className={s.row} style={{ justifyContent: "space-between" }}>
				<b>{name}</b>
				<span className={s.muted}>separado {money(real)} de {money(planned)}</span>
			</div>
			<div className={s.pvrBars}>
				<i className={s.pvrPlan} style={{ width: `${(planned / max) * 100}%` }} />
				<i className={s.pvrReal} style={{ width: `${(real / max) * 100}%` }} />
			</div>
			{onAdd && <button type="button" className={s.linkBtn} onClick={onAdd}>+ Registrar lo que se separó</button>}
		</div>
	)
}

/** Barras por mes: ventas, costos + operación, y la utilidad real como punto. */
function MonthChart({ months }: { months: ReturnType<typeof yearSummary>["months"] }) {
	const W = 720
	const H = 240
	const pad = { l: 56, r: 10, t: 14, b: 26 }
	const vals = months.flatMap((m) => [m.sales, m.costs + m.opex, m.netProfit])
	const maxV = Math.max(1, ...vals)
	const minV = Math.min(0, ...vals)
	const y = (v: number) => pad.t + ((maxV - v) / (maxV - minV)) * (H - pad.t - pad.b)
	const cw = (W - pad.l - pad.r) / 12
	const bw = cw * 0.32
	const ticks = [minV, 0, maxV / 2, maxV].filter((v, i, a) => a.indexOf(v) === i)
	const any = months.some((m) => m.sales || m.costs || m.opex)
	if (!any) return <p className={s.muted}>Todavía no hay movimientos este año.</p>
	return (
		<div className={s.chartBox}>
			<svg viewBox={`0 0 ${W} ${H}`} className={s.chart} role="img" aria-label="Ventas, gastos y utilidad real por mes">
				{ticks.map((v) => (
					<g key={v}>
						<line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} className={v === 0 ? s.axis0 : s.grid0} />
						<text x={pad.l - 6} y={y(v) + 4} textAnchor="end" className={s.tick}>{v >= 1000 || v <= -1000 ? `${Math.round(v / 1000)}k` : Math.round(v)}</text>
					</g>
				))}
				{months.map((m, i) => {
					const x0 = pad.l + i * cw + cw * 0.14
					const gastos = m.costs + m.opex
					return (
						<g key={m.month}>
							<rect x={x0} y={y(Math.max(0, m.sales))} width={bw} height={Math.abs(y(0) - y(m.sales))} className={s.barSales}><title>{`${MONTHS[i]}: ventas ${money(m.sales)}`}</title></rect>
							<rect x={x0 + bw + 2} y={y(Math.max(0, gastos))} width={bw} height={Math.abs(y(0) - y(gastos))} className={s.barCosts}><title>{`${MONTHS[i]}: costos y operación ${money(gastos)}`}</title></rect>
							{(m.sales || m.costs || m.opex) ? <circle cx={x0 + bw + 1} cy={y(m.netProfit)} r={4.5} className={m.netProfit >= 0 ? s.dotGood : s.dotBad}><title>{`${MONTHS[i]}: utilidad real ${money(m.netProfit)}`}</title></circle> : null}
							<text x={pad.l + i * cw + cw / 2} y={H - 8} textAnchor="middle" className={s.tick}>{MON[i]}</text>
						</g>
					)
				})}
			</svg>
			<div className={s.legend}>
				<span><i className={s.lgSales} /> Ventas</span>
				<span><i className={s.lgCosts} /> Costos de tours + operación</span>
				<span><i className={s.lgDot} /> Utilidad real</span>
			</div>
		</div>
	)
}

function MoveEditor({ move, payers, destinos, onSave, onDelete, onClose }: { move: Partial<Expense>; payers: string[]; destinos: string[]; onSave: (e: Partial<Expense>) => void; onDelete: (id: string) => void; onClose: () => void }) {
	const [e, setE] = useState<Partial<Expense>>({ ...move, kind: move.kind ?? (move.id ? "equipo" : "operacion"), paidFrom: move.paidFrom ?? (move.investor || COMPANY_ACCOUNT) })
	const set = (k: keyof Expense, v: unknown) => setE((x) => ({ ...x, [k]: v }))
	const val = (k: keyof Expense) => (e[k] === null || e[k] === undefined ? "" : String(e[k]))
	const k = e.kind as MovementKind
	const isSpend = k === "operacion" || k === "equipo"
	const shared = (e.argoPct ?? 0) > 0
	return (
		<div className={s.modalBg} onClick={onClose}>
			<form
				className={s.modal}
				onClick={(ev) => ev.stopPropagation()}
				onSubmit={(ev) => {
					ev.preventDefault()
					onSave({ ...e, investor: isSpend ? e.paidFrom ?? "" : e.investor ?? "", item: e.item || (k === "reparto" ? e.destino : k === "pagoArgo" ? "Pago de Argo Navis" : k === "reembolso" ? `Reembolso a ${e.destino ?? ""}` : "") || "" })
				}}
			>
				<div className={s.detailHead}><h3>{e.id ? "Editar movimiento" : "Nuevo movimiento"}</h3></div>
				<div className={s.grid}>
					<label className={s.full}>
						Tipo
						<select className={s.input} value={k} onChange={(x) => set("kind", x.target.value)}>
							{MOVEMENT_KINDS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
						</select>
						<span className={s.muted}>{MOVEMENT_KINDS.find((m) => m.id === k)?.hint}</span>
					</label>
					<label>Fecha<input className={s.input} type="date" required value={val("dateISO")} onChange={(x) => set("dateISO", x.target.value)} /></label>
					{k === "reembolso" ? (
						<label>
							¿A quién se le devolvió?
							<input className={s.input} list="mv-payers" required value={val("destino")} onChange={(x) => set("destino", x.target.value)} />
							<datalist id="mv-payers">{payers.filter((p) => p !== COMPANY_ACCOUNT).map((p) => <option key={p} value={p} />)}</datalist>
						</label>
					) : k === "reparto" ? (
						<label>
							Destino
							<select className={s.input} required value={val("destino")} onChange={(x) => set("destino", x.target.value)}>
								<option value="">Elige…</option>
								{destinos.map((d) => <option key={d} value={d}>{d}</option>)}
							</select>
						</label>
					) : isSpend ? (
						<label>
							Categoría
							<input className={s.input} list="mv-cats" value={val("category")} onChange={(x) => set("category", x.target.value)} placeholder={k === "equipo" ? "Equipo Safaris, Equipo Buceo…" : "Gasolina, Publicidad…"} />
							<datalist id="mv-cats">{(k === "operacion" ? OPEX_CATEGORIES : ["Equipo Safaris", "Equipo Buceo", "Ilustraciones y material", "Embarcación"]).map((c) => <option key={c} value={c} />)}</datalist>
						</label>
					) : <span />}
					<label className={s.full}>{k === "reparto" || k === "pagoArgo" || k === "reembolso" ? "Concepto (opcional)" : "Concepto"}<input className={s.input} value={val("item")} onChange={(x) => set("item", x.target.value)} placeholder={k === "reparto" ? "Transferencia al apartado…" : ""} /></label>
					{k === "equipo" && (
						<>
							<label>Precio unitario<input className={s.input} inputMode="decimal" value={val("unitPrice")} onChange={(x) => set("unitPrice", x.target.value)} /></label>
							<label>Cantidad<input className={s.input} inputMode="decimal" value={val("qty")} onChange={(x) => set("qty", x.target.value)} /></label>
						</>
					)}
					<label>{k === "equipo" ? "Total" : "Monto"}<input className={s.input} inputMode="decimal" required={k !== "equipo"} value={val("total")} onChange={(x) => set("total", x.target.value)} placeholder={k === "equipo" ? "Si lo dejas vacío: precio × cantidad" : ""} /></label>
					{isSpend && (
						<>
							<label>Proveedor<input className={s.input} value={val("provider")} onChange={(x) => set("provider", x.target.value)} /></label>
							<label className={s.wide}>
								¿De dónde salió el dinero?
								<input className={s.input} list="mv-payers" value={val("paidFrom")} onChange={(x) => set("paidFrom", x.target.value)} />
								<datalist id="mv-payers">{payers.map((p) => <option key={p} value={p} />)}</datalist>
								<span className={s.muted}>"{COMPANY_ACCOUNT}" = la Banregio de la empresa. Si pagó alguien de su bolsa, pon su nombre: Keabelmet se lo debe hasta registrar un reembolso. Si ya se saldó con dinero de fuera, escribe "Dinero externo (saldado)".</span>
							</label>
							<label className={s.full}>
								<span className={s.row}>
									<input type="checkbox" checked={shared} onChange={(x) => set("argoPct", x.target.checked ? 0.5 : 0)} /> Compartido con Argo Navis
								</span>
								{shared && (
									<span className={s.row}>
										Parte de Argo: <input className={`${s.input} ${s.pctIn}`} type="number" min={1} max={100} value={Math.round((e.argoPct ?? 0) * 100)} onChange={(x) => set("argoPct", Math.max(0, Math.min(100, Number(x.target.value) || 0)) / 100)} />%
									</span>
								)}
							</label>
						</>
					)}
					<label className={s.full}>Notas<textarea className={s.input} rows={2} value={val("notes")} onChange={(x) => set("notes", x.target.value)} /></label>
				</div>
				<div className={s.modalFoot}>
					{e.id ? <button type="button" className={`${s.btn} ${s.btnWarn}`} onClick={() => onDelete(e.id!)}>Borrar</button> : <span />}
					<div className={s.row}>
						<button type="button" className={s.btn} onClick={onClose}>Cerrar</button>
						<button className={`${s.btn} ${s.btnOn}`}>Guardar</button>
					</div>
				</div>
			</form>
		</div>
	)
}

/** Lo que le toca a un compromiso o destino en el mes del corte. `of`: monto fijo pedido (si no alcanzó, se muestra). */
function CutAmount({ month, value, of }: { month: string; value: number; of?: number }) {
	const short = of !== undefined && of > 0 && value < of - 0.5
	return (
		<span className={s.cutAmt}>
			En {month}: <b>{money(value)}</b>
			{short && <span className={s.warn}> de {money(of)} (no alcanzó)</span>}
		</span>
	)
}

/**
 * Colores de los destinos, en orden fijo por posición (no por tamaño): paleta
 * categórica validada para modo oscuro sobre el fondo del panel (contraste y
 * daltonismo). Los compromisos fijos van en tonos neutros.
 */
const DEST_COLORS = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#0ca30c", "#9085e9", "#e66767"]
const FIXED_TONES = ["#8f897c", "#c2bba9", "#6f6a5f", "#a9a293"]
const OTHER_COLOR = "#5d6b73"

interface Slice {
	key: string
	name: string
	value: number
	color: string
	group: "fijo" | "destino"
}

function RepartoDonut({ settings, cut, monthName, pctTotal }: { settings: FinSettings; cut: ReturnType<typeof yearSummary>["months"][number]; monthName: string; pctTotal: number }) {
	const [hover, setHover] = useState<string | null>(null)
	// Con utilidad: pesos reales del mes. Sin utilidad: solo cómo quedan los porcentajes.
	const byMoney = cut.netProfit > 0
	const slices: Slice[] = []
	if (byMoney) {
		settings.fixed.forEach((fx, i) => slices.push({ key: "f" + i, name: fx.name, value: cut.fixedSplit[i] ?? 0, color: FIXED_TONES[i % FIXED_TONES.length], group: "fijo" }))
	}
	let other = 0
	settings.reparto.forEach((c, i) => {
		const v = byMoney ? cut.reparto[i] ?? 0 : isFixedCat(c) ? 0 : c.pct
		// Del destino 9 en adelante se juntan en "Otros destinos" (8 colores como máximo)
		if (i >= DEST_COLORS.length) other += v
		else slices.push({ key: "d" + i, name: c.name, value: v, color: DEST_COLORS[i], group: "destino" })
	})
	if (other > 0) slices.push({ key: "otros", name: "Otros destinos", value: other, color: OTHER_COLOR, group: "destino" })
	const shown = slices.filter((x) => x.value > 0.0001)

	const base = byMoney ? cut.netProfit : 1
	const assigned = shown.reduce((a, x) => a + x.value, 0)
	const free = Math.max(0, base - assigned)
	const over = assigned - base > base * 0.001
	const ringTotal = Math.max(base, assigned)
	const share = (v: number) => (base > 0 ? v / base : 0)
	const fmt = (v: number) => (byMoney ? money(v) : pct(v))

	// Anillo: cada rebanada es un trazo del círculo con 2px de separación
	const R0 = 80
	const C = 2 * Math.PI * R0
	const GAP = shown.length > 1 ? 2 : 0
	let offset = 0
	const arcs = shown.map((x) => {
		const len = (x.value / ringTotal) * C
		const a = { ...x, dash: Math.max(0.5, len - GAP), offset }
		offset += len
		return a
	})
	const active = shown.find((x) => x.key === hover)

	return (
		<aside className={s.repChart}>
			<p className={s.subh} style={{ marginTop: 0 }}>{byMoney ? `Reparto de ${monthName}` : "Reparto por porcentajes"}</p>
			<div className={s.donutWrap}>
				<svg viewBox="0 0 200 200" className={s.donut} role="img" aria-label={`Reparto de ${monthName}: ${shown.map((x) => `${x.name} ${pct(share(x.value))}`).join(", ")}`}>
					<circle cx="100" cy="100" r={R0} className={s.donutTrack} />
					<g transform="rotate(-90 100 100)">
						{arcs.map((a) => (
							<circle
								key={a.key}
								cx="100"
								cy="100"
								r={R0}
								fill="none"
								stroke={a.color}
								strokeWidth={hover === a.key ? 30 : 24}
								strokeDasharray={`${a.dash} ${C - a.dash}`}
								strokeDashoffset={-a.offset}
								onMouseEnter={() => setHover(a.key)}
								onMouseLeave={() => setHover(null)}
								style={{ opacity: hover && hover !== a.key ? 0.45 : 1, transition: "opacity .15s, stroke-width .15s", cursor: "default" }}
							>
								<title>{`${a.name}: ${fmt(a.value)} (${pct(share(a.value))})`}</title>
							</circle>
						))}
					</g>
				</svg>
				<div className={s.donutCenter}>
					{active ? (
						<>
							<small>{active.name}</small>
							<b>{pct(share(active.value))}</b>
							{byMoney && <small>{money(active.value)}</small>}
						</>
					) : (
						<>
							<b className={over ? s.warn : ""}>{pct(share(assigned))}</b>
							<small>{over ? "te pasas del 100%" : free > base * 0.001 ? "asignado" : "asignado ✓"}</small>
							{byMoney ? <small>de {money(base)}</small> : <small>sin utilidad en {monthName}</small>}
						</>
					)}
				</div>
			</div>
			{!byMoney && <p className={s.muted}>En {monthName} no hubo utilidad: el círculo muestra solo cómo se reparten los porcentajes (los montos fijos se cubren primero cuando haya utilidad).</p>}
			{byMoney && Math.abs(pctTotal - 1) > 0.001 && <p className={s.muted}>Los porcentajes suman {pct(pctTotal)}{pctTotal < 1 ? `: falta asignar ${pct(1 - pctTotal)} de lo que queda` : ": se pasan del 100%"}.</p>}
			<ul className={s.donutLegend}>
				{(["fijo", "destino"] as const).map((g) =>
					shown.some((x) => x.group === g) ? (
						<li key={g} className={s.donutGroup}>{g === "fijo" ? "Compromisos fijos" : "Destinos"}</li>
					) : null,
				).flatMap((head, gi) => {
					const g = gi === 0 ? "fijo" : "destino"
					return [head, ...shown.filter((x) => x.group === g).map((x) => (
						<li key={x.key} className={hover === x.key ? s.donutOn : ""} onMouseEnter={() => setHover(x.key)} onMouseLeave={() => setHover(null)}>
							<i style={{ background: x.color }} />
							<span>{x.name}</span>
							<em>{pct(share(x.value))}</em>
							{byMoney && <b>{money(x.value)}</b>}
						</li>
					))]
				})}
				{free > base * 0.001 && (
					<li className={s.donutFree}>
						<i />
						<span>Sin asignar</span>
						<em>{pct(share(free))}</em>
						{byMoney && <b>{money(free)}</b>}
					</li>
				)}
			</ul>
		</aside>
	)
}
