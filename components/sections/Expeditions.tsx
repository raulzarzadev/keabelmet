import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Calendar, Users, Star } from "lucide-react"
import Link from "next/link"

const expeditions = [
  {
    title: "Safari Bahía Magdalena",
    duration: "Full Day",
    groupSize: "6-10 People",
    rating: "5.0",
    reviews: "187",
    image: "/images/marlin-cazando.jpeg",
    highlights: ["Corrida de Sardinas", "Marlines", "Lobos Marinos", "Lunch Included"],
    price: "$165",
    link: "/expediciones/safari-bahia-magdalena",
  },
  {
    title: "Safari La Ventana",
    duration: "Half Day",
    groupSize: "8-10 People",
    rating: "4.9",
    reviews: "243",
    image: "/images/orcalaventana.jpeg",
    highlights: ["Migración Móbulas", "Abril–Junio", "Expert Guide", "Photos"],
    price: "$180",
    link: "/expediciones/safari-la-ventana",
  },
  {
    title: "Surf Camp La Paz (6 días)",
    duration: "6 Days",
    groupSize: "6-8 People",
    rating: "5.0",
    reviews: "156",
    image: "/images/surf-camp.jpeg",
    highlights: ["Clases Diarias", "Foto/Video", "Transporte", "Snacks Incluidos"],
    price: "$195",
    link: "/surf-camp",
  },
]

export const Expeditions = () => {
  return (
    <section id="expediciones" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl font-bold mb-4 text-balance">Nuestras expediciones</h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Diseñadas para encuentros responsables con fauna marina y paisajes únicos.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {expeditions.map((expedition, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 bg-card hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={expedition.image || "/placeholder.svg"}
                  alt={expedition.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-xs font-semibold">{expedition.rating}</span>
                  <span className="text-xs text-muted-foreground">({expedition.reviews})</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">{expedition.title}</h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{expedition.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span>{expedition.groupSize}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {expedition.highlights.map((highlight, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-muted rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Per person</div>
                    <div className="text-2xl font-semibold text-primary">{expedition.price}</div>
                  </div>
                  {expedition.link ? (
                    <Link href={expedition.link}>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                        Book Now
                      </Button>
                    </Link>
                  ) : (
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                      Book Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
