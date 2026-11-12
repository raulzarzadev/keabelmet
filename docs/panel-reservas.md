# Panel de reservas

**https://www.keabelmet.com/panel-reservas** (privado, no aparece en Google)

Sirve para ver disponibilidad, cupos y logística de todas las reservas:

- **Calendario del mes:** cada día muestra las expediciones con personas. Si se pasa del cupo por salida, también muestra 🚤 con el número de salidas, y ⚠ si es fuera de temporada.
- **Ficha del día:** por expedición se ven las personas, cuántas salidas hacen falta (cupo de `lib/expedition-seasons.ts`), los lugares libres, los capitanes asignados y quién pidió transporte.
- **Lista:** las mismas columnas del Excel (pago completo, anticipo, liquidado, por liquidar, guía, capitán, transporte).
- **Descargar Excel:** el mismo formato del archivo del equipo, 3 meses a partir del mes que estás viendo.

## Cómo entran las reservas

- **Pagadas en la página:** entran solas. El webhook de Stripe las guarda al confirmarse el pago. Además, el panel revisa Stripe al abrirse (máximo cada 5 min, o con "Revisar pagos") por si alguna se escapó.
  - Reserva de una actividad: un renglón pagado completo.
  - Carrito con anticipo: un renglón por actividad; el anticipo y el saldo van en el primero.
  - Deal personalizado: un renglón con el título y las líneas del deal en notas. Ahí hay que ajustar fechas y personas a mano.
- **Efectivo, WhatsApp, amigos:** "+ Nueva reserva".
- **Cambios de fecha, personas o capitán:** se editan en el panel. La revisión de Stripe nunca sobrescribe lo editado, solo agrega pagos nuevos.
- **Cancelar:** una reserva de la página se marca como cancelada (no reembolsa nada en Stripe); una manual se borra.

## Configuración (una sola vez)

1. **Base de datos:** si ya conectaste Upstash para el bot de WhatsApp, no hay que hacer nada. Si no: Vercel → Storage → Marketplace → Upstash for Redis → conectar al proyecto → redeploy.
2. **Contraseña:** es `DEAL_ADMIN_KEY`, la misma de /arma-deal. Para una distinta, define `RESERVAS_PANEL_KEY` en Vercel.
3. **Importar el Excel:** entra al panel e importa el Excel de actividades.
   - Los pagos de la página anteriores a la última vez que guardaste el archivo se toman del Excel; los posteriores entran desde Stripe.
   - Volver a importar reemplaza solo lo importado antes.

## Archivos

| Archivo | Qué hace |
|---|---|
| `lib/bookings.ts` | Modelo, Redis, conversión de pagos de Stripe y sincronización |
| `lib/bookings-excel.ts` | Importar y exportar el Excel con el formato del equipo |
| `lib/kv.ts` | Cliente REST de Upstash |
| `lib/reservas-auth.ts` | Contraseña y cookie del panel |
| `app/api/reservas/*` | API del panel (lista y edición, importar, descargar Excel) |
| `components/ReservasPanel.tsx` | Interfaz |
| `app/api/stripe-webhook/route.ts` | Registra cada pago en el panel |
