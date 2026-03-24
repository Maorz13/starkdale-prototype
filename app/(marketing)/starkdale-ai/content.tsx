"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { MessageCircle, Share2, RotateCcw, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const AI_CARDS = [
  {
    title: "Spirituality & Inner Peace",
    description:
      "Our community programming includes guided meditation and energy healing to align physical and mental well-being, foster inner peace, and provide spiritual growth.",
    href: "/life/live-layers/spirituality",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    reverse: false,
  },
  {
    title: "Movement & Balance",
    description:
      "Our fitness routines are purposefully designed for a healthier lifestyle, offering programs focused on enhancing mobility, balance, and strength for all ages.",
    href: "/life/live-layers/fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    reverse: true,
  },
  {
    title: "The Spa",
    description:
      "At the heart of our community is a state of the art 100,000 SF spa. It fuses longevity science, thermal therapy, global treatments, and fitness classes, making it the perfect sanctuary after a morning yoga practice.",
    href: "/wellness/spa",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    reverse: false,
  },
  {
    title: "A Vibrant, Connected Community",
    description:
      "You will also have access to RoseBar Longevity, our pioneering club designed to transform your health by integrating cutting-edge science with holistic healing.",
    href: "/wellness/rosebar",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    reverse: true,
  },
]

export function StarkdaleAIContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") ?? ""

  return (
    <div className="pb-24">
      {/* Query bar */}
      <div className="border-b bg-background px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <MessageCircle className="size-4 shrink-0 text-muted-foreground" />
          <p className="flex-1 text-sm text-foreground">{query}</p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              <Share2 className="size-3.5" />
              Share
            </Button>
            <Button variant="ghost" size="sm" asChild className="gap-1.5 text-muted-foreground">
              <Link href="/">
                <RotateCcw className="size-3.5" />
                New Conversation
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 space-y-12">

        {/* Welcome hero */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <div className="flex-1 space-y-3">
            <p className="text-sm text-muted-foreground">Welcome to Starkdale.</p>
            <p className="text-xl font-semibold leading-snug">
              Our community is designed exactly for individuals who want to integrate mindful routines and holistic well-being directly into their daily environment.
            </p>
          </div>
          <div className="relative flex aspect-video w-full flex-shrink-0 items-center justify-center rounded-xl bg-muted sm:w-72">
            <button className="flex size-10 items-center justify-center rounded-full bg-background/80 shadow transition hover:bg-background">
              <Play className="size-4 fill-foreground text-foreground" />
            </button>
          </div>
        </div>

        {/* Section intro */}
        <p className="text-center text-sm font-medium text-muted-foreground">
          Here is a glimpse of how Starkdale supports a mindful, balanced life:
        </p>

        {/* AI content cards */}
        <div className="space-y-6">
          {AI_CARDS.map((card) => (
            <div key={card.title} className="rounded-2xl border p-6">
              <div className={`flex flex-col gap-6 sm:flex-row sm:items-center ${card.reverse ? "sm:flex-row-reverse" : ""}`}>
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={card.href}>Learn More</Link>
                  </Button>
                </div>
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted sm:w-56 shrink-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Next Steps */}
        <div className="rounded-2xl bg-muted p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Explore Next Steps</h2>
            <p className="text-sm text-muted-foreground">
              Start narrowing your options by comparing residences side by side, by setting, size, and weekend rhythm.
            </p>
            <Button asChild className="mt-2">
              <Link href="/residences">Choose A Residence</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 border-t pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                See how the village layout keeps wellness, nature, and social life close together.
              </p>
              <Link href="/residences/neighborhoods" className="text-sm font-semibold hover:underline">
                See the village layout →
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Move directly to available residences and start narrowing your options.
              </p>
              <Link href="/residences/compare" className="text-sm font-semibold hover:underline">
                Compare residences →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
