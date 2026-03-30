import { SAMPLE_PROPERTIES } from "@/lib/sample-properties"
import { ResidenceDetail } from "@/components/residence-detail"
import { notFound } from "next/navigation"

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = SAMPLE_PROPERTIES.find((p) => p.id === id)
  if (!property) notFound()

  return (
    <div className="flex min-h-svh flex-col">
      <ResidenceDetail property={property} backHref="/residences" />
    </div>
  )
}
