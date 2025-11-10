"use client"

import { useState, useEffect } from "react"

const AFFIRMATIONS = [
  "You are worthy of love and compassion.",
  "Every day is a new opportunity to grow.",
  "Your struggles make you stronger.",
  "You deserve to be happy and healthy.",
  "Progress, not perfection, is the goal.",
  "You are capable of amazing things.",
  "Your mental health matters.",
  "You are not alone in this journey.",
  "Healing is a process, be patient with yourself.",
  "Your feelings are valid and important.",
  "You have the strength to overcome challenges.",
  "Today is a good day to take care of yourself.",
  "You are enough just as you are.",
  "Your story isn't over yet.",
  "Kindness starts with yourself.",
]

interface AffirmationProps {
  onClose: () => void
}

export default function Affirmation({ onClose }: AffirmationProps) {
  const [affirmation, setAffirmation] = useState("")
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const randomAffirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]
    setAffirmation(randomAffirmation)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 500)
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`max-w-md mx-auto px-8 py-12 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl text-center transform transition-all duration-500 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <div className="mb-6">
          <div className="inline-block">
            <div className="text-4xl mb-4">✨</div>
          </div>
        </div>
        <p className="text-xl font-serif text-gray-800 leading-relaxed">{affirmation}</p>
        <p className="text-sm text-gray-500 mt-6 font-light">Take a deep breath...</p>
      </div>
    </div>
  )
}
