import type { Locale } from "@/lib/i18n"
import type { TourId } from "@/lib/tour-finder"

/**
 * Mapa de expediciones: puntos de salida, zonas donde ocurre cada actividad,
 * ruta del traslado a Puerto Chale y tiempos de camino desde las zonas donde
 * suele hospedarse la gente.
 *
 * Fuentes:
 * - Puntos de salida confirmados por Keabelmet (2026-11-21). Coordenadas de
 *   OpenStreetMap: Muelle Fiscal y Playa Central (La Ventana) son el lugar
 *   exacto; Cabo Pulmo y Puerto Chale son el centro del pueblo (falta el punto
 *   exacto de Cabo Pulmo Watersports y del muelle de Puerto Chale).
 * - Tiempos de camino: OSRM (router.project-osrm.org, 2026-11-21), redondeados
 *   hacia arriba a 15 min porque suele quedarse corto. Son aproximados.
 * - Ruta La Paz → Puerto Chale: OSRM, geometría simplificada (≈ 179 km).
 * - Zonas de actividad: aproximadas a propósito; el lugar exacto cambia cada día.
 */

type L = Record<Locale, string>

export type PointId = "muelle-fiscal" | "la-ventana" | "cabo-pulmo" | "puerto-chale"
export type StayId = "la-paz" | "la-ventana" | "los-barriles" | "todos-santos" | "san-jose" | "cabo-san-lucas"
export type ZoneId = "bahia-la-paz" | "espiritu-santo" | "cerralvo" | "cabo-pulmo" | "bahia-magdalena"

export interface MapPoint {
	lng: number
	lat: number
	name: L
	/** Línea corta debajo del nombre (lugar / referencia). */
	place: L
	/** Abre el lugar en Google Maps. */
	mapsUrl: string
	/** true = el pin marca el lugar exacto; false = el centro del pueblo. */
	exact: boolean
}

export const POINTS: Record<PointId, MapPoint> = {
	"muelle-fiscal": {
		lng: -110.3194,
		lat: 24.1616,
		name: { es: "Muelle Fiscal de La Paz", en: "Muelle Fiscal, La Paz", fr: "Muelle Fiscal, La Paz", zh: "拉巴斯 Muelle Fiscal 码头", ca: "Muelle Fiscal de La Paz" },
		place: { es: "Malecón de La Paz", en: "La Paz waterfront (Malecón)", fr: "Front de mer de La Paz (Malecón)", zh: "拉巴斯海滨大道", ca: "Passeig marítim de La Paz" },
		mapsUrl: "https://www.google.com/maps/search/?api=1&query=Muelle%20Fiscal%20La%20Paz%20Baja%20California%20Sur",
		exact: true,
	},
	"la-ventana": {
		lng: -109.9892,
		lat: 24.0534,
		name: { es: "Keabelmet Expeditions · La Ventana", en: "Keabelmet Expeditions · La Ventana", fr: "Keabelmet Expeditions · La Ventana", zh: "Keabelmet Expeditions · 拉文塔纳", ca: "Keabelmet Expeditions · La Ventana" },
		place: { es: "Playa Central, La Ventana", en: "Playa Central, La Ventana", fr: "Playa Central, La Ventana", zh: "拉文塔纳中央海滩", ca: "Playa Central, La Ventana" },
		mapsUrl: "https://maps.google.com/?cid=7082429946220755653",
		exact: true,
	},
	"cabo-pulmo": {
		lng: -109.424,
		lat: 23.4454,
		name: { es: "Cabo Pulmo Watersports", en: "Cabo Pulmo Watersports", fr: "Cabo Pulmo Watersports", zh: "Cabo Pulmo Watersports", ca: "Cabo Pulmo Watersports" },
		place: { es: "Cabo Pulmo", en: "Cabo Pulmo", fr: "Cabo Pulmo", zh: "卡波普尔莫", ca: "Cabo Pulmo" },
		mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cabo%20Pulmo%20Watersports",
		exact: false,
	},
	"puerto-chale": {
		lng: -111.5532,
		lat: 24.4235,
		name: { es: "Muelle de Puerto Chale", en: "Puerto Chale pier", fr: "Jetée de Puerto Chale", zh: "查莱港码头", ca: "Moll de Puerto Chale" },
		place: { es: "Puerto Chale, costa del Pacífico", en: "Puerto Chale, Pacific coast", fr: "Puerto Chale, côte Pacifique", zh: "查莱港，太平洋沿岸", ca: "Puerto Chale, costa del Pacífic" },
		mapsUrl: "https://www.google.com/maps/search/?api=1&query=Puerto%20Chale%20Baja%20California%20Sur",
		exact: false,
	},
}

export interface MapZone {
	lng: number
	lat: number
	/** Radio del círculo en km (zona aproximada). */
	radiusKm: number
	name: L
}

export const ZONES: Record<ZoneId, MapZone> = {
	"bahia-la-paz": { lng: -110.36, lat: 24.2, radiusKm: 6, name: { es: "Bahía de La Paz", en: "Bay of La Paz", fr: "Baie de La Paz", zh: "拉巴斯湾", ca: "Badia de La Paz" } },
	"espiritu-santo": { lng: -110.33, lat: 24.47, radiusKm: 9, name: { es: "Isla Espíritu Santo", en: "Espíritu Santo Island", fr: "Île Espíritu Santo", zh: "圣灵岛", ca: "Illa Espíritu Santo" } },
	cerralvo: { lng: -109.9, lat: 24.13, radiusKm: 7, name: { es: "Canal de Cerralvo", en: "Cerralvo Channel", fr: "Canal de Cerralvo", zh: "塞拉尔沃海峡", ca: "Canal de Cerralvo" } },
	"cabo-pulmo": { lng: -109.41, lat: 23.43, radiusKm: 4, name: { es: "Parque Nacional Cabo Pulmo", en: "Cabo Pulmo National Park", fr: "Parc national de Cabo Pulmo", zh: "卡波普尔莫国家公园", ca: "Parc Nacional Cabo Pulmo" } },
	"bahia-magdalena": { lng: -111.66, lat: 24.42, radiusKm: 10, name: { es: "Bahía Magdalena", en: "Magdalena Bay", fr: "Baie Magdalena", zh: "马格达莱纳湾", ca: "Badia Magdalena" } },
}

/** Traslado incluido La Paz → Puerto Chale (carretera, OSRM simplificado). */
export const ROUTE_LA_PAZ_CHALE: [number, number][] = [[-110.3184,24.1612],[-110.343,24.1309],[-110.3447,24.1161],[-110.3634,24.107],[-110.4043,24.0964],[-110.4339,24.1191],[-110.4739,24.1216],[-110.5585,24.0664],[-110.5685,24.0533],[-110.5729,24.0586],[-110.5799,24.0517],[-110.6436,24.0961],[-110.7146,24.0889],[-110.7361,24.1022],[-110.7608,24.134],[-110.7757,24.1418],[-110.7935,24.1458],[-110.8169,24.1398],[-110.8271,24.1516],[-110.8429,24.1554],[-110.8668,24.1539],[-110.9044,24.1613],[-110.9198,24.1573],[-110.925,24.1712],[-110.9453,24.1817],[-110.9511,24.2142],[-110.947,24.2299],[-110.9571,24.2679],[-110.9993,24.3468],[-111.0135,24.3494],[-111.0215,24.3636],[-111.0933,24.38],[-111.1369,24.4175],[-111.1438,24.4365],[-111.1641,24.4503],[-111.3411,24.5019],[-111.3673,24.5394],[-111.4688,24.5905],[-111.4815,24.5846],[-111.4961,24.5562],[-111.4965,24.5395],[-111.5073,24.5374],[-111.5091,24.4897],[-111.5209,24.4549],[-111.5532,24.4235]]
export const ROUTE_LA_PAZ_CHALE_MIN = 150

export interface Stay {
	id: StayId
	name: L
	/** Minutos aproximados en auto hasta cada punto de salida (y hasta La Paz para los traslados). */
	minutes: Record<"muelle-fiscal" | "la-ventana" | "cabo-pulmo", number>
}

export const STAYS: Stay[] = [
	{ id: "la-paz", name: { es: "La Paz (centro y malecón)", en: "La Paz (downtown & waterfront)", fr: "La Paz (centre et front de mer)", zh: "拉巴斯（市中心与海滨）", ca: "La Paz (centre i passeig marítim)" }, minutes: { "muelle-fiscal": 15, "la-ventana": 60, "cabo-pulmo": 180 } },
	{ id: "la-ventana", name: { es: "La Ventana / El Sargento", en: "La Ventana / El Sargento", fr: "La Ventana / El Sargento", zh: "拉文塔纳 / 埃尔萨尔亨托", ca: "La Ventana / El Sargento" }, minutes: { "muelle-fiscal": 60, "la-ventana": 10, "cabo-pulmo": 165 } },
	{ id: "los-barriles", name: { es: "Los Barriles", en: "Los Barriles", fr: "Los Barriles", zh: "洛斯巴里莱斯", ca: "Los Barriles" }, minutes: { "muelle-fiscal": 105, "la-ventana": 90, "cabo-pulmo": 90 } },
	{ id: "todos-santos", name: { es: "Todos Santos", en: "Todos Santos", fr: "Todos Santos", zh: "托多斯桑托斯", ca: "Todos Santos" }, minutes: { "muelle-fiscal": 75, "la-ventana": 120, "cabo-pulmo": 195 } },
	{ id: "san-jose", name: { es: "San José del Cabo", en: "San José del Cabo", fr: "San José del Cabo", zh: "圣何塞德尔卡沃", ca: "San José del Cabo" }, minutes: { "muelle-fiscal": 165, "la-ventana": 180, "cabo-pulmo": 135 } },
	{ id: "cabo-san-lucas", name: { es: "Cabo San Lucas", en: "Cabo San Lucas", fr: "Cabo San Lucas", zh: "卡波圣卢卡斯", ca: "Cabo San Lucas" }, minutes: { "muelle-fiscal": 135, "la-ventana": 180, "cabo-pulmo": 165 } },
]

export type Transport =
	| { kind: "none" }
	/** Transporte opcional desde La Paz (se agrega al reservar). */
	| { kind: "optional"; mxn: number }
	/** Traslado incluido desde La Paz: recogida en hotel/Airbnb o en un punto que se manda al reservar. */
	| { kind: "included"; pickup: "hotel" | "point" }

export interface ExpeditionMapInfo {
	point: PointId
	zone: ZoneId
	transport: Transport
	/** Dibuja la ruta del traslado La Paz → Puerto Chale. */
	route?: boolean
}

/**
 * Solo las expediciones con punto de salida confirmado. Scuba Discovery y la
 * certificación Open Water quedan fuera hasta confirmar su punto de encuentro.
 */
export const EXPEDITION_MAP: Partial<Record<TourId, ExpeditionMapInfo>> = {
	"tiburon-ballena": { point: "muelle-fiscal", zone: "bahia-la-paz", transport: { kind: "none" } },
	"tour-espiritu-santo": { point: "muelle-fiscal", zone: "espiritu-santo", transport: { kind: "none" } },
	"buceo-la-paz": { point: "muelle-fiscal", zone: "espiritu-santo", transport: { kind: "none" } },
	"safari-la-ventana": { point: "la-ventana", zone: "cerralvo", transport: { kind: "optional", mxn: 1000 } },
	"buceo-cabo-pulmo": { point: "cabo-pulmo", zone: "cabo-pulmo", transport: { kind: "none" } },
	"tour-ballena-gris": { point: "puerto-chale", zone: "bahia-magdalena", transport: { kind: "included", pickup: "hotel" }, route: true },
	"safari-bahia-magdalena": { point: "puerto-chale", zone: "bahia-magdalena", transport: { kind: "included", pickup: "point" }, route: true },
}

/** "≈ 2 h 30 min" en cada idioma. */
export function formatMinutes(min: number, locale: Locale): string {
	const h = Math.floor(min / 60)
	const m = min % 60
	if (locale === "zh") return `约 ${h ? `${h} 小时` : ""}${m ? `${m} 分钟` : ""}`
	return `≈ ${h ? `${h} h` : ""}${h && m ? " " : ""}${m ? `${m} min` : ""}`
}

export function directionsUrl(p: MapPoint): string {
	return `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`
}

/** Textos del mapa en los 5 idiomas. */
export const MAP_TEXT = {
	es: {
		kicker: "Dónde empieza tu aventura",
		gestureMobile: "Usa dos dedos para mover el mapa",
		gestureWin: "Usa Ctrl + rueda del ratón para hacer zoom",
		gestureMac: "Usa ⌘ + rueda del ratón para hacer zoom",
		zoomIn: "Acercar",
		zoomOut: "Alejar",
		title: "Así llegas a tu expedición",
		meeting: "Punto de encuentro",
		zone: "Aquí ocurre la actividad",
		zoneNote: "Zona aproximada: el lugar exacto depende de las condiciones y de la fauna de ese día.",
		approx: "Ubicación aproximada del pueblo; te mandamos el punto exacto al reservar.",
		openMaps: "Ver en Google Maps",
		directions: "Cómo llegar",
		transportNone: "Transporte no incluido: llegas por tu cuenta al punto de encuentro.",
		transportOptional: "Transporte opcional desde La Paz",
		transportIncludedHotel: "Transporte incluido: te recogemos en tu hotel o Airbnb en La Paz.",
		transportIncludedPoint: "Transporte incluido desde La Paz: te mandamos el punto de salida al reservar.",
		routeLabel: "Traslado incluido La Paz → Puerto Chale",
		stayQ: "¿Dónde te hospedas?",
		stayPick: "Elige tu zona",
		stayTo: "hasta el punto de encuentro en auto",
		stayToLaPaz: "hasta La Paz, donde empieza el traslado",
		stayLaPaz: "Estás en La Paz: te recogemos ahí mismo.",
		stayFar: "Queda lejos de tu zona. Escríbenos y te ayudamos a armar la ruta o a combinarlo con otra expedición.",
		stayHelp: "Ayúdame con la ruta",
		stayWa: "Hola! me hospedo en {stay} y quiero ir a {tour}. ¿Me ayudan con la ruta?",
		timesNote: "Tiempos aproximados en auto, sin tráfico.",
		homeKicker: "El mapa de nuestras expediciones",
		homeTitle: "Elige dónde vivir el mar de Cortés y el Pacífico",
		homeText: "Del Pacífico de Bahía Magdalena al arrecife de Cabo Pulmo: toca una expedición para ver de dónde sale y cómo llegar.",
		allMonths: "Todo el año",
		monthQ: "¿Cuándo vienes?",
		noneInMonth: "No hay expediciones con salida ese mes.",
		view: "Ver expedición",
		from: "Desde",
		mapLabel: "Mapa interactivo",
		loading: "Cargando mapa…",
		months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
	},
	en: {
		kicker: "Where your adventure starts",
		gestureMobile: "Use two fingers to move the map",
		gestureWin: "Use Ctrl + scroll to zoom the map",
		gestureMac: "Use ⌘ + scroll to zoom the map",
		zoomIn: "Zoom in",
		zoomOut: "Zoom out",
		title: "How to get to your expedition",
		meeting: "Meeting point",
		zone: "Where the activity happens",
		zoneNote: "Approximate area: the exact spot depends on conditions and wildlife that day.",
		approx: "Approximate town location; we send you the exact spot when you book.",
		openMaps: "Open in Google Maps",
		directions: "Get directions",
		transportNone: "Transport not included: you get to the meeting point on your own.",
		transportOptional: "Optional transport from La Paz",
		transportIncludedHotel: "Transport included: we pick you up at your hotel or Airbnb in La Paz.",
		transportIncludedPoint: "Transport included from La Paz: we send you the departure point when you book.",
		routeLabel: "Included transfer La Paz → Puerto Chale",
		stayQ: "Where are you staying?",
		stayPick: "Pick your area",
		stayTo: "to the meeting point by car",
		stayToLaPaz: "to La Paz, where the transfer starts",
		stayLaPaz: "You're in La Paz: we pick you up right there.",
		stayFar: "It's far from your area. Message us and we'll help you plan the route or pair it with another expedition.",
		stayHelp: "Help me with the route",
		stayWa: "Hi! I'm staying in {stay} and want to do {tour}. Can you help me with the route?",
		timesNote: "Approximate driving times, no traffic.",
		homeKicker: "Our expeditions on the map",
		homeTitle: "Choose where to experience the Sea of Cortez and the Pacific",
		homeText: "From the Pacific side of Magdalena Bay to the Cabo Pulmo reef: tap an expedition to see where it departs and how to get there.",
		allMonths: "All year",
		monthQ: "When are you coming?",
		noneInMonth: "No expeditions depart that month.",
		view: "View expedition",
		from: "From",
		mapLabel: "Interactive map",
		loading: "Loading map…",
		months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	},
	fr: {
		kicker: "Là où commence votre aventure",
		gestureMobile: "Utilisez deux doigts pour déplacer la carte",
		gestureWin: "Utilisez Ctrl + molette pour zoomer",
		gestureMac: "Utilisez ⌘ + molette pour zoomer",
		zoomIn: "Zoom avant",
		zoomOut: "Zoom arrière",
		title: "Comment rejoindre votre expédition",
		meeting: "Point de rendez-vous",
		zone: "Là où se déroule l'activité",
		zoneNote: "Zone approximative : le lieu exact dépend des conditions et de la faune du jour.",
		approx: "Emplacement approximatif du village ; nous vous envoyons le point exact à la réservation.",
		openMaps: "Voir sur Google Maps",
		directions: "Itinéraire",
		transportNone: "Transport non inclus : vous vous rendez par vos propres moyens au point de rendez-vous.",
		transportOptional: "Transport optionnel depuis La Paz",
		transportIncludedHotel: "Transport inclus : nous venons vous chercher à votre hôtel ou Airbnb à La Paz.",
		transportIncludedPoint: "Transport inclus depuis La Paz : nous vous envoyons le point de départ à la réservation.",
		routeLabel: "Transfert inclus La Paz → Puerto Chale",
		stayQ: "Où logez-vous ?",
		stayPick: "Choisissez votre zone",
		stayTo: "jusqu'au point de rendez-vous en voiture",
		stayToLaPaz: "jusqu'à La Paz, où commence le transfert",
		stayLaPaz: "Vous êtes à La Paz : nous venons vous chercher sur place.",
		stayFar: "C'est loin de votre zone. Écrivez-nous et nous vous aiderons à organiser le trajet ou à le combiner avec une autre expédition.",
		stayHelp: "Aidez-moi pour le trajet",
		stayWa: "Bonjour ! Je loge à {stay} et je veux faire {tour}. Pouvez-vous m'aider pour le trajet ?",
		timesNote: "Temps de trajet approximatifs en voiture, sans trafic.",
		homeKicker: "Nos expéditions sur la carte",
		homeTitle: "Choisissez où vivre la mer de Cortés et le Pacifique",
		homeText: "Du Pacifique de la baie Magdalena au récif de Cabo Pulmo : touchez une expédition pour voir d'où elle part et comment y aller.",
		allMonths: "Toute l'année",
		monthQ: "Quand venez-vous ?",
		noneInMonth: "Aucune expédition ne part ce mois-là.",
		view: "Voir l'expédition",
		from: "Dès",
		mapLabel: "Carte interactive",
		loading: "Chargement de la carte…",
		months: ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
	},
	zh: {
		kicker: "你的冒险从这里开始",
		gestureMobile: "用两根手指移动地图",
		gestureWin: "按住 Ctrl 并滚动鼠标滚轮缩放地图",
		gestureMac: "按住 ⌘ 并滚动鼠标滚轮缩放地图",
		zoomIn: "放大",
		zoomOut: "缩小",
		title: "如何到达你的探险地点",
		meeting: "集合地点",
		zone: "活动所在区域",
		zoneNote: "大致区域：具体地点取决于当天的海况和野生动物。",
		approx: "小镇的大致位置；预订后我们会发给你准确地点。",
		openMaps: "在 Google 地图中查看",
		directions: "导航",
		transportNone: "不含交通：请自行前往集合地点。",
		transportOptional: "可选拉巴斯往返交通",
		transportIncludedHotel: "含交通：我们到你在拉巴斯的酒店或民宿接你。",
		transportIncludedPoint: "含拉巴斯出发的交通：预订后我们会发给你出发地点。",
		routeLabel: "含交通：拉巴斯 → 查莱港",
		stayQ: "你住在哪里？",
		stayPick: "选择你的区域",
		stayTo: "开车到集合地点",
		stayToLaPaz: "到拉巴斯（交通从这里出发）",
		stayLaPaz: "你住在拉巴斯：我们直接到那里接你。",
		stayFar: "离你住的地方比较远。给我们留言，我们帮你规划路线或搭配其他探险。",
		stayHelp: "帮我规划路线",
		stayWa: "你好！我住在{stay}，想参加{tour}。可以帮我规划路线吗？",
		timesNote: "开车大致时间，不含堵车。",
		homeKicker: "我们的探险地图",
		homeTitle: "选择在哪里体验科尔特斯海和太平洋",
		homeText: "从马格达莱纳湾的太平洋到卡波普尔莫珊瑚礁：点选一项探险，查看出发地点和交通方式。",
		allMonths: "全年",
		monthQ: "你什么时候来？",
		noneInMonth: "那个月没有出发的探险。",
		view: "查看探险",
		from: "起价",
		mapLabel: "互动地图",
		loading: "地图加载中…",
		months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	},
	ca: {
		kicker: "On comença la teva aventura",
		gestureMobile: "Fes servir dos dits per moure el mapa",
		gestureWin: "Fes servir Ctrl + roda del ratolí per fer zoom",
		gestureMac: "Fes servir ⌘ + roda del ratolí per fer zoom",
		zoomIn: "Apropar",
		zoomOut: "Allunyar",
		title: "Com arribar a la teva expedició",
		meeting: "Punt de trobada",
		zone: "On passa l'activitat",
		zoneNote: "Zona aproximada: el lloc exacte depèn de les condicions i de la fauna del dia.",
		approx: "Ubicació aproximada del poble; t'enviem el punt exacte en reservar.",
		openMaps: "Veure a Google Maps",
		directions: "Com arribar-hi",
		transportNone: "Transport no inclòs: arribes pel teu compte al punt de trobada.",
		transportOptional: "Transport opcional des de La Paz",
		transportIncludedHotel: "Transport inclòs: et recollim al teu hotel o Airbnb a La Paz.",
		transportIncludedPoint: "Transport inclòs des de La Paz: t'enviem el punt de sortida en reservar.",
		routeLabel: "Trasllat inclòs La Paz → Puerto Chale",
		stayQ: "On t'allotges?",
		stayPick: "Tria la teva zona",
		stayTo: "fins al punt de trobada en cotxe",
		stayToLaPaz: "fins a La Paz, on comença el trasllat",
		stayLaPaz: "Ets a La Paz: et recollim allà mateix.",
		stayFar: "Queda lluny de la teva zona. Escriu-nos i t'ajudem a fer la ruta o a combinar-ho amb una altra expedició.",
		stayHelp: "Ajudeu-me amb la ruta",
		stayWa: "Hola! M'allotjo a {stay} i vull fer {tour}. M'ajudeu amb la ruta?",
		timesNote: "Temps aproximats en cotxe, sense trànsit.",
		homeKicker: "Les nostres expedicions al mapa",
		homeTitle: "Tria on viure el mar de Cortés i el Pacífic",
		homeText: "Del Pacífic de la badia Magdalena a l'escull de Cabo Pulmo: toca una expedició per veure d'on surt i com arribar-hi.",
		allMonths: "Tot l'any",
		monthQ: "Quan véns?",
		noneInMonth: "Cap expedició no surt aquell mes.",
		view: "Veure l'expedició",
		from: "Des de",
		mapLabel: "Mapa interactiu",
		loading: "Carregant el mapa…",
		months: ["Gen", "Febr", "Març", "Abr", "Maig", "Juny", "Jul", "Ag", "Set", "Oct", "Nov", "Des"],
	},
} as const satisfies Record<Locale, Record<string, string | readonly string[]>>

/** Más de 2 h 30 min en auto = "queda lejos". */
export const FAR_MINUTES = 150
