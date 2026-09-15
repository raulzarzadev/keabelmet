"use client"

import { useEffect, useRef } from "react"

type Item = { text: string; name: string; loc: string; photo?: string }

export default function TestiCarousel({ items }: { items: Item[] }) {
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
              <div className="testi-name">{item.name}</div>
              <div className="testi-loc">{item.loc}</div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="testi-arrow next" aria-label="Siguiente" onClick={() => step(1)}>›</button>
    </div>
  )
}
