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

const fr: HomeContent = {
	viewExpedition: "Voir l'expédition",
	hero: {
		kicker: "Être eau et terre",
		titleLine1: "Là où le désert",
		titleLine2: "rencontre la ",
		titleEm: "mer sauvage",
		sub: "Des expéditions marines guidées par des biologistes en Basse-Californie du Sud. Nagez avec les otaries, rencontrez les baleines face à face et explorez la mer de Cortez comme peu l'ont fait.",
		cta1: "Explorer les expéditions",
		cta2: "Notre histoire",
		scroll: "Faites défiler pour explorer ↓",
		alt: "Cachalot nageant dans la mer de Cortez",
	},
	stats: [
		{ value: "15+", label: "Expéditions uniques" },
		{ value: "10K+", label: "Aventuriers satisfaits" },
		{ value: "9.8", label: "Note moyenne" },
	],
	mission: {
		main: "La mer de Cortez est l'une des mers les plus riches en biodiversité de la planète. ",
		em: "Jacques Cousteau l'appelait « l'aquarium du monde ».",
		dim: "Chaque expédition que vous vivez avec nous est une véritable rencontre avec cette vie sauvage — et une façon de contribuer à la protéger.",
	},
	regions: [
		{
			kicker: "La Ventana · Île Cerralvo",
			title: "Des mobules qui volent, des baleines qui émergent",
			text: "Un safari sans scénario. Guidés par des biologistes marins, nous naviguons à la recherche de l'inattendu, à 40 minutes de La Paz.",
			image: "/images/orca-safari.jpg",
			alt: "Seafari à La Ventana",
			href: "/experiencias/safari-la-ventana",
			right: false,
		},
		{
			kicker: "Bahía Magdalena · Nov-Déc",
			title: "Le safari le plus sauvage du Pacifique",
			text: "Des milliers de sardines, des marlins qui chassent à pleine vitesse, des baleines qui se nourrissent. Un phénomène qui ne dure que deux mois par an.",
			image: "/images/marlin-bahia-magdalena-hero.jpeg",
			alt: "Sardine Run à Bahía Magdalena",
			href: "/experiencias/safari-bahia-magdalena",
			right: true,
		},
		{
			kicker: "Cabo Pulmo · Parc National",
			title: "Le seul récif vivant du Golfe",
			text: "25 000 ans de corail, des requins bouledogues, d'immenses bancs de poissons. L'une des réserves marines les plus réussies au monde.",
			image: "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg",
			alt: "Plongée à Cabo Pulmo",
			href: "/experiencias/buceo-cabo-pulmo",
			right: false,
		},
		{
			kicker: "Île Espíritu Santo · Patrimoine mondial UNESCO",
			title: "Nagez avec des otaries curieuses",
			text: "Des plages vierges, des eaux cristallines et l'une des plus grandes colonies d'otaries du golfe de Californie.",
			image: "/espiritu-santo-island-paradise-beach.jpg",
			alt: "Île Espíritu Santo",
			href: "/experiencias/tour-espiritu-santo",
			right: true,
		},
	],
	toursHead: {
		kicker: "Nos expéditions",
		title: "Conçues pour de vraies rencontres avec la vie marine",
		sub: "Petits groupes, guide biologiste marin, photo et vidéo inclus. Sans scénario, sans foule.",
	},
	tourCards: [
		{ tag: "Demi-journée", coral: false, image: "/images/orca-safari.jpg", alt: "Ocean Safari La Ventana", title: "Ocean Safari La Ventana", meta: ["2-8 personnes", "6 heures", "Mobules Avr-Juin"], priceMxn: 3000, per: "par personne", href: "/experiencias/safari-la-ventana" },
		{ tag: "Journée complète", coral: false, image: "/images/marlin-bahia-magdalena-hero.jpeg", alt: "Safari Bahía Magdalena", title: "Safari Bahía Magdalena", meta: ["2-6 personnes", "Sardine run", "Nov-Déc"], priceMxn: 3500, per: "par personne", href: "/experiencias/safari-bahia-magdalena" },
		{ tag: "Journée complète", coral: false, image: "/images/hero/ballena-gris-hero.jpeg", alt: "Baleine Grise Puerto Chale", title: "Baleine Grise · Puerto Chale", meta: ["Jusqu'à 8 personnes", "Mères et baleineaux", "Jan-Mar"], priceMxn: 2800, per: "par personne", href: "/experiencias/tour-ballena-gris" },
		{ tag: "Demi-journée", coral: false, image: "/snorkeling-coral-reef.jpg", alt: "Requin-Baleine", title: "Requin-Baleine", meta: ["2-8 personnes", "Snorkeling", "Nov-Mar"], priceMxn: 1800, per: "par personne", href: "/experiencias/tiburon-ballena" },
		{ tag: "Journée complète", coral: false, image: "/espiritu-santo-island-paradise-beach.jpg", alt: "Île Espíritu Santo", title: "Tour Snorkel Île Espíritu Santo", meta: ["2-10 personnes", "Otaries", "Toute l'année"], priceMxn: 1800, per: "par personne", href: "/experiencias/tour-espiritu-santo" },
		{ tag: "Journée complète", coral: false, image: "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg", alt: "Plongée Cabo Pulmo", title: "Plongée Cabo Pulmo", meta: ["Parc National", "Baptême 3 800 $", "Toute l'année"], priceMxn: 3200, per: "certifié", href: "/experiencias/buceo-cabo-pulmo" },
		{ tag: "Journée complète", coral: false, image: "/scuba-diving-underwater-sea-lions-swimming-playful.jpg", alt: "Plongée Île Espíritu Santo", title: "Plongée Île Espíritu Santo", meta: ["Otaries", "Épaves", "Baptême 4 200 $"], priceMxn: 3700, per: "certifié", href: "/experiencias/buceo-la-paz" },
		{ tag: "Nouveau", coral: true, image: "/snorkeling-coral-reef.jpg", alt: "Baptême de plongée depuis la plage", title: "Baptême de Plongée depuis la Plage", meta: ["Sans expérience", "Max 6 m de profondeur", "Pour débutants"], priceMxn: 1500, per: "par personne", href: "/experiencias/scuba-discovery" },
	],
	compare: {
		kicker: "Face à face",
		title: "Ce qui gâche souvent un safari — et comment nous faisons autrement",
		badCol: "LE TYPIQUE",
		goodCol: "KEABELMET",
		bad: [
			{ title: "Une panga avec 20 personnes", text: "Une expérience chaotique, impersonnelle, sans véritable connexion." },
			{ title: "Des guides sans formation scientifique", text: "Aucune explication du comportement ni respect des animaux." },
			{ title: "Des photos promises, jamais livrées", text: "Ou livrées bien en deçà des attentes." },
		],
		good: [
			{ title: "De vrais petits groupes", text: "8-10 personnes maximum par expédition, attention personnalisée." },
			{ title: "Guide biologiste marin", text: "Récits, comportement animal et véritables pratiques de conservation." },
			{ title: "Photo et vidéo inclus", text: "Des clichés professionnels livrés à chaque fois, sans petits caractères." },
		],
	},
	why: {
		kicker: "Pourquoi Keabelmet",
		title: "Des aventures authentiques, durables et inoubliables",
		items: [
			{ title: "Expertise locale", text: "Basés à La Paz, nous connaissons chaque recoin et le meilleur moment pour visiter chaque lieu." },
			{ title: "La sécurité avant tout", text: "Guides certifiés, équipement de qualité et protocoles réels pour votre tranquillité." },
			{ title: "Petits groupes", text: "Attention personnalisée et connexions authentiques avec vos compagnons de voyage." },
			{ title: "Dirigé par des biologistes marins", text: "Des spécialistes ayant une réelle expérience des expéditions et des campements isolés." },
			{ title: "Éducation et conservation", text: "Chaque expédition est une occasion d'apprendre et de protéger l'écosystème." },
			{ title: "Photo et vidéo inclus", text: "Des clichés professionnels de votre expérience, prêts à revivre le moment." },
		],
	},
	testi: {
		kicker: "Ce que disent nos aventuriers",
		title: "Des expériences réelles, racontées par ceux qui les ont vécues",
		items: [
			{ text: "« J'ai toujours rêvé de voir des baleines. Mais ça a été bien plus que ça. J'ai pleuré d'émotion. Merci de respecter la nature ainsi. »", name: "Lucía", loc: "Mexico" },
			{ text: "« Nager avec les otaries a été l'expérience la plus magique de ma vie. Elles sont si joueuses et curieuses. L'équipe de Keabelmet est très professionnelle et respectueuse des animaux. »", name: "María González", loc: "Mexico" },
			{ text: "« Expérience incroyable. Voir les marlins chasser les sardines, c'était comme être dans un documentaire de National Geographic. L'adrénaline et l'émotion sont indescriptibles. »", name: "Alejandro Ruiz", loc: "Monterrey" },
		],
	},
	founder: {
		kicker: "Notre histoire",
		quote: "« Les plus belles histoires de l'océan ne s'écrivent jamais. Elles se vivent. »",
		intro: [
			"Nous avons commencé parce que nous croyons que l'océan peut changer la façon dont une personne voit le monde.",
			"Dès mon plus jeune âge, j'ai trouvé dans la mer un endroit où il y avait toujours quelque chose de nouveau à découvrir. Cette curiosité m'a conduit à étudier la biologie marine et, avec le temps, j'ai compris que connaître une espèce ne suffisait pas : ce qui comptait vraiment, c'était d'amener plus de gens à en tomber amoureux.",
			"Car personne ne protège ce qu'il ne connaît pas.",
		],
		more: [
			"Mais j'ai aussi découvert une autre réalité. De plus en plus de gens visitaient des lieux incroyables… sans vraiment les comprendre.",
			"Des animaux poursuivis pour une photographie. Des expériences conçues pour cocher une liste de destinations. Des lieux sauvages transformés en simple attraction.",
			"Et je me suis dit qu'il devait exister une autre manière.",
			"C'est ainsi qu'est né Keabelmet. Non pas comme une agence de tourisme, mais comme une façon différente d'explorer la nature.",
			"Le nom vient de l'ancienne langue guaycura, celle des peuples indigènes de Basse-Californie du Sud : Kea, qui signifie être, et Cabelmet, qui signifie eau et terre. Une idée qui résume ce que nous croyons : nous ne sommes pas séparés de la nature ; nous en faisons partie.",
			"C'est pourquoi chaque expédition commence par une philosophie très simple. Nous ne poursuivons pas les animaux. Nous ne forçons pas les rencontres. Nous ne promettons pas de spectacle. L'océan donne le rythme et nous apprenons à observer.",
			"Certains jours, une baleine décide de s'approcher du bateau. D'autres, une immense agrégation de mobules transforme la mer en tourbillon. Et parfois, le plus beau cadeau est un récif plein de vie et de couleurs. Toutes ces expériences ont la même valeur, car aucune ne peut être fabriquée.",
			"Mon travail n'est pas de vous emmener voir des animaux. C'est de vous aider à comprendre la place qu'ils occupent dans ce monde et de vous faire rentrer chez vous en voyant l'océan d'un autre œil. Que vous tombiez encore plus amoureux de la nature.",
			"Car lorsque cela arrive, l'expédition a vraiment rempli son but.",
			"Bienvenue chez Keabelmet. Être eau et terre.",
		],
		readMore: "Continuer la lecture →",
		readLess: "← Afficher moins",
		signName: "Mauricio López",
		signRole: "Cofondateur de Keabelmet Expeditions",
		alt: "Mauricio López, cofondateur de Keabelmet",
	},
	insta: { kicker: "Suivez-nous", btn: "Voir sur Instagram" },
	finalCta: {
		title: "Votre prochaine rencontre sauvage commence ici",
		text: "Écrivez-nous sur WhatsApp et nous organiserons votre expédition — petits groupes, guide biologiste marin, photo et vidéo inclus.",
		btn1: "Réserver sur WhatsApp",
		btn2: "Voir les expéditions",
		waText: "Bonjour ! Je veux réserver une expédition avec Keabelmet",
		alt: "Baleine dans la mer de Cortez",
	},
}

const zh: HomeContent = {
	viewExpedition: "查看行程",
	hero: {
		kicker: "成为水与陆地",
		titleLine1: "当沙漠",
		titleLine2: "邂逅",
		titleEm: "狂野之海",
		sub: "由生物学家带领的下加利福尼亚州海洋探险。与海狮同游，与鲸鱼面对面相遇，以少有人见过的方式探索科尔特斯海。",
		cta1: "探索所有行程",
		cta2: "我们的故事",
		scroll: "向下滑动探索 ↓",
		alt: "在科尔特斯海游动的抹香鲸",
	},
	stats: [
		{ value: "15+", label: "独特行程" },
		{ value: "10K+", label: "满意的探险者" },
		{ value: "9.8", label: "平均评分" },
	],
	mission: {
		main: "科尔特斯海是地球上生物多样性最丰富的海域之一。",
		em: "雅克·库斯托称它为「世界的水族馆」。",
		dim: "你与我们经历的每一次探险，都是与那片野生世界的真实相遇——也是保护它的一种方式。",
	},
	regions: [
		{
			kicker: "拉文塔纳 · 塞拉尔沃岛",
			title: "飞翔的蝠鲼，跃出的鲸鱼",
			text: "没有剧本的探险。在海洋生物学家的带领下，我们在离拉巴斯40分钟的海域，寻找意料之外的相遇。",
			image: "/images/orca-safari.jpg",
			alt: "拉文塔纳海洋探险",
			href: "/experiencias/safari-la-ventana",
			right: false,
		},
		{
			kicker: "马格达莱纳湾 · 11-12月",
			title: "太平洋最狂野的探险",
			text: "成千上万的沙丁鱼、全速捕猎的马林鱼、觅食的鲸鱼。一年仅两个月的自然奇观。",
			image: "/images/marlin-bahia-magdalena-hero.jpeg",
			alt: "马格达莱纳湾沙丁鱼洄游",
			href: "/experiencias/safari-bahia-magdalena",
			right: true,
		},
		{
			kicker: "卡波普尔莫 · 国家公园",
			title: "海湾唯一的活珊瑚礁",
			text: "25,000年的珊瑚、公牛鲨、庞大的鱼群。世界上最成功的海洋保护区之一。",
			image: "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg",
			alt: "卡波普尔莫潜水",
			href: "/experiencias/buceo-cabo-pulmo",
			right: false,
		},
		{
			kicker: "圣灵岛 · 联合国教科文组织世界遗产",
			title: "与好奇的海狮同游",
			text: "原始的海滩、清澈的海水，以及加利福尼亚湾最大的海狮群之一。",
			image: "/espiritu-santo-island-paradise-beach.jpg",
			alt: "圣灵岛",
			href: "/experiencias/tour-espiritu-santo",
			right: true,
		},
	],
	toursHead: {
		kicker: "我们的探险",
		title: "为与海洋生物的真实相遇而设计",
		sub: "小团体、海洋生物学家向导、含照片和视频。没有剧本，没有人潮。",
	},
	tourCards: [
		{ tag: "半天", coral: false, image: "/images/orca-safari.jpg", alt: "拉文塔纳海洋探险", title: "拉文塔纳海洋探险", meta: ["2-8人", "6小时", "蝠鲼 4-6月"], priceMxn: 3000, per: "每人", href: "/experiencias/safari-la-ventana" },
		{ tag: "全天", coral: false, image: "/images/marlin-bahia-magdalena-hero.jpeg", alt: "马格达莱纳湾探险", title: "马格达莱纳湾探险", meta: ["2-6人", "沙丁鱼洄游", "11-12月"], priceMxn: 3500, per: "每人", href: "/experiencias/safari-bahia-magdalena" },
		{ tag: "全天", coral: false, image: "/images/hero/ballena-gris-hero.jpeg", alt: "灰鲸查莱港", title: "灰鲸 · 查莱港", meta: ["最多8人", "母鲸与幼鲸", "1-3月"], priceMxn: 2800, per: "每人", href: "/experiencias/tour-ballena-gris" },
		{ tag: "半天", coral: false, image: "/snorkeling-coral-reef.jpg", alt: "鲸鲨", title: "鲸鲨", meta: ["2-8人", "浮潜", "11-3月"], priceMxn: 1800, per: "每人", href: "/experiencias/tiburon-ballena" },
		{ tag: "全天", coral: false, image: "/espiritu-santo-island-paradise-beach.jpg", alt: "圣灵岛", title: "圣灵岛浮潜之旅", meta: ["2-10人", "海狮", "全年"], priceMxn: 1800, per: "每人", href: "/experiencias/tour-espiritu-santo" },
		{ tag: "全天", coral: false, image: "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg", alt: "卡波普尔莫潜水", title: "卡波普尔莫潜水", meta: ["国家公园", "体验潜水 $3,800", "全年"], priceMxn: 3200, per: "持证", href: "/experiencias/buceo-cabo-pulmo" },
		{ tag: "全天", coral: false, image: "/scuba-diving-underwater-sea-lions-swimming-playful.jpg", alt: "圣灵岛潜水", title: "圣灵岛潜水", meta: ["海狮", "沉船", "体验潜水 $4,200"], priceMxn: 3700, per: "持证", href: "/experiencias/buceo-la-paz" },
		{ tag: "全新", coral: true, image: "/snorkeling-coral-reef.jpg", alt: "海滩体验潜水", title: "海滩体验潜水", meta: ["无需经验", "最深6米", "适合初学者"], priceMxn: 1500, per: "每人", href: "/experiencias/scuba-discovery" },
	],
	compare: {
		kicker: "正面对比",
		title: "什么会毁掉一次探险——以及我们如何做得不同",
		badCol: "常见做法",
		goodCol: "KEABELMET",
		bad: [
			{ title: "一艘挤满20人的小艇", text: "混乱、缺乏个人关注、毫无真正的连接。" },
			{ title: "没有科学背景的向导", text: "既不讲解动物行为，也不尊重动物。" },
			{ title: "承诺的照片从未兑现", text: "或远低于预期。" },
		],
		good: [
			{ title: "真正的小团体", text: "每次探险最多8-10人，个性化关注。" },
			{ title: "海洋生物学家向导", text: "故事、动物行为和真正的保育实践。" },
			{ title: "含照片和视频", text: "每次都交付专业影像，绝无附加条件。" },
		],
	},
	why: {
		kicker: "为什么选择 Keabelmet",
		title: "真实、可持续、难忘的冒险",
		items: [
			{ title: "本地专长", text: "以拉巴斯为基地，我们熟悉每个角落和造访每处的最佳时机。" },
			{ title: "安全第一", text: "持证向导、优质装备和真正的安全流程，让你安心。" },
			{ title: "小团体", text: "个性化关注，与同行者建立真实的连接。" },
			{ title: "由海洋生物学家带领", text: "在探险和偏远营地拥有真实经验的专家。" },
			{ title: "教育与保育", text: "每次探险都是学习和保护生态系统的机会。" },
			{ title: "含照片和视频", text: "专业记录你的体验，随时重温这一刻。" },
		],
	},
	testi: {
		kicker: "探险者怎么说",
		title: "真实的体验，由亲历者讲述",
		items: [
			{ text: "「我一直梦想看到鲸鱼。但这远不止于此。我感动落泪。谢谢你们如此尊重大自然。」", name: "Lucía", loc: "墨西哥城" },
			{ text: "「与海狮同游是我人生中最神奇的体验。它们如此顽皮又好奇。Keabelmet 团队非常专业，也很尊重动物。」", name: "María González", loc: "墨西哥城" },
			{ text: "「难以置信的体验。看着马林鱼捕猎沙丁鱼，就像置身于国家地理的纪录片。那种肾上腺素和激动无法言喻。」", name: "Alejandro Ruiz", loc: "蒙特雷" },
		],
	},
	founder: {
		kicker: "我们的故事",
		quote: "「海洋最美的故事从不被书写，而是被经历。」",
		intro: [
			"我们之所以开始，是因为我们相信海洋能够改变一个人看待世界的方式。",
			"从很小的时候起，我就在海里找到一个永远有新事物可发现的地方。这份好奇心让我去学习海洋生物学；随着时间推移，我明白了：认识一个物种还不够，真正重要的是让更多人爱上它。",
			"因为没有人会去保护自己不了解的事物。",
		],
		more: [
			"但我也发现了另一个现实。越来越多的人造访令人惊叹的地方……却并不真正理解它们。",
			"为了一张照片而追逐动物。为了打卡一份目的地清单而设计的体验。野性之地沦为又一个景点。",
			"我想，一定存在另一种方式。",
			"Keabelmet 就这样诞生了。它不是一家旅行社，而是一种探索自然的不同方式。",
			"这个名字源自下加利福尼亚州原住民的古老瓜伊库拉语：Kea 意为「成为」，Cabelmet 意为「水与陆地」。这个理念概括了我们的信念：我们并非与自然分离；我们是自然的一部分。",
			"因此，每一次探险都始于一个非常简单的理念。我们不追逐动物。我们不强求相遇。我们不承诺表演。海洋掌握节奏，而我们学会观察。",
			"有些日子，一头鲸鱼决定靠近船只。另一些日子，庞大的蝠鲼群把大海搅成漩涡。还有些日子，最大的礼物是一片充满生命与色彩的珊瑚礁。所有这些体验都同样珍贵，因为没有一个是能被制造出来的。",
			"我的工作不是带你去看动物，而是帮助你理解它们在这个世界中的位置，让你回家时用全新的眼光看待海洋。让你更加爱上自然。",
			"因为当这一切发生时，这次探险才真正实现了它的意义。",
			"欢迎来到 Keabelmet。成为水与陆地。",
		],
		readMore: "继续阅读 →",
		readLess: "← 收起",
		signName: "Mauricio López",
		signRole: "Keabelmet Expeditions 联合创始人",
		alt: "Keabelmet 联合创始人 Mauricio López",
	},
	insta: { kicker: "关注我们", btn: "在 Instagram 查看" },
	finalCta: {
		title: "你的下一次野性相遇从这里开始",
		text: "通过 WhatsApp 联系我们，我们将为你安排探险——小团体、海洋生物学家向导、含照片和视频。",
		btn1: "通过 WhatsApp 预订",
		btn2: "查看所有行程",
		waText: "你好！我想预订 Keabelmet 的探险行程",
		alt: "科尔特斯海中的鲸鱼",
	},
}

/** ES, EN, FR y ZH nativos. */
export const homeContent: Record<Locale, HomeContent> = { es, en, fr, zh }
