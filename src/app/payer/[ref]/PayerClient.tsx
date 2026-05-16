'use client'

import { useState } from 'react'
import {
  PayPalScriptProvider,
  PayPalButtons,
  type ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js'

type Props = {
  ref: string
  amount: number
  currency: string
  description: string
  clientNom: string | null
}

export default function PayerClient({ ref, amount, currency, description, clientNom }: Props) {
  const [status, setStatus] = useState<'idle' | 'paid' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  if (!clientId) {
    return (
      <div style={{ padding: 24, color: '#b00' }}>
        Configuration PayPal manquante (NEXT_PUBLIC_PAYPAL_CLIENT_ID).
      </div>
    )
  }

  const options: ReactPayPalScriptOptions = {
    clientId,
    currency,
    intent: 'capture',
  }

  if (status === 'paid') {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <h2>Paiement confirmé ✓</h2>
        <p>Merci {clientNom ?? ''}, votre paiement de {amount.toFixed(2)} {currency} a bien été reçu.</p>
        <p>Un reçu vous est envoyé par email.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>Paiement TahitiTechDigital</h1>
      {clientNom && <p style={{ marginBottom: 4 }}>Client : {clientNom}</p>}
      <p style={{ marginBottom: 4 }}>Référence : <code>{ref}</code></p>
      <p style={{ marginBottom: 16 }}>Prestation : {description}</p>
      <p style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
        {amount.toFixed(2)} {currency}
      </p>

      <PayPalScriptProvider options={options}>
        <PayPalButtons
          style={{ layout: 'vertical', label: 'pay' }}
          createOrder={async () => {
            const res = await fetch('/api/paypal/create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ref }),
            })
            const data = await res.json()
            if (!res.ok) {
              setErrorMsg(data.error ?? 'Erreur création commande')
              setStatus('error')
              throw new Error(data.error ?? 'create-order failed')
            }
            return data.id as string
          }}
          onApprove={async (data) => {
            const res = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderId: data.orderID, ref }),
            })
            const json = await res.json()
            if (!res.ok) {
              setErrorMsg(json.error ?? 'Erreur capture')
              setStatus('error')
              return
            }
            setStatus('paid')
          }}
          onError={(err) => {
            setErrorMsg(err instanceof Error ? err.message : 'Erreur PayPal')
            setStatus('error')
          }}
        />
      </PayPalScriptProvider>

      {status === 'error' && (
        <p style={{ color: '#b00', marginTop: 16 }}>Erreur : {errorMsg}</p>
      )}
    </div>
  )
}
