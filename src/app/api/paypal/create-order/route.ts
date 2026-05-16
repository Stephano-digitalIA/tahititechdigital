import { NextResponse } from 'next/server'
import { getPaypalAccessToken, getSupabaseServer, paypalBaseUrl, type Devis } from '@/lib/paypal'

export async function POST(request: Request) {
  try {
    const { ref } = (await request.json()) as { ref?: string }
    if (!ref) {
      return NextResponse.json({ error: 'ref manquant' }, { status: 400 })
    }

    const supabase = getSupabaseServer()
    const { data: devis, error } = await supabase
      .from('devis')
      .select('ref, amount, currency, description, client_email, client_nom, status')
      .eq('ref', ref)
      .single<Devis>()

    if (error || !devis) {
      return NextResponse.json({ error: 'Devis introuvable' }, { status: 404 })
    }
    if (devis.status === 'paid') {
      return NextResponse.json({ error: 'Devis déjà payé' }, { status: 409 })
    }

    const token = await getPaypalAccessToken()
    const orderRes = await fetch(`${paypalBaseUrl()}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: devis.ref,
            description: devis.description,
            amount: {
              currency_code: devis.currency,
              value: devis.amount.toFixed(2),
            },
          },
        ],
        application_context: {
          brand_name: 'TahitiTechDigital',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
        },
      }),
      cache: 'no-store',
    })

    const orderData = await orderRes.json()
    if (!orderRes.ok) {
      return NextResponse.json(
        { error: 'Création commande PayPal échouée', details: orderData },
        { status: 502 }
      )
    }

    return NextResponse.json({ id: orderData.id as string })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
