import type { Metadata } from "next"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary, type Locale } from "@/lib/i18n"

function l(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path === "/" ? "" : path}`
}

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a Keabelmet Expeditions. Escribenos a keabelmet@gmail.com o llama al +52 442 205 6214. Reserva tu aventura marina.",
}

export default async function Contacto({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("contact", locale) as Record<string, any>

  const contactItems = [
    { icon: <Mail className="text-teal-600" size={20} />, label: t.contactEmail, value: t.contactEmailValue },
    { icon: <Phone className="text-teal-600" size={20} />, label: t.contactPhone, value: t.contactPhoneValue },
    { icon: <MapPin className="text-teal-600" size={20} />, label: t.contactLocation, value: t.contactLocationValue },
    { icon: <Clock className="text-teal-600" size={20} />, label: t.contactSchedule, value: t.contactScheduleValue },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {/* Card 1 - Tour selector */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-2">{t.contactCards.tourTitle}</h2>
            <p className="text-gray-600 mb-6">{t.contactCards.tourSubtitle}</p>
            <div className="grid grid-cols-2 gap-3">
              {t.contactCards.tours.map((tour: { name: string; href: string }) => (
                <a
                  key={tour.href}
                  href={`https://wa.me/524422056214?text=Hola, quiero saber mas sobre ${tour.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors text-center"
                >
                  {tour.name}
                </a>
              ))}
            </div>
          </div>

          {/* Card 2 - Quiz */}
          <div className="bg-teal-700 rounded-xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white">{t.contactCards.quizTitle}</h2>
              <p className="text-teal-100 mb-8">{t.contactCards.quizSubtitle}</p>
            </div>
            <Link
              href={l("/quiz", locale)}
              className="inline-block w-full py-4 text-center text-lg font-semibold text-teal-700 bg-white rounded-lg hover:bg-teal-50 transition-colors"
            >
              {t.contactCards.quizTitle}
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">{t.formTitle}</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.labelName}</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent" placeholder={t.placeholderName} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.labelEmail}</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent" placeholder={t.placeholderEmail} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.labelPhone}</label>
                <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent" placeholder={t.placeholderPhone} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.labelMessage}</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent" placeholder={t.placeholderMessage} />
              </div>
              <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                {t.submitButton}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.contactInfoTitle}</h2>
              <div className="space-y-4">
                {contactItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.label}</h3>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-teal-50 rounded-xl p-6">
              <h3 className="font-bold mb-2">{t.ctaTitle}</h3>
              <p className="text-gray-700 mb-4">{t.ctaDescription}</p>
              <button className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                {t.ctaButton}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
