"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SheetClose } from "@/components/ui/sheet"
import {
  Bed,
  Bath,
  Maximize,
  Heart,
  Share2,
  ArrowLeftRight,
  Paintbrush,
  Calculator,
  Car,
  Ruler,
  Images,
  MapPin,
  Box,
  X,
} from "lucide-react"
import type { Property } from "@/lib/residence-types"

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

interface ResidenceDetailProps {
  property: Property
}

export function ResidenceDetail({ property }: ResidenceDetailProps) {
  const {
    id,
    title,
    neighborhood,
    price,
    beds,
    baths,
    sqft,
    type,
    availability,
    parking,
    lotSize,
    amenities,
    closeTo,
  } = property

  const tags = deriveTags(amenities)
  const features = deriveFeatures(amenities)
  const pricePerSqft = calcPricePerSqft(price, sqft)
  const hoa = type === "Multifamily" ? "$620/mo" : "N/A"

  const description = `Perfectly positioned within the ${neighborhood} neighborhood, ${title} is a beautifully designed ${beds}-bedroom ${type === "Multifamily" ? "residence" : "home"} offering an exceptional blend of contemporary architecture and natural living. This open-concept home is thoughtfully crafted for both gracious entertaining and comfortable daily life. Floor-to-ceiling windows frame the surrounding landscape, and every detail reflects Starkdale's commitment to longevity design and biophilic principles.`

  return (
    <div className="flex h-full flex-col">

      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b bg-background px-6 py-3">
        <p className="truncate pr-4 font-semibold">{title}</p>
        <SheetClose asChild>
          <Button variant="ghost" size="sm" className="shrink-0 gap-1.5">
            <X className="size-4" />
            Close
          </Button>
        </SheetClose>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">

        {/* Gallery */}
        <div className="relative grid h-56 grid-cols-4 grid-rows-2 gap-1.5 p-4">
          <div className="col-span-2 row-span-2 flex flex-col items-center justify-center gap-2 rounded-lg bg-muted text-muted-foreground">
            <Box className="size-8 opacity-40" />
            <span className="text-xs font-medium">3D Interactive Video</span>
          </div>
          <div className="flex items-center justify-center rounded-lg bg-muted/80 text-xs text-muted-foreground">Photo 2</div>
          <div className="flex items-center justify-center rounded-lg bg-muted/80 text-xs text-muted-foreground">Photo 3</div>
          <div className="flex items-center justify-center rounded-lg bg-muted/80 text-xs text-muted-foreground">Photo 4</div>
          <div className="flex items-center justify-center rounded-lg bg-muted/80 text-xs text-muted-foreground">Photo 5</div>
          <div className="absolute bottom-6 right-6">
            <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
              <Images className="size-3.5" />
              See all 24 photos
            </Button>
          </div>
        </div>

        <div className="space-y-6 px-6 pb-10">

          {/* Price + title */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{price}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {title} · {neighborhood} Neighborhood
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon"><Heart className="size-4" /></Button>
              <Button variant="ghost" size="icon"><Share2 className="size-4" /></Button>
            </div>
          </div>

          {/* Spec row */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
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

          {/* Info chips */}
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="rounded-md border px-3 py-1.5">
              <span className="text-muted-foreground">Type </span>
              <span className="font-medium">{type}</span>
            </div>
            <div className="rounded-md border px-3 py-1.5">
              <span className="text-muted-foreground">Built </span>
              <span className="font-medium">2026</span>
            </div>
            {lotSize > 0 && (
              <div className="rounded-md border px-3 py-1.5">
                <span className="text-muted-foreground">Lot </span>
                <span className="font-medium">{lotSize} acres</span>
              </div>
            )}
            <div className="rounded-md border px-3 py-1.5">
              <span className="text-muted-foreground">{pricePerSqft}/sqft</span>
            </div>
            {type === "Multifamily" && (
              <div className="rounded-md border px-3 py-1.5">
                <span className="text-muted-foreground">HOA </span>
                <span className="font-medium">{hoa}</span>
              </div>
            )}
            <Badge
              variant={availability === "Available" ? "default" : availability === "Reserved" ? "secondary" : "outline"}
              className={availability === "Available" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {availability}
            </Badge>
          </div>

          <Separator />

          {/* What's special */}
          <div>
            <h3 className="font-semibold">What's special</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border px-3 py-1 text-xs font-medium tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>

          <Separator />

          {/* Close to */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold">
              <MapPin className="size-4 text-muted-foreground" /> Location &amp; proximity
            </h3>
            <div className="mt-2 flex aspect-[16/5] items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
              Map
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {closeTo.map((name) => (
                <div key={name} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                  <Ruler className="size-3.5 shrink-0 text-muted-foreground" />
                  <span className="font-medium">{name}</span>
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

          <Separator />

          {/* CTA */}
          <div className="space-y-2">
            <Button className="w-full" size="lg" asChild>
              <Link href="/contact">Request a tour</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href={`/residences/${id}/customize`}>
                <Paintbrush className="size-4" /> Customize Property
              </Link>
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/residences/compare">
                  <ArrowLeftRight className="size-4" /> Compare
                </Link>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/residences/financing">
                  <Calculator className="size-4" /> Financing
                </Link>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Contact form */}
          <div>
            <h3 className="font-semibold">Contact a sales advisor</h3>
            <div className="mt-3 space-y-3">
              <Input placeholder="Name *" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Phone *" type="tel" />
                <Input placeholder="Email *" type="email" />
              </div>
              <Textarea
                placeholder={`I am interested in ${title}.`}
                className="resize-none"
                rows={3}
              />
              <Button className="w-full">Contact sales team</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
