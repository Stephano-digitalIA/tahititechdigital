'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { getSupabaseClient } from '@/lib/supabase'

interface FormData {
  prenom: string
  nom: string
  email: string
  entreprise: string
  secteur: string
  besoins: string
}

interface TurnstileApi {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string
      callback: (token: string) => void
      'expired-callback'?: () => void
      'error-callback'?: () => void
      theme?: 'light' | 'dark' | 'auto'
    }
  ) => string
  reset: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [formData, setFormData] = useState<FormData>({
    prenom: '',
    nom: '',
    email: '',
    entreprise: '',
    secteur: '',
    besoins: '',
  })
  // Honeypot : champ invisible pour un humain, rempli par les bots
  const [website, setWebsite] = useState('')
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const renderTurnstile = useCallback(() => {
    if (!TURNSTILE_SITE_KEY || !window.turnstile || !turnstileRef.current) return
    if (widgetIdRef.current !== null) return
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'auto',
      callback: (token) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
    })
  }, [])

  // Si le script est déjà chargé (navigation client), onLoad ne se redéclenche pas
  useEffect(() => {
    renderTurnstile()
  }, [renderTurnstile])

  const resetTurnstile = () => {
    setTurnstileToken('')
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError('Merci de valider la vérification anti-robot.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website, turnstileToken }),
      })

      if (res.ok) {
        const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
        if (webhookUrl) {
          try {
            await fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                prenom: formData.prenom,
                nom: formData.nom,
                email: formData.email,
                entreprise: formData.entreprise,
                secteur: formData.secteur,
                message: formData.besoins,
                date_soumission: new Date().toISOString(),
              }),
            })
          } catch (err) {
            console.error('Webhook n8n failed:', err)
          }
        }

        const supabase = getSupabaseClient()
        if (supabase) {
          try {
            const { error: dbError } = await supabase.from('contacts').insert({
              prenom: formData.prenom,
              nom: formData.nom,
              email: formData.email,
              entreprise: formData.entreprise,
              secteur: formData.secteur || null,
              message: formData.besoins || null,
            })
            if (dbError) console.error('Supabase insert failed:', dbError)
          } catch (err) {
            console.error('Supabase insert failed:', err)
          }
        }

        setSubmitted(true)
        resetTurnstile()
        setTimeout(() => {
          setSubmitted(false)
          setFormData({ prenom: '', nom: '', email: '', entreprise: '', secteur: '', besoins: '' })
        }, 3000)
      } else {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setError(data?.error ?? "L'envoi a échoué. Merci de réessayer.")
        resetTurnstile()
      }
    } catch {
      setError("L'envoi a échoué. Merci de réessayer.")
      resetTurnstile()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="contact-form reveal" onSubmit={handleSubmit}>
      <h3>Décrivez votre besoin</h3>
      <p className="form-sub">
        On vous indique rapidement si c&#39;est faisable et comment on peut vous aider.
      </p>

      <div className="form-row">
        <div className="form-group">
          <label>
            Prénom <span className="required">*</span>
          </label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Votre prénom"
            required
          />
        </div>
        <div className="form-group">
          <label>
            Nom <span className="required">*</span>
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Votre nom"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="votre@entreprise.pf"
          required
        />
      </div>

      <div className="form-group">
        <label>
          Entreprise <span className="required">*</span>
        </label>
        <input
          type="text"
          name="entreprise"
          value={formData.entreprise}
          onChange={handleChange}
          placeholder="Nom de votre entreprise"
          required
        />
      </div>

      <div className="form-group">
        <label>Secteur d&#39;activité</label>
        <select name="secteur" value={formData.secteur} onChange={handleChange}>
          <option value="">Sélectionnez votre secteur</option>
          <option>Hôtellerie & Tourisme</option>
          <option>Commerce & Retail</option>
          <option>Services & Consulting</option>
          <option>BTP & Construction</option>
          <option>Immobilier</option>
          <option>Artisanat & Production</option>
          <option>Autre</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          Vos besoins <span className="required">*</span>
        </label>
        <textarea
          name="besoins"
          value={formData.besoins}
          onChange={handleChange}
          placeholder="Décrivez votre projet..."
          required
        />
      </div>

      {/* Honeypot : hors écran, ignoré par les lecteurs d'écran et l'autocomplétion */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="website">Site web</label>
        <input
          id="website"
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onLoad={renderTurnstile}
          />
          <div ref={turnstileRef} className="form-group" />
        </>
      )}

      {error && (
        <p className="form-error" role="alert" style={{ color: '#ef4444', marginBottom: '12px' }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        className="form-submit"
        disabled={loading || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
        style={
          submitted
            ? { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }
            : undefined
        }
      >
        {submitted ? '✓ Demande envoyée !' : loading ? 'Envoi en cours...' : 'Envoyer ma demande →'}
      </button>
      <p className="form-note">
        * Champs obligatoires. Vos données sont protégées et utilisées uniquement pour vous recontacter.
      </p>
    </form>
  )
}
