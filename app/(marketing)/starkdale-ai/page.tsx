import { Suspense } from "react"
import { StarkdaleAIContent } from "./content"

export default function StarkdaleAIPage() {
  return (
    <Suspense>
      <StarkdaleAIContent />
    </Suspense>
  )
}
