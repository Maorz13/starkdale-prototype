"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Layers, Plus, Minus, LocateFixed } from "lucide-react"

interface Property {
  id: string
  neighborhood: string
  price: string
  beds: number
  baths: number
  sqft: string
  type: string
}

interface NeighborhoodPin {
  neighborhood: string
  x: number
  y: number
}

const NEIGHBORHOOD_PINS: NeighborhoodPin[] = [
  { neighborhood: "Private Reserve", x: 24,  y: 20  },
  { neighborhood: "Cascades",        x: 14,  y: 34  },
  { neighborhood: "West Ridge",      x: 27,  y: 52  },
  { neighborhood: "Base Camp",       x: 39,  y: 21  },
  { neighborhood: "Lakeside",        x: 42,  y: 44  },
  { neighborhood: "The Square",      x: 52,  y: 19  },
  { neighborhood: "Play Village",    x: 57,  y: 41  },
  { neighborhood: "The Crescent",    x: 64,  y: 52  },
  { neighborhood: "The Resort",      x: 70,  y: 17  },
  { neighborhood: "East Ridge",      x: 79,  y: 44  },
]

const NEIGHBORHOOD_LAYERS = [
  { name: "Cascades",        subtitle: "74 units",           color: "#84CC16", cx: 13, cy: 35, rx: 10,  ry: 14,  rotation: 10,  labelX: 13, labelY: 33  },
  { name: "Private Reserve", subtitle: "10 units",           color: "#EF4444", cx: 24, cy: 21, rx: 5,   ry: 6.5, rotation: 0,   labelX: 24, labelY: 20  },
  { name: "West Ridge",      subtitle: "103 units",          color: "#F97316", cx: 27, cy: 50, rx: 8,   ry: 13,  rotation: 15,  labelX: 27, labelY: 49  },
  { name: "Base Camp",       subtitle: "",                   color: "#CA8A04", cx: 39, cy: 21, rx: 6,   ry: 7,   rotation: 0,   labelX: 39, labelY: 20  },
  { name: "Lakeside",        subtitle: "22 keys",            color: "#06B6D4", cx: 42, cy: 44, rx: 4.5, ry: 10,  rotation: 8,   labelX: 42, labelY: 43  },
  { name: "The Square",      subtitle: "115 units + 22 keys",color: "#B91C1C", cx: 52, cy: 20, rx: 7,   ry: 6.5, rotation: 0,   labelX: 52, labelY: 19  },
  { name: "Play Village",    subtitle: "39 units",           color: "#16A34A", cx: 58, cy: 41, rx: 5,   ry: 5.5, rotation: 0,   labelX: 58, labelY: 40  },
  { name: "The Crescent",    subtitle: "118 units",          color: "#D97706", cx: 64, cy: 52, rx: 8.5, ry: 9.5, rotation: -10, labelX: 64, labelY: 51  },
  { name: "The Resort",      subtitle: "170 keys",           color: "#DB2777", cx: 71, cy: 18, rx: 7,   ry: 7.5, rotation: 0,   labelX: 71, labelY: 17  },
  { name: "East Ridge",      subtitle: "18 units",           color: "#65A30D", cx: 80, cy: 45, rx: 7.5, ry: 9,   rotation: -15, labelX: 80, labelY: 44  },
]

const AVAILABLE_LAYERS = [
  { id: "neighborhoods", label: "Neighborhoods" },
]

const MIN_SCALE = 1
const MAX_SCALE = 6
const ZOOM_STEP = 0.5

interface ResidencesMapProps {
  properties: Property[]
  activeNeighborhood?: string | null
  onNeighborhoodClick?: (neighborhood: string | null) => void
}

export function ResidencesMap({
  properties,
  activeNeighborhood,
  onNeighborhoodClick,
}: ResidencesMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 }) // in px, from top-left (origin 0 0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, offsetX: 0, offsetY: 0 })

  const [hoveredPin, setHoveredPin] = useState<string | null>(null)
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set())
  const [layersMenuOpen, setLayersMenuOpen] = useState(false)

  // Attach wheel event with passive: false so we can preventDefault
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const rect = el!.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const delta = e.deltaY > 0 ? -0.15 : 0.15
      zoomToPoint(delta, mouseX, mouseY)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [scale, offset]) // re-attach when scale/offset change so the closure is fresh

  function zoomToPoint(delta: number, mouseX: number, mouseY: number) {
    setScale((prevScale) => {
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prevScale + delta * prevScale))
      const factor = newScale / prevScale
      setOffset((prev) => ({
        x: mouseX - factor * (mouseX - prev.x),
        y: mouseY - factor * (mouseY - prev.y),
      }))
      return newScale
    })
  }

  function zoomButton(direction: 1 | -1) {
    const el = containerRef.current
    if (!el) return
    const cx = el.clientWidth / 2
    const cy = el.clientHeight / 2
    zoomToPoint(direction * ZOOM_STEP, cx, cy)
  }

  function resetView() {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  function handleMouseDown(e: React.MouseEvent) {
    // Don't start drag on buttons/interactive elements
    if ((e.target as HTMLElement).closest("button, a")) return
    setIsDragging(true)
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    }
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return
    const dx = e.clientX - dragStartRef.current.mouseX
    const dy = e.clientY - dragStartRef.current.mouseY
    setOffset({
      x: dragStartRef.current.offsetX + dx,
      y: dragStartRef.current.offsetY + dy,
    })
  }

  function handleMouseUp() {
    setIsDragging(false)
  }

  function toggleLayer(id: string) {
    setActiveLayers((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const showNeighborhoods = activeLayers.has("neighborhoods")

  const countsByNeighborhood = properties.reduce<Record<string, number>>((acc, p) => {
    acc[p.neighborhood] = (acc[p.neighborhood] ?? 0) + 1
    return acc
  }, {})

  const pricesByNeighborhood = properties.reduce<Record<string, number[]>>((acc, p) => {
    const num = Number(p.price.replace(/[$,]/g, ""))
    if (!acc[p.neighborhood]) acc[p.neighborhood] = []
    acc[p.neighborhood].push(num)
    return acc
  }, {})

  function formatPrice(n: number) {
    return "$" + (n >= 1_000_000
      ? (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
      : (n / 1_000).toFixed(0) + "K")
  }

  const transform = `translate(${offset.x}px, ${offset.y}px) scale(${scale})`

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-muted"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Pannable / zoomable layer */}
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

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Neighborhood SVG layer */}
        {showNeighborhoods && (
          <svg
            viewBox="0 0 100 56.25"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <filter id="text-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0.3" stdDeviation="0.5" floodColor="black" floodOpacity="0.7" />
              </filter>
            </defs>
            {NEIGHBORHOOD_LAYERS.map((n) => (
              <g
                key={n.name}
                style={{ cursor: "pointer" }}
                onClick={() => onNeighborhoodClick?.(activeNeighborhood === n.name ? null : n.name)}
              >
                <ellipse
                  cx={n.cx} cy={n.cy} rx={n.rx} ry={n.ry}
                  transform={`rotate(${n.rotation} ${n.cx} ${n.cy})`}
                  fill={n.color}
                  fillOpacity={activeNeighborhood === n.name ? 0.55 : 0.35}
                  stroke={n.color}
                  strokeOpacity={0.7}
                  strokeWidth={0.25}
                />
                <text
                  x={n.labelX} y={n.labelY}
                  textAnchor="middle" dominantBaseline="middle"
                  fill="white" fontSize="1.7" fontWeight="700" fontFamily="sans-serif"
                  style={{ textTransform: "uppercase", letterSpacing: "0.05em", pointerEvents: "none" }}
                  filter="url(#text-shadow)"
                >
                  {n.name}
                </text>
                {n.subtitle && (
                  <text
                    x={n.labelX} y={n.labelY + 2.2}
                    textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize="1.2" fontWeight="400" fontFamily="sans-serif"
                    fillOpacity={0.85}
                    style={{ pointerEvents: "none" }}
                    filter="url(#text-shadow)"
                  >
                    {n.subtitle}
                  </text>
                )}
              </g>
            ))}
          </svg>
        )}

        {/* Price pins */}
        {NEIGHBORHOOD_PINS.map((pin) => {
          const count = countsByNeighborhood[pin.neighborhood] ?? 0
          if (count === 0) return null
          const prices = pricesByNeighborhood[pin.neighborhood] ?? []
          const minPrice = Math.min(...prices)
          const isHovered = hoveredPin === pin.neighborhood
          const isActive = activeNeighborhood === pin.neighborhood

          return (
            <div
              key={pin.neighborhood}
              className="absolute"
              style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%, -100%)" }}
            >
              {isHovered && (
                <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-background px-3 py-2 shadow-lg ring-1 ring-black/10"
                  style={{ fontSize: `${Math.max(10, 12 / scale)}px` }}
                >
                  <p className="font-semibold">{pin.neighborhood}</p>
                  <p className="text-muted-foreground">
                    {count} {count === 1 ? "residence" : "residences"} · from {formatPrice(minPrice)}
                  </p>
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-background" />
                </div>
              )}
              <button
                onClick={() => onNeighborhoodClick?.(isActive ? null : pin.neighborhood)}
                onMouseEnter={() => setHoveredPin(pin.neighborhood)}
                onMouseLeave={() => setHoveredPin(null)}
                style={{ fontSize: `${Math.max(9, 12 / scale)}px` }}
                className={`
                  flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold shadow-md
                  transition-all duration-150 hover:scale-110
                  ${isActive
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground hover:bg-foreground hover:text-background"
                  }
                `}
              >
                <span className={`size-1.5 rounded-full ${isActive ? "bg-background" : "bg-primary"}`} />
                {formatPrice(minPrice)}
              </button>
              <div className={`mx-auto h-2 w-px ${isActive ? "bg-foreground" : "bg-background"}`} />
            </div>
          )
        })}
      </div>

      {/* ── Fixed UI controls (not affected by pan/zoom) ── */}

      {/* Zoom controls — bottom right */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <button
          onClick={() => zoomButton(1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/90 shadow backdrop-blur-sm hover:bg-background"
          aria-label="Zoom in"
        >
          <Plus className="size-4" />
        </button>
        <button
          onClick={() => zoomButton(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/90 shadow backdrop-blur-sm hover:bg-background"
          aria-label="Zoom out"
        >
          <Minus className="size-4" />
        </button>
        <button
          onClick={resetView}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/90 shadow backdrop-blur-sm hover:bg-background"
          aria-label="Reset view"
        >
          <LocateFixed className="size-4" />
        </button>
      </div>

      {/* Layers button — top right */}
      <div className="absolute right-4 top-4">
        <div className="relative">
          <button
            onClick={() => setLayersMenuOpen((o) => !o)}
            className={`
              flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-md backdrop-blur-sm transition-colors
              ${layersMenuOpen || activeLayers.size > 0
                ? "bg-foreground text-background"
                : "bg-background/90 text-foreground hover:bg-background"
              }
            `}
          >
            <Layers className="size-3.5" />
            Layers
            {activeLayers.size > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {activeLayers.size}
              </span>
            )}
          </button>

          {layersMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border bg-background/95 p-2 shadow-xl backdrop-blur-sm">
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Map Layers
              </p>
              {AVAILABLE_LAYERS.map((layer) => {
                const active = activeLayers.has(layer.id)
                return (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-xs hover:bg-accent"
                  >
                    <span className="font-medium">{layer.label}</span>
                    <span className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors ${active ? "bg-primary" : "bg-muted"}`}>
                      <span className={`inline-block h-3 w-3 rounded-full bg-white shadow transition-transform ${active ? "translate-x-3.5" : "translate-x-0.5"}`} />
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Scale indicator */}
      {scale > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium shadow backdrop-blur-sm">
          {Math.round(scale * 100)}%
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-background/90 px-3 py-2 text-xs text-muted-foreground shadow backdrop-blur-sm">
        <p className="font-medium text-foreground">Starkdale Farms</p>
        <p>658 acres · Upstate New York</p>
      </div>
    </div>
  )
}
