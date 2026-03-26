import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroAction {
  label: string
  href: string
  variant?: "default" | "outline" | "secondary"
}

interface VideoHeroSectionProps {
  tag?: string
  title: string
  description: string
  actions?: HeroAction[]
  videoSrc?: string
  posterSrc?: string
  className?: string
}

export function VideoHeroSection({
  tag,
  title,
  description,
  actions = [],
  videoSrc,
  posterSrc,
  className,
}: VideoHeroSectionProps) {
  return (
    <section className={cn("dark relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden text-foreground", className)}>
      {/* Background: animated poster always as base layer */}
      {posterSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt=""
          className="absolute inset-0 size-full object-cover"
          style={{ animation: "kenburns 16s ease-in-out forwards" }}
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}
      {/* Video overlays on top once loaded */}
      {videoSrc && (
        <video
          className="absolute inset-0 size-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        {tag && (
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/70">
            {tag}
          </p>
        )}
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 text-lg text-white/80 sm:text-xl">
          {description}
        </p>
        {actions.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {actions.map((action, i) => (
              <Button
                key={action.label}
                asChild
                size="lg"
                variant={i === 0 ? "default" : "outline"}
              >
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
