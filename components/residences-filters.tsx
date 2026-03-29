"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SlidersHorizontal } from "lucide-react"
import {
  ResidenceFilters,
  DEFAULT_FILTERS,
  ALL_AMENITIES,
  ALL_CLOSE_TO,
  NEIGHBORHOODS,
  Availability,
} from "@/lib/residence-types"

interface ResidencesFiltersProps {
  filters: ResidenceFilters
  onChange: (f: ResidenceFilters) => void
  activeCount: number
}

function fmt(n: number): string {
  if (n >= 1_000_000) {
    const val = n / 1_000_000
    return `$${val % 1 === 0 ? val : val.toFixed(1)}M`
  }
  const val = n / 1_000
  return `$${val % 1 === 0 ? val : val.toFixed(0)}K`
}

function fmtSqft(n: number): string {
  return n.toLocaleString()
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground hover:bg-accent"
      }`}
    >
      {children}
    </button>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold">{children}</p>
}

export function ResidencesFilters({
  filters,
  onChange,
  activeCount,
}: ResidencesFiltersProps) {
  function toggleAvailability(val: Availability) {
    const current = filters.availability
    const next = current.includes(val)
      ? current.filter((a) => a !== val)
      : [...current, val]
    onChange({ ...filters, availability: next })
  }

  function toggleCloseTo(val: string) {
    const current = filters.closeTo
    const next = current.includes(val)
      ? current.filter((c) => c !== val)
      : [...current, val]
    onChange({ ...filters, closeTo: next })
  }

  function toggleAmenity(val: string) {
    const current = filters.amenities
    const next = current.includes(val)
      ? current.filter((a) => a !== val)
      : [...current, val]
    onChange({ ...filters, amenities: next })
  }

  const availabilityOptions: Availability[] = ["Available", "Reserved", "Coming Soon"]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="size-4" />
          Filters
          {activeCount > 0 && (
            <Badge className="ml-1 h-5 min-w-5 rounded-full px-1.5 text-xs">
              {activeCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-[360px] flex-col p-0 sm:w-[400px]">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle>Filter Residences</SheetTitle>
        </SheetHeader>

        {/* Scrollable filter area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">

            {/* 1. Availability */}
            <div className="space-y-3">
              <SectionLabel>Availability</SectionLabel>
              <div className="space-y-2">
                {availabilityOptions.map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <Checkbox
                      id={`avail-${option}`}
                      checked={filters.availability.includes(option)}
                      onCheckedChange={() => toggleAvailability(option)}
                    />
                    <Label htmlFor={`avail-${option}`} className="cursor-pointer font-normal">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 2. Residence Type */}
            <div className="space-y-3">
              <SectionLabel>Residence Type</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {(["all", "Multifamily", "Single-Family"] as const).map((t) => (
                  <PillButton
                    key={t}
                    active={filters.type === t}
                    onClick={() => onChange({ ...filters, type: t })}
                  >
                    {t === "all" ? "All" : t}
                  </PillButton>
                ))}
              </div>
            </div>

            <Separator />

            {/* 3. Neighborhood */}
            <div className="space-y-3">
              <SectionLabel>Neighborhood</SectionLabel>
              <Select
                value={filters.neighborhood}
                onValueChange={(val) => onChange({ ...filters, neighborhood: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Neighborhoods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Neighborhoods</SelectItem>
                  {NEIGHBORHOODS.map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* 4. Price Range */}
            <div className="space-y-3">
              <SectionLabel>Price Range</SectionLabel>
              <p className="text-sm text-muted-foreground">
                {fmt(filters.priceRange[0])} – {fmt(filters.priceRange[1])}
              </p>
              <Slider
                min={500_000}
                max={8_000_000}
                step={50_000}
                value={[filters.priceRange[0], filters.priceRange[1]]}
                onValueChange={([min, max]) =>
                  onChange({ ...filters, priceRange: [min, max] })
                }
                className="mt-2"
              />
            </div>

            <Separator />

            {/* 5. Close To */}
            <div className="space-y-3">
              <SectionLabel>Close To</SectionLabel>
              <div className="space-y-2">
                {ALL_CLOSE_TO.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Checkbox
                      id={`close-${item}`}
                      checked={filters.closeTo.includes(item)}
                      onCheckedChange={() => toggleCloseTo(item)}
                    />
                    <Label htmlFor={`close-${item}`} className="cursor-pointer font-normal">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 6. Amenities & Features */}
            <div className="space-y-3">
              <SectionLabel>Amenities & Features</SectionLabel>
              <div className="grid grid-cols-2 gap-2">
                {ALL_AMENITIES.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Checkbox
                      id={`amenity-${item}`}
                      checked={filters.amenities.includes(item)}
                      onCheckedChange={() => toggleAmenity(item)}
                    />
                    <Label
                      htmlFor={`amenity-${item}`}
                      className="cursor-pointer text-xs font-normal leading-snug"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 7. Bedrooms */}
            <div className="space-y-3">
              <SectionLabel>Bedrooms</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {([0, 1, 2, 3, 4, 5] as const).map((n) => (
                  <PillButton
                    key={n}
                    active={filters.bedsMin === n}
                    onClick={() => onChange({ ...filters, bedsMin: n })}
                  >
                    {n === 0 ? "Any" : `${n}+`}
                  </PillButton>
                ))}
              </div>
            </div>

            <Separator />

            {/* 8. Bathrooms */}
            <div className="space-y-3">
              <SectionLabel>Bathrooms</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {([0, 1, 2, 3, 4] as const).map((n) => (
                  <PillButton
                    key={n}
                    active={filters.bathsMin === n}
                    onClick={() => onChange({ ...filters, bathsMin: n })}
                  >
                    {n === 0 ? "Any" : `${n}+`}
                  </PillButton>
                ))}
              </div>
            </div>

            <Separator />

            {/* 9. Parking Spots */}
            <div className="space-y-3">
              <SectionLabel>Parking Spots</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {([0, 1, 2, 3] as const).map((n) => (
                  <PillButton
                    key={n}
                    active={filters.parkingMin === n}
                    onClick={() => onChange({ ...filters, parkingMin: n })}
                  >
                    {n === 0 ? "Any" : `${n}+`}
                  </PillButton>
                ))}
              </div>
            </div>

            <Separator />

            {/* 10. Square Feet */}
            <div className="space-y-3">
              <SectionLabel>Square Feet</SectionLabel>
              <p className="text-sm text-muted-foreground">
                {fmtSqft(filters.sqftRange[0])} – {fmtSqft(filters.sqftRange[1])} SF
              </p>
              <Slider
                min={500}
                max={8_000}
                step={100}
                value={[filters.sqftRange[0], filters.sqftRange[1]]}
                onValueChange={([min, max]) =>
                  onChange({ ...filters, sqftRange: [min, max] })
                }
                className="mt-2"
              />
            </div>

            <Separator />

            {/* 11. Lot Size */}
            <div className="space-y-3">
              <SectionLabel>Lot Size</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {([
                  { label: "Any", value: 0 },
                  { label: "0.5+ acres", value: 0.5 },
                  { label: "1+ acres", value: 1 },
                  { label: "2+ acres", value: 2 },
                  { label: "3+ acres", value: 3 },
                ] as const).map(({ label, value }) => (
                  <PillButton
                    key={value}
                    active={filters.lotSizeMin === value}
                    onClick={() => onChange({ ...filters, lotSizeMin: value })}
                  >
                    {label}
                  </PillButton>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4">
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => onChange(DEFAULT_FILTERS)}
          >
            Clear all filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
