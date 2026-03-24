import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { FeatureGrid } from "@/components/feature-grid"
import { CTASection } from "@/components/cta-section"
import { Sprout, Apple, Users, Leaf, ShoppingBasket, HeartHandshake } from "lucide-react"

export default function OurFarmPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Explore", href: "/explore" },
          { label: "Our Farm" },
        ]}
        title="Our Farm"
        description="A working farm at the heart of Starkdale — supplying fresh, seasonal produce to residents and restaurants, and connecting community to the land."
      />

      <ContentSection
        tag="Farm to Table"
        title="Growing Food, Building Community"
        description="Starkdale's working farm is more than a food source — it's a living part of the community. Residents can walk the fields, participate in harvest events, and eat what's grown just steps from their homes. Our farm supplies The Square's restaurants with seasonal vegetables, herbs, and fruits, while also offering CSA shares and farm-to-door delivery for residents."
        imageSrc="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&q=80"
        imagePlaceholder="Starkdale Farm"
      />

      <FeatureGrid
        tag="What the Farm Offers"
        title="More Than Just Fresh Produce"
        description="The farm is a place to slow down, reconnect with nature, and understand where your food comes from."
        features={[
          {
            icon: Sprout,
            title: "Seasonal Growing",
            description: "Year-round cultivation of vegetables, herbs, and fruits tailored to the Upstate New York climate.",
          },
          {
            icon: Apple,
            title: "Orchard & Harvest",
            description: "Apple trees, berry bushes, and seasonal harvest events where residents and families participate.",
          },
          {
            icon: ShoppingBasket,
            title: "CSA Shares",
            description: "Weekly farm-fresh boxes delivered to your residence — a direct connection from soil to table.",
          },
          {
            icon: Users,
            title: "Community Events",
            description: "Farm dinners, planting days, and harvest festivals that bring the community together around food.",
          },
          {
            icon: Leaf,
            title: "Regenerative Practices",
            description: "Farming methods that restore soil health, reduce waste, and support the long-term vitality of the land.",
          },
          {
            icon: HeartHandshake,
            title: "Educational Programs",
            description: "Workshops for children and adults on growing food, cooking seasonally, and living sustainably.",
          },
        ]}
        columns={3}
      />

      <CTASection
        title="Visit the Farm"
        description="Join us for a tour of Starkdale's working farm and see how we grow, harvest, and share food as a community."
        primaryAction={{ label: "Schedule a Visit", href: "/contact" }}
        secondaryAction={{ label: "Explore the Community", href: "/explore" }}
      />
    </>
  )
}
