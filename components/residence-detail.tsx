"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Bed,
  Bath,
  Maximize,
  Heart,
  Share2,
  Car,
  Ruler,
  Box,
  MapPin,
  Leaf,
  HeartPulse,
  TreePine,
  Waves,
  Flower2,
  Cpu,
  Wind,
  Dumbbell,
  Zap,
  ChefHat,
  Wine,
  Briefcase,
  Thermometer,
  Building2,
  Paintbrush,
  LayoutDashboard,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { Property } from "@/lib/residence-types"

const TAG_ICONS: Record<string, LucideIcon> = {
  "BIOPHILIC DESIGN":        Leaf,
  "LONGEVITY DESIGN":        HeartPulse,
  "TRAIL ACCESS":            TreePine,
  "PRIVATE POOL":            Waves,
  "GARDEN":                  Flower2,
  "SMART HOME":              Cpu,
  "AIR QUALITY MONITORING":  Wind,
  "EV READY":                Zap,
  "SAUNA":                   Thermometer,
  "CHEF'S KITCHEN":          ChefHat,
  "WINE CELLAR":             Wine,
  "HOME OFFICE":             Briefcase,
  "GYM":                     Dumbbell,
  "PRIVATE TERRACE":         TreePine,
}

const CLOSE_TO_DISTANCE: Record<string, string> = {
  "The Square":    "2 min walk",
  "Trails":        "5 min walk",
  "Spa & Wellness": "4 min walk",
  "Lake":          "6 min walk",
  "Play Village":  "3 min walk",
  "Base Camp":     "8 min walk",
}

const TAGS: Record<string, string[]> = {
  "Smart Home":              ["SMART HOME"],
  "EV Charging":             ["EV READY"],
  "Air Quality Monitoring":  ["AIR QUALITY MONITORING"],
  "Pool":                    ["PRIVATE POOL"],
  "Sauna":                   ["SAUNA"],
  "Chef's Kitchen":          ["CHEF'S KITCHEN"],
  "Wine Cellar":             ["WINE CELLAR"],
  "Home Office":             ["HOME OFFICE"],
  "Garden":                  ["GARDEN"],
  "Terrace":                 ["PRIVATE TERRACE"],
}

function deriveTags(amenities: string[]): string[] {
  const base = ["BIOPHILIC DESIGN", "LONGEVITY DESIGN", "TRAIL ACCESS"]
  const fromAmenities = amenities.flatMap((a) => TAGS[a] ?? [])
  return [...new Set([...base, ...fromAmenities])].slice(0, 7)
}

function deriveFeatures(amenities: string[]): string[] {
  const fixed = [
    "Open-concept floor plan",
    "Floor-to-ceiling windows",
    "Hardwood flooring throughout",
    "In-unit laundry",
    "Blackout window treatments",
  ]
  const fromAmenities = amenities.map((a) => {
    const map: Record<string, string> = {
      "Smart Home": "Smart home integration",
      "EV Charging": "EV charging ready",
      "Air Quality Monitoring": "Air quality monitoring system",
      "Pool": "Private pool access",
      "Chef's Kitchen": "Chef's kitchen with island",
      "Home Office": "Dedicated home office",
      "Sauna": "Private sauna",
      "Wine Cellar": "Temperature-controlled wine cellar",
      "Garden": "Private garden",
      "Terrace": "Wraparound terrace",
    }
    return map[a]
  }).filter(Boolean) as string[]
  return [...new Set([...fixed, ...fromAmenities])]
}

function calcPricePerSqft(price: string, sqft: string): string {
  const p = Number(price.replace(/[$,]/g, ""))
  const s = Number(sqft.replace(/,/g, ""))
  if (!p || !s) return "N/A"
  return `$${Math.round(p / s).toLocaleString()}`
}

function calcEstPayment(price: string): string {
  const p = Number(price.replace(/[$,]/g, ""))
  // Rough 30yr at 6.8% with 20% down
  const loan = p * 0.8
  const monthly = (loan * (0.068 / 12)) / (1 - Math.pow(1 + 0.068 / 12, -360))
  return `$${Math.round(monthly).toLocaleString()}/mo`
}

interface ResidenceDetailProps {
  property: Property
  backHref?: string
}

export function ResidenceDetail({ property, backHref }: ResidenceDetailProps) {
  const {
    id,
    title,
    neighborhood,
    price,
    beds,
    baths,
    sqft,
    type,
    style,
    availability,
    parking,
    lotSize,
    amenities,
    closeTo,
  } = property

  const tags = deriveTags(amenities)
  const features = deriveFeatures(amenities)
  const pricePerSqft = calcPricePerSqft(price, sqft)
  const estPayment = calcEstPayment(price)
  const hoa = type === "Multifamily" ? "$620/mo" : null

  const description = `Perfectly positioned within the ${neighborhood} neighborhood, ${title} is a beautifully designed ${beds}-bedroom ${type === "Multifamily" ? "residence" : "home"} offering an exceptional blend of contemporary architecture and natural living. This open-concept home is thoughtfully crafted for both gracious entertaining and comfortable daily life. Floor-to-ceiling windows frame the surrounding landscape, and every detail reflects Starkdale's commitment to longevity design and biophilic principles.`

  return (
    <div className="flex h-full flex-col">


      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">

        {/* Gallery */}
        <div className="px-6 pt-6">
        <div className="relative flex h-64 gap-1 overflow-hidden rounded-xl sm:h-96">
          {/* Main large photo — left half */}
          <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
            <Box className="size-8 opacity-40" />
            <span className="text-xs font-medium">3D Interactive View</span>
          </div>
          {/* Right 2×2 grid */}
          <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-1">
            <div className="flex items-center justify-center bg-muted/80 text-xs text-muted-foreground">Photo 2</div>
            <div className="flex items-center justify-center bg-muted/80 text-xs text-muted-foreground">Photo 3</div>
            <div className="flex items-center justify-center bg-muted/80 text-xs text-muted-foreground">Photo 4</div>
            <div className="flex items-center justify-center bg-muted/70 text-xs text-muted-foreground">Photo 5</div>
          </div>
          {/* Show all photos */}
          <div className="absolute bottom-4 right-4">
            <Button variant="secondary" size="sm" className="gap-1.5 text-xs shadow">
              <span className="grid size-3.5 grid-cols-2 grid-rows-2 gap-px">
                {[...Array(4)].map((_, i) => <span key={i} className="rounded-[1px] bg-current opacity-70" />)}
              </span>
              Show all photos
            </Button>
          </div>
        </div>
        </div>

        {/* Two-column layout */}
        <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">

          {/* ── LEFT: main content ── */}
          <div className="min-w-0 flex-1 space-y-6">

            {/* Title + price */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                <div className="flex shrink-0 items-center gap-1">
                  <Button variant="ghost" size="icon" className="size-8">
                    <Heart className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8">
                    <Share2 className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full border bg-muted/50 px-3 py-0.5 text-xs font-semibold">{price}</span>
                <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                  availability === "Available"
                    ? "bg-green-600 text-white"
                    : availability === "Reserved"
                    ? "bg-secondary text-secondary-foreground border"
                    : "border text-foreground"
                }`}>
                  {availability}
                </span>
              </div>
            </div>


            {/* Spec row */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-muted-foreground" /> {neighborhood}
              </span>
              <span className="flex items-center gap-1.5">
                <Bed className="size-4 text-muted-foreground" /> {beds} beds
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="size-4 text-muted-foreground" /> {baths} baths
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize className="size-4 text-muted-foreground" /> {sqft} sqft
              </span>
              <span className="flex items-center gap-1.5">
                <Car className="size-4 text-muted-foreground" /> {parking} parking
              </span>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

            {/* Info + highlights grid */}
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              <div className="flex flex-col items-center gap-2 rounded-xl border bg-muted/30 px-3 py-4 text-center">
                <Building2 className="size-5 text-muted-foreground" />
                <span className="text-xs font-medium leading-tight tracking-wide">{type}</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border bg-muted/30 px-3 py-4 text-center">
                <Paintbrush className="size-5 text-muted-foreground" />
                <span className="text-xs font-medium leading-tight tracking-wide">{style}</span>
              </div>
              {lotSize > 0 && (
                <div className="flex flex-col items-center gap-2 rounded-xl border bg-muted/30 px-3 py-4 text-center">
                  <Ruler className="size-5 text-muted-foreground" />
                  <span className="text-xs font-medium leading-tight tracking-wide">{lotSize} ac lot</span>
                </div>
              )}
              {tags.map((tag) => {
                const Icon = TAG_ICONS[tag]
                return (
                  <div key={tag} className="flex flex-col items-center gap-2 rounded-xl border bg-muted/30 px-3 py-4 text-center">
                    {Icon && <Icon className="size-5 text-muted-foreground" />}
                    <span className="text-xs font-medium leading-tight tracking-wide">{tag}</span>
                  </div>
                )
              })}
            </div>

            <Separator />

            {/* Location & proximity */}
            {/* Floor plan */}
            <div>
              <h3 className="font-semibold">Floor plan</h3>
              <div className="mt-3 overflow-hidden rounded-xl border bg-muted">
                <div className="flex aspect-[4/3] items-center justify-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <LayoutDashboard className="size-8 opacity-40" />
                    <span className="text-sm">Floor plan coming soon</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t bg-background px-4 py-2.5 text-sm">
                  <span className="text-muted-foreground">{sqft} sqft · {beds} bed · {baths} bath</span>
                  <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
                    <Maximize className="size-3.5" /> Full screen
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="flex items-center gap-2 font-semibold">
                Location &amp; proximity
              </h3>
              <div className="mt-2 flex aspect-[16/5] items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
                Map
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {closeTo.map((name) => (
                  <div key={name} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                    <Ruler className="size-3.5 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="font-medium leading-tight">{name}</p>
                      <p className="text-xs text-muted-foreground">{CLOSE_TO_DISTANCE[name] ?? "< 5 min walk"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Facts & features */}
            <div>
              <h3 className="font-semibold">Facts &amp; features</h3>

              <div className="mt-3 rounded-lg border">
                <div className="border-b bg-muted/40 px-4 py-2 text-sm font-medium">Interior</div>
                <div className="grid gap-4 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold">Bedrooms &amp; bathrooms</p>
                    <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
                      <li>Bedrooms: {beds}</li>
                      <li>Bathrooms: {baths}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Interior area</p>
                    <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
                      <li>Livable area: {sqft} sqft</li>
                      {lotSize > 0 && <li>Lot: {lotSize} acres</li>}
                      <li>Parking: {parking} {parking === 1 ? "spot" : "spots"}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-lg border">
                <div className="border-b bg-muted/40 px-4 py-2 text-sm font-medium">Amenities &amp; Services</div>
                <div className="flex flex-wrap gap-2 p-4">
                  {amenities.map((a) => <Badge key={a} variant="secondary">{a}</Badge>)}
                </div>
              </div>

              <div className="mt-3 rounded-lg border">
                <div className="border-b bg-muted/40 px-4 py-2 text-sm font-medium">All Features</div>
                <ul className="grid gap-1.5 p-4 text-sm text-muted-foreground sm:grid-cols-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5">
                      <span className="size-1 shrink-0 rounded-full bg-muted-foreground" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Compare + Financing cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3 rounded-xl border bg-card p-5">
                <div>
                  <p className="font-semibold">Compare residences</p>
                  <p className="mt-1 text-sm text-muted-foreground">Side-by-side comparison of specs, pricing, and amenities.</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/residences/compare">Compare</Link>
                </Button>
              </div>
              <div className="space-y-3 rounded-xl border bg-card p-5">
                <div>
                  <p className="font-semibold">Explore financing</p>
                  <p className="mt-1 text-sm text-muted-foreground">Learn about mortgage options and get pre-qualified.</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/residences/financing">View Options</Link>
                </Button>
              </div>
            </div>

          </div>

          {/* ── RIGHT: sticky action panel ── */}
          <div className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-6 space-y-3 rounded-xl border bg-card p-5 shadow-sm">
              {/* CTAs */}
              <Button className="w-full" size="lg" asChild>
                <Link href={`/residences/${id}/reserve`}>Reserve Residence</Link>
              </Button>
              <Button variant="outline" className="w-full" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link href={`/residences/${id}/customize`}>Customize Residence</Link>
              </Button>

            </div>
          </div>

        </div>

        {/* Mobile CTAs (visible only below lg) */}
        <div className="sticky bottom-0 border-t bg-background/95 px-6 py-3 backdrop-blur-sm lg:hidden">
          <div className="flex gap-2">
            <Button className="flex-1" asChild>
              <Link href={`/residences/${id}/reserve`}>Reserve Residence</Link>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
