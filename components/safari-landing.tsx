"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Anchor, Camera, Coffee, TelescopeIcon as Binoculars, Check, Menu, X } from "lucide-react"

export function SafariLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Safari La Ventana Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-medium text-teal-800">Safari La Ventana</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
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
            <Link href="#about" className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
              Acerca de
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
            >
              Experiencia
            </Link>
            <Link href="#wildlife" className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
              Vida Marina
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
              Precios
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
            >
              Testimonios
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link href="/">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Volver a Expediciones
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="#about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-teal-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Acerca de
            </Link>
            <Link
              href="#experience"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-teal-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Experiencia
            </Link>
            <Link
              href="#wildlife"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-teal-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vida Marina
            </Link>
            <Link
              href="#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-teal-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Precios
            </Link>
            <Link
              href="#testimonials"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-teal-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonios
            </Link>
            <div className="mt-4 px-3">
              <Link href="/">
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors">
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
              src="/images/orca-safari.jpg"
              alt="Orca nadando en el océano azul"
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 to-teal-800/30" />
          </div>
          <div className="container mx-auto relative py-20 md:py-28 lg:py-36 px-4">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Safari La Ventana: Encuentro Íntimo con Gigantes del Océano
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Una experiencia única en La Ventana e Isla Cerralvo, Baja California Sur. Descubre la magia del Golfo de
                California como nunca antes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Reserva tu aventura
                </button>
                <button className="text-white border border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué es el Safari La Ventana?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Zarpamos desde las costas tranquilas de La Ventana rumbo al azul profundo. A bordo de la lancha, guiados
                por biólogos marinos y capitanes locales, navegamos en busca de lo inesperado: móbulas que vuelan,
                delfines que nos escoltan, ballenas que emergen como leyendas vivas. No hay guión. No hay show. Porque
                cada encuentro con la fauna es auténtico, espontáneo e irrepetible. Porque esto no es un tour turístico…
                es una aventura real. Solo es la naturaleza… salvaje y sin filtros.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
              <div className="order-2 md:order-1 flex flex-col justify-center space-y-6">
                <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                  <h3 className="text-xl font-semibold text-teal-800 mb-3">Nuestro Compromiso</h3>
                  <p className="text-gray-700">
                    Respetamos profundamente la vida marina. Nuestros safaris están diseñados para observar sin
                    perturbar, aprender sin interferir, y maravillarse sin dañar el ecosistema que nos acoge.
                  </p>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                  <h3 className="text-xl font-semibold text-teal-800 mb-3">Experiencia Guiada</h3>
                  <p className="text-gray-700">
                    Cada expedición es liderada por biólogos marinos con años de experiencia en el Golfo de California,
                    quienes comparten su conocimiento y pasión por este ecosistema único.
                  </p>
                </div>
              </div>

              <div className="order-1 md:order-2 rounded-xl overflow-hidden mx-auto md:mx-0 w-[80%] md:w-[60%] shadow-md">
                <Image
                  src="/images/safari/nuestrocompromiso2.jpeg"
                  alt="Guía entusiasta con equipo de snorkel disfrutando de una experiencia marina en Safari La Ventana"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "4/5", objectPosition: "center" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 md:py-24 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">¿Cómo es la experiencia?</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Un día completo de aventura marina, diseñado para maximizar las posibilidades de encuentros con vida
              salvaje mientras disfrutas del impresionante paisaje del Mar de Cortés.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Punto de Encuentro</h3>
                <p className="text-gray-700">
                  Playa Central, La Ventana. Fácil de encontrar y con estacionamiento disponible.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Horario</h3>
                <p className="text-gray-700">
                  Salida: 8:00 AM
                  <br />
                  Duración: 6 horas de aventura marina.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <Anchor className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Actividades</h3>
                <p className="text-gray-700">
                  Navegación, snorkel (si las condiciones lo permiten), exploración en Isla Cerralvo.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Refrigerio</h3>
                <p className="text-gray-700">
                  Disfrutarás de ceviche fresco, frutas de temporada y agua durante la expedición.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Itinerario Detallado</h3>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Bienvenida y Briefing (8:00 AM)</h4>
                      <p className="text-gray-700">
                        Conoce a tu guía biólogo marino y recibe una introducción sobre la vida marina que podrías
                        encontrar.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Navegación y Búsqueda (8:30 AM - 11:30 AM)</h4>
                      <p className="text-gray-700">
                        Navegamos en busca de vida marina, siguiendo patrones de comportamiento y señales naturales.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Exploración en Isla Cerralvo (11:30 AM - 1:00 PM)</h4>
                      <p className="text-gray-700">
                        Dependiendo de las condiciones, podremos hacer snorkel o explorar las aguas cristalinas
                        alrededor de la isla.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Refrigerio y Descanso (1:00 PM - 1:30 PM)</h4>
                      <p className="text-gray-700">
                        Disfrutamos de un delicioso ceviche fresco y frutas mientras descansamos.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Regreso Escénico (1:30 PM - 2:00 PM)</h4>
                      <p className="text-gray-700">
                        Navegamos de regreso a La Ventana, con posibilidad de más avistamientos en el camino.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Wildlife Section */}
        <section id="wildlife" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Especies que puedes encontrar</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              El Golfo de California es uno de los mares más biodiversos del planeta. Estas son algunas de las especies
              que podrías avistar durante tu safari.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/mobulaschafa.jpeg"
                    alt="Grupo de móbulas nadando juntas en las aguas cristalinas del Mar de Cortés"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Abr - Jul
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Móbulas</h3>
                  <p className="text-gray-700">
                    Conocidas como "diablos de mar", estas mantarrayas realizan impresionantes saltos fuera del agua,
                    creando un espectáculo único. Suelen formar grandes agregaciones durante su temporada de
                    apareamiento.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/delfinsaltando.jpeg"
                    alt="Delfín saltando fuera del agua en el Mar de Cortés"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Todo el año
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Delfines</h3>
                  <p className="text-gray-700">
                    Juguetones y sociales, los delfines suelen acercarse a las embarcaciones y ofrecer un espectáculo
                    natural con sus saltos y acrobacias.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/ballenasaltando2.jpeg"
                    alt="Ballena jorobada saltando frente a las montañas de Baja California Sur"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Dic - Abr
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ballena Jorobada</h3>
                  <p className="text-gray-700">
                    Conocidas por sus impresionantes saltos y cantos complejos. Las ballenas jorobadas migran anualmente
                    a las cálidas aguas del Golfo de California.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/lobomarinonadando.jpeg"
                    alt="Lobo marino nadando bajo el agua en las cristalinas aguas del Mar de Cortés"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Todo el año
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Lobos Marinos</h3>
                  <p className="text-gray-700">
                    Curiosos y carismáticos, los lobos marinos suelen descansar en las rocas y, si tienes suerte,
                    podrías nadar cerca de ellos.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/cachalote2.jpeg"
                    alt="Cachalote nadando en las profundidades del Mar de Cortés"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Jun - Nov
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cachalotes</h3>
                  <p className="text-gray-700">
                    Los cachalotes son los depredadores con dientes más grandes del planeta. Impresionantes buceadores
                    que pueden sumergirse a profundidades extremas.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/orcalaventana.jpeg"
                    alt="Orca emergiendo en las aguas del Mar de Cortés"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Todo el año
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Orcas</h3>
                  <p className="text-gray-700">
                    Conocidas como "ballenas asesinas", las orcas son en realidad delfines grandes. Inteligentes y
                    sociales, cazan en grupos coordinados.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-teal-50 p-6 rounded-lg border border-teal-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">Nota de Realismo</h3>
              <p className="text-gray-700 text-center">
                Trabajamos con animales salvajes en libertad. Por lo que no garantizamos avistamientos, pero sí
                garantizamos compromiso, experiencia y un enfoque respetuoso que maximiza tus posibilidades de vivir
                momentos únicos.
              </p>
            </div>
          </div>
        </section>

        {/* Includes Section */}
        <section className="py-16 md:py-24 bg-teal-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Incluye la expedición</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto text-center mb-16">
              Todo lo que necesitas para disfrutar de una experiencia segura, cómoda y enriquecedora.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Anchor className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Transporte en panga</h3>
                  <p className="opacity-90">
                    Embarcación segura y cómoda, perfecta para navegar en el Golfo de California.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Guía biólogo marino</h3>
                  <p className="opacity-90">
                    Expertos que compartirán su conocimiento sobre el ecosistema y la vida marina.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Equipo completo de snorkel</h3>
                  <p className="opacity-90">Máscara, tubo y aletas de calidad para explorar bajo el agua.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Fotografías y videos</h3>
                  <p className="opacity-90">
                    Capturas profesionales de tu experiencia para que te lleves un recuerdo inolvidable.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Coffee className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ceviche fresco y refrigerio</h3>
                  <p className="opacity-90">
                    Delicioso ceviche preparado con pescado local, frutas frescas y agua purificada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Binoculars className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Binoculares y guía de fauna</h3>
                  <p className="opacity-90">Herramientas para mejorar tu experiencia de avistamiento y aprendizaje.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Precios</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Opciones flexibles para individuos, parejas, familias o grupos que desean vivir esta experiencia única.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Safari Grupal</h3>
                <div className="text-4xl font-bold text-teal-600 mb-6">
                  $2,800 <span className="text-lg text-gray-600 font-normal">MXN / persona</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">Grupos de hasta 8 personas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">Experiencia compartida</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">Ideal para viajeros individuales o parejas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">Todos los servicios incluidos</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-medium transition-colors">
                  Reservar Ahora
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Safari Privado</h3>
                <div className="text-4xl font-bold text-teal-600 mb-6">
                  $14,000 <span className="text-lg text-gray-600 font-normal">MXN / grupo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">Embarcación exclusiva para tu grupo</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">Hasta 8 personas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">Itinerario personalizable</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">Atención exclusiva del guía</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-medium transition-colors">
                  Reservar Privado
                </button>
              </div>
            </div>

            <div className="mt-12 bg-teal-50 p-6 rounded-lg border border-teal-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">¿Viajas con niños?</h3>
              <p className="text-gray-700 text-center">
                Niños menores de 5 años: Gratis
                <br />
                Niños de 6 a 12 años: 50% de descuento
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Lo que dicen nuestros aventureros</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Experiencias reales de quienes han vivido la magia de Safari La Ventana.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=M"
                      alt="María"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">María Rodríguez</h4>
                    <p className="text-sm text-gray-600">Ciudad de México</p>
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
                  "Una experiencia mágica. Ver a las ballenas jorobadas tan cerca fue indescriptible. Los guías son muy
                  profesionales y respetuosos con los animales. ¡Volveré el próximo año!"
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=J"
                      alt="Juan"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Juan Martínez</h4>
                    <p className="text-sm text-gray-600">Guadalajara</p>
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
                  "Increíble safari. Vimos delfines, mobulas saltando y hasta una ballena azul a lo lejos. El ceviche
                  estaba delicioso y los guías muy conocedores. Una experiencia auténtica."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=L"
                      alt="Laura"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Laura Sánchez</h4>
                    <p className="text-sm text-gray-600">Monterrey</p>
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
                  "Fuimos con nuestros hijos de 8 y 10 años y quedaron maravillados. Los guías son excelentes explicando
                  a los niños sobre la vida marina. Una aventura educativa y emocionante para toda la familia."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-16 md:py-24 bg-teal-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para vivir el mar de verdad?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Reserva tu safari ahora y prepárate para una experiencia que cambiará tu forma de ver el océano.
            </p>
            <button className="bg-white text-teal-800 hover:bg-teal-100 px-8 py-4 rounded-md text-lg font-medium transition-colors">
              Reserva Ahora
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
