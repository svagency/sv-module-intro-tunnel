"use client"
import { useState, useEffect } from "react"
import { TunnelAnimation } from "./components/tunnel-animation"
import { IntroCard } from "./components/intro-card"
import { ThemeStrip } from "./components/theme-strip"
import { applyTheme } from "./utils/theme-utils"
import { saveThemePreference, loadThemePreference } from "./utils/theme-storage"
import type { TunnelIntroTheme } from "./types"

// Import all theme styles
import "./styles/themes/index.css"

interface TunnelIntroPageProps {
  initialTheme?: TunnelIntroTheme
  tunnelDuration?: number
}

export function TunnelIntroPage({ initialTheme = "wireframe", tunnelDuration = 3000 }: TunnelIntroPageProps) {
  const [showTunnel, setShowTunnel] = useState(true)
  const [showCard, setShowCard] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<TunnelIntroTheme>(initialTheme)
  const [isStripMinimized, setIsStripMinimized] = useState(false)

  // Load saved theme preference on mount
  useEffect(() => {
    const savedTheme = loadThemePreference()
    if (savedTheme) {
      setCurrentTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme(currentTheme)
    }
  }, [])

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

  // Theme change handler - only updates UI, no animation restart
  const handleThemeChange = (newTheme: TunnelIntroTheme) => {
    console.log("TunnelIntroPage: Theme change requested from", currentTheme, "to", newTheme)
    setCurrentTheme(newTheme)
    applyTheme(newTheme)
    saveThemePreference(newTheme)
    console.log("TunnelIntroPage: Applied and saved theme", newTheme)
  }

  // Separate restart animation handler
  const handleRestartAnimation = () => {
    console.log("TunnelIntroPage: Restarting animation with theme", currentTheme)

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
    >
      {/* Tunnel Animation */}
      {showTunnel && <TunnelAnimation theme={currentTheme} />}

      {/* Main Card Content */}
      {showCard && (
        <div className="w-full max-w-5xl relative z-10">
          <IntroCard theme={currentTheme} />
        </div>
      )}

      {/* Theme Strip - always visible */}
      <ThemeStrip
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        onRestartAnimation={handleRestartAnimation}
        isMinimized={isStripMinimized}
        onToggleMinimize={() => setIsStripMinimized(!isStripMinimized)}
      />

      {/* Debug info in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 bg-black/50 text-white p-2 rounded text-xs z-50">
          <div>Tunnel: {showTunnel ? "visible" : "hidden"}</div>
          <div>Card: {showCard ? "visible" : "hidden"}</div>
          <div>Theme: {currentTheme}</div>
          <div>Saved: {loadThemePreference() || "none"}</div>
        </div>
      )}
    </div>
  )
}
