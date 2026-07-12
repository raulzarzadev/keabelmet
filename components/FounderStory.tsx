"use client"

import { useState } from "react"
import type { HomeContent } from "@/constants/home-content"

export default function FounderStory({ content }: { content: HomeContent["founder"] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="founder" id="historia">
      <div className="founder-media">
        <img src="/images/orca-safari.jpg" alt={content.alt} />
      </div>
      <div className="founder-text">
        <span className="kicker">{content.kicker}</span>
        <h2>{content.quote}</h2>
        {content.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {expanded && content.more.map((p, i) => <p key={`m-${i}`}>{p}</p>)}

        <button className="read-more" onClick={() => setExpanded(!expanded)}>
          {expanded ? content.readLess : content.readMore}
        </button>

        <div className="sign">
          {content.signName}
          <span>{content.signRole}</span>
        </div>
      </div>
    </section>
  )
}
