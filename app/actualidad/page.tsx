import Link from 'next/link'
import { ContentPage, SectionBlock, DemoNotice } from '@/components/content-page'
import { createClient } from '@/lib/supabase/server'

const fallbackPosts = [{ slug: 'derecho-inmobiliario', category: 'Derecho inmobiliario', title: 'Lo que debes revisar antes de comprar una propiedad' }, { slug: 'gestion-vacacional', category: 'Gestión vacacional', title: 'Claves para gestionar mejor una propiedad vacacional' }, { slug: 'patrimonio-tarragona', category: 'Patrimonio', title: 'Decisiones patrimoniales en Tarragona' }]

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = Math.max(1, Number((await searchParams).page ?? '1') || 1)
  const perPage = 5
  const from = (page - 1) * perPage
  const supabase = await createClient()
  const { data, count } = await supabase.from('editorial_posts').select('slug, category, title, excerpt, published_at, featured', { count: 'exact' }).eq('status', 'publicado').not('published_at', 'is', null).order('featured', { ascending: false }).order('published_at', { ascending: false }).range(from, from + perPage - 1)
  const posts = data?.length ? data : page === 1 ? fallbackPosts : []
  const pageCount = Math.max(1, Math.ceil((count ?? 0) / perPage))

  return <ContentPage eyebrow="Actualidad" title={<>Ideas para decidir <em>mejor.</em></>} intro="Análisis jurídico, inmobiliario y patrimonial para tomar decisiones con criterio."><SectionBlock title="Últimos artículos"><div className="blog-list">{posts.map(post => <article key={post.slug}><p className="eyebrow">{post.category}</p><h3>{post.title}</h3>{'excerpt' in post && post.excerpt && <p>{post.excerpt}</p>}{data?.length ? <Link className="text-link" href={`/actualidad/${post.slug}`}>Leer artículo</Link> : null}</article>)}</div>{!data?.length && page === 1 && <DemoNotice>Estamos preparando nuevos artículos para la próxima edición de Actualidad Grup RA.</DemoNotice>}<div className="pagination">{Array.from({ length: pageCount }, (_, index) => <Link aria-current={page === index + 1 ? 'page' : undefined} key={index + 1} href={`/actualidad?page=${index + 1}`}>{index + 1}</Link>)}</div></SectionBlock></ContentPage>
}
