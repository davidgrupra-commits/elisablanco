# Despliegue

## 1. Variables de entorno (Vercel → Settings → Environment Variables)
Nombres en `.env.example`. Nunca se suben valores a GitHub ni se pegan en chats.

## 2. Supabase
Las tablas base (`leads`, `editorial_posts`, etc.) ya existen en el proyecto de Supabase actual y **no están versionadas en este repositorio**. Migraciones incluidas (ejecutar en el SQL Editor, en este orden, cada una es idempotente):
1. `supabase/migrations/20260929_rate_limits.sql`: rate limiting de `/api/leads`.
2. `supabase/migrations/20260929_editorial_taxonomy.sql`: tipo, temática, servicio y revisión en artículos; atribución en leads.

Antes de aplicar la segunda, el panel avisa de que la taxonomía no se guarda, pero no se rompe.
En Authentication: desactivar registros abiertos (el acceso al panel depende del email de sesión) y añadir `https://grupra.es` como Site URL.

## 3. Vercel y dominio
- Conectar este repositorio al proyecto de Vercel y marcar `main` como rama de producción.
- Domains: añadir `grupra.es` y `www.grupra.es` y copiar los registros que muestre Vercel (habitualmente A `@` → `76.76.21.21` y CNAME `www` → `cname.vercel-dns.com`).
- En IONOS: sustituir los registros A/AAAA antiguos de `@` y `www` por esos. **No tocar MX ni TXT** (correo).

## 4. SEO técnico (hecho en el código)
El dominio se define en **un solo sitio: `lib/site.ts`** (`https://www.grupra.es`; grupra.es redirige a www en Vercel). De ahí salen `metadataBase`, canonical por página (`alternates.canonical: './'` en el layout), `sitemap.ts` (páginas con contenido + artículos publicados de Supabase), `robots.ts` (bloquea `/admin` y `/api`), Open Graph por defecto (`public/og-grup-ra.jpg`) y por artículo, y JSON-LD (organización y sitio en el layout; artículo y migas en cada artículo).
Pendiente: dar de alta la web en Google Search Console, enviar `https://www.grupra.es/sitemap.xml` y añadir páginas al sitemap (`livePages` en `app/sitemap.ts`) cuando tengan contenido real.

## 5. Datos pendientes de Grup RA
Datos de empresa y registros, colegio y nº de colegiada, URL pública del check-in (`lib/links.ts`), aviso de responsabilidad y textos legales. No se inventan: se dejan marcados como [PENDIENTE].
