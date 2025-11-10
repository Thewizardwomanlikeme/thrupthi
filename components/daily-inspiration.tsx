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

  // Pick API based on the current weekday (0–6)
  const apiOfTheDay = apis[new Date().getDay() % apis.length]

  useEffect(() => {
    fetch(apiOfTheDay.url)
      .then((res) => res.json())
      .then((data) => setMessage(apiOfTheDay.parse(data)))
      .catch(() => setError("Couldn’t fetch today’s inspiration 😔"))
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 shadow-sm w-full max-w-xl mx-auto animate-fadeIn">
      {error ? (
        <p className="text-gray-600 italic">{error}</p>
      ) : message ? (
        <>
          <p className="text-xl md:text-2xl font-light text-gray-800 mb-3 leading-snug">“{message.text}”</p>
          <span className="text-sm text-gray-500">— {message.source} of the Day</span>
        </>
      ) : (
        <p className="text-gray-600 italic">Loading inspiration...</p>
      )}
    </div>
  )
}
