"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import s from "./WhatsAppPanel.module.css"

type MsgBy = "customer" | "bot" | "owner"
interface Msg { id: string; by: MsgBy; text: string; at: number; note?: string }
interface Conv {
	phone: string
	name?: string
	lastAt: number
	lastText: string
	lastBy: MsgBy
	lastCustomerAt?: number
	pausedUntil: number
	pauseReason?: "owner" | "handoff" | "manual"
	needsHuman?: boolean
	handoffSummary?: string
	unread: number
}
interface Settings { botEnabled: boolean; ownerPauseHours: number }

const fmtTime = (ms: number) =>
	new Intl.DateTimeFormat("es-MX", { timeZone: "America/Mazatlan", dateStyle: "short", timeStyle: "short" }).format(ms)

async function api<T>(init?: { method: "POST"; body: unknown }, query = ""): Promise<T> {
	const res = await fetch(`/api/whatsapp/admin${query}`, {
		method: init?.method ?? "GET",
		headers: init ? { "Content-Type": "application/json" } : undefined,
		body: init ? JSON.stringify(init.body) : undefined,
		cache: "no-store",
	})
	const data = await res.json().catch(() => ({}))
	if (!res.ok) throw Object.assign(new Error(data.error || `Error ${res.status}`), { status: res.status })
	return data as T
}

function pauseLabel(c: Conv, now: number): string | null {
	if (!c.pausedUntil || c.pausedUntil <= now) return null
	if (c.pausedUntil - now > 300 * 24 * 3600 * 1000) return "Bot en pausa"
	return `Bot en pausa hasta ${fmtTime(c.pausedUntil)}`
}

export default function WhatsAppPanel() {
	const [authed, setAuthed] = useState<boolean | null>(null)
	const [password, setPassword] = useState("")
	const [settings, setSettings] = useState<Settings | null>(null)
	const [convs, setConvs] = useState<Conv[]>([])
	const [now, setNow] = useState(() => Date.now())
	const [active, setActive] = useState<string | null>(null)
	const [conv, setConv] = useState<Conv | null>(null)
	const [msgs, setMsgs] = useState<Msg[]>([])
	const [draft, setDraft] = useState("")
	const [error, setError] = useState("")
	const [busy, setBusy] = useState(false)
	const msgsRef = useRef<HTMLDivElement>(null)

	const loadList = useCallback(async () => {
		try {
			const data = await api<{ settings: Settings; conversations: Conv[]; now: number }>()
			setSettings(data.settings)
			setConvs(data.conversations)
			setNow(data.now)
			setAuthed(true)
		} catch (e) {
			if ((e as { status?: number }).status === 401) setAuthed(false)
			else setError((e as Error).message)
		}
	}, [])

	const loadConv = useCallback(async (phone: string) => {
		try {
			const data = await api<{ conversation: Conv; messages: Msg[] }>(undefined, `?c=${phone}`)
			setConv(data.conversation)
			setMsgs(data.messages)
		} catch (e) {
			setError((e as Error).message)
		}
	}, [])

	useEffect(() => {
		const c = new URLSearchParams(window.location.search).get("c")
		if (c) setActive(c.replace(/\D/g, ""))
		loadList()
	}, [loadList])

	// Actualiza cada 8 s mientras el panel está abierto.
	useEffect(() => {
		if (!authed) return
		const t = setInterval(() => {
			loadList()
			if (active) loadConv(active)
		}, 8000)
		return () => clearInterval(t)
	}, [authed, active, loadList, loadConv])

	useEffect(() => {
		if (active && authed) loadConv(active)
	}, [active, authed, loadConv])

	useEffect(() => {
		msgsRef.current?.scrollTo({ top: msgsRef.current.scrollHeight })
	}, [msgs.length, active])

	async function act(body: Record<string, unknown>) {
		setBusy(true)
		setError("")
		try {
			await api({ method: "POST", body })
			await loadList()
			if (active) await loadConv(active)
		} catch (e) {
			setError((e as Error).message)
		} finally {
			setBusy(false)
		}
	}

	async function login(e: React.FormEvent) {
		e.preventDefault()
		setError("")
		try {
			await api({ method: "POST", body: { action: "login", password } })
			setPassword("")
			await loadList()
		} catch (err) {
			setError((err as Error).message)
		}
	}

	async function send(e: React.FormEvent) {
		e.preventDefault()
		if (!active || !draft.trim()) return
		const text = draft
		setDraft("")
		await act({ action: "send", phone: active, text })
	}

	if (authed === null) return <main className={s.page}><p className={s.muted}>Cargando…</p></main>

	if (!authed)
		return (
			<main className={s.page}>
				<form className={s.login} onSubmit={login}>
					<h1 className={s.title}>Panel de WhatsApp</h1>
					<input className={s.input} type="password" autoComplete="current-password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
					<button className={`${s.btn} ${s.btnOn}`} type="submit">Entrar</button>
					{error && <p className={s.error}>{error}</p>}
				</form>
			</main>
		)

	const paused = conv ? pauseLabel(conv, now) : null
	const windowOpen = conv?.lastCustomerAt ? now - conv.lastCustomerAt < 24 * 3600 * 1000 : false
	const needsHuman = convs.filter((c) => c.needsHuman).length

	return (
		<main className={s.page}>
			<div className={s.bar}>
				<div>
					<h1 className={s.title}>WhatsApp · Asistente</h1>
					<span className={s.muted}>
						{convs.length} conversaciones{needsHuman ? ` · ${needsHuman} esperan a una persona` : ""}
					</span>
				</div>
				{settings && (
					<div className={s.row}>
						<button
							className={`${s.btn} ${settings.botEnabled ? s.btnOn : s.btnWarn}`}
							disabled={busy}
							onClick={() => act({ action: "settings", botEnabled: !settings.botEnabled })}
						>
							{settings.botEnabled ? "🤖 Bot encendido" : "⏸ Bot apagado (todos los chats)"}
						</button>
						<label className={s.muted}>
							Pausa tras escribir yo:{" "}
							<select
								className={s.btn}
								value={settings.ownerPauseHours}
								onChange={(e) => act({ action: "settings", ownerPauseHours: Number(e.target.value) })}
							>
								{[1, 3, 6, 12, 24, 48, 168].map((h) => (
									<option key={h} value={h}>{h < 24 ? `${h} h` : `${h / 24} d`}</option>
								))}
							</select>
						</label>
						<button className={s.btn} onClick={() => act({ action: "logout" }).then(() => setAuthed(false))}>Salir</button>
					</div>
				)}
			</div>
			{error && <p className={s.error}>{error}</p>}

			<div className={s.layout}>
				<div className={`${s.list} ${active ? s.hideMobile : ""}`}>
					{convs.length === 0 && <p className={s.empty}>Aún no hay conversaciones.</p>}
					{convs.map((c) => {
						const p = pauseLabel(c, now)
						return (
							<button key={c.phone} className={`${s.item} ${c.phone === active ? s.itemActive : ""}`} onClick={() => setActive(c.phone)}>
								<div className={s.itemTop}>
									<span>{c.name || `+${c.phone}`}</span>
									<span className={s.muted}>{fmtTime(c.lastAt)}</span>
								</div>
								<div className={s.preview}>
									{c.lastBy === "bot" ? "🤖 " : c.lastBy === "owner" ? "Tú: " : ""}
									{c.lastText}
								</div>
								<div className={s.badges}>
									{c.unread > 0 && <span className={`${s.badge} ${s.badgeUnread}`}>{c.unread} nuevos</span>}
									{c.needsHuman && <span className={`${s.badge} ${s.badgeHuman}`}>Necesita persona</span>}
									{p ? <span className={s.badge}>{p}</span> : <span className={`${s.badge} ${s.badgeBot}`}>Bot activo</span>}
								</div>
							</button>
						)
					})}
				</div>

				<div className={`${s.chat} ${active ? "" : s.hideMobile}`}>
					{!active || !conv ? (
						<p className={s.empty}>Elige una conversación.</p>
					) : (
						<>
							<div className={s.chatHead}>
								<div>
									<button className={`${s.btn} ${s.back}`} onClick={() => setActive(null)}>← Volver</button>{" "}
									<strong>{conv.name || `+${conv.phone}`}</strong>{" "}
									<a className={s.muted} href={`https://wa.me/${conv.phone}`} target="_blank" rel="noopener noreferrer">+{conv.phone}</a>
									<div className={s.muted}>{paused ?? "Bot activo en este chat"}</div>
								</div>
								<div className={s.row}>
									{paused ? (
										<button className={`${s.btn} ${s.btnOn}`} disabled={busy} onClick={() => act({ action: "resume", phone: conv.phone })}>▶ Reactivar bot</button>
									) : (
										<>
											<button className={s.btn} disabled={busy} onClick={() => act({ action: "pause", phone: conv.phone, hours: 24 })}>Pausar 24 h</button>
											<button className={s.btn} disabled={busy} onClick={() => act({ action: "pause", phone: conv.phone })}>Pausar siempre</button>
										</>
									)}
									{conv.needsHuman && (
										<button className={s.btn} disabled={busy} onClick={() => act({ action: "resolve", phone: conv.phone })}>✓ Atendido</button>
									)}
								</div>
							</div>
							{conv.needsHuman && conv.handoffSummary && <div className={s.summary}>🙋 {conv.handoffSummary}</div>}
							<div className={s.msgs} ref={msgsRef}>
								{msgs.map((m) =>
									m.note ? (
										<div key={m.id} className={s.msgNote}>📝 {m.note} · {fmtTime(m.at)}</div>
									) : (
										<div key={m.id} className={`${s.msg} ${m.by === "customer" ? s.msgIn : m.by === "bot" ? s.msgBot : s.msgOwner}`}>
											{m.text}
											<span className={s.meta}>
												{m.by === "bot" ? "🤖 Bot" : m.by === "owner" ? "Equipo" : "Cliente"} · {fmtTime(m.at)}
											</span>
										</div>
									),
								)}
							</div>
							<form className={s.compose} onSubmit={send}>
								<textarea
									className={s.input}
									rows={2}
									placeholder={windowOpen ? "Escribe como Keabelmet… (el bot se pausa en este chat)" : "Pasaron más de 24 h: contesta desde la app de WhatsApp"}
									disabled={!windowOpen || busy}
									value={draft}
									onChange={(e) => setDraft(e.target.value)}
								/>
								<button className={`${s.btn} ${s.btnOn}`} type="submit" disabled={!windowOpen || busy || !draft.trim()}>Enviar</button>
							</form>
						</>
					)}
				</div>
			</div>
		</main>
	)
}
