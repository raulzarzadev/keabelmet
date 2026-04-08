import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, MapPin, Clock, CheckCircle2, Anchor } from "lucide-react"
import { isValidLocale, defaultLocale } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Buceo en Cabo Pulmo",
  description:
    "Bucea en el Parque Nacional Cabo Pulmo, hogar del unico arrecife de coral del Mar de Cortes. Tiburones, tortugas, cardumenes y lobos marinos te esperan.",
}

export default async function BuceoCaboPulmoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const l = (path: string) => locale === "es" ? path : `/${locale}${path}`
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg"
            alt="Buceo en Cabo Pulmo"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur">
            <MapPin className="h-4 w-4" />
            Parque Nacional Cabo Pulmo
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Buceo en Cabo Pulmo
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
            Descubre un santuario submarino único con el único arrecife de coral en el Mar de Cortés
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#tarifas"
              className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-white transition hover:bg-teal-700"
            >
              Ver Tarifas
            </Link>
            <Link
              href="#que-incluye"
              className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/10 px-6 py-3 text-white transition hover:bg-white/20"
            >
              Más Información
            </Link>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="border-b bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                <Clock className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Duración</h3>
                <p className="text-sm text-gray-600">Día completo</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Grupo</h3>
                <p className="text-sm text-gray-600">Máx. 6 buzos</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Temporada</h3>
                <p className="text-sm text-gray-600">Todo el año</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                <Anchor className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Inmersiones</h3>
                <p className="text-sm text-gray-600">2 por tour</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">Sobre el Tour</h2>
          <div className="mt-6 space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">
              Descubre un santuario submarino único en el <strong>Parque Nacional Cabo Pulmo</strong>, hogar del único{" "}
              <strong>arrecife de coral en el Mar de Cortés</strong>, un ecosistema vibrante que ha prosperado por más
              de <strong>25,000 años</strong>. Cabo Pulmo es una de las{" "}
              <strong>reservas marinas más exitosas del mundo</strong>, donde la vida marina ha aumentado
              exponencialmente gracias a la protección de sus aguas.
            </p>
            <p className="text-lg leading-relaxed">
              Bucear aquí es una <strong>experiencia inigualable</strong>: enormes{" "}
              <strong>cardúmenes de peces, tortugas marinas, tiburones toro, mantarrayas</strong>, y hasta{" "}
              <strong>juguetones lobos marinos</strong> te acompañarán en esta aventura. No por nada, el legendario{" "}
              <strong>Jacques Cousteau</strong> llamó al Mar de Cortés <em>"El Acuario del Mundo"</em>.
            </p>
            <p className="text-lg leading-relaxed">
              Sumérgete en <strong>aguas cristalinas</strong> y explora este{" "}
              <strong>paraíso submarino protegido</strong>, considerado{" "}
              <strong>uno de los mejores destinos de buceo a nivel mundial</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifas" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Opciones y Tarifas</h2>
            <p className="mt-2 text-gray-600">Elige la experiencia que mejor se adapte a ti</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Tour para Buzos Certificados - Colectivo */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Buceo Colectivo</h3>
                <p className="mt-1 text-sm text-gray-600">Para buzos certificados</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-teal-600">$2,800</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">Con tu propio equipo (BCD y regulador)</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-teal-600">$3,000</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">Incluye equipo completo</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Grupos de hasta 6 personas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>2 inmersiones compartidas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Agua y galletas a bordo</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Mínimo 2 participantes si necesitas equipo</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href={l("/contacto")}
                  className="block w-full rounded-xl bg-teal-600 py-3 text-center font-semibold text-white transition hover:bg-teal-700"
                >
                  Reservar Ahora
                </Link>
              </div>
            </div>

            {/* Tour para Buzos Certificados - Privado */}
            <div className="rounded-2xl border-2 border-teal-500 bg-gradient-to-br from-teal-50 to-white p-8 shadow-lg">
              <div className="mb-2 inline-block rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                EXPERIENCIA PREMIUM
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Buceo Privado</h3>
                <p className="mt-1 text-sm text-gray-600">Exclusivo para tu grupo</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-teal-600">$12,000</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">Para 1 a 3 buzos (precio fijo)</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-teal-600">+$3,400</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">Por cada buzo adicional (máx. 6 total)</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Experiencia totalmente personalizada</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>2 inmersiones exclusivas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Refrescos, bebidas energéticas y agua</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Galletas y fruta de temporada</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href={l("/contacto")}
                  className="block w-full rounded-xl bg-teal-600 py-3 text-center font-semibold text-white transition hover:bg-teal-700"
                >
                  Reservar Ahora
                </Link>
              </div>
            </div>

            {/* Discovery Scuba Diver - Colectivo */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Discovery Scuba Diver</h3>
                <p className="mt-1 text-sm text-gray-600">Para principiantes sin experiencia</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-teal-600">$3,600</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">Por persona</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Grupos de 1 a 6 personas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Instrucción teórica completa</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Práctica en aguas poco profundas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>2 inmersiones supervisadas por instructor certificado</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Agua y galletas a bordo</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href={l("/contacto")}
                  className="block w-full rounded-xl bg-teal-600 py-3 text-center font-semibold text-white transition hover:bg-teal-700"
                >
                  Reservar Ahora
                </Link>
              </div>
            </div>

            {/* Discovery Scuba Diver - Privado */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Discovery DSD Privado</h3>
                <p className="mt-1 text-sm text-gray-600">Experiencia exclusiva para principiantes</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-teal-600">$12,000</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">Para 1 a 3 personas (precio fijo)</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-teal-600">+$3,800</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">Por cada persona adicional (máx. 4 total)</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Instructor dedicado solo para tu grupo</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Instrucción personalizada</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>2 inmersiones en el arrecife</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                  <span>Bebidas energéticas y agua natural</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href={l("/contacto")}
                  className="block w-full rounded-xl bg-teal-600 py-3 text-center font-semibold text-white transition hover:bg-teal-700"
                >
                  Reservar Ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section id="que-incluye" className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">Qué Incluye</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Equipo de Buceo Completo</h3>
                <p className="text-sm text-gray-600">BCD, regulador, tanque, traje de neopreno, aletas, máscara</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Dive Master Certificado</h3>
                <p className="text-sm text-gray-600">Guía profesional con amplia experiencia en Cabo Pulmo</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">2 Inmersiones</h3>
                <p className="text-sm text-gray-600">Dos inmersiones en diferentes sitios del arrecife</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Entrada al Parque</h3>
                <p className="text-sm text-gray-600">Acceso al Parque Nacional Cabo Pulmo</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Refrigerios</h3>
                <p className="text-sm text-gray-600">Agua, galletas y snacks durante el tour</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Seguro</h3>
                <p className="text-sm text-gray-600">Seguro de responsabilidad civil incluido</p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-amber-50 border border-amber-200 p-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Requisitos Importantes
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-amber-900">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>
                  <strong>Buceo Certificado:</strong> Se requiere certificación Open Water o superior
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>
                  <strong>Discovery Scuba:</strong> No se requiere experiencia previa, incluye instrucción completa
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>
                  <strong>Salud:</strong> Los participantes deben estar en buen estado físico y completar un
                  cuestionario médico
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Marine Life */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-teal-600">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Vida Marina que Puedes Encontrar</h2>
            <p className="mt-2 text-gray-600">
              Cabo Pulmo alberga una biodiversidad marina excepcional en el único arrecife de coral del Golfo de
              California
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Cardúmenes Masivos",
                desc: "Impresionantes bancos de miles de peces incluyendo jureles, barracudas y peces soldado que forman verdaderas nubes submarinas.",
                season: "Todo el año",
                img: "/school-of-fish-cabo-pulmo-underwater.jpg",
              },
              {
                name: "Tiburones Toro",
                desc: "Encuentros con tiburones toro, una de las especies más impresionantes del arrecife. Inofensivos y majestuosos.",
                season: "Oct - May",
                img: "/bull-shark-swimming-cabo-pulmo.jpg",
              },
              {
                name: "Mantarrayas",
                desc: "Elegantes mantarrayas y rayas águila planean sobre el arrecife en un espectáculo de gracia submarina.",
                season: "Todo el año",
                img: "/manta-ray-swimming-underwater.jpg",
              },
              {
                name: "Tortugas Marinas",
                desc: "Tortugas verdes y carey se alimentan en el arrecife. Cabo Pulmo es un importante sitio de alimentación para estas especies en peligro.",
                season: "Todo el año",
                img: "/sea-turtle-swimming-coral-reef.jpg",
              },
              {
                name: "Lobos Marinos",
                desc: "Juguetones lobos marinos californianos que a menudo nadan con los buzos, creando encuentros mágicos.",
                season: "Todo el año",
                img: "/sea-lions-underwater-playful.jpg",
              },
              {
                name: "Arrecife de Coral",
                desc: "Coral duro y blando de más de 25,000 años de antigüedad, con colores vibrantes y estructura compleja llena de vida.",
                season: "Todo el año",
                img: "/coral-reef-colorful-tropical-fish.jpg",
              },
            ].map((species, i) => (
              <article
                key={i}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={species.img || "/placeholder.svg"}
                    alt={species.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute right-3 top-3 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    {species.season}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">{species.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{species.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-blue-50 p-6 text-center">
            <p className="text-sm text-blue-900">
              <strong>Nota:</strong> La vida silvestre marina es impredecible. Aunque Cabo Pulmo tiene una abundancia
              excepcional, los avistamientos específicos no pueden garantizarse y varían según las condiciones del día.
            </p>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">Recomendaciones</h2>
          <div className="mt-6 space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-600">
                1
              </div>
              <p>
                <strong>Llega preparado:</strong> Trae tu certificación de buceo, traje de baño, toalla, protector solar
                biodegradable y cambio de ropa.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-600">
                2
              </div>
              <p>
                <strong>Hidratación:</strong> Mantente bien hidratado antes y después del buceo. Evita el alcohol el día
                anterior.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-600">
                3
              </div>
              <p>
                <strong>Respeta el arrecife:</strong> No toques ni te pares sobre el coral. Mantén una flotabilidad
                neutra perfecta para proteger este ecosistema frágil.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-600">
                4
              </div>
              <p>
                <strong>Fotografía:</strong> Si traes cámara submarina, asegúrate de que esté bien asegurada y que sepas
                usarla sin afectar tu flotabilidad.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-600">
                5
              </div>
              <p>
                <strong>Condiciones:</strong> El tour puede cancelarse por condiciones climáticas adversas. Tu seguridad
                es lo primero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">Sumérgete en el Acuario del Mundo</h2>
          <p className="mt-4 text-lg text-teal-50">
            Cabo Pulmo te espera con una biodiversidad marina sin igual. Reserva tu aventura submarina hoy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={l("/contacto")}
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-teal-700 transition hover:bg-gray-100"
            >
              Reservar Ahora
            </Link>
            <Link
              href={l("/")}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Ver Más Experiencias
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
