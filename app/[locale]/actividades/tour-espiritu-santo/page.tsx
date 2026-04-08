import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Check, Star, Users } from "lucide-react"
import { isValidLocale, defaultLocale } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Tour Isla Espiritu Santo",
  description:
    "Nada con lobos marinos en la Isla Espiritu Santo, Patrimonio UNESCO. Snorkel, playas virgenes y picnic gourmet en el Mar de Cortes desde La Paz, BCS.",
}

export default async function TourEspirituSantoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const l = (path: string) => locale === "es" ? path : `/${locale}${path}`
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/espiritu-santo-island-paradise-beach.jpg"
              alt="Isla Espíritu Santo - Paraíso natural"
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 to-teal-800/30" />
          </div>
          <div className="container mx-auto relative py-20 md:py-28 lg:py-36 px-4">
            <div className="max-w-2xl space-y-6">
              <div className="inline-block bg-teal-600/90 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                🏝️ Todo el año
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Isla Espíritu Santo: El Acuario del Mundo
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Nada con lobos marinos juguetones, explora playas de arena blanca y aguas cristalinas, y descubre por
                qué este paraíso es Patrimonio Mundial de la UNESCO.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg">
                  Reserva tu aventura
                </button>
                <button className="text-white border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-3 rounded-lg font-medium transition-colors">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Una joya del Mar de Cortés</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                La Isla Espíritu Santo es hogar de la colonia más grande de lobos marinos de California en el Golfo.
                Aquí vivirás un encuentro responsable, seguro y guiado con estos animales en aguas cristalinas.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nuestros guías certificados te acompañarán con explicaciones sobre historia natural, conservación marina
                y técnicas seguras de interacción con la fauna.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/picnic-beach-espiritu-santo.jpg"
                  alt="Picnic en playa de Isla Espíritu Santo"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Punto de Salida</h3>
                      <p className="text-gray-700">Marina de La Paz - Salida a las 8:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
                  <div className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Duración Total</h3>
                      <p className="text-gray-700">
                        6 horas aproximadamente: navegación, snorkel, picnic y exploración
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-teal-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Grupo Reducido</h3>
                      <p className="text-gray-700">Máximo 10 personas para experiencia personalizada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">🏝️ Itinerario del día</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Una aventura completa por el paraíso del Mar de Cortés.
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* Timeline Item 1 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      1
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">⚓ Salida desde La Paz</h3>
                    <p className="text-gray-700">
                      Nos encontramos en la Marina de La Paz a las 8:00 AM. Zarpamos con el sol de la mañana y navegamos
                      hacia el norte por el Mar de Cortés, disfrutando de vistas espectaculares.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      2
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🦭 Nado con Lobos Marinos</h3>
                    <p className="text-gray-700">
                      Llegamos a Los Islotes, hogar de más de 400 lobos marinos. Te proporcionamos equipo de snorkel y
                      te acompañamos al agua. Los lobos son curiosos y juguetones, ¡una experiencia única e inolvidable!
                    </p>
                    <p className="text-sm text-gray-600 mt-2 italic">
                      Nota: Del 1 de junio al 31 de agosto (temporada de cría) no se permite nadar; solo observación
                      desde la embarcación.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      3
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🏖️ Playa Ensenada Grande</h3>
                    <p className="text-gray-700">
                      Navegamos hacia una de las playas más hermosas de México. Arena blanca, agua turquesa cristalina,
                      y formaciones rocosas impresionantes. Tiempo para nadar, hacer snorkel o simplemente relajarte en
                      este paraíso.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 4 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      4
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🍴 Picnic Gourmet</h3>
                    <p className="text-gray-700">
                      Disfrutamos de un delicioso almuerzo tipo picnic con ceviche fresco, tostadas, fruta de temporada
                      y bebidas. Todo servido con vistas al paraíso.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 5 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      5
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">📸 Regreso a La Paz</h3>
                    <p className="text-gray-700">
                      Navegamos de regreso con el corazón lleno y la cámara repleta de recuerdos. Llegada aproximada a
                      las 2:00 PM - 3:00 PM. Te compartimos todas las fotos y videos del día.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              ✅ ¿Qué incluye tu experiencia?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Todo lo necesario para que vivas una aventura segura, cómoda y memorable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Transporte en Lancha</h3>
                  <p className="text-sm text-gray-600">Desde Marina de La Paz ida y vuelta</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Guía Certificado</h3>
                  <p className="text-sm text-gray-600">Biólogo marino bilingüe</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Equipo de Snorkel</h3>
                  <p className="text-sm text-gray-600">Visor, aletas y chaleco salvavidas</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Picnic Gourmet</h3>
                  <p className="text-sm text-gray-600">Ceviche fresco, tostadas, fruta y bebidas</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fotos y Videos</h3>
                  <p className="text-sm text-gray-600">Profesionales de tu experiencia</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Permiso de Parque</h3>
                  <p className="text-sm text-gray-600">Parque Nacional incluido</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">💲 Opciones de Tour</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Elige la experiencia que mejor se adapte a tu estilo de viaje.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Standard Tour */}
              <div className="bg-white p-8 rounded-xl border-2 border-teal-200 hover:border-teal-400 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Tour Estándar</h3>
                  <p className="text-gray-600 mb-4">Compartido en panga</p>
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    $2,200 <span className="text-lg font-normal text-gray-600">MXN</span>
                  </div>
                  <p className="text-sm text-gray-600">por persona</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Transporte en panga compartida</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Guía biólogo marino</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Equipo completo de snorkel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Picnic gourmet incluido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Fotos y videos del tour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Máximo 10 personas</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Reservar
                </button>
              </div>

              {/* Sailboat Tour */}
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-8 rounded-xl border-2 border-teal-600 relative transform scale-105 shadow-xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full">PRIVADO</span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Tour en Velero</h3>
                  <p className="text-teal-50 mb-4">Velero privado 40 pies</p>
                  <div className="text-4xl font-bold text-white mb-2">
                    Desde $16,000 <span className="text-lg font-normal text-teal-100">MXN</span>
                  </div>
                  <p className="text-sm text-teal-100">hasta 8 personas</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white font-medium">Todo lo del tour estándar +</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Velero privado de lujo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Capitán y tripulación dedicada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Itinerario flexible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Experiencia de navegación a vela</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Máxima privacidad y confort</span>
                  </li>
                </ul>
                <button className="w-full bg-white hover:bg-gray-100 text-teal-600 px-6 py-3 rounded-lg font-medium transition-colors">
                  Consultar Disponibilidad
                </button>
              </div>

              {/* Yacht Tour */}
              <div className="bg-white p-8 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-colors">
                <div className="text-center mb-6">
                  <div className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    PREMIUM
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Tour en Yate</h3>
                  <p className="text-gray-600 mb-4">Flota de yates disponibles</p>
                  <div className="text-4xl font-bold text-orange-600 mb-2">Consultar</div>
                  <p className="text-sm text-gray-600">precio según embarcación</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 font-medium">Todo lo anterior +</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Yates de lujo de 40-70 pies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Servicio completo de catering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Tripulación profesional completa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Amenidades de primera clase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Experiencia VIP personalizada</span>
                  </li>
                </ul>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Preguntar por la Flota
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Lo que dicen nuestros viajeros
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Nadar con los lobos marinos fue la experiencia más mágica de mi vida. Son tan juguetones y curiosos.
                  El equipo de Keabelmet es súper profesional y respetuoso con los animales. ¡100% recomendado!"
                </p>
                <p className="font-semibold text-gray-900">— María González</p>
                <p className="text-sm text-gray-600">Ciudad de México</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "El picnic en la playa fue increíble, el ceviche estaba delicioso. Las playas son paradisíacas y las
                  fotos que nos tomaron quedaron espectaculares. Una aventura inolvidable."
                </p>
                <p className="font-semibold text-gray-900">— James Patterson</p>
                <p className="text-sm text-gray-600">Los Angeles, CA</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "El biólogo marino nos explicó todo sobre la isla y la vida marina. Me sentí seguro en todo momento.
                  Las aguas son cristalinas y la fauna es impresionante. ¡Volveré sin duda!"
                </p>
                <p className="font-semibold text-gray-900">— Alejandro Rodríguez</p>
                <p className="text-sm text-gray-600">Guadalajara</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-teal-600 to-cyan-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para vivir el acuario del mundo?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              La Isla Espíritu Santo te espera con sus aguas cristalinas, playas vírgenes y vida marina increíble.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
                Reserva tu aventura ahora
              </button>
              <Link href={l("/")}>
                <button className="text-white border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                  Ver más expediciones
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 Keabelmet. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
