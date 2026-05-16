import { notFound } from 'next/navigation'
import { getSupabaseServer, type Devis } from '@/lib/paypal'
import PayerClient from './PayerClient'

export const dynamic = 'force-dynamic'

type Params = { ref: string }

export default async function PayerPage({ params }: { params: Promise<Params> }) {
  const { ref } = await params

  const supabase = getSupabaseServer()
  const { data: devis, error } = await supabase
    .from('devis')
    .select('ref, amount, currency, description, client_email, client_nom, status')
    .eq('ref', ref)
    .single<Devis>()

  if (error || !devis) {
    notFound()
  }

  if (devis.status === 'paid') {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', padding: 24, textAlign: 'center' }}>
        <h1>Devis déjà réglé</h1>
        <p>Le devis <code>{devis.ref}</code> a déjà été payé. Merci !</p>
      </div>
    )
  }

  if (devis.status === 'cancelled') {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', padding: 24, textAlign: 'center' }}>
        <h1>Devis annulé</h1>
        <p>Ce devis a été annulé. Contactez-nous pour en obtenir un nouveau.</p>
      </div>
    )
  }

  return (
    <PayerClient
      ref={devis.ref}
      amount={Number(devis.amount)}
      currency={devis.currency}
      description={devis.description}
      clientNom={devis.client_nom}
    />
  )
}
