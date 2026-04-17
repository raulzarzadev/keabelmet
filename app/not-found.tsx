import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-teal-700 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-2">Pagina no encontrada</p>
        <p className="text-gray-500 mb-8">La pagina que buscas no existe o fue movida.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
