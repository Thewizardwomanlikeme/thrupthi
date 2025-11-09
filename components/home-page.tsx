"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Chatbot from "@/components/chatbot"
import Journal from "@/components/journal"

interface HomePageProps {
  email: string
}

export default function HomePage({ email }: HomePageProps) {
  const handleSignOut = () => {
    window.location.reload()
  }

  // Extract initials from email for profile avatar
  const initials = email.split("@")[0].slice(0, 2).toUpperCase()

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay - Same as landing */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slow-pan"
        style={{
          backgroundImage: "url(/images/b.jpeg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header with Profile and Home Text */}
        <div className="flex items-center justify-between px-6 py-8">
          {/* Profile on Top Left */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <span className="text-white font-medium text-sm">{initials}</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white/90 text-sm font-light">{email}</p>
            </div>
          </div>

          {/* Sign Out Button */}
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl text-center">
            <div className="opacity-0 animate-fade-in-up">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-8 font-light">
                Welcome to Thrupthi
              </h1>
              <p className="text-white/85 text-lg font-light leading-relaxed mb-12">
                Speak your heart, we're here to listen. ಮನದ ಮಾತು ಹೇಳಿ, ನಾವು ಕೇಳುತ್ತೇವೆ.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white/95 text-black hover:bg-white rounded-full px-8 py-3 font-medium">
                  Explore
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-3 font-medium bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot Component */}
        <Chatbot />

        {/* Journal Component */}
        <Journal />
      </div>
    </main>
  )
}
