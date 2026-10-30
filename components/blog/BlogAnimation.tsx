import type { BlogLocale } from "@/lib/blog/types"

/**
 * Animaciones explicativas del blog (SVG + CSS, sin JavaScript).
 * Se pausan con prefers-reduced-motion (ver .ba-anim en theme.css).
 */
export type BlogAnimationName = "surgencia" | "bola" | "cadena"

const labels = {
	surgencia: {
		es: { title: "Cómo funciona una surgencia costera", wind: "Viento paralelo a la costa", out: "El agua de la superficie se aleja de la costa", up: "Sube agua fría y con nutrientes", bloom: "El fitoplancton florece", land: "Costa", deep: "Agua profunda y fría" },
		en: { title: "How coastal upwelling works", wind: "Wind blowing along the coast", out: "Surface water is pushed offshore", up: "Cold, nutrient-rich water rises", bloom: "Phytoplankton blooms", land: "Coast", deep: "Cold deep water" },
	},
	bola: {
		es: { title: "El “efecto fuente” de un cardumen de sardinas", marlin: "Marlín", school: "Sardinas", note: "El cardumen se abre alrededor del depredador y se vuelve a unir detrás de él" },
		en: { title: "The “fountain effect” of a sardine school", marlin: "Marlin", school: "Sardines", note: "The school splits around the predator and rejoins behind it" },
	},
	cadena: {
		es: { title: "La cadena alimenticia del Sardine Run", n: ["Sol y nutrientes", "Fitoplancton", "Zooplancton", "Sardina", "Depredadores"], sub: ["surgencia", "algas microscópicas", "copépodos y krill", "filtra el plancton", "marlín, lobo marino, aves, ballenas"] },
		en: { title: "The Sardine Run food chain", n: ["Sun & nutrients", "Phytoplankton", "Zooplankton", "Sardine", "Predators"], sub: ["upwelling", "microscopic algae", "copepods & krill", "filters plankton", "marlin, sea lions, birds, whales"] },
	},
} as const

export default function BlogAnimation({ name, lang }: { name: BlogAnimationName; lang: BlogLocale }) {
	if (name === "surgencia") return <Surgencia lang={lang} />
	if (name === "bola") return <Bola lang={lang} />
	return <Cadena lang={lang} />
}

function Surgencia({ lang }: { lang: BlogLocale }) {
	const t = labels.surgencia[lang]
	const surface = [0, 1, 2, 3, 4, 5]
	const rising = [0, 1, 2, 3, 4, 5, 6, 7]
	const plankton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	return (
		<svg className="ba-anim-svg anim-surgencia" viewBox="0 0 640 380" role="img" aria-label={`${t.title}: ${t.wind}; ${t.out}; ${t.up}; ${t.bloom}.`}>
			<defs>
				<linearGradient id="sg-sea" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#17607d" />
					<stop offset="0.45" stopColor="#0f3d55" />
					<stop offset="1" stopColor="#081f30" />
				</linearGradient>
				<marker id="sg-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
					<path d="M0,0 L10,5 L0,10 z" fill="#f4efe4" />
				</marker>
			</defs>
			{/* cielo */}
			<rect x="0" y="0" width="640" height="110" fill="#0b1d2a" />
			{/* mar */}
			<rect x="0" y="110" width="640" height="270" fill="url(#sg-sea)" />
			{/* tierra (costa a la derecha) */}
			<path d="M520,110 L640,90 L640,380 L430,380 Q470,250 520,110 z" fill="#6b4a32" />
			<path d="M520,110 L640,90 L640,96 L522,116 z" fill="#8a6545" />
			<text x="585" y="80" className="sg-label" textAnchor="middle">{t.land}</text>
			{/* viento: se dibuja como flechas que soplan "hacia el lector" a lo largo de la costa */}
			<g className="sg-wind">
				{[0, 1, 2].map((i) => (
					<g key={i} transform={`translate(${250 + i * 80} 52)`}>
						<circle r="13" fill="none" stroke="#f4efe4" strokeWidth="2" />
						<circle r="3.5" fill="#f4efe4" />
					</g>
				))}
			</g>
			<text x="330" y="26" className="sg-label" textAnchor="middle">{t.wind}</text>
			{/* agua superficial alejándose de la costa */}
			{surface.map((i) => (
				<line key={i} className="sg-surf" style={{ animationDelay: `${-i * 0.6}s` }} x1="470" y1={120 + (i % 3) * 9} x2="430" y2={120 + (i % 3) * 9} stroke="#9fd3e6" strokeWidth="3" strokeLinecap="round" markerEnd="url(#sg-arrow)" />
			))}
			<text x="190" y="180" className="sg-label sg-small" textAnchor="middle">{t.out}</text>
			{/* agua profunda subiendo junto a la costa */}
			{rising.map((i) => (
				<circle key={i} className="sg-rise" style={{ animationDelay: `${-i * 0.55}s` }} cx="0" cy="0" r="4.5" fill="#5ad1f0" />
			))}
			<text x="300" y="300" className="sg-label sg-small" textAnchor="middle">{t.up}</text>
			<text x="150" y="360" className="sg-label sg-small sg-dim" textAnchor="middle">{t.deep}</text>
			{/* fitoplancton */}
			{plankton.map((i) => (
				<circle key={i} className="sg-bloom" style={{ animationDelay: `${-i * 0.45}s` }} cx={380 + (i % 5) * 22} cy={120 + Math.floor(i / 5) * 14} r="3.5" fill="#28c2a0" />
			))}
			<text x="400" y="212" className="sg-label sg-small sg-teal" textAnchor="middle">{t.bloom}</text>
		</svg>
	)
}

function Bola({ lang }: { lang: BlogLocale }) {
	const t = labels.bola[lang]
	// Posiciones de las sardinas dentro de un círculo (determinísticas).
	const fish: { x: number; y: number; top: boolean }[] = []
	for (let r = 0; r < 4; r++) {
		const n = 6 + r * 6
		for (let k = 0; k < n; k++) {
			const a = (k / n) * Math.PI * 2 + r * 0.3
			const rad = 14 + r * 20
			const x = 360 + Math.cos(a) * rad
			const y = 190 + Math.sin(a) * rad * 0.8
			fish.push({ x, y, top: y < 190 })
		}
	}
	return (
		<svg className="ba-anim-svg anim-bola" viewBox="0 0 640 360" role="img" aria-label={`${t.title}. ${t.note}.`}>
			<rect x="0" y="0" width="640" height="360" fill="#0d3a52" />
			<text x="320" y="30" className="sg-label" textAnchor="middle">{t.title}</text>
			<g className="bl-top">
				{fish.filter((f) => f.top).map((f, i) => (
					<ellipse key={i} cx={f.x} cy={f.y} rx="6" ry="2.4" fill="#d9e6ea" opacity="0.92" />
				))}
			</g>
			<g className="bl-bottom">
				{fish.filter((f) => !f.top).map((f, i) => (
					<ellipse key={i} cx={f.x} cy={f.y} rx="6" ry="2.4" fill="#d9e6ea" opacity="0.92" />
				))}
			</g>
			<g className="bl-marlin">
				{/* marlín estilizado: cuerpo, pico, aleta dorsal y cola */}
				<path d="M0,0 C20,-12 70,-14 100,-4 L140,-1 L100,2 C70,12 20,12 0,0 z" fill="#2a6fb0" />
				<path d="M25,-9 C40,-34 60,-30 75,-10 z" fill="#1e5a93" />
				<path d="M2,0 L-22,-16 L-14,0 L-22,16 z" fill="#1e5a93" />
				{[30, 44, 58, 72].map((x) => <line key={x} x1={x} y1="-8" x2={x - 4} y2="8" stroke="#7fd4ff" strokeWidth="2.4" />)}
			</g>
			<text x="320" y="335" className="sg-label sg-small" textAnchor="middle">{t.note}</text>
		</svg>
	)
}

function Cadena({ lang }: { lang: BlogLocale }) {
	const t = labels.cadena[lang]
	const xs = [64, 192, 320, 448, 576]
	const colors = ["#f2c14e", "#28c2a0", "#7fc8e8", "#d9e6ea", "#ff6b4a"]
	return (
		<svg className="ba-anim-svg anim-cadena" viewBox="0 0 640 300" role="img" aria-label={`${t.title}: ${t.n.join(" → ")}.`}>
			<rect x="0" y="0" width="640" height="300" fill="#0d3a52" />
			<text x="320" y="34" className="sg-label" textAnchor="middle">{t.title}</text>
			{xs.slice(0, -1).map((x, i) => (
				<g key={i}>
					<line x1={x + 34} y1="140" x2={xs[i + 1] - 34} y2="140" stroke="rgba(244,239,228,0.35)" strokeWidth="2" strokeDasharray="4 6" />
					{[0, 1, 2].map((k) => (
						<circle key={k} className="cd-flow" style={{ ["--dx" as string]: `${xs[i + 1] - x - 68}px`, animationDelay: `${-(k * 0.6 + i * 0.25)}s` } as React.CSSProperties} cx={x + 34} cy="140" r="4" fill={colors[i]} />
					))}
				</g>
			))}
			{xs.map((x, i) => (
				<g key={i}>
					<circle className="cd-node" style={{ animationDelay: `${i * 0.5}s` }} cx={x} cy="140" r="30" fill="none" stroke={colors[i]} strokeWidth="3" />
					<circle cx={x} cy="140" r={10 + i * 2.5} fill={colors[i]} opacity="0.85" />
					<text x={x} y="200" className="sg-label sg-small" textAnchor="middle">{t.n[i]}</text>
					<text x={x} y="222" className="sg-label sg-tiny sg-dim" textAnchor="middle">{t.sub[i].length > 18 ? t.sub[i].split(", ").slice(0, 2).join(", ") : t.sub[i]}</text>
					{t.sub[i].length > 18 && t.sub[i].split(", ").length > 2 && (
						<text x={x} y="240" className="sg-label sg-tiny sg-dim" textAnchor="middle">{t.sub[i].split(", ").slice(2).join(", ")}</text>
					)}
				</g>
			))}
		</svg>
	)
}
