import type { StoryPageData } from "@/components/StoryPage"

/**
 * Contingut narratiu (ca) de les pàgines d'expedició. Els slugs presents aquí
 * es rendritzen amb StoryPage en català; els que faltin cauen al contingut
 * en castellà (fallback definit a story-pages.ts).
 */
export const storyPagesCa: Record<string, StoryPageData> = {
	"safari-la-ventana": {
		breadcrumb: "Ocean Safari La Ventana",
		hero: {
			image: "/images/orca-safari.jpg",
			imageMobile: "/orca-la-ventana-mobile-v2.jpg",
			alt: "Ocean Safari a La Ventana i Illa Cerralvo",
			kicker: "La Ventana · Illa Cerralvo",
			title: "Ocean Safari La Ventana",
			text: "Explora els voltants de l'Illa Cerralvo a la recerca de móbules, dofins, balenes i altres habitants del Golf de Califòrnia, amb un guia biòleg marí i capitans experts en aquestes aigües. Cada sortida és diferent. Cada trobada és real.",
			meta: "La Ventana · 6 hores aprox. · Grups de fins a 8 persones",
			primaryLabel: "Reservar la meva aventura",
			primaryWa: "Hola! vull reservar l'Ocean Safari La Ventana",
			secondaryLabel: "Descobrir com serà el meu dia",
			secondaryHref: "#itinerario",
		},
		blocks: [
			{
				type: "quickfacts",
				items: [
					{ value: "6 hores", label: "Durada aprox." },
					{ value: "8:00 h", label: "Hora de sortida" },
					{ value: "2-8 persones", label: "Compartit o privat" },
					{ value: "14 anys", label: "Edat mínima (compartit)" },
				],
			},
			{
				type: "prose",
				kicker: "Què és l'Ocean Safari",
				heading: "Aquí no venim a complir parades. Venim a llegir el mar.",
				paragraphs: [
					"El matí comença a La Ventana, amb l'Illa Cerralvo dibuixant-se davant nostre i l'equip preparant la barca. Ens presentem, revisem les condicions del dia, ajustem el teu equip de snorkel i parlem sobre els animals que podríem trobar. Després sortim cap al canal que separa la península de l'Illa Cerralvo.",
					{ lead: "A partir d'aquí, mana el mar." },
					"No seguim una ruta turística amb parades obligatòries. Observem ocells, corrents, salts, aletes, bufs i qualsevol moviment que pugui revelar activitat. Escoltem els informes dels capitans locals i triem la ruta amb més possibilitats per a aquell dia.",
					"Podem començar seguint un grup de dofins, canviar de direcció per una agregació de móbules i acabar observant una balena a l'horitzó. També hi ha jornades més tranquil·les, en què toca navegar, buscar i gaudir del paisatge amb paciència.",
					{ lead: "Això és un safari de veritat: no saber exactament què apareixerà, però ser al lloc correcte per descobrir-ho." },
				],
			},
			{
				type: "mediaBanner",
				media: { src: "/images/especies/mobulas-bajo-agua.jpg", alt: "Agregació de móbules nedant sota la superfície al Golf de Califòrnia, La Ventana" },
				quote: "El mar decideix què ens ensenya. Nosaltres hi posem la paciència per descobrir-ho.",
			},
			{
				type: "callout",
				ink2: true,
				heading: "Abans de reservar, hi ha una cosa important que has de saber",
				paragraphs: [
					"Treballem amb animals salvatges en llibertat. No visitem un lloc on les móbules, els dofins o les balenes estiguin esperant: naveguem en un ecosistema obert i cada trobada depèn de la temporada, el clima, els corrents i el comportament natural dels animals.",
					"Per això no prometem una espècie específica ni garantim entrar a l'aigua amb ella. El que sí que prometem és una recerca activa, un equip compromès a aprofitar les condicions, decisions preses pensant primer en la seguretat i una observació respectuosa que no interfereixi amb la fauna.",
					"El mar decideix què ens ensenya. Nosaltres hi posem l'experiència per saber buscar-lo i la paciència per gaudir-lo.",
				],
			},
			{
				type: "mediaBanner",
				media: { suggest: "Presa aèria amb dron a l'alba: la barca sortint de La Ventana cap a l'Illa Cerralvo, mar en calma i l'estela daurada del sol sobre l'aigua." },
			},
			{
				type: "timeline",
				id: "itinerario",
				kicker: "Com serà el teu dia",
				title: "De la costa al blau profund",
				note: "Els horaris són aproximats. L'ordre de l'experiència pot canviar segons el clima, les condicions del mar i la fauna que trobem.",
				items: [
					{
						time: "Punt de trobada · La Ventana",
						title: "Ens trobem a La Ventana",
						paragraphs: [
							"L'aventura comença al nostre punt de trobada a La Ventana. Et recomanem arribar 15 minuts abans per conèixer-nos, acomodar les teves pertinences, emprovar-te l'equip i començar el briefing sense presses.",
							"Et lliurarem visor, snorkel, aletes i vestit de neoprè. Revisarem les talles, t'explicarem com moure't dins la barca, quins senyals farem servir i com actuarem en cas d'entrar a l'aigua. També parlarem sobre els animals amb més presència durant la temporada de la teva visita.",
						],
					},
					{
						time: "8:00 h",
						title: "Deixem enrere la costa",
						paragraphs: [
							"Pugem a l'embarcació i comencem a navegar cap al canal de Cerralvo. En els primers minuts començaràs a entendre que buscar fauna no consisteix només a esperar que aparegui alguna cosa.",
							"Parem atenció als ocells alimentant-se, als canvis a la superfície, als bufs a la distància, a les ombres sota l'aigua i a qualsevol moviment que pugui indicar activitat. I sí: moltes vegades tot comença amb algú assenyalant l'horitzó i cridant «alguna cosa ha saltat allà!».",
						],
						media: { src: "/images/safari/lancha-avistando-ballena.jpg", alt: "Viatger a la barca observant una balena que treu el cap davant la costa de La Ventana" },
					},
					{
						title: "Comença la recerca",
						paragraphs: [
							"Aquí acaba la ruta fixa. Podem recórrer el canal, acostar-nos a diferents zones al voltant de l'Illa Cerralvo o canviar completament de direcció seguint els informes i els senyals del mar.",
							"Quan trobem animals, primer avaluem el seu comportament. Algunes trobades es gaudeixen millor des de l'embarcació; en d'altres, quan l'espècie, les condicions i la seguretat ho permeten, ens preparem per entrar a l'aigua. Cada trobada funciona de manera diferent. Aquí hi ha la màgia.",
						],
					},
					{
						title: "Quan la trobada permet entrar a l'aigua",
						paragraphs: [
							"No tots els albiraments es converteixen en snorkel, i això és intencional. Abans d'entrar avaluem l'espècie, el comportament de l'animal, el corrent i l'onatge, l'experiència del grup, la presència d'altres embarcacions i la possibilitat d'una aproximació segura i respectuosa.",
							"No cal ser apneista ni atleta, però sí sentir-te còmode surant i seguir indicacions al mar. De vegades la millor trobada passa dins l'aigua; d'altres, passa assegut a la barca, veient una balena respirar a pocs metres. No forcem una interacció només per aconseguir una fotografia.",
						],
						media: { src: "/images/safari/snorkel-lobos-marinos.jpg", alt: "Grup de viatgers fent snorkel amb lleons marins a l'Illa Cerralvo, La Ventana" },
					},
					{
						title: "Una pausa amb gust de Baixa",
						paragraphs: [
							"Després de diverses hores de navegació busquem un lloc adequat per descansar. Quan les condicions ho permeten, ens acostem a una platja verge o zona tranquil·la per compartir ceviche, fruita de temporada, snacks i begudes.",
							"No és una parada en un club de platja: no hi ha venedors ni gandules alineades. Només el grup, les muntanyes, l'illa i un àpat que sap molt millor després de passar el matí buscant animals.",
						],
						media: { suggest: "El pícnic estil Baixa: ceviche, fruita i begudes servits davant el mar en una platja verge, amb l'illa de fons." },
					},
					{
						time: "≈ 14:00 h",
						title: "El retorn també compta",
						paragraphs: [
							"El retorn a La Ventana està previst cap a les 14:00 h, encara que l'hora pot variar segons les condicions. Continuem observant el mar durant tot el trajecte: moltes trobades apareixen just quan algú ja havia desat la càmera.",
							"En arribar, recollim l'equip i ens acomiadem amb sal als cabells, noves històries i, amb sort, una targeta de memòria força més plena que al matí.",
						],
					},
				],
			},
			{
				type: "encounters",
				ink2: true,
				kicker: "Com són realment les trobades?",
				title: "Aprendre a observar és part de l'aventura",
				items: [
					{ title: "Dofins", text: "Poden acostar-se a l'embarcació, navegar al costat de la proa o mantenir-se a distància. Alguns grups passen ràpid; d'altres semblen tenir tot el matí lliure i es queden diversos minuts al nostre voltant.", media: { src: "/images/especies/delfin-salto.jpg", alt: "Dofí saltant al costat de la barca al Golf de Califòrnia" } },
					{ title: "Móbules", text: "Podem trobar-les nedant sota la superfície, reunides en grups o saltant fora de l'aigua. Les grans agregacions són estacionals i la seva presència pot variar fins i tot dins la millor temporada.", media: { src: "/images/especies/mobula-salto.jpg", alt: "Móbula saltant fora de l'aigua a La Ventana" } },
					{ title: "Balenes", text: "En molts casos el primer indici és un buf a l'horitzó. Ens aproximem amb calma, respectem el seu espai i observem la seva direcció, ritme de respiració i comportament.", media: { src: "/images/especies/ballenasaltando2.jpeg", alt: "Balena saltant al Mar de Cortés" } },
					{ title: "Lleons marins", text: "Poden aparèixer durant la navegació o a prop de zones costaneres. Encara que solen ser curiosos, cada trobada depèn del lloc, la temporada i les condicions del dia.", media: { src: "/images/especies/lobomarinonadando.jpeg", alt: "Lleó marí nedant al Golf de Califòrnia" } },
					{ title: "Trobades excepcionals", text: "Orques, catxalots, balenes pilot, falses orques, zífids, mantes gegants i taurons balena poden travessar aquestes aigües. Són ocasionals i imprevisibles; mai una promesa, però saber que recorren el canal de Cerralvo és part del que fa tan especial explorar-lo.", media: { src: "/images/especies/orcalaventana.jpeg", alt: "Orca a les aigües de La Ventana, Baixa Califòrnia Sud" } },
					{ title: "Catxalots", text: "Els gegants de les profunditats de vegades creuen el canal de Cerralvo. Veure'ls respirar en superfície abans d'una immersió llarga és un d'aquells moments que ningú no oblida.", media: { src: "/images/especies/cachalote-buceo.jpg", alt: "Catxalot nedant sota l'aigua al Golf de Califòrnia" } },
				],
			},
			{
				type: "video",
				kicker: "Un minut al mar",
				title: "Mira-ho abans de viure-ho",
				media: { suggest: "Reel cinematogràfic de 30-60 s: dron sortint de La Ventana, móbules saltant, entrada a l'aigua amb dofins, una balena respirant i la posta de sol del retorn." },
			},
			{
				type: "faunaCalendar",
				kicker: "Fauna i temporades",
				title: "Què pots veure i quan?",
				intro: "La vida marina canvia al llarg de l'any. Aquest calendari t'ajuda a triar el teu millor moment — però recorda: treballem amb fauna en llibertat i cap trobada no està garantida. Dofins i lleons marins poden aparèixer bona part de l'any.",
			},
			{
				type: "mediaSplit",
				reverse: true,
				media: { src: "/images/safari/guia-biologo-camara.jpg", alt: "Guia biòleg marí de Keabelmet fotografiant la fauna durant el safari a La Ventana" },
				kicker: "Qui t'acompanya",
				title: "No només assenyalem animals. Els interpretem.",
				paragraphs: [
					"Cada sortida la guia un biòleg marí que llegeix el comportament de la fauna i els senyals del mar en temps real. No és un simple passeig en barca: és una lectura de l'ecosistema feta per algú que l'entén i el respecta.",
					"Preguntaràs, aprendràs i observaràs amb uns altres ulls. I quan entens el que veus, la trobada es torna encara més teva.",
				],
			},
			{
				type: "checklist",
				kicker: "Aquesta aventura és per a tu?",
				title: "Perquè reservis amb expectatives clares",
				good: {
					title: "Aquest safari és per a tu si…",
					items: [
						"T'emociona la natura encara que no hi hagi un resultat garantit.",
						"Prefereixes grups petits i vols aprendre mentre observes.",
						"Gaudeixes de la navegació, la fotografia i els paisatges oberts.",
						"És la teva primera experiència de snorkel i estàs disposat a seguir indicacions.",
						"Viatges sol, en parella, amb amics o en família.",
						"Busques una aventura d'un dia a prop de La Paz que se senti realment diferent.",
					],
				},
				bad: {
					title: "Potser no és la ideal si…",
					items: [
						"Necessites tenir garantit nedar amb una espècie concreta.",
						"No vols passar diverses hores en una embarcació.",
						"Esperes una ruta completament rígida.",
						"No et sents còmode amb canvis provocats pel vent o el mar.",
						"Busques tocar, alimentar o perseguir animals.",
					],
				},
			},
			{
				type: "details",
				kicker: "Tot el que inclou",
				title: "El que ja hem pensat per tu",
				items: [
					{ title: "Safari marí de ~6 hores", text: "Embarcació amb capità local i guia especialitzat per navegar, buscar fauna i interpretar les trobades." },
					{ title: "Guia biòleg marí", text: "No només assenyalem animals: t'expliquem què estem veient, com es comporten i per què aquest canal reuneix tanta vida." },
					{ title: "Equip complet de snorkel", text: "Visor, snorkel i aletes. T'ajudem a triar la talla i ajustar l'equip abans de sortir." },
					{ title: "Vestit de neoprè", text: "Inclòs segons la temporada i la temperatura de l'aigua." },
					{ title: "Pícnic estil Baixa", text: "Ceviche, fruita de temporada, snacks i begudes per descansar i recuperar energia." },
					{ title: "Fotografia i vídeo", text: "Documentem els millors moments perquè no triïs entre viure la trobada o passar el safari darrere d'una pantalla. Es lliura entre 1 i 3 dies després." },
				],
			},
			{
				type: "groups",
				ink2: true,
				kicker: "Què portar",
				title: "Vine còmode. La resta ja ho hem pensat nosaltres.",
				groups: [
					{ name: "Essencial", items: ["Vestit de bany", "Tovallola", "Sandàlies o calçat que es pugui mullar", "Roba lleugera i còmoda", "Canvi de roba seca"] },
					{ name: "Protecció solar", items: ["Gorra o barret", "Ulleres de sol amb corda", "Protector solar biodegradable", "Peça lleugera de màniga llarga"] },
					{ name: "Mesos frescos", items: ["Dessuadora", "Tallavent", "Roba seca addicional"] },
					{ name: "Per a les teves pertinences", items: ["Funda impermeable per al mòbil", "Bossa seca petita", "Càmera aquàtica, si en tens"] },
					{ name: "Molt recomanat", items: ["Esmorzar alguna cosa lleugera", "Arribar ben hidratat", "Medicament per al mareig si ets susceptible", "Avisar-nos d'al·lèrgies o condicions mèdiques", "Molta actitud aventurera"] },
				],
			},
			{
				type: "info",
				kicker: "Abans de sortir",
				title: "Informació pràctica",
				items: [
					{ label: "Punt de trobada", value: "Keabelmet Expeditions, La Ventana. Recomanem arribar 15 minuts abans." },
					{ label: "Bany", value: "L'embarcació no té bany; fes servir el lavabo abans de començar el safari." },
					{ label: "Transport des de La Paz", value: "Podem organitzar viatge d'anada i tornada per $1.000 MXN addicionals (fins a 4 persones), subjecte a disponibilitat." },
					{ label: "Àpats", value: "Ceviche, fruita, snacks i begudes. Avisa'ns amb antelació d'al·lèrgies, dietes o si no menges peix o gambes." },
					{ label: "Fotos i vídeo", value: "Inclosos; es lliuren normalment entre 1 i 3 dies després del safari." },
					{ label: "Menors d'edat", value: "En sortides compartides l'edat mínima és 14 anys. Els menors de 14 poden participar en un safari privat, amb ritme adaptat." },
				],
			},
			{
				type: "gallery",
				ink2: true,
				kicker: "Moments del safari",
				title: "Un dia que es veu així",
				cols: 4,
				items: [
					{ src: "/images/orca-safari.jpg", alt: "Navegant a la recerca de fauna a La Ventana" },
					{ src: "/images/especies/delfinsaltando.jpeg", alt: "Dofins saltant al Golf de Califòrnia" },
					{ src: "/images/safari/grupo-flotando-isla.jpg", alt: "Grup de viatgers surant junts al mar amb l'Illa Cerralvo al fons" },
					{ src: "/images/especies/ballenasaltando2.jpeg", alt: "Balena saltant al Mar de Cortés" },
					{ src: "/images/safari/snorkel-pulgares.jpg", alt: "Viatgera amb snorkel celebrant a l'aigua durant el safari" },
					{ src: "/images/especies/lobomarinonadando.jpeg", alt: "Lleó marí curiós sota l'aigua" },
					{ src: "/images/safari/manta-gigante-buceo.jpg", alt: "Manta gegant nedant sota l'aigua al canal de Cerralvo" },
					{ src: "/images/especies/mobulaschafa.jpeg", alt: "Móbules saltant a prop de l'embarcació" },
				],
			},
			{
				type: "pricing",
				id: "precios",
				kicker: "Preus",
				title: "Tria la teva modalitat",
				cards: [
					{
						name: "Safari compartit",
						amountMxn: 3000,
						amountNote: "/ persona",
						desc: "Ideal per a viatgers sols, parelles o grups petits que vulguin compartir l'experiència amb altres aventurers.",
						items: [
							"Safari de ~6 hores amb capità i guia biòleg marí",
							"Equip de snorkel i neoprè",
							"Pícnic, fruita, snacks i begudes",
							"Fotografies i vídeos",
							"Edat mínima 14 anys",
						],
						waText: "Hola! vull reservar l'Ocean Safari La Ventana compartit",
						ctaLabel: "Buscar una sortida compartida",
					},
					{
						name: "Safari privat",
						amountMxn: 16000,
						amountNote: "/ embarcació",
						desc: "Una experiència exclusiva per a famílies, grups d'amics, parelles o qui prefereixi més privacitat i atenció personalitzada.",
						items: [
							"Embarcació exclusiva, fins a 8 persones",
							"Capità i guia biòleg marí",
							"Equip de snorkel i neoprè",
							"Pícnic, fruita, snacks i begudes",
							"Fotografies i vídeos",
							"Modalitat indicada per a grups amb menors de 14 anys",
						],
						waText: "Hola! vull reservar l'Ocean Safari La Ventana privat",
						ctaLabel: "Reservar un safari privat",
						featured: true,
						featuredTag: "Privat",
					},
				],
				note: "Véns des de La Paz? Podem organitzar transport d'anada i tornada per $1.000 MXN addicionals (fins a 4 persones), subjecte a disponibilitat.",
			},
			{
				type: "policies",
				ink2: true,
				kicker: "Polítiques",
				title: "Clares i justes",
				items: [
					{
						title: "Política per clima",
						paragraphs: [
							"La seguretat sempre va abans que l'itinerari. Si el capità o l'equip determinen que el vent o el mar no permeten fer l'activitat de forma segura, podràs reprogramar el safari per a una altra data disponible o rebre la devolució dels teus diners.",
							"No podem controlar el vent, però sí que podem ser justos amb tu.",
						],
					},
					{
						title: "Política de cancel·lació",
						paragraphs: [
							"Si canceles amb almenys 24 hores d'antelació, rebràs la devolució dels teus diners.",
							"Les cancel·lacions amb menys de 24 hores no són reemborsables —l'embarcació, l'equip, els àpats i la logística ja estan preparats—, però l'import pot quedar com a saldo a favor per a una activitat futura, subjecte a disponibilitat.",
						],
					},
				],
			},
			{
				type: "faq",
				kicker: "Preguntes freqüents",
				title: "Tot el que sols voler saber",
				items: [
					{ q: "Necessito saber nedar?", a: ["Per gaudir de les entrades de snorkel és recomanable saber nedar i sentir-te còmode en aigües obertes. També pots quedar-te a l'embarcació durant certes trobades. Avisa'ns abans de reservar si algú del grup no sap nedar per avaluar si l'experiència és adequada."] },
					{ q: "És obligatori entrar a l'aigua?", a: ["No. Bona part del safari es pot gaudir des de l'embarcació; algunes observacions fins i tot són millors des de la superfície. Entrar a l'aigua depèn de la teva comoditat, l'espècie, les condicions i l'avaluació del guia."] },
					{ q: "Està garantit que veurem orques?", a: ["No. Les orques són animals silvestres i la seva presència canvia diàriament. Hi ha temporades amb més possibilitats, però cap albirament específic no es pot garantir. L'empresa que et digui que sí, t'està mentint."] },
					{ q: "Podem nedar amb tots els animals?", a: ["No. L'entrada a l'aigua depèn de l'espècie, el seu comportament, les condicions, la seguretat i les regulacions. El nedar amb balenes i catxalots no està permès en aigües mexicanes. Mai forcem una interacció."] },
					{ q: "Quina és la millor temporada?", a: ["Depèn del que més t'interessi. La primavera i l'inici de l'estiu destaquen per les agregacions de móbules; en els mesos frescos poden aparèixer diferents balenes. Dofins, lleons marins i ocells es poden trobar bona part de l'any."] },
					{ q: "Poden participar-hi infants?", a: ["En sortides compartides l'edat mínima és 14 anys. Els menors de 14 poden participar en un safari privat, on el guia adapta el ritme i els ofereix més atenció."] },
					{ q: "Què passa si em mareo?", a: ["Recomanem esmorzar lleuger, mantenir-te hidratat i prendre mesures preventives si sols marejar-te. Consulta amb antelació quin medicament és adequat per a tu i segueix les indicacions del producte o del teu metge."] },
					{ q: "Hi ha bany a l'embarcació?", a: ["No. Recomanem fer servir el lavabo abans de sortir, ja que l'experiència dura aproximadament sis hores."] },
					{ q: "Oferiu transport des de La Paz?", a: ["Sí. Podem organitzar transport d'anada i tornada per $1.000 MXN addicionals per a un màxim de quatre persones. S'ha de sol·licitar prèviament i està subjecte a disponibilitat."] },
					{ q: "Què passa si no menjo peix o gambes?", a: ["Avisa'ns abans de la sortida per revisar altres opcions. També pots portar els teus propis snacks. Qualsevol al·lèrgia s'ha de comunicar amb antelació."] },
					{ q: "Quan rebré les meves fotos i vídeos?", a: ["Normalment entre 1 i 3 dies després del safari, a través del canal acordat amb l'equip."] },
					{ q: "Puc portar la meva càmera?", a: ["Sí, sota la teva responsabilitat. Recomanem protegir-la de l'aigua i subjectar-la bé. L'espai és limitat, així que avisa'ns si portaràs equip gran; una GoPro, Insta360 o càmera compacta no representen cap problema."] },
				],
			},
			{
				type: "mediaBanner",
				media: { src: "/images/especies/ballena-atardecer.jpg", alt: "Balena saltant a la posta de sol al Golf de Califòrnia" },
				quote: "No sempre pots triar el moment que et marcarà. Però gairebé sempre surts amb ganes de tornar.",
				align: "bottom",
			},
			{
				type: "prose",
				ink2: true,
				kicker: "Sent aigua i terra",
				heading: "No només volem que vegis animals. Volem que entenguis per què són aquí.",
				paragraphs: [
					"Keabelmet va néixer de la curiositat per descobrir què passa on el desert es troba amb el mar. Per això les nostres sortides les guien persones que estimen l'aventura, però que també coneixen la biologia i el comportament de la fauna que busquem.",
					"Un dofí no és només una aleta al costat de la barca. Una móbula no és només un salt. Una balena no és només una fotografia. Cada comportament explica una història —i quan entens el que estàs veient, la trobada es torna encara més poderosa.",
				],
			},
			{
				type: "finalCta",
				image: "/images/orca-safari.jpg",
				alt: "Móbules i dofins a La Ventana",
				title: "Potser surts buscant orques o móbules. Potser el mar té altres plans.",
				text: "Aquesta és la part emocionant. Explica'ns quan visites Baixa Califòrnia Sud i t'ajudem a triar el millor moment per viure el teu Ocean Safari a La Ventana i l'Illa Cerralvo.",
				primaryLabel: "Consultar disponibilitat",
				primaryWa: "Hola! vull consultar disponibilitat per a l'Ocean Safari La Ventana",
				secondaryLabel: "Veure totes les expedicions",
				secondaryHref: "/#expediciones",
			},
		],
	},
	"tiburon-ballena": {
		breadcrumb: "Tauró Balena",
		hero: {
			image: "/tiburon-ballena-drone.jpg",
			alt: "Tauró balena nedant a prop de la superfície a La Paz",
			kicker: "La Paz · Tauró Balena",
			title: "Neda al costat del peix més gran del planeta",
			text: "No per perseguir-lo. No per tocar-lo. Simplement per acompanyar-lo durant uns minuts. El tauró balena pot superar els deu metres i, tot i així, alimentar-se d'organismes diminuts. Compartir l'aigua amb ell no se sent com una aventura extrema: se sent com un privilegi.",
			meta: "Passeig marítim de La Paz · 2-3 hores · Temporada oct–abril",
			primaryLabel: "Reservar la meva trobada",
			primaryWa: "Hola! vull reservar el nedar amb tauró balena a La Paz",
			secondaryLabel: "Veure com serà l'experiència",
			secondaryHref: "#itinerario",
		},
		blocks: [
			{
				type: "quickfacts",
				items: [
					{ value: "2-3 hores", label: "Durada aprox." },
					{ value: "Oct – abril", label: "Temporada" },
					{ value: "12 anys", label: "Edat mínima" },
					{ value: "Passeig marítim de La Paz", label: "Punt de trobada" },
				],
			},
			{
				type: "prose",
				kicker: "El gegant més noble de l'oceà",
				heading: "La seva veritable característica no és la seva mida. És la seva tranquil·litat.",
				paragraphs: [
					"Hi ha animals que inspiren respecte per la seva mida. El tauró balena també ho fa. Però n'hi ha prou amb uns segons per descobrir que el que impressiona no és com de gran és, sinó com de tranquil és.",
					"Neda lentament. Ignora la nostra presència. I continua el seu camí mentre s'alimenta de plàncton a prop de la superfície.",
					{ lead: "No estem davant d'un depredador. Estem davant d'un dels animals més pacífics que habiten l'oceà." },
					"Durant uns minuts podrem acompanyar-lo, sempre respectant el seu espai i les regles que fan possible aquesta trobada.",
				],
			},
			{
				type: "mediaBanner",
				media: { suggest: "Fotografia zenital gegant del tauró balena ocupant tota l'amplada de la pantalla, amb un nedador petit al costat per donar escala." },
				quote: "No cal tocar una cosa per recordar-la tota la vida.",
			},
			{
				type: "timeline",
				id: "itinerario",
				kicker: "Així serà la teva experiència",
				title: "Del passeig marítim a la trobada",
				note: "No seguim una ruta establerta: busquem les millors condicions i els exemplars que s'alimenten a prop de la superfície.",
				items: [
					{
						time: "Punt de trobada · Passeig marítim de La Paz",
						title: "Ens reunim i fem el briefing",
						paragraphs: [
							"Després de reunir-nos amb l'equip fem un breu briefing on expliquem com es desenvoluparà l'activitat, repassem les regles de l'àrea protegida i resolem qualsevol dubte abans de pujar a l'embarcació.",
						],
					},
					{
						title: "Comença la recerca",
						paragraphs: [
							"Un cop a l'aigua comença la recerca. No seguim una ruta fixa: localitzem els exemplars que s'estan alimentant a prop de la superfície. Quan en trobem un, esperem el nostre torn i ens preparem per entrar a l'aigua.",
						],
						media: { suggest: "Vista des de l'embarcació del guia assenyalant l'aleta d'un tauró balena a la superfície, amb el grup a punt amb snorkel." },
					},
					{
						title: "Uns minuts al costat del gegant",
						paragraphs: [
							"Allà passa el que tothom ve a buscar. Durant uns minuts nedem al costat del tauró balena, sempre respectant la distància permesa i seguint les indicacions del guia. Després tornem a pujar a l'embarcació i comencem de nou la recerca.",
							"Cada trobada dura poc. Però molt poques persones l'obliden.",
						],
						media: { suggest: "Nedador amb snorkel a distància respectuosa al costat del tauró balena, presa des de la superfície amb llum turquesa." },
					},
				],
			},
			{
				type: "seasons",
				ink2: true,
				kicker: "Tria el teu horari",
				title: "Tres sortides al dia segons les condicions",
				intro: "Tenim tres horaris de sortida durant la temporada per aprofitar les millors condicions del dia. Cap horari és millor que un altre: cadascun es desenvolupa diferent seguint el comportament natural dels animals.",
				items: [
					{ name: "Sortida matinera · la nostra recomanació", text: "Cita a les 7:00 h, sortida a les 8:00 h. Durada aprox. 3 hores. En ser el primer recorregut, dediquem part de l'experiència a localitzar els taurons abans de les entrades a l'aigua. Si tens flexibilitat, és la que més recomanem." },
					{ name: "Sortida de mig matí", text: "Cita a les 10:00 h, sortida a les 11:00 h. Durada aprox. 2 hores. Els taurons ja solen estar més ben ubicats gràcies a la primera sortida, així que el temps de recerca és menor i s'aprofita millor l'experiència." },
					{ name: "Sortida del migdia", text: "Cita a les 12:00 h, sortida a les 13:00 h. Durada aprox. 2 hores. Mateixa dinàmica que el segon torn: els exemplars ja solen estar localitzats, permetent dirigir-nos amb més rapidesa a la zona d'observació." },
				],
			},
			{
				type: "callout",
				heading: "Aquí no venim a perseguir animals. Venim a compartir l'aigua amb ells.",
				paragraphs: [
					"Quan entrem a l'aigua som nosaltres qui ens hem d'adaptar. Mai bloquegem el seu camí. Mai nedem davant seu. Mai intentem tocar-lo.",
					"Simplement l'acompanyem durant una part molt petita del seu recorregut. I creiem que aquesta és la millor manera de viure aquesta experiència.",
				],
			},
			{
				type: "callout",
				ink2: true,
				heading: "Per què la trobada dura tan poc? Perquè protegir el tauró balena és més important que allargar l'experiència.",
				paragraphs: [
					"L'activitat està regulada per autoritats ambientals que limiten el temps d'observació, el nombre d'embarcacions i la manera com ens podem acostar.",
					"Lluny de ser un inconvenient, aquestes regles són les que permeten que milers de persones puguin continuar gaudint d'aquesta trobada cada temporada. No només véns a conèixer el tauró balena: també véns a aprendre com conviure-hi de manera responsable.",
				],
			},
			{
				type: "prose",
				kicker: "Cada dia és diferent",
				heading: "Treballem amb animals completament lliures.",
				paragraphs: [
					"Hi ha dies en què trobem diversos exemplars. D'altres en què els hem de buscar durant més temps. Alguns neden lentament mentre s'alimenten; d'altres desapareixen sota l'aigua pocs segons després de trobar-los.",
					{ lead: "Creiem que aquesta incertesa fa que cada trobada tingui encara més valor." },
				],
			},
			{
				type: "checklist",
				kicker: "És per a tu?",
				title: "Perquè reservis amb expectatives clares",
				good: {
					title: "Aquesta experiència és ideal si…",
					items: [
						"Sempre has somiat nedar al costat del tauró balena.",
						"No tens experiència prèvia fent snorkel.",
						"Vols viure una trobada amb fauna silvestre de manera responsable.",
						"Busques una activitat apta per a gairebé tota la família.",
					],
				},
				bad: {
					title: "Potser no és per a tu si…",
					items: [
						"Esperes controlar el comportament dels animals.",
						"Busques una experiència on tot estigui garantit.",
					],
				},
			},
			{
				type: "details",
				kicker: "Tot el que inclou",
				title: "El que ja està resolt",
				items: [
					{ title: "Embarcació autoritzada", text: "Amb permís per a l'activitat a l'àrea protegida." },
					{ title: "Guia certificat", text: "T'acompanya i explica les regles de la trobada en tot moment." },
					{ title: "Equip complet de snorkel", text: "Visor, snorkel i aletes." },
					{ title: "Vestit de neoprè", text: "Inclòs segons la temporada i la temperatura de l'aigua." },
					{ title: "Armilla de flotació", text: "Perquè gaudeixis de la trobada amb total tranquil·litat." },
					{ title: "Briefing de seguretat", text: "Explicació completa abans d'entrar a l'aigua." },
				],
			},
			{
				type: "info",
				ink2: true,
				kicker: "Abans de reservar",
				title: "Informació important",
				items: [
					{ label: "Durada", value: "Aproximadament 2-3 hores segons l'horari." },
					{ label: "Temporada", value: "D'octubre a abril." },
					{ label: "Edat mínima", value: "12 anys." },
					{ label: "Punt de trobada", value: "Passeig marítim de La Paz." },
					{ label: "Fotografia i vídeo", value: "Aquesta activitat no inclou servei de fotografia ni vídeo." },
				],
			},
			{
				type: "pricing",
				id: "precios",
				kicker: "Preu",
				title: "Reserva la teva trobada",
				cards: [
					{
						name: "Nedar amb tauró balena",
						amountMxn: 2300,
						amountNote: "/ persona",
						desc: "Una experiència apta per a gairebé tota la família, sense necessitat d'experiència prèvia en snorkel.",
						items: [
							"Embarcació autoritzada i guia certificat",
							"Equip complet de snorkel i neoprè",
							"Armilla de flotació",
							"Briefing de seguretat",
							"Temporada d'octubre a abril",
						],
						waText: "Hola! vull reservar el nedar amb tauró balena a La Paz",
						ctaLabel: "Reservar la meva trobada",
						featured: true,
						featuredTag: "Oct – abril",
					},
				],
			},
			{
				type: "mediaBanner",
				media: { suggest: "Silueta del tauró balena vist des de baix contra la llum de la superfície, sensació de calma i escala." },
				quote: "Potser arribes pensant en la seva mida. Però probablement te'n vagis recordant la seva tranquil·litat.",
				align: "bottom",
			},
			{
				type: "finalCta",
				image: "/tiburon-ballena-drone.jpg",
				alt: "Tauró balena a les aigües de La Paz",
				title: "Hi ha trobades que duren uns minuts i, tot i així, es queden amb tu durant molts anys.",
				text: "Quan comparteixes l'aigua amb el peix més gran del planeta descobreixes que algunes de les criatures més impressionants de l'oceà també poden ser les més pacífiques. Explica'ns quan visites La Paz i t'ajudem a triar el teu horari.",
				primaryLabel: "Consultar disponibilitat",
				primaryWa: "Hola! vull consultar disponibilitat per nedar amb el tauró balena",
				secondaryLabel: "Veure totes les expedicions",
				secondaryHref: "/#expediciones",
			},
		],
	},
}
