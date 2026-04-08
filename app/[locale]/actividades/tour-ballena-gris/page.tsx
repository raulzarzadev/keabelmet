import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Check, Star, Anchor } from "lucide-react"

export const metadata: Metadata = {
  title: "Tour Ballena Gris en Bahia Magdalena",
  description:
    "Vive la experiencia de avistar ballenas grises en Bahia Magdalena, BCS. Tour guiado con encuentros cercanos en su santuario natural de reproduccion.",
}

export default function TourBallenaGrisPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/gray-whale-breaching-sunset-sea-of-cortez.jpg"
              alt="Ballena gris saltando al atardecer en el Mar de Cortés"
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
                🐋 Enero – Marzo
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Ballena Gris: Un Encuentro Ancestral en Puerto Chale
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Una travesía que toca el alma en Bahía Magdalena, Baja California Sur. Cada invierno, miles de ballenas
                grises viajan desde el Ártico hasta esta laguna tranquila para dar a luz y aparearse. Tú estás a punto
                de entrar a ese santuario.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Esto no es un tour. Es un privilegio.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Cada invierno, algo sagrado sucede en el Pacífico mexicano. Miles de ballenas grises viajan miles de
                kilómetros desde el Ártico hasta una laguna tranquila en medio del desierto… para dar a luz, para
                aparearse, para estar.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Un regalo de la naturaleza que solo existe unos meses al año. Y lo vas a vivir desde el corazón de la
                Baja.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/gray-whale-mother-calf-magdalena.jpg"
                  alt="Ballena gris madre con su cría en Bahía Magdalena"
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Punto de Encuentro</h3>
                      <p className="text-gray-700">La Paz - Te recogemos en tu hotel / Airbnb a las 5:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
                  <div className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Duración Total</h3>
                      <p className="text-gray-700">
                        9 horas aproximadamente: 2.5 hrs de camino + 2-3 hrs en lancha + 2.5 hrs de regreso
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
                  <div className="flex items-start gap-3">
                    <Anchor className="h-6 w-6 text-teal-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Temporada Oficial</h3>
                      <p className="text-gray-700">
                        Enero – Marzo únicamente. Fuera de estos meses no existe esta experiencia.
                      </p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              🌅 ¿Cómo es la experiencia?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              El camino hacia la magia: la aventura comienza temprano y te lleva por el desierto de la Baja hasta uno de
              los lugares más especiales de México.
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🌄 Salida al Amanecer</h3>
                    <p className="text-gray-700">
                      La aventura comienza temprano: te pasamos a ver y partimos rumbo al norte. La luz del amanecer va
                      pintando el desierto de la Baja, los cardones gigantes aparecen como guardianes del camino.
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🏜️ Camino al Pacífico</h3>
                    <p className="text-gray-700">
                      2.5 horas de travesía por paisajes únicos. Antes de darte cuenta, ya estás entrando en Puerto
                      Chale, donde tu lancha ya te espera. El aire huele a mar, a manglar y a historia.
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🐋 Encuentro con las Ballenas</h3>
                    <p className="text-gray-700 mb-3">
                      Durante 2 o 3 horas navegamos dentro de la laguna, hogar temporal de estos gigantes. Aquí se
                      aparean, aquí nacen sus crías, aquí descansan después de la migración más larga del reino animal.
                    </p>
                    <p className="text-gray-700 font-medium">
                      Es común verlas pasar junto al bote, sacar la cabeza para mirarte, jugar con sus bebés. Y si
                      tienes suerte… alguna se acercará. Son ellas las que deciden. Siempre.
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🦭 Vida Marina del Pacífico</h3>
                    <p className="text-gray-700">
                      En el camino también puedes ver delfines, lobos marinos, fragatas, pelícanos, águilas pescadoras y
                      otras aves que llenan el aire del Pacífico. Te compartimos un snack local delicioso.
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🌅 Regreso a La Paz</h3>
                    <p className="text-gray-700">
                      Regresamos con la piel salada, el corazón suave y una historia que te va a acompañar siempre.
                      Llegada estimada entre 5:00 PM - 6:00 PM.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wildlife Section */}
        <section id="especies" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              🐬 Especies que puedes encontrar
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Bahía Magdalena es un ecosistema rico donde convergen múltiples especies marinas durante la temporada de
              ballenas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/gray-whale-mother-and-calf-swimming-together-in-ba.jpg"
                    alt="Ballena gris madre con cría nadando en Bahía Magdalena"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Dic - Abr
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ballena Gris</h3>
                  <p className="text-gray-700">
                    Las ballenas grises viajan más de 20,000 km desde Alaska hasta estas lagunas cálidas para dar a luz
                    y criar a sus ballenatos. Son conocidas por su curiosidad y acercamiento amigable a las
                    embarcaciones.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/sea-lions-resting-on-rocks-in-baja-california-sur.jpg"
                    alt="Lobos marinos descansando en las rocas de Baja California Sur"
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
                    Curiosos y carismáticos, los lobos marinos habitan las costas rocosas de la región. Frecuentemente
                    se les observa descansando en grupos y nadando cerca de las embarcaciones.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/dolphins-jumping-in-the-sea-of-cortez.jpg"
                    alt="Delfines saltando en el Mar de Cortés"
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
                    natural con sus saltos y acrobacias. Varias especies habitan estas aguas.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/osprey-fishing-eagle-diving-for-fish-in-baja.jpg"
                    alt="Águila pescadora cazando en Baja California"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Oct - Abr
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Águilas Pescadoras</h3>
                  <p className="text-gray-700">
                    Estas majestuosas aves rapaces son expertas pescadoras. Se les puede observar volando sobre las
                    aguas y realizando espectaculares clavados para capturar peces.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/brown-pelicans-flying-over-ocean-in-baja-californi.jpg"
                    alt="Pelícanos cafés volando sobre el océano en Baja California"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Todo el año
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pelícanos</h3>
                  <p className="text-gray-700">
                    Los pelícanos cafés son habitantes comunes de las costas. Con sus bolsas gulares distintivas, pescan
                    en formaciones coordinadas y descansan en los manglares.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg overflow-hidden">
                <div className="h-64 relative">
                  <Image
                    src="/magnificent-frigatebird-soaring-over-ocean-in-baja.jpg"
                    alt="Fragata magnífica volando sobre el océano en Baja"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Todo el año
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Fragatas</h3>
                  <p className="text-gray-700">
                    Con sus alas largas y cola ahorquillada, las fragatas son maestras del vuelo. Los machos inflan su
                    saco gular rojo durante la temporada de apareamiento, creando un espectáculo visual único.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-teal-50 p-6 rounded-lg border border-teal-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">Nota de Realismo</h3>
              <p className="text-gray-700 text-center">
                Trabajamos con animales salvajes en libertad. Por lo que no garantizamos avistamientos de todas las
                especies, pero sí garantizamos compromiso, experiencia y un enfoque respetuoso que maximiza tus
                posibilidades de vivir momentos únicos con la naturaleza.
              </p>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 md:py-24 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              ✅ ¿Qué incluye tu experiencia?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Todo lo necesario para que vivas una aventura segura, cómoda y memorable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Transporte Redondo</h3>
                  <p className="text-sm text-gray-600">Desde La Paz hasta Puerto Chale y regreso</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Lancha con Capitán Local</h3>
                  <p className="text-sm text-gray-600">Experto en fauna y navegación segura</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Guía Biólogo Marino</h3>
                  <p className="text-sm text-gray-600">Con material educativo sobre ballenas</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fotos y Videos Profesionales</h3>
                  <p className="text-sm text-gray-600">Documentamos tu experiencia</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Snack Local y Bebidas</h3>
                  <p className="text-sm text-gray-600">Fruta fresca y agua purificada</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Binoculares y Guía de Fauna</h3>
                  <p className="text-sm text-gray-600">Para identificar todas las especies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">💲 Tarifas</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Elige la experiencia que mejor se adapte a tu grupo y presupuesto.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Shared 2 hours */}
              <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-teal-300 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Experiencia Compartida</h3>
                  <p className="text-gray-600 mb-4">2 horas en lancha</p>
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    $2,400 <span className="text-lg font-normal text-gray-600">MXN</span>
                  </div>
                  <p className="text-sm text-gray-600">por persona</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Transporte redondo desde La Paz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Guía biólogo marino</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Fotos y videos profesionales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Snacks y bebidas</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Reservar
                </button>
              </div>

              {/* Shared 3 hours */}
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-8 rounded-xl border-2 border-teal-600 relative transform scale-105 shadow-xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full">
                    MÁS POPULAR
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Experiencia Compartida</h3>
                  <p className="text-teal-50 mb-4">3 horas en lancha</p>
                  <div className="text-4xl font-bold text-white mb-2">
                    $3,000 <span className="text-lg font-normal text-teal-100">MXN</span>
                  </div>
                  <p className="text-sm text-teal-100">por persona</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Transporte redondo desde La Paz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Guía biólogo marino</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Fotos y videos profesionales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Snacks y bebidas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white font-medium">+ 1 hora más de avistamiento</span>
                  </li>
                </ul>
                <button className="w-full bg-white hover:bg-gray-100 text-teal-600 px-6 py-3 rounded-lg font-medium transition-colors">
                  Reservar
                </button>
              </div>

              {/* Private Premium */}
              <div className="bg-white p-8 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-colors">
                <div className="text-center mb-6">
                  <div className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    PREMIUM
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Experiencia Privada</h3>
                  <p className="text-gray-600 mb-4">5 horas en el mar</p>
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    $14,000 <span className="text-lg font-normal text-gray-600">MXN</span>
                  </div>
                  <p className="text-sm text-gray-600">hasta 6 personas</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 font-medium">Todo lo anterior +</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Snorkel con lobos marinos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Equipo completo de snorkel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Atención personalizada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Flexibilidad total de horarios</span>
                  </li>
                </ul>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Reservar Privado
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">💡 Recomendaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">🏊 Saber nadar</h3>
                <p className="text-sm text-gray-600">Solo aplica para la experiencia privada con snorkel</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">🩱 Traje de baño o wetsuit</h3>
                <p className="text-sm text-gray-600">Y cambio de ropa seca para después</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">🧥 Ropa de abrigo</h3>
                <p className="text-sm text-gray-600">Rompevientos o sudadera (enero-febrero son fríos)</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">🧴 Protector solar biodegradable</h3>
                <p className="text-sm text-gray-600">Para cuidar el ecosistema marino</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">🕶️ Lentes de sol y gorra</h3>
                <p className="text-sm text-gray-600">Protección contra el sol del Pacífico</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">❤️ Actitud respetuosa</h3>
                <p className="text-sm text-gray-600">Y corazón abierto para la experiencia</p>
              </div>
            </div>

            <div className="mt-12 max-w-3xl mx-auto bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 text-center">Nota importante</h3>
              <p className="text-gray-700 text-center">
                Las ballenas grises son animales totalmente salvajes y libres.{" "}
                <strong>No está permitido nadar con ballenas barbadas ni cachalotes en México.</strong> Nuestra
                experiencia es 100% de observación, ética y responsable. Por eso cada encuentro es real, natural y
                profundamente humano.
              </p>
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
                  "Una experiencia que no tiene palabras. Ver a las ballenas grises tan cerca, con sus bebés, fue algo
                  que nunca voy a olvidar. El equipo de Keabelmet es súper profesional y respetuoso con los animales."
                </p>
                <p className="font-semibold text-gray-900">— María Rodríguez</p>
                <p className="text-sm text-gray-600">Ciudad de México</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "El tour privado valió cada peso. Pudimos tomarnos nuestro tiempo, hacer snorkel con lobos marinos y
                  ver ballenas en un ambiente súper tranquilo. Lo recomiendo 100%."
                </p>
                <p className="font-semibold text-gray-900">— Carlos Méndez</p>
                <p className="text-sm text-gray-600">Guadalajara</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Fue mi primera vez viendo ballenas y superó todas mis expectativas. El biólogo nos explicó todo sobre
                  su migración y comportamiento. Una aventura increíble desde La Paz."
                </p>
                <p className="font-semibold text-gray-900">— Ana Torres</p>
                <p className="text-sm text-gray-600">Monterrey</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-teal-600 to-cyan-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para vivir este encuentro ancestral?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Las ballenas grises solo están aquí de enero a marzo. No dejes pasar esta oportunidad única.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
                Reserva tu lugar ahora
              </button>
              <Link href="/">
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
