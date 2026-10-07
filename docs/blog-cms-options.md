# Grup RA — análisis previo de CMS para Blog

## Estado actual

El proyecto usa Next.js App Router y no tiene CMS conectado. El Blog ya dispone de rutas públicas estructurales (`/blog` y `/blog/[slug]`) con contenido demo, categorías, paginación conceptual y enlaces internos.

## Requisitos

- Publicación sin tocar código.
- Administración privada separada del frontend público.
- Artículos demo reemplazables por contenido de NotebookLM.
- Categorías, destacados, relaciones, SEO, Open Graph, schema Article y sitemap.
- Sin instalar ni conectar servicios con coste o credenciales sin aprobación.

## Opciones consideradas

### 1. Sanity

Ventajas: excelente editor estructurado, Portable Text, referencias, preview y buen encaje con Next.js. Permite modelar artículos, autores, categorías, SEO y destacados con precisión.

Implicaciones: requiere proyecto externo, credenciales y definir el flujo de publicación. Debe aprobarse antes de conectar.

### 2. Storyblok

Ventajas: editor visual y componentes reutilizables.

Implicaciones: introduce una capa visual adicional y credenciales externas; puede ser más de lo necesario para un blog editorial estructurado.

### 3. Contentful

Ventajas: CMS SaaS sólido, modelos estructurados y API estable.

Implicaciones: requiere configuración externa, variables y posible coste según uso.

### 4. MDX/Git

Ventajas: sin servicio externo, control total y coste cero.

Implicaciones: no cumple la publicación sin tocar código; queda descartado como solución final.

### 5. Supabase como CMS privado

Ventajas: reutiliza infraestructura existente y permite separar tablas de contenido con RLS.

Implicaciones: habría que construir administración, autenticación, editor y workflow; no conviene desarrollar ahora un backoffice propio.

## Recomendación

No conectar todavía ningún CMS. La arquitectura pública está preparada para recibir una fuente editorial futura mediante una capa de repositorio. Cuando se apruebe un proveedor, la opción inicial recomendada es Sanity por su modelado estructurado y su integración con Next.js.

La decisión requiere aprobación explícita porque implica servicio externo, credenciales y potenciales costes. Hasta entonces, el contenido demo debe permanecer claramente marcado como provisional.
