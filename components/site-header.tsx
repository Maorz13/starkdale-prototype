"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

type NavItem = {
  title: string
  href: string
  noDropdown?: boolean
  children: { title: string; href: string }[]
}

const NAV_ITEMS: NavItem[] = [
  {
    title: "Explore",
    href: "/explore",
    children: [
      { title: "Explore Starkdale", href: "/explore" },
      { title: "The Perfect Day", href: "/explore/perfect-day" },
      { title: "Our Farm", href: "/explore/our-farm" },
      { title: "The Square", href: "/life/the-square" },
      { title: "Play Village", href: "/life/play-village" },
      { title: "Gathering Venues", href: "/life/gathering-venues" },
    ],
  },
  {
    title: "Longevity & Wellness",
    href: "/wellness",
    children: [
      { title: "Perfect Day", href: "/wellness/perfect-day" },
      { title: "ROSEBAR Longevity Center", href: "/wellness/rosebar" },
      { title: "Members Spa", href: "/wellness/spa" },
    ],
  },
  {
    title: "Residences",
    href: "/residences",
    children: [
      { title: "All Residences", href: "/residences" },
      { title: "Multifamily Residences (Apartments)", href: "/residences/multifamily" },
      { title: "Custom Single-Family Homes", href: "/residences/single-family" },
      { title: "Neighborhoods", href: "/residences/neighborhoods" },
      { title: "Residential Amenities", href: "/residences/amenities" },
      { title: "Financing & Mortgage Tools", href: "/residences/financing" },
    ],
  },
  {
    title: "Live Layers",
    href: "/life/live-layers",
    children: [
      { title: "The Great Outdoors", href: "/life/live-layers/outdoors" },
      { title: "Fitness", href: "/life/live-layers/fitness" },
      { title: "ROSEBAR – Longevity Center", href: "/wellness/rosebar" },
      { title: "Social", href: "/life/live-layers/social" },
      { title: "Spirituality", href: "/life/live-layers/spirituality" },
      { title: "Music", href: "/life/live-layers/music" },
      { title: "Culinary", href: "/life/live-layers/culinary" },
      { title: "Charity", href: "/life/live-layers/charity" },
      { title: "Arts", href: "/life/live-layers/arts" },
      { title: "Design & Sustainability", href: "/life/live-layers/design" },
      { title: "The Perfect Day", href: "/explore/perfect-day" },
    ],
  },
  {
    title: "Resort",
    href: "/resort",
    children: [
      { title: "Accommodation", href: "/resort/lodging" },
      { title: "The Resort (Amenities)", href: "/resort" },
      { title: "Resident's Members Club", href: "/resort/members-club" },
    ],
  },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">Starkdale</span>
        </Link>

        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuList>
            {NAV_ITEMS.map((item) =>
              item.noDropdown ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="text-sm">{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-max p-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={child.href}
                              className="block select-none whitespace-nowrap rounded-md px-3 py-2.5 text-sm leading-snug no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              {child.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden lg:inline-flex gap-1.5">
            <Link href="/profile">
              <User className="size-4" />
              My Starkdale
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link href="/contact">Contact Us</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm flex flex-col">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                    <span className="font-semibold">Starkdale</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">
                {NAV_ITEMS.filter((item) => item.noDropdown).map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium"
                  >
                    {item.title}
                  </Link>
                ))}
                <Accordion type="multiple" className="w-full">
                  {NAV_ITEMS.filter((item) => !item.noDropdown).map((item) => (
                    <AccordionItem key={item.title} value={item.title}>
                      <AccordionTrigger className="text-sm font-medium">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 pl-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="flex flex-col gap-2 pt-2 border-t">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/profile" onClick={() => setMobileOpen(false)}>
                      <User className="size-4" />
                      My Starkdale
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
