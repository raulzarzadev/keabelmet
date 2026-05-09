"use client"

import { useEffect, useRef, useState } from "react"
import { WHATSAPP_DEFAULT_MESSAGE, buildWhatsAppLink } from "@/config/whatsapp"

const DEFAULT_MESSAGE = WHATSAPP_DEFAULT_MESSAGE

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(DEFAULT_MESSAGE)
  const containerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    textareaRef.current?.focus()
    const len = textareaRef.current?.value.length ?? 0
    textareaRef.current?.setSelectionRange(len, len)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const send = () => {
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer")
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Enviar mensaje por WhatsApp"
          className="w-72 sm:w-80 rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="bg-green-500 px-4 py-3 text-white">
            <p className="text-sm font-semibold">Chatea con nosotros</p>
            <p className="text-xs opacity-90">Te respondemos por WhatsApp</p>
          </div>
          <div className="p-3">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-300 p-2 text-sm text-gray-800 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder={DEFAULT_MESSAGE}
            />
            <button
              type="button"
              onClick={send}
              className="mt-2 w-full rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition-colors"
            >
              Enviar por WhatsApp
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat on WhatsApp"
        aria-expanded={open}
        className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-200"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-white stroke-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </button>
    </div>
  )
}
