'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [email, setEmail] = useState('')
  const [consentPrivacy, setConsentPrivacy] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          payload: { email },
          sourcePage: '/',
          consentPrivacy,
        }),
      })

      if (!response.ok) {
        setStatus('error')
        return
      }

      setEmail('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return <div aria-live="polite">
    <form onSubmit={submit}>
      <label className="sr-only" htmlFor="newsletter-email">Email</label>
      <input id="newsletter-email" type="email" placeholder="Tu email" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={status === 'loading'} />
      <label className="newsletter-consent"><input type="checkbox" checked={consentPrivacy} onChange={(event) => setConsentPrivacy(event.target.checked)} required disabled={status === 'loading'} /> He leído y acepto la <a href="/privacidad">política de privacidad</a>.</label>
      <button className="button button-dark" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Suscribiendo…' : 'Suscribirme'} <ArrowRight size={16} /></button>
    </form>
    {status === 'success' && <small role="status">Te has suscrito correctamente.</small>}
    {status === 'error' && <small role="alert">No hemos podido completar la suscripción. Inténtalo de nuevo.</small>}
  </div>
}
