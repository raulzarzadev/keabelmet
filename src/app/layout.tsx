// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// Fuentes (mantenemos lo que ya tenías)
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

// ✅ SEO + Open Graph + PWA base
export const metadata: Metadata = {
  title: "Keabelmet Expeditions | Safaris marinos en BCS",
  description:
    "Keabelmet Expeditions: expediciones responsables en Bahía Magdalena y La Ventana. Grupos pequeños, seguridad, foto y video incluidos.",
  generator: "raulzarza.dev",
  openGraph: {
    title: "Keabelmet Expeditions | Safaris marinos en BCS",
    description:
      "Vive el océano: móbulas, ballenas y marlines. Grupos pequeños y enfoque científico.",
    url: "https://TU-DOMINIO.vercel.app/",
    siteName: "Keabelmet Expeditions",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Keabelmet Expeditions" }],
    locale: "es_MX",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "Keabelmet",
    capable: true,
    statusBarStyle: "black-translucent",
    startupImage: [],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="min-h-dvh bg-white text-neutral-900 font-sans">
        {/* ===== Header sticky minimal ===== */}
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <Link href="/" className="font-semibold tracking-tight">
              Keabelmet
            </Link>
            <div className="hidden gap-5 text-sm sm:flex">
              <a href="/#testimonios" className="hover:text-emerald-700">Testimonios</a>
              <a href="/#problemas" className="hover:text-emerald-700">Problemas</a>
              <a href="/#como-lo-solucionamos" className="hover:text-emerald-700">Solución</a>
              <a href="/#que-vendemos" className="hover:text-emerald-700">Expediciones</a>
              <a href="/#autoridad" className="hover:text-emerald-700">Autoridad</a>
              <a href="/#consecuencias" className="hover:text-emerald-700">Consecuencias</a>
              <a href="/#faq" className="hover:text-emerald-700">FAQ</a>
              <a href="/#cta" className="hover:text-emerald-700">Reservar</a>
            </div>
            <Link
              href="https://wa.me/524422056214?text=Hola%20Keabelmet,%20quiero%20reservar"
              className="rounded-xl bg-emerald-600 px-3 py-2 text-sm text-white transition hover:bg-emerald-700"
            >
              WhatsApp
            </Link>
          </nav>
        </header>

        {/* ===== Contenido de cada página ===== */}
        <main>{children}</main>

        {/* ===== Footer ===== */}
        <footer className="mt-20 border-t">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm">
              © {new Date().getFullYear()} Keabelmet Expeditions · Siendo agua y tierra
            </div>
            <div className="flex gap-5 text-sm">
              <Link href="/politicas" className="hover:text-emerald-700">Políticas</Link>
              <a
                href="https://www.instagram.com/keabelmet"
                target="_blank"
                className="hover:text-emerald-700"
              >
                Instagram
              </a>
              <a href="mailto:hola@keabelmet.com" className="hover:text-emerald-700">
                hola@keabelmet.com
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
