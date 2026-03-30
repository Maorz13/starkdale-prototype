"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { PropertyCard } from "@/components/property-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, LayoutGrid, List, Bed, Bath, Maximize, ChevronDown, Check, X, MapPin, Building2, Paintbrush } from "lucide-react"
import Link from "next/link"
import { ResidencesMap } from "@/components/residences-map"
import { ResidencesFilters } from "@/components/residences-filters"
import {
  Property,
  ResidenceFilters,
  DEFAULT_FILTERS,
  applyFilters,
  countActiveFilters,
} from "@/lib/residence-types"
import { SAMPLE_PROPERTIES } from "@/lib/sample-properties"

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

function PropertyListRow(property: Property) {
  const { id, title, neighborhood, price, beds, baths, sqft, type, style, availability } = property
  return (
    <Link
      href={`/residences/${id}`}
      className="flex cursor-pointer items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/5"
    >
      {/* Image */}
      <div className="flex h-24 w-36 shrink-0 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
        Property Image
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-2">
        {/* Title */}
        <p className="text-base font-semibold leading-tight">{title}</p>

        {/* Price + availability */}
        <div className="flex items-center gap-2">
          <span className="rounded-full border bg-muted/50 px-3 py-0.5 text-xs font-semibold">{price}</span>
          <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
            availability === "Available"
              ? "bg-green-600 text-white"
              : availability === "Reserved"
              ? "border bg-secondary text-secondary-foreground"
              : "border text-foreground"
          }`}>
            {availability}
          </span>
        </div>

        {/* Neighborhood + specs */}
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
        <div className="flex gap-2">
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
    </Link>
  )
}

export default function ResidencesPage() {
  const [view, setView] = useState<"list" | "grid">("grid")
  const [filters, setFilters] = useState<ResidenceFilters>(DEFAULT_FILTERS)
  const [neighborhoodModalOpen, setNeighborhoodModalOpen] = useState(false)

  const visibleProperties = applyFilters(SAMPLE_PROPERTIES, filters)
  const activeCount = countActiveFilters(filters)

  return (
    <>
      <PageHeader
title="Explore All Residences"
        description="Browse 330 multifamily units and 113 custom single-family homes across 10 unique neighborhoods on 658 acres."
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search residences..." className="w-64 pl-9" />
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setNeighborhoodModalOpen(true)}
          >
            {filters.neighborhood === "all" ? "All neighborhoods" : filters.neighborhood}
            <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
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

      {/* Neighborhood selector */}
      {neighborhoodModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setNeighborhoodModalOpen(false)}>
          <div className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl border bg-background shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="font-semibold">Select Neighborhood</h2>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setNeighborhoodModalOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              <button
                className={`flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-accent/5 ${filters.neighborhood === "all" ? "bg-accent/10" : ""}`}
                onClick={() => { setFilters((f) => ({ ...f, neighborhood: "all" })); setNeighborhoodModalOpen(false) }}
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">All</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">All Neighborhoods</p>
                  <p className="text-xs text-muted-foreground">Browse all residences across Starkdale</p>
                </div>
                {filters.neighborhood === "all" && <Check className="size-4 shrink-0 text-foreground" />}
              </button>
              {NEIGHBORHOODS_META.map(({ name, subtitle }) => {
                const active = filters.neighborhood === name
                return (
                  <button
                    key={name}
                    className={`flex w-full items-center gap-4 border-t px-5 py-3.5 text-left transition-colors hover:bg-accent/5 ${active ? "bg-accent/10" : ""}`}
                    onClick={() => { setFilters((f) => ({ ...f, neighborhood: name })); setNeighborhoodModalOpen(false) }}
                  >
                    <div className="size-12 shrink-0 rounded-lg bg-muted" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-xs text-muted-foreground">{subtitle}</p>
                    </div>
                    {active && <Check className="size-4 shrink-0 text-foreground" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <section className="flex gap-0">
        {/* Left: scrollable results */}
        <div className="min-w-0 w-1/2 px-4 py-8 sm:px-6 lg:px-8">
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
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {visibleProperties.map((property) => (
                <PropertyListRow
                  key={property.id}
                  {...property}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: sticky map */}
        <div className="sticky top-16 hidden h-[calc(100vh-4rem)] w-1/2 shrink-0 overflow-hidden border-l lg:block">
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
