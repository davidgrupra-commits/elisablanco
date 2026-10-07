import { createClient } from '@/lib/supabase/server'

const legacyColumns = 'slug, title, excerpt, content, category, author, cover_image_url, seo_title, seo_description, published_at'
const extendedColumns = `${legacyColumns}, type, topic, service, reviewed_by, reviewed_at`

export type PublicPost = {
  slug: string; title: string; excerpt: string | null; content: string; category: string; author: string
  cover_image_url: string | null; seo_title: string | null; seo_description: string | null; published_at: string
  type?: 'guia' | 'noticia' | null; topic?: string | null; service?: string | null; reviewed_by?: string | null; reviewed_at?: string | null
}

// Si la migración de taxonomía aún no está aplicada, cae a las columnas antiguas para no romper los artículos.
export async function getPublishedPost(slug: string): Promise<PublicPost | null> {
  const supabase = await createClient()
  const run = (columns: string) => supabase.from('editorial_posts').select(columns).eq('slug', slug).eq('status', 'publicado').not('published_at', 'is', null).maybeSingle()
  const first = await run(extendedColumns)
  if (!first.error) return (first.data as unknown as PublicPost | null)
  const retry = await run(legacyColumns)
  return (retry.data as unknown as PublicPost | null)
}

export async function getRelatedPosts(post: { slug: string; topic?: string | null; category: string }) {
  const supabase = await createClient()
  const base = () => supabase.from('editorial_posts').select('slug, title, category, excerpt').eq('status', 'publicado').not('published_at', 'is', null).neq('slug', post.slug).order('published_at', { ascending: false }).limit(3)
  if (post.topic) {
    const byTopic = await base().eq('topic', post.topic)
    if (!byTopic.error && byTopic.data?.length) return byTopic.data
  }
  const byCategory = await base().eq('category', post.category)
  return byCategory.data ?? []
}

export const readingMinutes = (content: string) => Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 200))
