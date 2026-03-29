import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  ChevronLeft,
  MapPin,
  Box,
} from "lucide-react"

const SAMPLE_PROPERTY = {
  title: "Cascades Residence 101",
  neighborhood: "Cascades",
  price: "$1,250,000",
  pricePerSqft: "$521",
  beds: 3,
  baths: 2,
  sqft: "2,400",
  type: "Multifamily" as const,
  availability: "Available" as const,
  parking: 2,
  lotSize: 0,
  builtYear: 2026,
  hoa: "$620/mo",
  amenities: [
    "Pool",
    "Garden",
    "Smart Home",
    "EV Charging",
    "Air Quality Monitoring",
    "Chef's Kitchen",
  ],
  closeTo: [
    { name: "The Square", distance: "5 min walk" },
    { name: "Trails", distance: "Direct access" },
    { name: "Spa & Wellness", distance: "8 min walk" },
  ],
  description:
    "Perfectly positioned within the Cascades neighborhood, Residence 101 is a beautifully designed 3-bedroom home offering an exceptional blend of contemporary architecture and natural living. This expansive open-concept home is thoughtfully designed for both gracious entertaining and comfortable daily life. A welcoming entry foyer leads to beautifully proportioned living and dining spaces, with floor-to-ceiling windows framing the surrounding landscape.",
  features: [
    "Open-concept floor plan",
    "Floor-to-ceiling windows",
    "Chef's kitchen with island",
    "Primary suite with walk-in closet",
    "Smart home integration",
    "EV charging ready",
    "Biophilic design elements",
    "Air quality monitoring",
    "Hardwood flooring throughout",
    "Private terrace",
    "Blackout window treatments",
    "In-unit laundry",
  ],
  tags: [
    "OPEN CONCEPT",
    "BIOPHILIC DESIGN",
    "SMART HOME",
    "TRAIL ACCESS",
    "WELLNESS FOCUSED",
    "LONGEVITY DESIGN",
  ],
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = SAMPLE_PROPERTY

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/residences" className="hover:text-foreground">The Residences</Link>
            <span>/</span>
            <span className="text-foreground">{id.toUpperCase()}</span>
          </nav>
        </div>
      </div>

      {/* Title */}
      <div className="mx-auto max-w-7xl px-4 pb-2 pt-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
      </div>

      {/* Photo Gallery */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="relative grid h-[420px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl">
          {/* Main large image */}
          <div className="col-span-2 row-span-2 flex flex-col items-center justify-center gap-3 bg-muted text-muted-foreground">
            <Box className="size-10 opacity-40" />
            <span className="text-sm font-medium">3D Interactive Video</span>
          </div>
          {/* 4 smaller images */}
          <div className="flex items-center justify-center bg-muted/80 text-xs text-muted-foreground">
            Photo 2
          </div>
          <div className="flex items-center justify-center bg-muted/80 text-xs text-muted-foreground">
            Photo 3
          </div>
          <div className="flex items-center justify-center bg-muted/80 text-xs text-muted-foreground">
            Photo 4
          </div>
          <div className="flex items-center justify-center bg-muted/80 text-xs text-muted-foreground">
            Photo 5
          </div>
          {/* See all photos button */}
          <div className="absolute bottom-4 right-4">
            <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
              <Images className="size-3.5" />
              See all 24 photos
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* ── Left: scrollable content ── */}
          <div className="lg:col-span-2">

            {/* Price + title */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">{property.price}</h1>
                <p className="mt-1 text-base text-muted-foreground">
                  {property.title} · {property.neighborhood} Neighborhood
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Heart className="size-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="size-5" />
                </Button>
              </div>
            </div>

            {/* Spec row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-base">
              <span className="flex items-center gap-1.5 font-medium">
                <Bed className="size-4 text-muted-foreground" /> {property.beds} beds
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Bath className="size-4 text-muted-foreground" /> {property.baths} baths
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Maximize className="size-4 text-muted-foreground" /> {property.sqft} sqft
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Car className="size-4 text-muted-foreground" /> {property.parking} parking
              </span>
            </div>

            {/* Info chips row */}
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <div className="rounded-md border px-3 py-1.5">
                <span className="text-muted-foreground">Type </span>
                <span className="font-medium">{property.type}</span>
              </div>
              <div className="rounded-md border px-3 py-1.5">
                <span className="text-muted-foreground">Built </span>
                <span className="font-medium">{property.builtYear}</span>
              </div>
              {property.lotSize > 0 && (
                <div className="rounded-md border px-3 py-1.5">
                  <span className="text-muted-foreground">Lot </span>
                  <span className="font-medium">{property.lotSize} acres</span>
                </div>
              )}
              <div className="rounded-md border px-3 py-1.5">
                <span className="text-muted-foreground">{property.pricePerSqft}/sqft</span>
              </div>
              <div className="rounded-md border px-3 py-1.5">
                <span className="text-muted-foreground">HOA </span>
                <span className="font-medium">{property.hoa}</span>
              </div>
              <Badge
                variant={
                  property.availability === "Available"
                    ? "default"
                    : property.availability === "Reserved"
                    ? "secondary"
                    : "outline"
                }
                className={property.availability === "Available" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {property.availability}
              </Badge>
            </div>

            <Separator className="my-6" />

            {/* What's special */}
            <div>
              <h2 className="text-lg font-semibold">What's special</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {property.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-xs font-medium tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {property.description}
              </p>
            </div>

            <Separator className="my-6" />

            {/* Location */}
            <div>
              <h2 className="text-lg font-semibold">Location</h2>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                <span>{property.neighborhood} Neighborhood · Starkdale Farms, Upstate NY</span>
              </div>
              <div className="mt-3 flex aspect-[16/6] items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
                Map
              </div>
              {/* Travel times */}
              <div className="mt-4">
                <p className="text-sm font-medium">Close to</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {property.closeTo.map(({ name, distance }) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                    >
                      <Ruler className="size-3.5 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium leading-tight">{name}</p>
                        <p className="text-xs text-muted-foreground">{distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Facts & Features */}
            <div>
              <h2 className="text-lg font-semibold">Facts &amp; features</h2>

              {/* Interior */}
              <div className="mt-4 rounded-lg border">
                <div className="border-b bg-muted/40 px-4 py-2 text-sm font-medium">Interior</div>
                <div className="grid gap-6 p-4 sm:grid-cols-2">
                  {/* Bedrooms & bathrooms */}
                  <div>
                    <p className="text-sm font-semibold">Bedrooms &amp; bathrooms</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>Bedrooms: {property.beds}</li>
                      <li>Bathrooms: {property.baths}</li>
                    </ul>
                  </div>
                  {/* Features */}
                  <div>
                    <p className="text-sm font-semibold">Features</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {property.features.slice(0, 4).map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  {/* Appliances */}
                  <div>
                    <p className="text-sm font-semibold">Appliances</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>Included: Dishwasher, Washer/Dryer</li>
                      <li>Chef's Kitchen appliances</li>
                    </ul>
                  </div>
                  {/* Interior area */}
                  <div>
                    <p className="text-sm font-semibold">Interior area</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>Total interior livable area: {property.sqft} sqft</li>
                      {property.lotSize > 0 && (
                        <li>Lot size: {property.lotSize} acres</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-4 rounded-lg border">
                <div className="border-b bg-muted/40 px-4 py-2 text-sm font-medium">Amenities &amp; Services</div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((a) => (
                      <Badge key={a} variant="secondary">{a}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* All features */}
              <div className="mt-4 rounded-lg border">
                <div className="border-b bg-muted/40 px-4 py-2 text-sm font-medium">All Features</div>
                <div className="p-4">
                  <ul className="grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
                    {property.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5">
                        <span className="size-1 shrink-0 rounded-full bg-muted-foreground" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Contact form */}
            <div>
              <h2 className="text-lg font-semibold">Contact a sales advisor</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Connect directly with our Starkdale sales team.
              </p>
              <div className="mt-4 space-y-3">
                <Input placeholder="Name *" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Phone *" type="tel" />
                  <Input placeholder="Email *" type="email" />
                </div>
                <Textarea
                  placeholder={`I am interested in ${property.title}.`}
                  className="resize-none"
                  rows={3}
                />
                <Button className="w-full">Contact sales team</Button>
              </div>
            </div>
          </div>

          {/* ── Right: sticky sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">

              {/* Tour CTA card */}
              <div className="rounded-xl border bg-card p-5 shadow-sm">
                <p className="text-xl font-bold">{property.price}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {property.beds} bd · {property.baths} ba · {property.sqft} sqft
                </p>
                <Button className="mt-4 w-full" size="lg" asChild>
                  <Link href="/contact">Request a tour</Link>
                </Button>
                <Button variant="outline" className="mt-2 w-full" asChild>
                  <Link href="/contact">Contact an advisor</Link>
                </Button>
              </div>

              {/* Actions card */}
              <div className="rounded-xl border bg-card p-5 shadow-sm space-y-3">
                <p className="text-sm font-semibold">Property tools</p>
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                  <Link href={`/residences/${id}/customize`}>
                    <Paintbrush className="size-4" /> Customize Property
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                  <Link href="/residences/compare">
                    <ArrowLeftRight className="size-4" /> Compare Properties
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                  <Link href="/residences/financing">
                    <Calculator className="size-4" /> Financing Tools
                  </Link>
                </Button>
              </div>

              {/* Back link */}
              <Button variant="ghost" className="w-full gap-2" asChild>
                <Link href="/residences">
                  <ChevronLeft className="size-4" /> Back to all residences
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
