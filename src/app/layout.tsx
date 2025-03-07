import type { Metadata } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import './globals.css'

//TREND SANS ONE
//Montserrat light
// Configura fuentes primaria y secundaria
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Keabelmet expteditions',
  description: 'keabelmet expteditions. Siendo agua y tierra',
  generator: 'raulzarza.dev',
  appleWebApp: {
    title: 'keablemet',
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage: []
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${poppins.variable} `}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
