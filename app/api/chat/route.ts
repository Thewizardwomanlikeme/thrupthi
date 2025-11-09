import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: "openai/gpt-4-mini",
      system:
        "You are a mental health therapist giving this person kind advice and acting as a listening companion. Be empathetic, supportive, and provide thoughtful guidance. Keep responses concise but meaningful.",
      prompt: message,
    })

    return Response.json({ reply: text })
  } catch (error) {
    console.error("Chat error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
