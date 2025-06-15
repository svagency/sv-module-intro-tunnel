"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function AppNavigation() {
  const router = useRouter()

  return (
    <div className="fixed top-4 left-4 z-[100] flex gap-2">
      <Button
        onClick={() => router.push("/")}
        variant="outline"
        size="sm"
        className="bg-white/90 hover:bg-white border border-gray-200 shadow-lg backdrop-blur-sm"
      >
        Intro
      </Button>
      <Button
        onClick={() => router.push("/app")}
        variant="outline"
        size="sm"
        className="bg-white/90 hover:bg-white border border-gray-200 shadow-lg backdrop-blur-sm"
      >
        App
      </Button>
    </div>
  )
}
