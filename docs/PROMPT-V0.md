# Prompt para v0 (pegar en el primer chat del proyecto importado)

Estás trabajando en el proyecto web **Grup RA (grupra.es)**, un Next.js con App Router, Supabase y Resend que ya está muy avanzado. **No lo reconstruyas ni lo simplifiques**: tu trabajo es continuarlo sin introducir divergencias.

**Antes de hacer nada, lee estos archivos del repositorio, en este orden:**
1. `docs/REGLAS-DEL-PROYECTO.md` (reglas obligatorias y decisiones ya tomadas)
2. `docs/ARQUITECTURA-SEO.md` (arquitectura de contenidos, URLs y enlazado)
3. `docs/DESPLIEGUE.md` (variables de entorno, migraciones y dominio)
4. `lib/taxonomy.ts`, `lib/editors.ts`, `lib/contact.ts`, `lib/links.ts`

**Primera misión (solo esto, sin tocar código de funcionalidad):**
1. Comprueba que el proyecto compila (`pnpm build`) y corrige únicamente errores de tipos o de build, con cambios mínimos.
2. Devuélveme un inventario breve: rutas, componentes principales, API, panel `/admin/blog`, y qué está implementado, parcial o pendiente.
3. Indica cualquier contradicción entre el código y `docs/ARQUITECTURA-SEO.md`. No la corrijas: avísame.
4. Dime cómo puedo ver el resultado (URL de preview de Vercel) antes de fusionar.

**Reglas que no se pueden saltar:**
- No cambies la estructura de URLs, las redirecciones de `next.config.mjs`, la paleta (#E1AD01 y grafito), la tipografía (DM Sans) ni los textos existentes sin que yo lo autorice.
- No elimines funcionalidad. No reescribas archivos enteros para retocarlos.
- No inventes datos legales, números de colegiada, cifras, propiedades ni precios. Si falta un dato, déjalo como `[PENDIENTE]`.
- No crees tablas ni columnas de Supabase sin una migración SQL en `supabase/migrations/`. No añadas dependencias sin avisarme.
- Nunca escribas claves ni valores de `.env`; solo nombres de variables.
- Si tienes una idea mejor, preséntala como **propuesta** (qué cambia, por qué, qué afecta, si es reversible) y espera mi aprobación.
- Cambios pequeños, reversibles y con commits descriptivos por tema. Cada entrega debe incluir cómo ver el resultado.

**Trabajo que vendrá después (no empieces sin que te lo pida):** páginas legales con los datos que te facilite, bloque técnico de SEO (dominio grupra.es, canonical, JSON-LD, sitemap con posts), hubs de temática y landings, y dashboard de leads/SEO.
