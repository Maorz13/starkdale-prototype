import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { FeatureGrid } from "@/components/feature-grid"
import { CTASection } from "@/components/cta-section"
import { Sunrise, Utensils, Dumbbell, Leaf, Music, Moon } from "lucide-react"

export default function PerfectDayPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Explore", href: "/explore" },
          { label: "The Perfect Day" },
        ]}
        title="The Perfect Day"
        description="From the first light on the mountains to a quiet evening by the fire — a day at Starkdale is unlike anything you've experienced."
      />

      <ContentSection
        tag="A Day in the Life"
        title="What Does Your Perfect Day Look Like?"
        description="Imagine waking up to the sounds of nature, spending the morning at ROSEBAR, lunching at The Square, exploring trails in the afternoon, and gathering with neighbors as the sun sets. At Starkdale, every day is designed to nourish your body, mind, and spirit."
        imageSrc="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80"
        imagePlaceholder="Perfect Day at Starkdale"
      />

      <FeatureGrid
        tag="From Morning to Night"
        title="A Day Designed for Living Well"
        description="Every hour at Starkdale offers something restorative, stimulating, or deeply satisfying."
        features={[
          {
            icon: Sunrise,
            title: "Morning Ritual",
            description: "Start with a sunrise trail walk, a cold plunge, or a guided meditation at ROSEBAR's wellness center.",
          },
          {
            icon: Dumbbell,
            title: "Active Hours",
            description: "Hit the fitness center, join a group yoga class, or head to Play Village for a game of tennis or pickleball.",
          },
          {
            icon: Utensils,
            title: "Farm-to-Table Lunch",
            description: "Dine at The Square's seasonal restaurants, sourcing ingredients directly from Starkdale's working farm.",
          },
          {
            icon: Leaf,
            title: "Afternoon Retreat",
            description: "Explore 658 acres of trails, visit the spa, or simply read in nature with the mountains as your backdrop.",
          },
          {
            icon: Music,
            title: "Evening Culture",
            description: "Catch a performance at The Theatre, attend a gallery opening, or gather with neighbors at a community event.",
          },
          {
            icon: Moon,
            title: "Quiet Evenings",
            description: "Return home to your residence, pour a glass of wine, and watch the stars from your private terrace.",
          },
        ]}
        columns={3}
      />

      <CTASection
        title="Come Experience It for Yourself"
        description="Schedule a visit to Starkdale and live your own perfect day — guided by our team, tailored to your interests."
        primaryAction={{ label: "Schedule a Visit", href: "/contact" }}
        secondaryAction={{ label: "Explore Residences", href: "/residences" }}
      />
    </>
  )
}
