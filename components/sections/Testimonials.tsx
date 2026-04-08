import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

// Datos de los testimonios con información ampliada
const testimonials = [
  {
    name: "María González",
    city: "Ciudad de México",
    country: "México",
    countryCode: "mx",
    text: "El avistamiento de ballenas fue una experiencia mágica. Los guías son muy profesionales y cuidan cada detalle.",
    profileImage: "/images/testimonials/maria.png",
  },
  {
    name: "Carlos Ramírez",
    city: "Buenos Aires",
    country: "Argentina",
    countryCode: "ar",
    text: "¡El safari marino fue increíble! Nunca pensé que podría ver tanta vida marina en un solo lugar. ¡Volveré pronto!",
    profileImage: "/images/testimonials/carlos.png",
  },
  {
    name: "Laura Martínez",
    city: "Santiago",
    country: "Chile",
    countryCode: "cl",
    text: "Las playas secretas son verdaderamente paradisíacas. Un tour muy bien organizado y con un servicio excelente.",
    profileImage: "/images/testimonials/laura.png",
  },
  {
    name: "John Smith",
    city: "San Francisco",
    country: "Estados Unidos",
    countryCode: "us",
    text: "Una experiencia inolvidable. Ver ballenas en su hábitat natural fue simplemente espectacular. Recomiendo totalmente esta aventura.",
    profileImage: "/images/testimonials/john.png",
  },
  {
    name: "Sophie Dubois",
    city: "París",
    country: "Francia",
    countryCode: "fr",
    text: "Increíble experiencia con la familia. Los niños quedaron fascinados con los delfines y las ballenas. El equipo es muy profesional.",
    profileImage: "/images/testimonials/sophie.png",
  },
  {
    name: "Pedro Sánchez",
    city: "Madrid",
    country: "España",
    countryCode: "es",
    text: "El safari marino superó todas mis expectativas. Ver a las ballenas tan cerca fue una experiencia única que nunca olvidaré.",
    profileImage: "/images/testimonials/pedro.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-cadet/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-sans mb-4 text-slate">Lo que dicen nuestros aventureros</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experiencias reales de quienes han vivido nuestras expediciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col h-full">
                {/* 1. Estrellas */}
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* 2. Fotografía de perfil */}
                <div className="mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src={testimonial.profileImage || "/placeholder.svg"}
                      alt={`Foto de ${testimonial.name}`}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* 3. Reseña */}
                <p className="text-gray-600 flex-1 mb-4">"{testimonial.text}"</p>

                {/* 4. Ciudad y País de procedencia con 5. Icono de la bandera */}
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.city}, {testimonial.country}
                    </p>
                  </div>

                  {/* 5. Icono de la bandera */}
                  <div className="h-6 w-8 overflow-hidden rounded-sm shadow-sm">
                    <Image
                      src={`/images/flags/${testimonial.countryCode}.svg`}
                      alt={`Bandera de ${testimonial.country}`}
                      width={32}
                      height={24}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
