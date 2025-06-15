"use client"
import React from "react"

import { useState } from "react"
import { DynaLogo } from "./dyna-logo"
import { LogoSelector } from "./logo-selector"
import { defaultLogoConfig } from "../utils/logo-config"
import type { LogoConfig } from "../types"

interface LogoPanelIntegrationProps {
  currentIconVariant: string
}

export const LogoPanelIntegration: React.FC<LogoPanelIntegrationProps> = ({ currentIconVariant }) => {
  const [logoConfig, setLogoConfig] = useState<LogoConfig>({
    ...defaultLogoConfig,
    iconVariant: currentIconVariant,
  })
  const [isOpen, setIsOpen] = useState(false)

  // Update icon variant when it changes from the main icon selector
  React.useEffect(() => {
    setLogoConfig((prev) => ({ ...prev, iconVariant: currentIconVariant }))
  }, [currentIconVariant])

  const handleConfigChange = (newConfig: LogoConfig) => {
    setLogoConfig(newConfig)
  }

  return (
    <>
      <LogoSelector
        currentConfig={logoConfig}
        onConfigChange={handleConfigChange}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />

      {/* Show mini logo in the theme strip area when closed */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-[90]">
          <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-2">
            <DynaLogo
              config={{
                ...logoConfig,
                variant: "icon-only", // Show only icon in mini preview
                showKeylines: false,
              }}
              width={60}
              height={60}
            />
          </div>
        </div>
      )}
    </>
  )
}
