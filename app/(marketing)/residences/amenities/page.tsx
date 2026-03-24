import { PageHeader } from "@/components/page-header"
import { FeatureGrid } from "@/components/feature-grid"
import { CTASection } from "@/components/cta-section"
import { Wifi, Car, ShieldCheck, Wrench, Package, Leaf } from "lucide-react"

export default function ResidentialAmenitiesPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Residences", href: "/residences" },
          { label: "Residential Amenities" },
        ]}
        title="Residential Amenities"
        description="Every Starkdale residence comes with a suite of amenities designed to simplify life, elevate comfort, and support a genuinely healthy lifestyle."
      />

      <FeatureGrid
        tag="Included with Every Residence"
        title="Life Made Effortless"
        description="From high-speed connectivity to concierge services, Starkdale residences are built for the way you actually live."
        features={[
          {
            icon: Wifi,
            title: "High-Speed Connectivity",
            description: "Gigabit fiber internet throughout every residence and across the entire Starkdale campus — no dead zones.",
          },
          {
            icon: Car,
            title: "Private Parking & EV Charging",
            description: "Dedicated parking with EV charging stations available across all residential zones.",
          },
          {
            icon: ShieldCheck,
            title: "24/7 Security",
            description: "Gated community with round-the-clock security, smart access control, and professional on-site staff.",
          },
          {
            icon: Wrench,
            title: "Concierge Maintenance",
            description: "On-demand home maintenance and repair services so nothing interrupts your lifestyle.",
          },
          {
            icon: Package,
            title: "Parcel & Delivery Management",
            description: "Secure package receiving and smart locker systems across all residential zones.",
          },
          {
            icon: Leaf,
            title: "Landscaping & Grounds",
            description: "Professionally maintained outdoor spaces, native plantings, and shared gardens tended year-round.",
          },
        ]}
        columns={3}
      />

      <CTASection
        title="See the Full Picture"
        description="Our team can walk you through every amenity included with your residence and neighborhood of choice."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "Explore Neighborhoods", href: "/residences/neighborhoods" }}
      />
    </>
  )
}
