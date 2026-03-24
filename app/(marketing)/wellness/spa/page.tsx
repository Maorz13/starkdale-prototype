import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { FeatureGrid } from "@/components/feature-grid"
import { CTASection } from "@/components/cta-section"
import { Waves, Flame, Snowflake, Sparkles, Moon, Heart } from "lucide-react"

export default function MembersSpaPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Longevity & Wellness", href: "/wellness" },
          { label: "Members Spa" },
        ]}
        title="Members Spa"
        description="An exclusive sanctuary for residents — thermal baths, restorative treatments, and a quiet refuge designed for deep recovery and renewal."
      />

      <ContentSection
        tag="Resident Exclusive"
        title="A Private World of Restoration"
        description="The Members Spa is reserved for Starkdale residents and their guests. Designed as a true escape from the everyday, it combines thermal water circuits, skilled therapists, and serene architecture to create a space where restoration is the only agenda. Whether you visit for an hour or a full day, the spa adapts to your pace."
        imageSrc="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80"
        imagePlaceholder="Members Spa"
      />

      <FeatureGrid
        tag="Facilities"
        title="What Awaits You"
        description="Every element of the Members Spa is designed to support deep rest, recovery, and sensory renewal."
        features={[
          {
            icon: Waves,
            title: "Thermal Baths",
            description: "Mineral-rich thermal pools at varying temperatures — designed to stimulate circulation and promote deep relaxation.",
          },
          {
            icon: Flame,
            title: "Infrared Sauna",
            description: "Private and shared sauna suites using far-infrared heat to detoxify, reduce inflammation, and restore energy.",
          },
          {
            icon: Snowflake,
            title: "Cold Plunge",
            description: "Ice baths and cold water immersion protocols for recovery, mental clarity, and longevity benefits.",
          },
          {
            icon: Sparkles,
            title: "Bespoke Treatments",
            description: "Massages, facials, and body rituals performed by expert therapists using high-quality, natural products.",
          },
          {
            icon: Moon,
            title: "Relaxation Lounges",
            description: "Quiet spaces to decompress before or after treatments — warm lighting, herbal teas, and complete stillness.",
          },
          {
            icon: Heart,
            title: "Couples & Private Suites",
            description: "Dedicated suites for shared experiences — ideal for partners, friends, or solo indulgence.",
          },
        ]}
        columns={3}
      />

      <CTASection
        title="Reserve Your Time"
        description="Members can book spa time and treatments through their Starkdale profile or by contacting our wellness team directly."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "My Starkdale", href: "/profile" }}
      />
    </>
  )
}
