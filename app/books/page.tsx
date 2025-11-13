"use client"

import { Button } from "@/components/ui/button"
import { LogOut, ArrowLeft } from "lucide-react"
import Settings from "@/components/settings"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Book {
  id: number
  title: string
  author: string
  keywords: string[]
  youtubeUrl: string
  cover: string
}

const books: Book[] = [
  {
    id: 1,
    title: "IKIGAI",
    author: "Héctor García & Francesc Miralles",
    keywords: ["purpose", "meaning", "life-direction"],
    youtubeUrl: "https://youtu.be/vCb2EglzLCg?si=d4IxfIXOhFWjqYMg",
    cover: "/ikigai-japanese-purpose.jpg",
  },
  {
    id: 2,
    title: "The Secret",
    author: "Rhonda Byrne",
    keywords: ["law-of-attraction", "abundance", "mindset"],
    youtubeUrl: "https://youtu.be/b-JUQ1oK-oM?si=rglKsc8neHMKybe_",
    cover: "/the-secret-book.jpg",
  },
  {
    id: 3,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    keywords: ["self-acceptance", "values", "priorities"],
    youtubeUrl: "https://youtu.be/0qDLLMrjHN0?si=vHT3wvrEJd2pIM5j",
    cover: "/subtle-art-not-giving.jpg",
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    keywords: ["habits", "improvement", "discipline"],
    youtubeUrl: "https://youtu.be/4r6Vdjx9RqA?si=eOKfRrrcNInzZSAm",
    cover: "/atomic-habits-book.png",
  },
  {
    id: 5,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    keywords: ["productivity", "leadership", "personal-growth"],
    youtubeUrl: "https://youtu.be/LdSkr-q-yfg?si=YPnD6hFVx8R5K7M9",
    cover: "/7-habits-covey.jpg",
  },
  {
    id: 6,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    keywords: ["mindfulness", "present-moment", "spirituality"],
    youtubeUrl: "https://youtu.be/ZfX0Zel1zFw?si=bC4KpQvZ9XmN3tL2",
    cover: "/power-of-now-book.jpg",
  },
  {
    id: 7,
    title: "Men Are from Mars, Women Are from Venus",
    author: "John Gray",
    keywords: ["relationships", "communication", "love"],
    youtubeUrl: "https://youtu.be/7u3YPaAkW-Q?si=mR7jKnQ4vB9xWpL8",
    cover: "/mars-venus-relationships.jpg",
  },
  {
    id: 8,
    title: "Why Has Nobody Told Me This Before?",
    author: "Dr. Rangan Chatterjee",
    keywords: ["mental-health", "self-care", "wellness"],
    youtubeUrl: "https://youtu.be/OQKX1zN2rHs?si=fK3mJqR2xL9pZ5Wn",
    cover: "/why-nobody-told-me-before.jpg",
  },
  {
    id: 9,
    title: "The Art of Loving",
    author: "Erich Fromm",
    keywords: ["self-love", "relationships", "compassion"],
    youtubeUrl: "https://youtu.be/W1SHcAWrFJY?si=kT3mJqR2xL9pZ5Wn",
    cover: "/art-of-loving-book.jpg",
  },
  {
    id: 10,
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    keywords: ["emotions", "self-awareness", "relationships"],
    youtubeUrl: "https://youtu.be/KXq_OBZTnGQ?si=jN4mK5vR8xP6qZ2Wo",
    cover: "/emotional-intelligence.jpg",
  },
]

export default function BooksPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail") || ""
    setEmail(savedEmail)
    const darkMode = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(darkMode)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("userEmail")
    window.location.reload()
  }

  return (
    <main className={`min-h-screen w-full relative overflow-hidden ${isDarkMode ? "dark" : ""}`}>
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat animate-slow-pan"
        style={{
          backgroundImage: "url(/images/b.jpeg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-8">
          <Button onClick={() => router.back()} variant="ghost" className="text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <div className="flex gap-8 items-center">
            <Settings email={email} />
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12 px-4">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-4 font-light">
            Mental Wellness Library
          </h1>
          <p className="text-white/85 text-lg font-light">Explore audiobooks that nurture your soul and mind</p>
        </div>

        {/* Books Grid */}
        <div className="relative z-10 px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books.map((book) => (
                <a
                  key={book.id}
                  href={book.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    {/* Book Cover */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
                      <img
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="text-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                          <p className="text-white text-sm font-medium mt-3">Listen Now</p>
                        </div>
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="p-4">
                      <h3 className="text-white font-medium text-sm line-clamp-2 mb-2 group-hover:text-blue-300 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-white/70 text-xs mb-3">{book.author}</p>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1">
                        {book.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="inline-block bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full hover:bg-white/20 transition-colors"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
