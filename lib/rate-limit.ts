import { createHmac } from 'node:crypto'
import type { SupabaseClient } from '@supabase/supabase-js'

export type RateRule = { name: string; limit: number; windowSeconds: number }

export const LEAD_RULES: RateRule[] = [
  { name: '10m', limit: 5, windowSeconds: 10 * 60 },
  { name: '24h', limit: 20, windowSeconds: 24 * 60 * 60 },
]

// Solo se usa si Supabase no responde (p. ej. la migración aún no está aplicada).
const fallback = new Map<string, { count: number; resetAt: number }>()

export function clientId(request: Request) {
  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const secret = process.env.RATE_LIMIT_SALT ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'grup-ra'
  return createHmac('sha256', secret).update(ip).digest('hex').slice(0, 32)
}

function memoryLimit(id: string, rule: RateRule, now = Date.now()) {
  const current = fallback.get(id)
  if (current && current.resetAt > now) {
    if (current.count >= rule.limit) return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) }
    current.count += 1
  } else {
    fallback.set(id, { count: 1, resetAt: now + rule.windowSeconds * 1000 })
  }
  return { allowed: true, retryAfter: 0 }
}

export async function rateLimit(supabase: Pick<SupabaseClient, 'rpc'>, request: Request, rules: RateRule[] = LEAD_RULES) {
  const id = clientId(request)
  for (const rule of rules) {
    const { data, error } = await supabase.rpc('check_rate_limit', { p_key: `leads:${rule.name}:${id}`, p_limit: rule.limit, p_window_seconds: rule.windowSeconds })
    if (error) {
      console.error('[rate-limit] check_rate_limit failed, using in-memory fallback', error.message)
      return memoryLimit(id, rules[0])
    }
    if (data === false) return { allowed: false, retryAfter: rule.windowSeconds }
  }
  return { allowed: true, retryAfter: 0 }
}
