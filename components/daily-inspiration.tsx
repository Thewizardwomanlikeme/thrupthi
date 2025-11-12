"use client"

import { useEffect, useState } from "react"

type ApiResponse = {
  text: string
  source: string
}

const apis = [
  {
    url: "https://www.affirmations.dev/",
    parse: (data: any): ApiResponse => ({
      text: data.affirmation,
      source: "Affirmation",
    }),
  },
  {
    url: "https://api.adviceslip.com/advice",
    parse: (data: any): ApiResponse => ({
      text: data.slip.advice,
      source: "Advice",
    }),
  },
  {
    url: "https://zenquotes.io/api/random",
    parse: (data: any): ApiResponse => ({
      text: `${data[0].q} — ${data[0].a}`,
      source: "Quote",
    }),
  },
  {
    url: "https://zenquotes.io/api/random",
    parse: (data: any): ApiResponse => ({
      text: data.activity,
      source: "Activity Idea",
    }),
  },
]

export default function DailyInspiration() {
  const [message, setMessage] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Pick API based on the current weekday (0–6)
  const apiOfTheDay = apis[new Date().getDay() % apis.length]

  useEffect(() => {
    fetch(apiOfTheDay.url)
      .then((res) => res.json())
      .then((data) => setMessage(apiOfTheDay.parse(data)))
      .catch(() => setError("Couldn't fetch today's inspiration 😔"))
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {error ? (
        <p className="text-white/70 italic text-sm">{error}</p>
      ) : message ? (
        <>
          <p className="text-lg md:text-xl font-light text-white/95 mb-3 leading-snug">"{message.text}"</p>
          <span className="text-xs text-white/60">— {message.source} of the Day</span>
        </>
      ) : (
        <p className="text-white/70 italic text-sm">Loading inspiration...</p>
      )}
    </div>
  )
}
