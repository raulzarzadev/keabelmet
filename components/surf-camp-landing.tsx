import Image from "next/image"
import Link from "next/link"
import { MapPin, Waves, Camera, Coffee, Users, Check, Star, Award, Target } from "lucide-react"
import { Price } from "@/contexts/CurrencyContext"

export function SurfCampLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/images/surf-camp-hero.jpeg"
              alt="Surfista cabalgando una ola perfecta en las cristalinas aguas de La Paz, Baja California Sur"
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-800/30" />
          </div>
          <div className="container mx-auto relative py-20 md:py-28 lg:py-36 px-4">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Surf Camp La Paz: 6 Días de Pura Adrenalina
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Aprende a surfear en las mejores olas de Baja California Sur con instructores certificados, equipo
                profesional y la magia del Mar de Cortés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Reserva tu semana
                </button>
                <button className="text-white border border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors">
                  Ver programa
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Por qué La Paz es perfecta para aprender surf?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                La Paz ofrece condiciones ideales para principiantes y surfistas intermedios: olas consistentes pero
                amigables, aguas cálidas todo el año, vientos offshore por las mañanas y una comunidad local apasionada
                por el surf.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nuestro surf camp de 6 días está diseñado para llevarte desde cero hasta surfear tus primeras olas con
                confianza, o perfeccionar tu técnica si ya tienes experiencia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Olas Perfectas</h3>
                <p className="text-gray-700">
                  Spots protegidos con olas de 1-3 metros, ideales para aprender y progresar de forma segura.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instructores Certificados</h3>
                <p className="text-gray-700">
                  Equipo de instructores locales con certificación ISA y años de experiencia enseñando surf.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Progreso Garantizado</h3>
                <p className="text-gray-700">
                  Metodología probada que garantiza tu progreso desde el primer día hasta ponerte de pie en la tabla.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Section */}
        <section id="programa" className="py-16 md:py-24 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Programa de 6 días</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Un programa estructurado que combina teoría, práctica y diversión para maximizar tu aprendizaje.
            </p>

            <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xl mb-2">Día 1: Fundamentos y Seguridad</h4>
                    <p className="text-gray-700 text-lg mb-3">
                      Introducción al surf, seguridad en el agua, lectura de olas y primeras prácticas en la arena.
                    </p>
                    <ul className="text-gray-600 space-y-1 ml-4">
                      <li>• Teoría básica del surf y oceanografía</li>
                      <li>• Técnicas de remada y posicionamiento</li>
                      <li>• Práctica de pop-up en la playa</li>
                      <li>• Primera sesión en espuma blanca</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xl mb-2">Día 2-3: Primeras Olas</h4>
                    <p className="text-gray-700 text-lg mb-3">
                      Transición a olas verdes, trabajo en el timing y perfeccionamiento del pop-up.
                    </p>
                    <ul className="text-gray-600 space-y-1 ml-4">
                      <li>• Lectura avanzada de olas</li>
                      <li>• Técnicas de take-off</li>
                      <li>• Postura y equilibrio en la tabla</li>
                      <li>• Sesiones de video análisis</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xl mb-2">Día 4-5: Técnica y Estilo</h4>
                    <p className="text-gray-700 text-lg mb-3">
                      Refinamiento de la técnica, primeros giros y desarrollo del estilo personal.
                    </p>
                    <ul className="text-gray-600 space-y-1 ml-4">
                      <li>• Técnicas de giro básico</li>
                      <li>• Posicionamiento en el lineup</li>
                      <li>• Etiqueta del surf</li>
                      <li>• Sesiones en diferentes spots</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-lg">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xl mb-2">Día 6: Graduación y Celebración</h4>
                    <p className="text-gray-700 text-lg mb-3">
                      Sesión libre supervisada, evaluación del progreso y celebración del logro.
                    </p>
                    <ul className="text-gray-600 space-y-1 ml-4">
                      <li>• Sesión libre con supervisión</li>
                      <li>• Evaluación y feedback personalizado</li>
                      <li>• Entrega de certificado</li>
                      <li>• Celebración con ceviche en la playa</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Includes Section */}
        <section id="incluye" className="py-16 md:py-24 bg-blue-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">¿Qué incluye el surf camp?</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto text-center mb-16">
              Todo lo necesario para que te enfoques únicamente en aprender y disfrutar del surf.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Waves className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tabla y wetsuit</h3>
                  <p className="opacity-90">
                    Tabla de surf adecuada para tu nivel y wetsuit de calidad para todas las sesiones.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Instructor certificado</h3>
                  <p className="opacity-90">
                    Instructor personal con certificación ISA para grupos máximo de 4 personas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Transporte a spots</h3>
                  <p className="opacity-90">Traslado diario a los mejores spots según condiciones y nivel del grupo.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Fotos y videos</h3>
                  <p className="opacity-90">
                    Documentación completa de tu progreso con fotos y videos para análisis técnico.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Coffee className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Snacks y hidratación</h3>
                  <p className="opacity-90">Frutas frescas, snacks energéticos y agua durante todas las sesiones.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Certificado de participación</h3>
                  <p className="opacity-90">
                    Certificado oficial que acredita tu nivel alcanzado al finalizar el camp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Levels Section */}
        <section id="niveles" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Niveles disponibles</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Adaptamos el programa a tu nivel actual para garantizar el máximo progreso y diversión.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-50 rounded-lg p-8 border border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Principiante</h3>
                <p className="text-gray-700 mb-4">
                  Nunca has surfeado o tienes muy poca experiencia. Empezamos desde cero con total seguridad.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Fundamentos básicos</li>
                  <li>• Seguridad en el agua</li>
                  <li>• Primeras olas en espuma</li>
                  <li>• Pop-up básico</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Intermedio</h3>
                <p className="text-gray-700 mb-4">
                  Ya te pones de pie ocasionalmente y quieres mejorar tu técnica y consistencia.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Perfeccionamiento del take-off</li>
                  <li>• Primeros giros</li>
                  <li>• Lectura avanzada de olas</li>
                  <li>• Posicionamiento en el lineup</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-8 border border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Avanzado</h3>
                <p className="text-gray-700 mb-4">
                  Surfeas con confianza y quieres perfeccionar maniobras específicas y desarrollar tu estilo.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Maniobras avanzadas</li>
                  <li>• Desarrollo de estilo personal</li>
                  <li>• Surf en diferentes condiciones</li>
                  <li>• Competencia amistosa</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="precios" className="py-16 md:py-24 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Precios</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Inversión completa para 6 días de surf intensivo con todo incluido.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Surf Camp 6 Días</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">
                  <Price amount={7500} />
                </div>
                <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">6 días de clases (2 sesiones diarias)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Instructor certificado ISA</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Equipo completo incluido</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Transporte a spots</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Fotos y videos profesionales</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Certificado de participación</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition-colors">
                  Reservar Ahora
                </button>
              </div>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg border border-blue-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-blue-800 mb-3 text-center">Fechas disponibles</h3>
              <p className="text-gray-700 text-center">
                Camps disponibles todo el año. Las mejores condiciones son de octubre a abril.
                <br />
                Grupos máximo 4 personas para garantizar atención personalizada.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Lo que dicen nuestros surfistas</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Experiencias reales de quienes han vivido el Surf Camp La Paz.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-200 overflow-hidden mr-4 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ana Martínez</h4>
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
                  "Llegué sin saber nada de surf y en 6 días ya estaba surfeando olas verdes. Los instructores son
                  increíbles y el ambiente súper relajado. ¡Ya quiero volver!"
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-200 overflow-hidden mr-4 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">C</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Carlos Ruiz</h4>
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
                  "Tenía algo de experiencia pero aquí realmente aprendí la técnica correcta. Los videos de análisis
                  fueron clave para mejorar mi postura. Excelente inversión."
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-200 overflow-hidden mr-4 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">L</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lucía Fernández</h4>
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
                  "La atención personalizada hace toda la diferencia. Grupos pequeños, instructores dedicados y las olas
                  de La Paz son perfectas para aprender. ¡Experiencia inolvidable!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-16 md:py-24 bg-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para conquistar las olas de La Paz?</h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                6 días que cambiarán tu relación con el océano para siempre. Aprende surf con los mejores instructores
                en el paraíso de Baja California Sur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-800 hover:bg-blue-100 px-8 py-4 rounded-md text-lg font-medium transition-colors">
                  Reserva tu semana
                </button>
                <button className="text-white border border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/10 px-8 py-4 rounded-md text-lg font-medium transition-colors">
                  Consultar fechas
                </button>
              </div>
              <p className="text-sm opacity-75 mt-6">
                Grupos máximo 4 personas • Disponible todo el año • Certificado incluido
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
