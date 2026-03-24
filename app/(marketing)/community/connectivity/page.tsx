import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { CTASection } from "@/components/cta-section"

export default function CommunityTechnologyPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Community", href: "/community" },
          { label: "Community & Technology" },
        ]}
        title="Community & Technology"
        description="Six technology stacks powering Starkdale's connected, intelligent, and future-ready community — from member networks and smart infrastructure to autonomous mobility and cultural platforms."
      />

      <ContentSection
        tag="1 — Member Connectivity Accelerator"
        title="A Platform Built for Community"
        description="Starkdale's Member Connectivity Accelerator brings residents together through a shared digital layer — enabling neighbor introductions, community events, interest groups, and real-time communication across all neighborhoods. The platform is built to strengthen social bonds and make the invisible fabric of community life visible and easy to participate in."
        imageSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
        imagePlaceholder="Member connectivity platform"
      />

      <ContentSection
        tag="2 — Operational Intelligence & Optimization"
        title="Smarter Operations, Seamlessly Delivered"
        description="Behind every smooth experience at Starkdale is a layer of operational intelligence. Predictive systems monitor and optimize amenity usage, maintenance cycles, staffing, and service delivery — so residents experience a community that simply works. Data from across the estate feeds into a unified operations platform that continuously improves performance."
        imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
        imagePlaceholder="Operational intelligence dashboard"
        reverse
      />

      <ContentSection
        tag="3 — Smart & Sustainable Infrastructure"
        title="Infrastructure That Thinks"
        description="Starkdale's smart infrastructure integrates energy management, environmental sensing, water systems, and security into one connected ecosystem. Solar microgrids, automated lighting, air quality monitoring, and intelligent access control work in the background — reducing the community's environmental footprint and keeping residents safe, comfortable, and informed."
        imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
        imagePlaceholder="Smart sustainable infrastructure"
      />

      <ContentSection
        tag="4 — Health, Wellness, & Longevity Tech"
        title="Technology in Service of Longevity"
        description="Integrated health technology connects residents to ROSEBAR's longevity programs, biometric monitoring, and personalized wellness insights. Wearable integrations, in-home health sensors, and a secure health data platform give residents a complete picture of their wellbeing — and the tools to act on it every day."
        imageSrc="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80"
        imagePlaceholder="Health and wellness technology"
        reverse
      />

      <ContentSection
        tag="5 — Mobility & Autonomous Transport"
        title="Move Freely, Move Intelligently"
        description="Getting around Starkdale — and between Starkdale and the city — is frictionless by design. A fleet of autonomous and electric vehicles connects neighborhoods, amenities, and the resort. Smart routing, on-demand transit, and EV charging infrastructure ensure that mobility is sustainable, convenient, and always available."
        imageSrc="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80"
        imagePlaceholder="Mobility and autonomous transport"
      />

      <ContentSection
        tag="6 — Education & Cultural Platforms"
        title="Learning as a Way of Life"
        description="Starkdale's education and cultural platforms bring world-class speakers, workshops, residencies, and digital learning resources directly to residents. From curated lecture series and artist talks to online courses and children's programming, the platform supports lifelong curiosity and keeps community life intellectually alive."
        imageSrc="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80"
        imagePlaceholder="Education and cultural platforms"
        reverse
      />

      <CTASection
        title="Experience the Connected Community"
        description="Visit us to see how Starkdale's technology stack creates a community that is smarter, more connected, and better designed for the way people want to live."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "Explore Community", href: "/community" }}
      />
    </>
  )
}
