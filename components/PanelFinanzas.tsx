"use client"

import { useMemo, useState } from "react"
import s from "./ReservasPanel.module.css"
import { yearSummary, type Expense, type FinBooking, type FinSettings } from "@/lib/finance-calc"

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`
const pct = (n: number) => `${(n * 100).toFixed(1)}%`

type Post = (body: Record<string, unknown>) => Promise<unknown>

export default function PanelFinanzas({ bookings, expenses, fin, post, reload }: { bookings: FinBooking[]; expenses: Expense[]; fin: FinSettings; post: Post; reload: () => Promise<void> }) {
	const [year, setYear] = useState(new Date().getFullYear())
	const [editExp, setEditExp] = useState<Partial<Expense> | null>(null)
	const [settings, setSettings] = useState<FinSettings>(fin)
	const [dirty, setDirty] = useState(false)
	const sum = useMemo(() => yearSummary(bookings, expenses, settings, year), [bookings, expenses, settings, year])
	const yearExpenses = expenses.filter((e) => e.dateISO.startsWith(String(year)))
	const pctTotal = settings.reparto.reduce((a, c) => a + c.pct, 0)
	const t = sum.totals

	function setCat(i: number, k: "pct" | "name", v: string) {
		setDirty(true)
		setSettings((x) => ({ ...x, reparto: x.reparto.map((c, j) => (j === i ? { ...c, [k]: k === "pct" ? Math.max(0, Math.min(100, Number(v) || 0)) / 100 : v } : c)) }))
	}

	const saveBar = dirty ? (
		<div className={s.row}>
			<button className={`${s.btn} ${s.btnOn}`} onClick={async () => { if (await post({ action: "saveFin", fin: settings })) { setDirty(false); await reload() } }}>Guardar cambios</button>
			<button className={s.btn} onClick={() => { setSettings(fin); setDirty(false) }}>Deshacer</button>
		</div>
	) : null

	return (
		<div className={s.fin}>
			<div className={s.monthBar}>
				<button className={s.btn} onClick={() => setYear(year - 1)}>‹</button>
				<h2 className={s.month}>Finanzas {year}</h2>
				<button className={s.btn} onClick={() => setYear(year + 1)}>›</button>
			</div>

			<div className={s.kpis}>
				<Kpi label="Ventas" value={money(t.sales)} sub={`${t.bookings} reservas · ${t.people} personas`} />
				<Kpi label="Pagado a proveedores" value={money(t.costs)} />
				<Kpi label="Utilidad de tours" value={money(t.profit)} sub={`Margen ${pct(sum.margin)}`} />
				<Kpi label="Gastos de equipo" value={money(t.expenses)} />
				<Kpi label="Por cobrar" value={money(t.pending)} />
				<Kpi label="Ticket promedio" value={money(sum.ticket)} sub="por reserva" />
			</div>
			{t.missingCost > 0 && (
				<p className={s.notice}>Hay {t.missingCost} reservas sin costo de proveedor ({money(t.salesNoCost)} en ventas). No cuentan en la utilidad ni en el reparto hasta que captures su costo (Reservas → abre la reserva → Costo).</p>
			)}

			<h3 className={s.h3}>Mes por mes</h3>
			<div className={s.tableWrap}>
				<table className={s.table}>
					<thead>
						<tr><th>Mes</th><th>Reservas</th><th>Personas</th><th>Ventas</th><th>Proveedores</th><th>Utilidad</th><th>Gastos equipo</th><th>Por cobrar</th><th>Sin costo</th></tr>
					</thead>
					<tbody>
						{sum.months.map((m) => (
							<tr key={m.month} className={s.static}>
								<td>{MONTHS[m.month - 1]}</td>
								<td>{m.bookings || ""}</td>
								<td>{m.people || ""}</td>
								<td>{m.sales ? money(m.sales) : ""}</td>
								<td>{m.costs ? money(m.costs) : ""}</td>
								<td>{m.sales || m.costs ? money(m.profit) : ""}</td>
								<td>{m.expenses ? money(m.expenses) : ""}</td>
								<td>{m.pending ? money(m.pending) : ""}</td>
								<td className={m.missingCost ? s.warn : ""}>{m.missingCost || ""}</td>
							</tr>
						))}
						<tr className={`${s.static} ${s.totalRow}`}>
							<td>Total</td><td>{t.bookings}</td><td>{t.people}</td><td>{money(t.sales)}</td><td>{money(t.costs)}</td><td>{money(t.profit)}</td><td>{money(t.expenses)}</td><td>{money(t.pending)}</td><td>{t.missingCost || ""}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h3 className={s.h3}>Reparto de utilidades</h3>
			<p className={s.muted}>La utilidad de cada mes (ventas menos lo que se paga al proveedor) se reparte con estos porcentajes. Deben sumar 100%: ahora suman <b className={Math.abs(pctTotal - 1) > 0.001 ? s.warn : ""}>{pct(pctTotal)}</b>.</p>
			<div className={s.cats}>
				{settings.reparto.map((c, i) => (
					<label key={i} className={s.cat}>
						<input className={s.input} value={c.name} onChange={(e) => setCat(i, "name", e.target.value)} />
						<span className={s.row}>
							<input className={`${s.input} ${s.pctIn}`} type="number" min={0} max={100} step={1} value={Math.round(c.pct * 1000) / 10} onChange={(e) => setCat(i, "pct", e.target.value)} />%
						</span>
						<span className={s.muted}>{c.desc}</span>
					</label>
				))}
			</div>
			{saveBar}
			<div className={s.tableWrap}>
				<table className={s.table}>
					<thead>
						<tr><th>Mes</th><th>Utilidad</th>{settings.reparto.map((c, i) => <th key={i}>{c.name}</th>)}</tr>
					</thead>
					<tbody>
						{sum.months.filter((m) => m.sales || m.costs).map((m) => (
							<tr key={m.month} className={s.static}>
								<td>{MONTHS[m.month - 1]}</td>
								<td>{money(m.profit)}</td>
								{m.reparto.map((v, i) => <td key={i}>{money(v)}</td>)}
							</tr>
						))}
						<tr className={`${s.static} ${s.totalRow}`}>
							<td>Total</td><td>{money(t.profit)}</td>{t.reparto.map((v, i) => <td key={i}>{money(v)}</td>)}
						</tr>
					</tbody>
				</table>
			</div>

			<h3 className={s.h3}>Meta: {settings.goalName}</h3>
			<div className={s.card}>
				<p>
					Llevas <b>{money(sum.goal.saved)}</b> en {settings.reparto[settings.goalIndex]?.name ?? "la categoría de la meta"} de una meta de {money(settings.goalMin)}–{money(settings.goalMax)}.
				</p>
				<div className={s.bar2}><i style={{ width: `${Math.min(100, sum.goal.pctMin * 100)}%` }} /></div>
				<p className={s.muted}>{pct(sum.goal.pctMin)} del mínimo · faltan {money(sum.goal.left)}</p>
				<p>
					Para juntarlo en{" "}
					<input className={`${s.input} ${s.pctIn}`} type="number" min={1} max={120} value={settings.goalMonths} onChange={(e) => { setDirty(true); setSettings({ ...settings, goalMonths: Math.max(1, Number(e.target.value) || 1) }) }} />{" "}
					meses necesitas una utilidad de <b>{money(sum.goal.profitNeededMonthly)}</b> al mes: unas ventas de <b>{money(sum.goal.salesNeededMonthly)}</b> al mes (≈ {sum.goal.toursNeededMonthly.toFixed(1)} reservas al mes con tu margen y ticket actuales).
				</p>
				{saveBar}
			</div>

			<h3 className={s.h3}>Escenarios de utilidad anual</h3>
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
				<h3 className={s.h3}>Gastos {year}</h3>
				<button className={`${s.btn} ${s.btnOn}`} onClick={() => setEditExp({ dateISO: new Date().toISOString().slice(0, 10) })}>+ Gasto</button>
			</div>
			<div className={s.tableWrap}>
				<table className={s.table}>
					<thead><tr><th>Fecha</th><th>Artículo</th><th>Precio unit.</th><th>Cant.</th><th>Total</th><th>Proveedor</th><th>Inversionista</th><th>Categoría</th></tr></thead>
					<tbody>
						{yearExpenses.length === 0 && <tr><td colSpan={8} className={s.muted}>Sin gastos este año.</td></tr>}
						{yearExpenses.map((e) => (
							<tr key={e.id} onClick={() => setEditExp(e)}>
								<td>{e.dateISO}</td><td>{e.item}</td><td>{e.unitPrice !== null ? money(e.unitPrice) : ""}</td><td>{e.qty ?? ""}</td><td>{money(e.total)}</td><td>{e.provider}</td><td>{e.investor}</td><td>{e.category}</td>
							</tr>
						))}
						{yearExpenses.length > 0 && (
							<tr className={`${s.static} ${s.totalRow}`}><td>Total</td><td /><td /><td /><td>{money(yearExpenses.reduce((a, e) => a + e.total, 0))}</td><td colSpan={3} /></tr>
						)}
					</tbody>
				</table>
			</div>

			{editExp && (
				<ExpenseEditor
					expense={editExp}
					onClose={() => setEditExp(null)}
					onSave={async (e) => { if (await post({ action: "saveExpense", expense: e })) { setEditExp(null); await reload() } }}
					onDelete={async (id) => { if (confirm("¿Borrar este gasto?") && (await post({ action: "deleteExpense", id }))) { setEditExp(null); await reload() } }}
				/>
			)}
		</div>
	)
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
	return (
		<div className={s.kpi}>
			<span className={s.muted}>{label}</span>
			<b>{value}</b>
			{sub && <span className={s.muted}>{sub}</span>}
		</div>
	)
}

function ExpenseEditor({ expense, onSave, onDelete, onClose }: { expense: Partial<Expense>; onSave: (e: Partial<Expense>) => void; onDelete: (id: string) => void; onClose: () => void }) {
	const [e, setE] = useState<Partial<Expense>>(expense)
	const set = (k: keyof Expense, v: unknown) => setE((x) => ({ ...x, [k]: v }))
	const val = (k: keyof Expense) => (e[k] === null || e[k] === undefined ? "" : String(e[k]))
	return (
		<div className={s.modalBg} onClick={onClose}>
			<form className={s.modal} onClick={(ev) => ev.stopPropagation()} onSubmit={(ev) => { ev.preventDefault(); onSave(e) }}>
				<div className={s.detailHead}><h3>{e.id ? "Editar gasto" : "Nuevo gasto"}</h3></div>
				<div className={s.grid}>
					<label>Fecha<input className={s.input} type="date" required value={val("dateISO")} onChange={(x) => set("dateISO", x.target.value)} /></label>
					<label>Categoría<input className={s.input} value={val("category")} onChange={(x) => set("category", x.target.value)} placeholder="Equipo Safaris, Equipo Buceo…" /></label>
					<label className={s.full}>Artículo<input className={s.input} value={val("item")} onChange={(x) => set("item", x.target.value)} /></label>
					<label>Precio unitario<input className={s.input} inputMode="decimal" value={val("unitPrice")} onChange={(x) => set("unitPrice", x.target.value)} /></label>
					<label>Cantidad<input className={s.input} inputMode="decimal" value={val("qty")} onChange={(x) => set("qty", x.target.value)} /></label>
					<label>Total<input className={s.input} inputMode="decimal" value={val("total")} onChange={(x) => set("total", x.target.value)} placeholder="Si lo dejas vacío: precio × cantidad" /></label>
					<label>Proveedor<input className={s.input} value={val("provider")} onChange={(x) => set("provider", x.target.value)} /></label>
					<label className={s.wide}>Inversionista<input className={s.input} value={val("investor")} onChange={(x) => set("investor", x.target.value)} /></label>
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
