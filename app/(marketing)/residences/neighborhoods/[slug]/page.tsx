import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { NeighborhoodVideoHero } from "@/components/neighborhood-video-hero"

// ─── Neighborhood data ────────────────────────────────────────────────────────

interface NeighborhoodDetails {
  highlights: { label: string; value: string }[]
  amenities: string[]
  facilities: string[]
  buildingTech: string[]
}

interface NeighborhoodData {
  name: string
  subtitle: string
  units: string
  type: string
  description: string
  color: string
}

const NEIGHBORHOODS: Record<string, NeighborhoodData & { details: NeighborhoodDetails }> = {
  cascades: {
    name: "Cascades",
    subtitle: "74 multifamily residences",
    units: "74 units",
    type: "Multifamily",
    description:
      "Nestled among natural water features and lush greenery, Cascades is one of Starkdale's most connected neighborhoods. Residents enjoy direct trail access, proximity to The Square, and sweeping views of the surrounding landscape. Designed for those who want nature at their doorstep without sacrificing community.",
    color: "#84CC16",
    details: {
      highlights: [
        { label: "Residences", value: "74 units" },
        { label: "Size range", value: "850 – 2,400 sqft" },
        { label: "Stories", value: "4 – 6 floors" },
        { label: "Delivery", value: "2026" },
      ],
      amenities: ["Rooftop terrace & lounge", "Residents' fitness centre", "Co-working & library", "Pet spa & dog run", "Bike storage & repair station", "Private storage lockers"],
      facilities: ["Direct trail network access", "Natural waterfall & stream features", "Community garden plots", "EV charging stations", "Covered underground parking", "Steps from The Square retail"],
      buildingTech: ["Smart home integration", "Continuous air quality monitoring", "Triple-glazed acoustic windows", "Hydronic radiant floor heating", "Solar-ready rooftop infrastructure", "Energy-recovery ventilation (ERV)"],
    },
  },
  "private-reserve": {
    name: "Private Reserve",
    subtitle: "10 ultra-private estates",
    units: "10 units",
    type: "Single-Family",
    description:
      "The pinnacle of seclusion at Starkdale. Ten ultra-private estate parcels on 3–4 acre lots, set deep within the property. For those who demand absolute privacy, bespoke finishes, and the quiet confidence of owning something truly rare.",
    color: "#EF4444",
    details: {
      highlights: [
        { label: "Estates", value: "10 parcels" },
        { label: "Lot size", value: "3 – 4 acres" },
        { label: "Home size", value: "4,500 – 8,000 sqft" },
        { label: "Delivery", value: "2026 – 2027" },
      ],
      amenities: ["Private heated pool & spa", "Home theatre & media room", "Chef's kitchen with butler's pantry", "Wine cellar & tasting room", "Guest suite & caretaker quarters", "Private gym & sauna"],
      facilities: ["Gated private driveway", "Multi-vehicle garage (3–5 cars)", "Private helipad option", "Dedicated concierge service", "Direct trail access from lot", "Full resort member privileges"],
      buildingTech: ["Fully bespoke smart home system", "Geothermal heating & cooling", "Whole-home water filtration", "Biometric entry & security", "Backup power generation", "Custom structural insulated panels (SIP)"],
    },
  },
  "west-ridge": {
    name: "West Ridge",
    subtitle: "103 residences — multifamily to estate",
    units: "103 units",
    type: "Mixed",
    description:
      "West Ridge spans the full spectrum — from thoughtfully designed multifamily residences to grand single-family estates. Defined by ridge views, trail access, and a strong sense of community. An ideal neighborhood for those who want flexibility in how they live.",
    color: "#F97316",
    details: {
      highlights: [
        { label: "Residences", value: "103 units" },
        { label: "Size range", value: "900 – 5,000 sqft" },
        { label: "Types", value: "Apartments to Estates" },
        { label: "Delivery", value: "2026" },
      ],
      amenities: ["Shared ridge-top terrace", "Residents' club & lounge", "Outdoor kitchen & fire pits", "Fitness centre & yoga deck", "Children's play area", "Concierge services"],
      facilities: ["Panoramic ridge viewpoints", "Trail network trailhead", "Dedicated hiking & cycling paths", "Communal allotment gardens", "EV charging & covered parking", "Shuttle to The Square"],
      buildingTech: ["Smart building management system", "Floor-to-ceiling thermal glazing", "Passive solar orientation", "Structured wiring & fibre-to-unit", "Low-VOC materials throughout", "Rainwater harvesting system"],
    },
  },
  "base-camp": {
    name: "Base Camp",
    subtitle: "Adventure-forward cabins & lodges",
    units: "Cabins & Lodges",
    type: "Single-Family",
    description:
      "Designed for those who live for the outdoors. Base Camp is the launch point for Starkdale's 22 km trail network, winter sports, adventure races, and the 10-acre lake. Homes here are built for the elements — warm, grounded, and always ready for the next adventure.",
    color: "#CA8A04",
    details: {
      highlights: [
        { label: "Cabins & lodges", value: "Custom builds" },
        { label: "Plot size", value: "0.5 – 2 acres" },
        { label: "Trail access", value: "22 km network" },
        { label: "Lake proximity", value: "< 5 min walk" },
      ],
      amenities: ["Private sauna & cold plunge", "Outdoor equipment storage", "Ski & gear room", "Wraparound decks & fire pit", "Hot tub with forest views", "Covered ATV & snowmobile storage"],
      facilities: ["22 km trail network trailhead", "10-acre lake access & beach barn", "Adventure race start line", "Winter sports equipment hire", "Rescue & safety station", "Communal fire lodge"],
      buildingTech: ["Mass timber (CLT) construction", "Superior insulation (R-40+ walls)", "Wood-burning & radiant backup heating", "Off-grid capable power systems", "Stormwater management landscaping", "Weatherproof smart home controls"],
    },
  },
  lakeside: {
    name: "Lakeside",
    subtitle: "22 waterfront homes",
    units: "22 keys",
    type: "Single-Family",
    description:
      "Wake up to water every morning. Lakeside homes sit directly on Starkdale's 10-acre lake, with private access to kayaking, paddleboarding, and the beach barn. A rare combination of serenity and recreation in an intimate, nature-immersed enclave.",
    color: "#06B6D4",
    details: {
      highlights: [
        { label: "Waterfront homes", value: "22 units" },
        { label: "Size range", value: "2,200 – 4,800 sqft" },
        { label: "Lake frontage", value: "30 – 60 m per lot" },
        { label: "Delivery", value: "2026" },
      ],
      amenities: ["Private dock & boathouse", "Lakeside infinity terrace", "Chef's kitchen with water views", "Home office & library", "Guest suite", "Private fire pit & beach area"],
      facilities: ["Direct lake access — kayak, paddleboard, swim", "Beach barn & community pavilion", "Shared sailing & rowing facilities", "Nature boardwalk & birdwatching trail", "EV charging & private garage", "Resident-only lake access gate"],
      buildingTech: ["Elevated flood-resilient foundations", "Corrosion-resistant façade materials", "Automated lake-level monitoring", "Solar PV with battery storage", "Grey-water recycling system", "Smart irrigation & landscaping control"],
    },
  },
  "the-square": {
    name: "The Square",
    subtitle: "115 units above the pedestrian core",
    units: "115 units + 22 keys",
    type: "Multifamily",
    description:
      "Live at the heart of it all. The Square places residents above 70,000 SF of retail, dining, and cultural venues. Everything — the farmer's market, music hall, co-working spaces, and community events — is steps from your front door. Starkdale's most vibrant address.",
    color: "#B91C1C",
    details: {
      highlights: [
        { label: "Residences", value: "115 + 22 keys" },
        { label: "Retail below", value: "70,000 sqft" },
        { label: "Size range", value: "600 – 3,200 sqft" },
        { label: "Delivery", value: "2026" },
      ],
      amenities: ["Sky lounge & rooftop pool", "Dedicated residents' entrance & lobby", "Co-working suites & boardroom", "Concierge & parcel management", "Private dining room for hire", "Residents-only fitness floor"],
      facilities: ["Farmer's market & artisan shops below", "Music hall & live event venue", "Culinary school & demonstration kitchen", "Medical & wellness clinics", "Childcare & early learning centre", "Underground secure parking"],
      buildingTech: ["Acoustic isolation between residential & retail floors", "Building-wide HEPA air filtration", "Smart access & visitor management", "Centralised building management system", "District energy connection", "EV-ready parking infrastructure"],
    },
  },
  "play-village": {
    name: "Play Village",
    subtitle: "39 family-forward residences",
    units: "39 units",
    type: "Multifamily",
    description:
      "Starkdale's neighborhood built with families in mind. Play Village surrounds 11 acres of sports and recreation — tennis, pickleball, bowling, basketball, soccer — and offers integrated childcare. A community where children thrive and parents can breathe.",
    color: "#16A34A",
    details: {
      highlights: [
        { label: "Residences", value: "39 units" },
        { label: "Recreation land", value: "11 acres" },
        { label: "Size range", value: "1,100 – 2,800 sqft" },
        { label: "Delivery", value: "2026" },
      ],
      amenities: ["Integrated childcare centre on-site", "Family lounge & homework room", "Splash pad & children's water park", "Secure play courtyard", "Teen zone & games room", "BBQ terrace & family kitchen"],
      facilities: ["Tennis & pickleball courts", "10-pin bowling alley", "Full-size basketball & soccer", "Athletics track & field", "Outdoor adventure playground", "Walking distance to school hub"],
      buildingTech: ["Non-toxic, child-safe materials throughout", "Smart parental access control", "LED sports lighting (zero glare)", "Noise-attenuating façade design", "Secure bike & scooter storage", "EV charging & family-size parking bays"],
    },
  },
  "the-crescent": {
    name: "The Crescent",
    subtitle: "18 custom single-family homes",
    units: "18 units",
    type: "Single-Family",
    description:
      "Sweeping views and quiet exclusivity define The Crescent. Eighteen custom single-family homes on generous lots, each one a bespoke expression of its owner. Situated at one of Starkdale's highest elevations, with direct trail access and proximity to the Spa & Wellness Center.",
    color: "#D97706",
    details: {
      highlights: [
        { label: "Custom homes", value: "18 parcels" },
        { label: "Lot size", value: "0.75 – 2.5 acres" },
        { label: "Elevation", value: "Highest in Starkdale" },
        { label: "Delivery", value: "2026 – 2027" },
      ],
      amenities: ["Infinity pool with panoramic views", "Private wellness room & sauna", "Bespoke chef's kitchen", "Home office & studio space", "Landscaped private gardens", "Covered outdoor entertaining terrace"],
      facilities: ["Direct trail access from every lot", "1-minute walk to Spa & Wellness Centre", "Private road & gated access", "Dedicated wellness concierge", "Helipad access on select lots", "Resort member privileges included"],
      buildingTech: ["Fully custom architectural design", "Passive house certified insulation", "Integrated smart home (Crestron / Control4)", "Structural steel & engineered timber hybrid", "Photovoltaic solar + battery storage", "Whole-home water purification"],
    },
  },
  "the-resort": {
    name: "The Resort",
    subtitle: "170 hotel keys · Spa & Longevity",
    units: "170 keys",
    type: "Hospitality",
    description:
      "Starkdale's hospitality anchor — 170 keys across suites, forest cabins, and Onsen villas surrounding the 100,000 SF Spa & Longevity Center. Home to RoseBar Longevity with Dr. Mark Hyman. Residents enjoy full member access to thermal therapy, biohacking, and world-class fitness.",
    color: "#DB2777",
    details: {
      highlights: [
        { label: "Hotel keys", value: "170" },
        { label: "Spa footprint", value: "100,000 sqft" },
        { label: "Key types", value: "Suites, Cabins & Villas" },
        { label: "Opening", value: "2026" },
      ],
      amenities: ["RoseBar Longevity Center with Dr. Mark Hyman", "Onsen thermal baths & cold plunge circuit", "World-class fitness & movement studio", "Fine dining & forest-view restaurant", "Private meditation & breathwork rooms", "In-residence dining & butler service"],
      facilities: ["Concierge & 24/7 butler service", "Valet parking & helipad", "Private meeting & board rooms", "Resort shuttle & golf cart fleet", "Resident member access to all resort amenities", "Dedicated wellness programming"],
      buildingTech: ["Hospital-grade HEPA air filtration", "Circadian lighting systems (tunable)", "Biophilic design — living walls & natural materials", "EMF-shielded quiet rooms", "Thermostatic radiant ceiling panels", "Real-time building wellness monitoring"],
    },
  },
  "east-ridge": {
    name: "East Ridge",
    subtitle: "118 residences with ridge panoramas",
    units: "118 units",
    type: "Multifamily",
    description:
      "Panoramic ridge views and health-forward design define East Ridge. 118 residences built with biophilic principles — natural materials, floor-to-ceiling windows, and smart air quality systems. One of Starkdale's largest and most dynamic neighborhoods, with a strong sense of community and direct trail access.",
    color: "#65A30D",
    details: {
      highlights: [
        { label: "Residences", value: "118 units" },
        { label: "Size range", value: "950 – 3,000 sqft" },
        { label: "Stories", value: "5 – 8 floors" },
        { label: "Delivery", value: "2026" },
      ],
      amenities: ["Panoramic rooftop infinity pool", "Residents' health bar & juice kitchen", "Movement studio & climbing wall", "Community library & reading terrace", "Shared workshop & maker space", "Dog wash & pet lounge"],
      facilities: ["Ridge trail access from lobby", "Community allotment & food forest", "Electric bike fleet for residents", "Co-working hub with private offices", "EV charging & underground parking", "Dedicated shuttle to The Square & Resort"],
      buildingTech: ["Biophilic design — natural stone, timber & living walls", "Continuous PM2.5 air quality monitoring per unit", "Floor-to-ceiling triple-glazed windows", "Smart thermostats & occupancy sensors", "Cross-laminated timber (CLT) structure", "Net-zero ready energy infrastructure"],
    },
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const n = NEIGHBORHOODS[slug]
  if (!n) notFound()

  const isMultifamily = n.type === "Multifamily" || n.type === "Mixed"
  const isSingleFamily = n.type === "Single-Family"

  return (
    <>
      {/* ── Video hero ── */}
      <NeighborhoodVideoHero
        name={n.name}
        subtitle={n.subtitle}
        color={n.color}
      />

      {/* ── Living in title ── */}
      <section className="border-b bg-background py-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: n.color }}>
          {n.type}
        </p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight">Living in {n.name}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {n.description}
        </p>
      </section>

      {/* ── Highlights ── */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-4">
          {n.details.highlights.map((h) => (
            <div key={h.label} className="flex flex-col gap-1 bg-background px-8 py-6">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{h.label}</p>
              <p className="text-2xl font-bold tracking-tight">{h.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Media grid ── */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-3" style={{ height: "600px" }}>
            {/* Large video */}
            <div className="relative col-span-2 row-span-2 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-muted text-muted-foreground">
              <svg className="size-10 opacity-30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              <span className="text-xs font-medium uppercase tracking-wider opacity-50">Neighborhood Film</span>
            </div>
            {/* Photo 1 */}
            <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-muted/80 text-xs font-medium text-muted-foreground">
              Photo
            </div>
            {/* Photo 2 */}
            <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-muted/60 text-xs font-medium text-muted-foreground">
              Photo
            </div>
            {/* Small video */}
            <div className="flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl bg-muted/70 text-muted-foreground">
              <svg className="size-7 opacity-30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              <span className="text-xs font-medium uppercase tracking-wider opacity-50">Video</span>
            </div>
            {/* Photo 3 */}
            <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-muted/50 text-xs font-medium text-muted-foreground">
              Photo
            </div>
          </div>
        </div>
      </section>

      {/* ── Details: three columns ── */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Residence Amenities
              </h3>
              <ul className="space-y-2.5">
                {n.details.amenities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: n.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Facilities &amp; Surroundings
              </h3>
              <ul className="space-y-2.5">
                {n.details.facilities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: n.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Building Technology
              </h3>
              <ul className="space-y-2.5">
                {n.details.buildingTech.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: n.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Residence type cards ── */}
      <section className="grid grid-cols-2 gap-4 bg-background p-4">
        {/* Multifamily */}
        <div className="group relative h-[70vh] overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-stone-800">
            <Image
              src="/123123.png"
              alt="Multifamily residences"
              fill
              className="object-cover object-center opacity-70 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-white/50">74 – 115 residences</p>
              <h3 className="mt-1 text-4xl font-bold tracking-tight text-white">Multifamily</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                Contemporary apartments and residences set within Starkdale's most connected neighborhoods. Thoughtfully designed for modern living with full access to every amenity.
              </p>
            </div>
            <a
              href="/residences/multifamily"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              View Multifamily Residences <ArrowRight className="size-4" />
            </a>
          </div>
        </div>

        {/* Single-Family */}
        <div className="group relative h-[70vh] overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-stone-900">
            <Image
              src="/single-house.png"
              alt="Custom single-family homes"
              fill
              className="object-cover object-center opacity-70 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-white/50">18 – 22 homes</p>
              <h3 className="mt-1 text-4xl font-bold tracking-tight text-white">Custom Single-Family</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                Bespoke estates and single-family homes on generous lots. Each one a fully custom expression of its owner, with unmatched privacy, views, and direct access to nature.
              </p>
            </div>
            <a
              href="/residences/single-family"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              View Single-Family Homes <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
