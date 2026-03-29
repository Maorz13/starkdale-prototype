"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Plus, Minus, LocateFixed, X, ArrowRight } from "lucide-react"

// ─── Neighborhood data ────────────────────────────────────────────────────────

interface NeighborhoodData {
  name: string
  subtitle: string
  units: string
  type: string
  description: string
  color: string
  cx: number
  cy: number
  rx: number
  ry: number
  rotation: number
}

const NEIGHBORHOODS: NeighborhoodData[] = [
  {
    name: "Cascades",
    subtitle: "74 multifamily residences",
    units: "74 units",
    type: "Multifamily",
    description:
      "Nestled among natural water features and lush greenery, Cascades is one of Starkdale's most connected neighborhoods. Residents enjoy direct trail access, proximity to The Square, and sweeping views of the surrounding landscape. Designed for those who want nature at their doorstep without sacrificing community.",
    color: "#84CC16",
    cx: 13, cy: 35, rx: 10, ry: 14, rotation: 10,
  },
  {
    name: "Private Reserve",
    subtitle: "10 ultra-private estates",
    units: "10 units",
    type: "Single-Family",
    description:
      "The pinnacle of seclusion at Starkdale. Ten ultra-private estate parcels on 3–4 acre lots, set deep within the property. For those who demand absolute privacy, bespoke finishes, and the quiet confidence of owning something truly rare.",
    color: "#EF4444",
    cx: 24, cy: 21, rx: 5, ry: 6.5, rotation: 0,
  },
  {
    name: "West Ridge",
    subtitle: "103 residences — multifamily to estate",
    units: "103 units",
    type: "Mixed",
    description:
      "West Ridge spans the full spectrum — from thoughtfully designed multifamily residences to grand single-family estates. Defined by ridge views, trail access, and a strong sense of community. An ideal neighborhood for those who want flexibility in how they live.",
    color: "#F97316",
    cx: 27, cy: 50, rx: 8, ry: 13, rotation: 15,
  },
  {
    name: "Base Camp",
    subtitle: "Adventure-forward cabins & lodges",
    units: "Cabins & Lodges",
    type: "Single-Family",
    description:
      "Designed for those who live for the outdoors. Base Camp is the launch point for Starkdale's 22 km trail network, winter sports, adventure races, and the 10-acre lake. Homes here are built for the elements — warm, grounded, and always ready for the next adventure.",
    color: "#CA8A04",
    cx: 39, cy: 21, rx: 6, ry: 7, rotation: 0,
  },
  {
    name: "Lakeside",
    subtitle: "22 waterfront homes",
    units: "22 keys",
    type: "Single-Family",
    description:
      "Wake up to water every morning. Lakeside homes sit directly on Starkdale's 10-acre lake, with private access to kayaking, paddleboarding, and the beach barn. A rare combination of serenity and recreation in an intimate, nature-immersed enclave.",
    color: "#06B6D4",
    cx: 42, cy: 44, rx: 4.5, ry: 10, rotation: 8,
  },
  {
    name: "The Square",
    subtitle: "115 units above the pedestrian core",
    units: "115 units + 22 keys",
    type: "Multifamily",
    description:
      "Live at the heart of it all. The Square places residents above 70,000 SF of retail, dining, and cultural venues. Everything — the farmer's market, music hall, co-working spaces, and community events — is steps from your front door. Starkdale's most vibrant address.",
    color: "#B91C1C",
    cx: 52, cy: 20, rx: 7, ry: 6.5, rotation: 0,
  },
  {
    name: "Play Village",
    subtitle: "39 family-forward residences",
    units: "39 units",
    type: "Multifamily",
    description:
      "Starkdale's neighborhood built with families in mind. Play Village surrounds 11 acres of sports and recreation — tennis, pickleball, bowling, basketball, soccer — and offers integrated childcare. A community where children thrive and parents can breathe.",
    color: "#16A34A",
    cx: 58, cy: 41, rx: 5, ry: 5.5, rotation: 0,
  },
  {
    name: "The Crescent",
    subtitle: "18 custom single-family homes",
    units: "18 units",
    type: "Single-Family",
    description:
      "Sweeping views and quiet exclusivity define The Crescent. Eighteen custom single-family homes on generous lots, each one a bespoke expression of its owner. Situated at one of Starkdale's highest elevations, with direct trail access and proximity to the Spa & Wellness Center.",
    color: "#D97706",
    cx: 64, cy: 52, rx: 8.5, ry: 9.5, rotation: -10,
  },
  {
    name: "The Resort",
    subtitle: "170 hotel keys · Spa & Longevity",
    units: "170 keys",
    type: "Hospitality",
    description:
      "Starkdale's hospitality anchor — 170 keys across suites, forest cabins, and Onsen villas surrounding the 100,000 SF Spa & Longevity Center. Home to RoseBar Longevity with Dr. Mark Hyman. Residents enjoy full member access to thermal therapy, biohacking, and world-class fitness.",
    color: "#DB2777",
    cx: 71, cy: 18, rx: 7, ry: 7.5, rotation: 0,
  },
  {
    name: "East Ridge",
    subtitle: "118 residences with ridge panoramas",
    units: "118 units",
    type: "Multifamily",
    description:
      "Panoramic ridge views and health-forward design define East Ridge. 118 residences built with biophilic principles — natural materials, floor-to-ceiling windows, and smart air quality systems. One of Starkdale's largest and most dynamic neighborhoods, with a strong sense of community and direct trail access.",
    color: "#65A30D",
    cx: 80, cy: 45, rx: 7.5, ry: 9, rotation: -15,
  },
]

// ─── Zoom / pan constants ─────────────────────────────────────────────────────

const MIN_SCALE = 1
const MAX_SCALE = 6
const ZOOM_STEP = 0.5

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ResidencesV2Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, offsetX: 0, offsetY: 0 })
  const [hoveredName, setHoveredName] = useState<string | null>(null)
  const [selected, setSelected] = useState<NeighborhoodData | null>(null)

  // Wheel zoom
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const rect = el!.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const delta = e.deltaY > 0 ? -0.15 : 0.15
      zoomToPoint(delta, mx, my)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [scale, offset])

  function zoomToPoint(delta: number, mx: number, my: number) {
    setScale((prev) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta * prev))
      const factor = next / prev
      setOffset((o) => ({ x: mx - factor * (mx - o.x), y: my - factor * (my - o.y) }))
      return next
    })
  }

  function zoomBtn(dir: 1 | -1) {
    const el = containerRef.current
    if (!el) return
    zoomToPoint(dir * ZOOM_STEP, el.clientWidth / 2, el.clientHeight / 2)
  }

  function handleMouseDown(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("button, a")) return
    setIsDragging(true)
    dragStartRef.current = { mouseX: e.clientX, mouseY: e.clientY, offsetX: offset.x, offsetY: offset.y }
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return
    setOffset({
      x: dragStartRef.current.offsetX + e.clientX - dragStartRef.current.mouseX,
      y: dragStartRef.current.offsetY + e.clientY - dragStartRef.current.mouseY,
    })
  }

  const transform = `translate(${offset.x}px, ${offset.y}px) scale(${scale})`

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "The Residences", href: "/residences" }, { label: "Explore by Neighborhood" }]}
        title="Explore by Neighborhood"
        description="Click any neighborhood on the map to discover its homes, character, and amenities."
      />

      {/* Full-width map */}
      <section className="relative h-[calc(100vh-10rem)] w-full overflow-hidden bg-muted">
        {/* Pan/zoom container */}
        <div
          ref={containerRef}
          className="absolute inset-0"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div
            className="absolute inset-0 origin-top-left will-change-transform"
            style={{ transform, transition: isDragging ? "none" : "transform 0.05s ease-out" }}
          >
            <Image
              src="/starkdale-aerial.jpg"
              alt="Starkdale Farms aerial view"
              fill
              className="object-cover object-center"
              priority
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/25" />

            {/* Neighborhood SVG */}
            <svg
              viewBox="0 0 100 56.25"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <filter id="lbl-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0.3" stdDeviation="0.6" floodColor="black" floodOpacity="0.8" />
                </filter>
              </defs>

              {NEIGHBORHOODS.map((n) => {
                const isHovered = hoveredName === n.name
                const isSelected = selected?.name === n.name
                return (
                  <g
                    key={n.name}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelected(n)}
                    onMouseEnter={() => setHoveredName(n.name)}
                    onMouseLeave={() => setHoveredName(null)}
                  >
                    {/* Colored zone */}
                    <ellipse
                      cx={n.cx} cy={n.cy} rx={n.rx} ry={n.ry}
                      transform={`rotate(${n.rotation} ${n.cx} ${n.cy})`}
                      fill={n.color}
                      fillOpacity={isSelected ? 0.65 : isHovered ? 0.5 : 0.3}
                      stroke={n.color}
                      strokeOpacity={isSelected || isHovered ? 0.9 : 0.5}
                      strokeWidth={isSelected ? 0.4 : 0.2}
                      style={{ transition: "fill-opacity 0.15s, stroke-opacity 0.15s" }}
                    />
                    {/* Name label */}
                    <text
                      x={n.cx} y={n.cy}
                      textAnchor="middle" dominantBaseline="middle"
                      fill="white"
                      fontSize={isHovered || isSelected ? 2 : 1.8}
                      fontWeight="700"
                      fontFamily="sans-serif"
                      style={{ textTransform: "uppercase", letterSpacing: "0.06em", pointerEvents: "none", transition: "font-size 0.1s" }}
                      filter="url(#lbl-shadow)"
                    >
                      {n.name}
                    </text>
                    {/* Unit count sub-label */}
                    <text
                      x={n.cx} y={n.cy + 2.4}
                      textAnchor="middle" dominantBaseline="middle"
                      fill="white" fontSize="1.2" fontWeight="400" fontFamily="sans-serif"
                      fillOpacity={0.9}
                      style={{ pointerEvents: "none" }}
                      filter="url(#lbl-shadow)"
                    >
                      {n.units}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        {/* ── Map UI controls ── */}

        {/* Zoom buttons */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-1.5 z-10">
          <button onClick={() => zoomBtn(1)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/90 shadow backdrop-blur-sm hover:bg-background" aria-label="Zoom in">
            <Plus className="size-4" />
          </button>
          <button onClick={() => zoomBtn(-1)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/90 shadow backdrop-blur-sm hover:bg-background" aria-label="Zoom out">
            <Minus className="size-4" />
          </button>
          <button onClick={() => { setScale(1); setOffset({ x: 0, y: 0 }) }} className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/90 shadow backdrop-blur-sm hover:bg-background" aria-label="Reset view">
            <LocateFixed className="size-4" />
          </button>
        </div>

        {/* Scale indicator */}
        {scale > 1 && (
          <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium shadow backdrop-blur-sm">
            {Math.round(scale * 100)}%
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-6 left-6 z-10 rounded-lg bg-background/90 px-3 py-2 text-xs text-muted-foreground shadow backdrop-blur-sm">
          <p className="font-medium text-foreground">Starkdale Farms</p>
          <p>658 acres · Upstate New York</p>
        </div>

        {/* Hint */}
        {!selected && (
          <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2 rounded-full bg-background/80 px-4 py-1.5 text-xs font-medium shadow backdrop-blur-sm">
            Click a neighborhood to explore
          </div>
        )}

        {/* ── Neighborhood overlay ── */}
        {selected && (
          <>
            {/* Backdrop */}
            <div
              className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px]"
              onClick={() => setSelected(null)}
            />

            {/* Panel */}
            <div className="absolute inset-x-0 bottom-0 z-30 mx-auto flex max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-background shadow-2xl sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[560px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl">

              {/* Media */}
              <div className="relative flex aspect-[16/7] w-full items-center justify-center bg-muted">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ backgroundColor: selected.color }}
                />
                <div className="relative flex flex-col items-center gap-2 text-muted-foreground">
                  <div className="text-4xl">🏡</div>
                  <p className="text-sm">Neighborhood media</p>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow backdrop-blur-sm hover:bg-background"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: selected.color }}
                    />
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {selected.type}
                    </span>
                  </div>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight">{selected.name}</h2>
                  <p className="mt-0.5 text-sm font-medium text-muted-foreground">{selected.subtitle}</p>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selected.description}
                </p>

                <div className="flex gap-3">
                  <Button className="flex-1 gap-2" asChild>
                    <Link href={`/residences`}>
                      View Residences <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => setSelected(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}
