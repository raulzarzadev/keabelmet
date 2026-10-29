"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export interface CartItem {
	key: string
	slug: string
	title: string
	cardName: string
	unitAmountMxn: number
	image: string
	dateISO: string
	people: number
}

const STORAGE_KEY = "kbm-cart-v1"

let keyCounter = 0
export function newCartKey(): string {
	return `k${Date.now().toString(36)}${keyCounter++}`
}

function isValidCartItem(x: unknown): x is CartItem {
	const it = x as Record<string, unknown>
	return (
		!!it &&
		typeof it.slug === "string" &&
		typeof it.title === "string" &&
		Number.isFinite(it.unitAmountMxn as number) &&
		Number.isFinite(it.people as number)
	)
}

type CartContextType = {
	items: CartItem[]
	count: number
	add: (item: Omit<CartItem, "key">) => void
	update: (key: string, patch: Partial<CartItem>) => void
	remove: (key: string) => void
	clear: () => void
	ready: boolean
}

const CartContext = createContext<CartContextType>({
	items: [],
	count: 0,
	add: () => {},
	update: () => {},
	remove: () => {},
	clear: () => {},
	ready: false,
})

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([])
	const [ready, setReady] = useState(false)

	// Cargamos el carrito guardado. Algunos navegadores in-app (Instagram/Facebook)
	// bloquean localStorage y lanzan excepción; el try/catch evita que el error en
	// el efecto desmonte el árbol de React.
	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY)
			if (raw) {
				const arr = JSON.parse(raw)
				if (Array.isArray(arr)) {
					setItems(
						arr.filter(isValidCartItem).map((it: CartItem) => ({ ...it, key: it.key || newCartKey() })),
					)
				}
			}
		} catch {
			/* storage no disponible: carrito vacío */
		}
		setReady(true)
	}, [])

	// Persistimos solo después de la carga inicial para no pisar lo guardado.
	useEffect(() => {
		if (!ready) return
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
		} catch {
			/* storage no disponible: el carrito queda solo en memoria */
		}
	}, [items, ready])

	const add = useCallback((item: Omit<CartItem, "key">) => setItems((c) => [...c, { ...item, key: newCartKey() }]), [])
	const update = useCallback(
		(key: string, patch: Partial<CartItem>) => setItems((c) => c.map((it) => (it.key === key ? { ...it, ...patch } : it))),
		[],
	)
	const remove = useCallback((key: string) => setItems((c) => c.filter((it) => it.key !== key)), [])
	const clear = useCallback(() => setItems([]), [])

	return (
		<CartContext.Provider value={{ items, count: items.length, add, update, remove, clear, ready }}>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	return useContext(CartContext)
}
