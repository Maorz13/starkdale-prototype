"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, ArrowUp } from "lucide-react"

export function StickyChat() {
  const [value, setValue] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const expanded = isExpanded || isFocused || value.length > 0

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim()) return
    router.push(`/starkdale-ai?q=${encodeURIComponent(value.trim())}`)
    setValue("")
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Badge (default collapsed state) */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 bottom-0
          flex items-center gap-2 rounded-full border border-white/20
          bg-white/70 px-4 py-2.5 shadow-2xl backdrop-blur-md
          cursor-default whitespace-nowrap text-sm text-muted-foreground
          transition-all duration-300
          ${expanded ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"}
        `}
      >
        <Sparkles className="size-4 shrink-0" />
        <span>Ask anything</span>
      </div>

      {/* Expanded input state */}
      <form
        onSubmit={handleSubmit}
        className={`
          w-full max-w-md
          flex items-center gap-3 rounded-2xl border border-white/20
          bg-white/70 px-4 py-2.5 shadow-2xl backdrop-blur-md
          transition-all duration-300
          ${expanded ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <Sparkles className="size-5 shrink-0 text-muted-foreground" />
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true)
            if (!value) setValue("I'm looking to buy a house, we are a couple in our 50s, we love Yoga and mindfulness.")
          }}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask anything"
          className="flex-1 resize-none overflow-hidden bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none leading-relaxed"
        />
        <button
          type="submit"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-40"
          disabled={!value.trim()}
        >
          <ArrowUp className="size-4" />
        </button>
      </form>
    </div>
  )
}
