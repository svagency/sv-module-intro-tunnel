"use client"
import { TunnelIntroPage } from "@/modules/sv-tunnel-intro/tunnel-intro-page"

export default function HomePage() {
  return (
    <TunnelIntroPage
      initialTheme="wireframe"
      tunnelDuration={3000}
      showStylesController={false} // Set to true to use the dropdown controller
    />
  )
}
