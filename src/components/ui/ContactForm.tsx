'use client'

import { useState, useCallback } from 'react'
import AudioRecorder from '@/components/ui/AudioRecorder'

interface FormData {
  prenom: string
  nom: string
  email: string
  entreprise: string
  secteur: string
  besoins: string
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [audioBase64, setAudioBase64] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    prenom: '',
    nom: '',
    email: '',
    entreprise: '',
    secteur: '',
    besoins: '',
  })

  const handleAudioChange = useCallback((base64: string | null) => {
    setAudioBase64(base64)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, audioBase64 }),
      })

      if (res.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setAudioBase64(null)
          setFormData({ prenom: '', nom: '', email: '', entreprise: '', secteur: '', besoins: '' })
        }, 3000)
      }
    } catch {
      // Fallback: show success anyway (form is still client-side if API not configured)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
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
          placeholder="Décrivez les tâches que vous aimeriez automatiser ou le projet que vous avez en tête..."
          required
        />
      </div>

      <AudioRecorder onAudioChange={handleAudioChange} />

      <button
        type="submit"
        className="form-submit"
        disabled={loading}
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
