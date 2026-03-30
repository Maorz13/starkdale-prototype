import { Bed, Bath, Maximize, MapPin, Building2, Paintbrush } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface PropertyCardProps {
  id: string
  title: string
  neighborhood: string
  price: string
  beds: number
  baths: number
  sqft: string
  type: string
  style?: string
  availability?: string
}

export function PropertyCard({
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
}: PropertyCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      {/* Image */}
      <Link href={`/residences/${id}`} className="w-full">
        <div className="relative flex aspect-video items-center justify-center bg-muted text-sm text-muted-foreground">
          Property Image
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">

        {/* Title */}
        <Link href={`/residences/${id}`}>
          <h3 className="text-base font-semibold leading-tight group-hover:underline">{title}</h3>
        </Link>

        {/* Price + availability */}
        <div className="flex items-center gap-2">
          <span className="rounded-full border bg-muted/50 px-3 py-0.5 text-xs font-semibold">{price}</span>
          {availability && (
            <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
              availability === "Available"
                ? "bg-green-600 text-white"
                : availability === "Reserved"
                ? "border bg-secondary text-secondary-foreground"
                : "border text-foreground"
            }`}>
              {availability}
            </span>
          )}
        </div>

        {/* Neighborhood + Specs */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5 shrink-0" /> {neighborhood}
          </span>
          <span className="flex items-center gap-1">
            <Bed className="size-3.5" /> {beds} beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="size-3.5" /> {baths} baths
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="size-3.5" /> {sqft}
          </span>
        </div>

        {/* Type + Style */}
        <div className="mt-auto flex gap-2 pt-1">
          <span className="flex items-center gap-1 rounded-md border bg-muted/30 px-2 py-1 text-xs font-medium">
            <Building2 className="size-3" /> {type}
          </span>
          {style && (
            <span className="flex items-center gap-1 rounded-md border bg-muted/30 px-2 py-1 text-xs font-medium">
              <Paintbrush className="size-3" /> {style}
            </span>
          )}
        </div>

      </div>
    </Card>
  )
}
