"use client"

import { useState } from "react"

export default function FounderStory() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="founder" id="historia">
      <div className="founder-media">
        <img src="/images/orca-safari.jpg" alt="Mauricio López, cofundador de Keabelmet" />
      </div>
      <div className="founder-text">
        <span className="kicker">Nuestra historia</span>
        <h2>"Las mejores historias del océano nunca están escritas. Se viven."</h2>
        <p>Empezamos porque creemos que el océano puede cambiar la forma en la que una persona ve el mundo.</p>
        <p>Desde muy joven encontré en el mar un lugar donde siempre había algo nuevo por descubrir. Esa curiosidad me llevó a estudiar Biología Marina y, con el tiempo, entendí que conocer una especie no era suficiente: lo verdaderamente importante era lograr que más personas se enamoraran de ella.</p>
        <p>Porque nadie protege aquello que no conoce.</p>

        {expanded && (
          <>
            <p>Pero también descubrí otra realidad. Cada vez había más personas visitando lugares increíbles… sin realmente comprenderlos.</p>
            <p>Animales perseguidos para conseguir una fotografía. Experiencias diseñadas para cumplir una lista de destinos. Lugares salvajes convertidos en una atracción más.</p>
            <p>Y pensé que tenía que existir otra manera.</p>
            <p>Así nació Keabelmet. No como una agencia de tours, sino como una forma diferente de explorar la naturaleza.</p>
            <p>El nombre proviene del antiguo idioma guaycura, de los indígenas de Baja California Sur: <em>Kea</em>, que significa siendo, y <em>Cabelmet</em>, que significa agua y tierra. Una idea que resume lo que creemos: no estamos separados de la naturaleza; somos parte de ella.</p>
            <p>Por eso cada expedición comienza con una filosofía muy simple. No perseguimos animales. No forzamos encuentros. No prometemos espectáculos. El océano marca el ritmo y nosotros aprendemos a observar.</p>
            <p>Algunos días una ballena decide acercarse a la embarcación. Otros, una enorme agregación de móbulas transforma el mar en un torbellino. Y algunos más, el mayor regalo es un arrecife lleno de vida y color. Todas esas experiencias tienen el mismo valor, porque ninguna puede fabricarse.</p>
            <p>Mi trabajo no es llevarte a ver animales. Es ayudarte a entender el lugar que ocupan en este mundo y hacer que regreses a casa viendo el océano con otros ojos. Que te enamores aún más de la naturaleza.</p>
            <p>Porque cuando eso sucede, la expedición realmente cumplió su propósito.</p>
            <p>Bienvenido a Keabelmet. Siendo agua y tierra.</p>
          </>
        )}

        <button className="read-more" onClick={() => setExpanded(!expanded)}>
          {expanded ? "← Mostrar menos" : "Seguir leyendo →"}
        </button>

        <div className="sign">
          Mauricio López
          <span>Cofundador de Keabelmet Expeditions</span>
        </div>
      </div>
    </section>
  )
}
