import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { FeatureGrid } from "@/components/feature-grid"
import { CTASection } from "@/components/cta-section"
import { Star, Users, Utensils, CalendarDays, Key, Gift } from "lucide-react"

export default function MembersClubPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Resort", href: "/resort" },
          { label: "Resident's Members Club" },
        ]}
        title="Resident's Members Club"
        description="An exclusive club for Starkdale residents — priority access, private events, curated experiences, and a community of like-minded people who call this place home."
      />

      <ContentSection
        tag="Residents Only"
        title="The Privilege of Belonging"
        description="The Resident's Members Club is Starkdale's private circle — a curated layer of access, recognition, and community reserved for those who live here. Members enjoy priority booking across all resort facilities, invitations to private events, and a dedicated concierge team that anticipates every need. It's not just where you live — it's who you become part of."
        imageSrc="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
        imagePlaceholder="Members Club"
      />

      <FeatureGrid
        tag="Club Benefits"
        title="What Membership Unlocks"
        description="From priority access to exclusive experiences, the Members Club is designed to enrich every dimension of life at Starkdale."
        features={[
          {
            icon: Key,
            title: "Priority Access",
            description: "First access to resort bookings, spa appointments, restaurant reservations, and event tickets across the entire estate.",
          },
          {
            icon: CalendarDays,
            title: "Private Events",
            description: "Exclusive member-only gatherings — wine dinners, wellness retreats, cultural evenings, and seasonal celebrations.",
          },
          {
            icon: Utensils,
            title: "Dining Privileges",
            description: "Reserved tables, tasting menus, and chef's table experiences at Starkdale's finest dining venues.",
          },
          {
            icon: Star,
            title: "Concierge Services",
            description: "A dedicated Members Club concierge available to handle bookings, recommendations, and special requests.",
          },
          {
            icon: Users,
            title: "Community Network",
            description: "Connect with fellow residents through curated introductions, interest groups, and community initiatives.",
          },
          {
            icon: Gift,
            title: "Exclusive Offers",
            description: "Member pricing on wellness programs, accommodations for guests, and partnerships with premium lifestyle brands.",
          },
        ]}
        columns={3}
      />

      <CTASection
        title="Become a Member"
        description="Membership in the Resident's Members Club is included with every Starkdale residence. Contact us to learn more."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "Explore Residences", href: "/residences" }}
      />
    </>
  )
}
