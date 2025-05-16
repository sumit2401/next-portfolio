import Loader from "@/components/loader"
import { Suspense } from "react"
import MainContent from "@/components/main-content"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<Loader />}>
        <MainContent />
      </Suspense>
    </main>
  )
}
