/** Textos de la portada del blog y de las páginas de tema. */
import type { BlogLocale } from "./types"

export const blogCopy: Record<
	BlogLocale,
	{
		kicker: string
		title: string
		sub: string
		min: string
		metaTitle: string
		metaDesc: string
		topics: string
		latest: string
		articles: (n: number) => string
		placeholder: string
		results: (n: number, q: string) => string
		none: (q: string) => string
		try: string
		clear: string
		suggestions: string[]
	}
> = {
	es: {
		kicker: "Blog Keabelmet",
		title: "Todo lo que quieres saber antes de lanzarte al Mar de Cortés",
		sub: "Respuestas claras, con fotos reales y respaldadas por ciencia, a las preguntas que todo viajero se hace sobre La Paz y Baja California Sur: fauna, temporadas, lugares, buceo y cómo planear tu viaje.",
		min: "min",
		metaTitle: "Blog de fauna marina de La Paz y la Baja",
		metaDesc: "Guías con base científica sobre el Mar de Cortés: cuándo ver tiburón ballena, ballena gris y lobos marinos, el Sardine Run, buceo y cómo planear tu viaje.",
		topics: "Explora por tema",
		latest: "Artículos más recientes",
		articles: (n) => `${n} ${n === 1 ? "artículo" : "artículos"}`,
		placeholder: "Busca un tema: tiburón ballena, temporada, buceo…",
		results: (n, q) => `${n} ${n === 1 ? "artículo" : "artículos"} sobre “${q}”`,
		none: (q) => `No encontramos artículos sobre “${q}”. Prueba con otra palabra o explora los temas.`,
		try: "Prueba:",
		clear: "Borrar búsqueda",
		suggestions: ["tiburón ballena", "ballena gris", "Sardine Run", "lobos marinos", "buceo", "Espíritu Santo", "temporada"],
	},
	en: {
		kicker: "Keabelmet Blog",
		title: "Everything you want to know before diving into the Sea of Cortez",
		sub: "Clear, science-backed answers with real photos to the questions every traveler asks about La Paz and Baja California Sur: wildlife, seasons, places, diving and how to plan your trip.",
		min: "min",
		metaTitle: "La Paz & Baja Marine Wildlife Blog",
		metaDesc: "Science-backed guides to the Sea of Cortez: when to see whale sharks, gray whales and sea lions, the Sardine Run, diving and how to plan your trip.",
		topics: "Explore by topic",
		latest: "Latest articles",
		articles: (n) => `${n} ${n === 1 ? "article" : "articles"}`,
		placeholder: "Search a topic: whale shark, season, diving…",
		results: (n, q) => `${n} ${n === 1 ? "article" : "articles"} about “${q}”`,
		none: (q) => `We couldn't find articles about “${q}”. Try another word or browse the topics.`,
		try: "Try:",
		clear: "Clear search",
		suggestions: ["whale shark", "gray whale", "Sardine Run", "sea lions", "diving", "Espíritu Santo", "season"],
	},
}
