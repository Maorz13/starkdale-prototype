"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function DesignSystemTabs({
  components,
  typography,
  atoms,
  colors,
}: {
  components: React.ReactNode
  typography: React.ReactNode
  atoms: React.ReactNode
  colors: React.ReactNode
}) {
  return (
    <Tabs defaultValue="components" className="gap-0">
      <div className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TabsList variant="line" className="h-12 gap-4 rounded-none bg-transparent p-0">
            <TabsTrigger value="components" className="h-full rounded-none px-1 text-sm">
              Components
            </TabsTrigger>
            <TabsTrigger value="typography" className="h-full rounded-none px-1 text-sm">
              Typography
            </TabsTrigger>
            <TabsTrigger value="atoms" className="h-full rounded-none px-1 text-sm">
              Atoms
            </TabsTrigger>
            <TabsTrigger value="colors" className="h-full rounded-none px-1 text-sm">
              Colors
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <TabsContent value="components">{components}</TabsContent>
      <TabsContent value="typography">{typography}</TabsContent>
      <TabsContent value="atoms">{atoms}</TabsContent>
      <TabsContent value="colors">{colors}</TabsContent>
    </Tabs>
  )
}
