import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import OpenAI from 'openai'
import { toFile } from 'openai'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prenom, nom, email, entreprise, secteur, besoins, audioBase64 } = body

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY non configuré' }, { status: 500 })
    }

    // Transcription audio via Whisper
    let transcription = ''
    if (audioBase64 && process.env.OPENAI_API_KEY) {
      try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
        const audioBuffer = Buffer.from(audioBase64 as string, 'base64')
        const audioFile = await toFile(audioBuffer, 'message-vocal.webm', { type: 'audio/webm' })
        const result = await openai.audio.transcriptions.create({
          file: audioFile,
          model: 'whisper-1',
          language: 'fr',
        })
        transcription = result.text
      } catch {
        transcription = '(transcription indisponible)'
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const attachments = audioBase64
      ? [{ filename: 'message-vocal.webm', content: Buffer.from(audioBase64 as string, 'base64') }]
      : []

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'TAHITITECHDIGITAL <onboarding@resend.dev>',
      to: [process.env.RESEND_TO_EMAIL ?? 'contact@tahititechdigital.com'],
      replyTo: email,
      subject: `Nouvelle demande de ${prenom} ${nom} — ${entreprise}`,
      attachments,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Prénom</td><td style="padding:8px">${prenom}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Nom</td><td style="padding:8px">${nom}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Entreprise</td><td style="padding:8px">${entreprise}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Secteur</td><td style="padding:8px">${secteur || 'Non renseigné'}</td></tr>
          ${besoins ? `<tr><td style="padding:8px;font-weight:bold;vertical-align:top">Besoins</td><td style="padding:8px">${besoins}</td></tr>` : ''}
          ${transcription ? `<tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message vocal (transcription)</td><td style="padding:8px">${transcription}</td></tr>` : ''}
          ${audioBase64 ? '<tr><td style="padding:8px;font-weight:bold">Fichier audio</td><td style="padding:8px">✅ message-vocal.webm joint</td></tr>' : ''}
        </table>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
