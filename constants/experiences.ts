import { defaultLocale, type Locale } from "@/lib/i18n";

/**
 * SOURCE OF TRUTH — Spanish (`i18n.es`) is canonical.
 *
 * Translations (`i18n.en` / `i18n.fr` / `i18n.zh`) are FROZEN and not used at
 * runtime while `TRANSLATIONS_ENABLED = false`. Do not modify the non-`es`
 * blocks until the Spanish content has been fully verified. When ready,
 * re-translate from `es` and flip the flag.
 */
export const TRANSLATIONS_ENABLED = false;

export type ExperienceCategory =
	| "safari"
	| "whale"
	| "diving"
	| "surf"
	| "island"
	| "rental";

export type ExperienceDifficulty = "easy" | "moderate" | "advanced";

export interface ExperienceI18n {
	title: string;
	description: string;
	durationLabel: string;
	capacityLabel: string;
	highlights: string[];
	badge: string;
}

export interface Experience {
	slug: string;
	href: string;
	category: ExperienceCategory;
	image: string;
	rating: number;
	reviews: number;
	fromMxn: number | null;
	days: number;
	difficulty: ExperienceDifficulty;
	capacity: { min: number; max: number };
	/** Order in "Aventuras Destacadas" home section. Undefined = not shown there. */
	featuredOrder?: number;
	i18n: Record<Locale, ExperienceI18n>;
}

export const experiences: Experience[] = [
	{
		slug: "safari-bahia-magdalena",
		href: "/experiencias/safari-bahia-magdalena",
		category: "safari",
		image: "/images/marlin-bahia-magdalena-hero.jpeg",
		rating: 5.0,
		reviews: 187,
		fromMxn: 3500,
		days: 1,
		difficulty: "moderate",
		capacity: { min: 2, max: 6 },
		featuredOrder: 2,
		i18n: {
			es: {
				title: "El safari más salvaje del Pacífico",
				description:
					"Miles de sardinas, marlines cazando a máxima velocidad, ballenas alimentándose. Un fenómeno de solo dos meses al año.",
				durationLabel: "Día completo",
				capacityLabel: "2-6 personas",
				highlights: [
					"Corrida de sardinas",
					"Marlines",
					"Lobos marinos",
					"Lunch incluido",
				],
				badge: "Bahía Magdalena · Nov-Dic",
			},
			en: {
				title: "Safari Bahía Magdalena",
				description: "Sardine run, marlins and sea lions. Nov–Dec.",
				durationLabel: "Full day",
				capacityLabel: "2-6 people",
				highlights: ["Sardine run", "Marlins", "Sea lions", "Lunch included"],
				badge: "Bahía Magdalena",
			},
			fr: {
				title: "Safari Bahía Magdalena",
				description: "Course aux sardines, marlins et lions de mer. Nov–Déc.",
				durationLabel: "Journée complète",
				capacityLabel: "2-6 personnes",
				highlights: [
					"Course aux sardines",
					"Marlins",
					"Lions de mer",
					"Déjeuner inclus",
				],
				badge: "Bahía Magdalena",
			},
			zh: {
				title: "Safari Bahía Magdalena",
				description: "沙丁鱼群、马林鱼、海狮。11–12月。",
				durationLabel: "全天",
				capacityLabel: "2-6人",
				highlights: ["沙丁鱼群", "马林鱼", "海狮", "含午餐"],
				badge: "Bahía Magdalena",
			},
		},
	},
	{
		slug: "safari-la-ventana",
		href: "/experiencias/safari-la-ventana",
		category: "safari",
		image: "/images/orca-safari.jpg",
		rating: 5.0,
		reviews: 243,
		fromMxn: 3000,
		days: 1,
		difficulty: "moderate",
		capacity: { min: 2, max: 8 },
		featuredOrder: 1,
		i18n: {
			es: {
				title: "Móbulas que vuelan, ballenas que emergen",
				description:
					"Un safari sin guion. Navegamos guiados por biólogos marinos en busca de lo inesperado, a 40 minutos de La Paz.",
				durationLabel: "Medio día",
				capacityLabel: "2-8 personas",
				highlights: [
					"Móbulas",
					"Abril–Junio",
					"Guía experto",
					"Fotos y videos",
				],
				badge: "La Ventana · Isla Cerralvo",
			},
			en: {
				title: "Safari La Ventana",
				description: "Mobula ray migration. April–June (seasonal).",
				durationLabel: "Half day",
				capacityLabel: "2-8 people",
				highlights: [
					"Mobula rays",
					"Apr–Jun",
					"Expert guide",
					"Photos & videos",
				],
				badge: "Sea of Cortez",
			},
			fr: {
				title: "Safari La Ventana",
				description: "Migration des mobulas. Avril–Juin (selon saison).",
				durationLabel: "Demi-journée",
				capacityLabel: "2-8 personnes",
				highlights: [
					"Mobulas",
					"Avril–Juin",
					"Guide expert",
					"Photos & vidéos",
				],
				badge: "Mer de Cortés",
			},
			zh: {
				title: "Safari La Ventana",
				description: "蝠鲼迁徙。4–6月（视季节而定）。",
				durationLabel: "半天",
				capacityLabel: "2-8人",
				highlights: ["蝠鲼", "4–6月", "专业导游", "照片和视频"],
				badge: "科尔特斯海",
			},
		},
	},
	{
		slug: "surf-camp",
		href: "/surf-camp",
		category: "surf",
		image: "/images/surf-camp-hero.jpeg",
		rating: 5.0,
		reviews: 156,
		fromMxn: 7500,
		days: 6,
		difficulty: "moderate",
		capacity: { min: 6, max: 8 },
		i18n: {
			es: {
				title: "Surf Camp La Paz",
				description:
					"Fisioterapeuta, video-análisis diario, hospedaje y comidas.",
				durationLabel: "6 días",
				capacityLabel: "6-8 personas",
				highlights: [
					"Clases diarias",
					"Foto/Video",
					"Transporte",
					"Snacks incluidos",
				],
				badge: "La Paz, BCS",
			},
			en: {
				title: "Surf Camp La Paz",
				description:
					"Physiotherapist, daily video analysis, lodging and meals.",
				durationLabel: "6 days",
				capacityLabel: "6-8 people",
				highlights: [
					"Daily classes",
					"Photo/Video",
					"Transport",
					"Snacks included",
				],
				badge: "La Paz, BCS",
			},
			fr: {
				title: "Surf Camp La Paz",
				description:
					"Kinésithérapeute, analyse vidéo quotidienne, hébergement et repas.",
				durationLabel: "6 jours",
				capacityLabel: "6-8 personnes",
				highlights: [
					"Cours quotidiens",
					"Photo/Vidéo",
					"Transport",
					"Snacks inclus",
				],
				badge: "La Paz, BCS",
			},
			zh: {
				title: "Surf Camp La Paz",
				description: "理疗师、每日视频分析、住宿和餐饮。",
				durationLabel: "6天",
				capacityLabel: "6-8人",
				highlights: ["每日课程", "照片/视频", "交通", "含小食"],
				badge: "La Paz, BCS",
			},
		},
	},
	{
		slug: "ballena-gris",
		href: "/experiencias/ballena-gris",
		category: "whale",
		image: "/images/hero/ballena-gris-hero.jpeg",
		rating: 5.0,
		reviews: 142,
		fromMxn: 2800,
		days: 1,
		difficulty: "easy",
		capacity: { min: 2, max: 8 },
		i18n: {
			es: {
				title: "Ballena Gris en Bahía Magdalena",
				description: "Encuentro cercano con ballenas grises y crías. Ene–Mar.",
				durationLabel: "Día completo",
				capacityLabel: "2-8 personas",
				highlights: [
					"Ballenas grises",
					"Madres y crías",
					"Ene–Mar",
					"Lunch incluido",
				],
				badge: "Bahía Magdalena",
			},
			en: {
				title: "Gray Whale in Bahía Magdalena",
				description: "Close encounter with gray whales and calves. Jan–Mar.",
				durationLabel: "Full day",
				capacityLabel: "2-8 people",
				highlights: [
					"Gray whales",
					"Mothers and calves",
					"Jan–Mar",
					"Lunch included",
				],
				badge: "Bahía Magdalena",
			},
			fr: {
				title: "Baleine grise à Bahía Magdalena",
				description:
					"Rencontre rapprochée avec baleines grises et baleineaux. Jan–Mar.",
				durationLabel: "Journée complète",
				capacityLabel: "2-8 personnes",
				highlights: [
					"Baleines grises",
					"Mères et baleineaux",
					"Jan–Mar",
					"Déjeuner inclus",
				],
				badge: "Bahía Magdalena",
			},
			zh: {
				title: "Bahía Magdalena 灰鲸",
				description: "近距离接触灰鲸及幼鲸。1–3月。",
				durationLabel: "全天",
				capacityLabel: "2-8人",
				highlights: ["灰鲸", "母鲸与幼鲸", "1–3月", "含午餐"],
				badge: "Bahía Magdalena",
			},
		},
	},
	{
		slug: "tour-ballena-gris",
		href: "/experiencias/tour-ballena-gris",
		category: "whale",
		image: "/gray-whale-mother-and-calf-swimming-together-in-ba.jpg",
		rating: 5.0,
		reviews: 98,
		fromMxn: 2400,
		days: 1,
		difficulty: "easy",
		capacity: { min: 2, max: 8 },
		i18n: {
			es: {
				title: "Tour Ballena Gris en Puerto Chale",
				description: "Encuentro ancestral con ballenas grises en Puerto Chale.",
				durationLabel: "Día completo",
				capacityLabel: "2-8 personas",
				highlights: [
					"Puerto Chale",
					"Avistamiento",
					"Comunidad local",
					"Lunch",
				],
				badge: "Baja California Sur",
			},
			en: {
				title: "Gray Whale Tour in Puerto Chale",
				description: "Ancestral encounter with gray whales in Puerto Chale.",
				durationLabel: "Full day",
				capacityLabel: "2-8 people",
				highlights: [
					"Puerto Chale",
					"Whale watching",
					"Local community",
					"Lunch",
				],
				badge: "Baja California Sur",
			},
			fr: {
				title: "Tour Baleine Grise à Puerto Chale",
				description:
					"Rencontre ancestrale avec baleines grises à Puerto Chale.",
				durationLabel: "Journée complète",
				capacityLabel: "2-8 personnes",
				highlights: [
					"Puerto Chale",
					"Observation",
					"Communauté locale",
					"Déjeuner",
				],
				badge: "Baja California Sur",
			},
			zh: {
				title: "Puerto Chale 灰鲸之旅",
				description: "在 Puerto Chale 与灰鲸的古老相遇。",
				durationLabel: "全天",
				capacityLabel: "2-8人",
				highlights: ["Puerto Chale", "观鲸", "当地社区", "午餐"],
				badge: "Baja California Sur",
			},
		},
	},
	{
		slug: "tiburon-ballena",
		href: "/experiencias/tiburon-ballena",
		category: "diving",
		image: "/snorkeling-crystal-clear-water.jpg",
		rating: 5.0,
		reviews: 211,
		fromMxn: 1800,
		days: 1,
		difficulty: "easy",
		capacity: { min: 2, max: 8 },
		i18n: {
			es: {
				title: "Tiburón Ballena",
				description: "Nada con el pez más grande del mundo. Oct–Abr.",
				durationLabel: "Medio día",
				capacityLabel: "2-8 personas",
				highlights: [
					"Tiburón ballena",
					"Snorkel",
					"Oct–Abr",
					"Equipo incluido",
				],
				badge: "La Paz",
			},
			en: {
				title: "Whale Shark",
				description: "Swim with the largest fish in the world. Oct–Apr.",
				durationLabel: "Half day",
				capacityLabel: "2-8 people",
				highlights: ["Whale shark", "Snorkel", "Oct–Apr", "Gear included"],
				badge: "La Paz",
			},
			fr: {
				title: "Requin-baleine",
				description: "Nagez avec le plus grand poisson du monde. Oct–Avr.",
				durationLabel: "Demi-journée",
				capacityLabel: "2-8 personnes",
				highlights: [
					"Requin-baleine",
					"Snorkeling",
					"Oct–Avr",
					"Équipement inclus",
				],
				badge: "La Paz",
			},
			zh: {
				title: "鲸鲨",
				description: "与世界上最大的鱼类共游。10–4月。",
				durationLabel: "半天",
				capacityLabel: "2-8人",
				highlights: ["鲸鲨", "浮潜", "10–4月", "含装备"],
				badge: "La Paz",
			},
		},
	},
	{
		slug: "tour-espiritu-santo",
		href: "/experiencias/tour-espiritu-santo",
		category: "island",
		image: "/espiritu-santo-island-pristine-beach-turquoise-wat.jpg",
		rating: 5.0,
		reviews: 312,
		fromMxn: 1800,
		days: 1,
		difficulty: "easy",
		capacity: { min: 2, max: 10 },
		featuredOrder: 4,
		i18n: {
			es: {
				title: "Nada con lobos marinos curiosos",
				description:
					"Playas vírgenes, aguas cristalinas y una de las colonias de lobos marinos más grandes del Golfo de California.",
				durationLabel: "Día completo",
				capacityLabel: "2-10 personas",
				highlights: ["Lobos marinos", "Playas vírgenes", "Snorkel", "Picnic"],
				badge: "Isla Espíritu Santo · Patrimonio UNESCO",
			},
			en: {
				title: "Espíritu Santo Island",
				description: "The world's aquarium: sea lions, beaches and kayaking.",
				durationLabel: "Full day",
				capacityLabel: "2-10 people",
				highlights: ["Sea lions", "Pristine beaches", "Snorkel", "Picnic"],
				badge: "UNESCO Biosphere Reserve",
			},
			fr: {
				title: "Île Espíritu Santo",
				description: "L'aquarium du monde : lions de mer, plages et kayak.",
				durationLabel: "Journée complète",
				capacityLabel: "2-10 personnes",
				highlights: [
					"Lions de mer",
					"Plages vierges",
					"Snorkeling",
					"Pique-nique",
				],
				badge: "Réserve de Biosphère UNESCO",
			},
			zh: {
				title: "Espíritu Santo 岛",
				description: "世界水族馆：海狮、海滩与皮划艇。",
				durationLabel: "全天",
				capacityLabel: "2-10人",
				highlights: ["海狮", "原始海滩", "浮潜", "野餐"],
				badge: "联合国教科文组织生物圈保护区",
			},
		},
	},
	{
		slug: "buceo-cabo-pulmo",
		href: "/experiencias/buceo-cabo-pulmo",
		category: "diving",
		image: "/buceo-cabo-pulmo-buzo.jpg",
		rating: 5.0,
		reviews: 178,
		fromMxn: 2800,
		days: 1,
		difficulty: "advanced",
		capacity: { min: 2, max: 6 },
		featuredOrder: 3,
		i18n: {
			es: {
				title: "El único arrecife vivo del Golfo",
				description:
					"25,000 años de coral, tiburones toro, cardúmenes masivos. Una de las reservas marinas más exitosas del mundo.",
				durationLabel: "Día completo",
				capacityLabel: "2-6 personas",
				highlights: [
					"Parque Nacional",
					"Arrecife coralino",
					"2 inmersiones",
					"Equipo opcional",
				],
				badge: "Cabo Pulmo · Parque Nacional",
			},
			en: {
				title: "Diving in Cabo Pulmo",
				description: "National Park, oldest coral reef in the Pacific.",
				durationLabel: "Full day",
				capacityLabel: "2-6 people",
				highlights: ["National Park", "Coral reef", "2 dives", "Optional gear"],
				badge: "Cabo Pulmo National Park",
			},
			fr: {
				title: "Plongée à Cabo Pulmo",
				description: "Parc National, plus ancien récif corallien du Pacifique.",
				durationLabel: "Journée complète",
				capacityLabel: "2-6 personnes",
				highlights: [
					"Parc National",
					"Récif corallien",
					"2 plongées",
					"Équipement en option",
				],
				badge: "Parc National Cabo Pulmo",
			},
			zh: {
				title: "Cabo Pulmo 潜水",
				description: "国家公园，太平洋最古老的珊瑚礁。",
				durationLabel: "全天",
				capacityLabel: "2-6人",
				highlights: ["国家公园", "珊瑚礁", "2次潜水", "可选装备"],
				badge: "Cabo Pulmo 国家公园",
			},
		},
	},
	{
		slug: "buceo-la-paz",
		href: "/experiencias/buceo-la-paz",
		category: "diving",
		image: "/buceo-la-paz-buzo.jpg",
		rating: 5.0,
		reviews: 134,
		fromMxn: 3500,
		days: 1,
		difficulty: "moderate",
		capacity: { min: 2, max: 6 },
		featuredOrder: undefined,
		i18n: {
			es: {
				title: "Buceo en La Paz",
				description:
					"Sitios icónicos: El Bajo, Suwanee, Salvatierra. 7-8 horas.",
				durationLabel: "Día completo (7-8 h)",
				capacityLabel: "2-6 personas",
				highlights: ["El Bajo", "Suwanee", "Salvatierra", "2 inmersiones"],
				badge: "Archipiélago Espíritu Santo",
			},
			en: {
				title: "Diving in La Paz",
				description: "Iconic sites: El Bajo, Suwanee, Salvatierra. 7-8 hours.",
				durationLabel: "Full day (7-8 h)",
				capacityLabel: "2-6 people",
				highlights: ["El Bajo", "Suwanee", "Salvatierra", "2 dives"],
				badge: "Espíritu Santo Archipelago",
			},
			fr: {
				title: "Plongée à La Paz",
				description:
					"Sites emblématiques : El Bajo, Suwanee, Salvatierra. 7-8 h.",
				durationLabel: "Journée complète (7-8 h)",
				capacityLabel: "2-6 personnes",
				highlights: ["El Bajo", "Suwanee", "Salvatierra", "2 plongées"],
				badge: "Archipel Espíritu Santo",
			},
			zh: {
				title: "La Paz 潜水",
				description: "标志性潜点：El Bajo、Suwanee、Salvatierra。7-8小时。",
				durationLabel: "全天（7-8小时）",
				capacityLabel: "2-6人",
				highlights: ["El Bajo", "Suwanee", "Salvatierra", "2次潜水"],
				badge: "Espíritu Santo 群岛",
			},
		},
	},
	{
		slug: "renta-velero",
		href: "/experiencias/renta-velero",
		category: "rental",
		image: "/sailboat-sailing-sunset-sea-of-cortez-romantic-lux.jpg",
		rating: 5.0,
		reviews: 64,
		fromMxn: 4000,
		days: 1,
		difficulty: "easy",
		capacity: { min: 1, max: 8 },
		featuredOrder: undefined,
		i18n: {
			es: {
				title: "Renta de Velero Privado",
				description: "Velero privado en el Mar de Cortés. Día o medio día.",
				durationLabel: "Flexible",
				capacityLabel: "Hasta 8 personas",
				highlights: ["Velero privado", "Mar de Cortés", "Capitán", "Snacks"],
				badge: "Golfo de California",
			},
			en: {
				title: "Private Sailboat Rental",
				description: "Private sailboat in the Sea of Cortez. Day or half day.",
				durationLabel: "Flexible",
				capacityLabel: "Up to 8 people",
				highlights: ["Private sailboat", "Sea of Cortez", "Captain", "Snacks"],
				badge: "Gulf of California",
			},
			fr: {
				title: "Location de voilier privé",
				description: "Voilier privé en Mer de Cortés. Journée ou demi-journée.",
				durationLabel: "Flexible",
				capacityLabel: "Jusqu'à 8 personnes",
				highlights: ["Voilier privé", "Mer de Cortés", "Capitaine", "Snacks"],
				badge: "Golfe de Californie",
			},
			zh: {
				title: "私人帆船租赁",
				description: "在科尔特斯海航行的私人帆船。全天或半天。",
				durationLabel: "灵活",
				capacityLabel: "最多8人",
				highlights: ["私人帆船", "科尔特斯海", "船长", "小食"],
				badge: "加利福尼亚湾",
			},
		},
	},
	{
		slug: "renta-yate",
		href: "/experiencias/renta-yate",
		category: "rental",
		image: "/luxury-yacht-ocean-balandra-beach-turquoise-lagoon.jpg",
		rating: 5.0,
		reviews: 47,
		fromMxn: null,
		days: 1,
		difficulty: "easy",
		capacity: { min: 1, max: 12 },
		featuredOrder: undefined,
		i18n: {
			es: {
				title: "Renta de Yate de Lujo",
				description:
					"Yate premium, itinerario personalizable. Hasta 12 personas.",
				durationLabel: "Flexible",
				capacityLabel: "Hasta 12 personas",
				highlights: ["Yate de lujo", "Chef privado", "Itinerario", "Premium"],
				badge: "Golfo de California",
			},
			en: {
				title: "Luxury Yacht Rental",
				description: "Premium yacht, customizable itinerary. Up to 12 people.",
				durationLabel: "Flexible",
				capacityLabel: "Up to 12 people",
				highlights: [
					"Luxury yacht",
					"Private chef",
					"Custom itinerary",
					"Premium",
				],
				badge: "Gulf of California",
			},
			fr: {
				title: "Location de yacht de luxe",
				description:
					"Yacht premium, itinéraire personnalisable. Jusqu'à 12 personnes.",
				durationLabel: "Flexible",
				capacityLabel: "Jusqu'à 12 personnes",
				highlights: ["Yacht de luxe", "Chef privé", "Itinéraire", "Premium"],
				badge: "Golfe de Californie",
			},
			zh: {
				title: "豪华游艇租赁",
				description: "高端游艇，可定制行程。最多12人。",
				durationLabel: "灵活",
				capacityLabel: "最多12人",
				highlights: ["豪华游艇", "私人厨师", "定制行程", "高端"],
				badge: "加利福尼亚湾",
			},
		},
	},
];

export function getExperience(slug: string): Experience | undefined {
	return experiences.find((e) => e.slug === slug);
}

export function localizeExperience(
	exp: Experience,
	locale: Locale,
): ExperienceI18n {
	if (!TRANSLATIONS_ENABLED) return exp.i18n.es;
	return exp.i18n[locale] ?? exp.i18n[defaultLocale];
}

/** Experiences for "Aventuras Destacadas" home section, sorted by featuredOrder ASC. */
export function getFeaturedAdventures(): Experience[] {
	return experiences
		.filter(
			(e): e is Experience & { featuredOrder: number } =>
				typeof e.featuredOrder === "number",
		)
		.sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function getExperiencesByCategory(
	category: ExperienceCategory,
): Experience[] {
	return experiences.filter((e) => e.category === category);
}
