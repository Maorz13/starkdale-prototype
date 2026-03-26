import { Home, TreePine, Heart, Mountain, Users, Sparkles } from "lucide-react"
import { VideoHeroSection } from "@/components/video-hero-section"
import { HeroSection } from "@/components/hero-section"
import { ContentSection } from "@/components/content-section"
import { FeatureGrid } from "@/components/feature-grid"
import { CardGrid } from "@/components/card-grid"
import { CTASection } from "@/components/cta-section"
import { PageHeader } from "@/components/page-header"
import { PropertyCard } from "@/components/property-card"
import { ContactForm } from "@/components/contact-form"
import { NewsletterForm } from "@/components/newsletter-form"
import { DesignSystemTabs } from "./design-system-tabs"
import { AtomsTabContent } from "./atoms-tab-content"
import { ColorsTabContent } from "./colors-tab-content"
import { ThemeToggle } from "./theme-toggle"

function ComponentBlock({
  name,
  file,
  children,
}: {
  name: string
  file: string
  children: React.ReactNode
}) {
  return (
    <div className="border-t pt-10">
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline gap-3">
          <h2 className="text-xl font-semibold">{name}</h2>
          <code className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {file}
          </code>
        </div>
      </div>
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}

function TypeRow({
  label,
  sub,
  children,
}: {
  label: string
  sub: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-baseline gap-6 border-b py-5 last:border-0">
      <div className="w-40 shrink-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <code className="text-[10px] text-muted-foreground/60">{sub}</code>
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

// ─── Tab content ────────────────────────────────────────────────────────────

const ComponentsTab = (
  <div className="space-y-10 pb-24">
    <ComponentBlock name="VideoHeroSection" file="components/video-hero-section.tsx">
      <VideoHeroSection
        tag="Eyebrow Tag"
        title="Full-Screen Video Hero"
        description="Looping video background with centered title, description, and two action buttons. Falls back to a static image when no videoSrc is provided."
        actions={[
          { label: "Primary Action", href: "#" },
          { label: "Secondary Action", href: "#" },
        ]}
        posterSrc="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80"
      />
    </ComponentBlock>

    <ComponentBlock name="HeroSection" file="components/hero-section.tsx">
      <HeroSection
        tag="Eyebrow Tag"
        title="Side-by-Side Image Hero"
        description="Two-column hero layout with text on the left and an image on the right. Supports a reverse prop to flip the layout."
        actions={[
          { label: "Primary", href: "#" },
          { label: "Secondary", href: "#", variant: "outline" },
        ]}
        imageSrc="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80"
        imagePlaceholder="Hero image"
      />
    </ComponentBlock>

    <ComponentBlock name="ContentSection" file="components/content-section.tsx">
      <ContentSection
        tag="Normal Layout"
        title="Text Left, Image Right"
        description="Two-column content section with a badge tag, heading, description, and an image. Use the reverse prop to flip image and text sides."
        imageSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80"
        imagePlaceholder="Content image"
      />
      <ContentSection
        tag="Reversed Layout"
        title="Image Left, Text Right"
        description="Same component with reverse={true} — useful for alternating image positions across sequential sections on a page."
        imageSrc="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80"
        imagePlaceholder="Content image reversed"
        reverse
      />
    </ComponentBlock>

    <ComponentBlock name="FeatureGrid" file="components/feature-grid.tsx">
      <FeatureGrid
        tag="Eyebrow Tag"
        title="Icon Feature Grid"
        description="Centered header with a responsive grid of icon + title + description cards. Supports 2, 3, or 4 columns."
        columns={3}
        features={[
          { icon: Heart, title: "Longevity Science", description: "ROSEBAR with Dr. Mark Hyman — diagnostics, biohacking, and personalized health programs." },
          { icon: TreePine, title: "Nature Immersion", description: "22 km of trails, a 10-acre lake, and adventure basecamp steps from your door." },
          { icon: Mountain, title: "Thoughtful Architecture", description: "Traditional, Modern, and Agriculture styles across 10 distinct neighborhoods." },
          { icon: Users, title: "Like-Minded Community", description: "Curated urban professionals who value health, sustainability, and connection." },
          { icon: Sparkles, title: "World-Class Spa", description: "100,000 SF spa with thermal baths, fitness, beauty rituals, and wellness programs." },
          { icon: Home, title: "Accessible Ownership", description: "Designed for first-time second-home buyers — community-first, not ultra-exclusive." },
        ]}
      />
    </ComponentBlock>

    <ComponentBlock name="CardGrid" file="components/card-grid.tsx">
      <CardGrid
        tag="Eyebrow Tag"
        title="Image Card Grid"
        description="Responsive grid of linked image cards with title and description. Supports 2, 3, or 4 columns."
        columns={3}
        items={[
          { title: "Cascades", description: "74 units nestled among natural water features", href: "#", imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" },
          { title: "Private Reserve", description: "10 exclusive homesites with maximum privacy", href: "#", imageSrc: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80" },
          { title: "The Square", description: "115 units + retail at the pedestrian core", href: "#", imageSrc: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80" },
        ]}
      />
    </ComponentBlock>

    <ComponentBlock name="CTASection" file="components/cta-section.tsx">
      <CTASection
        title="Call-to-Action Banner"
        description="Full-width primary-colored section with a heading, description, and up to two action buttons."
        primaryAction={{ label: "Primary Action", href: "#" }}
        secondaryAction={{ label: "Secondary Action", href: "#" }}
      />
    </ComponentBlock>

    <ComponentBlock name="PageHeader" file="components/page-header.tsx">
      <PageHeader
        breadcrumbs={[
          { label: "Section", href: "#" },
          { label: "Current Page" },
        ]}
        title="Page Header with Breadcrumbs"
        description="Muted top section with optional breadcrumb trail, a large title, and a description. Used on sub-pages."
      />
    </ComponentBlock>

    <ComponentBlock name="PropertyCard" file="components/property-card.tsx">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PropertyCard id="sample-1" title="Cascades Villa — Unit 14" neighborhood="Cascades" price="$1,250,000" beds={3} baths={2} sqft="2,400 sq ft" type="Multifamily" />
          <PropertyCard id="sample-2" title="West Ridge Homesite" neighborhood="West Ridge" price="$2,800,000" beds={4} baths={3} sqft="4,100 sq ft" type="Single Family" />
          <PropertyCard id="sample-3" title="The Square — Unit 7B" neighborhood="The Square" price="$890,000" beds={2} baths={2} sqft="1,650 sq ft" type="Multifamily" />
        </div>
      </div>
    </ComponentBlock>

    <ComponentBlock name="ContactForm" file="components/contact-form.tsx">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ContactForm title="Default (showInterest: true)" description="With area-of-interest selector." />
          <ContactForm title="Simplified (showInterest: false)" description="Without the area-of-interest selector." showInterest={false} />
        </div>
      </div>
    </ComponentBlock>

    <ComponentBlock name="NewsletterForm" file="components/newsletter-form.tsx">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm text-muted-foreground">
          Inline email input + submit icon button. Used in the site footer.
        </p>
        <NewsletterForm />
      </div>
    </ComponentBlock>
  </div>
)

const TypographyTab = (
  <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 pb-24">

    {/* Type scale */}
    <div className="mb-12">
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Type Scale</h2>
      <div className="mt-4">
        <TypeRow label="Display" sub="text-7xl / font-bold / tracking-tight">
          <p className="text-7xl font-bold tracking-tight leading-none">Starkdale</p>
        </TypeRow>
        <TypeRow label="Hero / H1" sub="text-6xl / font-bold / tracking-tight">
          <p className="text-6xl font-bold tracking-tight leading-none">Your Home. Your Legacy.</p>
        </TypeRow>
        <TypeRow label="H2" sub="text-5xl / font-bold / tracking-tight">
          <p className="text-5xl font-bold tracking-tight">Living Longer, Living Better</p>
        </TypeRow>
        <TypeRow label="H3" sub="text-4xl / font-bold / tracking-tight">
          <p className="text-4xl font-bold tracking-tight">Restore. Renew. Transform.</p>
        </TypeRow>
        <TypeRow label="H4" sub="text-3xl / font-bold / tracking-tight">
          <p className="text-3xl font-bold tracking-tight">Ten Distinct Neighborhoods</p>
        </TypeRow>
        <TypeRow label="H5" sub="text-2xl / font-semibold">
          <p className="text-2xl font-semibold">The Members Spa</p>
        </TypeRow>
        <TypeRow label="H6" sub="text-xl / font-semibold">
          <p className="text-xl font-semibold">Cascades Villa — Unit 14</p>
        </TypeRow>
        <TypeRow label="Lead" sub="text-lg / normal weight">
          <p className="text-lg">A living environment designed to extend your lifespan and healthspan — where nature, longevity science, and community converge just 85 minutes from Manhattan.</p>
        </TypeRow>
        <TypeRow label="Body" sub="text-base / normal weight">
          <p className="text-base">Starkdale's 330 multifamily units and 113 custom single-family homes are designed with the same rigor applied to the community itself. Healthy materials, natural light, and connection to the outdoors.</p>
        </TypeRow>
        <TypeRow label="Small" sub="text-sm / normal weight">
          <p className="text-sm">From intimate acoustic evenings to open-air performances under the sky, music at Starkdale is a living thread woven through community life.</p>
        </TypeRow>
        <TypeRow label="Caption / XS" sub="text-xs / normal weight">
          <p className="text-xs">3 beds · 2 baths · 2,400 sq ft · Cascades Neighborhood</p>
        </TypeRow>
      </div>
    </div>

    {/* Font weights */}
    <div className="mb-12">
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Font Weight</h2>
      <div className="mt-4">
        <TypeRow label="Normal / 400" sub="font-normal">
          <p className="text-2xl font-normal">The landscape is the gym.</p>
        </TypeRow>
        <TypeRow label="Medium / 500" sub="font-medium">
          <p className="text-2xl font-medium">The landscape is the gym.</p>
        </TypeRow>
        <TypeRow label="Semibold / 600" sub="font-semibold">
          <p className="text-2xl font-semibold">The landscape is the gym.</p>
        </TypeRow>
        <TypeRow label="Bold / 700" sub="font-bold">
          <p className="text-2xl font-bold">The landscape is the gym.</p>
        </TypeRow>
      </div>
    </div>

    {/* Text colors */}
    <div className="mb-12">
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Text Colors</h2>
      <div className="mt-4">
        <TypeRow label="Foreground" sub="text-foreground">
          <p className="text-lg text-foreground">Default body text — highest contrast.</p>
        </TypeRow>
        <TypeRow label="Muted" sub="text-muted-foreground">
          <p className="text-lg text-muted-foreground">Secondary text, descriptions, captions.</p>
        </TypeRow>
        <TypeRow label="Primary" sub="text-primary">
          <p className="text-lg text-primary">Accent text, links, active states.</p>
        </TypeRow>
        <TypeRow label="Destructive" sub="text-destructive">
          <p className="text-lg text-destructive">Errors, warnings, critical states.</p>
        </TypeRow>
      </div>
    </div>

    {/* Letter spacing */}
    <div className="mb-12">
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Letter Spacing</h2>
      <div className="mt-4">
        <TypeRow label="Tight" sub="tracking-tight">
          <p className="text-3xl font-bold tracking-tight">Your Home. Your Legacy.</p>
        </TypeRow>
        <TypeRow label="Normal" sub="tracking-normal">
          <p className="text-3xl font-bold tracking-normal">Your Home. Your Legacy.</p>
        </TypeRow>
        <TypeRow label="Wide" sub="tracking-wide">
          <p className="text-3xl font-bold tracking-wide">Your Home. Your Legacy.</p>
        </TypeRow>
        <TypeRow label="Widest" sub="tracking-widest">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">658 Acres in Upstate New York</p>
        </TypeRow>
      </div>
    </div>

    {/* Special styles */}
    <div>
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Special Styles</h2>
      <div className="mt-4">
        <TypeRow label="Eyebrow / Tag" sub="text-sm / uppercase / tracking-widest / muted">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Longevity & Wellness</p>
        </TypeRow>
        <TypeRow label="Hero Eyebrow" sub="text-sm / uppercase / tracking-widest / white/70 (on dark)">
          <div className="inline-block rounded bg-foreground/90 px-3 py-1.5">
            <p className="text-sm font-medium uppercase tracking-widest text-white/70">658 Acres in Upstate New York</p>
          </div>
        </TypeRow>
        <TypeRow label="Inline Code" sub="font-mono / bg-muted">
          <p className="text-sm">
            Import with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              {"import { VideoHeroSection } from '@/components/video-hero-section'"}
            </code>
          </p>
        </TypeRow>
        <TypeRow label="Link style" sub="underline-offset-4 / hover:underline">
          <p className="text-base">
            Explore our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-muted-foreground">
              longevity programs
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-muted-foreground">
              spa experiences
            </a>
            .
          </p>
        </TypeRow>
      </div>
    </div>

  </div>
)

export default function DesignSystemPage() {
  return (
    <div>
      {/* Page title */}
      <div className="border-b bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Internal
              </p>
              <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
            </div>
            <div className="mt-1 shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <DesignSystemTabs
        components={ComponentsTab}
        typography={TypographyTab}
        atoms={<AtomsTabContent />}
        colors={<ColorsTabContent />}
      />
    </div>
  )
}
