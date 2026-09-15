import { formatDate, formatMxn, reservationWhatsAppLink } from "@/lib/reservation"

export interface VoucherData {
	folio: string
	expeditionName: string
	cardName: string
	dateISO: string
	people: number
	totalMxn: number
	locale: string
	status?: "succeeded" | "processing"
	includes?: string[]
	detailed?: { title: string; text: string }[]
	bring?: { name: string; items: string[] }[]
	info?: { label: string; value: string }[]
}

const copy: Record<string, {
	confirmed: string
	processing: string
	confirmedBody: string
	processingBody: string
	folio: string
	tour: string
	date: string
	people: string
	total: string
	emailNote: string
	waConfirm: string
	changeQ: string
	waChange: string
	requested: string
	includesTitle: string
	bringTitle: string
	infoTitle: string
}> = {
	es: {
		confirmed: "¡Reserva confirmada!",
		processing: "Pago en proceso",
		confirmedBody: "Guarda tu folio. Te enviaremos la confirmación por correo y coordinamos la fecha por WhatsApp.",
		processingBody: "Estamos confirmando tu pago. En cuanto se complete recibirás tu voucher por correo.",
		folio: "Folio de reserva",
		tour: "Expedición",
		date: "Fecha solicitada",
		people: "Personas",
		total: "Total pagado",
		emailNote: "La fecha es una solicitud; la confirmamos según disponibilidad.",
		waConfirm: "Enviar mi reserva por WhatsApp",
		changeQ: "¿Te equivocaste o necesitas cambiar la fecha?",
		waChange: "Cambiar o cancelar mi reserva",
		requested: "Solicitada",
		includesTitle: "Qué incluye tu experiencia",
		bringTitle: "Qué llevar",
		infoTitle: "Recomendaciones e información práctica",
	},
	en: {
		confirmed: "Reservation confirmed!",
		processing: "Payment processing",
		confirmedBody: "Save your reference. We'll email your confirmation and coordinate the date over WhatsApp.",
		processingBody: "We're confirming your payment. Once it's complete you'll get your voucher by email.",
		folio: "Booking reference",
		tour: "Expedition",
		date: "Requested date",
		people: "People",
		total: "Total paid",
		emailNote: "The date is a request; we confirm based on availability.",
		waConfirm: "Send my booking via WhatsApp",
		changeQ: "Made a mistake or need to change the date?",
		waChange: "Change or cancel my reservation",
		requested: "Requested",
		includesTitle: "What your experience includes",
		bringTitle: "What to bring",
		infoTitle: "Recommendations & practical info",
	},
	fr: {
		confirmed: "Réservation confirmée !",
		processing: "Paiement en cours",
		confirmedBody: "Conservez votre référence. Nous enverrons la confirmation par e-mail et coordonnerons la date sur WhatsApp.",
		processingBody: "Nous confirmons votre paiement. Une fois terminé, vous recevrez votre voucher par e-mail.",
		folio: "Référence de réservation",
		tour: "Expédition",
		date: "Date demandée",
		people: "Personnes",
		total: "Total payé",
		emailNote: "La date est une demande ; nous la confirmons selon les disponibilités.",
		waConfirm: "Envoyer ma réservation via WhatsApp",
		changeQ: "Une erreur ou besoin de changer la date ?",
		waChange: "Modifier ou annuler ma réservation",
		requested: "Demandée",
		includesTitle: "Ce que votre expérience inclut",
		bringTitle: "Quoi apporter",
		infoTitle: "Recommandations et infos pratiques",
	},
	zh: {
		confirmed: "预订已确认!",
		processing: "付款处理中",
		confirmedBody: "请保存您的编号。我们会通过电子邮件发送确认,并通过 WhatsApp 协调日期。",
		processingBody: "我们正在确认您的付款。完成后您将通过电子邮件收到凭证。",
		folio: "预订编号",
		tour: "探险项目",
		date: "申请日期",
		people: "人数",
		total: "已付总额",
		emailNote: "该日期为申请;我们将根据可用情况确认。",
		waConfirm: "通过 WhatsApp 发送我的预订",
		changeQ: "填错了或需要更改日期?",
		waChange: "更改或取消我的预订",
		requested: "已申请",
		includesTitle: "您的体验包含",
		bringTitle: "携带物品",
		infoTitle: "建议与实用信息",
	},
}

export default function Voucher({ data }: { data: VoucherData }) {
	const t = copy[data.locale] ?? copy.es
	const processing = data.status === "processing"
	const waConfirm = reservationWhatsAppLink(data, "confirm")
	const waChange = reservationWhatsAppLink(data, "change")

	return (
		<div className="voucher">
			<div className={`voucher-ic ${processing ? "wait" : "ok"}`}>{processing ? "⏳" : "✓"}</div>
			<h3 className="voucher-title">{processing ? t.processing : t.confirmed}</h3>
			<p className="voucher-lead">{processing ? t.processingBody : t.confirmedBody}</p>

			<div className="voucher-folio">
				<span>{t.folio}</span>
				<strong>{data.folio}</strong>
			</div>

			<dl className="voucher-rows">
				<div><dt>{t.tour}</dt><dd>{data.expeditionName} — {data.cardName}</dd></div>
				<div><dt>{t.date}</dt><dd>{formatDate(data.dateISO, data.locale)} <em>· {t.requested}</em></dd></div>
				<div><dt>{t.people}</dt><dd>{data.people}</dd></div>
				<div className="voucher-total"><dt>{t.total}</dt><dd>{formatMxn(data.totalMxn)} MXN</dd></div>
			</dl>

			<p className="voucher-note">{t.emailNote}</p>

			{(data.detailed?.length || data.includes?.length) && (
				<section className="voucher-sec">
					<h4>{t.includesTitle}</h4>
					{data.detailed?.length ? (
						<ul className="voucher-inc-detailed">
							{data.detailed.map((it) => (
								<li key={it.title}><strong>{it.title}</strong><span>{it.text}</span></li>
							))}
						</ul>
					) : (
						<ul className="voucher-inc">
							{data.includes!.map((it) => <li key={it}>{it}</li>)}
						</ul>
					)}
				</section>
			)}

			{data.bring?.length ? (
				<section className="voucher-sec">
					<h4>{t.bringTitle}</h4>
					<div className="voucher-bring">
						{data.bring.map((g) => (
							<div key={g.name} className="voucher-bring-g">
								<span className="voucher-bring-n">{g.name}</span>
								<ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
							</div>
						))}
					</div>
				</section>
			) : null}

			{data.info?.length ? (
				<section className="voucher-sec">
					<h4>{t.infoTitle}</h4>
					<dl className="voucher-info">
						{data.info.map((it) => (
							<div key={it.label}><dt>{it.label}</dt><dd>{it.value}</dd></div>
						))}
					</dl>
				</section>
			) : null}

			<a href={waConfirm} target="_blank" rel="noopener noreferrer" className="btn btn-teal voucher-wa">
				{t.waConfirm}
			</a>

			<div className="voucher-change">
				<span>{t.changeQ}</span>
				<a href={waChange} target="_blank" rel="noopener noreferrer">{t.waChange}</a>
			</div>
		</div>
	)
}
