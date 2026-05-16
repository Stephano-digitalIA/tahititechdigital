import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPaypalAccessToken, getSupabaseServer, paypalBaseUrl } from '@/lib/paypal'

export async function POST(request: Request) {
  try {
    const { orderId, ref } = (await request.json()) as { orderId?: string; ref?: string }
    if (!orderId || !ref) {
      return NextResponse.json({ error: 'orderId ou ref manquant' }, { status: 400 })
    }

    const token = await getPaypalAccessToken()
    const captureRes = await fetch(
      `${paypalBaseUrl()}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    )
    const captureData = await captureRes.json()

    if (!captureRes.ok || captureData.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Capture PayPal échouée', details: captureData },
        { status: 502 }
      )
    }

    const purchaseUnit = captureData.purchase_units?.[0]
    const capture = purchaseUnit?.payments?.captures?.[0]
    const paidAmount = Number(capture?.amount?.value ?? 0)
    const paidCurrency = capture?.amount?.currency_code ?? ''
    const payerEmail = captureData.payer?.email_address ?? null

    const supabase = getSupabaseServer()
    await supabase
      .from('devis')
      .update({
        status: 'paid',
        paid_at: new Date().toISOString(),
        paypal_order_id: orderId,
        paypal_capture_id: capture?.id ?? null,
        paid_amount: paidAmount,
        paid_currency: paidCurrency,
        payer_email: payerEmail,
      })
      .eq('ref', ref)

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'TAHITITECHDIGITAL <onboarding@resend.dev>',
        to: [process.env.RESEND_TO_EMAIL ?? 'contact@tahititechdigital.com'],
        subject: `Paiement reçu — devis ${ref} — ${paidAmount.toFixed(2)} ${paidCurrency}`,
        html: `
          <h2>Paiement PayPal confirmé</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;font-weight:bold">Référence devis</td><td style="padding:8px">${ref}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Montant</td><td style="padding:8px">${paidAmount.toFixed(2)} ${paidCurrency}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Email payeur</td><td style="padding:8px">${payerEmail ?? '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Order ID</td><td style="padding:8px">${orderId}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Capture ID</td><td style="padding:8px">${capture?.id ?? '—'}</td></tr>
          </table>
        `,
      })
    }

    return NextResponse.json({ success: true, orderId, captureId: capture?.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
