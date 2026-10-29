"use client"

import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { buildWhatsAppLink } from "@/config/whatsapp"
import { type Locale } from "@/lib/i18n"

type Copy = { badge: string; title: string; text: string; wa: string; see: string; waMsg: string; close: string }

const copy: Record<Locale, Copy> = {
  es: {
    badge: "Arma tu semana · precio especial",
    title: "Antes de irte…",
    text: "¿Vas a explorar la Baja? No pagues actividad por actividad en distintas empresas. Junta tus safaris y buceos en un solo paquete y obtén un precio especial — te lo armamos a tu medida.",
    wa: "Armar mi paquete",
    see: "Cotizar por WhatsApp",
    waMsg: "Hola! Quiero armar un paquete con varias actividades en la Baja (safaris + buceo) a precio especial. ¿Me ayudan a cotizarlo?",
    close: "Cerrar",
  },
  en: {
    badge: "Build your week · special price",
    title: "Before you go…",
    text: "Exploring Baja? Don't pay activity by activity at different companies. Bundle your safaris and dives into one package and get a special price — we'll tailor it to you.",
    wa: "Build my package",
    see: "Quote on WhatsApp",
    waMsg: "Hi! I'd like to build a package with several activities in Baja (safaris + diving) at a special price. Can you help me with a quote?",
    close: "Close",
  },
  fr: {
    badge: "Composez votre semaine · prix spécial",
    title: "Avant de partir…",
    text: "Vous explorez la Basse-Californie ? Ne payez pas activité par activité dans différentes entreprises. Regroupez vos safaris et plongées en un seul forfait et obtenez un prix spécial — sur mesure.",
    wa: "Composer mon forfait",
    see: "Devis sur WhatsApp",
    waMsg: "Bonjour ! Je souhaite composer un forfait avec plusieurs activités en Basse-Californie (safaris + plongée) à prix spécial. Pouvez-vous me faire un devis ?",
    close: "Fermer",
  },
  zh: {
    badge: "定制你的行程 · 特别价",
    title: "先别走…",
    text: "想探索下加州吗？不要在不同公司一个个单独付费。把你的海洋 safari 和潜水组合成一个套餐，享受特别价格——为你量身定制。",
    wa: "定制我的套餐",
    see: "WhatsApp 咨询报价",
    waMsg: "你好！我想把下加州的多个活动（safari + 潜水）组合成一个套餐，享受特别价格。能帮我报价吗？",
    close: "关闭",
  },
  ca: {
    badge: "Munta la teva setmana · preu especial",
    title: "Abans de marxar…",
    text: "Vas a explorar la Baixa? No paguis activitat per activitat en diferents empreses. Ajunta els teus safaris i immersions en un sol paquet i aconsegueix un preu especial — te'l fem a mida.",
    wa: "Muntar el meu paquet",
    see: "Pressupost per WhatsApp",
    waMsg: "Hola! Vull muntar un paquet amb diverses activitats a la Baixa (safaris + busseig) a preu especial. Em podeu ajudar amb un pressupost?",
    close: "Tancar",
  },
}

export default function ExitPackagePopup({ locale = "es" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const seen = () => { try { return sessionStorage.getItem("exitPopupSeen") === "1" } catch { return false } }
  const markSeen = () => { try { sessionStorage.setItem("exitPopupSeen", "1") } catch { /* storage bloqueado */ } }

  const close = useCallback(() => { setOpen(false); markSeen() }, [])

  useEffect(() => {
    setMounted(true)
    if (seen()) return

    let armed = false
    const show = () => {
      if (seen() || document.querySelector(".sr-pop-overlay")) return
      markSeen()
      setOpen(true)
    }

    const onMouseOut = (e: MouseEvent) => {
      if (armed && e.clientY <= 0 && !e.relatedTarget) show()
    }
    const onPopState = () => {
      window.removeEventListener("popstate", onPopState)
      show()
      try { history.pushState(null, "", location.href) } catch { /* no-op */ }
    }

    const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches

    // Armamos la deteccion de salida unos segundos despues de entrar.
    const armTimer = setTimeout(() => {
      armed = true
      if (isTouch) {
        try { history.pushState(null, "", location.href) } catch { /* no-op */ }
        window.addEventListener("popstate", onPopState)
      } else {
        document.addEventListener("mouseout", onMouseOut)
      }
    }, 4000)

    return () => {
      clearTimeout(armTimer)
      document.removeEventListener("mouseout", onMouseOut)
      window.removeEventListener("popstate", onPopState)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    document.addEventListener("keydown", onKey)
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey) }
  }, [open, close])

  if (!mounted || !open) return null
  const c = copy[locale] ?? copy.es
  const base = locale === "es" ? "" : `/${locale}`
  const reservaHref = `${base}/arma-tu-reserva`

  const modal = (
    <div className="sr-pop-overlay" onClick={close} role="dialog" aria-modal="true" aria-label={c.title}>
      <div className="sr-pop" onClick={(e) => e.stopPropagation()}>
        <button className="sr-pop-close" onClick={close} aria-label={c.close}>&times;</button>
        <div
          className="sr-pop-media"
          style={{ backgroundImage: `linear-gradient(rgba(5,15,22,0.1), rgba(15,40,54,0.78)), url("/playa-balandra-aerea.jpg")` }}
        >
          <span className="sr-pop-badge"><span className="sr-dot" />{c.badge}</span>
        </div>
        <div className="sr-pop-body">
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          <div className="sr-pop-btns">
            <a className="btn btn-teal" href={reservaHref} onClick={close}>{c.wa}</a>
            <a className="btn btn-ghost" href={buildWhatsAppLink(c.waMsg)} target="_blank" rel="noopener noreferrer" onClick={close}>{c.see}</a>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
