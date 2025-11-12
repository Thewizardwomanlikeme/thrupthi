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
    url: "https://www.boredapi.com/api/activity",
    parse: (data: any): ApiResponse => ({
      text: data.activity,
      source: "Activity Idea",
    }),
  },
]

export default function DailyInspiration() {
  const [message, setMessage] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const apiOfTheDay = apis[new Date().getDay() % apis.length]

  useEffect(() => {
    console.log("Fetching from:", apiOfTheDay.url)
    fetch(apiOfTheDay.url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw data:", data)
        setMessage(apiOfTheDay.parse(data))
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        setMessage({
          text: "Believe in yourself — you are enough 💛",
          source: "Fallback",
        })
      })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {error ? (
        <p className="text-white/70 italic text-sm">{error}</p>
      ) : message ? (
        <>
          <p className="text-lg md:text-xl font-light text-white/95 mb-3 leading-snug">
            "{message.text}"
          </p>
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
