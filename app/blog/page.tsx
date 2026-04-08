import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

export default function Blog() {
  const posts = [
    {
      title: "La Temporada de Ballenas Grises en Baja California Sur",
      excerpt: "Descubre cuándo y dónde observar las ballenas grises en su migración anual.",
      image: "/gray-whale-in-ocean.jpg",
      date: "15 Nov 2024",
      readTime: "5 min",
      slug: "temporada-ballenas-grises",
    },
    {
      title: "Consejos para Nadar con Lobos Marinos",
      excerpt: "Todo lo que necesitas saber para tener un encuentro seguro y memorable.",
      image: "/swimming-with-sea-lions.jpg",
      date: "8 Nov 2024",
      readTime: "4 min",
      slug: "consejos-nadar-lobos-marinos",
    },
    {
      title: "Las Mejores Playas para Surfear en La Paz",
      excerpt: "Guía completa de los spots de surf más increíbles de la región.",
      image: "/beach-surfing-la-paz.jpg",
      date: "1 Nov 2024",
      readTime: "6 min",
      slug: "mejores-playas-surfear",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">Historias, consejos y noticias sobre la vida marina</p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:w-2/3">
                  <h2 className="text-2xl font-bold mb-3 hover:text-teal-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
