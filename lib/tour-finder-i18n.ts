/**
 * Textos del cuestionario "¿Qué tour tomar?" por idioma. Viven aquí (y no en el
 * componente cliente) para que la guía /que-hacer-en-la-paz y llms.txt usen
 * exactamente los mismos nombres, precios y avisos.
 */
import type { Locale } from "@/lib/i18n"
import type { AnimalId, Comfort, Group, Mode, Time, TourId } from "@/lib/tour-finder"
import { SEASON_GROUPS } from "@/lib/tour-finder"

export type SeasonId = (typeof SEASON_GROUPS)[number]["id"]

export interface QuizDict {
	badge: string
	kicker: string
	title: string
	sub: string
	note: string
	guideLink: string
	monthsShort: string[]
	monthsLong: string[]
	allYear: string
	qMonth: string
	monthHint: string
	monthUnknown: string
	seasons: Record<SeasonId, { name: string; hint: string }>
	qMode: string
	modes: Record<Mode, { title: string; desc: string; badge: string }>
	qComfort: string
	comfort: Record<Comfort, string>
	qAnimal: string
	animalHint: string
	animals: Record<AnimalId, string>
	surprise: string
	peakTag: string
	maybeTag: string
	qGroup: string
	groups: Record<Group, string>
	qTime: string
	times: Record<Time, string>
	anyTime: string
	back: string
	eyebrow: string
	view: string
	book: string
	alts: string
	reset: string
	perPerson: string
	from: string
	duration: string
	tours: Record<TourId, { name: string; blurb: string; duration: string }>
	why: {
		match: (animal: string) => string
		peak: (animal: string, month: string) => string
		maybe: (animal: string) => string
		inMonth: (month: string) => string
		season: (range: string) => string
	}
	notes: {
		sealionSummer: string
		orca: string
		caboPulmo: string
		privateOnly: string
		lvBoat: string
		openSea: string
		relaxed: string
	}
	wa: (name: string, month: string | null, mode: string) => string
}

const es: QuizDict = {
	badge: "¿No sabes qué elegir?",
	kicker: "Encuentra tu expedición",
	title: "¿Estás en La Paz y no sabes qué tour tomar?",
	sub: "Elige con fotos: tu mes, cómo quieres vivir el mar y qué animal te gustaría ver. Solo te mostramos lo que de verdad puedes hacer en tu fecha.",
	note: "Toma 30 segundos. Cero compromiso.",
	guideLink: "Ver la guía completa mes por mes →",
	monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
	monthsLong: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
	allYear: "todo el año",
	qMonth: "¿En qué mes vienes?",
	monthHint: "Cada temporada trae animales distintos. Toca tu mes.",
	monthUnknown: "Aún no tengo fecha",
	seasons: {
		winter: { name: "Invierno", hint: "Ballenas y tiburón ballena" },
		spring: { name: "Primavera", hint: "Móbulas saltando y las últimas ballenas" },
		summer: { name: "Verano", hint: "Cachalotes, móbulas y crías de lobo marino" },
		autumn: { name: "Otoño", hint: "Vuelve el tiburón ballena y llega el Sardine Run" },
	},
	qMode: "¿Cómo quieres vivir el mar?",
	modes: {
		boat: { title: "Desde la lancha", desc: "Sin meterte al agua: observas a los animales desde la embarcación.", badge: "Desde la lancha" },
		snorkel: { title: "Snorkel", desc: "Nadar en la superficie con visor y aletas. No es buceo.", badge: "Snorkel" },
		firstDive: { title: "Bucear por primera vez", desc: "Sin certificación, con un instructor a tu lado.", badge: "Buceo · primera vez" },
		certified: { title: "Ya buceo", desc: "Tengo certificación (Open Water o superior).", badge: "Buceo certificado" },
	},
	qComfort: "¿Qué tan cómodo/a te sientes nadando en mar abierto?",
	comfort: {
		openSea: "Bien: ya he hecho snorkel y respiro tranquilo/a por el tubo",
		easy: "Poco o es mi primera vez: prefiero algo tranquilo",
	},
	qAnimal: "¿Qué te gustaría ver?",
	animalHint: "Solo aparecen los animales posibles en tu mes y con tu forma de vivir el mar.",
	animals: {
		grayWhale: "Ballena gris",
		bigWhales: "Ballenas jorobada y azul",
		whaleShark: "Tiburón ballena",
		sealion: "Lobos marinos",
		mobula: "Móbulas",
		giantManta: "Mantas gigantes",
		orca: "Orcas",
		dolphin: "Delfines",
		spermWhale: "Cachalotes",
		sardineRun: "Marlines y sardinas",
		reef: "Arrecife y cardúmenes",
	},
	surprise: "Me da igual, sorpréndeme",
	peakTag: "Temporada alta",
	maybeTag: "Ocasional",
	qGroup: "¿Quién viene?",
	groups: {
		adults: "Adultos (todos de 14 años o más)",
		teens: "Con alguien de 12 o 13 años",
		kids: "Con niños menores de 12",
	},
	qTime: "¿Cuánto tiempo tienes ese día?",
	times: {
		short: "Unas horas (2 a 4 h)",
		medium: "Media jornada larga (6 a 7 h)",
		full: "El día completo, no me importa madrugar",
		days: "Varios días: quiero certificarme",
	},
	anyTime: "Me adapto",
	back: "← Regresar",
	eyebrow: "Tu expedición ideal",
	view: "Ver expedición",
	book: "Reservar por WhatsApp",
	alts: "También encaja contigo",
	reset: "↺ Volver a empezar",
	perPerson: "por persona",
	from: "desde",
	duration: "Duración",
	tours: {
		"tiburon-ballena": { name: "Tiburón Ballena", blurb: "Nado con snorkel junto al pez más grande del mundo, respetando su espacio. No necesitas experiencia previa.", duration: "2 a 3 h" },
		"tour-espiritu-santo": { name: "Tour Snorkel Isla Espíritu Santo", blurb: "Snorkel en arrecifes, playas de Balandra y la isla, y la colonia de lobos marinos. Apto para familias.", duration: "6 h" },
		"safari-la-ventana": { name: "Ocean Safari La Ventana", blurb: "Safari en lancha por el canal de Cerralvo buscando móbulas, delfines y ballenas. Cada día es distinto.", duration: "6 h" },
		"safari-bahia-magdalena": { name: "Safari Bahía Magdalena", blurb: "Snorkel en mar abierto durante el Sardine Run: bolas de sardinas, marlines cazando y lobos marinos.", duration: "~10 h con traslado desde La Paz" },
		"tour-ballena-gris": { name: "Ballena Gris · Puerto Chale", blurb: "Madres y crías de ballena gris en las aguas tranquilas de Puerto Chale. Todo desde la lancha.", duration: "~9 h con traslado desde La Paz" },
		"buceo-cabo-pulmo": { name: "Buceo en Cabo Pulmo", blurb: "El arrecife del Parque Nacional Cabo Pulmo, con cardúmenes de miles de peces. Discovery, certificados o snorkel.", duration: "~5 h, más el camino desde La Paz" },
		"buceo-la-paz": { name: "Buceo Isla Espíritu Santo", blurb: "Dos inmersiones guiadas en Espíritu Santo, el archipiélago de los lobos marinos.", duration: "~7 h" },
		"scuba-discovery": { name: "Scuba Discovery desde Playa", blurb: "Tu primera respiración bajo el agua: máximo 6 m, unos 50 min abajo y un instructor contigo.", duration: "~4 h" },
		"certificacion-open-water": { name: "Certificación PADI Open Water", blurb: "Teoría en línea a tu ritmo y 4 inmersiones (2 en playa y 2 en barco) para salir certificado/a.", duration: "Normalmente un par de días" },
	},
	why: {
		match: (a) => `Aquí es donde ves ${a.toLowerCase()}.`,
		peak: (a, m) => `${a}: ${m} es de los meses con más probabilidad.`,
		maybe: (a) => `${a}: pueden aparecer, pero nunca está garantizado.`,
		inMonth: (m) => `Disponible en ${m}.`,
		season: (r) => `Temporada: ${r}.`,
	},
	notes: {
		sealionSummer: "Entre junio y agosto los lobos marinos se observan desde la lancha: es su temporada reproductiva y no se nada con ellos.",
		orca: "Sí, ya sabemos: viste los videos en internet. Las orcas pasan por aquí, pero van de paso y nadie puede prometerte verlas, así que no te vamos a vender un «tour de orcas». Tranqui: lo que sale en redes no siempre es el día a día. Si aparecen, es un regalazo; si no, el safari vale la pena por todo lo demás.",
		caboPulmo: "No incluye transporte desde La Paz.",
		privateOnly: "Con menores de 14 años este safari es solo en salida privada.",
		lvBoat: "Hay entradas de snorkel cuando es seguro, pero puedes quedarte en la lancha.",
		openSea: "Necesitas sentirte cómodo/a nadando en mar abierto con snorkel.",
		relaxed: "Ninguna opción de esa forma de vivir el mar encaja con tu fecha o tu grupo. Esto es lo más cercano:",
	},
	wa: (n, m, mode) => `Hola! Me interesa ${n}${m ? ` en ${m}` : ""} (${mode}).`,
}

const en: QuizDict = {
	badge: "Not sure what to pick?",
	kicker: "Find your expedition",
	title: "In La Paz and not sure which tour to take?",
	sub: "Pick with photos: your month, how you want to experience the sea and which animal you'd love to see. We only show what you can really do on your dates.",
	note: "Takes 30 seconds. Zero commitment.",
	guideLink: "See the full month-by-month guide →",
	monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	monthsLong: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	allYear: "all year",
	qMonth: "Which month are you coming?",
	monthHint: "Each season brings different animals. Tap your month.",
	monthUnknown: "I don't have dates yet",
	seasons: {
		winter: { name: "Winter", hint: "Whales and whale sharks" },
		spring: { name: "Spring", hint: "Jumping mobulas and the last whales" },
		summer: { name: "Summer", hint: "Sperm whales, mobulas and sea lion pups" },
		autumn: { name: "Autumn", hint: "Whale sharks return and the Sardine Run arrives" },
	},
	qMode: "How do you want to experience the sea?",
	modes: {
		boat: { title: "From the boat", desc: "No getting in the water: you watch the wildlife from the boat.", badge: "From the boat" },
		snorkel: { title: "Snorkeling", desc: "Swimming at the surface with mask and fins. Not diving.", badge: "Snorkeling" },
		firstDive: { title: "Try diving for the first time", desc: "No certification, with an instructor by your side.", badge: "Diving · first time" },
		certified: { title: "I already dive", desc: "I'm certified (Open Water or higher).", badge: "Certified diving" },
	},
	qComfort: "How comfortable are you swimming in open water?",
	comfort: {
		openSea: "Comfortable: I've snorkeled before and breathe calmly through the tube",
		easy: "Not much, or it's my first time: I'd rather keep it calm",
	},
	qAnimal: "What would you love to see?",
	animalHint: "Only animals you can actually see in your month, the way you chose, are shown.",
	animals: {
		grayWhale: "Gray whale",
		bigWhales: "Humpback and blue whales",
		whaleShark: "Whale shark",
		sealion: "Sea lions",
		mobula: "Mobula rays",
		giantManta: "Giant mantas",
		orca: "Orcas",
		dolphin: "Dolphins",
		spermWhale: "Sperm whales",
		sardineRun: "Marlin and sardines",
		reef: "Reef and fish schools",
	},
	surprise: "Anything, surprise me",
	peakTag: "Peak season",
	maybeTag: "Occasional",
	qGroup: "Who's coming?",
	groups: {
		adults: "Adults (everyone 14 or older)",
		teens: "Someone aged 12 or 13",
		kids: "Kids under 12",
	},
	qTime: "How much time do you have that day?",
	times: {
		short: "A few hours (2 to 4 h)",
		medium: "A long half day (6 to 7 h)",
		full: "The whole day, I don't mind an early start",
		days: "Several days: I want to get certified",
	},
	anyTime: "I'm flexible",
	back: "← Back",
	eyebrow: "Your ideal expedition",
	view: "View expedition",
	book: "Book on WhatsApp",
	alts: "Also a good fit",
	reset: "↺ Start over",
	perPerson: "per person",
	from: "from",
	duration: "Duration",
	tours: {
		"tiburon-ballena": { name: "Whale Shark", blurb: "Snorkel next to the biggest fish in the world, respecting its space. No previous experience needed.", duration: "2 to 3 h" },
		"tour-espiritu-santo": { name: "Snorkel Tour Espiritu Santo Island", blurb: "Snorkeling on reefs, Balandra and island beaches, and the sea lion colony. Family friendly.", duration: "6 h" },
		"safari-la-ventana": { name: "Ocean Safari La Ventana", blurb: "A boat safari through the Cerralvo channel looking for mobulas, dolphins and whales. Every day is different.", duration: "6 h" },
		"safari-bahia-magdalena": { name: "Magdalena Bay Safari", blurb: "Open-water snorkeling during the Sardine Run: bait balls, hunting marlin and sea lions.", duration: "~10 h including transfer from La Paz" },
		"tour-ballena-gris": { name: "Gray Whale · Puerto Chale", blurb: "Gray whale mothers and calves in the calm waters of Puerto Chale. All from the boat.", duration: "~9 h including transfer from La Paz" },
		"buceo-cabo-pulmo": { name: "Diving in Cabo Pulmo", blurb: "The reef of Cabo Pulmo National Park, with schools of thousands of fish. Discovery, certified or snorkel.", duration: "~5 h, plus the drive from La Paz" },
		"buceo-la-paz": { name: "Diving Espiritu Santo Island", blurb: "Two guided dives at Espiritu Santo, the sea lion archipelago.", duration: "~7 h" },
		"scuba-discovery": { name: "Scuba Discovery from the Beach", blurb: "Your first breath underwater: 6 m max, about 50 min down and an instructor with you.", duration: "~4 h" },
		"certificacion-open-water": { name: "PADI Open Water Certification", blurb: "Online theory at your own pace and 4 dives (2 from the beach, 2 from the boat) to get certified.", duration: "Usually a couple of days" },
	},
	why: {
		match: (a) => `This is where you see ${a.toLowerCase()}.`,
		peak: (a, m) => `${a}: ${m} is one of the months with the best chances.`,
		maybe: (a) => `${a}: they may appear, but it's never guaranteed.`,
		inMonth: (m) => `Available in ${m}.`,
		season: (r) => `Season: ${r}.`,
	},
	notes: {
		sealionSummer: "From June to August sea lions are watched from the boat: it's their breeding season and swimming with them isn't allowed.",
		orca: "Yes, we know: you saw the videos online. Orcas do pass through here, but they're just passing by and nobody can promise you'll see them, so we're not going to sell you an \"orca tour\". Relax: what you see on social media isn't always everyday reality. If they show up, it's a huge gift; if not, the safari is worth it for everything else.",
		caboPulmo: "Transport from La Paz is not included.",
		privateOnly: "With kids under 14 this safari is private only.",
		lvBoat: "There are snorkel entries when it's safe, but you can stay on the boat.",
		openSea: "You need to feel comfortable snorkeling in open water.",
		relaxed: "No option of that kind fits your dates or your group. This is the closest match:",
	},
	wa: (n, m, mode) => `Hi! I'm interested in ${n}${m ? ` in ${m}` : ""} (${mode}).`,
}

const fr: QuizDict = {
	badge: "Vous ne savez pas quoi choisir ?",
	kicker: "Trouvez votre expédition",
	title: "À La Paz et vous ne savez pas quel tour choisir ?",
	sub: "Choisissez en photos : votre mois, votre façon de vivre la mer et l'animal que vous aimeriez voir. Nous ne montrons que ce qui est vraiment possible à vos dates.",
	note: "Ça prend 30 secondes. Aucun engagement.",
	guideLink: "Voir le guide complet mois par mois →",
	monthsShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
	monthsLong: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
	allYear: "toute l'année",
	qMonth: "En quel mois venez-vous ?",
	monthHint: "Chaque saison amène d'autres animaux. Touchez votre mois.",
	monthUnknown: "Je n'ai pas encore de dates",
	seasons: {
		winter: { name: "Hiver", hint: "Baleines et requins-baleines" },
		spring: { name: "Printemps", hint: "Mobules qui sautent et les dernières baleines" },
		summer: { name: "Été", hint: "Cachalots, mobules et bébés otaries" },
		autumn: { name: "Automne", hint: "Retour du requin-baleine et arrivée du Sardine Run" },
	},
	qMode: "Comment voulez-vous vivre la mer ?",
	modes: {
		boat: { title: "Depuis le bateau", desc: "Sans entrer dans l'eau : vous observez la faune depuis le bateau.", badge: "Depuis le bateau" },
		snorkel: { title: "Snorkeling", desc: "Nager en surface avec masque et palmes. Ce n'est pas de la plongée.", badge: "Snorkeling" },
		firstDive: { title: "Plonger pour la première fois", desc: "Sans certification, avec un instructeur à vos côtés.", badge: "Plongée · première fois" },
		certified: { title: "Je plonge déjà", desc: "Je suis certifié(e) (Open Water ou plus).", badge: "Plongée certifiée" },
	},
	qComfort: "Êtes-vous à l'aise pour nager en pleine mer ?",
	comfort: {
		openSea: "Oui : j'ai déjà fait du snorkeling et je respire calmement par le tuba",
		easy: "Peu, ou c'est ma première fois : je préfère quelque chose de calme",
	},
	qAnimal: "Qu'aimeriez-vous voir ?",
	animalHint: "Seuls les animaux possibles pendant votre mois, de la façon choisie, apparaissent.",
	animals: {
		grayWhale: "Baleine grise",
		bigWhales: "Baleines à bosse et bleue",
		whaleShark: "Requin-baleine",
		sealion: "Otaries",
		mobula: "Raies mobula",
		giantManta: "Mantas géantes",
		orca: "Orques",
		dolphin: "Dauphins",
		spermWhale: "Cachalots",
		sardineRun: "Marlins et sardines",
		reef: "Récif et bancs de poissons",
	},
	surprise: "Peu importe, surprenez-moi",
	peakTag: "Haute saison",
	maybeTag: "Occasionnel",
	qGroup: "Qui vient ?",
	groups: {
		adults: "Des adultes (tous 14 ans ou plus)",
		teens: "Quelqu'un de 12 ou 13 ans",
		kids: "Des enfants de moins de 12 ans",
	},
	qTime: "De combien de temps disposez-vous ce jour-là ?",
	times: {
		short: "Quelques heures (2 à 4 h)",
		medium: "Une longue demi-journée (6 à 7 h)",
		full: "La journée entière, je me lève tôt sans souci",
		days: "Plusieurs jours : je veux me certifier",
	},
	anyTime: "Je m'adapte",
	back: "← Retour",
	eyebrow: "Votre expédition idéale",
	view: "Voir l'expédition",
	book: "Réserver sur WhatsApp",
	alts: "Vous correspond aussi",
	reset: "↺ Recommencer",
	perPerson: "par personne",
	from: "dès",
	duration: "Durée",
	tours: {
		"tiburon-ballena": { name: "Requin-Baleine", blurb: "Snorkeling à côté du plus grand poisson du monde, en respectant son espace. Aucune expérience requise.", duration: "2 à 3 h" },
		"tour-espiritu-santo": { name: "Tour Snorkel Île Espíritu Santo", blurb: "Snorkeling sur les récifs, plages de Balandra et de l'île, et la colonie d'otaries. Idéal en famille.", duration: "6 h" },
		"safari-la-ventana": { name: "Ocean Safari La Ventana", blurb: "Safari en bateau dans le canal de Cerralvo à la recherche de mobules, dauphins et baleines. Chaque jour est différent.", duration: "6 h" },
		"safari-bahia-magdalena": { name: "Safari Bahía Magdalena", blurb: "Snorkeling en pleine mer pendant le Sardine Run : boules de sardines, marlins en chasse et otaries.", duration: "~10 h avec le transfert depuis La Paz" },
		"tour-ballena-gris": { name: "Baleine Grise · Puerto Chale", blurb: "Mères et baleineaux gris dans les eaux calmes de Puerto Chale. Tout depuis le bateau.", duration: "~9 h avec le transfert depuis La Paz" },
		"buceo-cabo-pulmo": { name: "Plongée à Cabo Pulmo", blurb: "Le récif du parc national de Cabo Pulmo, avec des bancs de milliers de poissons. Baptême, certifiés ou snorkeling.", duration: "~5 h, plus la route depuis La Paz" },
		"buceo-la-paz": { name: "Plongée Île Espíritu Santo", blurb: "Deux plongées guidées à Espíritu Santo, l'archipel des otaries.", duration: "~7 h" },
		"scuba-discovery": { name: "Baptême de Plongée depuis la Plage", blurb: "Votre première respiration sous l'eau : 6 m max, environ 50 min sous l'eau et un instructeur avec vous.", duration: "~4 h" },
		"certificacion-open-water": { name: "Certification PADI Open Water", blurb: "Théorie en ligne à votre rythme et 4 plongées (2 du bord, 2 en bateau) pour être certifié(e).", duration: "En général deux jours" },
	},
	why: {
		match: (a) => `C'est ici que vous voyez : ${a.toLowerCase()}.`,
		peak: (a, m) => `${a} : ${m} est l'un des mois les plus favorables.`,
		maybe: (a) => `${a} : peuvent apparaître, mais ce n'est jamais garanti.`,
		inMonth: (m) => `Disponible en ${m}.`,
		season: (r) => `Saison : ${r}.`,
	},
	notes: {
		sealionSummer: "De juin à août, les otaries s'observent depuis le bateau : c'est leur saison de reproduction et on ne nage pas avec elles.",
		orca: "Oui, on sait : vous avez vu les vidéos sur internet. Les orques passent par ici, mais elles ne font que passer et personne ne peut vous promettre de les voir, alors on ne va pas vous vendre un « tour des orques ». Tranquille : ce qu'on voit sur les réseaux n'est pas toujours le quotidien. Si elles apparaissent, c'est un cadeau ; sinon, le safari vaut le coup pour tout le reste.",
		caboPulmo: "Le transport depuis La Paz n'est pas inclus.",
		privateOnly: "Avec des enfants de moins de 14 ans, ce safari se fait uniquement en privé.",
		lvBoat: "Il y a des mises à l'eau en snorkeling quand c'est sûr, mais vous pouvez rester sur le bateau.",
		openSea: "Il faut être à l'aise en snorkeling en pleine mer.",
		relaxed: "Aucune option de ce type ne correspond à vos dates ou à votre groupe. Voici la plus proche :",
	},
	wa: (n, m, mode) => `Bonjour ! ${n} m'intéresse${m ? ` en ${m}` : ""} (${mode}).`,
}

const zh: QuizDict = {
	badge: "不知道该选哪个？",
	kicker: "找到你的探险",
	title: "在拉巴斯，不知道该参加哪个行程？",
	sub: "用图片来选：你的月份、你想怎样体验大海、你最想看到的动物。我们只显示你的日期里真正能参加的行程。",
	note: "只需30秒。毫无约束。",
	guideLink: "查看完整的逐月指南 →",
	monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	monthsLong: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	allYear: "全年",
	qMonth: "你几月来？",
	monthHint: "每个季节能看到的动物都不一样。点选你的月份。",
	monthUnknown: "还没定日期",
	seasons: {
		winter: { name: "冬季", hint: "鲸鱼和鲸鲨" },
		spring: { name: "春季", hint: "跃出水面的蝠鲼和最后一批鲸鱼" },
		summer: { name: "夏季", hint: "抹香鲸、蝠鲼和海狮幼崽" },
		autumn: { name: "秋季", hint: "鲸鲨回归，沙丁鱼洄游登场" },
	},
	qMode: "你想怎样体验大海？",
	modes: {
		boat: { title: "在船上观赏", desc: "不用下水：在船上观赏海洋动物。", badge: "船上观赏" },
		snorkel: { title: "浮潜", desc: "戴面镜和脚蹼在水面游泳，不是潜水。", badge: "浮潜" },
		firstDive: { title: "第一次潜水", desc: "无需证书，教练全程陪同。", badge: "潜水 · 初次体验" },
		certified: { title: "我会潜水", desc: "我有潜水证书（Open Water 或更高）。", badge: "持证潜水" },
	},
	qComfort: "你在开阔海域游泳有多自在？",
	comfort: {
		openSea: "很自在：我浮潜过，能用呼吸管平稳呼吸",
		easy: "不太自在或第一次：我想要平静一点的",
	},
	qAnimal: "你最想看到什么？",
	animalHint: "只显示你的月份、以你选择的方式真正能看到的动物。",
	animals: {
		grayWhale: "灰鲸",
		bigWhales: "座头鲸和蓝鲸",
		whaleShark: "鲸鲨",
		sealion: "海狮",
		mobula: "蝠鲼",
		giantManta: "巨型蝠鲼",
		orca: "虎鲸",
		dolphin: "海豚",
		spermWhale: "抹香鲸",
		sardineRun: "马林鱼和沙丁鱼",
		reef: "珊瑚礁和鱼群",
	},
	surprise: "都可以，给我惊喜",
	peakTag: "旺季",
	maybeTag: "偶尔出现",
	qGroup: "谁一起来？",
	groups: {
		adults: "成人（所有人都满14岁）",
		teens: "有12或13岁的孩子",
		kids: "有12岁以下的孩子",
	},
	qTime: "那天你有多少时间？",
	times: {
		short: "几个小时（2到4小时）",
		medium: "较长的半天（6到7小时）",
		full: "一整天，早起也没关系",
		days: "好几天：我想考证",
	},
	anyTime: "都可以",
	back: "← 返回",
	eyebrow: "你的理想探险",
	view: "查看行程",
	book: "通过 WhatsApp 预订",
	alts: "也很适合你",
	reset: "↺ 重新开始",
	perPerson: "每人",
	from: "起",
	duration: "时长",
	tours: {
		"tiburon-ballena": { name: "鲸鲨", blurb: "浮潜与世界上最大的鱼同游，并与它保持距离。无需经验。", duration: "2到3小时" },
		"tour-espiritu-santo": { name: "圣灵岛浮潜之旅", blurb: "在珊瑚礁浮潜、游览巴兰德拉和岛上海滩，探访海狮群。适合家庭。", duration: "6小时" },
		"safari-la-ventana": { name: "拉文塔纳海洋探险", blurb: "乘船穿越塞拉尔沃海峡，寻找蝠鲼、海豚和鲸鱼。每天都不一样。", duration: "6小时" },
		"safari-bahia-magdalena": { name: "马格达莱纳湾探险", blurb: "沙丁鱼洄游期间在开阔海域浮潜：沙丁鱼球、捕猎的马林鱼和海狮。", duration: "约10小时，含拉巴斯往返交通" },
		"tour-ballena-gris": { name: "灰鲸 · 查莱港", blurb: "在查莱港平静的海域观赏灰鲸母子，全程在船上。", duration: "约9小时，含拉巴斯往返交通" },
		"buceo-cabo-pulmo": { name: "卡波普尔莫潜水", blurb: "卡波普尔莫国家公园的珊瑚礁，成千上万的鱼群。体验潜水、持证潜水或浮潜。", duration: "约5小时，另加从拉巴斯出发的车程" },
		"buceo-la-paz": { name: "圣灵岛潜水", blurb: "在海狮群岛圣灵岛进行两次导潜。", duration: "约7小时" },
		"scuba-discovery": { name: "海滩体验潜水", blurb: "你的第一次水下呼吸：最深6米，水下约50分钟，教练全程陪同。", duration: "约4小时" },
		"certificacion-open-water": { name: "PADI 开放水域潜水证书", blurb: "按自己节奏在线学习理论，加上4次潜水（2次岸潜、2次船潜）即可获得证书。", duration: "通常需要两天左右" },
	},
	why: {
		match: (a) => `在这里可以看到${a}。`,
		peak: (a, m) => `${a}：${m}是概率最高的月份之一。`,
		maybe: (a) => `${a}：可能出现，但无法保证。`,
		inMonth: (m) => `${m}可参加。`,
		season: (r) => `季节：${r}。`,
	},
	notes: {
		sealionSummer: "6月至8月是海狮的繁殖季，只能在船上观赏，不能与它们同游。",
		orca: "是的，我们知道：你在网上看过虎鲸的视频。虎鲸确实会经过这里，但它们只是路过，没人能保证你一定看到，所以我们不会卖给你什么“虎鲸之旅”。放轻松：社交媒体上看到的不一定是日常。如果它们出现，那是大海的礼物；如果没有，这趟探险的其他一切也值得。",
		caboPulmo: "不含从拉巴斯出发的交通。",
		privateOnly: "有14岁以下儿童时，此行程仅限包船。",
		lvBoat: "安全时会下水浮潜，但你也可以留在船上。",
		openSea: "需要能在开阔海域自在地浮潜。",
		relaxed: "这种方式没有适合你日期或同行人的行程。以下是最接近的：",
	},
	wa: (n, m, mode) => `你好！我对${m ? `${m}的` : ""}${n}感兴趣（${mode}）。`,
}

const ca: QuizDict = {
	badge: "No saps què triar?",
	kicker: "Troba la teva expedició",
	title: "Ets a La Paz i no saps quin tour fer?",
	sub: "Tria amb fotos: el teu mes, com vols viure el mar i quin animal t'agradaria veure. Només et mostrem el que de veritat pots fer a les teves dates.",
	note: "Triga 30 segons. Zero compromís.",
	guideLink: "Veure la guia completa mes a mes →",
	monthsShort: ["Gen", "Feb", "Març", "Abr", "Maig", "Juny", "Jul", "Ag", "Set", "Oct", "Nov", "Des"],
	monthsLong: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
	allYear: "tot l'any",
	qMonth: "Quin mes vens?",
	monthHint: "Cada temporada porta animals diferents. Toca el teu mes.",
	monthUnknown: "Encara no tinc dates",
	seasons: {
		winter: { name: "Hivern", hint: "Balenes i tauró balena" },
		spring: { name: "Primavera", hint: "Mòbules saltant i les últimes balenes" },
		summer: { name: "Estiu", hint: "Catxalots, mòbules i cries de lleó marí" },
		autumn: { name: "Tardor", hint: "Torna el tauró balena i arriba el Sardine Run" },
	},
	qMode: "Com vols viure el mar?",
	modes: {
		boat: { title: "Des de la barca", desc: "Sense entrar a l'aigua: observes els animals des de l'embarcació.", badge: "Des de la barca" },
		snorkel: { title: "Snorkel", desc: "Nedar a la superfície amb ulleres i aletes. No és busseig.", badge: "Snorkel" },
		firstDive: { title: "Bussejar per primera vegada", desc: "Sense certificació, amb un instructor al teu costat.", badge: "Busseig · primera vegada" },
		certified: { title: "Ja busso", desc: "Tinc certificació (Open Water o superior).", badge: "Busseig certificat" },
	},
	qComfort: "Com et sents nedant en mar obert?",
	comfort: {
		openSea: "Bé: ja he fet snorkel i respiro tranquil·lament pel tub",
		easy: "Poc o és la primera vegada: prefereixo alguna cosa tranquil·la",
	},
	qAnimal: "Què t'agradaria veure?",
	animalHint: "Només hi surten els animals possibles al teu mes i amb la teva manera de viure el mar.",
	animals: {
		grayWhale: "Balena grisa",
		bigWhales: "Balenes geperuda i blava",
		whaleShark: "Tauró balena",
		sealion: "Lleons marins",
		mobula: "Mòbules",
		giantManta: "Mantes gegants",
		orca: "Orques",
		dolphin: "Dofins",
		spermWhale: "Catxalots",
		sardineRun: "Marlins i sardines",
		reef: "Escull i bancs de peixos",
	},
	surprise: "M'és igual, sorprèn-me",
	peakTag: "Temporada alta",
	maybeTag: "Ocasional",
	qGroup: "Qui ve?",
	groups: {
		adults: "Adults (tots de 14 anys o més)",
		teens: "Amb algú de 12 o 13 anys",
		kids: "Amb nens de menys de 12",
	},
	qTime: "Quant temps tens aquell dia?",
	times: {
		short: "Unes hores (2 a 4 h)",
		medium: "Mitja jornada llarga (6 a 7 h)",
		full: "El dia sencer, no em fa res matinar",
		days: "Uns quants dies: vull certificar-me",
	},
	anyTime: "M'adapto",
	back: "← Tornar",
	eyebrow: "La teva expedició ideal",
	view: "Veure expedició",
	book: "Reservar per WhatsApp",
	alts: "També encaixa amb tu",
	reset: "↺ Tornar a començar",
	perPerson: "per persona",
	from: "des de",
	duration: "Durada",
	tours: {
		"tiburon-ballena": { name: "Tauró Balena", blurb: "Snorkel al costat del peix més gran del món, respectant el seu espai. No cal experiència prèvia.", duration: "2 a 3 h" },
		"tour-espiritu-santo": { name: "Tour Snorkel Illa Espíritu Santo", blurb: "Snorkel en esculls, platges de Balandra i de l'illa, i la colònia de lleons marins. Apte per a famílies.", duration: "6 h" },
		"safari-la-ventana": { name: "Ocean Safari La Ventana", blurb: "Safari en barca pel canal de Cerralvo buscant mòbules, dofins i balenes. Cada dia és diferent.", duration: "6 h" },
		"safari-bahia-magdalena": { name: "Safari Bahía Magdalena", blurb: "Snorkel en mar obert durant el Sardine Run: boles de sardines, marlins caçant i lleons marins.", duration: "~10 h amb el trasllat des de La Paz" },
		"tour-ballena-gris": { name: "Balena Grisa · Puerto Chale", blurb: "Mares i cries de balena grisa a les aigües tranquil·les de Puerto Chale. Tot des de la barca.", duration: "~9 h amb el trasllat des de La Paz" },
		"buceo-cabo-pulmo": { name: "Busseig a Cabo Pulmo", blurb: "L'escull del Parc Nacional Cabo Pulmo, amb bancs de milers de peixos. Discovery, certificats o snorkel.", duration: "~5 h, més el camí des de La Paz" },
		"buceo-la-paz": { name: "Busseig Illa Espíritu Santo", blurb: "Dues immersions guiades a Espíritu Santo, l'arxipèlag dels lleons marins.", duration: "~7 h" },
		"scuba-discovery": { name: "Scuba Discovery des de la platja", blurb: "La teva primera respiració sota l'aigua: màxim 6 m, uns 50 min a sota i un instructor amb tu.", duration: "~4 h" },
		"certificacion-open-water": { name: "Certificació PADI Open Water", blurb: "Teoria en línia al teu ritme i 4 immersions (2 des de platja i 2 en barca) per sortir certificat/da.", duration: "Normalment un parell de dies" },
	},
	why: {
		match: (a) => `Aquí és on veus: ${a.toLowerCase()}.`,
		peak: (a, m) => `${a}: ${m} és dels mesos amb més probabilitat.`,
		maybe: (a) => `${a}: poden aparèixer, però mai no està garantit.`,
		inMonth: (m) => `Disponible al ${m}.`,
		season: (r) => `Temporada: ${r}.`,
	},
	notes: {
		sealionSummer: "Entre juny i agost els lleons marins s'observen des de la barca: és la seva temporada reproductiva i no s'hi neda.",
		orca: "Sí, ja ho sabem: has vist els vídeos a internet. Les orques passen per aquí, però van de pas i ningú no et pot prometre veure-les, així que no et vendrem un «tour d'orques». Tranquil: el que surt a les xarxes no sempre és el dia a dia. Si apareixen, és un regalàs; si no, el safari val la pena per tota la resta.",
		caboPulmo: "No inclou transport des de La Paz.",
		privateOnly: "Amb menors de 14 anys aquest safari només es fa en sortida privada.",
		lvBoat: "Hi ha entrades de snorkel quan és segur, però et pots quedar a la barca.",
		openSea: "Cal sentir-se còmode fent snorkel en mar obert.",
		relaxed: "Cap opció d'aquest tipus encaixa amb les teves dates o el teu grup. Això és el més proper:",
	},
	wa: (n, m, mode) => `Hola! M'interessa ${n}${m ? ` al ${m}` : ""} (${mode}).`,
}

export const quizDicts: Record<Locale, QuizDict> = { es, en, fr, zh, ca }
