"use client"

import Link from "next/link"
import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Landmark } from "lucide-react"
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Building2,
  Paintbrush,
  ShieldCheck,
} from "lucide-react"

// Prototype: static property summary
const SAMPLE_PROPERTY = {
  title: "Cascades Residence 101",
  neighborhood: "Cascades",
  price: "$1,250,000",
  beds: 3,
  baths: 2,
  sqft: "2,400",
  type: "Multifamily" as const,
  style: "Modern",
  availability: "Available" as const,
}

const RESERVATION_DEPOSIT = "$10,000"

export default function ReserveResidencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const p = SAMPLE_PROPERTY
  const [step, setStep] = useState<"form" | "confirmed">("form")

  if (step === "confirmed") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <ShieldCheck className="size-8" />
        </div>
        <h1 className="text-2xl font-bold">Reservation Confirmed</h1>
        <p className="max-w-sm text-muted-foreground">
          Your reservation for <strong>{p.title}</strong> has been placed. A Starkdale advisor will contact you within 24 hours.
        </p>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/residences">Back to Residences</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact Advisor</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      {/* Back */}
      <Button variant="ghost" size="sm" className="mb-8 gap-1.5" asChild>
        <Link href={`/residences/${id}`}>
          <ArrowLeft className="size-4" /> Back to residence
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">

        {/* ── RIGHT: property summary — first in DOM so it appears on top on mobile ── */}
        <div>
          <div className="sticky top-24 space-y-4 rounded-2xl border bg-card p-6 shadow-sm">

            {/* Image */}
            <div className="flex aspect-video items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
              Property Image
            </div>

            {/* Title */}
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" /> {p.neighborhood}
              </p>
            </div>

            {/* Price + availability */}
            <div className="flex items-center gap-2">
              <span className="rounded-full border bg-muted/50 px-3 py-0.5 text-xs font-semibold">{p.price}</span>
              <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                p.availability === "Available"
                  ? "bg-green-600 text-white"
                  : "border text-foreground"
              }`}>
                {p.availability}
              </span>
            </div>

            {/* Specs */}
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Bed className="size-3.5" /> {p.beds} beds</span>
              <span className="flex items-center gap-1"><Bath className="size-3.5" /> {p.baths} baths</span>
              <span className="flex items-center gap-1"><Maximize className="size-3.5" /> {p.sqft} sqft</span>
            </div>

            {/* Type + style */}
            <div className="flex gap-2">
              <span className="flex items-center gap-1 rounded-md border bg-muted/30 px-2 py-1 text-xs font-medium">
                <Building2 className="size-3" /> {p.type}
              </span>
              <span className="flex items-center gap-1 rounded-md border bg-muted/30 px-2 py-1 text-xs font-medium">
                <Paintbrush className="size-3" /> {p.style}
              </span>
            </div>

            <Separator />

            {/* Deposit summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reservation deposit</span>
                <span className="font-semibold">{RESERVATION_DEPOSIT}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Refundable within</span>
                <span className="font-semibold">30 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due today</span>
                <span className="font-bold">{RESERVATION_DEPOSIT}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 shrink-0 text-green-600" />
              Fully refundable · No obligation
            </div>
          </div>
        </div>

        {/* ── LEFT: reservation form ── */}
        <div className="min-w-0 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reserve this residence</h1>
            <p className="mt-1 text-muted-foreground">
              Secure your interest with a fully refundable {RESERVATION_DEPOSIT} deposit. No commitment required.
            </p>
          </div>

          {/* Personal info */}
          <div className="space-y-4">
            <h2 className="font-semibold">Your information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">First name</label>
                <Input placeholder="Jane" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Last name</label>
                <Input placeholder="Smith" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email address</label>
              <Input type="email" placeholder="jane@example.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Phone number</label>
              <Input type="tel" placeholder="+1 (555) 000-0000" />
            </div>
          </div>

          <Separator />

          {/* Payment */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Payment method</h2>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> Secured by Stripe
              </div>
            </div>

            <Tabs defaultValue="card">
              <TabsList className="w-full">
                <TabsTrigger value="card" className="flex-1 gap-2">
                  <CreditCard className="size-4" /> Credit Card
                </TabsTrigger>
                <TabsTrigger value="bank" className="flex-1 gap-2">
                  <Landmark className="size-4" /> Bank Transfer
                </TabsTrigger>
              </TabsList>

              {/* Credit card */}
              <TabsContent value="card" className="mt-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Card number</label>
                  <div className="relative">
                    <Input placeholder="1234 5678 9012 3456" className="pr-10" />
                    <CreditCard className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Expiry date</label>
                    <Input placeholder="MM / YY" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">CVC</label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Name on card</label>
                  <Input placeholder="Jane Smith" />
                </div>
              </TabsContent>

              {/* Bank transfer */}
              <TabsContent value="bank" className="mt-4 space-y-4">
                <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">Wire transfer instructions</p>
                  <p>Bank: First National Bank</p>
                  <p>Account name: Starkdale Development LLC</p>
                  <p>Account number: •••• •••• 4821</p>
                  <p>Routing number: 021000021</p>
                  <p>Reference: Your full name + residence ID</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Once your transfer is received (1–3 business days), a Starkdale advisor will confirm your reservation by email.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <Separator />

          {/* Billing address */}
          <div className="space-y-4">
            <h2 className="font-semibold">Billing address</h2>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Street address</label>
              <Input placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">City</label>
                <Input placeholder="New York" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">ZIP code</label>
                <Input placeholder="10001" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Terms */}
          <p className="text-xs leading-relaxed text-muted-foreground">
            By confirming your reservation you agree to Starkdale&apos;s{" "}
            <Link href="/legal" className="underline underline-offset-2">Terms of Reservation</Link>.
            Your {RESERVATION_DEPOSIT} deposit is fully refundable within 30 days. No construction or purchase obligation is created by this reservation.
          </p>

          <Button size="lg" className="w-full" onClick={() => setStep("confirmed")}>
            Confirm Reservation · {RESERVATION_DEPOSIT} deposit
          </Button>
        </div>


      </div>
    </div>
  )
}
