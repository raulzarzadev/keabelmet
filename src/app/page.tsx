export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-7xl font-bold text-center text-blue-700 mb-4">
          Keabelmet
        </h1>

        <div className="h-1 w-20 bg-blue-500 mx-auto mb-8"></div>

        <p className="mt-4 text-xl text-gray-700 mb-8">
          Estamos trabajando en algo increíble. Nuestro sitio web estará
          disponible próximamente.
        </p>

        <div className="mt-12">
          <p className="text-gray-500 italic">
            © {new Date().getFullYear()} Keabelmet. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
