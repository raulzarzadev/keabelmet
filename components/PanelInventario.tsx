"use client"

import { useState } from "react"
import s from "./ReservasPanel.module.css"
import type { InventoryItem } from "@/lib/finance-calc"

type Post = (body: Record<string, unknown>) => Promise<unknown>

const STATES = ["Bueno", "Mantenimiento", "Crítico"]

function stateClass(c: string) {
	const t = c.toLowerCase()
	if (t.startsWith("cr")) return s.bad
	if (t.startsWith("mant")) return s.warn
	return ""
}

export default function PanelInventario({ items, post, reload }: { items: InventoryItem[]; post: Post; reload: () => Promise<void> }) {
	const [edit, setEdit] = useState<Partial<InventoryItem> | null>(null)
	const [q, setQ] = useState("")
	const list = items.filter((i) => !q || `${i.item} ${i.category} ${i.location} ${i.description} ${i.condition}`.toLowerCase().includes(q.toLowerCase()))
	const attention = items.filter((i) => /^(cr|mant)/i.test(i.condition))

	return (
		<div>
			<div className={s.monthBar}>
				<h2 className={s.month} style={{ textAlign: "left" }}>Inventario</h2>
				<input className={s.input} style={{ maxWidth: 260 }} placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)} />
				<button className={`${s.btn} ${s.btnOn}`} onClick={() => setEdit({ condition: "Bueno" })}>+ Artículo</button>
			</div>
			{attention.length > 0 && (
				<p className={s.notice}>Requieren atención: {attention.map((i) => `${i.item.trim()} (${i.condition.trim()})`).join(", ")}</p>
			)}
			<div className={s.tableWrap}>
				<table className={s.table}>
					<thead><tr><th>Artículo</th><th>Categoría</th><th>Cant.</th><th>Estado</th><th>Ubicación</th><th>Descripción</th></tr></thead>
					<tbody>
						{list.length === 0 && <tr><td colSpan={6} className={s.muted}>Sin artículos.</td></tr>}
						{list.map((i) => (
							<tr key={i.id} onClick={() => setEdit(i)}>
								<td>{i.item}</td><td>{i.category}</td><td>{i.qty ?? ""}</td><td className={stateClass(i.condition)}>{i.condition}</td><td>{i.location}</td><td>{i.description}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{edit && (
				<ItemEditor
					item={edit}
					onClose={() => setEdit(null)}
					onSave={async (it) => { if (await post({ action: "saveItem", item: it })) { setEdit(null); await reload() } }}
					onDelete={async (id) => { if (confirm("¿Borrar este artículo?") && (await post({ action: "deleteItem", id }))) { setEdit(null); await reload() } }}
				/>
			)}
		</div>
	)
}

function ItemEditor({ item, onSave, onDelete, onClose }: { item: Partial<InventoryItem>; onSave: (i: Partial<InventoryItem>) => void; onDelete: (id: string) => void; onClose: () => void }) {
	const [it, setIt] = useState<Partial<InventoryItem>>(item)
	const set = (k: keyof InventoryItem, v: unknown) => setIt((x) => ({ ...x, [k]: v }))
	const val = (k: keyof InventoryItem) => (it[k] === null || it[k] === undefined ? "" : String(it[k]))
	const states = STATES.includes(val("condition").trim()) || !val("condition") ? STATES : [val("condition"), ...STATES]
	return (
		<div className={s.modalBg} onClick={onClose}>
			<form className={s.modal} onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); onSave(it) }}>
				<div className={s.detailHead}><h3>{it.id ? "Editar artículo" : "Nuevo artículo"}</h3></div>
				<div className={s.grid}>
					<label className={s.full}>Artículo<input className={s.input} required value={val("item")} onChange={(e) => set("item", e.target.value)} /></label>
					<label>Categoría<input className={s.input} value={val("category")} onChange={(e) => set("category", e.target.value)} placeholder="Operación, Media, Equipo de playa…" /></label>
					<label>Cantidad<input className={s.input} inputMode="numeric" value={val("qty")} onChange={(e) => set("qty", e.target.value)} /></label>
					<label>Estado
						<select className={s.input} value={val("condition").trim()} onChange={(e) => set("condition", e.target.value)}>
							{states.map((x) => <option key={x} value={x.trim()}>{x.trim()}</option>)}
						</select>
					</label>
					<label>Ubicación<input className={s.input} value={val("location")} onChange={(e) => set("location", e.target.value)} placeholder="Quién lo tiene" /></label>
					<label className={s.full}>Descripción<textarea className={s.input} rows={2} value={val("description")} onChange={(e) => set("description", e.target.value)} /></label>
				</div>
				<div className={s.modalFoot}>
					{it.id ? <button type="button" className={`${s.btn} ${s.btnWarn}`} onClick={() => onDelete(it.id!)}>Borrar</button> : <span />}
					<div className={s.row}>
						<button type="button" className={s.btn} onClick={onClose}>Cerrar</button>
						<button className={`${s.btn} ${s.btnOn}`}>Guardar</button>
					</div>
				</div>
			</form>
		</div>
	)
}
