"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { PropertyCard } from "@/components/property-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, LayoutGrid, List, Bed, Bath, Maximize, Heart } from "lucide-react"
import Link from "next/link"
import { ResidencesMap } from "@/components/residences-map"
import { ResidencesFilters } from "@/components/residences-filters"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ResidenceDetail } from "@/components/residence-detail"
import {
  Property,
  ResidenceFilters,
  DEFAULT_FILTERS,
  applyFilters,
  countActiveFilters,
} from "@/lib/residence-types"

const NEIGHBORHOODS_META = [
  { name: "Cascades",        subtitle: "74 multifamily residences with mountain views" },
  { name: "East Ridge",      subtitle: "118 residences with sweeping ridge panoramas" },
  { name: "West Ridge",      subtitle: "103 homes — multifamily to estate" },
  { name: "The Square",      subtitle: "Steps from retail, dining & cultural venues" },
  { name: "The Crescent",    subtitle: "18 custom single-family homes" },
  { name: "Play Village",    subtitle: "39 family-forward residences" },
  { name: "Lakeside",        subtitle: "Waterfront living on the 10-acre lake" },
  { name: "Base Camp",       subtitle: "Adventure-forward cabins & lodges" },
  { name: "Private Reserve", subtitle: "10 ultra-private estate parcels" },
]

const SAMPLE_PROPERTIES: Property[] = [
  // Cascades (multifamily, 8 units)
  {
    id: "cas-101", title: "Cascades Residence 101", neighborhood: "Cascades",
    price: "$1,250,000", beds: 3, baths: 2, sqft: "2,400", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "EV Charging", "Air Quality Monitoring"],
    closeTo: ["The Square", "Trails", "Spa & Wellness"],
  },
  {
    id: "cas-204", title: "Cascades Residence 204", neighborhood: "Cascades",
    price: "$975,000", beds: 2, baths: 2, sqft: "1,850", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "Air Quality Monitoring"],
    closeTo: ["The Square", "Trails", "Spa & Wellness"],
  },
  {
    id: "cas-308", title: "Cascades Residence 308", neighborhood: "Cascades",
    price: "$1,420,000", beds: 3, baths: 2, sqft: "2,600", type: "Multifamily",
    availability: "Reserved", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "EV Charging", "Air Quality Monitoring"],
    closeTo: ["The Square", "Trails", "Spa & Wellness"],
  },
  {
    id: "cas-412", title: "Cascades Penthouse 412", neighborhood: "Cascades",
    price: "$1,895,000", beds: 4, baths: 3, sqft: "3,400", type: "Multifamily",
    availability: "Available", parking: 2, lotSize: 0,
    amenities: ["Pool", "Terrace", "Gym", "Smart Home", "EV Charging", "Chef's Kitchen", "Air Quality Monitoring"],
    closeTo: ["The Square", "Trails", "Spa & Wellness"],
  },
  {
    id: "cas-115", title: "Cascades Residence 115", neighborhood: "Cascades",
    price: "$820,000", beds: 2, baths: 1, sqft: "1,500", type: "Multifamily",
    availability: "Coming Soon", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home"],
    closeTo: ["The Square", "Trails", "Spa & Wellness"],
  },
  {
    id: "cas-220", title: "Cascades Residence 220", neighborhood: "Cascades",
    price: "$1,090,000", beds: 3, baths: 2, sqft: "2,100", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "Air Quality Monitoring"],
    closeTo: ["The Square", "Trails", "Spa & Wellness"],
  },
  {
    id: "cas-318", title: "Cascades Residence 318", neighborhood: "Cascades",
    price: "$1,340,000", beds: 3, baths: 2, sqft: "2,500", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "EV Charging"],
    closeTo: ["The Square", "Trails", "Spa & Wellness"],
  },
  {
    id: "cas-405", title: "Cascades Loft 405", neighborhood: "Cascades",
    price: "$760,000", beds: 1, baths: 1, sqft: "1,200", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Gym", "Smart Home"],
    closeTo: ["The Square", "Trails", "Spa & Wellness"],
  },

  // The Square (multifamily, 8 units)
  {
    id: "sq-101", title: "The Square Unit 101", neighborhood: "The Square",
    price: "$695,000", beds: 1, baths: 1, sqft: "1,050", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home"],
    closeTo: ["The Square", "Spa & Wellness", "Play Village"],
  },
  {
    id: "sq-208", title: "The Square Unit 208", neighborhood: "The Square",
    price: "$890,000", beds: 2, baths: 2, sqft: "1,650", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "Air Quality Monitoring"],
    closeTo: ["The Square", "Spa & Wellness", "Play Village"],
  },
  {
    id: "sq-312", title: "The Square Unit 312", neighborhood: "The Square",
    price: "$1,050,000", beds: 3, baths: 2, sqft: "2,000", type: "Multifamily",
    availability: "Reserved", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "EV Charging"],
    closeTo: ["The Square", "Spa & Wellness", "Play Village"],
  },
  {
    id: "sq-402", title: "The Square Penthouse 402", neighborhood: "The Square",
    price: "$1,650,000", beds: 3, baths: 3, sqft: "2,800", type: "Multifamily",
    availability: "Available", parking: 2, lotSize: 0,
    amenities: ["Pool", "Terrace", "Gym", "Smart Home", "EV Charging", "Chef's Kitchen", "Air Quality Monitoring"],
    closeTo: ["The Square", "Spa & Wellness", "Play Village"],
  },
  {
    id: "sq-115", title: "The Square Unit 115", neighborhood: "The Square",
    price: "$745,000", beds: 2, baths: 1, sqft: "1,300", type: "Multifamily",
    availability: "Coming Soon", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home"],
    closeTo: ["The Square", "Spa & Wellness", "Play Village"],
  },
  {
    id: "sq-222", title: "The Square Unit 222", neighborhood: "The Square",
    price: "$925,000", beds: 2, baths: 2, sqft: "1,700", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "Air Quality Monitoring"],
    closeTo: ["The Square", "Spa & Wellness", "Play Village"],
  },
  {
    id: "sq-305", title: "The Square Unit 305", neighborhood: "The Square",
    price: "$1,120,000", beds: 3, baths: 2, sqft: "2,100", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "EV Charging"],
    closeTo: ["The Square", "Spa & Wellness", "Play Village"],
  },
  {
    id: "sq-410", title: "The Square Loft 410", neighborhood: "The Square",
    price: "$650,000", beds: 1, baths: 1, sqft: "990", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Gym", "Smart Home"],
    closeTo: ["The Square", "Spa & Wellness", "Play Village"],
  },

  // East Ridge (multifamily, 7 units)
  {
    id: "er-104", title: "East Ridge Residence 104", neighborhood: "East Ridge",
    price: "$1,050,000", beds: 2, baths: 2, sqft: "1,900", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "Air Quality Monitoring"],
    closeTo: ["The Square", "Trails"],
  },
  {
    id: "er-211", title: "East Ridge Residence 211", neighborhood: "East Ridge",
    price: "$1,350,000", beds: 3, baths: 2, sqft: "2,450", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "EV Charging"],
    closeTo: ["The Square", "Trails"],
  },
  {
    id: "er-318", title: "East Ridge Villa 318", neighborhood: "East Ridge",
    price: "$1,750,000", beds: 4, baths: 3, sqft: "3,200", type: "Multifamily",
    availability: "Reserved", parking: 2, lotSize: 0,
    amenities: ["Pool", "Terrace", "Gym", "Smart Home", "EV Charging", "Air Quality Monitoring"],
    closeTo: ["The Square", "Trails"],
  },
  {
    id: "er-422", title: "East Ridge Penthouse 422", neighborhood: "East Ridge",
    price: "$2,100,000", beds: 4, baths: 3, sqft: "3,600", type: "Multifamily",
    availability: "Available", parking: 2, lotSize: 0,
    amenities: ["Pool", "Terrace", "Gym", "Smart Home", "EV Charging", "Chef's Kitchen", "Air Quality Monitoring"],
    closeTo: ["The Square", "Trails"],
  },
  {
    id: "er-108", title: "East Ridge Residence 108", neighborhood: "East Ridge",
    price: "$980,000", beds: 2, baths: 2, sqft: "1,750", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home"],
    closeTo: ["The Square", "Trails"],
  },
  {
    id: "er-214", title: "East Ridge Residence 214", neighborhood: "East Ridge",
    price: "$1,180,000", beds: 3, baths: 2, sqft: "2,200", type: "Multifamily",
    availability: "Coming Soon", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "Air Quality Monitoring"],
    closeTo: ["The Square", "Trails"],
  },
  {
    id: "er-320", title: "East Ridge Loft 320", neighborhood: "East Ridge",
    price: "$820,000", beds: 1, baths: 1, sqft: "1,350", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Gym", "Smart Home"],
    closeTo: ["The Square", "Trails"],
  },

  // West Ridge (mix, 6 units)
  {
    id: "wr-101", title: "West Ridge Residence 101", neighborhood: "West Ridge",
    price: "$1,480,000", beds: 3, baths: 2, sqft: "2,700", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "Air Quality Monitoring"],
    closeTo: ["Trails", "Base Camp"],
  },
  {
    id: "wr-205", title: "West Ridge Home 205", neighborhood: "West Ridge",
    price: "$2,100,000", beds: 4, baths: 3, sqft: "3,800", type: "Single-Family",
    availability: "Available", parking: 2, lotSize: 1.5,
    amenities: ["Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Air Quality Monitoring"],
    closeTo: ["Trails", "Base Camp"],
  },
  {
    id: "wr-08", title: "West Ridge Estate 8", neighborhood: "West Ridge",
    price: "$3,400,000", beds: 5, baths: 4, sqft: "5,000", type: "Single-Family",
    availability: "Available", parking: 3, lotSize: 2.5,
    amenities: ["Pool", "Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Wine Cellar", "Sauna", "Air Quality Monitoring"],
    closeTo: ["Trails", "Base Camp"],
  },
  {
    id: "wr-304", title: "West Ridge Residence 304", neighborhood: "West Ridge",
    price: "$1,650,000", beds: 3, baths: 2, sqft: "2,900", type: "Multifamily",
    availability: "Reserved", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Gym", "Smart Home", "EV Charging"],
    closeTo: ["Trails", "Base Camp"],
  },
  {
    id: "wr-12", title: "West Ridge Home 12", neighborhood: "West Ridge",
    price: "$2,550,000", beds: 4, baths: 3, sqft: "4,200", type: "Single-Family",
    availability: "Available", parking: 2, lotSize: 2.0,
    amenities: ["Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Wine Cellar", "Air Quality Monitoring"],
    closeTo: ["Trails", "Base Camp"],
  },
  {
    id: "wr-408", title: "West Ridge Penthouse 408", neighborhood: "West Ridge",
    price: "$2,200,000", beds: 4, baths: 3, sqft: "3,500", type: "Multifamily",
    availability: "Coming Soon", parking: 2, lotSize: 0,
    amenities: ["Pool", "Terrace", "Gym", "Smart Home", "EV Charging", "Chef's Kitchen"],
    closeTo: ["Trails", "Base Camp"],
  },

  // Play Village (multifamily, 5 units)
  {
    id: "pv-08", title: "Play Village Unit 8", neighborhood: "Play Village",
    price: "$785,000", beds: 2, baths: 2, sqft: "1,450", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Playroom", "Smart Home"],
    closeTo: ["The Square", "Play Village", "Lake"],
  },
  {
    id: "pv-17", title: "Play Village Unit 17", neighborhood: "Play Village",
    price: "$920,000", beds: 3, baths: 2, sqft: "1,800", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Playroom", "Smart Home", "Air Quality Monitoring"],
    closeTo: ["The Square", "Play Village", "Lake"],
  },
  {
    id: "pv-22", title: "Play Village Unit 22", neighborhood: "Play Village",
    price: "$980,000", beds: 3, baths: 2, sqft: "1,900", type: "Multifamily",
    availability: "Reserved", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Playroom", "Smart Home", "EV Charging"],
    closeTo: ["The Square", "Play Village", "Lake"],
  },
  {
    id: "pv-31", title: "Play Village Unit 31", neighborhood: "Play Village",
    price: "$850,000", beds: 2, baths: 2, sqft: "1,600", type: "Multifamily",
    availability: "Available", parking: 1, lotSize: 0,
    amenities: ["Pool", "Garden", "Playroom", "Smart Home"],
    closeTo: ["The Square", "Play Village", "Lake"],
  },
  {
    id: "pv-39", title: "Play Village Townhome 39", neighborhood: "Play Village",
    price: "$1,150,000", beds: 3, baths: 2, sqft: "2,200", type: "Multifamily",
    availability: "Available", parking: 2, lotSize: 0,
    amenities: ["Pool", "Garden", "Playroom", "Smart Home", "EV Charging", "Air Quality Monitoring"],
    closeTo: ["The Square", "Play Village", "Lake"],
  },

  // The Crescent (single-family, 5 units)
  {
    id: "cr-03", title: "The Crescent Home 3", neighborhood: "The Crescent",
    price: "$2,650,000", beds: 4, baths: 3, sqft: "3,800", type: "Single-Family",
    availability: "Available", parking: 2, lotSize: 1.5,
    amenities: ["Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Air Quality Monitoring"],
    closeTo: ["Trails", "Spa & Wellness"],
  },
  {
    id: "cr-07", title: "The Crescent Home 7", neighborhood: "The Crescent",
    price: "$3,200,000", beds: 4, baths: 3, sqft: "4,100", type: "Single-Family",
    availability: "Available", parking: 2, lotSize: 2.0,
    amenities: ["Pool", "Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Wine Cellar"],
    closeTo: ["Trails", "Spa & Wellness"],
  },
  {
    id: "cr-11", title: "The Crescent Estate 11", neighborhood: "The Crescent",
    price: "$4,100,000", beds: 5, baths: 4, sqft: "5,500", type: "Single-Family",
    availability: "Reserved", parking: 3, lotSize: 3.0,
    amenities: ["Pool", "Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Wine Cellar", "Sauna", "Chef's Kitchen", "Air Quality Monitoring"],
    closeTo: ["Trails", "Spa & Wellness"],
  },
  {
    id: "cr-14", title: "The Crescent Home 14", neighborhood: "The Crescent",
    price: "$2,850,000", beds: 4, baths: 3, sqft: "4,000", type: "Single-Family",
    availability: "Available", parking: 2, lotSize: 1.8,
    amenities: ["Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Air Quality Monitoring"],
    closeTo: ["Trails", "Spa & Wellness"],
  },
  {
    id: "cr-18", title: "The Crescent Home 18", neighborhood: "The Crescent",
    price: "$3,500,000", beds: 5, baths: 4, sqft: "4,700", type: "Single-Family",
    availability: "Coming Soon", parking: 3, lotSize: 2.5,
    amenities: ["Pool", "Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Wine Cellar", "Sauna"],
    closeTo: ["Trails", "Spa & Wellness"],
  },

  // Lakeside (mix, 4 units)
  {
    id: "ls-04", title: "Lakeside Cabin 4", neighborhood: "Lakeside",
    price: "$1,850,000", beds: 3, baths: 2, sqft: "2,400", type: "Single-Family",
    availability: "Available", parking: 2, lotSize: 1.0,
    amenities: ["Garden", "Terrace", "Smart Home", "EV Charging", "Air Quality Monitoring"],
    closeTo: ["Lake", "Trails"],
  },
  {
    id: "ls-10", title: "Lakeside Residence 10", neighborhood: "Lakeside",
    price: "$2,800,000", beds: 4, baths: 3, sqft: "3,600", type: "Single-Family",
    availability: "Available", parking: 2, lotSize: 1.5,
    amenities: ["Pool", "Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Air Quality Monitoring"],
    closeTo: ["Lake", "Trails"],
  },
  {
    id: "ls-16", title: "Lakeside Villa 16", neighborhood: "Lakeside",
    price: "$3,650,000", beds: 5, baths: 4, sqft: "4,800", type: "Single-Family",
    availability: "Reserved", parking: 3, lotSize: 2.5,
    amenities: ["Pool", "Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Wine Cellar", "Sauna", "Air Quality Monitoring"],
    closeTo: ["Lake", "Trails"],
  },
  {
    id: "ls-22", title: "Lakeside Retreat 22", neighborhood: "Lakeside",
    price: "$2,200,000", beds: 4, baths: 3, sqft: "3,100", type: "Single-Family",
    availability: "Available", parking: 2, lotSize: 1.2,
    amenities: ["Garden", "Terrace", "Smart Home", "EV Charging", "Air Quality Monitoring"],
    closeTo: ["Lake", "Trails"],
  },

  // Base Camp (single-family, 4 units)
  {
    id: "bc-02", title: "Base Camp Cabin 2", neighborhood: "Base Camp",
    price: "$1,200,000", beds: 2, baths: 2, sqft: "1,950", type: "Single-Family",
    availability: "Available", parking: 2, lotSize: 1.0,
    amenities: ["Garden", "Smart Home", "EV Charging", "Air Quality Monitoring"],
    closeTo: ["Trails", "Base Camp", "Lake"],
  },
  {
    id: "bc-03", title: "Base Camp Cabin 3", neighborhood: "Base Camp",
    price: "$1,450,000", beds: 3, baths: 2, sqft: "2,200", type: "Single-Family",
    availability: "Available", parking: 2, lotSize: 1.2,
    amenities: ["Garden", "Smart Home", "EV Charging", "Home Office", "Air Quality Monitoring"],
    closeTo: ["Trails", "Base Camp", "Lake"],
  },
  {
    id: "bc-07", title: "Base Camp Lodge 7", neighborhood: "Base Camp",
    price: "$1,950,000", beds: 4, baths: 3, sqft: "3,100", type: "Single-Family",
    availability: "Reserved", parking: 2, lotSize: 2.0,
    amenities: ["Pool", "Garden", "Smart Home", "EV Charging", "Home Office", "Sauna", "Air Quality Monitoring"],
    closeTo: ["Trails", "Base Camp", "Lake"],
  },
  {
    id: "bc-11", title: "Base Camp Chalet 11", neighborhood: "Base Camp",
    price: "$2,350,000", beds: 4, baths: 3, sqft: "3,600", type: "Single-Family",
    availability: "Available", parking: 3, lotSize: 2.5,
    amenities: ["Pool", "Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Wine Cellar", "Sauna"],
    closeTo: ["Trails", "Base Camp", "Lake"],
  },

  // Private Reserve (single-family, 3 units)
  {
    id: "pr-02", title: "Private Reserve Estate 2", neighborhood: "Private Reserve",
    price: "$5,200,000", beds: 5, baths: 5, sqft: "6,100", type: "Single-Family",
    availability: "Available", parking: 3, lotSize: 4.0,
    amenities: ["Pool", "Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Wine Cellar", "Sauna", "Chef's Kitchen", "Air Quality Monitoring"],
    closeTo: ["Trails", "Spa & Wellness"],
  },
  {
    id: "pr-05", title: "Private Reserve Estate 5", neighborhood: "Private Reserve",
    price: "$4,500,000", beds: 5, baths: 4, sqft: "5,200", type: "Single-Family",
    availability: "Reserved", parking: 3, lotSize: 3.5,
    amenities: ["Pool", "Garden", "Terrace", "Smart Home", "EV Charging", "Home Office", "Wine Cellar", "Sauna", "Chef's Kitchen"],
    closeTo: ["Trails", "Spa & Wellness"],
  },
  {
    id: "pr-09", title: "Private Reserve Estate 9", neighborhood: "Private Reserve",
    price: "$6,800,000", beds: 6, baths: 6, sqft: "7,400", type: "Single-Family",
    availability: "Coming Soon", parking: 3, lotSize: 4.0,
    amenities: ["Pool", "Garden", "Terrace", "Playroom", "Smart Home", "EV Charging", "Home Office", "Wine Cellar", "Sauna", "Chef's Kitchen", "Air Quality Monitoring"],
    closeTo: ["Trails", "Spa & Wellness"],
  },
]

function PropertyListRow(property: Property & { onSelect?: () => void }) {
  const { title, neighborhood, price, beds, baths, sqft, type, availability, onSelect } = property
  return (
    <div
      className="flex cursor-pointer items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/5"
      onClick={onSelect}
    >
      <div className="relative flex h-20 w-32 shrink-0 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
        Property Image
        <Badge variant="secondary" className="absolute right-2 top-2 text-xs">
          {type}
        </Badge>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-muted-foreground">{neighborhood}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <p className="text-lg font-semibold">{price}</p>
            <Badge
              variant={
                availability === "Available"
                  ? "default"
                  : availability === "Reserved"
                  ? "secondary"
                  : "outline"
              }
              className="text-xs"
            >
              {availability}
            </Badge>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="size-4" /> {beds} beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="size-4" /> {baths} baths
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="size-4" /> {sqft} sqft
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <Heart className="size-4" />
      </Button>
    </div>
  )
}

export default function ResidencesPageV2() {
  const [view, setView] = useState<"list" | "grid">("list")
  const [filters, setFilters] = useState<ResidenceFilters>(DEFAULT_FILTERS)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const visibleProperties = applyFilters(SAMPLE_PROPERTIES, filters)
  const activeCount = countActiveFilters(filters)

  return (
    <>
      <Sheet open={!!selectedProperty} onOpenChange={(open) => { if (!open) setSelectedProperty(null) }}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="!h-[calc(100%-48px)] !w-full !max-w-full rounded-t-xl p-0"
        >
          {selectedProperty && <ResidenceDetail property={selectedProperty} />}
        </SheetContent>
      </Sheet>

      <PageHeader
        breadcrumbs={[{ label: "The Residences", href: "/residences" }, { label: "All Residences - 2" }]}
        title="All Residences - 2"
        description="Browse 330 multifamily units and 113 custom single-family homes across 10 unique neighborhoods on 658 acres."
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search residences..." className="w-64 pl-9" />
          </div>
          <ResidencesFilters
            filters={filters}
            onChange={setFilters}
            activeCount={activeCount}
          />
          <Button variant="outline" asChild>
            <Link href="/residences/compare">Compare Properties</Link>
          </Button>
        </div>
      </PageHeader>

      {/* Neighborhood strip */}
      <div className="border-b bg-background px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NEIGHBORHOODS_META.map(({ name, subtitle }) => {
            const active = filters.neighborhood === name
            return (
              <button
                key={name}
                onClick={() =>
                  setFilters((f) => ({ ...f, neighborhood: active ? "all" : name }))
                }
                className={`flex shrink-0 items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors hover:bg-accent/5 ${
                  active ? "border-foreground bg-foreground/5" : "border-border"
                }`}
              >
                <div className="size-12 shrink-0 rounded-md bg-muted" />
                <div>
                  <p className="text-sm font-medium leading-tight">{name}</p>
                  <p className="mt-0.5 max-w-[160px] text-xs leading-tight text-muted-foreground">
                    {subtitle}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <section className="flex gap-0">
        {/* Left: scrollable results */}
        <div className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {visibleProperties.length}{" "}
              {filters.neighborhood !== "all"
                ? `in ${filters.neighborhood}`
                : "residences available"}
            </p>
            <div className="flex items-center rounded-md border p-1">
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-2"
                onClick={() => setView("list")}
                aria-label="List view"
              >
                <List className="size-4" />
              </Button>
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-2"
                onClick={() => setView("grid")}
                aria-label="Grid view"
              >
                <LayoutGrid className="size-4" />
              </Button>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {visibleProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  onSelect={() => setSelectedProperty(property)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {visibleProperties.map((property) => (
                <PropertyListRow
                  key={property.id}
                  {...property}
                  onSelect={() => setSelectedProperty(property)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: sticky map */}
        <div className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[42%] shrink-0 overflow-hidden border-l lg:block">
          <ResidencesMap
            properties={SAMPLE_PROPERTIES}
            activeNeighborhood={filters.neighborhood === "all" ? null : filters.neighborhood}
            onNeighborhoodClick={(n) =>
              setFilters((f) => ({ ...f, neighborhood: n ?? "all" }))
            }
          />
        </div>
      </section>
    </>
  )
}
