export async function GET() {
  const apis = [
    {
      url: "https://www.affirmations.dev/",
      parse: (data: any) => ({
        text: data.affirmation,
        source: "Affirmation",
      }),
    },
    {
      url: "https://api.adviceslip.com/advice",
      parse: (data: any) => ({
        text: data.slip.advice,
        source: "Advice",
      }),
    },
    {
      url: "https://zenquotes.io/api/random",
      parse: (data: any) => ({
        text: `${data[0].q} — ${data[0].a}`,
        source: "Quote",
      }),
    },
    {
      url: "https://www.boredapi.com/api/activity",
      parse: (data: any) => ({
        text: data.activity,
        source: "Activity Idea",
      }),
    },
  ]

  const dayOfWeek = new Date().getDay()
  const apiOfTheDay = apis[dayOfWeek % apis.length]

  try {
    const res = await fetch(apiOfTheDay.url)
    const data = await res.json()
    const message = apiOfTheDay.parse(data)
    return Response.json(message)
  } catch (error) {
    return Response.json(
      {
        text: "Believe in yourself — you are enough 💛",
        source: "Fallback",
      },
      { status: 200 },
    )
  }
}
