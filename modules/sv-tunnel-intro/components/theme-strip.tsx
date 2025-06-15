"use client"
import { SVUnifiedStrip } from "@/components/blocks/sv-unified-strip"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Palette, Square, Zap, Sparkles, Grid3X3, Circle, Crown, Minimize2, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TunnelIntroTheme } from "../types"
import { themes } from "../utils/theme-utils"

const themeIcons: Record<TunnelIntroTheme, React.ComponentType<any>> = {
  neo1: Square,
  neo2: Circle,
  neo3: Sparkles,
  wireframe: Grid3X3,
  greyscale: Minimize2,
  pop: Zap,
  luxury: Crown,
}

interface ThemeStripProps {
  currentTheme: TunnelIntroTheme
  onThemeChange: (theme: TunnelIntroTheme) => void
  onRestartAnimation: () => void
  isMinimized: boolean
  onToggleMinimize: () => void
}

export function ThemeStrip({
  currentTheme,
  onThemeChange,
  onRestartAnimation,
  isMinimized,
  onToggleMinimize,
}: ThemeStripProps) {
  const themeContent = (
    <>
      {/* Theme buttons */}
      {themes.map((theme) => {
        const IconComponent = themeIcons[theme.id]
        const isActive = currentTheme === theme.id

        return (
          <Button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            variant="ghost"
            size="sm"
            className={cn(
              "flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-[60px] transition-all duration-200 flex-shrink-0",
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
      <div className="w-px h-6 bg-gray-300 mx-1 self-center flex-shrink-0" />

      {/* Restart Animation button */}
      <Button
        onClick={onRestartAnimation}
        variant="ghost"
        size="sm"
        className="flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-[60px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 flex-shrink-0"
        title="Restart Animation"
      >
        <RotateCcw className="h-4 w-4" />
        <span className="text-xs font-medium leading-none">Restart</span>
      </Button>
    </>
  )

  const minimizedContent = (
    <>
      <Palette className="h-4 w-4 text-gray-600" />
      <span className="text-gray-800 ml-2">Themes</span>
    </>
  )

  return (
    <SVUnifiedStrip
      position="bottom"
      isMinimized={isMinimized}
      onToggleMinimize={onToggleMinimize}
      minimizedContent={minimizedContent}
    >
      {themeContent}
    </SVUnifiedStrip>
  )
}
