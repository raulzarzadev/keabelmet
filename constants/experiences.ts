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

export type ExperienceCategory = "safari" | "whale" | "diving" | "island";

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
		slug: "tour-ballena-gris",
		href: "/experiencias/tour-ballena-gris",
		category: "whale",
		image: "/gray-whale-mother-and-calf-swimming-together-in-ba.jpg",
		rating: 5.0,
		reviews: 98,
		fromMxn: 2800,
		days: 1,
		difficulty: "easy",
		capacity: { min: 2, max: 8 },
		i18n: {
			es: {
				title: "Ballena Gris · Puerto Chale",
				description:
					"Encuentro cercano con ballenas grises, madres y crías. Ene–Mar.",
				durationLabel: "Día completo",
				capacityLabel: "Hasta 8 personas",
				highlights: [
					"Madres y crías",
					"Ene–Mar",
					"Comunidad local",
					"Lunch",
				],
				badge: "Puerto Chale",
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
				description: "Nada con el pez más grande del mundo. Nov–Mar.",
				durationLabel: "Medio día",
				capacityLabel: "2-8 personas",
				highlights: [
					"Tiburón ballena",
					"Snorkel",
					"Nov–Mar",
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
		fromMxn: 3200,
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
					"Discovery $3,800",
					"2 inmersiones",
					"Todo el año",
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
		fromMxn: 3700,
		days: 1,
		difficulty: "moderate",
		capacity: { min: 2, max: 6 },
		featuredOrder: undefined,
		i18n: {
			es: {
				title: "Scuba Diving Isla Espíritu Santo",
				description:
					"Buceo con lobos marinos y barcos hundidos en el archipiélago. 7-8 horas.",
				durationLabel: "Día completo (7-8 h)",
				capacityLabel: "2-6 personas",
				highlights: [
					"Lobos marinos",
					"Barcos hundidos",
					"Discovery $4,200",
					"2 inmersiones",
				],
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
		slug: "scuba-discovery",
		href: "/experiencias/scuba-discovery",
		category: "diving",
		image: "/snorkeling-coral-reef.jpg",
		rating: 5.0,
		reviews: 12,
		fromMxn: 1500,
		days: 1,
		difficulty: "easy",
		capacity: { min: 1, max: 6 },
		i18n: {
			es: {
				title: "Scuba Discovery desde Playa",
				description:
					"Tu primera respiración bajo el agua, sin experiencia previa. Máx. 6 m de profundidad.",
				durationLabel: "Medio día",
				capacityLabel: "1-6 personas",
				highlights: [
					"Sin experiencia previa",
					"Máx. 6m profundidad",
					"Para principiantes",
					"Equipo incluido",
				],
				badge: "Nuevo",
			},
			en: {
				title: "Scuba Discovery from the Beach",
				description:
					"Your first breath underwater, no prior experience needed. Max depth 6 m.",
				durationLabel: "Half day",
				capacityLabel: "1-6 people",
				highlights: [
					"No experience needed",
					"Max 6m depth",
					"Beginner friendly",
					"Gear included",
				],
				badge: "New",
			},
			fr: {
				title: "Scuba Discovery depuis la plage",
				description:
					"Votre première respiration sous l'eau, sans expérience préalable. Profondeur max 6 m.",
				durationLabel: "Demi-journée",
				capacityLabel: "1-6 personnes",
				highlights: [
					"Sans expérience",
					"Profondeur max 6m",
					"Pour débutants",
					"Équipement inclus",
				],
				badge: "Nouveau",
			},
			zh: {
				title: "海滩体验潜水",
				description: "无需经验，在水下呼吸的初体验。最大深度6米。",
				durationLabel: "半天",
				capacityLabel: "1-6人",
				highlights: ["无需经验", "最大深度6米", "适合初学者", "含装备"],
				badge: "新",
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
