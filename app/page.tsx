// app/page.tsx
import Link from "next/link"
import Image from "next/image"
import { Users, Ban, CameraOff, UserCheck, BookOpenCheck, Camera } from "lucide-react"

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* 1) HERO */}
      <section id="hero" className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/cachalotecta.jpeg"
            alt="Keabelmet Expeditions - Safari Marino"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Siendo agua y tierra
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Descubre La Paz, donde el desierto conoce el mar
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Vive aventuras imborrables en las aguas de Baja California Sur. Nada con lobos marinos, móbulas, avista
            ballenas por primera vez, y explora playas vírgenes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#que-vendemos"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-700"
            >
              Explora expediciones
            </Link>
            <Link
              href="#testimonios"
              className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/10 px-5 py-3 text-white transition hover:bg-white/20"
            >
              Ver testimonios
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-white sm:text-5xl">15+</div>
              <div className="mt-2 text-sm text-white/80 sm:text-base">Unique Tours</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white sm:text-5xl">10K+</div>
              <div className="mt-2 text-sm text-white/80 sm:text-base">Happy Adventurers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white sm:text-5xl">5.0</div>
              <div className="mt-2 text-sm text-white/80 sm:text-base">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5) FEATURED ADVENTURES */}
      <section id="featured-adventures" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              Aventuras <span className="text-teal-600">destacadas</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Experiencias seleccionadas que muestran lo mejor de las maravillas marinas y la belleza desértica de La
              Paz
            </p>
          </div>

          {/* Grid of 6 activities */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1. Tour a Espíritu Santo */}
            <article className="group overflow-hidden rounded-2xl border bg-white shadow-md transition-all hover:shadow-xl">
              <Link href="/actividades/tour-espiritu-santo" className="block focus:outline-none">
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src="/lobo-marino-espiritu-santo.jpg"
                    alt="Espíritu Santo Island"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur">
                    <svg className="h-4 w-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Reserva de la Biosfera UNESCO</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">Isla Espíritu Santo</h3>
                  <p className="mt-3 text-gray-600">Playas vírgenes, aguas turquesas y snorkel increíble</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-teal-700">
                      <span className="text-sm">Desde</span>
                      <span className="ml-1 text-2xl font-bold">$120</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-900">
                      <span className="text-sm font-medium">Saber más</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </article>

            {/* 2. Tour de Ballena Gris */}
            <article className="group overflow-hidden rounded-2xl border bg-white shadow-md transition-all hover:shadow-xl">
              <Link href="/actividades/tour-ballena-gris" className="block focus:outline-none">
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src="/ballena-gris-spyhop-new.jpg"
                    alt="Gray Whale Tour"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur">
                    <svg className="h-4 w-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Mar de Cortés</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">Ve una ballena por primera vez</h3>
                  <p className="mt-3 text-gray-600">Ver ballenas en México es posible, aquí cómo:</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-teal-700">
                      <span className="text-sm">Desde</span>
                      <span className="ml-1 text-2xl font-bold">$180</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-900">
                      <span className="text-sm font-medium">Saber más</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </article>

            {/* 3. Buceo en Cabo Pulmo */}
            <article className="group overflow-hidden rounded-2xl border bg-white shadow-md transition-all hover:shadow-xl">
              <Link href="/actividades/buceo-cabo-pulmo" className="block focus:outline-none">
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src="/buceo-cabo-pulmo-cardumen.jpg"
                    alt="Cabo Pulmo Diving"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur">
                    <svg className="h-4 w-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Arrecifes de Coral</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">Buceo en Cabo Pulmo    </h3>
                  <p className="mt-3 text-gray-600">Descubre el mejor lugar para bucear en México, ya sea tu primera vez o seas un apasionado                               </p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-teal-700">
                      <span className="text-sm">Desde</span>
                      <span className="ml-1 text-2xl font-bold">$110</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-900">
                      <span className="text-sm font-medium">Saber más</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </article>

            {/* 4. Buceo en La Paz */}
            <article className="group overflow-hidden rounded-2xl border bg-white shadow-md transition-all hover:shadow-xl">
              <Link href="/actividades/buceo-la-paz" className="block focus:outline-none">
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src="/buceo-la-paz-buzo.jpg"
                    alt="La Paz Diving"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur">
                    <svg className="h-4 w-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Colonia de Lobos Marinos</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{"Buceo en La Paz\n"}</h3>
                  <p className="mt-3 text-gray-600">Nada con juguetones lobos marinos en su hábitat natural</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-teal-700">
                      <span className="text-sm">Desde</span>
                      <span className="ml-1 text-2xl font-bold">$150</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-900">
                      <span className="text-sm font-medium">Saber más</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </article>

            {/* 5. Renta de Velero */}
            <article className="group overflow-hidden rounded-2xl border bg-white shadow-md transition-all hover:shadow-xl">
              <Link href="/actividades/renta-velero" className="block focus:outline-none">
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src="/ sailboat-sailing-sunset-sea-of-cortez-romantic.jpg"
                    alt="Sailboat Rental"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur">
                    <svg className="h-4 w-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{"Golfo de California"}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{"Renta un velero"}</h3>
                  <p className="mt-3 text-gray-600">{"Ya sea por unas horas o para dormir"}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-teal-700">
                      <span className="text-sm">From</span>
                      <span className="ml-1 text-2xl font-bold">$140</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-900">
                      <span className="text-sm font-medium">Learn More</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </article>

            {/* 6. Renta de Yate */}
            <article className="group overflow-hidden rounded-2xl border bg-white shadow-md transition-all hover:shadow-xl">
              <Link href="/actividades/renta-yate" className="block focus:outline-none">
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src="/luxury-yacht-ocean-balandra-beach-turquoise-lagoon.jpg"
                    alt="Yacht Rental"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur">
                    <svg className="h-4 w-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Protected Natural Area</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{"Renta un Yate"}</h3>
                  <p className="mt-3 text-gray-600">{"El Golfo de California como te lo mereces"}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-teal-700">
                      <span className="text-sm">From</span>
                      <span className="ml-1 text-2xl font-bold">$80</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-900">
                      <span className="text-sm font-medium">Learn More</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 2) TESTIMONIOS */}
      <section id="testimonios" className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="text-2xl font-bold">Lo que dicen nuestros viajeros</h2>
          <p className="mt-1 text-sm text-neutral-600">Experiencias reales en Baja California Sur.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "María G.",
                img: "/test-1.jpg",
                text: "Ver el baitball de sardinas con marlines fue mágico. Equipo amable y súper seguro.",
              },
              {
                name: "James P.",
                img: "/test-2.jpg",
                text: "La Ventana y las móbulas a centímetros… inolvidable. Muy bien organizado.",
              },
              {
                name: "Alejandro R.",
                img: "/test-3.jpg",
                text: "Guía biólogo, panga cómoda, fotos y video incluidos. Lo repetiría sin dudar.",
              },
            ].map((t, i) => (
              <article key={i} className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="relative h-36 w-full">
                  <Image src={t.img || "/placeholder.svg"} alt={t.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-sm text-neutral-700">"{t.text}"</p>
                  <div className="mt-3 text-xs font-semibold text-neutral-900">{t.name}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3) PROBLEMA → SOLUCIÓN redesigned */}
      <section
        id="problemas-soluciones"
        className="relative overflow-hidden bg-gradient-to-br from-white via-teal-50/20 to-white"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-14">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              Comparativa Directa
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
              Lo que suele arruinar un safari...
              <span className="block mt-1 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                y cómo lo hacemos distinto
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
              Comparativa directa: lo que pasa con muchos tours vs. cómo trabajamos en Keabelmet
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid gap-4 lg:gap-5">
            {/* Row 1: Group Size */}
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
              {/* Problem */}
              <div className="group relative overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm transition-all hover:shadow-md">
                <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-orange-100/50 blur-xl" />
                <div className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 ring-1 ring-orange-200/50">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">Demasiada gente en la panga</h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    ¿Te ha pasado que reservas un tour y hay 20 personas? La experiencia se vuelve caótica y poco
                    personal.
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div className="group relative overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 shadow-sm ring-2 ring-teal-100/50 transition-all hover:shadow-md">
                <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-teal-100/50 blur-xl" />
                <div className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 ring-1 ring-teal-200/50">
                      <UserCheck className="h-5 w-5 text-teal-600" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-teal-200 to-transparent" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">Grupos reducidos</h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Con nosotros, nunca más de <span className="font-bold text-teal-700">8 por panga</span>. Más
                    espacio, calma y seguridad.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2: Ethics */}
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
              {/* Problem */}
              <div className="group relative overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm transition-all hover:shadow-md">
                <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-orange-100/50 blur-xl" />
                <div className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 ring-1 ring-orange-200/50">
                      <Ban className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">Poca ética y cero ciencia</h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Guías que no respetan a los animales ni explican nada... y eso cambia todo.
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div className="group relative overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 shadow-sm ring-2 ring-teal-100/50 transition-all hover:shadow-md">
                <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-teal-100/50 blur-xl" />
                <div className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 ring-1 ring-teal-200/50">
                      <BookOpenCheck className="h-5 w-5 text-teal-600" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-teal-200 to-transparent" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">Guía Keabelmet</h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Te compartimos historias, comportamientos y buenas prácticas para cuidar la fauna.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 3: Photos */}
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
              {/* Problem */}
              <div className="group relative overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm transition-all hover:shadow-md">
                <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-orange-100/50 blur-xl" />
                <div className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 ring-1 ring-orange-200/50">
                      <CameraOff className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">Fotos prometidas... que no llegan</h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Te las cobran aparte o nunca aparecen. No es serio.
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div className="group relative overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 shadow-sm ring-2 ring-teal-100/50 transition-all hover:shadow-md">
                <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-teal-100/50 blur-xl" />
                <div className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 ring-1 ring-teal-200/50">
                      <Camera className="h-5 w-5 text-teal-600" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-teal-200 to-transparent" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">Foto y video incluidos</h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Lo que vivas, te lo llevas. Siempre incluimos material para revivir tu safari.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) QUÉ VENDEMOS */}
      <section id="que-vendemos" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">Nuestras expediciones</h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            Diseñadas para encuentros responsables con fauna marina y paisajes únicos.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Safari Bahía Magdalena",
                description: "Corrida de sardinas, marlines, lobos marinos. Nov–Dic.",
                img: "/images/marlin-bahia-magdalena-hero.jpeg",
                href: "/expediciones/safari-bahia-magdalena",
                rating: 5.0,
                reviews: 187,
                duration: "Día completo",
                capacity: "2-6 Personas",
                features: [
                  "Snorkeling",
                  "Vida marina",
                  "Transporte",
                  "Lunch Incluido",
                  "Equipo de snorkel",
                  "Videos y fotos",
                ],
                price: 165,
              },
              {
                title: "Safari La Ventana",
                description: "Migración de móbulas. Abril–Junio (según temporada).",
                img: "/images/orca-la-ventana-hero.jpeg",
                href: "/expediciones/safari-la-ventana",
                rating: 5.0,
                reviews: 243,
                duration: "Medio día",
                capacity: "2-8 Personas",
                features: ["Equipo de snorkel", "Guía Experto", "Binoculares", "Lunch Incluido", "Videos y fotos"],
                price: 180,
              },
              {
                title: "Surf Camp La Paz (6 días)",
                description: "Clases, feedback diario, foto/video, transporte y snacks.",
                img: "/images/surf-camp-hero.jpeg",
                href: "/surf-camp",
                rating: 4.9,
                reviews: 156,
                duration: "6 días",
                capacity: "6-8 Personas",
                features: ["Surf lessons", "Fisioterapeuta", "Video-análisis diario", "Hospedaje", "All meals"],
                price: 195,
              },
            ].map((expedition, i) => (
              <article
                key={i}
                className="group overflow-hidden rounded-2xl border bg-white shadow-md transition-all hover:shadow-xl"
              >
                <Link href={expedition.href} className="block focus:outline-none">
                  {/* Image with rating badge */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={expedition.img || "/placeholder.svg"}
                      alt={expedition.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Rating badge */}
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur">
                      <svg className="h-4 w-4 fill-teal-600" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-900">{expedition.rating}</span>
                      <span className="text-sm text-gray-600">({expedition.reviews})</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{expedition.title}</h3>

                    {/* Duration and capacity */}
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{expedition.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span>{expedition.capacity}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {expedition.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="my-4 border-t border-gray-200" />

                    {/* Pricing and button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500">Por persona</div>
                        <div className="text-2xl font-bold text-teal-700">${expedition.price}</div>
                      </div>
                      <button className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800">
                        Book Now
                      </button>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5) ¿POR QUÉ KEABELMET? */}
      <section id="autoridad" className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              ¿Por qué <span className="text-teal-600">Keabelmet</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
              Somos apasionados por compartir la magia de La Paz con aventuras auténticas, sustentables e inolvidables
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Local Expertise */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100">
                <svg
                  className="h-8 w-8 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Experiencia Local</h3>
              <p className="mt-3 text-neutral-600">
                Nacidos y criados en La Paz, conocemos cada rincón y los mejores momentos para visitar cada lugar
              </p>
            </div>

            {/* Safety First */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100">
                <svg
                  className="h-8 w-8 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Seguridad Primero</h3>
              <p className="mt-3 text-neutral-600">
                Guías certificados, equipo de calidad y seguro comprensivo para tu tranquilidad absoluta
              </p>
            </div>

            {/* Small Groups */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100">
                <svg
                  className="h-8 w-8 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Grupos Pequeños</h3>
              <p className="mt-3 text-neutral-600">
                Experiencias íntimas con máximo 8-12 personas para atención personalizada y conexiones auténticas
              </p>
            </div>

            {/* Eco-Conscious */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100">
                <svg
                  className="h-8 w-8 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Eco-Conscientes</h3>
              <p className="mt-3 text-neutral-600">
                Comprometidos con el turismo sustentable y la protección de los increíbles ecosistemas marinos y
                desérticos de La Paz
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">Liderado por Biólogos Marinos</h3>
                <p className="text-neutral-600">
                  Nuestro equipo está formado por biólogos marinos de La Paz con años de experiencia organizando
                  campamentos y expediciones en zonas remotas.
                </p>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">Educación y Conservación</h3>
                <p className="text-neutral-600">
                  La educación, conservación y turismo responsable son la base de todo lo que hacemos. Cada expedición
                  es una oportunidad para aprender y proteger.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6) CONSECUENCIAS */}
      <section id="consecuencias" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">Si eliges mal, te puedes perder…</h2>
          <ul className="mt-4 grid list-disc gap-3 pl-5 text-neutral-700 md:grid-cols-2">
            <li>Encuentros reales por mala logística o grupos masivos.</li>
            <li>Seguridad deficiente en el agua y poca orientación.</li>
            <li>Impacto negativo en fauna por malas prácticas.</li>
            <li>Sin fotos ni video...y recuerdos que no vuelven.</li>
          </ul>
        </div>
      </section>

      {/* 7) PREGUNTAS FRECUENTES */}
      <section id="faq" className="relative bg-neutral-50">
        <div className="absolute inset-0 -z-10 opacity-10">
          <Image src="/faq.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">Preguntas frecuentes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                q: "¿Necesito experiencia previa en snorkel?",
                a: "No necesitas experiencia previa. Te damos chaleco, traje y todo el acompañamiento para que te sientas seguro. Siempre motivamos a salir de la zona de confort porque lo más emocionante es meterse al agua y vivir de cerca la aventura, pero si no te sientes cómodo, también es perfecto quedarte en la panga y disfrutar el espectáculo.",
              },
              {
                q: "¿Qué incluye?",
                a: "Panga con capitán, guía biólogo marino, equipo de snorkel, agua y snacks, chaleco salvavidas, wetsuit, fotos/video, material dinámico y binoculares para tener una experiencia más inmersiva.",
              },
              {
                q: "¿Las fechas son garantizadas?",
                a: "Son experiencias de temporada y dependemos de la naturaleza, por lo que nunca podemos garantizar un avistamiento exacto. Lo que sí aseguramos es el esfuerzo: trabajamos con capitanes y guías locales expertos para buscar los mejores encuentros. Además, siempre priorizamos tu seguridad y comodidad, por eso si el clima no ayuda reprogramamos o devolvemos tu pago.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border bg-white/80 p-6 backdrop-blur">
                <div className="font-semibold">{item.q}</div>
                <p className="mt-2 text-neutral-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10) CTA FINAL (con imagen de fondo + overlay) */}

      <section id="cta" className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/ballenagriscta.jpg"
            alt="Keabelmet Expeditions - Safari Marino"
            fill
            priority
            className="object-cover brightness-95"
          />
          <div className="absolute inset-0 bg-white/15" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl drop-shadow-lg">
            Tu aventura en el Mar de Cortés comienza aquí
          </h2>
          <p className="mt-4 text-lg drop-shadow-md">
            Cupo limitado. Expediciones seguras, responsables y documentadas en foto/video.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            {/* Ajusta los href si tus rutas usan otros slugs */}
            <Link
              href="/bahia-magdalena#inicio"
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition drop-shadow-md inline-flex items-center justify-center"
              aria-label="Reservar Safari Bahía Magdalena (ir al inicio de la landing)"
            >
              Reservar Safari Bahía Magdalena
            </Link>

            <Link
              href="/la-ventana#inicio"
              className="rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition drop-shadow-md inline-flex items-center justify-center"
              aria-label="Reservar Safari La Ventana (ir al inicio de la landing)"
            >
              Reservar Safari La Ventana
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
