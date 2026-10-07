import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/content-page'
import { ArticleBody, splitFaq } from '@/components/article-body'
import { LeadCapture } from '@/components/content-page'
import { getPublishedPost, getRelatedPosts, readingMinutes } from '@/lib/posts'
import { reviewer } from '@/lib/editors'
import { JsonLd } from '@/components/json-ld'
import { SITE_URL } from '@/lib/site'
import { leadTypeForService, services, topicBySlug, type ServiceSlug } from '@/lib/taxonomy'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  const title = post?.seo_title ?? post?.title ?? 'Actualidad | Grup RA'
  const description = post?.seo_description ?? post?.excerpt ?? 'Actualidad inmobiliaria y jurídica de Grup RA.'
  if (!post) return { title, description }
  return {
    title, description,
    openGraph: { type: 'article', locale: 'es_ES', siteName: 'Grup RA', url: `/actualidad/${post.slug}`, title, description, publishedTime: post.published_at, authors: [post.author], ...(post.cover_image_url ? { images: [post.cover_image_url] } : { images: [{ url: '/og-grup-ra.jpg', width: 1200, height: 630 }] }) },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) notFound()
  const related = await getRelatedPosts(post)
  const { body, faq } = splitFaq(post.content)
  const serviceSlug = (post.service ?? (post.topic ? topicBySlug(post.topic)?.primaryService : undefined)) as ServiceSlug | undefined
  const service = serviceSlug ? services[serviceSlug] : undefined
  const date = new Date(post.published_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  const reviewedLabel = post.reviewed_by ? `Revisado jurídicamente por ${reviewer.name}, ${reviewer.title}${reviewer.barNumber ? ` colegiada n.º ${reviewer.barNumber}` : ''}${reviewer.bar ? ` (${reviewer.bar})` : ''}` : null

  const url = `${SITE_URL}/actualidad/${post.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BlogPosting', '@id': `${url}#article`, mainEntityOfPage: url, headline: post.title, description: post.seo_description ?? post.excerpt ?? undefined, datePublished: post.published_at, author: { '@type': 'Person', name: post.author }, publisher: { '@id': `${SITE_URL}/#organization` }, image: post.cover_image_url ?? `${SITE_URL}/og-grup-ra.jpg`, inLanguage: 'es', articleSection: post.category },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Actualidad', item: `${SITE_URL}/actualidad` }, { '@type': 'ListItem', position: 3, name: post.title, item: url }] },
    ],
  }

  return <ContentPage eyebrow={`Actualidad · ${post.category}`} title={<>{post.title}</>} intro={post.excerpt ?? ''}>
    <JsonLd data={articleSchema} />
    <section className="content-section"><div className="container narrow">
      <p className="article-meta">Por {post.author} · {date} · {readingMinutes(post.content)} min de lectura</p>
      {reviewedLabel && <p className="article-review">{reviewedLabel}</p>}
      <article className="article-content"><ArticleBody content={body} id={post.slug} /></article>
      <div className="article-embed"><LeadCapture type={leadTypeForService(serviceSlug)} title={service ? `¿Necesitas ayuda con esto? · ${service.title}` : '¿Hablamos de tu caso?'} />{service && <p><Link className="text-link" href={service.href}>Conocer {service.title}</Link></p>}</div>
      {faq && <article className="article-content article-faq"><ArticleBody content={faq} id={`${post.slug}-faq`} /></article>}
      {related.length > 0 && <div className="article-related"><h2>Te puede interesar</h2><div className="blog-list">{related.map(item => <article key={item.slug}><p className="eyebrow">{item.category}</p><h3>{item.title}</h3><Link className="text-link" href={`/actualidad/${item.slug}`}>Leer artículo</Link></article>)}</div></div>}
    </div></section>
  </ContentPage>
}
