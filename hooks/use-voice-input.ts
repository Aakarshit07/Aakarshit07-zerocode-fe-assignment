"use client"

import { useState, useCallback, useRef } from "react"
import type SpeechRecognition from "speech-recognition"

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const initializeRecognition = useCallback(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event) => {
        let finalTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript)
        }
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
      setIsSupported(true)
    }
  }, [])

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      initializeRecognition()
    }
    if (recognitionRef.current && !isListening) {
      setTranscript("")
      recognitionRef.current.start()
    }
  }, [initializeRecognition, isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }, [isListening])

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
  }
}
