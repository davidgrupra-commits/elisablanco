import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'

const leadSchema = z.object({
  type: z.enum(['valoracion', 'contacto', 'legal', 'newsletter', 'propiedad', 'due_diligence', 'herencias', 'hpo_vpo', 'extranjeros', 'inversion_npl']),
  payload: z.record(z.string().max(80), z.string().max(5000)).default({}),
  sourcePage: z.string().trim().min(1).max(200).regex(/^\/[a-zA-Z0-9_/?=&.%~-]*$/).default('/'),
  consentPrivacy: z.literal(true),
  honeypot: z.string().max(0).default(''),
})

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > 64_000) return NextResponse.json({ error: 'La solicitud es demasiado grande.' }, { status: 413 })
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) return NextResponse.json({ error: 'Servicio no configurado.' }, { status: 503 })
  const supabase = createClient(
    supabaseUrl,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
  const limit = await rateLimit(supabase, request)
  if (!limit.allowed) return NextResponse.json({ error: 'Demasiadas solicitudes. Inténtalo más tarde.' }, { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } })
  const contentType = request.headers.get('content-type') ?? ''
  const input = contentType.includes('application/json')
    ? await request.json().catch(() => null)
    : await (async () => {
        const form = await request.formData().catch(() => null)
        if (!form) return null
        return { type: String(form.get('type') ?? 'contacto'), payload: { name: String(form.get('name') ?? ''), email: String(form.get('email') ?? ''), message: String(form.get('message') ?? '') }, sourcePage: '/', consentPrivacy: form.get('consentPrivacy') === 'true', honeypot: String(form.get('website') ?? '') }
      })()
  const parsed = leadSchema.safeParse(input)
  if (!parsed.success) return NextResponse.json({ error: 'Datos no válidos.' }, { status: 400 })

  const { type, payload, sourcePage } = parsed.data
  if (parsed.data.honeypot) return NextResponse.json({ ok: true }, { status: 202 })
  const { data: lead, error } = await supabase
    .from('leads')
    .insert({ type, payload, source_page: sourcePage, consent_privacy: true, consent_at: new Date().toISOString() })
    .select('id, type, created_at')
    .single()

  if (error || !lead) {
    console.error('[leads] Supabase insert failed', error?.message)
    return NextResponse.json({ error: 'No hemos podido registrar la solicitud.' }, { status: 500 })
  }

  const recipient = process.env.LEADS_TO_EMAIL ?? 'comercial@advocadarealestate.es'
  const domain = process.env.RESEND_EMAIL_DOMAIN
  if (recipient && domain && process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const summary = Object.entries(payload).map(([key, value]) => `<p><strong>${key}</strong>: ${escapeHtml(value)}</p>`).join('')
    const { error: emailError } = await resend.emails.send({
      from: `Grup RA <no-reply@${domain}>`,
      to: [recipient],
      subject: `Nuevo lead ${type} · Grup RA`,
      html: `<h2>Nuevo lead recibido</h2><p><strong>Tipo:</strong> ${type}</p>${summary}<p><small>ID: ${lead.id}</small></p>`,
    }, { idempotencyKey: `lead/${lead.id}` })
    if (emailError) console.error('[leads] Resend send failed', emailError.message)
  }

  return NextResponse.json({ ok: true, id: lead.id })
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character)
}
