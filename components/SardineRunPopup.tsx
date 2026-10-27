"use client"

import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { buildWhatsAppLink } from "@/config/whatsapp"
import { defaultLocale, type Locale } from "@/lib/i18n"

type Copy = { badge: string; title: string; text: string; wa: string; see: string; waMsg: string; close: string }

const copy: Record<Locale, Copy> = {
  es: {
    badge: "Fechas disponibles solo noviembre y diciembre",
    title: "Sardine Run · Safari de 1 día",
    text: "Acaba de empezar la temporada. Si buscas aventura en la Baja este noviembre —o ya habías oído del Sardine Run—, este safari de 1 día es para ti: marlines rayados cazando a toda velocidad en Bahía Magdalena.",
    wa: "Reservar por WhatsApp",
    see: "Ver el safari",
    waMsg: "Hola! Vi el Sardine Run en su web y quiero reservar el safari de 1 día. ¿Qué fechas tienen disponibles?",
    close: "Cerrar",
  },
  en: {
    badge: "Dates available only in November and December",
    title: "Sardine Run · 1-day safari",
    text: "The season has just started. If you're looking for adventure in Baja this November —or you've already heard of the Sardine Run— this 1-day safari is for you: striped marlin hunting at full speed in Magdalena Bay.",
    wa: "Book on WhatsApp",
    see: "See the safari",
    waMsg: "Hi! I saw the Sardine Run on your website and I'd like to book the 1-day safari. What dates do you have available?",
    close: "Close",
  },
  fr: {
    badge: "Dates disponibles seulement en novembre et décembre",
    title: "Sardine Run · Safari d'1 jour",
    text: "La saison vient de commencer. Si tu cherches l'aventure en Basse-Californie ce novembre —ou si tu as déjà entendu parler du Sardine Run—, ce safari d'1 jour est pour toi : marlins rayés en chasse à toute vitesse à Bahía Magdalena.",
    wa: "Réserver sur WhatsApp",
    see: "Voir le safari",
    waMsg: "Bonjour ! J'ai vu le Sardine Run sur votre site et je souhaite réserver le safari d'1 jour. Quelles dates avez-vous ?",
    close: "Fermer",
  },
  zh: {
    badge: "仅11月和12月有可用日期",
    title: "沙丁鱼奔流 · 一日游",
    text: "旺季刚刚开始。如果你想在11月的下加州寻找冒险，或早就听说过沙丁鱼奔流——这个一日游就是为你准备的：条纹马林鱼在马格达莱纳湾全速捕猎。",
    wa: "通过 WhatsApp 预订",
    see: "查看行程",
    waMsg: "你好！我在你们网站上看到了沙丁鱼奔流，想预订一日游。请问有哪些可用日期？",
    close: "关闭",
  },
  ca: {
    badge: "Dates disponibles només al novembre i desembre",
    title: "Sardine Run · Safari d'1 dia",
    text: "La temporada tot just ha començat. Si busques aventura a la Baixa aquest novembre —o ja havies sentit a parlar del Sardine Run—, aquest safari d'1 dia és per a tu: marlins ratllats caçant a tota velocitat a Badia Magdalena.",
    wa: "Reserva per WhatsApp",
    see: "Veure el safari",
    waMsg: "Hola! He vist el Sardine Run al vostre web i vull reservar el safari d'1 dia. Quines dates teniu disponibles?",
    close: "Tancar",
  },
}

const localize = (path: string, locale: Locale) => (locale === defaultLocale ? path : `/${locale}${path}`)

export default function SardineRunPopup({ locale = "es" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    try { sessionStorage.setItem("srPopupSeen", "1") } catch { /* storage bloqueado */ }
  }, [])

  useEffect(() => {
    setMounted(true)
    let seen = false
    try { seen = sessionStorage.getItem("srPopupSeen") === "1" } catch { /* storage bloqueado */ }
    if (seen) return
    const t = setTimeout(() => setOpen(true), 1500)
    return () => clearTimeout(t)
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

  const modal = (
    <div className="sr-pop-overlay" onClick={close} role="dialog" aria-modal="true" aria-label={c.title}>
      <div className="sr-pop" onClick={(e) => e.stopPropagation()}>
        <button className="sr-pop-close" onClick={close} aria-label={c.close}>&times;</button>
        <div
          className="sr-pop-media"
          style={{ backgroundImage: `linear-gradient(rgba(5,15,22,0.05), rgba(15,40,54,0.8)), url("/images/gallery/marlin-cazando.jpeg")` }}
        >
          <span className="sr-pop-badge"><span className="sr-dot" />{c.badge}</span>
        </div>
        <div className="sr-pop-body">
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          <div className="sr-pop-btns">
            <a className="btn btn-teal" href={buildWhatsAppLink(c.waMsg)} target="_blank" rel="noopener noreferrer" onClick={close}>{c.wa}</a>
            <a className="btn btn-ghost" href={localize("/experiencias/safari-bahia-magdalena", locale)} onClick={close}>{c.see}</a>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
