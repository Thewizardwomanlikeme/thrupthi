"use client"

import { useEffect, useState } from "react"

type ApiResponse = {
  text: string
  source: string
}

export default function DailyInspiration() {
  const [message, setMessage] = useState<ApiResponse | null>(null)

  useEffect(() => {
    fetch("/api/inspiration")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data)
      })
      .catch(() => {
        setMessage({
          text: "Believe in yourself — you are enough 💛",
          source: "Fallback",
        })
      })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {message ? (
        <>
          <p className="text-lg md:text-xl font-light text-white/95 mb-3 leading-snug">"{message.text}"</p>
          <span className="text-xs text-white/60">— {message.source} of the Day</span>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-sm text-white/80 border border-white/20 rounded-xl px-3 py-1 hover:bg-white/10 transition"
          >
            🔁 Inspire Me Again
          </button>
        </>
      ) : (
        <p className="text-white/70 italic text-sm">Loading inspiration...</p>
      )}
    </div>
  )
}
