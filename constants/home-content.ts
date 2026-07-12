import type { Locale } from "@/lib/i18n"

export interface RegionContent {
	kicker: string
	title: string
	text: string
	image: string
	alt: string
	href: string
	right: boolean
}

export interface TourCardContent {
	tag: string
	coral: boolean
	image: string
	alt: string
	title: string
	meta: string[]
	priceMxn: number
	per: string
	href: string
}

export interface HomeContent {
	viewExpedition: string
	hero: {
		kicker: string
		titleLine1: string
		titleLine2: string
		titleEm: string
		sub: string
		cta1: string
		cta2: string
		scroll: string
		alt: string
	}
	stats: { value: string; label: string }[]
	mission: { main: string; em: string; dim: string }
	regions: RegionContent[]
	toursHead: { kicker: string; title: string; sub: string }
	tourCards: TourCardContent[]
	compare: {
		kicker: string
		title: string
		badCol: string
		goodCol: string
		bad: { title: string; text: string }[]
		good: { title: string; text: string }[]
	}
	why: {
		kicker: string
		title: string
		items: { title: string; text: string }[]
	}
	testi: {
		kicker: string
		title: string
		items: { text: string; name: string; loc: string }[]
	}
	founder: {
		kicker: string
		quote: string
		intro: string[]
		more: string[]
		readMore: string
		readLess: string
		signName: string
		signRole: string
		alt: string
	}
	insta: { kicker: string; btn: string }
	finalCta: { title: string; text: string; btn1: string; btn2: string; waText: string; alt: string }
}

const es: HomeContent = {
	viewExpedition: "Ver expedición",
	hero: {
		kicker: "Siendo agua y tierra",
		titleLine1: "Donde el desierto",
		titleLine2: "conoce al ",
		titleEm: "mar salvaje",
		sub: "Expediciones marinas guiadas por biólogos en Baja California Sur. Nada con lobos marinos, encuentra ballenas frente a frente y explora el Mar de Cortés como pocos lo han visto.",
		cta1: "Explora las expediciones",
		cta2: "Nuestra historia",
		scroll: "Desliza para explorar ↓",
		alt: "Cachalote nadando en el Mar de Cortés",
	},
	stats: [
		{ value: "15+", label: "Expediciones únicas" },
		{ value: "10K+", label: "Aventureros satisfechos" },
		{ value: "9.8", label: "Calificación promedio" },
	],
	mission: {
		main: "El Mar de Cortés es uno de los mares más biodiversos del planeta. ",
		em: 'Jacques Cousteau lo llamó "el acuario del mundo".',
		dim: "Cada expedición que vives con nosotros es un encuentro real con esa vida salvaje — y una forma de ayudar a protegerla.",
	},
	regions: [
		{
			kicker: "La Ventana · Isla Cerralvo",
			title: "Móbulas que vuelan, ballenas que emergen",
			text: "Un safari sin guion. Navegamos guiados por biólogos marinos en busca de lo inesperado, a 40 minutos de La Paz.",
			image: "/images/orca-safari.jpg",
			alt: "Seafari en La Ventana",
			href: "/experiencias/safari-la-ventana",
			right: false,
		},
		{
			kicker: "Bahía Magdalena · Nov-Dic",
			title: "El safari más salvaje del Pacífico",
			text: "Miles de sardinas, marlines cazando a máxima velocidad, ballenas alimentándose. Un fenómeno de solo dos meses al año.",
			image: "/images/marlin-bahia-magdalena-hero.jpeg",
			alt: "Sardine Run en Bahía Magdalena",
			href: "/experiencias/safari-bahia-magdalena",
			right: true,
		},
		{
			kicker: "Cabo Pulmo · Parque Nacional",
			title: "El único arrecife vivo del Golfo",
			text: "25,000 años de coral, tiburones toro, cardúmenes masivos. Una de las reservas marinas más exitosas del mundo.",
			image: "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg",
			alt: "Buceo en Cabo Pulmo",
			href: "/experiencias/buceo-cabo-pulmo",
			right: false,
		},
		{
			kicker: "Isla Espíritu Santo · Patrimonio UNESCO",
			title: "Nada con lobos marinos curiosos",
			text: "Playas vírgenes, aguas cristalinas y una de las colonias de lobos marinos más grandes del Golfo de California.",
			image: "/espiritu-santo-island-paradise-beach.jpg",
			alt: "Isla Espíritu Santo",
			href: "/experiencias/tour-espiritu-santo",
			right: true,
		},
	],
	toursHead: {
		kicker: "Nuestras expediciones",
		title: "Diseñadas para encuentros reales con la vida marina",
		sub: "Grupos pequeños, guía biólogo marino, foto y video incluidos. Sin guion, sin masificación.",
	},
	tourCards: [
		{
			tag: "Medio día",
			coral: false,
			image: "/images/orca-safari.jpg",
			alt: "Ocean Safari La Ventana",
			title: "Ocean Safari La Ventana",
			meta: ["2-8 personas", "6 horas", "Móbulas Abr-Jun"],
			priceMxn: 3000,
			per: "por persona",
			href: "/experiencias/safari-la-ventana",
		},
		{
			tag: "Día completo",
			coral: false,
			image: "/images/marlin-bahia-magdalena-hero.jpeg",
			alt: "Safari Bahía Magdalena",
			title: "Safari Bahía Magdalena",
			meta: ["2-6 personas", "Corrida de sardinas", "Nov-Dic"],
			priceMxn: 3500,
			per: "por persona",
			href: "/experiencias/safari-bahia-magdalena",
		},
		{
			tag: "Día completo",
			coral: false,
			image: "/images/hero/ballena-gris-hero.jpeg",
			alt: "Ballena Gris Puerto Chale",
			title: "Ballena Gris · Puerto Chale",
			meta: ["Hasta 8 personas", "Madres y crías", "Ene-Mar"],
			priceMxn: 2800,
			per: "por persona",
			href: "/experiencias/tour-ballena-gris",
		},
		{
			tag: "Medio día",
			coral: false,
			image: "/snorkeling-coral-reef.jpg",
			alt: "Tiburón Ballena",
			title: "Tiburón Ballena",
			meta: ["2-8 personas", "Snorkel", "Nov-Mar"],
			priceMxn: 1800,
			per: "por persona",
			href: "/experiencias/tiburon-ballena",
		},
		{
			tag: "Día completo",
			coral: false,
			image: "/espiritu-santo-island-paradise-beach.jpg",
			alt: "Isla Espíritu Santo",
			title: "Tour Snorkel Isla Espíritu Santo",
			meta: ["2-10 personas", "Lobos marinos", "Todo el año"],
			priceMxn: 1800,
			per: "por persona",
			href: "/experiencias/tour-espiritu-santo",
		},
		{
			tag: "Día completo",
			coral: false,
			image: "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg",
			alt: "Buceo Cabo Pulmo",
			title: "Scuba Diving Cabo Pulmo",
			meta: ["Parque Nacional", "Discovery $3,800", "Todo el año"],
			priceMxn: 3200,
			per: "certificado",
			href: "/experiencias/buceo-cabo-pulmo",
		},
		{
			tag: "Día completo",
			coral: false,
			image: "/scuba-diving-underwater-sea-lions-swimming-playful.jpg",
			alt: "Buceo Isla Espíritu Santo",
			title: "Scuba Diving Isla Espíritu Santo",
			meta: ["Lobos marinos", "Barcos hundidos", "Discovery $4,200"],
			priceMxn: 3700,
			per: "certificado",
			href: "/experiencias/buceo-la-paz",
		},
		{
			tag: "Nuevo",
			coral: true,
			image: "/snorkeling-coral-reef.jpg",
			alt: "Scuba Discovery desde playa",
			title: "Scuba Discovery desde Playa",
			meta: ["Sin experiencia previa", "Máx. 6m profundidad", "Para principiantes"],
			priceMxn: 1500,
			per: "por persona",
			href: "/experiencias/scuba-discovery",
		},
	],
	compare: {
		kicker: "Comparativa directa",
		title: "Lo que suele arruinar un safari — y cómo lo hacemos distinto",
		badCol: "LO TÍPICO",
		goodCol: "KEABELMET",
		bad: [
			{ title: "Panga con 20 personas", text: "Experiencia caótica, poco personal, cero conexión real." },
			{ title: "Guías sin formación científica", text: "No explican comportamiento ni respetan a los animales." },
			{ title: "Fotos que prometen y nunca llegan", text: "O llegan sin cumplir lo esperado." },
		],
		good: [
			{ title: "Grupos pequeños de verdad", text: "Máximo 8-10 personas por expedición, atención personalizada." },
			{ title: "Guía biólogo marino", text: "Historias, comportamiento animal y buenas prácticas de conservación." },
			{ title: "Foto y video incluidos", text: "Capturas profesionales entregadas siempre, sin letra chiquita." },
		],
	},
	why: {
		kicker: "Por qué Keabelmet",
		title: "Aventuras auténticas, sustentables e inolvidables",
		items: [
			{ title: "Experiencia local", text: "Con base en La Paz, conocemos cada rincón y el mejor momento para visitar cada lugar." },
			{ title: "Seguridad primero", text: "Guías certificados, equipo de calidad y protocolos reales para tu tranquilidad." },
			{ title: "Grupos pequeños", text: "Atención personalizada y conexiones auténticas con quienes viajan contigo." },
			{ title: "Liderado por biólogos marinos", text: "Especialistas con experiencia real en expediciones y campamentos remotos." },
			{ title: "Educación y conservación", text: "Cada expedición es una oportunidad para aprender y proteger el ecosistema." },
			{ title: "Foto y video incluidos", text: "Capturas profesionales de tu experiencia, listas para revivir el momento." },
		],
	},
	testi: {
		kicker: "Lo que dicen nuestros aventureros",
		title: "Experiencias reales, contadas por quienes las vivieron",
		items: [
			{
				text: '"Siempre soñé con ver ballenas. Pero esto fue más que eso. Lloré de emoción. Gracias por respetar la naturaleza así."',
				name: "Lucía",
				loc: "Ciudad de México",
			},
			{
				text: '"Nadar con los lobos marinos fue la experiencia más mágica de mi vida. Son tan juguetones y curiosos. El equipo de Keabelmet es súper profesional y respetuoso con los animales."',
				name: "María González",
				loc: "Ciudad de México",
			},
			{
				text: '"Increíble experiencia. Ver a los marlines cazando sardinas fue como estar en un documental de National Geographic. La adrenalina y la emoción son indescriptibles."',
				name: "Alejandro Ruiz",
				loc: "Monterrey",
			},
		],
	},
	founder: {
		kicker: "Nuestra historia",
		quote: '"Las mejores historias del océano nunca están escritas. Se viven."',
		intro: [
			"Empezamos porque creemos que el océano puede cambiar la forma en la que una persona ve el mundo.",
			"Desde muy joven encontré en el mar un lugar donde siempre había algo nuevo por descubrir. Esa curiosidad me llevó a estudiar Biología Marina y, con el tiempo, entendí que conocer una especie no era suficiente: lo verdaderamente importante era lograr que más personas se enamoraran de ella.",
			"Porque nadie protege aquello que no conoce.",
		],
		more: [
			"Pero también descubrí otra realidad. Cada vez había más personas visitando lugares increíbles… sin realmente comprenderlos.",
			"Animales perseguidos para conseguir una fotografía. Experiencias diseñadas para cumplir una lista de destinos. Lugares salvajes convertidos en una atracción más.",
			"Y pensé que tenía que existir otra manera.",
			"Así nació Keabelmet. No como una agencia de tours, sino como una forma diferente de explorar la naturaleza.",
			"El nombre proviene del antiguo idioma guaycura, de los indígenas de Baja California Sur: Kea, que significa siendo, y Cabelmet, que significa agua y tierra. Una idea que resume lo que creemos: no estamos separados de la naturaleza; somos parte de ella.",
			"Por eso cada expedición comienza con una filosofía muy simple. No perseguimos animales. No forzamos encuentros. No prometemos espectáculos. El océano marca el ritmo y nosotros aprendemos a observar.",
			"Algunos días una ballena decide acercarse a la embarcación. Otros, una enorme agregación de móbulas transforma el mar en un torbellino. Y algunos más, el mayor regalo es un arrecife lleno de vida y color. Todas esas experiencias tienen el mismo valor, porque ninguna puede fabricarse.",
			"Mi trabajo no es llevarte a ver animales. Es ayudarte a entender el lugar que ocupan en este mundo y hacer que regreses a casa viendo el océano con otros ojos. Que te enamores aún más de la naturaleza.",
			"Porque cuando eso sucede, la expedición realmente cumplió su propósito.",
			"Bienvenido a Keabelmet. Siendo agua y tierra.",
		],
		readMore: "Seguir leyendo →",
		readLess: "← Mostrar menos",
		signName: "Mauricio López",
		signRole: "Cofundador de Keabelmet Expeditions",
		alt: "Mauricio López, cofundador de Keabelmet",
	},
	insta: { kicker: "Síguenos", btn: "Ver en Instagram" },
	finalCta: {
		title: "Tu próximo encuentro salvaje empieza aquí",
		text: "Escríbenos por WhatsApp y armamos tu expedición — grupos pequeños, guía biólogo marino, foto y video incluidos.",
		btn1: "Reservar por WhatsApp",
		btn2: "Ver expediciones",
		waText: "Hola! quiero reservar una expedición con Keabelmet",
		alt: "Ballena en el Mar de Cortés",
	},
}

const en: HomeContent = {
	viewExpedition: "View expedition",
	hero: {
		kicker: "Being water and land",
		titleLine1: "Where the desert",
		titleLine2: "meets the ",
		titleEm: "wild sea",
		sub: "Marine expeditions guided by biologists in Baja California Sur. Swim with sea lions, meet whales face to face and explore the Sea of Cortez like few ever have.",
		cta1: "Explore the expeditions",
		cta2: "Our story",
		scroll: "Scroll to explore ↓",
		alt: "Sperm whale swimming in the Sea of Cortez",
	},
	stats: [
		{ value: "15+", label: "Unique expeditions" },
		{ value: "10K+", label: "Happy adventurers" },
		{ value: "9.8", label: "Average rating" },
	],
	mission: {
		main: "The Sea of Cortez is one of the most biodiverse seas on the planet. ",
		em: 'Jacques Cousteau called it "the aquarium of the world."',
		dim: "Every expedition you live with us is a real encounter with that wildlife — and a way to help protect it.",
	},
	regions: [
		{
			kicker: "La Ventana · Cerralvo Island",
			title: "Mobulas that fly, whales that surface",
			text: "A safari with no script. Guided by marine biologists, we sail in search of the unexpected, 40 minutes from La Paz.",
			image: "/images/orca-safari.jpg",
			alt: "Seafari in La Ventana",
			href: "/experiencias/safari-la-ventana",
			right: false,
		},
		{
			kicker: "Magdalena Bay · Nov-Dec",
			title: "The wildest safari in the Pacific",
			text: "Thousands of sardines, marlin hunting at full speed, whales feeding. A phenomenon that lasts only two months a year.",
			image: "/images/marlin-bahia-magdalena-hero.jpeg",
			alt: "Sardine Run in Magdalena Bay",
			href: "/experiencias/safari-bahia-magdalena",
			right: true,
		},
		{
			kicker: "Cabo Pulmo · National Park",
			title: "The only living reef in the Gulf",
			text: "25,000 years of coral, bull sharks, massive schools of fish. One of the most successful marine reserves in the world.",
			image: "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg",
			alt: "Diving in Cabo Pulmo",
			href: "/experiencias/buceo-cabo-pulmo",
			right: false,
		},
		{
			kicker: "Espiritu Santo Island · UNESCO World Heritage",
			title: "Swim with curious sea lions",
			text: "Pristine beaches, crystal-clear waters and one of the largest sea lion colonies in the Gulf of California.",
			image: "/espiritu-santo-island-paradise-beach.jpg",
			alt: "Espiritu Santo Island",
			href: "/experiencias/tour-espiritu-santo",
			right: true,
		},
	],
	toursHead: {
		kicker: "Our expeditions",
		title: "Designed for real encounters with marine life",
		sub: "Small groups, marine biologist guide, photo and video included. No script, no crowds.",
	},
	tourCards: [
		{
			tag: "Half day",
			coral: false,
			image: "/images/orca-safari.jpg",
			alt: "Ocean Safari La Ventana",
			title: "Ocean Safari La Ventana",
			meta: ["2-8 people", "6 hours", "Mobulas Apr-Jun"],
			priceMxn: 3000,
			per: "per person",
			href: "/experiencias/safari-la-ventana",
		},
		{
			tag: "Full day",
			coral: false,
			image: "/images/marlin-bahia-magdalena-hero.jpeg",
			alt: "Magdalena Bay Safari",
			title: "Magdalena Bay Safari",
			meta: ["2-6 people", "Sardine run", "Nov-Dec"],
			priceMxn: 3500,
			per: "per person",
			href: "/experiencias/safari-bahia-magdalena",
		},
		{
			tag: "Full day",
			coral: false,
			image: "/images/hero/ballena-gris-hero.jpeg",
			alt: "Gray Whale Puerto Chale",
			title: "Gray Whale · Puerto Chale",
			meta: ["Up to 8 people", "Mothers and calves", "Jan-Mar"],
			priceMxn: 2800,
			per: "per person",
			href: "/experiencias/tour-ballena-gris",
		},
		{
			tag: "Half day",
			coral: false,
			image: "/snorkeling-coral-reef.jpg",
			alt: "Whale Shark",
			title: "Whale Shark",
			meta: ["2-8 people", "Snorkeling", "Nov-Mar"],
			priceMxn: 1800,
			per: "per person",
			href: "/experiencias/tiburon-ballena",
		},
		{
			tag: "Full day",
			coral: false,
			image: "/espiritu-santo-island-paradise-beach.jpg",
			alt: "Espiritu Santo Island",
			title: "Snorkel Tour Espiritu Santo Island",
			meta: ["2-10 people", "Sea lions", "Year-round"],
			priceMxn: 1800,
			per: "per person",
			href: "/experiencias/tour-espiritu-santo",
		},
		{
			tag: "Full day",
			coral: false,
			image: "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg",
			alt: "Cabo Pulmo Diving",
			title: "Scuba Diving Cabo Pulmo",
			meta: ["National Park", "Discovery $3,800", "Year-round"],
			priceMxn: 3200,
			per: "certified",
			href: "/experiencias/buceo-cabo-pulmo",
		},
		{
			tag: "Full day",
			coral: false,
			image: "/scuba-diving-underwater-sea-lions-swimming-playful.jpg",
			alt: "Espiritu Santo Island Diving",
			title: "Scuba Diving Espiritu Santo Island",
			meta: ["Sea lions", "Shipwrecks", "Discovery $4,200"],
			priceMxn: 3700,
			per: "certified",
			href: "/experiencias/buceo-la-paz",
		},
		{
			tag: "New",
			coral: true,
			image: "/snorkeling-coral-reef.jpg",
			alt: "Scuba Discovery from the beach",
			title: "Scuba Discovery from the Beach",
			meta: ["No experience needed", "Max 6m depth", "Beginner friendly"],
			priceMxn: 1500,
			per: "per person",
			href: "/experiencias/scuba-discovery",
		},
	],
	compare: {
		kicker: "Head to head",
		title: "What usually ruins a safari — and how we do it differently",
		badCol: "THE TYPICAL WAY",
		goodCol: "KEABELMET",
		bad: [
			{ title: "A panga with 20 people", text: "Chaotic, impersonal experience with zero real connection." },
			{ title: "Guides with no scientific training", text: "No insight into behavior, no respect for the animals." },
			{ title: "Photos promised, never delivered", text: "Or delivered far below expectations." },
		],
		good: [
			{ title: "Truly small groups", text: "Max 8-10 people per expedition, personalized attention." },
			{ title: "Marine biologist guide", text: "Stories, animal behavior and real conservation practices." },
			{ title: "Photo and video included", text: "Professional captures delivered every time, no fine print." },
		],
	},
	why: {
		kicker: "Why Keabelmet",
		title: "Authentic, sustainable, unforgettable adventures",
		items: [
			{ title: "Local expertise", text: "Based in La Paz, we know every corner and the best moment to visit each place." },
			{ title: "Safety first", text: "Certified guides, quality equipment and real protocols for your peace of mind." },
			{ title: "Small groups", text: "Personalized attention and authentic connections with your fellow travelers." },
			{ title: "Led by marine biologists", text: "Specialists with real experience in expeditions and remote camps." },
			{ title: "Education and conservation", text: "Every expedition is a chance to learn about and protect the ecosystem." },
			{ title: "Photo and video included", text: "Professional captures of your experience, ready to relive the moment." },
		],
	},
	testi: {
		kicker: "What our adventurers say",
		title: "Real experiences, told by the people who lived them",
		items: [
			{
				text: '"I always dreamed of seeing whales. But this was more than that. I cried with emotion. Thank you for respecting nature this way."',
				name: "Lucía",
				loc: "Mexico City",
			},
			{
				text: '"Swimming with the sea lions was the most magical experience of my life. They are so playful and curious. The Keabelmet team is super professional and respectful with the animals."',
				name: "María González",
				loc: "Mexico City",
			},
			{
				text: '"Incredible experience. Watching the marlin hunt sardines felt like being inside a National Geographic documentary. The adrenaline and emotion are indescribable."',
				name: "Alejandro Ruiz",
				loc: "Monterrey",
			},
		],
	},
	founder: {
		kicker: "Our story",
		quote: '"The best ocean stories are never written. They are lived."',
		intro: [
			"We started because we believe the ocean can change the way a person sees the world.",
			"From a very young age I found in the sea a place where there was always something new to discover. That curiosity led me to study Marine Biology and, over time, I understood that knowing a species was not enough: what truly mattered was getting more people to fall in love with it.",
			"Because nobody protects what they do not know.",
		],
		more: [
			"But I also discovered another reality. More and more people were visiting incredible places… without really understanding them.",
			"Animals chased for a photograph. Experiences designed to tick off a bucket list. Wild places turned into just another attraction.",
			"And I thought there had to be another way.",
			"That is how Keabelmet was born. Not as a tour agency, but as a different way of exploring nature.",
			"The name comes from the ancient Guaycura language of the indigenous people of Baja California Sur: Kea, meaning being, and Cabelmet, meaning water and land. An idea that sums up what we believe: we are not separate from nature; we are part of it.",
			"That is why every expedition begins with a very simple philosophy. We do not chase animals. We do not force encounters. We do not promise shows. The ocean sets the pace and we learn to observe.",
			"Some days a whale decides to approach the boat. Others, a huge aggregation of mobulas turns the sea into a whirlwind. And some days, the greatest gift is a reef full of life and color. All of those experiences hold the same value, because none of them can be manufactured.",
			"My job is not to take you to see animals. It is to help you understand the place they hold in this world, and to send you home seeing the ocean with new eyes. To make you fall even more in love with nature.",
			"Because when that happens, the expedition has truly fulfilled its purpose.",
			"Welcome to Keabelmet. Being water and land.",
		],
		readMore: "Keep reading →",
		readLess: "← Show less",
		signName: "Mauricio López",
		signRole: "Co-founder of Keabelmet Expeditions",
		alt: "Mauricio López, co-founder of Keabelmet",
	},
	insta: { kicker: "Follow us", btn: "View on Instagram" },
	finalCta: {
		title: "Your next wild encounter starts here",
		text: "Message us on WhatsApp and we will put your expedition together — small groups, marine biologist guide, photo and video included.",
		btn1: "Book on WhatsApp",
		btn2: "View expeditions",
		waText: "Hi! I want to book an expedition with Keabelmet",
		alt: "Whale in the Sea of Cortez",
	},
}

/** ES y EN completos; FR y ZH usan EN mientras se traducen. */
export const homeContent: Record<Locale, HomeContent> = { es, en, fr: en, zh: en }
