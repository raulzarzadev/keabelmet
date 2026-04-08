import { Check } from "lucide-react"

export default function Tarifas() {
  const packages = [
    {
      title: "Safari Bahía Magdalena",
      price: 165,
      duration: "Día completo",
      includes: [
        "Transporte desde La Paz",
        "Equipo de snorkel",
        "Guía certificado",
        "Almuerzo y bebidas",
        "Fotos del tour",
        "Seguro de accidentes",
      ],
    },
    {
      title: "Safari La Ventana",
      price: 180,
      duration: "Medio día",
      includes: [
        "Transporte desde La Paz",
        "Equipo de snorkel",
        "Guía experto",
        "Bebidas y snacks",
        "Sesión de fotos profesional",
        "Seguro de accidentes",
      ],
      featured: true,
    },
    {
      title: "Surf Camp (6 días)",
      price: 195,
      duration: "Por día",
      includes: [
        "Clases diarias de surf",
        "Análisis de video",
        "Equipo completo",
        "Transporte diario",
        "Snacks y bebidas",
        "Feedback personalizado",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Tarifas</h1>
          <p className="text-xl max-w-2xl mx-auto">Precios transparentes para experiencias inolvidables</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className={`bg-white rounded-2xl p-8 shadow-lg ${pkg.featured ? "ring-2 ring-teal-600 relative" : ""}`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Más Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
              <p className="text-gray-600 mb-6">{pkg.duration}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-teal-600">${pkg.price}</span>
                <span className="text-gray-600"> USD</span>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                Reservar Ahora
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
