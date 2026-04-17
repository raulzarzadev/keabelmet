import Link from "next/link"
import Image from "next/image"
import { Users, Ban, CameraOff, UserCheck, BookOpenCheck, Camera } from "lucide-react"
import GoogleReviews from "@/components/sections/GoogleReviews"
import { getDictionary, type Locale, defaultLocale, isValidLocale } from "@/lib/i18n"
import { Price } from "@/contexts/CurrencyContext"
import { getInstagramPosts } from "@/lib/instagram"
import InstagramGallery from "@/components/sections/InstagramGallery"

function l(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path === "/" ? "" : path}`
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const d = await getDictionary(locale) as Record<string, any>
  const instagramPosts = await getInstagramPosts(6)

  const hero = d.hero
  const adv = d.adventures
  const comp = d.comparison
  const exp = d.expeditions
  const why = d.whyUs
  const cons = d.consequences
  const faq = d.faq
  const cta = d.cta
  const gr = d.googleReviews
  const ig = d.instagram

  const adventureLinks = [
    "/experiencias/tour-espiritu-santo",
    "/experiencias/tour-ballena-gris",
    "/experiencias/buceo-cabo-pulmo",
    "/experiencias/buceo-la-paz",
    "/experiencias/renta-velero",
    "/experiencias/renta-yate",
  ]

  const adventureImages = [
    { src: "/lobo-marino-espiritu-santo.jpg", alt: adv.items[0].title },
    { src: "/ballena-gris-spyhop-new.jpg", alt: adv.items[1].title },
    { src: "/buceo-cabo-pulmo-cardumen.jpg", alt: adv.items[2].title },
    { src: "/buceo-la-paz-buzo.jpg", alt: adv.items[3].title },
    { src: "/sailboat-sailing-sunset-sea-of-cortez-romantic.jpg", alt: adv.items[4].title },
    { src: "/luxury-yacht-ocean-balandra-beach-turquoise-lagoon.jpg", alt: adv.items[5].title },
  ]

  const expeditionsData = [
    {
      title: "Safari Bahia Magdalena",
      description: exp.fullDay + " | Nov-Dic",
      img: "/images/marlin-bahia-magdalena-hero.jpeg",
      href: "/experiencias/safari-bahia-magdalena",
      rating: 5.0,
      reviews: 187,
      duration: exp.fullDay,
      capacity: "2-6 " + exp.people,
      features: ["Snorkeling", "Vida marina", "Transporte", "Lunch", "Equipo", "Videos/fotos"],
      price: 3500,
    },
    {
      title: "Seafari La Ventana",
      description: "6 hrs | Todo el ano",
      img: "/images/orca-la-ventana-hero.jpeg",
      href: "/experiencias/safari-la-ventana",
      rating: 5.0,
      reviews: 243,
      duration: "6 hrs",
      capacity: "4-8 " + exp.people,
      features: ["Neopreno", "Snorkel", "Picnic", "Fotos/video", "Guia biologo"],
      price: 3000,
    },
    {
      title: "Surf Camp La Paz",
      description: exp.days6,
      img: "/images/surf-camp-hero.jpeg",
      href: "/surf-camp",
      rating: 4.9,
      reviews: 156,
      duration: exp.days6,
      capacity: "6-8 " + exp.people,
      features: ["Surf", "Fisio", "Video", "Hospedaje", "Comidas"],
      price: 3400,
    },
  ]

  return (
    <main className="flex-1">
      {/* 1) HERO */}
      <section id="hero" className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/cachalotecta.jpeg"
            alt="Keabelmet Expeditions - Safari Marino en Baja California Sur"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {hero.badge}
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{hero.subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#que-vendemos"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-700"
            >
              {hero.cta1}
            </Link>
            <Link
              href="#testimonios"
              className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/10 px-5 py-3 text-white transition hover:bg-white/20"
            >
              {hero.cta2}
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-white sm:text-5xl">{hero.stat1_value}</div>
              <div className="mt-2 text-sm text-white/80 sm:text-base">{hero.stat1_label}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white sm:text-5xl">{hero.stat2_value}</div>
              <div className="mt-2 text-sm text-white/80 sm:text-base">{hero.stat2_label}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white sm:text-5xl">{hero.stat3_value}</div>
              <div className="mt-2 text-sm text-white/80 sm:text-base">{hero.stat3_label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5) FEATURED ADVENTURES */}
      <section id="featured-adventures" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              {adv.title} <span className="text-teal-600">{adv.titleHighlight}</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">{adv.subtitle}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {adv.items.map((item: any, i: number) => (
              <article key={i} className="group overflow-hidden rounded-2xl border bg-white shadow-md transition-all hover:shadow-xl">
                <Link href={l(adventureLinks[i], locale)} className="block focus:outline-none">
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={adventureImages[i].src}
                      alt={adventureImages[i].alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur">
                      <svg className="h-4 w-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">{item.badge}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-gray-600">{item.description}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-teal-700 text-2xl font-bold">
                        <Price amount={item.price} />
                      </div>
                      <div className="flex items-center gap-2 text-gray-900">
                        <span className="text-sm font-medium">{adv.learnMore}</span>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      {gr && (
        <GoogleReviews
          title={gr.title}
          subtitle={gr.subtitle}
          overallRating={gr.overallRating}
          totalReviews={gr.totalReviews}
          reviews={gr.reviews}
          ctaAll={gr.ctaAll}
          ctaLeave={gr.ctaLeave}
          googleMapsUrl={gr.googleMapsUrl}
          googleReviewUrl={gr.googleReviewUrl}
        />
      )}

      {/* 3) PROBLEMA -> SOLUCION */}
      <section id="problemas-soluciones" className="relative overflow-hidden bg-gradient-to-br from-white via-teal-50/20 to-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-14">
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              {comp.badge}
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
              {comp.title}
              <span className="block mt-1 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                {comp.titleHighlight}
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">{comp.subtitle}</p>
          </div>

          <div className="grid gap-4 lg:gap-5">
            {[0, 1, 2].map((idx) => {
              const icons = [
                [<Users key="p" className="h-5 w-5 text-orange-600" />, <UserCheck key="s" className="h-5 w-5 text-teal-600" />],
                [<Ban key="p" className="h-5 w-5 text-orange-600" />, <BookOpenCheck key="s" className="h-5 w-5 text-teal-600" />],
                [<CameraOff key="p" className="h-5 w-5 text-orange-600" />, <Camera key="s" className="h-5 w-5 text-teal-600" />],
              ]
              return (
                <div key={idx} className="grid gap-4 lg:grid-cols-2 lg:gap-5">
                  {/* Problem */}
                  <div className="group relative overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm transition-all hover:shadow-md">
                    <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-orange-100/50 blur-xl" />
                    <div className="relative">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 ring-1 ring-orange-200/50">
                          {icons[idx][0]}
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-gray-900">{comp.problems[idx].title}</h3>
                      <p className="text-sm leading-relaxed text-gray-700">{comp.problems[idx].text}</p>
                    </div>
                  </div>
                  {/* Solution */}
                  <div className="group relative overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 shadow-sm ring-2 ring-teal-100/50 transition-all hover:shadow-md">
                    <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-teal-100/50 blur-xl" />
                    <div className="relative">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 ring-1 ring-teal-200/50">
                          {icons[idx][1]}
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-teal-200 to-transparent" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-gray-900">{comp.solutions[idx].title}</h3>
                      <p className="text-sm leading-relaxed text-gray-700">{comp.solutions[idx].text}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4) EXPEDICIONES */}
      <section id="que-vendemos" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">{exp.title}</h2>
          <p className="mt-2 max-w-2xl text-neutral-600">{exp.subtitle}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {expeditionsData.map((expedition, i) => (
              <article key={i} className="group overflow-hidden rounded-2xl border bg-white shadow-md transition-all hover:shadow-xl">
                <Link href={l(expedition.href, locale)} className="block focus:outline-none">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={expedition.img}
                      alt={expedition.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur">
                      <svg className="h-4 w-4 fill-teal-600" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-900">{expedition.rating}</span>
                      <span className="text-sm text-gray-600">({expedition.reviews})</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{expedition.title}</h3>
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <span>{expedition.duration}</span>
                      <span>{expedition.capacity}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {expedition.features.map((f, idx) => (
                        <span key={idx} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{f}</span>
                      ))}
                    </div>
                    <div className="my-4 border-t border-gray-200" />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500">{exp.perPerson}</div>
                        <div className="text-2xl font-bold text-teal-700"><Price amount={expedition.price} /></div>
                      </div>
                      <button className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800">
                        {exp.book}
                      </button>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5) POR QUE KEABELMET */}
      <section id="autoridad" className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {why.title} <span className="text-teal-600">{why.titleHighlight}</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">{why.subtitle}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {why.features.map((feat: any, i: number) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100">
                  <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />}
                    {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                    {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feat.title}</h3>
                <p className="mt-3 text-neutral-600">{feat.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">{why.bio_title}</h3>
                <p className="text-neutral-600">{why.bio_text}</p>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">{why.edu_title}</h3>
                <p className="text-neutral-600">{why.edu_text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery Preview */}
      {instagramPosts && ig && (
        <InstagramGallery
          posts={instagramPosts}
          title={ig.title}
          subtitle={ig.subtitle}
          ctaText={ig.ctaFull}
          ctaHref={l("/galeria", locale)}
          instagramUrl="https://www.instagram.com/keabelmet__expeditions/"
          followText={ig.follow}
        />
      )}

      {/* 6) CONSECUENCIAS */}
      <section id="consecuencias" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">{cons.title}</h2>
          <ul className="mt-4 grid list-disc gap-3 pl-5 text-neutral-700 md:grid-cols-2">
            {cons.items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7) FAQ */}
      <section id="faq" className="relative bg-neutral-50">
        <div className="absolute inset-0 -z-10 opacity-10">
          <Image src="/faq.jpg" alt="Fondo marino" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">{faq.title}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {faq.items.map((item: any, i: number) => (
              <div key={i} className="rounded-2xl border bg-white/80 p-6 backdrop-blur">
                <div className="font-semibold">{item.q}</div>
                <p className="mt-2 text-neutral-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta" className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/ballenagriscta.jpg"
            alt="Keabelmet Expeditions"
            fill
            sizes="100vw"
            className="object-cover brightness-95"
          />
          <div className="absolute inset-0 bg-white/15" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl drop-shadow-lg">{cta.title}</h2>
          <p className="mt-4 text-lg drop-shadow-md">{cta.subtitle}</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href={l("/experiencias/safari-bahia-magdalena", locale)}
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition drop-shadow-md inline-flex items-center justify-center"
            >
              {cta.btn1}
            </Link>
            <Link
              href={l("/experiencias/safari-la-ventana", locale)}
              className="rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition drop-shadow-md inline-flex items-center justify-center"
            >
              {cta.btn2}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
