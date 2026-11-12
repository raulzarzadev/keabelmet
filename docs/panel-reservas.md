# Panel de reservas

**https://www.keabelmet.com/panel-reservas** (privado, no aparece en Google)

Sirve para ver disponibilidad, cupos y logística de todas las reservas:

- **Calendario del mes:** cada día muestra las expediciones con personas. Si se pasa del cupo por salida, también muestra 🚤 con el número de salidas, y ⚠ si es fuera de temporada.
- **Ficha del día:** por expedición se ven las personas, cuántas salidas hacen falta (cupo de `lib/expedition-seasons.ts`), los lugares libres, los capitanes asignados y quién pidió transporte.
- **Lista:** las mismas columnas del Excel (pago completo, anticipo, liquidado, por liquidar, guía, capitán, transporte).
- **Descargar Excel:** el mismo formato del archivo del equipo, 3 meses a partir del mes que estás viendo.

## Finanzas e inventario

- **Costo por reserva:** cada reserva lleva **Costo** (lo que se le paga al proveedor o capitán). La lista muestra costo y utilidad.
- **Pestaña Finanzas** (por año):
  - Ventas, pagado a proveedores, utilidad, margen, gastos de equipo, por cobrar y ticket promedio.
  - Tabla mes por mes.
  - Reparto de utilidades con porcentajes editables.
  - Avance de la meta (pickup) y escenarios.
  - Lista de gastos: agregar, editar y borrar.
  - La utilidad solo cuenta reservas con costo capturado; las que no lo tienen se avisan aparte.
- **Pestaña Inventario:** artículos con categoría, cantidad, estado, ubicación y descripción. Avisa de lo que está en mantenimiento o crítico.
- **Importar el libro "Presupuesto Keabelmet 20XX":** con el mismo botón "Importar Excel", sin cambiarle nada al archivo.
  - Las ventas de Ingresos anteriores a la primera reserva del panel entran como historial, con su costo y proveedor.
  - Las que ya están en el panel no se duplican: solo les pone el costo y el proveedor.
  - También trae los gastos, el inventario y los % de reparto y la meta.
  - Volver a importar reemplaza solo lo que vino del libro.

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
