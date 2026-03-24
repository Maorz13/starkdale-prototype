import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { FeatureGrid } from "@/components/feature-grid"
import { CTASection } from "@/components/cta-section"
import { Sunrise, Flame, Brain, Wind, Droplets, Sparkles } from "lucide-react"

export default function WellnessPerfectDayPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Longevity & Wellness", href: "/wellness" },
          { label: "Perfect Day" },
        ]}
        title="The Perfect Wellness Day"
        description="A curated journey through Starkdale's full wellness ecosystem — designed to reset, optimize, and elevate your body and mind in a single day."
      />

      <ContentSection
        tag="Curated Wellness"
        title="One Day. Total Transformation."
        description="Our Perfect Day program takes you through the best of ROSEBAR and the Members Spa in a single, expertly curated experience. Whether you're a resident or a guest, our wellness team designs your day around your health goals — combining diagnostics, therapies, movement, and restoration into a seamless journey from morning to evening."
        imageSrc="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80"
        imagePlaceholder="Wellness Perfect Day"
      />

      <FeatureGrid
        tag="The Journey"
        title="What a Perfect Wellness Day Includes"
        description="Each element is thoughtfully sequenced for maximum benefit and genuine restoration."
        features={[
          {
            icon: Sunrise,
            title: "Morning Diagnostics",
            description: "Begin with a comprehensive biomarker assessment at ROSEBAR — establishing your baseline for the day's protocols.",
          },
          {
            icon: Flame,
            title: "Biohacking Therapies",
            description: "Red light therapy, infrared sauna, and cryotherapy to energize, recover, and optimize cellular function.",
          },
          {
            icon: Brain,
            title: "Longevity Consultation",
            description: "A one-on-one session with a longevity specialist to review results and build your personalized health roadmap.",
          },
          {
            icon: Droplets,
            title: "Thermal Spa Circuit",
            description: "Afternoon immersion in the Members Spa — thermal pools, steam rooms, and hydrotherapy at your own pace.",
          },
          {
            icon: Wind,
            title: "Breathwork & Meditation",
            description: "Guided breathwork and mindfulness sessions to quiet the mind and deepen your restoration.",
          },
          {
            icon: Sparkles,
            title: "Evening Ritual",
            description: "Close with a bespoke treatment — massage, facial, or body ritual — tailored to your body's needs.",
          },
        ]}
        columns={3}
      />

      <CTASection
        title="Book Your Perfect Day"
        description="Contact our wellness team to arrange your Perfect Day experience at Starkdale — available for residents and day guests."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "Explore ROSEBAR", href: "/wellness/rosebar" }}
      />
    </>
  )
}
