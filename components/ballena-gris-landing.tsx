"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Clock,
  MapPin,
  Anchor,
  Camera,
  Coffee,
  Binary as Binoculars,
  Check,
  Menu,
  X,
  Heart,
  Users,
  AlertCircle,
} from "lucide-react"

export function BallenaGrisLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Ballena Gris Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-medium text-slate-800">Ballena Gris</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex gap-8">
            <Link href="#story" className="text-sm font-medium text-gray-700 hover:text-slate-600 transition-colors">
              La Experiencia
            </Link>
            <Link
              href="#itinerary"
              className="text-sm font-medium text-gray-700 hover:text-slate-600 transition-colors"
            >
              Itinerario
            </Link>
            <Link href="#includes" className="text-sm font-medium text-gray-700 hover:text-slate-600 transition-colors">
              Incluye
            </Link>
            <Link href="#details" className="text-sm font-medium text-gray-700 hover:text-slate-600 transition-colors">
              Detalles
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link href="/">
              <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Volver a Expediciones
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="#story"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-slate-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              La Experiencia
            </Link>
            <Link
              href="#itinerary"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-slate-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Itinerario
            </Link>
            <Link
              href="#includes"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-slate-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Incluye
            </Link>
            <Link
              href="#details"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-slate-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Detalles
            </Link>
            <div className="mt-4 px-3">
              <Link href="/">
                <button className="w-full bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors">
                  Volver a Expediciones
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/ballena-gris-hero.jpeg"
              alt="Ballena gris emergiendo tranquilamente en las aguas de Bahía Magdalena con las montañas de Baja California Sur al fondo"
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-slate-800/20" />
          </div>
          <div className="container mx-auto relative py-20 md:py-28 lg:py-36 px-4">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Ballena Gris: Encuentro en Bahía Magdalena
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Cada invierno, un milagro ocurre frente a nuestras costas. Ven a ser parte de él.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Explora esta experiencia
                </button>
                <button className="text-white border border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Storytelling Section */}
        <section id="story" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-slate-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Una migración milenaria</h2>
              </div>

              <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl text-center mb-8">
                  Cada invierno, cientos de ballenas grises cruzan el Pacífico desde el Ártico hasta las costas de Baja
                  California Sur. Puerto Chale, una comunidad remota y auténtica, se convierte por unas semanas en el
                  mejor escenario para conocerlas de cerca.
                </p>

                <div className="bg-slate-50 p-8 rounded-lg border border-slate-100">
                  <p className="text-lg mb-4">
                    En esta experiencia, navegarás en panga durante tres horas dentro de la laguna costera donde las
                    ballenas paren, amamantan y descansan. No hay show, no hay guión: solo tú, el mar… y la posibilidad
                    de ver a un gigante acercarse con calma.
                  </p>
                  <p className="text-lg font-medium text-slate-800">
                    No es un tour cualquiera. Es una expedición para los que valoran lo real, lo íntimo y lo salvaje.
                  </p>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Puerto Chale</h3>
                  <p className="text-gray-600">Comunidad auténtica en el corazón de Bahía Magdalena</p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Anchor className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Laguna Protegida</h3>
                  <p className="text-gray-600">Aguas tranquilas donde las ballenas descansan y se reproducen</p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Experiencia Íntima</h3>
                  <p className="text-gray-600">Grupos pequeños para una conexión auténtica con la naturaleza</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Section */}
        <section id="itinerary" className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Itinerario del día</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Un día completo diseñado para maximizar tu conexión con las ballenas grises en su santuario natural.
            </p>

            <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-7 w-7 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xl mb-2">5:30 AM | Salida desde La Paz</h4>
                    <p className="text-gray-700 text-lg">
                      Partimos en transporte compartido hacia Puerto Chale. El viaje es parte de la aventura, cruzando
                      paisajes únicos de Baja California Sur.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Anchor className="h-7 w-7 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xl mb-2">8:00 AM | Llegada y embarque</h4>
                    <p className="text-gray-700 text-lg">
                      Llegamos a Puerto Chale y embarcamos en panga con capitán local. Briefing de seguridad y
                      preparación para el encuentro.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Binoculars className="h-7 w-7 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xl mb-2">8:30 AM - 11:30 AM | Navegación</h4>
                    <p className="text-gray-700 text-lg mb-3">
                      Tres horas navegando en la laguna costera observando ballenas grises. Cada encuentro es único e
                      impredecible.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-gray-600 font-medium">Durante la navegación:</p>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Observación respetuosa de ballenas madres con crías</li>
                        <li>• Aprendizaje sobre comportamiento y migración</li>
                        <li>• Fotografía y contemplación silenciosa</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Coffee className="h-7 w-7 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xl mb-2">12:00 PM | Snack frente al mar</h4>
                    <p className="text-gray-700 text-lg">
                      Descanso en tierra firme con snack local y tiempo para procesar la experiencia vivida.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-7 w-7 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xl mb-2">1:00 PM - 3:30 PM | Regreso a La Paz</h4>
                    <p className="text-gray-700 text-lg">
                      Viaje de regreso con tiempo para reflexionar sobre el encuentro con estos gigantes gentiles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Includes Section */}
        <section id="includes" className="py-16 md:py-24 bg-slate-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">¿Qué incluye?</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto text-center mb-16">
              Todo lo necesario para vivir esta experiencia de manera cómoda, segura y memorable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Transporte redondo compartido</h3>
                  <p className="opacity-90">Desde La Paz hasta Puerto Chale en vehículo cómodo y seguro.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Anchor className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tour en panga con capitán local</h3>
                  <p className="opacity-90">
                    Embarcación tradicional manejada por pescadores locales con años de experiencia.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Guía biólogo marino</h3>
                  <p className="opacity-90">
                    Acompañamiento especializado para enriquecer tu comprensión de las ballenas grises.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Fotos y videos incluidos</h3>
                  <p className="opacity-90">
                    Capturas profesionales de tu experiencia para que tengas un recuerdo duradero.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Coffee className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Snack local y hidratación</h3>
                  <p className="opacity-90">Fruta fresca, snack regional y agua purificada durante todo el día.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Binoculars className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Equipo de observación</h3>
                  <p className="opacity-90">Binoculares de calidad para no perderte ningún detalle del encuentro.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wildlife Section - Especies que puedes encontrar */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Especies que puedes encontrar</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Bahía Magdalena es un santuario natural donde convergen diferentes especies marinas durante la temporada
              de ballenas grises.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/ballena-gris-real.jpeg"
                    alt="Ballena gris emergiendo en las tranquilas aguas de Bahía Magdalena"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-slate-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Ene - Mar
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ballena Gris</h3>
                  <p className="text-gray-700">
                    Las protagonistas de la experiencia. Madres con crías que descansan en las aguas protegidas de la
                    laguna durante su migración desde el Ártico.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/delfinsaltando.jpeg"
                    alt="Delfín saltando en las aguas de Bahía Magdalena"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-slate-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Todo el año
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Delfines</h3>
                  <p className="text-gray-700">
                    Residentes permanentes de la bahía, suelen acompañar las pangas con su curiosidad natural y
                    acrobacias espontáneas.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/lobomarinonadando.jpeg"
                    alt="Lobos marinos descansando en las rocas de Bahía Magdalena"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-slate-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Todo el año
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Lobos Marinos</h3>
                  <p className="text-gray-700">
                    Colonias que descansan en las rocas y manglares. Su curiosidad los lleva a acercarse a observar a
                    los visitantes.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Aves+Marinas"
                    alt="Fragatas y pelícanos volando sobre Bahía Magdalena"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-slate-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Todo el año
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aves Marinas</h3>
                  <p className="text-gray-700">
                    Fragatas, pelícanos y cormoranes que aprovechan la abundancia de peces en la laguna para
                    alimentarse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Testimonios de viajeros</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Experiencias reales de quienes han vivido el encuentro con ballenas grises.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden mr-4 flex items-center justify-center">
                    <span className="text-slate-600 font-semibold text-lg">L</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lucía</h4>
                    <p className="text-sm text-gray-600">CDMX</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700">
                  "Siempre soñé con ver ballenas. Pero esto fue más que eso. Lloré de emoción. Gracias por respetar la
                  naturaleza así."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden mr-4 flex items-center justify-center">
                    <span className="text-slate-600 font-semibold text-lg">P</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pablo</h4>
                    <p className="text-sm text-gray-600">Alemania</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700">
                  "No fue un tour, fue una experiencia real. La cercanía con las ballenas, el silencio, todo fue
                  mágico."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden mr-4 flex items-center justify-center">
                    <span className="text-slate-600 font-semibold text-lg">K</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Karla</h4>
                    <p className="text-sm text-gray-600">España</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700">
                  "El equipo fue increíble. Nos explicaron todo con tanta pasión que ahora veo el océano con otros
                  ojos."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Precios</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Una experiencia auténtica con cupo limitado para garantizar un encuentro íntimo con las ballenas grises.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Encuentro con Ballena Gris</h3>
                <div className="text-4xl font-bold text-slate-600 mb-6">
                  $2,800 <span className="text-lg text-gray-600 font-normal">MXN / persona</span>
                </div>
                <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-slate-600 flex-shrink-0" />
                    <span className="text-gray-700">Cupo limitado: 8 personas por salida</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-slate-600 flex-shrink-0" />
                    <span className="text-gray-700">Experiencia compartida (no privada)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-slate-600 flex-shrink-0" />
                    <span className="text-gray-700">Transporte redondo desde La Paz</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-slate-600 flex-shrink-0" />
                    <span className="text-gray-700">Guía biólogo marino especializado</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-slate-600 flex-shrink-0" />
                    <span className="text-gray-700">Fotos profesionales incluidas</span>
                  </li>
                </ul>
                <button className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-md font-medium transition-colors">
                  Reserva tu lugar
                </button>
              </div>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg border border-slate-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-slate-800 mb-3 text-center">Temporada Limitada</h3>
              <p className="text-gray-700 text-center">
                Solo operamos durante la temporada de ballenas grises (enero-marzo).
                <br />
                Las fechas exactas pueden variar según las condiciones naturales.
              </p>
            </div>
          </div>
        </section>

        {/* Important Details Section */}
        <section id="details" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Información importante</h2>
                <p className="text-lg text-gray-700">
                  Todo lo que necesitas saber para vivir esta experiencia auténtica
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">Nota realista</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Trabajamos with vida salvaje en libertad. Aunque las probabilidades de avistamiento son altísimas en
                    temporada, no podemos garantizarlas. Lo que sí garantizamos: un equipo comprometido y un respeto
                    profundo por el océano.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">Experiencia compartida</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Compartirás esta aventura con otros viajeros que, como tú, valoran la autenticidad y el respeto por
                    la naturaleza. Creemos que estos encuentros se enriquecen cuando se viven en comunidad.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800">Para quién es esta experiencia</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Ideal para quienes buscan conexión genuina con la naturaleza, no entretenimiento artificial. Si
                  valoras la autenticidad, el aprendizaje y los encuentros reales con la vida marina, esta experiencia
                  transformará tu forma de ver el océano.
                </p>
              </div>

              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 bg-slate-100 px-6 py-3 rounded-full">
                  <Heart className="h-5 w-5 text-slate-600" />
                  <span className="text-slate-700 font-medium">Temporada: Enero - Marzo • Cupos limitados</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-16 md:py-24 bg-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Este invierno, no vayas a otro tour. Ve a un milagro.
              </h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Viaja con nosotros a Puerto Chale y deja que la naturaleza te sorprenda. Algunos encuentros cambian la
                forma en que vemos el mundo para siempre.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-slate-800 hover:bg-slate-100 px-8 py-4 rounded-md text-lg font-medium transition-colors">
                  Reserva tu lugar
                </button>
                <button className="text-white border border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/10 px-8 py-4 rounded-md text-lg font-medium transition-colors">
                  Habla con un guía
                </button>
              </div>
              <p className="text-sm opacity-75 mt-6">Cupos limitados • Temporada enero-marzo • Experiencia auténtica</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
