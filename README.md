# Grup RA · web grupra.es

Next.js (App Router) + Supabase + Resend, desplegado en Vercel.

**Antes de tocar nada, lee `docs/REGLAS-DEL-PROYECTO.md` y `docs/ARQUITECTURA-SEO.md`.**

- `docs/ARQUITECTURA-SEO.md`: fuente de verdad del motor SEO (servicios, temáticas, URLs, enlazado).
- `docs/REGLAS-DEL-PROYECTO.md`: reglas de trabajo para cualquier persona o IA que modifique el proyecto.
- `docs/DESPLIEGUE.md`: variables de entorno, migraciones de Supabase, Vercel y DNS.
- `lib/taxonomy.ts`: taxonomía en código (servicios y temáticas).
- `lib/editors.ts`: editores del panel `/admin/blog` y nombres públicos de autor.
- `supabase/migrations/`: migraciones SQL (se ejecutan a mano en el SQL Editor de Supabase).

```bash
pnpm install
pnpm dev
```
