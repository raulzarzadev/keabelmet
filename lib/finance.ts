/**
 * Gastos, inventario y ajustes de finanzas del panel en Redis.
 *
 *   gx           hash  id -> JSON del gasto
 *   inv          hash  id -> JSON del artículo de inventario
 *   fin:settings JSON  reparto de utilidades, meta (pickup) y escenarios
 */
import crypto from "node:crypto"
import { kv } from "@/lib/kv"
import { DEFAULT_FIN, sanitizeFinSettings, type Expense, type FinSettings, type InventoryItem } from "@/lib/finance-calc"

const newId = (p: string) => `${p}_${crypto.randomBytes(6).toString("hex")}`
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : typeof v === "number" ? String(v) : "")
const numOrNull = (v: unknown) => {
	if (v === "" || v === null || v === undefined) return null
	const n = Number(String(v).replace(/[$,\s]/g, ""))
	return Number.isFinite(n) ? n : null
}

async function listHash<T>(key: string): Promise<T[]> {
	const raw = (await kv("HGETALL", key)) as string[] | null
	const out: T[] = []
	if (Array.isArray(raw)) for (let i = 1; i < raw.length; i += 2) {
		try {
			out.push(JSON.parse(raw[i]) as T)
		} catch {
			/* ignora basura */
		}
	}
	return out
}

async function saveHash(key: string, items: { id: string }[]) {
	if (!items.length) return
	const args: (string | number)[] = ["HSET", key]
	for (const it of items) args.push(it.id, JSON.stringify(it))
	await kv(...args)
}

export async function listExpenses(): Promise<Expense[]> {
	return (await listHash<Expense>("gx")).sort((a, b) => a.dateISO.localeCompare(b.dateISO) || a.createdAt - b.createdAt)
}

export async function listInventory(): Promise<InventoryItem[]> {
	return (await listHash<InventoryItem>("inv")).sort((a, b) => a.category.localeCompare(b.category) || a.item.localeCompare(b.item))
}

export async function getFinSettings(): Promise<FinSettings> {
	const raw = await kv("GET", "fin:settings")
	if (typeof raw !== "string") return DEFAULT_FIN
	try {
		return sanitizeFinSettings(JSON.parse(raw))
	} catch {
		return DEFAULT_FIN
	}
}

export async function saveFinSettings(s: unknown): Promise<FinSettings> {
	const clean = sanitizeFinSettings(s)
	await kv("SET", "fin:settings", JSON.stringify(clean))
	return clean
}

export function sanitizeExpense(input: Record<string, unknown>, base?: Expense | null): Expense {
	const dateISO = str(input.dateISO, 10)
	if (!DATE_RE.test(dateISO)) throw new Error("Fecha inválida")
	const unitPrice = numOrNull(input.unitPrice)
	const qty = numOrNull(input.qty)
	const total = numOrNull(input.total) ?? (unitPrice !== null && qty !== null ? unitPrice * qty : null)
	if (total === null) throw new Error("Falta el total")
	const now = Date.now()
	return {
		id: base?.id ?? newId("g"),
		dateISO,
		item: str(input.item, 160),
		unitPrice,
		qty,
		total,
		provider: str(input.provider, 120),
		investor: str(input.investor, 120),
		category: str(input.category, 80),
		notes: str(input.notes, 500),
		imported: base?.imported,
		createdAt: base?.createdAt ?? now,
		updatedAt: now,
	}
}

export function sanitizeItem(input: Record<string, unknown>, base?: InventoryItem | null): InventoryItem {
	const item = str(input.item, 120)
	if (!item) throw new Error("Falta el artículo")
	const now = Date.now()
	return {
		id: base?.id ?? newId("i"),
		item,
		category: str(input.category, 80),
		qty: numOrNull(input.qty),
		condition: str(input.condition, 40),
		location: str(input.location, 80),
		description: str(input.description, 300),
		imported: base?.imported,
		createdAt: base?.createdAt ?? now,
		updatedAt: now,
	}
}

export async function getExpense(id: string): Promise<Expense | null> {
	const raw = await kv("HGET", "gx", id)
	return typeof raw === "string" ? (JSON.parse(raw) as Expense) : null
}
export async function getItem(id: string): Promise<InventoryItem | null> {
	const raw = await kv("HGET", "inv", id)
	return typeof raw === "string" ? (JSON.parse(raw) as InventoryItem) : null
}
export const saveExpenses = (list: Expense[]) => saveHash("gx", list)
export const saveItems = (list: InventoryItem[]) => saveHash("inv", list)
export const deleteExpense = (id: string) => kv("HDEL", "gx", id)
export const deleteItem = (id: string) => kv("HDEL", "inv", id)

/** Reemplaza lo importado antes del libro de presupuesto (no toca lo capturado en el panel). */
export async function replaceImportedFinance(expenses: Expense[], items: InventoryItem[]) {
	const [oldG, oldI] = await Promise.all([listExpenses(), listInventory()])
	const delG = oldG.filter((e) => e.imported).map((e) => e.id)
	const delI = oldI.filter((i) => i.imported).map((i) => i.id)
	if (delG.length) await kv("HDEL", "gx", ...delG)
	if (delI.length) await kv("HDEL", "inv", ...delI)
	await saveExpenses(expenses)
	await saveItems(items)
}
