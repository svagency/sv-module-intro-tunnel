"use client"
import { Button } from "@/components/ui/button"
import { Grid3X3, Eye, EyeOff } from "lucide-react"

interface GridToggleProps {
  showGrid: boolean
  onToggleGrid: () => void
}

export function GridToggle({ showGrid, onToggleGrid }: GridToggleProps) {
  return (
    <div className="fixed top-4 right-4 z-[100]">
      <Button
        onClick={onToggleGrid}
        variant="outline"
        size="sm"
        className="grid-toggle-button bg-white/90 hover:bg-white border border-gray-200 shadow-lg backdrop-blur-sm flex items-center gap-2"
        title={showGrid ? "Hide pixel grid" : "Show pixel grid"}
      >
        <Grid3X3 className="h-4 w-4 text-gray-600" />
        {showGrid ? <EyeOff className="h-3 w-3 text-gray-600" /> : <Eye className="h-3 w-3 text-gray-600" />}
        <span className="text-gray-800 text-xs">Grid</span>
      </Button>

      <style jsx>{`
        /* Fixed grid toggle styles */
        :global(.grid-toggle-button) {
          background: rgba(255, 255, 255, 0.9) !important;
          border: 1px solid #e5e7eb !important;
          backdrop-filter: blur(8px) !important;
        }
        
        /* Override theme styles */
        :global(.theme-wireframe .grid-toggle-button),
        :global(.theme-neo1 .grid-toggle-button),
        :global(.theme-neo2 .grid-toggle-button),
        :global(.theme-neo3 .grid-toggle-button),
        :global(.theme-greyscale .grid-toggle-button),
        :global(.theme-pop .grid-toggle-button),
        :global(.theme-luxury .grid-toggle-button),
        :global(body.theme-wireframe .grid-toggle-button),
        :global(body.theme-neo1 .grid-toggle-button),
        :global(body.theme-neo2 .grid-toggle-button),
        :global(body.theme-neo3 .grid-toggle-button),
        :global(body.theme-greyscale .grid-toggle-button),
        :global(body.theme-pop .grid-toggle-button),
        :global(body.theme-luxury .grid-toggle-button) {
          background: rgba(255, 255, 255, 0.9) !important;
          border: 1px solid #e5e7eb !important;
          backdrop-filter: blur(8px) !important;
        }
      `}</style>
    </div>
  )
}
