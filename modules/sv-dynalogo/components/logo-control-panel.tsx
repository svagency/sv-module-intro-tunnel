"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  X,
  Palette,
  Type,
  Settings,
  Maximize2,
  Minimize2,
  Sparkles,
  Grid3X3,
  RotateCcw,
  Square,
  Circle,
  Zap,
  Crown,
} from "lucide-react"
import { DynaLogo } from "./dyna-logo"
import { logoVariants, fontFamilies } from "../utils/logo-config"
import { themes } from "../../sv-tunnel-intro/utils/theme-utils"
import { useIsMobile } from "@/components/ui/use-mobile"
import type { LogoControlPanelProps } from "../types"
import type { TunnelIntroTheme } from "../../sv-tunnel-intro/types"

const themeIcons: Record<TunnelIntroTheme, React.ComponentType<any>> = {
  neo1: Square,
  neo2: Circle,
  neo3: Sparkles,
  wireframe: Grid3X3,
  greyscale: Minimize2,
  pop: Zap,
  luxury: Crown,
}

export const LogoControlPanel: React.FC<LogoControlPanelProps> = ({
  logoConfig,
  onLogoConfigChange,
  isOpen,
  onToggle,
  currentTheme,
  onThemeChange,
  iconVariant,
  onIconVariantChange,
  showGrid,
  onToggleGrid,
  onRestartAnimation,
}) => {
  const [activeTab, setActiveTab] = useState<"logo" | "theme" | "layout">("logo")
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(true)
  const [fontSize, setFontSize] = useState(75)
  const isMobile = useIsMobile()

  // Calculate responsive logo size
  const getLogoSize = () => {
    if (isMobile) {
      const screenWidth = window.innerWidth - 32 // Account for padding
      const maxWidth = Math.min(screenWidth, 360)
      return {
        width: maxWidth,
        height: Math.round(maxWidth * 0.25), // Maintain aspect ratio
      }
    }
    return { width: 320, height: 80 }
  }

  if (!isOpen) {
    return (
      <div className={`fixed z-[90] ${isMobile ? "bottom-20 right-4" : "top-4 right-4"}`}>
        <Button
          onClick={onToggle}
          className="logo-control-button bg-white/90 hover:bg-white border border-gray-200 shadow-lg backdrop-blur-sm"
          size={isMobile ? "default" : "sm"}
        >
          <div className="flex items-center gap-2">
            {/* Mini logo preview */}
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-gray-800">Logos</span>
          </div>
        </Button>
      </div>
    )
  }

  if (isMobile) {
    const logoSize = getLogoSize()

    return (
      <div className="fixed inset-0 z-[95] bg-black/50 backdrop-blur-sm">
        <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10 rounded-t-3xl">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <Palette className="h-6 w-6 text-blue-600" />
              Brand Control Center
            </h2>
            <Button onClick={onToggle} variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Preview */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Live Preview</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                className="h-8 px-2 rounded-full"
              >
                {isPreviewExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
            <div
              className={`transition-all duration-300 bg-white rounded-xl p-3 shadow-sm overflow-hidden ${
                isPreviewExpanded ? "h-auto" : "h-16"
              }`}
            >
              <div className="flex items-center justify-center">
                <DynaLogo config={logoConfig} width={logoSize.width} height={logoSize.height} />
              </div>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="flex bg-gray-100 mx-4 mt-4 rounded-xl p-1 shadow-inner">
            <Button
              variant={activeTab === "logo" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("logo")}
              className="flex-1 h-11 rounded-lg font-medium"
            >
              <Type className="h-4 w-4 mr-2" />
              Logo
            </Button>
            <Button
              variant={activeTab === "theme" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("theme")}
              className="flex-1 h-11 rounded-lg font-medium"
            >
              <Palette className="h-4 w-4 mr-2" />
              Theme
            </Button>
            <Button
              variant={activeTab === "layout" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("layout")}
              className="flex-1 h-11 rounded-lg font-medium"
            >
              <Settings className="h-4 w-4 mr-2" />
              Layout
            </Button>
          </div>

          {/* Mobile Content */}
          <div className="p-4 pb-8 overflow-y-auto max-h-[45vh]">
            {/* Logo Tab */}
            {activeTab === "logo" && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="variant" className="text-base font-semibold mb-3 block text-gray-800">
                    Logo Variant
                  </Label>
                  <Select
                    value={logoConfig.variant}
                    onValueChange={(value) => onLogoConfigChange({ ...logoConfig, variant: value as any })}
                  >
                    <SelectTrigger className="h-14 text-base rounded-xl border-2 shadow-sm">
                      <SelectValue placeholder="Choose variant..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl z-[100]">
                      {logoVariants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id} className="py-4 rounded-lg">
                          <div>
                            <div className="font-semibold text-base">{variant.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{variant.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="font" className="text-base font-semibold mb-3 block text-gray-800">
                    Font Family
                  </Label>
                  <Select
                    value={logoConfig.fontFamily}
                    onValueChange={(value) => onLogoConfigChange({ ...logoConfig, fontFamily: value as any })}
                  >
                    <SelectTrigger className="h-14 text-base rounded-xl border-2 shadow-sm">
                      <SelectValue placeholder="Choose font..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl z-[100]">
                      {fontFamilies.map((font) => (
                        <SelectItem key={font.id} value={font.id} className="py-4 text-base rounded-lg">
                          <span style={{ fontFamily: font.cssFamily }}>{font.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="brandName" className="text-base font-semibold mb-3 block text-gray-800">
                    Brand Name
                  </Label>
                  <Input
                    id="brandName"
                    value={logoConfig.brandName}
                    onChange={(e) => onLogoConfigChange({ ...logoConfig, brandName: e.target.value })}
                    className="h-14 text-base rounded-xl border-2 shadow-sm"
                    placeholder="Enter brand name"
                  />
                </div>

                {logoConfig.variant.includes("strapline") && (
                  <div>
                    <Label htmlFor="strapline" className="text-base font-semibold mb-3 block text-gray-800">
                      Strapline
                    </Label>
                    <Input
                      id="strapline"
                      value={logoConfig.strapline || ""}
                      onChange={(e) => onLogoConfigChange({ ...logoConfig, strapline: e.target.value })}
                      className="h-14 text-base rounded-xl border-2 shadow-sm"
                      placeholder="Enter strapline"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === "theme" && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block text-gray-800">Choose Theme</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((theme) => {
                      const IconComponent = themeIcons[theme.id]
                      const isActive = currentTheme === theme.id

                      return (
                        <Button
                          key={theme.id}
                          onClick={() => onThemeChange(theme.id)}
                          variant={isActive ? "default" : "outline"}
                          className={`h-16 flex flex-col items-center gap-2 rounded-xl transition-all duration-200 ${
                            isActive ? "bg-gray-900 text-white" : "hover:bg-gray-50"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                          <span className="text-sm font-medium">{theme.name}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <Label className="text-base font-semibold text-gray-800">Show Grid</Label>
                    <p className="text-sm text-gray-500 mt-1">Display pixel grid overlay</p>
                  </div>
                  <Switch checked={showGrid} onCheckedChange={onToggleGrid} className="scale-125" />
                </div>

                <Button
                  onClick={onRestartAnimation}
                  className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Restart Animation
                </Button>
              </div>
            )}

            {/* Layout Tab */}
            {activeTab === "layout" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <Label className="text-base font-semibold text-gray-800">Show Keylines</Label>
                    <p className="text-sm text-gray-500 mt-1">Display layout guides</p>
                  </div>
                  <Switch
                    checked={logoConfig.showKeylines}
                    onCheckedChange={(checked) => onLogoConfigChange({ ...logoConfig, showKeylines: checked })}
                    className="scale-125"
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block text-gray-800">Logo Colors</Label>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <Label className="text-sm font-medium mb-2 block">Icon Background</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="color"
                          value={logoConfig.colors.iconBg}
                          onChange={(e) =>
                            onLogoConfigChange({
                              ...logoConfig,
                              colors: { ...logoConfig.colors, iconBg: e.target.value },
                            })
                          }
                          className="w-12 h-12 p-1 border-2 rounded-lg"
                        />
                        <Input
                          type="text"
                          value={logoConfig.colors.iconBg}
                          onChange={(e) =>
                            onLogoConfigChange({
                              ...logoConfig,
                              colors: { ...logoConfig.colors, iconBg: e.target.value },
                            })
                          }
                          className="flex-1 h-12 text-sm font-mono rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <Label className="text-sm font-medium mb-2 block">Brand Name</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="color"
                          value={logoConfig.colors.brandName}
                          onChange={(e) =>
                            onLogoConfigChange({
                              ...logoConfig,
                              colors: { ...logoConfig.colors, brandName: e.target.value },
                            })
                          }
                          className="w-12 h-12 p-1 border-2 rounded-lg"
                        />
                        <Input
                          type="text"
                          value={logoConfig.colors.brandName}
                          onChange={(e) =>
                            onLogoConfigChange({
                              ...logoConfig,
                              colors: { ...logoConfig.colors, brandName: e.target.value },
                            })
                          }
                          className="flex-1 h-12 text-sm font-mono rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Desktop version - simplified
  return (
    <div className="fixed top-4 right-4 z-[90]">
      <Card className="logo-control-card w-80 max-h-[85vh] overflow-y-auto">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Brand Control
            </CardTitle>
            <Button onClick={onToggle} variant="ghost" size="sm" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <DynaLogo config={logoConfig} width={280} height={70} />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Simplified desktop controls */}
          <div>
            <Label>Logo Variant</Label>
            <Select
              value={logoConfig.variant}
              onValueChange={(value) => onLogoConfigChange({ ...logoConfig, variant: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                {logoVariants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    {variant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Brand Name</Label>
            <Input
              value={logoConfig.brandName}
              onChange={(e) => onLogoConfigChange({ ...logoConfig, brandName: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={logoConfig.showKeylines}
              onCheckedChange={(checked) => onLogoConfigChange({ ...logoConfig, showKeylines: checked })}
            />
            <Label>Show Keylines</Label>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        :global(.logo-control-button) {
          background: rgba(255, 255, 255, 0.9) !important;
          border: 1px solid #e5e7eb !important;
          backdrop-filter: blur(8px) !important;
        }
        
        :global(.logo-control-card) {
          background: rgba(255, 255, 255, 0.98) !important;
          border: 1px solid #e5e7eb !important;
          backdrop-filter: blur(12px) !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }
      `}</style>
    </div>
  )
}
