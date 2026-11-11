# Asistente de WhatsApp (bot con Claude)

Contesta en el WhatsApp Business del **612** (en coexistencia: la app sigue funcionando igual), cotiza con los precios del sitio, manda el link de anticipo (20 %) y le pasa la conversación al equipo cuando algo se sale de lo normal.

## Cómo funciona

```
Cliente ──WhatsApp──▶ Meta ──webhook──▶ /api/whatsapp/webhook/<clave secreta>
                                              │  guarda el mensaje (Upstash Redis)
                                              │  espera 6 s por si llegan más mensajes seguidos
                                              ▼
                                        Claude (claude-opus-5-5) + 4 herramientas
                                          · revisar_fechas     → temporada, calendario de salidas y clima (Open-Meteo + link Windy)
                                          · cotizar            → precios del catálogo, paquetes, temporada, cupo, choques de logística
                                          · enviar_link_anticipo → link /api/pago/<id> → página /deal firmada
                                          · pasar_a_humano     → pausa el bot en ese chat + correo al equipo
                                              │
                                              ▼
                                  Dualhook (API compatible con Meta) ──▶ Cliente
```

- **Precios:** el modelo nunca escribe montos; los calcula el servidor con las tarjetas de precio de cada expedición (las mismas que valida el cobro). Opciones "a cotizar" (privados, grupos grandes) se pasan al equipo.
- **Tú en la app:** si contestas desde la app de WhatsApp Business, el bot se calla en ese chat por 12 h (ajustable en el panel).
- **Avisos por correo** (a `OWNER_NOTIFY_EMAIL` / contacto@keabelmet.com): cada link de anticipo enviado y cada chat que necesita a una persona. El pago confirmado ya avisa como siempre (Stripe).
- **Panel privado:** https://www.keabelmet.com/panel-whatsapp. Ahí ves las conversaciones, enciendes o apagas el bot (en todos los chats o en uno solo) y contestas desde la web.

## Fechas, clima y logística

- **Clima:** para cada fecha (hasta 16 días adelante) el bot consulta viento, ráfagas, oleaje y lluvia en el punto de la actividad y en su horario, con **Open-Meteo** (gratis, mismos modelos que Windy: ECMWF, GFS, ICON). Califica el día como BUENO, MOVIDO o RIESGOSO y le manda al cliente el link de **Windy** de ese punto. Con RIESGOSO propone otra fecha o actividad (plan B); nunca cancela: la salida la decide el capitán.
  - Umbrales orientativos (`lib/whatsapp/weather.ts`): MOVIDO si viento > 12 nudos, ráfagas > 18 u olas > 1 m; RIESGOSO si viento > 18, ráfagas > 25 u olas > 1.8 m. Ajústalos ahí si los capitanes usan otros.
  - Puntos y horarios de cada actividad: `SPOTS` en el mismo archivo.
  - No se usa la API de Windy directo: la llave gratis devuelve datos alterados a propósito (solo para pruebas) y la real cuesta 990 € al año.
- **Disponibilidad (Google Calendar):** el bot lee el calendario de salidas del equipo. Cómo anotar los eventos:
  - `BLOQUEADO`, `CERRADO` o `SIN SALIDAS` → ese día no se ofrece nada. Si el evento nombra una actividad (p. ej. "Pulmo BLOQUEADO"), solo esa.
  - Actividad + `LLENO` (p. ej. "Tiburón LLENO") → esa actividad ya no tiene lugar ese día.
  - Actividad + personas (p. ej. "Tiburón ballena – Familia Pérez 6 pax") → reserva existente; si el grupo nuevo no cabe en el máximo por salida, el bot lo pasa al equipo.
  - Palabras que reconoce por actividad: tiburón · espíritu santo / lobos · buceo la paz · discovery / bautizo · open water / certificación · ventana · pulmo · ballena gris / chale · magdalena / sardina.
  - No lee eventos recurrentes (repetidos): anota cada bloqueo por separado o como evento de varios días.
  - Los nombres de clientes del calendario nunca se le pasan a Claude.
- **Logística:** el bot sabe que Bahía Magdalena, Ballena gris y Cabo Pulmo ocupan el día completo, avisa si dos actividades caen el mismo día y ordena itinerarios de varios días. Traslados desde otras ciudades los pasa al equipo.
- **Ventas:** sugiere una vez el paquete con descuento cuando aplica y siempre cierra con un siguiente paso concreto.

## Configuración (una sola vez)

En este orden, para que Meta pueda verificar el webhook al conectar el número:

1. **Claude:** en https://console.anthropic.com crea una API key y agrégala en Vercel como `ANTHROPIC_API_KEY`.
2. **Base de datos:** en Vercel ve a Storage → Marketplace → **Upstash for Redis**, créala (el plan gratis alcanza) y conéctala al proyecto keabelmet. Se crean solas `KV_REST_API_URL` y `KV_REST_API_TOKEN`.
3. **Claves propias:** genera tres valores al azar y agrégalos en Vercel:
   - `WHATSAPP_WEBHOOK_KEY` (forma parte de la URL secreta del webhook)
   - `WHATSAPP_VERIFY_TOKEN`
   - `WHATSAPP_PANEL_KEY` (la contraseña del panel)

   Para generar cada valor:
   ```bash
   node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
   ```
4. **Publica** el sitio con estas variables (redeploy en Vercel).
5. **Dualhook** (https://dualhook.com, plan Developer: USD 12 al mes, con 14 días de prueba):
   1. Crea una conexión. Como URL del webhook pon `https://www.keabelmet.com/api/whatsapp/webhook/<WHATSAPP_WEBHOOK_KEY>` y como token de verificación tu `WHATSAPP_VERIFY_TOKEN`.
   2. En el registro de Meta (Embedded Signup), elige **conectar tu app de WhatsApp Business existente**. Luego escanea el QR desde el teléfono del 612: en la app, Ajustes → Herramientas para la empresa (o Cuenta) → Plataforma para empresas.
   3. Copia tres datos de la conexión a Vercel: la clave `dh_live_…` como `WHATSAPP_API_TOKEN`, el **Phone Number ID** como `WHATSAPP_PHONE_NUMBER_ID` y el **WABA ID** como `WHATSAPP_WABA_ID`. Después haz redeploy.
6. **Calendario de salidas:** en Google Calendar abre la configuración del calendario donde anotan salidas → *Integrar el calendario* → copia la **Dirección secreta en formato iCal** y agrégala en Vercel como `GOOGLE_CALENDAR_ICS_URL` (redeploy). Sin ella el bot funciona igual, pero dice que el equipo confirma el lugar después del anticipo.
7. **Prueba:** escríbele al 612 desde otro teléfono y revisa el panel.

Para apagarlo de golpe usa el botón "🤖 Bot encendido" del panel. Para desconectarlo del todo, borra `ANTHROPIC_API_KEY` en Vercel.

## Límites de la coexistencia (reglas de Meta)

- Abre la app de WhatsApp Business en el teléfono **al menos cada 13 días**; si no, Meta desconecta la API.
- Los chats de grupo no se sincronizan. Los mensajes temporales, las listas de difusión y los dispositivos vinculados (WhatsApp Web, otros teléfonos) se desactivan; la app en el teléfono principal sigue funcionando.
- Se sincroniza hasta 6 meses de historial al conectar.
- Fuera de las 24 h desde el último mensaje del cliente, WhatsApp solo permite plantillas aprobadas: el panel bloquea el envío y hay que escribir desde la app.
- Confirma con Dualhook durante la prueba que la coexistencia esté disponible para números de México.

## Costos aproximados

- **Dualhook:** USD 12 al mes y sin cobro por mensaje.
- **Meta:** contestar dentro de la ventana de 24 h que abre el cliente no se cobra.
- **Claude Opus 5.5:** unos USD 0.03–0.06 por respuesta. El catálogo (~8 k tokens) va en caché, así que 1,000 respuestas al mes ≈ USD 30–60.
- **Upstash:** el plan gratis basta.

## Archivos

| Archivo | Qué hace |
|---|---|
| `lib/whatsapp/agent.ts` | Prompt, herramientas y bucle con Claude |
| `lib/whatsapp/dates.ts`, `weather.ts`, `availability.ts` | Herramienta revisar_fechas: clima, calendario y temporada |
| `lib/whatsapp/catalog.ts` | Catálogo para el prompt, cotización y link de anticipo |
| `lib/whatsapp/store.ts` | Conversaciones, mensajes, pausas y links cortos en Redis |
| `lib/whatsapp/send.ts` | Envío por la API (Dualhook o Meta directo con `WHATSAPP_API_BASE`) |
| `app/api/whatsapp/webhook/[key]/route.ts` | Webhook: mensajes, ecos de la app, debounce y candado por chat |
| `app/api/whatsapp/admin/route.ts`, `components/WhatsAppPanel.tsx` | Panel privado |
| `app/api/pago/[id]/route.ts` | Link corto de pago |

**Seguridad del webhook:** con Dualhook, Meta firma los webhooks con el secreto de la app de Dualhook, que no se comparte. Por eso, como recomienda Dualhook, se validan tres cosas: la URL secreta, el WABA ID y el Phone Number ID. Si algún día se usa una app propia de Meta, `WHATSAPP_APP_SECRET` activa además la verificación de la firma `X-Hub-Signature-256`.
