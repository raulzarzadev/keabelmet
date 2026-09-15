"use client"

import { useEffect, useRef } from "react"

type Item = { text: string; name: string; loc: string; photo?: string }

const REVIEWS_URL = "https://www.google.com/maps?cid=7082429946220755653"
const allLabel: Record<string, string> = {
  es: "Ver todas las reseñas en Google",
  en: "See all reviews on Google",
  fr: "Voir tous les avis sur Google",
  zh: "在 Google 查看全部评价",
}

export default function TestiCarousel({ items, locale = "es" }: { items: Item[]; locale?: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  function step(dir: number) {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>(".testi-card")
    const w = card ? card.offsetWidth + 20 : el.clientWidth * 0.85
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
    if (dir > 0 && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" })
    } else {
      el.scrollBy({ left: dir * w, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) step(1)
    }, 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <div
        className="testi-carousel"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
      >
        <button type="button" className="testi-arrow prev" aria-label="Anterior" onClick={() => step(-1)}>‹</button>
        <div className="testi-track" ref={trackRef}>
          {items.map((item) => (
            <div key={item.name} className="testi-card">
              <div className="testi-photo">
                {item.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.photo} alt={`Foto de la experiencia de ${item.name}`} loading="lazy" />
                ) : (
                  <span className="testi-quote" aria-hidden="true">&#8220;</span>
                )}
              </div>
              <div className="testi-body">
                <div className="stars">★★★★★</div>
                <p>{item.text}</p>
                <div className="testi-foot">
                  <div>
                    <div className="testi-name">{item.name}</div>
                    <div className="testi-loc">{item.loc}</div>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="testi-google" src="/icons/google.png" alt="Google" width={24} height={24} loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="testi-arrow next" aria-label="Siguiente" onClick={() => step(1)}>›</button>
      </div>
      <div className="testi-all-wrap">
        <a className="testi-all" href={REVIEWS_URL} target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/google.png" alt="" width={18} height={18} />
          {allLabel[locale] ?? allLabel.es}
        </a>
      </div>
    </>
  )
}
