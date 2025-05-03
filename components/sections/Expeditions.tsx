import Image from 'next/image'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { MapPin, Compass, FishIcon as Whale, ChevronRight } from 'lucide-react'
const expeditions = [
  {
    title: 'Surf camp',
    description:
      'Aprende a surfear en las playas más hermosas de Baja California Sur.',
    price: 1249,
    image: '/images/surft.jpeg'
  },
  {
    title: 'Safari La Ventana',
    description:
      'Descubre la belleza del desierto y las dunas de La Ventana en este safari de aventura.',
    price: 119,
    image: '/images/orca.jpeg'
  },
  {
    title: 'Buceo en Cabo Pulmo',
    description:
      'Explora los arrecifes de coral de Cabo Pulmo, uno de los mejores lugares para bucear en el mundo.',
    price: 175,
    image: '/images/buceo-cabo-pulmo.jpg'
  },
  {
    title: 'Safari Bahia Magdalena',
    description:
      ' Descubre la belleza de la Bahía Magdalena en este safari de aventura.',
    price: 179,
    image: '/images/marlin.jpeg'
  },
  {
    title: 'Avistamiento de Ballena Gris',
    description:
      'Vive la experiencia de avistar ballenas grises en la Bahía Magdalena.',
    price: 110,
    image: '/images/ballena-gris.jpg'
  }
]
export const Expeditions = () => {
  return (
    <section id="expediciones" className="py-16 bg-bone">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-sans mb-4 text-slate">
            Nuestras Expediciones
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Descubre nuestras increíbles aventuras diseñadas para que vivas
            experiencias inolvidables en contacto con la naturaleza.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expeditions.map((expedition, index) => (
            <ExpeditionCard_v2 key={index} expedition={expedition} />
          ))}
        </div>
      </div>
    </section>
  )
}
export type Expedition = {
  title: string
  description: string
  price: number
  image?: string
}
export type ExpeditionCardProps = {
  expedition: Expedition
}
export const ExpeditionCard_v1 = ({ expedition }: ExpeditionCardProps) => (
  <Card className="overflow-hidden">
    <div className="relative h-48">
      <Image
        src={expedition.image || '/placeholder.svg?height=400&width=600'}
        alt={expedition.title}
        width={600}
        height={400}
        className="h-full w-full object-cover"
      />
    </div>
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Compass className="h-5 w-5 text-slate" />
        <h3 className="font-semibold text-lg">{expedition.title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{expedition.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-slate font-semibold">
          Desde $
          {new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(expedition.price)}{' '}
          usd
        </span>
      </div>
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 mt-4"
        >
          Detalles <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
)

export const ExpeditionCard_v2 = ({ expedition }: ExpeditionCardProps) => (
  <>
    <div className="relative rounded-lg overflow-hidden h-[400px] group">
      {/* Imagen de fondo */}
      <Image
        src={expedition.image || '/placeholder.svg?height=400&width=600'}
        alt={expedition.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Gradiente para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      {/* Contenido */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        <div className="flex items-center gap-2 mb-3">
          <Compass className="h-5 w-5" />
          <h3 className="font-semibold text-xl">{expedition.title}</h3>
        </div>

        <p className="text-gray-200 mb-4">{expedition.description}</p>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">
            Desde $
            {new Intl.NumberFormat('es-MX', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(expedition.price)}{' '}
            USD
          </span>

          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
          >
            Detalles <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  </>
)
