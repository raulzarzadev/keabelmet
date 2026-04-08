import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, MapPin, UtensilsCrossed, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Renta de Yate",
  description:
    "Renta un yate de lujo en La Paz, BCS. Chef a bordo, bebidas premium, deportes acuaticos y servicio VIP. La maxima experiencia en el Mar de Cortes.",
}

export default function RentaYatePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <Image src="/luxury-yacht-ocean-sunset-premium-experience.jpg" alt="Renta de Yate" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur">
            <MapPin className="h-4 w-4" />
            Experiencia Premium
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Renta de Yate de Lujo
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            La máxima experiencia en el Mar de Cortés con yates de lujo, servicio premium y comodidades de primera clase
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
                <p className="text-gray-600">Flexible (día o múltiples días)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Capacidad</h3>
                <p className="text-gray-600">Hasta 12 personas</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Disponibilidad</h3>
                <p className="text-gray-600">Todo el año</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <UtensilsCrossed className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Chef</h3>
                <p className="text-gray-600">Chef a bordo incluido</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold">Sobre la Experiencia</h2>
          <p className="mt-4 text-lg text-gray-700">
            Disfruta de la máxima experiencia de lujo en el Mar de Cortés a bordo de nuestros yates premium. Perfecto
            para celebraciones especiales, eventos corporativos, o simplemente para disfrutar del mar con el más alto
            nivel de confort. Nuestros yates cuentan con camarotes lujosos, amplias áreas de entretenimiento, jacuzzi, y
            todas las comodidades que esperas de una experiencia de cinco estrellas.
          </p>
          <h3 className="mt-8 text-2xl font-bold">Qué Incluye</h3>
          <ul className="mt-4 grid gap-3 text-gray-700 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Capitán y tripulación profesional
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Chef a bordo
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Menú gourmet personalizado
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Bebidas premium ilimitadas
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Equipo de snorkel y deportes acuáticos
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Jet skis y paddleboards
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Sistema de sonido premium
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600" />
              Servicio de mayordomo
            </li>
          </ul>
          <div className="mt-6 rounded-lg bg-amber-50 p-4">
            <p className="text-sm text-amber-900">
              <strong>Experiencia Premium:</strong> Itinerario completamente personalizable. Contáctanos para diseñar tu
              experiencia perfecta.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="reservar" className="bg-teal-700 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-3xl font-bold">Lujo sin límites</h2>
          <p className="mt-4 text-lg">Experiencia exclusiva. Consulta disponibilidad</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-teal-700 transition hover:bg-gray-100"
            >
              Consultar Ahora
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Ver Más Experiencias
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
