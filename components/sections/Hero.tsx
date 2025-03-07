import Image from 'next/image'
import { Button } from '../ui/button'

export const Hero = () => {
  return (
    <section id="inicio" className="relative">
      <div className="absolute inset-0">
        <Image
          src="/images/mau-mantarraya.jpg"
          alt="mau nadando con una matarraya gigante al fondo"
          width={1920}
          height={1200}
          className="h-full w-full object-cover object-[center_70%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate/70 to-slate/30" />
      </div>
      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="max-w-xl space-y-4 md:space-y-5">
          <h1 className="text-3xl font-sans  tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Descubre la magia del agua y la tierra
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-heading">
            Expediciones únicas para vivir la aventura de tu vida en las playas
            más hermosas de Baja California Sur.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              size="lg"
              className="bg-cerulean hover:bg-cerulean/90 w-full sm:w-auto"
            >
              Reserva tu aventura
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white/10 w-full sm:w-auto"
            >
              Ver expediciones
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
