"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Moon, Sun, SettingsIcon } from "lucide-react"

interface SettingsProps {
  email: string
}

export default function Settings({ email }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [username, setUsername] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [isSaved, setIsSaved] = useState(false)

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const savedUsername = localStorage.getItem("username")
    const savedDOB = localStorage.getItem("dateOfBirth")

    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }

    if (savedUsername) setUsername(savedUsername)
    if (savedDOB) setDateOfBirth(savedDOB)
  }, [])

  const handleThemeToggle = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleSaveSettings = () => {
    localStorage.setItem("username", username)
    localStorage.setItem("dateOfBirth", dateOfBirth)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-40 text-white hover:text-white/80 transition-colors p-2 mb-2"
        aria-label="Open settings"
        title="Settings"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          {/* Modal Content */}
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-semibold text-white mb-6">Settings</h2>

            {/* Theme Toggle */}
            <div className="mb-6 pb-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isDark ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-white" />}
                  <label className="text-white font-medium">{isDark ? "Dark" : "Light"} Mode</label>
                </div>
                <button
                  onClick={handleThemeToggle}
                  className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors"
                  style={{
                    backgroundColor: isDark ? "rgb(59, 130, 246)" : "rgb(209, 213, 219)",
                  }}
                >
                  <span
                    className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform"
                    style={{
                      transform: isDark ? "translateX(1.5rem)" : "translateX(0.25rem)",
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Username */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Date of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40 transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSaveSettings}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
            >
              {isSaved ? "Settings Saved!" : "Save Settings"}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
