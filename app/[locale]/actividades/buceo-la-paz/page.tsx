import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, MapPin, Camera, Clock } from "lucide-react"
import { isValidLocale, defaultLocale } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Buceo en La Paz",
  description:
    "Bucea con lobos marinos en Los Islotes, La Paz. Explora cuevas submarinas y formaciones rocosas en el Mar de Cortes con guias certificados y equipo completo.",
}

export default async function BuceoLaPazPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const l = (path: string) => locale === "es" ? path : `/${locale}${path}`
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <Image src="/scuba-diving-underwater-sea-lions-swimming-playful.jpg" alt="Buceo en La Paz" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur">
            <MapPin className="h-4 w-4" />
            Colonia de Lobos Marinos
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Buceo en La Paz</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Bucea con los juguetones lobos marinos de Los Islotes y explora los tesoros submarinos de La Paz
          </p>
          <div className="mt-8">
            <Link
              href="#reservar"
              className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-white transition hover:bg-teal-700"
            >
              Reservar Ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Clock className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Duración</h3>
                <p className="text-gray-600">Día completo (7-8 horas)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Grupo</h3>
                <p className="text-gray-600">Máximo 8 buceadores</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Temporada</h3>
                <p className="text-gray-600">Todo el año</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Camera className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Incluye</h3>
                <p className="text-gray-600">Fotos y equipo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold">Sobre el Tour</h2>
          <p className="mt-4 text-lg text-gray-700">
            La Paz ofrece algunas de las mejores experiencias de buceo en el Mar de Cortés. El sitio más popular es Los
            Islotes, hogar de una colonia de más de 400 lobos marinos que son extremadamente curiosos y juguetones con
            los buceadores. Estos "perritos del mar" te rodearán, harán piruetas y crearán recuerdos inolvidables.
            También visitaremos otros sitios con impresionantes formaciones rocosas, cuevas submarinas y vida marina
            diversa.
          </p>
          <h3 className="mt-8 text-2xl font-bold">Qué Incluye</h3>
          <ul className="mt-4 grid gap-3 text-gray-700 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Transporte en panga
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Equipo de buceo completo
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Dive master certificado
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              2-3 inmersiones
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Lunch y bebidas
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Fotos y videos submarinos
            </li>
          </ul>
          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-blue-900">
              <strong>Nota:</strong> También disponible para snorkelers. No se requiere certificación de buceo para
              snorkeling con lobos marinos.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="reservar" className="bg-teal-700 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-3xl font-bold">Nada con lobos marinos</h2>
          <p className="mt-4 text-lg">Una experiencia que nunca olvidarás. Reserva hoy</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href={l("/contacto")}
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-teal-700 transition hover:bg-gray-100"
            >
              Reservar Ahora
            </Link>
            <Link
              href={l("/")}
              className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Ver Más Tours
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
