import type { StoryPageData } from "@/components/StoryPage"

/**
 * Contenido narrativo (es) de las páginas de expedición, versión larga de
 * storytelling. Cada slug presente aquí se renderiza con StoryPage; los
 * que falten caen a la ficha compacta (ExpeditionDetail).
 */
export const storyPages: Record<string, StoryPageData> = {
	"safari-la-ventana": {
		breadcrumb: "Ocean Safari La Ventana",
		hero: {
			image: "/images/orca-safari.jpg",
			alt: "Ocean Safari en La Ventana e Isla Cerralvo",
			kicker: "La Ventana · Isla Cerralvo",
			title: "Ocean Safari La Ventana",
			text: "Explora los alrededores de Isla Cerralvo en busca de móbulas, delfines, ballenas y otros habitantes del Golfo de California, junto a un guía biólogo marino y capitanes expertos en estas aguas. Cada salida es distinta. Cada encuentro es real.",
			meta: "La Ventana · 6 horas aprox. · Grupos de hasta 8 personas",
			primaryLabel: "Reservar mi aventura",
			primaryWa: "Hola! quiero reservar el Ocean Safari La Ventana",
			secondaryLabel: "Descubrir cómo será mi día",
			secondaryHref: "#itinerario",
		},
		blocks: [
			{
				type: "quickfacts",
				items: [
					{ value: "6 horas", label: "Duración aprox." },
					{ value: "8:00 a. m.", label: "Hora de salida" },
					{ value: "2-8 personas", label: "Compartido o privado" },
					{ value: "14 años", label: "Edad mínima (compartido)" },
				],
			},
			{
				type: "prose",
				kicker: "Qué es el Ocean Safari",
				heading: "Aquí no venimos a cumplir paradas. Venimos a leer el mar.",
				paragraphs: [
					"La mañana comienza en La Ventana, con Isla Cerralvo dibujándose frente a nosotros y el equipo preparando la lancha. Nos presentamos, revisamos las condiciones del día, ajustamos tu equipo de snorkel y hablamos sobre los animales que podríamos encontrar. Después salimos hacia el canal que separa la península de Isla Cerralvo.",
					{ lead: "A partir de ahí, manda el mar." },
					"No seguimos una ruta turística con paradas obligatorias. Observamos aves, corrientes, saltos, aletas, soplos y cualquier movimiento que pueda revelar actividad. Escuchamos los reportes de capitanes locales y elegimos la ruta con mejores posibilidades para ese día.",
					"Podemos comenzar siguiendo a un grupo de delfines, cambiar de dirección por una agregación de móbulas y terminar observando una ballena en el horizonte. También hay jornadas más tranquilas, en las que toca navegar, buscar y disfrutar el paisaje con paciencia.",
					{ lead: "Eso es un safari de verdad: no saber exactamente qué aparecerá, pero estar en el lugar correcto para descubrirlo." },
				],
			},
			{
				type: "mediaBanner",
				media: { src: "/images/especies/mobulaschafa.jpeg", alt: "Móbula saltando fuera del agua en el Golfo de California, La Ventana" },
				quote: "El mar decide qué nos enseña. Nosotros ponemos la paciencia para descubrirlo.",
			},
			{
				type: "callout",
				ink2: true,
				heading: "Antes de reservar, hay algo importante que debes saber",
				paragraphs: [
					"Trabajamos con animales salvajes en libertad. No visitamos un sitio donde las móbulas, los delfines o las ballenas estén esperando: navegamos en un ecosistema abierto y cada encuentro depende de la temporada, el clima, las corrientes y el comportamiento natural de los animales.",
					"Por eso no prometemos una especie específica ni garantizamos entrar al agua con ella. Lo que sí prometemos es una búsqueda activa, un equipo comprometido con aprovechar las condiciones, decisiones tomadas pensando primero en la seguridad y una observación respetuosa que no interfiera con la fauna.",
					"El mar decide qué nos enseña. Nosotros ponemos la experiencia para saber buscarlo y la paciencia para disfrutarlo.",
				],
			},
			{
				type: "timeline",
				id: "itinerario",
				kicker: "Cómo será tu día",
				title: "De la costa al azul profundo",
				note: "Los horarios son aproximados. El orden de la experiencia puede cambiar según el clima, las condiciones del mar y la fauna que encontremos.",
				items: [
					{
						time: "Punto de encuentro · La Ventana",
						title: "Nos encontramos en La Ventana",
						paragraphs: [
							"La aventura comienza en nuestro punto de encuentro en La Ventana. Te recomendamos llegar 15 minutos antes para conocernos, acomodar tus pertenencias, probarte el equipo y comenzar el briefing sin prisas.",
							"Te entregaremos visor, snorkel, aletas y traje de neopreno. Revisaremos las tallas, te explicaremos cómo moverte dentro de la lancha, qué señales usaremos y cómo actuaremos en caso de entrar al agua. También hablaremos sobre los animales con mayor presencia durante la temporada de tu visita.",
						],
					},
					{
						time: "8:00 a. m.",
						title: "Dejamos atrás la costa",
						paragraphs: [
							"Subimos a la embarcación y comenzamos a navegar hacia el canal de Cerralvo. En los primeros minutos empezarás a comprender que buscar fauna no consiste solamente en esperar a que algo aparezca.",
							"Prestamos atención a las aves alimentándose, los cambios en la superficie, los soplos en la distancia, las sombras bajo el agua y cualquier movimiento que pueda indicar actividad. Y sí: muchas veces todo comienza con alguien señalando el horizonte y gritando “¡algo saltó por allá!”.",
						],
						media: { suggest: "Toma aérea con drone: la lancha saliendo de La Ventana rumbo a Isla Cerralvo con el mar en calma del amanecer." },
					},
					{
						title: "Comienza la búsqueda",
						paragraphs: [
							"Aquí termina la ruta fija. Podemos recorrer el canal, acercarnos a distintas zonas alrededor de Isla Cerralvo o cambiar completamente de dirección siguiendo los reportes y las señales del mar.",
							"Cuando encontramos animales, primero evaluamos su comportamiento. Algunos encuentros se disfrutan mejor desde la embarcación; en otros, cuando la especie, las condiciones y la seguridad lo permiten, nos preparamos para entrar al agua. Cada encuentro funciona diferente. Ahí está la magia.",
						],
					},
					{
						title: "Cuando el encuentro permite entrar al agua",
						paragraphs: [
							"No todos los avistamientos se convierten en snorkel, y eso es intencional. Antes de entrar evaluamos la especie, el comportamiento del animal, la corriente y el oleaje, la experiencia del grupo, la presencia de otras embarcaciones y la posibilidad de una aproximación segura y respetuosa.",
							"No necesitas ser apneísta ni atleta, pero sí sentirte cómodo flotando y seguir indicaciones en el mar. A veces el mejor encuentro sucede dentro del agua; otras, ocurre sentado en la lancha, viendo una ballena respirar a pocos metros. No forzamos una interacción solo para conseguir una fotografía.",
						],
						media: { suggest: "Huésped entrando al agua con snorkel para nadar junto a una móbula o un grupo de delfines, tomada desde la superficie." },
					},
					{
						title: "Una pausa con sabor a Baja",
						paragraphs: [
							"Después de varias horas de navegación buscamos un lugar adecuado para descansar. Cuando las condiciones lo permiten, nos acercamos a una playa virgen o zona tranquila para compartir ceviche, fruta de temporada, snacks y bebidas.",
							"No es una parada en un club de playa: no hay vendedores ni camastros alineados. Solamente el grupo, las montañas, la isla y una comida que sabe mucho mejor después de pasar la mañana buscando animales.",
						],
						media: { suggest: "El picnic estilo Baja: ceviche, fruta y bebidas servidos frente al mar en una playa virgen, con la isla de fondo." },
					},
					{
						time: "≈ 2:00 p. m.",
						title: "El regreso también cuenta",
						paragraphs: [
							"El regreso a La Ventana está previsto alrededor de las 2:00 p. m., aunque la hora puede variar según las condiciones. Seguimos observando el mar durante todo el trayecto: muchos encuentros aparecen justo cuando alguien ya había guardado la cámara.",
							"Al llegar, recogemos el equipo y nos despedimos con sal en el pelo, nuevas historias y, con suerte, una tarjeta de memoria bastante más llena que por la mañana.",
						],
					},
				],
			},
			{
				type: "encounters",
				ink2: true,
				kicker: "¿Cómo son realmente los encuentros?",
				title: "Aprender a observar es parte de la aventura",
				items: [
					{ title: "Delfines", text: "Pueden acercarse a la embarcación, navegar junto a la proa o mantenerse a distancia. Algunos grupos pasan rápido; otros parecen tener toda la mañana libre y permanecen varios minutos a nuestro alrededor.", media: { src: "/images/especies/delfinsaltando.jpeg", alt: "Delfines saltando junto a la lancha en el Golfo de California" } },
					{ title: "Móbulas", text: "Podemos encontrarlas nadando bajo la superficie, reunidas en grupos o saltando fuera del agua. Las grandes agregaciones son estacionales y su presencia puede variar incluso dentro de la mejor temporada.", media: { src: "/images/especies/mobulaschafa.jpeg", alt: "Agregación de móbulas saltando en La Ventana" } },
					{ title: "Ballenas", text: "En muchos casos el primer indicio es un soplo en el horizonte. Nos aproximamos con calma, respetamos su espacio y observamos su dirección, ritmo de respiración y comportamiento.", media: { src: "/images/especies/ballenasaltando2.jpeg", alt: "Ballena saltando en el Mar de Cortés" } },
					{ title: "Lobos marinos", text: "Pueden aparecer durante la navegación o cerca de zonas costeras. Aunque suelen ser curiosos, cada encuentro depende del lugar, la temporada y las condiciones del día.", media: { src: "/images/especies/lobomarinonadando.jpeg", alt: "Lobo marino nadando en el Golfo de California" } },
					{ title: "Encuentros excepcionales", text: "Orcas, cachalotes, ballenas piloto, falsas orcas, zifios, mantas gigantes y tiburones ballena pueden atravesar estas aguas. Son ocasionales e impredecibles; nunca una promesa, pero saber que recorren el canal de Cerralvo es parte de lo que hace tan especial explorarlo.", media: { src: "/images/especies/orcalaventana.jpeg", alt: "Orca en las aguas de La Ventana, Baja California Sur" } },
					{ title: "Cachalotes", text: "Los gigantes de las profundidades a veces cruzan el canal de Cerralvo. Verlos respirar en superficie antes de una inmersión larga es uno de esos momentos que nadie olvida.", media: { suggest: "Cachalote respirando en la superficie con el logsuit del guía en primer plano." } },
				],
			},
			{
				type: "video",
				kicker: "Un minuto en el mar",
				title: "Míralo antes de vivirlo",
				media: { suggest: "Reel cinematográfico de 30-60 s: drone saliendo de La Ventana, móbulas saltando, entrada al agua con delfines, una ballena respirando y el atardecer del regreso." },
			},
			{
				type: "seasons",
				kicker: "Fauna y temporadas",
				title: "Elige tu mejor momento",
				intro: "La vida marina cambia a lo largo del año. Estas referencias te ayudan a elegir temporada, pero ningún encuentro puede garantizarse. Durante gran parte del año pueden aparecer delfines, lobos marinos y aves marinas que nos ayudan a localizar actividad.",
				items: [
					{ name: "Primavera", text: "Una de las temporadas más especiales para buscar grandes agregaciones de móbulas. También pueden aparecer delfines, lobos marinos, ballena azul y, de manera extraordinaria, orcas u otros grandes depredadores." },
					{ name: "Verano", text: "Continúa la temporada de móbulas y aumenta la posibilidad de actividad pelágica. Pueden aparecer delfines, lobos marinos, ballenas de Bryde y, ocasionalmente, cachalotes, orcas y ballenas piloto." },
					{ name: "Otoño", text: "Una temporada menos conocida, pero con posibilidades interesantes de encontrar delfines, lobos marinos, aves, mantas gigantes y cachalotes." },
					{ name: "Invierno", text: "La llegada de distintas especies de ballenas transforma la región: jorobadas, azules y de aleta, además de delfines y agregaciones menores de móbulas." },
				],
			},
			{
				type: "mediaSplit",
				reverse: true,
				media: { src: "/images/safari/nuestrocompromiso2.jpeg", alt: "Guía biólogo marino de Keabelmet con equipo de snorkel en La Ventana" },
				kicker: "Quién te acompaña",
				title: "No solo señalamos animales. Los interpretamos.",
				paragraphs: [
					"Cada salida la guía un biólogo marino que lee el comportamiento de la fauna y las señales del mar en tiempo real. No es un simple paseo en lancha: es una lectura del ecosistema hecha por alguien que lo entiende y lo respeta.",
					"Vas a preguntar, aprender y observar con otros ojos. Y cuando entiendes lo que ves, el encuentro se vuelve todavía más tuyo.",
				],
			},
			{
				type: "checklist",
				kicker: "¿Esta aventura es para ti?",
				title: "Para que reserves con expectativas claras",
				good: {
					title: "Este safari es para ti si…",
					items: [
						"Te emociona la naturaleza aunque no exista un resultado garantizado.",
						"Prefieres grupos pequeños y quieres aprender mientras observas.",
						"Disfrutas la navegación, la fotografía y los paisajes abiertos.",
						"Es tu primera experiencia de snorkel y estás dispuesto a seguir indicaciones.",
						"Viajas solo, en pareja, con amigos o en familia.",
						"Buscas una aventura de un día cerca de La Paz que se sienta realmente diferente.",
					],
				},
				bad: {
					title: "Quizá no sea la ideal si…",
					items: [
						"Necesitas tener garantizado nadar con una especie concreta.",
						"No deseas pasar varias horas en una embarcación.",
						"Esperas una ruta completamente rígida.",
						"No te sientes cómodo con cambios provocados por el viento o el mar.",
						"Buscas tocar, alimentar o perseguir animales.",
					],
				},
			},
			{
				type: "details",
				kicker: "Todo lo que incluye",
				title: "Lo que ya pensamos por ti",
				items: [
					{ title: "Safari marino de ~6 horas", text: "Embarcación con capitán local y guía especializado para navegar, buscar fauna e interpretar los encuentros." },
					{ title: "Guía biólogo marino", text: "No solo señalamos animales: te explicamos qué estamos viendo, cómo se comportan y por qué este canal reúne tanta vida." },
					{ title: "Equipo completo de snorkel", text: "Visor, snorkel y aletas. Te ayudamos a elegir la talla y ajustar el equipo antes de salir." },
					{ title: "Traje de neopreno", text: "Incluido según la temporada y la temperatura del agua." },
					{ title: "Picnic estilo Baja", text: "Ceviche, fruta de temporada, snacks y bebidas para descansar y recuperar energía." },
					{ title: "Fotografía y video", text: "Documentamos los mejores momentos para que no elijas entre vivir el encuentro o pasar el safari detrás de una pantalla. Se entrega entre 1 y 3 días después." },
				],
			},
			{
				type: "groups",
				ink2: true,
				kicker: "Qué llevar",
				title: "Ven cómodo. Lo demás ya lo pensamos nosotros.",
				groups: [
					{ name: "Esencial", items: ["Traje de baño", "Toalla", "Sandalias o calzado que pueda mojarse", "Ropa ligera y cómoda", "Cambio de ropa seca"] },
					{ name: "Protección solar", items: ["Gorra o sombrero", "Lentes de sol con correa", "Bloqueador biodegradable", "Prenda ligera de manga larga"] },
					{ name: "Meses frescos", items: ["Sudadera", "Rompevientos", "Ropa seca adicional"] },
					{ name: "Para tus pertenencias", items: ["Funda impermeable para el celular", "Bolsa seca pequeña", "Cámara acuática, si tienes"] },
					{ name: "Muy recomendado", items: ["Desayunar algo ligero", "Llegar bien hidratado", "Medicamento para el mareo si eres susceptible", "Avisarnos de alergias o condiciones médicas", "Mucha actitud aventurera"] },
				],
			},
			{
				type: "info",
				kicker: "Antes de salir",
				title: "Información práctica",
				items: [
					{ label: "Punto de encuentro", value: "Keabelmet Expeditions, La Ventana. Recomendamos llegar 15 minutos antes." },
					{ label: "Baño", value: "La embarcación no cuenta con baño; usa el sanitario antes de comenzar el safari." },
					{ label: "Transporte desde La Paz", value: "Podemos organizar viaje redondo por $1,000 MXN adicionales (hasta 4 personas), sujeto a disponibilidad." },
					{ label: "Alimentos", value: "Ceviche, fruta, snacks y bebidas. Avísanos con anticipación de alergias, dietas o si no consumes pescado o camarón." },
					{ label: "Fotos y video", value: "Incluidos; se entregan normalmente entre 1 y 3 días después del safari." },
					{ label: "Menores de edad", value: "En salidas compartidas la edad mínima es 14 años. Los menores de 14 pueden participar en un safari privado, con ritmo adaptado." },
				],
			},
			{
				type: "gallery",
				ink2: true,
				kicker: "Momentos del safari",
				title: "Un día que se ve así",
				cols: 4,
				items: [
					{ src: "/images/orca-safari.jpg", alt: "Navegando en busca de fauna en La Ventana" },
					{ src: "/images/especies/delfinsaltando.jpeg", alt: "Delfines saltando en el Golfo de California" },
					{ suggest: "Grupo de viajeros haciendo snorkel juntos en agua turquesa." },
					{ src: "/images/especies/ballenasaltando2.jpeg", alt: "Ballena saltando en el Mar de Cortés" },
					{ suggest: "Detalle del picnic: ceviche y fruta servidos a bordo." },
					{ src: "/images/especies/lobomarinonadando.jpeg", alt: "Lobo marino curioso bajo el agua" },
					{ suggest: "Atardecer sobre el canal de Cerralvo desde la lancha de regreso." },
					{ src: "/images/especies/mobulaschafa.jpeg", alt: "Móbulas saltando cerca de la embarcación" },
				],
			},
			{
				type: "pricing",
				id: "precios",
				kicker: "Precios",
				title: "Elige tu modalidad",
				cards: [
					{
						name: "Safari compartido",
						amountMxn: 3000,
						amountNote: "/ persona",
						desc: "Ideal para viajeros solos, parejas o grupos pequeños que quieran compartir la experiencia con otros aventureros.",
						items: [
							"Safari de ~6 horas con capitán y guía biólogo marino",
							"Equipo de snorkel y neopreno",
							"Picnic, fruta, snacks y bebidas",
							"Fotografías y videos",
							"Mínimo 4 participantes · Edad mínima 14 años",
						],
						waText: "Hola! quiero reservar el Ocean Safari La Ventana compartido",
						ctaLabel: "Buscar una salida compartida",
					},
					{
						name: "Safari privado",
						amountMxn: 16000,
						amountNote: "/ embarcación",
						desc: "Una experiencia exclusiva para familias, grupos de amigos, parejas o quienes prefieren mayor privacidad y atención personalizada.",
						items: [
							"Embarcación exclusiva, hasta 8 personas",
							"Capitán y guía biólogo marino",
							"Equipo de snorkel y neopreno",
							"Picnic, fruta, snacks y bebidas",
							"Fotografías y videos",
							"Modalidad indicada para grupos con menores de 14 años",
						],
						waText: "Hola! quiero reservar el Ocean Safari La Ventana privado",
						ctaLabel: "Reservar un safari privado",
						featured: true,
						featuredTag: "Privado",
					},
				],
				note: "¿Vienes desde La Paz? Podemos organizar transporte redondo por $1,000 MXN adicionales (hasta 4 personas), sujeto a disponibilidad.",
			},
			{
				type: "policies",
				ink2: true,
				kicker: "Políticas",
				title: "Claras y justas",
				items: [
					{
						title: "Política por clima",
						paragraphs: [
							"La seguridad siempre está antes que el itinerario. Si el capitán o el equipo determinan que el viento o el mar no permiten realizar la actividad de forma segura, podrás reprogramar el safari para otra fecha disponible o recibir la devolución de tu dinero.",
							"No podemos controlar el viento, pero sí podemos ser justos contigo.",
						],
					},
					{
						title: "Política de cancelación",
						paragraphs: [
							"Si cancelas con al menos 24 horas de anticipación, recibirás la devolución de tu dinero.",
							"Las cancelaciones con menos de 24 horas no son reembolsables —la embarcación, el equipo, los alimentos y la logística ya están preparados—, pero el monto puede quedar como saldo a favor para una futura actividad, sujeto a disponibilidad.",
						],
					},
				],
			},
			{
				type: "faq",
				kicker: "Preguntas frecuentes",
				title: "Todo lo que sueles querer saber",
				items: [
					{ q: "¿Necesito saber nadar?", a: ["Para disfrutar las entradas de snorkel es recomendable saber nadar y sentirte cómodo en aguas abiertas. También puedes permanecer en la embarcación durante ciertos encuentros. Avísanos antes de reservar si alguien del grupo no sabe nadar para evaluar si la experiencia es adecuada."] },
					{ q: "¿Es obligatorio entrar al agua?", a: ["No. Buena parte del safari puede disfrutarse desde la embarcación; algunas observaciones incluso son mejores desde la superficie. Entrar al agua depende de tu comodidad, la especie, las condiciones y la evaluación del guía."] },
					{ q: "¿Está garantizado que veremos orcas?", a: ["No. Las orcas son animales silvestres y su presencia cambia diariamente. Hay temporadas con mejores posibilidades, pero ningún avistamiento específico puede garantizarse. La empresa que te diga que sí, te está mintiendo."] },
					{ q: "¿Podemos nadar con todos los animales?", a: ["No. La entrada al agua depende de la especie, su comportamiento, las condiciones, la seguridad y las regulaciones. El nado con ballenas y cachalotes no está permitido en aguas mexicanas. Nunca forzamos una interacción."] },
					{ q: "¿Cuál es la mejor temporada?", a: ["Depende de lo que más te interese. La primavera y el inicio del verano destacan por las agregaciones de móbulas; en los meses frescos pueden aparecer distintas ballenas. Delfines, lobos marinos y aves pueden encontrarse gran parte del año."] },
					{ q: "¿Pueden participar niños?", a: ["En salidas compartidas la edad mínima es 14 años. Los menores de 14 pueden participar en un safari privado, donde el guía adapta el ritmo y les brinda mayor atención."] },
					{ q: "¿Qué pasa si me mareo?", a: ["Recomendamos desayunar ligero, mantenerte hidratado y tomar medidas preventivas si sueles marearte. Consulta con anticipación qué medicamento es adecuado para ti y sigue las indicaciones del producto o de tu médico."] },
					{ q: "¿Hay baño en la embarcación?", a: ["No. Recomendamos usar el sanitario antes de salir, ya que la experiencia dura aproximadamente seis horas."] },
					{ q: "¿Ofrecen transporte desde La Paz?", a: ["Sí. Podemos organizar transporte redondo por $1,000 MXN adicionales para un máximo de cuatro personas. Debe solicitarse previamente y está sujeto a disponibilidad."] },
					{ q: "¿Qué pasa si no como pescado o camarón?", a: ["Avísanos antes de la salida para revisar otras opciones. También puedes llevar tus propios snacks. Cualquier alergia debe comunicarse con anticipación."] },
					{ q: "¿Cuándo recibiré mis fotos y videos?", a: ["Normalmente entre 1 y 3 días después del safari, mediante el canal acordado con el equipo."] },
					{ q: "¿Puedo llevar mi cámara?", a: ["Sí, bajo tu responsabilidad. Recomendamos protegerla del agua y sujetarla bien. El espacio es limitado, así que avísanos si llevarás equipo grande; una GoPro, Insta360 o cámara compacta no representan problema."] },
				],
			},
			{
				type: "mediaBanner",
				media: { suggest: "Atardecer en el regreso a La Ventana: siluetas de los viajeros en la lancha contra el cielo naranja." },
				quote: "No siempre puedes elegir el momento que te marcará. Pero casi siempre sales queriendo volver.",
			},
			{
				type: "prose",
				ink2: true,
				kicker: "Siendo agua y tierra",
				heading: "No solo queremos que veas animales. Queremos que entiendas por qué están aquí.",
				paragraphs: [
					"Keabelmet nació de la curiosidad por descubrir qué sucede donde el desierto se encuentra con el mar. Por eso nuestras salidas las guían personas que aman la aventura, pero también conocen la biología y el comportamiento de la fauna que buscamos.",
					"Un delfín no es solamente una aleta junto a la lancha. Una móbula no es solamente un salto. Una ballena no es solamente una fotografía. Cada comportamiento cuenta una historia —y cuando entiendes lo que estás viendo, el encuentro se vuelve todavía más poderoso.",
				],
			},
			{
				type: "finalCta",
				image: "/images/orca-safari.jpg",
				alt: "Móbulas y delfines en La Ventana",
				title: "Puede que salgas buscando orcas o móbulas. Puede que el mar tenga otros planes.",
				text: "Esa es la parte emocionante. Cuéntanos cuándo visitas Baja California Sur y te ayudamos a elegir el mejor momento para vivir tu Ocean Safari en La Ventana e Isla Cerralvo.",
				primaryLabel: "Consultar disponibilidad",
				primaryWa: "Hola! quiero consultar disponibilidad para el Ocean Safari La Ventana",
				secondaryLabel: "Ver todas las expediciones",
				secondaryHref: "/#expediciones",
			},
		],
	},
}
