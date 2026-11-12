import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import {
	ACTIVITIES,
	deleteBooking,
	getBooking,
	getSince,
	kvConfigured,
	listBookings,
	sanitizeBooking,
	saveBookings,
	syncFromStripe,
} from "@/lib/bookings"
import {
	deleteExpense,
	deleteItem,
	getExpense,
	getFinSettings,
	getItem,
	listExpenses,
	listInventory,
	sanitizeExpense,
	sanitizeItem,
	saveExpenses,
	saveFinSettings,
	saveItems,
} from "@/lib/finance"
import { RESERVAS_COOKIE, checkReservasPassword, isReservasRequest, reservasToken } from "@/lib/reservas-auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const noStore = { "Cache-Control": "no-store" }

export async function GET(req: NextRequest) {
	if (!isReservasRequest(req)) return NextResponse.json({ auth: false }, { status: 401, headers: noStore })
	if (!kvConfigured()) return NextResponse.json({ auth: true, configured: false }, { headers: noStore })

	let sync: { added: number; checked: number; skipped?: string; error?: string } = { added: 0, checked: 0 }
	try {
		sync = await syncFromStripe(getStripe(), { force: req.nextUrl.searchParams.get("sync") === "1" })
	} catch (err) {
		sync = { added: 0, checked: 0, error: err instanceof Error ? err.message : "error" }
	}
	const [bookings, since, expenses, inventory, fin] = await Promise.all([listBookings(), getSince(), listExpenses(), listInventory(), getFinSettings()])
	return NextResponse.json({ auth: true, configured: true, since, sync, bookings, activities: ACTIVITIES, expenses, inventory, fin }, { headers: noStore })
}

export async function POST(req: NextRequest) {
	const body = (await req.json().catch(() => ({}))) as Record<string, unknown>
	const action = body.action

	if (action === "login") {
		if (!checkReservasPassword(String(body.password ?? ""))) {
			return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
		}
		const res = NextResponse.json({ ok: true })
		res.cookies.set(RESERVAS_COOKIE, reservasToken()!, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 })
		return res
	}
	if (action === "logout") {
		const res = NextResponse.json({ ok: true })
		res.cookies.set(RESERVAS_COOKIE, "", { path: "/", maxAge: 0 })
		return res
	}

	if (!isReservasRequest(req)) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
	if (!kvConfigured()) return NextResponse.json({ error: "Falta conectar la base de datos" }, { status: 400 })

	try {
		if (action === "save") {
			const input = (body.booking ?? {}) as Record<string, unknown>
			const id = typeof input.id === "string" ? input.id : ""
			const base = id ? await getBooking(id) : null
			if (id && !base) return NextResponse.json({ error: "No encontré esa reserva" }, { status: 404 })
			const booking = sanitizeBooking(input, base ?? undefined)
			await saveBookings([booking])
			return NextResponse.json({ ok: true, booking })
		}
		if (action === "saveExpense") {
			const input = (body.expense ?? {}) as Record<string, unknown>
			const id = typeof input.id === "string" ? input.id : ""
			const base = id ? await getExpense(id) : null
			const expense = sanitizeExpense(input, base)
			await saveExpenses([expense])
			return NextResponse.json({ ok: true, expense })
		}
		if (action === "deleteExpense") {
			await deleteExpense(String(body.id ?? ""))
			return NextResponse.json({ ok: true })
		}
		if (action === "saveItem") {
			const input = (body.item ?? {}) as Record<string, unknown>
			const id = typeof input.id === "string" ? input.id : ""
			const base = id ? await getItem(id) : null
			const item = sanitizeItem(input, base)
			await saveItems([item])
			return NextResponse.json({ ok: true, item })
		}
		if (action === "deleteItem") {
			await deleteItem(String(body.id ?? ""))
			return NextResponse.json({ ok: true })
		}
		if (action === "saveFin") {
			const fin = await saveFinSettings(body.fin)
			return NextResponse.json({ ok: true, fin })
		}
		if (action === "delete") {
			const id = String(body.id ?? "")
			const b = await getBooking(id)
			if (!b) return NextResponse.json({ error: "No encontré esa reserva" }, { status: 404 })
			// Las reservas de la página no se borran (volverían a entrar desde Stripe): se cancelan.
			if (b.source === "web") {
				await saveBookings([{ ...b, status: "cancelled", updatedAt: Date.now() }])
			} else {
				await deleteBooking(id)
			}
			return NextResponse.json({ ok: true })
		}
	} catch (err) {
		return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 400 })
	}
	return NextResponse.json({ error: "Acción desconocida" }, { status: 400 })
}
