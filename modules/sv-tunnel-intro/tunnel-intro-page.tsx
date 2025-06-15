"use client"
import { useState, useEffect } from "react"
import { TunnelAnimation } from "./components/tunnel-animation"
import { IntroCard } from "./components/intro-card"
import { ThemeStrip } from "./components/theme-strip"
import { IconToggleGroup } from "./components/icon-toggle-group"
import { PixelGridOverlay } from "./components/pixel-grid-overlay"
import { StylesController } from "@/components/styles-controller"
import { SVBrandControlStrip } from "../sv-dynalogo/components/sv-brand-control-strip"
import { applyTheme } from "./utils/theme-utils"
import { saveThemePreference, loadThemePreference } from "./utils/theme-storage"
import { defaultLogoConfig } from "../sv-dynalogo/utils/logo-config"
import { SV_DEFAULT_STATE } from "@/config/sv-brand-config"
import type { TunnelIntroTheme } from "./types"
import type { LogoConfig } from "../sv-dynalogo/types"

// Import all theme styles
import "./styles/themes/index.css"

interface TunnelIntroPageProps {
  initialTheme?: TunnelIntroTheme
  tunnelDuration?: number
  showStylesController?: boolean
}

export function TunnelIntroPage({
  initialTheme = SV_DEFAULT_STATE.theme,
  tunnelDuration = SV_DEFAULT_STATE.tunnelDuration,
  showStylesController = false,
}: TunnelIntroPageProps) {
  const [showTunnel, setShowTunnel] = useState(true)
  const [showCard, setShowCard] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<TunnelIntroTheme>(initialTheme)
  const [isTopStripMinimized, setIsTopStripMinimized] = useState(false)
  const [isBottomStripMinimized, setIsBottomStripMinimized] = useState(false)
  const [iconVariant, setIconVariant] = useState<string>(SV_DEFAULT_STATE.iconVariant)
  const [showGrid, setShowGrid] = useState(SV_DEFAULT_STATE.showGrid)
  const [logoConfig, setLogoConfig] = useState<LogoConfig>({
    ...defaultLogoConfig,
    iconVariant: SV_DEFAULT_STATE.iconVariant,
    showKeylines: SV_DEFAULT_STATE.showKeylines,
  })

  // Load saved theme preference on mount
  useEffect(() => {
    const savedTheme = loadThemePreference()
    if (savedTheme) {
      setCurrentTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme(currentTheme)
    }
  }, [currentTheme])

  useEffect(() => {
    // Show tunnel for specified duration, then reveal card
    const timer = setTimeout(() => {
      setShowTunnel(false)
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setShowCard(true)
      }, 100)
    }, tunnelDuration)

    return () => clearTimeout(timer)
  }, [tunnelDuration])

  // Theme change handler - updates both tunnel and logo
  const handleThemeChange = (newTheme: TunnelIntroTheme) => {
    console.log("SV: Theme change requested from", currentTheme, "to", newTheme)
    setCurrentTheme(newTheme)
    applyTheme(newTheme)
    saveThemePreference(newTheme)
    console.log("SV: Applied and saved theme", newTheme)
  }

  // Icon variant change handler - updates both tunnel and logo
  const handleIconVariantChange = (newVariant: string) => {
    console.log("SV: Icon variant change from", iconVariant, "to", newVariant)
    setIconVariant(newVariant)
    setLogoConfig((prev) => ({ ...prev, iconVariant: newVariant }))
  }

  // Grid toggle handler
  const handleToggleGrid = () => {
    setShowGrid(!showGrid)
    console.log("SV: Grid toggled to", !showGrid)
  }

  // Logo config change handler
  const handleLogoConfigChange = (newConfig: LogoConfig) => {
    setLogoConfig(newConfig)
  }

  // Restart animation handler
  const handleRestartAnimation = () => {
    console.log("SV: Restarting animation with theme", currentTheme, "and icon variant", iconVariant)

    // Reset to tunnel state
    setShowCard(false)
    setShowTunnel(true)

    // Restart the sequence
    setTimeout(() => {
      setShowTunnel(false)
      setTimeout(() => {
        setShowCard(true)
      }, 100)
    }, tunnelDuration)
  }

  return (
    <div
      className={`theme-${currentTheme} w-full min-h-screen flex items-center justify-center p-4 overflow-hidden relative transition-all duration-300`}
      data-theme={currentTheme}
      data-icon-variant={iconVariant}
      data-show-grid={showGrid}
    >
      {/* Pixel Grid Overlay - Behind UI with proper z-index */}
      <PixelGridOverlay show={showGrid} opacity={0.15} />

      {/* Tunnel Animation */}
      {showTunnel && <TunnelAnimation theme={currentTheme} iconVariant={iconVariant} />}

      {/* Main Card Content */}
      {showCard && (
        <div className="w-full max-w-5xl relative z-10">
          <IntroCard theme={currentTheme} iconVariant={iconVariant} />
        </div>
      )}

      {/* Icon Toggle Group - Top center, draggable */}
      <IconToggleGroup
        currentVariant={iconVariant}
        onVariantChange={handleIconVariantChange}
        isMinimized={isTopStripMinimized}
        onToggleMinimize={() => setIsTopStripMinimized(!isTopStripMinimized)}
      />

      {/* SV Brand Control Strip - Bottom, draggable */}
      <SVBrandControlStrip
        logoConfig={logoConfig}
        onLogoConfigChange={handleLogoConfigChange}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        iconVariant={iconVariant}
        onIconVariantChange={handleIconVariantChange}
        showGrid={showGrid}
        onToggleGrid={handleToggleGrid}
        onRestartAnimation={handleRestartAnimation}
        isMinimized={isBottomStripMinimized}
        onToggleMinimize={() => setIsBottomStripMinimized(!isBottomStripMinimized)}
      />

      {/* Theme Controls - Legacy support */}
      {showStylesController ? (
        <StylesController currentTheme={currentTheme} onThemeChange={handleThemeChange} />
      ) : (
        <ThemeStrip
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          onRestartAnimation={handleRestartAnimation}
          isMinimized={false}
          onToggleMinimize={() => {}}
        />
      )}

      {/* Debug info in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 bg-black/50 text-white p-2 rounded text-xs z-50">
          <div>Tunnel: {showTunnel ? "visible" : "hidden"}</div>
          <div>Card: {showCard ? "visible" : "hidden"}</div>
          <div>Theme: {currentTheme}</div>
          <div>Icon: {iconVariant}</div>
          <div>Grid: {showGrid ? "visible" : "hidden"}</div>
          <div>Keylines: {logoConfig.showKeylines ? "visible" : "hidden"}</div>
          <div>Top Strip: {isTopStripMinimized ? "minimized" : "expanded"}</div>
          <div>Bottom Strip: {isBottomStripMinimized ? "minimized" : "expanded"}</div>
        </div>
      )}
    </div>
  )
}
