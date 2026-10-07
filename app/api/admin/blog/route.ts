import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { findEditor, reviewer, type Editor } from '@/lib/editors'
import { services, topicBySlug } from '@/lib/taxonomy'

const baseFields = ['id', 'slug', 'title', 'excerpt', 'content', 'category', 'author', 'cover_image_url', 'seo_title', 'seo_description', 'published_at', 'featured', 'status'] as const
const taxonomyFields = ['type', 'topic', 'service', 'primary_keyword', 'reviewed_by', 'reviewed_at'] as const
// El autor lo fija el servidor a partir de la sesión; el sello de revisión solo lo gestiona la revisora.
const editableBase = ['slug', 'title', 'excerpt', 'content', 'category', 'cover_image_url', 'seo_title', 'seo_description', 'published_at', 'featured', 'status'] as const
const editableTaxonomy = ['type', 'topic', 'service', 'primary_keyword'] as const
const statuses = ['borrador', 'revisado', 'publicado']
const selectFull = [...baseFields, ...taxonomyFields].join(',')
const selectBase = baseFields.join(',')

type Row = Record<string, unknown>
type Result = { data: unknown; error: { message: string } | null }

async function authorizedEditor(): Promise<Editor | null> {
  const authClient = await createClient()
  const { data: { user } } = await authClient.auth.getUser()
  return findEditor(user?.email)
}

function serviceClient() {
  return createServiceClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } })
}

const isMissingColumn = (message?: string) => !!message && /column|schema cache/i.test(message)
const pick = (input: Row, keys: readonly string[]) => Object.fromEntries(keys.filter(key => key in input).map(key => [key, input[key] === '' ? null : input[key]]))

// Si la migración de taxonomía aún no está aplicada, reintenta solo con las columnas antiguas.
async function withFallback(run: (columns: string, withTaxonomy: boolean) => PromiseLike<Result>) {
  const first = await run(selectFull, true)
  if (first.error && isMissingColumn(first.error.message)) {
    const retry = await run(selectBase, false)
    return { ...retry, migrationPending: true }
  }
  return { ...first, migrationPending: false }
}

function validate(input: Row, editor: Editor, existingStatus?: string) {
  if (typeof input.slug === 'string' && input.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(input.slug)) return 'El slug solo puede llevar minúsculas, números y guiones (sin tildes, espacios ni ñ).'
  if ('status' in input && !statuses.includes(String(input.status))) return 'Estado no válido.'
  if ('type' in input && input.type && !['guia', 'noticia'].includes(String(input.type))) return 'Tipo no válido.'
  if ('topic' in input && input.topic && !topicBySlug(String(input.topic))) return 'Temática no válida.'
  if ('service' in input && input.service && !(String(input.service) in services)) return 'Servicio no válido.'
  const publishing = input.status === 'publicado'
  if (publishing && !editor.canPublish) return 'No tienes permiso para publicar.'
  if (existingStatus === 'publicado' && !editor.canPublish) return 'No tienes permiso para modificar un artículo publicado.'
  if (publishing && input.type === 'guia') {
    const topic = topicBySlug(String(input.topic ?? ''))
    if (!topic) return 'Una guía necesita una temática.'
    if (!topic.published) return `El hub de "${topic.title}" todavía no está publicado. Publica primero el hub o guarda la guía como borrador.`
  }
  return null
}

function build(input: Row, editor: Editor, creating: boolean) {
  const payload: Row = { ...pick(input, editableBase), ...pick(input, editableTaxonomy) }
  if (creating) { payload.author = editor.name; payload.type = payload.type ?? 'noticia' }
  const topic = topicBySlug(String(payload.topic ?? ''))
  if (topic && !payload.service) payload.service = topic.primaryService
  if (payload.status === 'publicado' && !payload.published_at) payload.published_at = new Date().toISOString()
  if (editor.role === 'revisora' && (creating || 'legal_review' in input)) {
    const reviewed = input.legal_review === undefined ? creating : Boolean(input.legal_review)
    payload.reviewed_by = reviewed ? reviewer.name : null
    payload.reviewed_at = reviewed ? new Date().toISOString() : null
  }
  return payload
}

const withoutTaxonomy = (payload: Row) => Object.fromEntries(Object.entries(payload).filter(([key]) => !(taxonomyFields as readonly string[]).includes(key)))

export async function GET() {
  const editor = await authorizedEditor()
  if (!editor) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  const result = await withFallback((columns) => serviceClient().from('editorial_posts').select(columns).order('updated_at', { ascending: false }))
  if (result.error) return NextResponse.json({ error: 'No se pudieron cargar los artículos.' }, { status: 500 })
  return NextResponse.json({ posts: result.data, editor: { name: editor.name, role: editor.role, canPublish: editor.canPublish }, migrationPending: result.migrationPending })
}

export async function POST(request: Request) {
  const editor = await authorizedEditor()
  if (!editor) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  const input = (await request.json()) as Row
  const problem = validate(input, editor)
  if (problem) return NextResponse.json({ error: problem }, { status: problem.startsWith('No tienes permiso') ? 403 : 400 })
  const payload = build(input, editor, true)
  const result = await withFallback((columns, withTaxonomy) => serviceClient().from('editorial_posts').insert(withTaxonomy ? payload : withoutTaxonomy(payload)).select(columns).single())
  if (result.error) return NextResponse.json({ error: 'No se pudo crear el artículo. Comprueba que el slug no exista ya.' }, { status: 400 })
  return NextResponse.json(result.data, { status: 201, headers: result.migrationPending ? { 'x-migration-pending': '1' } : undefined })
}

export async function PATCH(request: Request) {
  const editor = await authorizedEditor()
  if (!editor) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  const input = (await request.json()) as Row
  if (!input.id) return NextResponse.json({ error: 'Falta el identificador.' }, { status: 400 })
  const { id, ...changes } = input
  const client = serviceClient()
  const { data: existing } = await client.from('editorial_posts').select('status').eq('id', id as string).maybeSingle()
  if (!existing) return NextResponse.json({ error: 'Artículo no encontrado.' }, { status: 404 })
  const problem = validate(changes, editor, existing.status as string)
  if (problem) return NextResponse.json({ error: problem }, { status: problem.startsWith('No tienes permiso') ? 403 : 400 })
  const payload = build(changes, editor, false)
  const result = await withFallback((columns, withTaxonomy) => client.from('editorial_posts').update(withTaxonomy ? payload : withoutTaxonomy(payload)).eq('id', id as string).select(columns).single())
  if (result.error) return NextResponse.json({ error: 'No se pudo actualizar el artículo.' }, { status: 400 })
  return NextResponse.json(result.data, { headers: result.migrationPending ? { 'x-migration-pending': '1' } : undefined })
}
