export type Availability = "Available" | "Reserved" | "Coming Soon"

export interface Property {
  id: string
  title: string
  neighborhood: string
  price: string           // "$1,250,000"
  beds: number
  baths: number
  sqft: string            // "2,400"
  type: "Multifamily" | "Single-Family"
  availability: Availability
  parking: number         // spots
  lotSize: number         // acres, 0 for multifamily
  amenities: string[]
  closeTo: string[]       // e.g. ["The Square", "Trails", "Spa & Wellness"]
}

export interface ResidenceFilters {
  availability: Availability[]       // empty = any
  type: string                       // "all" | "Multifamily" | "Single-Family"
  neighborhood: string               // "all" | neighborhood name
  priceRange: [number, number]       // [min, max] in dollars
  closeTo: string[]                  // empty = any (OR logic)
  amenities: string[]                // empty = any (AND logic)
  bedsMin: number                    // 0 = any
  bathsMin: number                   // 0 = any
  parkingMin: number                 // 0 = any
  sqftRange: [number, number]        // [min, max]
  lotSizeMin: number                 // 0 = any, in acres
}

export const DEFAULT_FILTERS: ResidenceFilters = {
  availability: [],
  type: "all",
  neighborhood: "all",
  priceRange: [500_000, 8_000_000],
  closeTo: [],
  amenities: [],
  bedsMin: 0,
  bathsMin: 0,
  parkingMin: 0,
  sqftRange: [500, 8_000],
  lotSizeMin: 0,
}

export const ALL_AMENITIES = [
  "Pool", "Garden", "Terrace", "Playroom", "Gym",
  "EV Charging", "Smart Home", "Air Quality Monitoring",
  "Wine Cellar", "Chef's Kitchen", "Home Office", "Sauna",
]

export const ALL_CLOSE_TO = [
  "The Square", "Trails", "Spa & Wellness", "Lake", "Play Village", "Base Camp",
]

export const NEIGHBORHOODS = [
  "Cascades", "West Ridge", "The Square", "East Ridge",
  "The Crescent", "Lakeside", "Play Village", "Base Camp", "Private Reserve",
]

export function countActiveFilters(f: ResidenceFilters): number {
  let n = 0
  if (f.availability.length) n++
  if (f.type !== "all") n++
  if (f.neighborhood !== "all") n++
  if (f.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] || f.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]) n++
  if (f.closeTo.length) n++
  if (f.amenities.length) n++
  if (f.bedsMin) n++
  if (f.bathsMin) n++
  if (f.parkingMin) n++
  if (f.sqftRange[0] !== DEFAULT_FILTERS.sqftRange[0] || f.sqftRange[1] !== DEFAULT_FILTERS.sqftRange[1]) n++
  if (f.lotSizeMin) n++
  return n
}

export function applyFilters(properties: Property[], f: ResidenceFilters): Property[] {
  return properties.filter((p) => {
    if (f.availability.length && !f.availability.includes(p.availability)) return false
    if (f.type !== "all" && p.type !== f.type) return false
    if (f.neighborhood !== "all" && p.neighborhood !== f.neighborhood) return false
    const price = Number(p.price.replace(/[$,]/g, ""))
    if (price < f.priceRange[0] || price > f.priceRange[1]) return false
    if (f.closeTo.length && !f.closeTo.some((c) => p.closeTo.includes(c))) return false
    if (f.amenities.length && !f.amenities.every((a) => p.amenities.includes(a))) return false
    if (f.bedsMin && p.beds < f.bedsMin) return false
    if (f.bathsMin && p.baths < f.bathsMin) return false
    if (f.parkingMin && p.parking < f.parkingMin) return false
    const sqft = Number(p.sqft.replace(/,/g, ""))
    if (sqft < f.sqftRange[0] || sqft > f.sqftRange[1]) return false
    if (f.lotSizeMin && p.lotSize < f.lotSizeMin) return false
    return true
  })
}
