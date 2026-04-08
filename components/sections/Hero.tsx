// components/Hero.tsx
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative bg-cachalote min-h-[80vh] flex items-center"
      aria-label="Keabelmet Expeditions - Safari Marino"
    >
      {/* Overlay degradado para legibilidad */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        {/* Lema / badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Siendo agua y tierra
        </div>

        {/* Título */}
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Safari Marino en Baja California Sur
        </h1>

        {/* Subtítulo */}
        <p className="mt-4 max-w-2xl text-lg text-white/90">
          Encuentros cercanos con móbulas, ballenas y marlines en expediciones
          seguras y de grupos pequeños. Documentamos tu experiencia con foto y video.
        </p>

        {/* Botones */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#que-vendemos"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-lg transition hover:bg-emerald-700"
          >
            Explora expediciones
          </Link>
          <Link
            href="/#testimonios"
            className="inline-flex items-center justify-center rounded-xl border border-white/70 bg-white/10 px-5 py-3 text-white transition hover:bg-white/20"
          >
            Ver testimonios
          </Link>
        </div>
      </div>
    </section>
  );
}
