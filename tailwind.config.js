/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: 'hsl(var(--background))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))'
        // Otros colores de fondo necesarios
      },
      textColor: {
        foreground: 'hsl(var(--foreground))',
        'primary-foreground': 'hsl(var(--primary-foreground))'
        // Otros colores de texto necesarios
      },
      borderColor: {
        border: 'hsl(var(--border))'
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        trend: ['var(--font-trend-sans-one)', 'system-ui', 'sans-serif'] // Nueva fuente
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
