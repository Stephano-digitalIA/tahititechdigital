const SANDBOX = 'https://api-m.sandbox.paypal.com'
const LIVE = 'https://api-m.paypal.com'

export function paypalBaseUrl(): string {
  return process.env.PAYPAL_ENV === 'live' ? LIVE : SANDBOX
}

export async function getPaypalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_SECRET
  if (!clientId || !secret) {
    throw new Error('PAYPAL_CLIENT_ID ou PAYPAL_SECRET manquant')
  }

  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64')
  const res = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`PayPal auth a échoué (${res.status})`)
  }
  const data = (await res.json()) as { access_token: string }
  return data.access_token
}

import { createClient, SupabaseClient } from '@supabase/supabase-js'

let cachedAdmin: SupabaseClient | null = null

export function getSupabaseServer(): SupabaseClient {
  if (cachedAdmin) return cachedAdmin
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase non configuré')
  cachedAdmin = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cachedAdmin
}

export type Devis = {
  ref: string
  amount: number
  currency: string
  description: string
  client_email: string | null
  client_nom: string | null
  status: 'pending' | 'paid' | 'cancelled'
}
