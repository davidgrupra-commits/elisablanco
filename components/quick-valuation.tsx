'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

const copy = {
  es: { eyebrow: 'VALORACIÓN RÁPIDA', title: '¿Cuánto puede valer tu inmueble?', address: 'Dirección', type: 'Tipo de inmueble', area: 'Superficie aproximada', email: 'Email', submit: 'Obtener valoración', note: 'Estimación orientativa, no tasación oficial.', success: 'Solicitud recibida. Te contactaremos para completar la valoración.' },
  ca: { eyebrow: 'VALORACIÓ RÀPIDA', title: 'Quant pot valer el teu immoble?', address: 'Adreça', type: 'Tipus d’immoble', area: 'Superfície aproximada', email: 'Email', submit: 'Obtenir valoració', note: 'Estimació orientativa, no taxació oficial.', success: 'Sol·licitud rebuda. Et contactarem per completar la valoració.' },
  en: { eyebrow: 'QUICK VALUATION', title: 'What could your property be worth?', address: 'Address', type: 'Property type', area: 'Approximate area', email: 'Email', submit: 'Get valuation', note: 'Indicative estimate, not an official appraisal.', success: 'Request received. We will contact you to complete the valuation.' },
  fr: { eyebrow: 'ESTIMATION RAPIDE', title: 'Quelle est la valeur de votre bien ?', address: 'Adresse', type: 'Type de bien', area: 'Surface approximative', email: 'Email', submit: 'Obtenir une estimation', note: 'Estimation indicative, pas une expertise officielle.', success: 'Demande reçue. Nous vous contacterons pour compléter l’estimation.' },
} as const

export function QuickValuation() {
  const [locale, setLocale] = useState<keyof typeof copy>('es')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const t = copy[locale]
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setError(false); const form = new FormData(event.currentTarget); try { const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'valoracion', payload: Object.fromEntries(form.entries()), sourcePage: '/', consentPrivacy: form.get('consentPrivacy') === 'on' }) }); if (!response.ok) { setError(true); return } setSent(true) } catch { setError(true) } }
  if (sent) return <div className="form-success"><Check size={24} /><strong>{t.success}</strong></div>
  return <div className="quick-valuation"><div><p className="eyebrow">{t.eyebrow}</p>{error && <p className="form-error" role="alert">No hemos podido enviar la solicitud. Inténtalo de nuevo.</p>}<h2>{t.title}</h2><p className="muted">{t.note}</p></div><form onSubmit={submit} className="valuation-form"><label>{t.address}<input name="address" placeholder="Calle, número" required /></label><label>Puerta / piso<input name="unit" placeholder="Puerta, piso (opcional)" /></label><label>Ciudad<input name="city" placeholder="Tarragona" required /></label><label>Código postal<input name="postalCode" placeholder="43004" required /></label><label>{t.type}<select name="propertyType" required><option value="">—</option><option>Vivienda</option><option>Local</option><option>Terreno</option></select></label><label>{t.area}<input name="area" type="number" min="1" required /></label><label>{t.email}<input name="email" type="email" required /></label><label className="consent"><input name="consentPrivacy" type="checkbox" required /> He leído y acepto la <a href="/privacidad">política de privacidad</a>.</label><label className="sr-only">Idioma<select name="locale" value={locale} onChange={event => setLocale(event.target.value as keyof typeof copy)}><option value="es">ES</option><option value="ca">CA</option><option value="en">EN</option><option value="fr">FR</option></select></label><button className="button button-dark" type="submit">{t.submit}<ArrowRight size={16} /></button></form></div>
}

export function GuaranteeForm() {
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true); setError('')
    const form = new FormData(event.currentTarget)
    const { consentPrivacy, website, ...fields } = Object.fromEntries(form.entries())
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'propiedad', payload: fields, sourcePage: '/vende-con-garantias', consentPrivacy: consentPrivacy === 'on', honeypot: String(website ?? '') }) })
      if (!response.ok) { const data = await response.json().catch(() => null); setError(data?.error ?? 'No hemos podido enviar la solicitud. Inténtalo de nuevo.'); return }
      setSent(true)
    } catch {
      setError('No hemos podido conectar con el servicio. Inténtalo de nuevo.')
    } finally {
      setPending(false)
    }
  }
  if (sent) return <div className="form-success"><Check size={24} /><strong>Solicitud recibida.</strong><span>Te responderemos para valorar tu inmueble.</span></div>
  return <form className="content-form" onSubmit={submit}><h2>Solicita una valoración profesional</h2><label>Nombre completo<input name="name" required minLength={2} /></label><label>Email<input name="email" required type="email" /></label><label>Teléfono<input name="phone" type="tel" /></label><label>Tipo de inmueble<select name="propertyType" required><option value="">Selecciona una opción</option><option>Vivienda</option><option>Local</option><option>Terreno</option></select></label><label>Dirección<input name="address" placeholder="Calle, número" required /></label><label>Puerta / piso<input name="unit" placeholder="Puerta, piso (opcional)" /></label><label>Ciudad<input name="city" placeholder="Tarragona" required /></label><label>Código postal<input name="postalCode" placeholder="43004" required /></label><label>Superficie aproximada<input name="area" type="number" min="1" required /></label><label>Cuéntanos sobre el inmueble<textarea name="message" minLength={5} rows={4} required /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><label className="consent"><input name="consentPrivacy" type="checkbox" required /> He leído y acepto la <a href="/privacidad">política de privacidad</a>.</label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-dark" type="submit" disabled={pending}>{pending ? 'Enviando…' : 'Obtener valoración'} <ArrowRight size={16} /></button></form>
}
