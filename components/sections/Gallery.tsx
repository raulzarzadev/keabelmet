import Link from 'next/link'
import { PremiumGallery } from '../premium-gallery'
import { Button } from '../ui/button'

export default function Gallery() {
  const images = [
    {
      src: '/images-main/gallery/ballena-saltando.jpeg',
      alt: 'Ballena jorobada saltando frente a las montañas',
      story:
        'Un instante eterno: la ballena emergiendo frente a nuestras miradas asombradas, como si el océano quisiera recordarnos su grandeza.'
    },
    {
      src: '/images-main/gallery/orcacerca.jpeg',
      alt: 'Orca emergiendo en las aguas del Mar de Cortés',
      story:
        'Silencio absoluto cuando la orca apareció. Tan cerca que podíamos sentir su respiración, tan libre que nos hizo cuestionar nuestros propios límites.'
    },
    {
      src: '/images-main/gallery/delfinesnadando.jpeg',
      alt: 'Grupo de delfines nadando en aguas cristalinas',
      story:
        'La danza sincronizada de los delfines nos recordó que hay conversaciones en el mar que nunca podremos entender completamente.'
    },
    {
      src: '/images-main/gallery/mobula-saltando.jpeg',
      alt: 'Mobula saltando fuera del agua en Safari La Ventana',
      story:
        'Como estrellas que saltan del mar hacia el cielo, las móbulas nos regalaron un espectáculo que desafía la gravedad y la imaginación.'
    },
    {
      src: '/images-main/gallery/vistapanga.jpeg',
      alt: 'Aventureras disfrutando del paisaje marino desde una panga',
      story:
        'A veces, el verdadero lujo es la simplicidad: una panga, el horizonte infinito y la promesa de encuentros con lo salvaje.'
    },
    {
      src: '/images-main/gallery/snorkelmobulas.jpeg',
      alt: 'Buceador observando un banco de mobulas en las profundidades',
      story:
        'Sumergirse es como entrar en otro mundo. Bajo la superficie, el tiempo se detiene y cada respiración te conecta con la vida marina.'
    },
    {
      src: '/images-main/gallery/grupo-expedicion.jpeg',
      alt: 'Grupo de aventureros disfrutando del Safari La Ventana',
      story:
        'Los extraños se convierten en amigos cuando comparten el asombro. Cada expedición crea vínculos que perduran más allá del viaje.'
    },
    {
      src: '/images-main/gallery/marlin-cazando.jpeg',
      alt: 'Marlin rayado cazando un cardumen de sardinas',
      story:
        'La velocidad del marlín es hipnótica: un relámpago azul que corta el agua en su danza de supervivencia, recordándonos la perfección de la naturaleza.'
    },
    {
      src: '/images-main/gallery/manta-gigante.jpeg',
      alt: 'Majestuosa manta gigante nadando en aguas profundas',
      story:
        'Como un ave que vuela bajo el mar, la manta gigante nos mostró su elegancia ancestral en un encuentro que quedará grabado en nuestra memoria.'
    }
  ]

  return (
    <section
      id="galeria"
      className="py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-sans mb-4 text-slate">
            Galería de Aventuras
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Momentos capturados que cuentan historias de conexión con la
            naturaleza, asombro y descubrimiento en las aguas de Baja California
            Sur.
          </p>
        </div>

        <PremiumGallery images={images} />

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="hover:bg-cerulean hover:text-white transition-colors"
          >
            Descubre más momentos
            {/* <Link href={socialLinks?.[0].url}>Descubre más momentos</Link> */}
          </Button>
        </div>
      </div>
    </section>
  )
}
