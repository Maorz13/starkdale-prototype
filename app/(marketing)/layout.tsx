import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StickyChat } from "@/components/sticky-chat"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 pb-24">{children}</main>
      <SiteFooter />
      <StickyChat />
    </div>
  )
}
