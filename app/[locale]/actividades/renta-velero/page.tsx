import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, Users, MapPin, Clock, Anchor } from "lucide-react"

export const metadata: Metadata = {
  title: "Renta de Velero",
  description:
    "Renta un velero privado en La Paz, BCS. Navega el Mar de Cortes con capitan, snorkel, kayaks y comida gourmet. Tours romanticos y de aventura disponibles.",
}

export default function RentaVeleroPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src="/sailboat-sailing-sunset-sea-of-cortez-romantic-lux.jpg"
            alt="Renta de Velero en La Paz"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
            <MapPin className="h-4 w-4" />
            Bahía de La Paz
          </div>
          <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Renta de Velero Privado
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/95">
            Navega por el Mar de Cortés en un velero completamente equipado. Perfecto para aventuras románticas,
            celebraciones especiales o simplemente disfrutar del mar.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#opciones"
              className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-teal-700"
            >
              Ver Opciones
            </Link>
            <Link
              href="#incluye"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Qué Incluye
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Details */}
      <section className="border-b bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50">
                <Clock className="h-7 w-7 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Duración</h3>
                <p className="text-sm text-gray-600">3 a 8 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50">
                <Users className="h-7 w-7 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Capacidad</h3>
                <p className="text-sm text-gray-600">2-6 personas</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50">
                <Anchor className="h-7 w-7 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Embarcación</h3>
                <p className="text-sm text-gray-600">Velero 32-40 pies</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50">
                <Calendar className="h-7 w-7 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Temporada</h3>
                <p className="text-sm text-gray-600">Todo el año</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">Sobre la Experiencia</h2>
          <div className="mt-6 space-y-4 text-lg text-gray-700">
            <p>
              Experimenta la libertad del mar a bordo de un velero privado completamente equipado con baño, cocina,
              camarote, chimenea y todas las comodidades para tu aventura.
            </p>
            <p>
              Navega hacia destinos icónicos como Playa Balandra, Isla Espíritu Santo o simplemente disfruta de un
              atardecer romántico en el Mar de Cortés. Cada experiencia incluye capitán profesional, equipo de snorkel,
              kayaks, paddle boards y todas las amenidades necesarias para un día perfecto en el mar.
            </p>
            <p>
              Ya sea que busques una experiencia romántica con brunch gourmet, un día completo de aventura acuática, o
              simplemente relajarte mientras navegas, tenemos el paquete perfecto para ti.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Options */}
      <section id="opciones" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Opciones de Tours</h2>
            <p className="mt-3 text-lg text-gray-600">Elige el paquete que mejor se adapte a tu aventura</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Option 1: Tour Privado Premium */}
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition hover:shadow-xl">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white">
                <h3 className="text-2xl font-bold">Tour Privado Premium</h3>
                <p className="mt-2 text-teal-50">Velero 40 pies con todas las amenidades</p>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$10,000</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-teal-600">✓</span>
                    <span>8 horas de servicio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-teal-600">✓</span>
                    <span>Hasta 6 personas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-teal-600">✓</span>
                    <span>Baño, cocina, camarote y chimenea</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-teal-600">✓</span>
                    <span>24 pack de cerveza, aguas y refrescos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-teal-600">✓</span>
                    <span>Ceviche de pescado y camarón</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-teal-600">✓</span>
                    <span>Sashimi de atún</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-teal-600">✓</span>
                    <span>Equipo de snorkel, kayak, paddle boards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-teal-600">✓</span>
                    <span>Avistamiento de lobos marinos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-teal-600">✓</span>
                    <span>Capitán y marinero profesionales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-teal-600">✓</span>
                    <span>Bocina bluetooth</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  Destinos: Playa Balandra, El Merito, El Zorrillo o Isla Espíritu Santo
                </p>
                <p className="mt-2 text-sm font-semibold text-orange-600">
                  *Persona extra: $1,000 MXN (máximo 1 persona extra)
                </p>
              </div>
            </div>

            {/* Option 2: Velero 32 Pies */}
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <h3 className="text-2xl font-bold">Velero 32 Pies</h3>
                <p className="mt-2 text-blue-50">Día completo de navegación</p>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$8,000</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>8 horas de servicio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Hasta 6 personas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Baño, cocina, TV y chimenea</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>18 pack de cerveza y refrescos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Ceviche de pescado y sashimi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Paddle boards y equipo de snorkel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Dinghy, sillas y sombra</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Pulseras de acceso ANP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Capitán y marinero</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">Destino: Playa Balandra</p>
                <p className="mt-2 text-sm font-semibold text-orange-600">
                  *Persona extra: $1,000 MXN (máximo 1 persona extra)
                </p>
              </div>
            </div>

            {/* Option 3: San Rafaelito a Balandra */}
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition hover:shadow-xl">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white">
                <h3 className="text-2xl font-bold">San Rafaelito a Balandra</h3>
                <p className="mt-2 text-emerald-50">Avistamiento de lobos marinos</p>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$9,900</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-600">✓</span>
                    <span>5 horas de recorrido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-600">✓</span>
                    <span>1-6 personas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-600">✓</span>
                    <span>Avistamiento de lobos marinos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-600">✓</span>
                    <span>Uso de kayaks y paddle boards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-600">✓</span>
                    <span>Equipo de snorkel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-600">✓</span>
                    <span>Aguas y cervezas incluidas</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">Ideal para: Amantes de la vida marina y naturaleza</p>
              </div>
            </div>

            {/* Option 4: Atardecer Romántico */}
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition hover:shadow-xl">
              <div className="bg-gradient-to-r from-rose-600 to-rose-700 p-6 text-white">
                <h3 className="text-2xl font-bold">Atardecer en el Malecón</h3>
                <p className="mt-2 text-rose-50">Experiencia romántica para 2</p>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$4,000</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-rose-600">✓</span>
                    <span>4 horas en el malecón y bahía</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-rose-600">✓</span>
                    <span>Servicio para 2 personas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-rose-600">✓</span>
                    <span>Tabla de quesos y carnes frías</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-rose-600">✓</span>
                    <span>Botella de vino</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-rose-600">✓</span>
                    <span>Sonido inalámbrico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-rose-600">✓</span>
                    <span>Internet satelital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-rose-600">✓</span>
                    <span>Capitán y marinero</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  Perfecto para: Aniversarios, propuestas, celebraciones especiales
                </p>
                <p className="mt-2 text-sm font-semibold text-orange-600">
                  *Persona extra: $750 MXN (máximo 4 personas extra)
                </p>
              </div>
            </div>

            {/* Option 5: Brunch Romántico */}
            <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition hover:shadow-xl lg:col-span-2">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white">
                <h3 className="text-2xl font-bold">Brunch Romántico en Velero</h3>
                <p className="mt-2 text-amber-50">Experiencia gourmet para parejas</p>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$4,000</span>
                  <span className="text-gray-600">MXN</span>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-amber-600">✓</span>
                      <span>3 horas de navegación</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-amber-600">✓</span>
                      <span>Servicio para 2 personas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-amber-600">✓</span>
                      <span>Tabla de quesos y carnes frías gourmet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-amber-600">✓</span>
                      <span>Mimosas (vino blanco espumoso con jugo de naranja)</span>
                    </li>
                  </ul>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-amber-600">✓</span>
                      <span>Postre (rebanada de pastel)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-amber-600">✓</span>
                      <span>Aguas y refrescos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-amber-600">✓</span>
                      <span>Capitán profesional</span>
                    </li>
                  </ul>
                </div>
                <p className="mt-4 text-sm text-gray-600">Ideal para: Aniversarios, cumpleaños, ocasiones especiales</p>
                <p className="mt-2 text-sm font-semibold text-orange-600">
                  *Persona extra: $750 MXN (máximo 4 personas extra)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section id="incluye" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">Qué Está Incluido</h2>
          <p className="mt-3 text-gray-600">
            Todas nuestras experiencias en velero incluyen las comodidades esenciales para tu aventura
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border bg-white p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Equipamiento del Velero</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Baño completo</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Cocina equipada</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Camarote privado</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Chimenea</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>TV (en algunos modelos)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Sistema de sonido Bluetooth</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Equipo de Actividades</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Equipo de snorkel</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Kayaks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Paddle boards (SUP)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Tapete flotante</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Dinghy (bote auxiliar)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Sillas y área con sombra</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Alimentos y Bebidas</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Cerveza (18-24 pack según paquete)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Aguas embotelladas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Refrescos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Ceviche fresco</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Sashimi de atún</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Opciones gourmet en paquetes especiales</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Tripulación y Seguridad</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Capitán certificado</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Marinero profesional</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Equipo de seguridad completo</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Chalecos salvavidas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Seguro de embarcación</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">✓</span>
                  <span>Pulseras de acceso ANP (cuando aplique)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">Recomendaciones</h2>
          <div className="mt-6 space-y-4 text-gray-700">
            <div className="rounded-xl border-l-4 border-teal-600 bg-teal-50 p-4">
              <h3 className="font-bold text-teal-900">Qué llevar</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Traje de baño y toalla</li>
                <li>• Protector solar biodegradable</li>
                <li>• Sombrero o gorra</li>
                <li>• Lentes de sol con correa</li>
                <li>• Cámara (preferiblemente acuática)</li>
                <li>• Ropa cómoda de cambio</li>
              </ul>
            </div>

            <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50 p-4">
              <h3 className="font-bold text-blue-900">Horarios recomendados</h3>
              <p className="mt-2 text-sm text-blue-800">
                Para tours de día completo, recomendamos salida entre 9:00-10:00 AM. Para atardeceres, salida 2-3 horas
                antes del sunset.
              </p>
            </div>

            <div className="rounded-xl border-l-4 border-amber-600 bg-amber-50 p-4">
              <h3 className="font-bold text-amber-900">Condiciones climáticas</h3>
              <p className="mt-2 text-sm text-amber-800">
                Los tours están sujetos a condiciones climáticas. En caso de mal tiempo, se reprogramará sin costo
                adicional.
              </p>
            </div>

            <div className="rounded-xl border-l-4 border-rose-600 bg-rose-50 p-4">
              <h3 className="font-bold text-rose-900">Personalización</h3>
              <p className="mt-2 text-sm text-rose-800">
                ¿Quieres personalizar tu experiencia? Podemos organizar catering especial, decoración para ocasiones
                especiales, sesión fotográfica profesional y más. Contáctanos para detalles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold">¿Listo para Zarpar?</h2>
          <p className="mt-4 text-xl text-teal-50">
            Reserva tu velero privado y vive una experiencia inolvidable en el Mar de Cortés
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-teal-700 transition hover:bg-gray-100"
            >
              Contactar para Reservar
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Ver Más Experiencias
            </Link>
          </div>
          <p className="mt-6 text-sm text-teal-100">
            ¿Preguntas? Escríbenos por WhatsApp o email. Respondemos en menos de 24 horas.
          </p>
        </div>
      </section>
    </main>
  )
}
