"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, ArrowUp } from "lucide-react"

export function StickyChat() {
  const [value, setValue] = useState("")
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
    <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/70 px-4 py-2.5 shadow-2xl backdrop-blur-md"
      >
        <Sparkles className="size-5 shrink-0 text-muted-foreground" />
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (!value) setValue("I'm looking to buy a house, we are a couple in our 50s, we love Yoga and mindfulness.")
          }}
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
