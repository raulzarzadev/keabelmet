"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Send, Shield, Users, Clock, Heart, Compass, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { socialLinks } from "@/config/mediaLinks"
import { SocialLinks } from "@/components/social-links"
import { ContactLinks } from "@/components/contacts-links"

const expeditions = [
  {
    title: "Surf camp",
    description: "Aprende a surfear en las playas más hermosas de Baja California Sur.",
    price: 1249,
    image: "/images/surf-camp-hero.jpeg",
  },
  {
    title: "Safari La Ventana",
    description: "Descubre la magia del Golfo de California y sus increíbles especies marinas en este safari único.",
    price: 119,
    image: "/images/orca-safari.jpg",
    link: "/expediciones/safari-la-ventana",
  },
  {
    title: "Safari Bahía Magdalena",
    description: "Vive el safari más salvaje del Pacífico durante la espectacular corrida de sardinas.",
    price: 179,
    image: "/images/marlin-safari.jpg",
    link: "/expediciones/safari-bahia-magdalena",
  },
  {
    title: "Buceo en Cabo Pulmo",
    description: "Explora los arrecifes de coral y cardúmenes de peces en el Parque Nacional Marino de Cabo Pulmo.",
    price: 175,
    image: "/images/buceo-cabo-pulmo.jpeg",
  },
  {
    title: "Avistamiento de Ballena Gris",
    description:
      "Vive un encuentro cercano con las majestuosas ballenas grises en su hábitat natural en Baja California.",
    price: 110,
    image: "/images/ballena-gris-safari.jpeg",
    link: "/expediciones/ballena-gris",
  },
]

export default function TurismoLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* WhatsApp Flotante */}
      <a
        href="https://wa.me/5214422056214"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Contáctanos por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Keabelmet Logo" width={50} height={50} className="rounded-full" />
            <span className="text-xl font-sans text-slate">Keabelmet</span>
          </Link>

          {/* Menú móvil */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cerulean"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Menú desktop */}
          <nav className="hidden md:flex gap-6">
            <Link href="#inicio" className="text-sm font-medium hover:text-cerulean transition-colors">
              Inicio
            </Link>
            <Link href="#expediciones" className="text-sm font-medium hover:text-cerulean transition-colors">
              Expediciones
            </Link>
            <Link href="#galeria" className="text-sm font-medium hover:text-cerulean transition-colors">
              Galería
            </Link>
            <Link href="#contacto" className="text-sm font-medium hover:text-cerulean transition-colors">
              Contacto
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              <SocialLinks />
            </div>
            <Button variant="outline" size="sm">
              Iniciar Sesión
            </Button>
            <Button size="sm" className="bg-cerulean hover:bg-cerulean/90">
              Reservar Ahora
            </Button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="#inicio"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-cadet-100 hover:text-cerulean"
            >
              Inicio
            </Link>
            <Link
              href="#expediciones"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-cadet-100 hover:text-cerulean"
            >
              Expediciones
            </Link>
            <Link
              href="#galeria"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-cadet-100 hover:text-cerulean"
            >
              Galería
            </Link>
            <Link
              href="#contacto"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-cadet-100 hover:text-cerulean"
            >
              Contacto
            </Link>
            <div className="flex items-center gap-3 px-3 py-2">
              <ContactLinks />
            </div>
            <div className="flex flex-col gap-2 px-3 py-2">
              <Button variant="outline" size="sm" className="justify-center bg-transparent">
                Iniciar Sesión
              </Button>
              <Button size="sm" className="bg-cerulean hover:bg-cerulean/90 justify-center">
                Reservar Ahora
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/images/hero-cachalote.jpeg"
            alt="Majestuoso cachalote nadando en las profundidades del Mar de Cortés - Keabelmet Expeditions"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          <div className="relative z-10 container text-center text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">Siendo agua y tierra</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre la magia del Mar de Cortés con expediciones únicas que te conectan con la naturaleza más salvaje
              de Baja California Sur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-cerulean hover:bg-cerulean/90 text-lg px-8 py-4">
                Explorar Expediciones
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-slate bg-transparent"
              >
                Ver Galería
              </Button>
            </div>
          </div>
        </section>

        {/* Expediciones */}
        <section id="expediciones" className="py-16 bg-bone">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-sans mb-4 text-slate">Nuestras Expediciones</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Descubre nuestras increíbles aventuras diseñadas para que vivas experiencias inolvidables en contacto
                con la naturaleza.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expeditions.map((expedition, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={expedition.image || "/placeholder.svg?height=400&width=600"}
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
                        {new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(expedition.price)}{" "}
                        usd
                      </span>
                    </div>
                    <div className="flex justify-end">
                      {expedition.link ? (
                        <Link href={expedition.link}>
                          <Button variant="outline" size="sm" className="flex items-center gap-1 mt-4 bg-transparent">
                            Detalles <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" size="sm" className="flex items-center gap-1 mt-4 bg-transparent">
                          Detalles <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Problemas Comunes */}
        <section id="problemas-soluciones" className="relative overflow-hidden">
          {/* Imagen de fondo */}
          <Image
            src="/fondomar1.jpg"
            alt="Fondo marino con aguas cristalinas del Mar de Cortés"
            fill
            className="absolute inset-0 -z-10 object-cover"
          />

          {/* Overlay degradado */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/95 to-white/85"></div>

          {/* Contenido */}
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-sans mb-6 text-slate">¿Tienes dudas sobre nuestras expediciones?</h2>
                <p className="text-gray-600 mb-8">
                  Entendemos tus preocupaciones. Aquí resolvemos las dudas más comunes para que vivas tu aventura con
                  total tranquilidad.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-cerulean/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="h-6 w-6 text-cerulean" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-slate text-lg">Seguridad familiar</h3>
                        <p className="text-gray-600">
                          Nuestras expediciones están diseñadas para todas las edades. Contamos con guías certificados,
                          equipo de seguridad completo y embarcaciones en perfectas condiciones.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-cerulean/10 flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-cerulean" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-slate text-lg">Falta de experiencia</h3>
                        <p className="text-gray-600">
                          La mayoría de nuestros aventureros son principiantes. Nuestros guías expertos te acompañarán
                          en cada paso y te enseñarán todo lo que necesitas saber.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-cerulean/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-cerulean" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-slate text-lg">Condiciones climáticas</h3>
                        <p className="text-gray-600">
                          Monitoreamos constantemente las condiciones climáticas. Si es necesario, reprogramamos tu
                          expedición sin costo adicional para garantizar tu seguridad y disfrute.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-cerulean/10 flex items-center justify-center flex-shrink-0">
                        <Heart className="h-6 w-6 text-cerulean" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-slate text-lg">Avistamiento de vida marina</h3>
                        <p className="text-gray-600">
                          El Mar de Cortés es uno de los ecosistemas marinos más ricos del mundo. Nuestros guías conocen
                          los mejores spots y momentos para maximizar tus avistamientos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/images/grupo-feliz-expedicion.jpeg"
                    alt="Grupo de aventureros felices disfrutando de una expedición marina en el Mar de Cortés con Keabelmet"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm font-medium text-slate mb-1">"¡La mejor experiencia de nuestras vidas!"</p>
                      <p className="text-xs text-gray-600">Familia González - Safari La Ventana 2024</p>
                    </div>
                  </div>
                </div>

                {/* Elementos decorativos */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-cerulean/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-skyblue/10 rounded-full blur-xl"></div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">¿Tienes más preguntas? Nuestro equipo está aquí para ayudarte.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-cerulean hover:bg-cerulean/90">
                  <a
                    href="https://wa.me/5214422056214"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Chatear por WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
                  <Link href="#contacto">Ver más información</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Galería */}
        <section id="galeria" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-sans mb-4 text-slate">Galería de Aventuras</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Imágenes de nuestras expediciones y los momentos inolvidables que nuestros clientes han vivido en las
                aguas de Baja California Sur.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                {
                  src: "/images/gallery/ballena-saltando.jpeg",
                  alt: "Majestuosa ballena jorobada saltando frente a las montañas de Baja California Sur",
                },
                {
                  src: "/images/gallery/cachalotecta.jpeg",
                  alt: "Impresionante cachalote nadando en las profundidades del océano",
                },
                {
                  src: "/images/gallery/orcacerca.jpeg",
                  alt: "Majestuosa orca emergiendo en las aguas del Mar de Cortés",
                },
                {
                  src: "/images/gallery/delfinesnadando.jpeg",
                  alt: "Grupo de delfines nadando en las cristalinas aguas del Mar de Cortés",
                },
                {
                  src: "/images/gallery/mobula-saltando.jpeg",
                  alt: "Mobula (raya diablo) saltando fuera del agua en Safari La Ventana",
                },
                {
                  src: "/images/gallery/vistapanga.jpeg",
                  alt: "Aventureras disfrutando del paisaje marino desde una panga en La Ventana",
                },
                {
                  src: "/images/gallery/snorkelmobulas.jpeg",
                  alt: "Buceador observando un banco de mobulas en las profundidades del mar",
                },
                {
                  src: "/images/gallery/grupo-expedicion.jpeg",
                  alt: "Grupo de aventureros disfrutando del Safari La Ventana",
                },
                {
                  src: "/images/gallery/marlin-cazando.jpeg",
                  alt: "Marlin rayado cazando un cardumen de sardinas en el Safari Bahía Magdalena",
                },
                {
                  src: "/images/gallery/manta-gigante.jpeg",
                  alt: "Majestuosa manta gigante nadando en aguas profundas en Safari La Ventana",
                },
              ].map((img, idx) => (
                <div
                  key={idx}
                  className={`relative ${idx === 0 ? "md:col-span-2 md:row-span-2" : ""} aspect-square overflow-hidden rounded-lg`}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline">
                <Link href={socialLinks?.[0]?.url || "#"}>Ver más fotos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16 bg-cadet/20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-sans mb-4 text-slate">Lo que dicen nuestros aventureros</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experiencias reales de quienes han vivido nuestras expediciones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "María González",
                  location: "Ciudad de México",
                  text: "El avistamiento de ballenas fue una experiencia mágica. Los guías son muy profesionales y cuidan cada detalle.",
                },
                {
                  name: "Carlos Ramírez",
                  location: "Buenos Aires",
                  text: "El safari marino fue increíble! Nunca pensé que podria ver tanta vida marina en un solo lugar! Volveré pronto",
                },
                {
                  name: "Laura Martínez",
                  location: "Santiago",
                  text: "Las playas secretas son verdaderamente paradisíacas. Un tour muy bien organizado y con un servicio excelente.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 flex-1 mb-4">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-cadet-200 flex items-center justify-center">
                        <span className="text-white font-semibold">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-12 md:py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-sans mb-4 text-slate">¿Listo para tu próxima aventura?</h2>
                <p className="text-gray-600 mb-6">
                  Contáctanos para reservar tu expedición o resolver cualquier duda que tengas.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-bone flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-slate" />
                    </div>
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-gray-600">Av. del Mar 123, Baja California Sur</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-bone flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-gray-600">+52 442 205 6214</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-cadet-200 flex items-center justify-center">
                      <Send className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info@keabelmet.com</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-medium">Síguenos:</p>
                  <div className="flex gap-3">
                    <SocialLinks />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mt-6 md:mt-0">
                <h3 className="text-xl font-semibold mb-4 text-slate">Envíanos un mensaje</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="text-sm font-medium">
                        Nombre
                      </label>
                      <input id="nombre" className="w-full px-3 py-2 border rounded-md" placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="asunto" className="text-sm font-medium">
                      Asunto
                    </label>
                    <input
                      id="asunto"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Asunto de tu mensaje"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="mensaje" className="text-sm font-medium">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                  </div>
                  <Button className="w-full bg-cerulean hover:bg-cerulean/90">Enviar Mensaje</Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-slate">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-sans mb-2 text-white">¿Listo para vivir la aventura?</h2>
                <p className="text-bone">Reserva ahora y obtén un 10% de descuento en tu primera expedición.</p>
              </div>
              <Button className="bg-white text-slate hover:bg-bone hover:text-slate">Reservar Ahora</Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-gray-300 py-8 md:py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="Keabelmet Logo" width={50} height={50} className="rounded-full" />
                <span className="text-xl font-sans text-white">Keabelmet</span>
              </div>
              <p className="mb-4">
                Expediciones y aventuras únicas en las playas más hermosas. Descubre la magia del agua y la tierra con
                nosotros.
              </p>
              <div className="flex gap-4">
                <SocialLinks />
              </div>
            </div>

            <div className="mt-4 sm:mt-0">
              <h3 className="text-lg font-semibold mb-4 text-white">Expediciones</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-skyblue transition-colors">
                    Avistamiento de Ballenas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-skyblue transition-colors">
                    Sandboard en Dunas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-skyblue transition-colors">
                    Tour de Playas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-skyblue transition-colors">
                    Buceo y Snorkel
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-skyblue transition-colors">
                    Kayak y Paddle
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-4 sm:mt-0">
              <h3 className="text-lg font-semibold mb-4 text-white">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-skyblue transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-skyblue transition-colors">
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-skyblue transition-colors">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-skyblue transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-skyblue transition-colors">
                    Blog de Aventuras
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-4 lg:mt-0">
              <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-skyblue mt-0.5" />
                  <span>Av. del Mar 123, Baja California Sur, México</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-skyblue mt-0.5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+52 442 205 6214</span>
                </li>
                <li className="flex items-start gap-3">
                  <Send className="h-5 w-5 text-skyblue mt-0.5" />
                  <span>info@keabelmet.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Keabelmet. Todos los derechos reservados.</p>
            <div className="mt-4 sm:mt-0">
              <p className="text-sm">
                Sitio web:{" "}
                <a href="https://keabelmet.com" className="text-skyblue hover:underline">
                  keabelmet.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-center mt-8">
          Fonts made by{" "}
          <a href="http://www.webfontfree.com" target="_blank" rel="noreferrer">
            Web Free Fonts
          </a>{" "}
          is licensed by{" "}
          <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
            CC 4.0 BY
          </a>
        </p>
      </footer>
    </div>
  )
}
