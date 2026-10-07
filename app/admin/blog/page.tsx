'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArticleBody, splitFaq } from '@/components/article-body'
import { reviewer } from '@/lib/editors'
import { leadTypeForService, services, topics, topicBySlug, type ServiceSlug } from '@/lib/taxonomy'
import { LeadCapture } from '@/components/content-page'

type Post = {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author?: string
  cover_image_url: string
  seo_title: string
  seo_description: string
  published_at: string | null
  featured: boolean
  status: 'borrador' | 'revisado' | 'publicado'
  type: 'guia' | 'noticia'
  topic: string
  service: string
  primary_keyword: string
  reviewed_by?: string | null
  legal_review?: boolean
}

type EditorInfo = { name: string; role: 'redactor' | 'revisora'; canPublish: boolean }

const emptyPost: Post = { slug: '', title: '', excerpt: '', content: '', category: '', cover_image_url: '', seo_title: '', seo_description: '', published_at: null, featured: false, status: 'borrador', type: 'noticia', topic: '', service: '', primary_keyword: '' }

const faqTemplate = '\n## Preguntas frecuentes\n### ¿Primera pregunta?\nRespuesta breve y útil.\n### ¿Segunda pregunta?\nRespuesta breve y útil.\n'

export default function AdminBlogPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [editor, setEditor] = useState<EditorInfo | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [form, setForm] = useState<Post>(emptyPost)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [migrationPending, setMigrationPending] = useState(false)
  const [preview, setPreview] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  async function load() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.email) { setLoading(false); return }
    setUserEmail(user.email)
    const response = await fetch('/api/admin/blog')
    if (response.ok) {
      const data = await response.json()
      setPosts(data.posts ?? [])
      setEditor(data.editor)
      setMigrationPending(Boolean(data.migrationPending))
    }
    setLoading(false)
  }

  useEffect(() => { void load() }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true); setMessage('')
    const response = await fetch('/api/admin/blog', { method: form.id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (response.ok) { setMessage('Artículo guardado correctamente.'); setForm(emptyPost); await load() }
    else { const data = await response.json().catch(() => null); setMessage(data?.error ?? 'No se pudo guardar el artículo.') }
    setSaving(false)
  }

  function insert(before: string, after = '', placeholder = '') {
    const area = contentRef.current
    const start = area?.selectionStart ?? form.content.length
    const end = area?.selectionEnd ?? form.content.length
    const selected = form.content.slice(start, end) || placeholder
    const next = form.content.slice(0, start) + before + selected + after + form.content.slice(end)
    setForm({ ...form, content: next })
    requestAnimationFrame(() => { area?.focus(); const cursor = start + before.length + selected.length + after.length; area?.setSelectionRange(cursor, cursor) })
  }

  function chooseTopic(slug: string) {
    const topic = topicBySlug(slug)
    setForm({ ...form, topic: slug, service: topic ? topic.primaryService : form.service })
  }

  if (loading) return <main className="admin-page"><p>Cargando panel…</p></main>
  if (!userEmail) return <Login />
  if (!editor) return <main className="admin-page"><div className="admin-shell"><p>Esta cuenta ({userEmail}) no tiene acceso al panel editorial.</p></div></main>

  const titleLength = (form.seo_title || form.title).length
  const descriptionLength = (form.seo_description || form.excerpt).length
  const selectedTopic = topicBySlug(form.topic)
  const previewParts = splitFaq(form.content)
  const previewService = (form.service || selectedTopic?.primaryService || undefined) as ServiceSlug | undefined
  const previewSeal = editor.role === 'revisora' && (form.legal_review ?? (form.id ? Boolean(form.reviewed_by) : true))
  const previewMinutes = Math.max(1, Math.round(form.content.split(/\s+/).filter(Boolean).length / 200))

  return <main className="admin-page"><div className="admin-shell">
    <header className="admin-header"><div><p className="eyebrow">GRUP RA · EDITORIAL</p><h1>Panel de Actualidad</h1><p>Sesión activa: {userEmail} · {editor.name}</p></div><button className="button button-dark" onClick={async () => { await createClient().auth.signOut(); window.location.reload() }}>Cerrar sesión</button></header>
    {migrationPending && <p className="admin-message admin-warning" role="alert">Falta aplicar la migración de taxonomía en Supabase: tipo, temática y servicio no se guardarán hasta entonces.</p>}
    <div className="admin-layout">
      <section className="admin-panel">
        <div className="admin-panel-heading"><h2>{form.id ? 'Editar artículo' : 'Nuevo artículo'}</h2>{form.id && <button className="text-link" onClick={() => setForm(emptyPost)}>Cancelar</button>}</div>
        <form className="admin-form" onSubmit={submit}>
          <label>Título (será el H1 de la página)<input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></label>
          <label>Slug (URL: minúsculas y guiones)<input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} pattern="[a-z0-9]+(-[a-z0-9]+)*" title="Solo minúsculas, números y guiones" required /></label>
          <div className="admin-form-grid">
            <label>Tipo<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Post['type'] })}><option value="noticia">Noticia (fechada)</option><option value="guia">Guía (evergreen)</option></select></label>
            <label>Temática<select value={form.topic} onChange={e => chooseTopic(e.target.value)}><option value="">— Sin temática —</option>{topics.map(topic => <option key={topic.slug} value={topic.slug}>{topic.title}{topic.published ? '' : ' (hub sin publicar)'}</option>)}</select></label>
          </div>
          <div className="admin-form-grid">
            <label>Servicio principal (CTA)<select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}><option value="">— Contacto general —</option>{Object.entries(services).map(([slug, service]) => <option key={slug} value={slug}>{service.title}</option>)}</select></label>
            <label>Categoría<input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required /></label>
          </div>
          {form.type === 'guia' && selectedTopic && !selectedTopic.published && <p className="admin-message admin-warning">Esta guía no se podrá publicar hasta que el hub “{selectedTopic.title}” esté publicado.</p>}
          <label>Palabra clave principal<input value={form.primary_keyword} onChange={e => setForm({ ...form, primary_keyword: e.target.value })} /></label>
          <label>Extracto<textarea rows={3} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></label>
          <div className="admin-toolbar" role="toolbar" aria-label="Formato del contenido">
            <button type="button" onClick={() => insert('\n## ', '\n', 'Subtítulo (H2)')}>H2</button>
            <button type="button" onClick={() => insert('\n### ', '\n', 'Subtítulo (H3)')}>H3</button>
            <button type="button" onClick={() => insert('**', '**', 'negrita')}>Negrita</button>
            <button type="button" onClick={() => insert('\n- ', '', 'elemento')}>Lista</button>
            <button type="button" onClick={() => insert('[', '](/contacto)', 'texto del enlace')}>Enlace</button>
            <button type="button" onClick={() => insert('\n[[calculadora-roi]]\n')}>CTA calculadora</button>
            <button type="button" onClick={() => insert('\n[[valoracion]]\n')}>CTA valoración</button>
            <button type="button" onClick={() => insert('\n[[consulta]]\n')}>CTA consulta</button>
            <button type="button" onClick={() => insert('\n[[contacto]]\n')}>CTA contacto</button>
            <button type="button" onClick={() => insert(faqTemplate)}>FAQs</button>
          </div>
          <label>Contenido (una línea = un párrafo; el título ya es el H1, usa H2 y H3)<textarea ref={contentRef} rows={14} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required /></label>
          <div className="admin-form-grid">
            <label>SEO title <small className={titleLength > 60 ? 'admin-over' : ''}>{titleLength}/60</small><input value={form.seo_title} onChange={e => setForm({ ...form, seo_title: e.target.value })} /></label>
            <label>SEO description <small className={descriptionLength > 155 ? 'admin-over' : ''}>{descriptionLength}/155</small><input value={form.seo_description} onChange={e => setForm({ ...form, seo_description: e.target.value })} /></label>
          </div>
          <div className="admin-serp" aria-label="Vista previa en Google"><span>grupra.es › actualidad › {form.slug || 'slug-del-articulo'}</span><strong>{(form.seo_title || form.title || 'Título del artículo').slice(0, 70)}</strong><p>{(form.seo_description || form.excerpt || 'Descripción del artículo que verá el lector en Google.').slice(0, 170)}</p></div>
          <label>Imagen de portada<input type="url" value={form.cover_image_url} onChange={e => setForm({ ...form, cover_image_url: e.target.value })} /></label>
          <div className="admin-controls">
            <label>Estado<select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Post['status'] })}><option value="borrador">Borrador</option><option value="revisado">Revisado</option><option value="publicado" disabled={!editor.canPublish}>Publicado</option></select></label>
            <label className="admin-check"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Destacado</label>
            {editor.role === 'revisora' && <label className="admin-check"><input type="checkbox" checked={form.legal_review ?? Boolean(form.reviewed_by)} onChange={e => setForm({ ...form, legal_review: e.target.checked })} /> Sello “Revisado jurídicamente” (abogada)</label>}
          </div>
          {!form.id && <small>Autor: {editor.name} (se asigna automáticamente con tu sesión).</small>}
          <div className="admin-actions"><button className="button button-dark" disabled={saving}>{saving ? 'Guardando…' : 'Guardar artículo'}</button><button type="button" className="button button-outline-dark" onClick={() => setPreview(!preview)}>{preview ? 'Ocultar vista previa' : 'Vista previa'}</button></div>
          {message && <p role="status" className="admin-message">{message}</p>}
        </form>
      </section>
      {preview ? <section className="admin-panel admin-preview">
        <div className="admin-panel-heading"><h2>Vista previa</h2><span>Así se verá en la web</span></div>
        <p className="eyebrow">Actualidad · {form.category || 'Categoría'}</p>
        <h1>{form.title || 'Título del artículo'}</h1>
        {form.excerpt && <p className="admin-preview-intro">{form.excerpt}</p>}
        <p className="article-meta">Por {form.id ? (form.author ?? editor.name) : editor.name} · {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} · {previewMinutes} min de lectura</p>
        {previewSeal && <p className="article-review">Revisado jurídicamente por {reviewer.name}, {reviewer.title}</p>}
        <article className="article-content"><ArticleBody content={previewParts.body || 'El contenido aparecerá aquí.'} id="preview" /></article>
        <div className="article-embed"><LeadCapture type={leadTypeForService(previewService)} title={previewService ? `¿Necesitas ayuda con esto? · ${services[previewService].title}` : '¿Hablamos de tu caso?'} /></div>
        {previewParts.faq && <article className="article-content article-faq"><ArticleBody content={previewParts.faq} id="preview-faq" /></article>}
      </section> : <section className="admin-panel">
        <div className="admin-panel-heading"><h2>Artículos</h2><span>{posts.length} total</span></div>
        <div className="admin-post-list">{posts.map(post => <article className="admin-post" key={post.id}>
          <div><p className="eyebrow">{post.status}{post.featured ? ' · destacado' : ''}{post.type ? ` · ${post.type}` : ''}</p><h3>{post.title}</h3><small>{post.category} · {post.author}{post.reviewed_by ? ` · revisado por ${post.reviewed_by}` : ''}</small></div>
          <button className="text-link" onClick={() => setForm({ ...emptyPost, ...post, excerpt: post.excerpt ?? '', cover_image_url: post.cover_image_url ?? '', seo_title: post.seo_title ?? '', seo_description: post.seo_description ?? '', topic: post.topic ?? '', service: post.service ?? '', primary_keyword: post.primary_keyword ?? '', type: post.type ?? 'noticia', legal_review: undefined })}>Editar</button>
        </article>)}</div>
      </section>}
    </div>
  </div></main>
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setMessage(''); const { error } = await createClient().auth.signInWithPassword({ email, password }); if (error) setMessage('Email o contraseña no válidos.'); else window.location.reload() }
  return <main className="admin-page"><form className="admin-login admin-panel" onSubmit={submit}><p className="eyebrow">GRUP RA · PRIVADO</p><h1>Acceso editorial</h1><label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label><label>Contraseña<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label><button className="button button-dark">Entrar</button>{message && <p role="alert" className="admin-message">{message}</p>}</form></main>
}
