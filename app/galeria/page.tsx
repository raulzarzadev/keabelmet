export default function Galeria() {
  const images = [
    { url: "/sea-lions-swimming-underwater.jpg", alt: "Lobos marinos" },
    { url: "/whale-breaching-ocean.jpg", alt: "Ballena saltando" },
    { url: "/surfing-wave-baja-california.jpg", alt: "Surfista" },
    { url: "/striped-marlin-underwater.jpg", alt: "Marlin rayado" },
    { url: "/manta-ray-swimming.png", alt: "Móbula nadando" },
    { url: "/kayaking-tropical-beach.jpg", alt: "Kayak en playa" },
    { url: "/snorkeling-coral-reef.jpg", alt: "Snorkel en arrecife" },
    { url: "/gray-whale-close-up.jpg", alt: "Ballena gris de cerca" },
    { url: "/desert-beach-landscape-baja.jpg", alt: "Paisaje de Baja" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Galería</h1>
          <p className="text-xl max-w-2xl mx-auto">Momentos capturados en nuestras expediciones</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-xl group cursor-pointer">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
