import { Compass, Heart, Shield, Users } from "lucide-react"

export default function SobreNosotros() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl max-w-2xl mx-auto">Expertos en expediciones marinas en Baja California Sur</p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Keabelmet nació de la pasión por la vida marina y el deseo de compartir las maravillas de Baja California
            Sur con el mundo. Con más de 15 años de experiencia, nos especializamos en crear encuentros memorables con
            la fauna marina de la región.
          </p>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Desde nadar con lobos marinos hasta observar ballenas en su hábitat natural, cada expedición está diseñada
            para ser segura, educativa y respetuosa con el medio ambiente.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Heart className="text-teal-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Pasión por la Naturaleza</h3>
                <p className="text-gray-600 text-sm">Amamos lo que hacemos y cuidamos el ecosistema marino</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Shield className="text-teal-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Seguridad Primero</h3>
                <p className="text-gray-600 text-sm">Equipos certificados y guías experimentados</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Compass className="text-teal-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Experiencia Local</h3>
                <p className="text-gray-600 text-sm">Conocemos cada rincón de Baja California Sur</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Users className="text-teal-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Grupos Pequeños</h3>
                <p className="text-gray-600 text-sm">Expediciones íntimas para mejores experiencias</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
