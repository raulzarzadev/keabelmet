'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Compass,
  FishIcon as Whale,
  Send,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { contactLinks, socialLinks } from '@/config/mediaLinks'
import { MediaLink } from '@/components/ui/media-link'
import { SocialLinks } from '@/components/social-links'
import { ContactLinks } from '@/components/contacts-links'
import { Hero } from '@/components/sections/Hero'

export default function TurismoLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col ">
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
        <div className=" flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/keabelmet-logo.jpeg"
              alt="Keabelmet Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Menú desktop */}
          <nav className="hidden md:flex gap-6">
            <Link
              href="#inicio"
              className="text-sm font-medium hover:text-cerulean transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="#expediciones"
              className="text-sm font-medium hover:text-cerulean transition-colors"
            >
              Expediciones
            </Link>
            <Link
              href="#galeria"
              className="text-sm font-medium hover:text-cerulean transition-colors"
            >
              Galería
            </Link>
            <Link
              href="#contacto"
              className="text-sm font-medium hover:text-cerulean transition-colors"
            >
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
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
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
              <Button variant="outline" size="sm" className="justify-center">
                Iniciar Sesión
              </Button>
              <Button
                size="sm"
                className="bg-cerulean hover:bg-cerulean/90 justify-center"
              >
                Reservar Ahora
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Expediciones */}
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
              {/* Avistamiento de Ballenas */}
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Avistamiento de ballenas"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Whale className="h-5 w-5 text-cerulean" />
                    <h3 className="font-semibold text-lg">
                      Avistamiento de Ballenas
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Observa estos majestuosos mamíferos marinos en su hábitat
                    natural durante la temporada de migración.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-cerulean font-semibold">
                      Desde $99
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Detalles <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sandboard */}
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Sandboard en dunas"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Compass className="h-5 w-5 text-slate" />
                    <h3 className="font-semibold text-lg">
                      Sandboard en Dunas
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Deslízate por impresionantes dunas de arena y siente la
                    adrenalina en este deporte extremo.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate font-semibold">Desde $79</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Detalles <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tour de Playas */}
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Tour de playas"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-cerulean" />
                    <h3 className="font-semibold text-lg">
                      Tour de Playas Secretas
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Visita las playas más hermosas y escondidas de la costa,
                    lejos del turismo masivo.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-cerulean font-semibold">
                      Desde $129
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Detalles <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button className="bg-cerulean hover:bg-cerulean/90">
                Ver todas las expediciones
              </Button>
            </div>
          </div>
        </section>

        {/* Galería */}
        <section id="galeria" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-sans mb-4 text-slate">
                Galería de Aventuras
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Imágenes de nuestras expediciones y los momentos inolvidables
                que nuestros clientes han vivido.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={`/placeholder.svg?height=400&width=400&text=Foto ${item}`}
                    alt={`Galería de aventuras ${item}`}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline">
                <Link href={socialLinks?.[0].url}>Ver mas fotos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16 bg-cadet/20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-sans mb-4 text-slate">
                Lo que dicen nuestros aventureros
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experiencias reales de quienes han vivido nuestras expediciones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'María González',
                  location: 'Ciudad de México',
                  text: 'El avistamiento de ballenas fue una experiencia mágica. Los guías son muy profesionales y cuidan cada detalle.'
                },
                {
                  name: 'Carlos Ramírez',
                  location: 'Buenos Aires',
                  text: '¡El sandboard fue increíble! Nunca pensé que deslizarme por las dunas sería tan divertido. ¡Volveré pronto!'
                },
                {
                  name: 'Laura Martínez',
                  location: 'Santiago',
                  text: 'Las playas secretas son verdaderamente paradisíacas. Un tour muy bien organizado y con un servicio excelente.'
                }
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
                    <p className="text-gray-600 flex-1 mb-4">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-cadet-200 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">
                          {testimonial.location}
                        </p>
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
                <h2 className="text-2xl md:text-3xl font-sans mb-4 text-slate">
                  ¿Listo para tu próxima aventura?
                </h2>
                <p className="text-gray-600 mb-6">
                  Contáctanos para reservar tu expedición o resolver cualquier
                  duda que tengas.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-bone flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-slate" />
                    </div>
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-gray-600">
                        Av. del Mar 123, Baja California Sur
                      </p>
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
                <h3 className="text-xl font-semibold mb-4 text-slate">
                  Envíanos un mensaje
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="text-sm font-medium">
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Tu nombre"
                      />
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
                  <Button className="w-full bg-cerulean hover:bg-cerulean/90">
                    Enviar Mensaje
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 ">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-sans mb-2">
                  ¿Listo para vivir la aventura?
                </h2>
                <p className="text-bone">
                  Reserva ahora y obtén un 10% de descuento en tu primera
                  expedición.
                </p>
              </div>
              <Button className="bg-white text-slate hover:bg-bone hover:text-slate">
                Reservar Ahora
              </Button>
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
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-04%20at%2018.10.25-td356Qk2rC4TPMaLvF2qTFBfLKYPQ0.jpeg"
                  alt="Keabelmet Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-xl font-sans text-white">Keabelmet</span>
              </div>
              <p className="mb-4">
                Expediciones y aventuras únicas en las playas más hermosas.
                Descubre la magia del agua y la tierra con nosotros.
              </p>
              <div className="flex gap-4">
                <SocialLinks />
              </div>
            </div>

            <div className="mt-4 sm:mt-0">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Expediciones
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-skyblue transition-colors"
                  >
                    Avistamiento de Ballenas
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-skyblue transition-colors"
                  >
                    Sandboard en Dunas
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-skyblue transition-colors"
                  >
                    Tour de Playas
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-skyblue transition-colors"
                  >
                    Buceo y Snorkel
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-skyblue transition-colors"
                  >
                    Kayak y Paddle
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-4 sm:mt-0">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Enlaces Rápidos
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-skyblue transition-colors"
                  >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-skyblue transition-colors"
                  >
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-skyblue transition-colors"
                  >
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-skyblue transition-colors"
                  >
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-skyblue transition-colors"
                  >
                    Blog de Aventuras
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-4 lg:mt-0">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Contacto
              </h3>
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
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Keabelmet. Todos los derechos
              reservados.
            </p>
            <div className="mt-4 sm:mt-0">
              <p className="text-sm">
                Sitio web:{' '}
                <a
                  href="https://keabelmet.com"
                  className="text-skyblue hover:underline"
                >
                  keabelmet.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-center mt-8">
          Fonts made by{' '}
          <a href="http://www.webfontfree.com" target="_blank">
            Web Free Fonts
          </a>{' '}
          is licensed by{' '}
          <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank">
            CC 4.0 BY
          </a>
        </p>
      </footer>
    </div>
  )
}
