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
  Waves,
  Fish,
  Eye,
} from "lucide-react"

export function SafariBahiaMagdalena() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Safari Bahía Magdalena Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-medium text-teal-800">Safari Bahía Magdalena</span>
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
              Especies
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
              Especies
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
              src="/images/marlin-bahia-magdalena-hero.jpeg"
              alt="Marlin rayado nadando elegantemente en las aguas azules de Bahía Magdalena durante la corrida de sardinas"
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
                Safari Bahía Magdalena: El safari más salvaje
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Un espectáculo único de vida marina, donde miles de sardinas atraen a los depredadores más
                impresionantes del océano.
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

        {/* About Section - ¿Qué es la Corrida de Sardinas? */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué es la Corrida de Sardinas?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Cada año, durante los meses de Noviembre y Diciembre sucede uno de los fenómenos más salvajes de la
                naturaleza. Un evento tan breve como poderoso, donde las aguas de Bahía Magdalena se convierten en el
                epicentro de la vida salvaje marina: miles de sardinas migran en enormes bancos, atrayendo a
                depredadores tope como marlines, peces dorados, lobos marinos e incluso ballenas.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Este evento natural no solo es visualmente impresionante. Es una lección viva sobre el equilibrio del
                océano y el poder de la naturaleza en su estado más crudo. Y ahora puedes presenciarlo desde adentro.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fish className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Migración Masiva</h3>
                <p className="text-gray-700">
                  Miles de sardinas forman bancos gigantescos que se mueven como una sola entidad a través de las aguas.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Frenesí Alimentario</h3>
                <p className="text-gray-700">
                  Los depredadores aprovechan esta abundancia en un espectáculo de caza coordinada y feroz.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Experiencia Única</h3>
                <p className="text-gray-700">
                  Un fenómeno que solo ocurre dos meses al año y que pocos tienen la oportunidad de presenciar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 md:py-24 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">La experiencia Keabelmet</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center mb-16">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  No es un tour. Es un must para los amantes del océano. Zarparás hacia el gran azul desde uno de los
                  puntos más vírgenes de la península, en un safari guiado por biólogos marinos con años de experiencia,
                  y serás parte de uno de los espectáculos más intensos del Pacífico mexicano.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Te sumergirás (si las condiciones lo permiten) en el corazón de la acción, flotando sobre un
                  ecosistema en movimiento, donde cada segundo puede cambiar todo.
                </p>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/gallery/marlin-cazando.jpeg"
                  alt="Marlin rayado cazando sardinas en acción durante el safari"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Itinerario */}
            <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Itinerario del Safari</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">5:00 AM | Salida desde La Paz</h4>
                    <p className="text-gray-700">
                      Partimos rumbo a Puerto Chale, el punto de acceso a Bahía Magdalena.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Anchor className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">7:30 AM – 2:30 PM | Safari en mar abierto</h4>
                    <p className="text-gray-700 mb-3">
                      Navegación en busca de los bancos de sardinas y sus depredadores.
                    </p>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• Avistamiento de vida marina</li>
                      <li>• Snorkel en el corazón de la acción (condiciones permitiendo)</li>
                      <li>• Fotografía submarina</li>
                      <li>• Refrigerio a bordo</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">6:00 PM aprox. | Regreso a La Paz</h4>
                    <p className="text-gray-700">
                      Regreso con la satisfacción de haber vivido uno de los espectáculos más salvajes del océano.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wildlife Section - Especies destacadas */}
        <section id="wildlife" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Especies que puedes encontrar</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Durante la corrida de sardinas, Bahía Magdalena se convierte en un teatro natural donde convergen algunas
              de las especies más impresionantes del Pacífico.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/sardinas-banco.jpeg"
                    alt="Banco masivo de sardinas formando una bola durante la migración en Bahía Magdalena"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Nov - Dic
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sardinas</h3>
                  <p className="text-gray-700">
                    Las protagonistas del espectáculo. Forman bancos masivos que pueden extenderse por kilómetros,
                    creando una "bola de sardinas" que atrae a todos los depredadores.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/gallery/marlin-cazando.jpeg"
                    alt="Marlin rayado cazando sardinas en Bahía Magdalena"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Nov - Dic
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Marlin Rayado</h3>
                  <p className="text-gray-700">
                    Veloces y letales, los marlines rayados son los cazadores más espectaculares. Su velocidad y
                    agilidad los convierte en los reyes de la corrida.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/lobomarinonadando.jpeg"
                    alt="Lobos marinos cazando durante la corrida de sardinas"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Nov - Dic
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Lobos Marinos</h3>
                  <p className="text-gray-700">
                    Ágiles y coordinados, los lobos marinos cazan en grupos, aprovechando su velocidad bajo el agua para
                    atrapar sardinas.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/dorado.jpeg"
                    alt="Pez dorado (mahi-mahi) nadando en las aguas del Pacífico durante la corrida de sardinas"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Nov - Dic
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pez Dorado</h3>
                  <p className="text-gray-700">
                    Conocidos por su coloración dorada brillante, estos peces son cazadores oportunistas que aprovechan
                    el frenesí alimentario.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/ballena-jorobada-saltando.jpeg"
                    alt="Ballena jorobada saltando espectacularmente frente a las montañas de Baja California Sur durante la corrida de sardinas"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Nov - Dic
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ballenas Jorobadas</h3>
                  <p className="text-gray-700">
                    Las gigantes del océano aprovechan la abundancia de sardinas para alimentarse antes de continuar su
                    migración.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/images/especies/ballena-bryde-underwater.jpeg"
                    alt="Ballena de Bryde nadando bajo el agua durante la corrida de sardinas en Bahía Magdalena"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Nov - Dic
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ballenas de Bryde</h3>
                  <p className="text-gray-700">
                    Residentes del Pacífico mexicano, estas ballenas son expertas en aprovechar las agregaciones de
                    sardinas para alimentarse.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-teal-50 p-6 rounded-lg border border-teal-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">Temporada Limitada</h3>
              <p className="text-gray-700 text-center">
                La corrida de sardinas solo ocurre durante noviembre y diciembre. Es un fenómeno natural impredecible
                que depende de las condiciones oceánicas, lo que hace cada avistamiento aún más especial.
              </p>
            </div>
          </div>
        </section>

        {/* Includes Section */}
        <section className="py-16 md:py-24 bg-teal-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Incluye la expedición</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto text-center mb-16">
              Todo lo que necesitas para vivir el safari más salvaje del Pacífico mexicano.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Anchor className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Transporte terrestre y marítimo</h3>
                  <p className="opacity-90">
                    Traslado desde La Paz a Puerto Chale y embarcación especializada para safari marino.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Guía biólogo marino especializado</h3>
                  <p className="opacity-90">
                    Experto en el comportamiento de la corrida de sardinas y la vida marina del Pacífico.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Equipo completo de snorkel</h3>
                  <p className="opacity-90">Máscara, tubo y aletas profesionales para sumergirte en la acción.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Fotografía y video submarino</h3>
                  <p className="opacity-90">
                    Capturas profesionales del espectáculo para que tengas un recuerdo épico.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Coffee className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Refrigerio y hidratación</h3>
                  <p className="opacity-90">
                    Snacks energéticos y agua purificada para mantenerte con energía durante el safari.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Binoculars className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Equipo de observación</h3>
                  <p className="opacity-90">
                    Binoculares de alta calidad para no perderte ningún detalle del espectáculo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Precios y Reservas</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Una experiencia única y exclusiva con cupo limitado para garantizar la mejor experiencia posible.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Safari Bahía Magdalena</h3>
                <div className="text-4xl font-bold text-teal-600 mb-6">
                  $3,500 <span className="text-lg text-gray-600 font-normal">MXN / persona</span>
                </div>
                <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">Cupo máximo: 6 personas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">Experiencia exclusiva y personalizada</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">Temporada limitada (Nov - Dic)</span>
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
            </div>

            <div className="mt-12 bg-teal-50 p-6 rounded-lg border border-teal-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">Disponibilidad Limitada</h3>
              <p className="text-gray-700 text-center">
                Solo operamos durante la temporada de corrida de sardinas (noviembre y diciembre).
                <br />
                Las fechas exactas dependen de las condiciones naturales y se confirman con anticipación.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Lo que dicen nuestros aventureros</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Experiencias reales de quienes han vivido el safari más salvaje del Pacífico.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=A"
                      alt="Alejandro"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Alejandro Ruiz</h4>
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
                  "Increíble experiencia. Ver a los marlines cazando sardinas fue como estar en un documental de
                  National Geographic. La adrenalina y la emoción son indescriptibles."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=S"
                      alt="Sofia"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sofía Mendoza</h4>
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
                  "Una experiencia que te cambia la perspectiva del océano. Estar en medio de la corrida de sardinas es
                  algo que no se puede explicar con palabras. ¡Absolutamente recomendado!"
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=D"
                      alt="Diego"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Diego Herrera</h4>
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
                  "El safari más intenso que he vivido. Los guías son expertos y te hacen sentir seguro mientras vives
                  esta experiencia única. Las fotos y videos quedaron espectaculares."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-16 md:py-24 bg-teal-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para vivir el safari más salvaje del Pacífico?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Solo dos meses al año. Solo 6 personas por safari. Una experiencia que recordarás para toda la vida.
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
