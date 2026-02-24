'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface AudioRecorderProps {
  onAudioChange: (base64: string | null) => void
}

export default function AudioRecorder({ onAudioChange }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [hasSupport, setHasSupport] = useState(true)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevUrlRef = useRef<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.mediaDevices || !window.MediaRecorder) {
      setHasSupport(false)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current)
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg'
      const recorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType })
        if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current)
        const url = URL.createObjectURL(blob)
        prevUrlRef.current = url
        setAudioUrl(url)

        const reader = new FileReader()
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1]
          onAudioChange(base64)
        }
        reader.readAsDataURL(blob)
        stream.getTracks().forEach((t) => t.stop())
      }

      recorder.start()
      setIsRecording(true)
      setDuration(0)
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000)
    } catch {
      // Microphone access denied or not available
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }

  const deleteRecording = useCallback(() => {
    if (prevUrlRef.current) {
      URL.revokeObjectURL(prevUrlRef.current)
      prevUrlRef.current = null
    }
    setAudioUrl(null)
    setDuration(0)
    onAudioChange(null)
  }, [onAudioChange])

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  if (!hasSupport) return null

  return (
    <div className="audio-recorder">
      <div className="audio-recorder-label">Message vocal <span className="audio-optional">(optionnel)</span></div>

      {!audioUrl ? (
        <div className="audio-recorder-controls">
          {!isRecording ? (
            <button type="button" className="audio-btn audio-btn-record" onClick={startRecording}>
              <span className="audio-mic-icon">🎙️</span>
              Enregistrer un message vocal
            </button>
          ) : (
            <div className="audio-recording-active">
              <span className="audio-recording-dot" />
              <span className="audio-recording-time">{formatTime(duration)}</span>
              <button type="button" className="audio-btn audio-btn-stop" onClick={stopRecording}>
                ⏹ Arrêter
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="audio-preview">
          <audio src={audioUrl} controls className="audio-player" />
          <button type="button" className="audio-btn audio-btn-delete" onClick={deleteRecording}>
            🗑 Supprimer
          </button>
        </div>
      )}
    </div>
  )
}
