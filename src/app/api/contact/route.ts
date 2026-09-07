import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import OpenAI from 'openai'
import { toFile } from 'openai'

const SECTEURS = [
  'Hôtellerie & Tourisme',
  'Commerce & Retail',
  'Services & Consulting',
  'BTP & Construction',
  'Immobilier',
  'Artisanat & Production',
  'Autre',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// ~4 Mo décodés : suffisant pour un message vocal, bloque l'abus du crédit Whisper
const AUDIO_BASE64_MAX = 5_500_000

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (trimmed.length > max) return null
  return trimmed
}

async function verifyTurnstile(token: unknown, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn('TURNSTILE_SECRET_KEY non configuré : vérification anti-bot désactivée')
    return true
  }
  if (typeof token !== 'string' || !token) return false

  const params = new URLSearchParams({ secret, response: token })
  if (ip) params.set('remoteip', ip)

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: params,
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { website, turnstileToken, audioBase64 } = body

    // Honeypot : un humain ne voit pas ce champ, un bot le remplit.
    // On répond "succès" pour ne pas lui signaler le rejet.
    if (typeof website === 'string' && website.length > 0) {
      return NextResponse.json({ success: true })
    }

    const prenom = cleanText(body.prenom, 100)
    const nom = cleanText(body.nom, 100)
    const email = cleanText(body.email, 254)
    const entreprise = cleanText(body.entreprise, 150)
    const secteur = cleanText(body.secteur, 50) ?? ''
    const besoins = cleanText(body.besoins, 5000) ?? ''

    if (!prenom || !nom || !email || !entreprise || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Champs invalides' }, { status: 400 })
    }
    if (secteur && !SECTEURS.includes(secteur)) {
      return NextResponse.json({ error: 'Secteur invalide' }, { status: 400 })
    }
    if (!besoins && !audioBase64) {
      return NextResponse.json({ error: 'Décrivez votre besoin' }, { status: 400 })
    }
    if (audioBase64 !== undefined) {
      if (typeof audioBase64 !== 'string' || audioBase64.length > AUDIO_BASE64_MAX) {
        return NextResponse.json({ error: 'Fichier audio invalide' }, { status: 400 })
      }
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? null
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json({ error: 'Vérification anti-robot échouée' }, { status: 403 })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY non configuré' }, { status: 500 })
    }

    // Transcription audio via Whisper (timeout 8s pour ne pas bloquer l'envoi)
    let transcription = ''
    if (audioBase64 && process.env.OPENAI_API_KEY) {
      try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
        const audioBuffer = Buffer.from(audioBase64 as string, 'base64')
        const audioFile = await toFile(audioBuffer, 'message-vocal.webm', { type: 'audio/webm' })
        const transcribePromise = openai.audio.transcriptions.create({
          file: audioFile,
          model: 'whisper-1',
          language: 'fr',
        })
        const timeoutPromise = new Promise<null>((resolve) =>
          setTimeout(() => resolve(null), 8000)
        )
        const result = await Promise.race([transcribePromise, timeoutPromise])
        transcription = result ? result.text : '(transcription indisponible : fichier audio joint)'
      } catch {
        transcription = '(transcription indisponible)'
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const attachments = audioBase64
      ? [{ filename: 'message-vocal.webm', content: Buffer.from(audioBase64 as string, 'base64') }]
      : []

    const e = {
      prenom: escapeHtml(prenom),
      nom: escapeHtml(nom),
      email: escapeHtml(email),
      entreprise: escapeHtml(entreprise),
      secteur: escapeHtml(secteur),
      besoins: escapeHtml(besoins).replace(/\n/g, '<br>'),
      transcription: escapeHtml(transcription),
    }

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'TAHITITECHDIGITAL <onboarding@resend.dev>',
      to: [process.env.RESEND_TO_EMAIL ?? 'contact@tahititechdigital.com'],
      replyTo: email,
      subject: `Nouvelle demande de ${prenom} ${nom} : ${entreprise}`,
      attachments,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Prénom</td><td style="padding:8px">${e.prenom}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Nom</td><td style="padding:8px">${e.nom}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${e.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Entreprise</td><td style="padding:8px">${e.entreprise}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Secteur</td><td style="padding:8px">${e.secteur || 'Non renseigné'}</td></tr>
          ${e.besoins ? `<tr><td style="padding:8px;font-weight:bold;vertical-align:top">Besoins</td><td style="padding:8px">${e.besoins}</td></tr>` : ''}
          ${e.transcription ? `<tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message vocal (transcription)</td><td style="padding:8px">${e.transcription}</td></tr>` : ''}
          ${audioBase64 ? '<tr><td style="padding:8px;font-weight:bold">Fichier audio</td><td style="padding:8px">✅ message-vocal.webm joint</td></tr>' : ''}
          ${ip ? `<tr><td style="padding:8px;font-weight:bold">IP</td><td style="padding:8px">${escapeHtml(ip)}</td></tr>` : ''}
        </table>
      `,
    })

    if (error) {
      // Ne jamais renvoyer le message brut de Resend au visiteur (il peut contenir des infos de compte)
      console.error('Resend error:', error.message)
      return NextResponse.json(
        { error: "L'envoi a échoué. Écrivez-nous directement à contact@tahititechdigital.com." },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
