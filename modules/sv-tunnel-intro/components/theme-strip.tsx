"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Palette, Square, Zap, Sparkles, Grid3X3, Circle, Crown, Minimize2, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TunnelIntroTheme } from "../types"
import { themes } from "../utils/theme-utils"

interface ThemeStripProps {
  currentTheme: TunnelIntroTheme
  onThemeChange: (theme: TunnelIntroTheme) => void
  onRestartAnimation: () => void
  isMinimized?: boolean
  onToggleMinimize?: () => void
}

const themeIcons: Record<TunnelIntroTheme, React.ComponentType<any>> = {
  neo1: Square,
  neo2: Circle,
  neo3: Sparkles,
  wireframe: Grid3X3,
  greyscale: Minimize2,
  pop: Zap,
  luxury: Crown,
}

export function ThemeStrip({
  currentTheme,
  onThemeChange,
  onRestartAnimation,
  isMinimized = false,
  onToggleMinimize,
}: ThemeStripProps) {
  const handleThemeClick = (themeId: TunnelIntroTheme) => {
    onThemeChange(themeId)
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100]">
        <div className="flex items-center gap-2">
          <Button
            onClick={onToggleMinimize}
            className="theme-strip-button bg-white/90 hover:bg-white border border-gray-200 shadow-lg backdrop-blur-sm"
            size="sm"
          >
            <Palette className="h-4 w-4 text-gray-600" />
            <span className="text-gray-800 ml-2">Themes</span>
          </Button>

          <Button
            onClick={onRestartAnimation}
            className="theme-strip-button bg-white/90 hover:bg-white border border-gray-200 shadow-lg backdrop-blur-sm"
            size="sm"
            title="Restart Animation"
          >
            <RotateCcw className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100]">
      <div className="theme-strip-container bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-3">
        <div className="flex items-center gap-2">
          {/* Minimize button */}
          <Button
            onClick={onToggleMinimize}
            variant="ghost"
            size="sm"
            className="theme-strip-button h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            title="Minimize"
          >
            <Minimize2 className="h-3 w-3" />
          </Button>

          {/* Separator */}
          <div className="w-px h-6 bg-gray-300" />

          {/* Theme buttons */}
          {themes.map((theme) => {
            const IconComponent = themeIcons[theme.id]
            const isActive = currentTheme === theme.id

            return (
              <Button
                key={theme.id}
                onClick={() => handleThemeClick(theme.id)}
                variant="ghost"
                size="sm"
                className={cn(
                  "theme-strip-button flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-[60px] transition-all duration-200",
                  isActive
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                )}
                title={theme.description}
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-xs font-medium leading-none">{theme.name.split(" ")[0]}</span>
              </Button>
            )
          })}

          {/* Separator */}
          <div className="w-px h-6 bg-gray-300" />

          {/* Restart Animation button */}
          <Button
            onClick={onRestartAnimation}
            variant="ghost"
            size="sm"
            className="theme-strip-button flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-[60px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            title="Restart Animation"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-xs font-medium leading-none">Restart</span>
          </Button>
        </div>
      </div>

      <style jsx>{`
        /* Fixed theme strip styles that never change */
        :global(.theme-strip-container) {
          background: rgba(255, 255, 255, 0.95) !important;
          border: 1px solid #e5e7eb !important;
          backdrop-filter: blur(12px) !important;
        }
        
        :global(.theme-strip-button) {
          border: none !important;
          box-shadow: none !important;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif !important;
        }
        
        /* Override any theme styles for the strip */
        :global(.theme-wireframe .theme-strip-container),
        :global(.theme-neo1 .theme-strip-container),
        :global(.theme-neo2 .theme-strip-container),
        :global(.theme-neo3 .theme-strip-container),
        :global(.theme-greyscale .theme-strip-container),
        :global(.theme-pop .theme-strip-container),
        :global(.theme-luxury .theme-strip-container),
        :global(body.theme-wireframe .theme-strip-container),
        :global(body.theme-neo1 .theme-strip-container),
        :global(body.theme-neo2 .theme-strip-container),
        :global(body.theme-neo3 .theme-strip-container),
        :global(body.theme-greyscale .theme-strip-container),
        :global(body.theme-pop .theme-strip-container),
        :global(body.theme-luxury .theme-strip-container) {
          background: rgba(255, 255, 255, 0.95) !important;
          border: 1px solid #e5e7eb !important;
          backdrop-filter: blur(12px) !important;
        }
      `}</style>
    </div>
  )
}
