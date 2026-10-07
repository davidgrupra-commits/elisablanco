# Reglas del proyecto (obligatorias para cualquier IA o persona)

Este es un proyecto en marcha: **no se reconstruye, se continúa**. El propietario decide lo estructural.

## 1. No introducir divergencia
- No reemplazar una implementación existente solo porque se prefiera otra.
- No eliminar funcionalidad, rutas, redirecciones ni textos sin autorización.
- No cambiar arquitectura, lenguaje visual (paleta dorada #E1AD01, grafito, DM Sans) ni estructura de URLs sin proponerlo antes.
- Una mejor idea técnica es una **propuesta**: explicar qué cambia, por qué, qué afecta y si es reversible, y esperar autorización.
- No reescribir archivos enteros para retocarlos; cambios pequeños, reversibles y con commits descriptivos por tema.

## 2. Fuentes de verdad
- `docs/ARQUITECTURA-SEO.md`: servicios, temáticas, URLs, enlazado, autoría.
- `lib/taxonomy.ts` y `lib/editors.ts`: taxonomía y editores.
- Figma / diseño entregado: referencia visual, no código a copiar.
- `docs/auditorias/`: histórico, **no** estado actual.

## 3. Decisiones ya tomadas
- Dominio principal: https://www.grupra.es (definido solo en `lib/site.ts`). advocadarealestate.es solo para inmuebles (EGO CRM); no se migra EGO ni se replican sus fichas.
- "Nuestras Propiedades" enlaza al listado de EGO; `/inmuebles` redirige (301).
- Noticias en `/actualidad` (`/blog` redirige). Guías dentro de su hub. Hubs sin publicar hasta tener contenido propio y revisado.
- Overseas es servicio propio en `/overseas`; la inversión conjunta es off-market: solo mención y formulario de contacto.
- Contacto público: dos emails (info@grupra.es e info@advocadarealestate.es) desde `lib/contact.ts`; el de advocada se retirará más adelante.
- Todos los editores pueden publicar; solo los artículos de Elisabet Reyes Blanco (abogada) llevan el sello de revisión jurídica. El colegio y el nº de colegiada no se muestran hasta que existan.
- Los formularios embebidos en artículos son los mismos componentes del resto de la web.
- Check-in: sistema externo (otro repositorio/cuenta); solo se enlaza desde Gestión vacacional (`lib/links.ts`).

## 4. Nunca inventar
Datos legales, números de colegiada, métricas, propiedades, precios, testimonios ni cifras. Si falta un dato: `[PENDIENTE]`.

## 5. Seguridad
Nunca escribir ni commitear `.env`, claves, tokens ni contraseñas. Solo nombres de variables.
No crear tablas ni columnas sin una migración SQL en `supabase/migrations/`.
No añadir dependencias sin avisar.

## 6. Flujo de trabajo
Inspeccionar → inventariar → proponer → implementar lo aprobado. Tras cada cambio: `pnpm build` debe pasar y se explica cómo ver el resultado (preview de Vercel o capturas).
Clasificar la información como [CONFIRMADO], [IMPLEMENTADO], [PENDIENTE], [PROPUESTA] o [INFERENCIA]. No presentar una propuesta como decisión.
