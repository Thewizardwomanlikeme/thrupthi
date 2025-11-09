"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, X, Plus, Trash2, ChevronLeft } from "lucide-react"

interface JournalEntry {
  id: string
  date: string
  time: string
  content: string
  createdAt: Date
}

export default function Journal() {
  const [isOpen, setIsOpen] = useState(false)
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0])
  const [currentTime, setCurrentTime] = useState("")
  const [content, setContent] = useState("")
  const [viewMode, setViewMode] = useState<"write" | "view">("write")
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

  // Auto-generate current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  // Load entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("journalEntries")
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [])

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries))
  }, [entries])

  const handleSave = () => {
    if (content.trim()) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: currentDate,
        time: currentTime,
        content,
        createdAt: new Date(),
      }
      setEntries([newEntry, ...entries])
      setContent("")
      setCurrentDate(new Date().toISOString().split("T")[0])
    }
  }

  const handleDelete = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))
    setSelectedEntry(null)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(e.target.value)
  }

  const entriesForDate = entries.filter((entry) => entry.date === currentDate)

  return (
    <>
      {/* Floating Journal Button */}
      <button
        onClick={() => {
          setIsOpen(true)
          setViewMode("write")
        }}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg flex items-center justify-center text-white transition-all hover:scale-110 z-40"
        aria-label="Open journal"
      >
        <BookOpen className="w-6 h-6" />
      </button>

      {/* Journal Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg sm:rounded-xl w-full sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-serif text-white">My Journal</h2>
              <button onClick={() => setIsOpen(false)} className="text-red-400 hover:text-red-300 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {viewMode === "write" ? (
                <div className="space-y-4">
                  {/* Date and Time Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/70 text-sm font-medium block mb-2">Date</label>
                      <Input
                        type="date"
                        value={currentDate}
                        onChange={handleDateChange}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-sm font-medium block mb-2">Time</label>
                      <div className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white">
                        {currentTime}
                      </div>
                    </div>
                  </div>

                  {/* Editor */}
                  <div>
                    <label className="text-white/70 text-sm font-medium block mb-2">Entry</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Dear diary,&#10;Write your thoughts here..."
                      className="w-full h-64 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Past Entries Preview */}
                  {entriesForDate.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-white/70 text-sm font-medium mb-3">
                        Today's Entries ({entriesForDate.length})
                      </p>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {entriesForDate.map((entry) => (
                          <button
                            key={entry.id}
                            onClick={() => {
                              setSelectedEntry(entry)
                              setViewMode("view")
                            }}
                            className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded p-3 transition-colors group"
                          >
                            <div className="text-white/80 text-sm font-medium group-hover:text-white">{entry.time}</div>
                            <div className="text-white/50 text-xs mt-1 line-clamp-2">
                              {entry.content.slice(0, 80)}...
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* View Entry Mode */
                <div className="space-y-4">
                  {selectedEntry && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-white/70 text-sm font-medium mb-1">Date</p>
                          <p className="text-white">{selectedEntry.date}</p>
                        </div>
                        <div>
                          <p className="text-white/70 text-sm font-medium mb-1">Time</p>
                          <p className="text-white">{selectedEntry.time}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-white/70 text-sm font-medium mb-2">Entry</p>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-white whitespace-pre-wrap max-h-96 overflow-y-auto">
                          {selectedEntry.content}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Footer / Actions */}
            <div className="border-t border-white/10 p-6 bg-slate-900/50 flex gap-3">
              {viewMode === "write" ? (
                <>
                  <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Save Entry
                  </Button>
                    <Button
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    className="flex-1 border-black/20 text-black hover:bg-black/5"
                    >
                    Close
                    </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      if (selectedEntry) {
                        handleDelete(selectedEntry.id)
                      }
                    }}
                    className="flex-1 bg-red-600/80 hover:bg-red-700 text-white rounded-lg"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                  <Button
                    onClick={() => setViewMode("write")}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
