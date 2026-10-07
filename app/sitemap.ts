import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

// Solo páginas con contenido propio. Las que aún son borrador no entran (evita contenido pobre en Google).
const livePages = ['', '/despacho-juridico', '/vende-con-garantias', '/gestion-vacacional', '/gestion-vacacional/gestion-de-propiedades', '/inversion', '/contacto', '/actualidad']
// Añadir a livePages cuando tengan contenido real y revisado:
// '/overseas', '/socios', '/quienes-somos', '/gestion-vacacional/nuestros-apartamentos', '/gestion-vacacional/checkin-online', '/aviso-legal', '/privacidad', '/cookies'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = livePages.map(path => ({ url: `${SITE_URL}${path}`, changeFrequency: 'monthly', priority: path === '' ? 1 : 0.7 }))
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('editorial_posts').select('slug, published_at, updated_at').eq('status', 'publicado').not('published_at', 'is', null)
    const posts: MetadataRoute.Sitemap = (data ?? []).map(post => ({ url: `${SITE_URL}/actualidad/${post.slug}`, lastModified: new Date(post.updated_at ?? post.published_at), changeFrequency: 'monthly', priority: 0.6 }))
    return [...pages, ...posts]
  } catch {
    return pages
  }
}
