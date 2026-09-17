"use client"

import { useState } from "react"

export default function YoutubeFacade({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false)
  return (
    <div className="yt-facade">
      {play ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="yt-play" onClick={() => setPlay(true)} aria-label={`Reproducir video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" />
          <span className="yt-play-btn" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
