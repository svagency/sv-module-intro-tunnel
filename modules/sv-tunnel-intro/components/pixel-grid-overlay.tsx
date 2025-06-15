"use client"

interface PixelGridOverlayProps {
  show: boolean
  opacity?: number
}

export function PixelGridOverlay({ show, opacity = 0.15 }: PixelGridOverlayProps) {
  if (!show) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 0",
      }}
    />
  )
}
