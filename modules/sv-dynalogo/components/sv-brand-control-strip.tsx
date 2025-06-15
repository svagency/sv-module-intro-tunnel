"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SVDraggableStrip } from "@/components/blocks/sv-draggable-strip"
import { DynaLogo } from "./dyna-logo"
import { Grid3X3, Palette, Type, RotateCcw, Settings, Eye, EyeOff } from "lucide-react"
import { SV_BRAND_CONFIG } from "@/config/sv-brand-config"
import type { LogoConfig } from "../types"
import type { TunnelIntroTheme } from "../../sv-tunnel-intro/types"

interface SVBrandControlStripProps {
  logoConfig: LogoConfig
  onLogoConfigChange: (config: LogoConfig) => void
  currentTheme: TunnelIntroTheme
  onThemeChange: (theme: TunnelIntroTheme) => void
  iconVariant: string
  onIconVariantChange: (variant: string) => void
  showGrid: boolean
  onToggleGrid: () => void
  onRestartAnimation: () => void
  isMinimized?: boolean
  onToggleMinimize?: () => void
}

export function SVBrandControlStrip({
  logoConfig,
  onLogoConfigChange,
  currentTheme,
  onThemeChange,
  iconVariant,
  onIconVariantChange,
  showGrid,
  onToggleGrid,
  onRestartAnimation,
  isMinimized = false,
  onToggleMinimize,
}: SVBrandControlStripProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleLogoConfigUpdate = (updates: Partial<LogoConfig>) => {
    onLogoConfigChange({ ...logoConfig, ...updates })
  }

  const stripContent = (
    <div className="flex items-center gap-2 px-4 py-2">
      {/* Grid Toggle */}
      <Button
        variant={showGrid ? "default" : "ghost"}
        size="sm"
        onClick={onToggleGrid}
        className="rounded-full"
        title="Toggle Grid"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>

      {/* Brand Designer Trigger */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Type className="h-4 w-4 mr-1" />
            {!isMinimized && "Brand"}
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              SV Brand Control Center
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            <Tabs defaultValue="logo" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="logo">Logo</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="logo" className="space-y-6">
                {/* Live Preview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Live Preview</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLogoConfigUpdate({ showKeylines: !logoConfig.showKeylines })}
                    >
                      {logoConfig.showKeylines ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      Keylines
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <DynaLogo config={logoConfig} scale={0.7} />
                  </div>
                </div>

                {/* Logo Variant */}
                <div className="space-y-2">
                  <Label>Logo Variant</Label>
                  <Select
                    value={logoConfig.variant}
                    onValueChange={(value) => handleLogoConfigUpdate({ variant: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SV_BRAND_CONFIG.logo.variants).map(([key, variant]) => (
                        <SelectItem key={key} value={key}>
                          {variant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand Name */}
                <div className="space-y-2">
                  <Label>Brand Name</Label>
                  <Input
                    value={logoConfig.brandName}
                    onChange={(e) => handleLogoConfigUpdate({ brandName: e.target.value })}
                    placeholder="Enter brand name"
                  />
                </div>

                {/* Strapline */}
                {SV_BRAND_CONFIG.logo.variants[logoConfig.variant as keyof typeof SV_BRAND_CONFIG.logo.variants]
                  ?.hasStrapline && (
                  <div className="space-y-2">
                    <Label>Strapline</Label>
                    <Input
                      value={logoConfig.strapline}
                      onChange={(e) => handleLogoConfigUpdate({ strapline: e.target.value })}
                      placeholder="Enter strapline"
                    />
                  </div>
                )}

                {/* Font Family */}
                {SV_BRAND_CONFIG.logo.variants[logoConfig.variant as keyof typeof SV_BRAND_CONFIG.logo.variants]
                  ?.usesFont && (
                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select
                      value={logoConfig.fontFamily}
                      onValueChange={(value) => handleLogoConfigUpdate({ fontFamily: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(SV_BRAND_CONFIG.typography.fontFamilies).map(([key, font]) => (
                          <SelectItem key={key} value={key}>
                            {font.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="layout" className="space-y-6">
                {/* Keylines & Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Show Keylines</Label>
                    <Switch
                      checked={logoConfig.showKeylines}
                      onCheckedChange={(checked) => handleLogoConfigUpdate({ showKeylines: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show Grid</Label>
                    <Switch checked={showGrid} onCheckedChange={onToggleGrid} />
                  </div>
                </div>

                {/* Icon Variant */}
                <div className="space-y-2">
                  <Label>Icon Variant</Label>
                  <Select value={iconVariant} onValueChange={onIconVariantChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SV_BRAND_CONFIG.icon.variants).map(([key, variant]) => (
                        <SelectItem key={key} value={key}>
                          {variant.name} - {variant.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Size */}
                <div className="space-y-2">
                  <Label>Font Size: {logoConfig.fontSize}px</Label>
                  <Slider
                    value={[logoConfig.fontSize]}
                    onValueChange={([value]) => handleLogoConfigUpdate({ fontSize: value })}
                    min={24}
                    max={120}
                    step={2}
                  />
                </div>

                {/* Icon Padding */}
                <div className="space-y-2">
                  <Label>
                    Icon Padding: {logoConfig.iconPadding || SV_BRAND_CONFIG.logo.layout.iconBackground.padding}px
                  </Label>
                  <Slider
                    value={[logoConfig.iconPadding || SV_BRAND_CONFIG.logo.layout.iconBackground.padding]}
                    onValueChange={([value]) => handleLogoConfigUpdate({ iconPadding: value })}
                    min={8}
                    max={32}
                    step={2}
                  />
                </div>

                {/* Text Gap */}
                <div className="space-y-2">
                  <Label>Text Gap: {logoConfig.textGap || SV_BRAND_CONFIG.logo.layout.spacing.iconToText}px</Label>
                  <Slider
                    value={[logoConfig.textGap || SV_BRAND_CONFIG.logo.layout.spacing.iconToText]}
                    onValueChange={([value]) => handleLogoConfigUpdate({ textGap: value })}
                    min={16}
                    max={60}
                    step={2}
                  />
                </div>
              </TabsContent>

              <TabsContent value="theme" className="space-y-6">
                {/* Theme Selection */}
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(SV_BRAND_CONFIG.theme.themes).map(([key, theme]) => (
                    <Button
                      key={key}
                      variant={currentTheme === key ? "default" : "outline"}
                      onClick={() => onThemeChange(key as TunnelIntroTheme)}
                      className="h-12 flex items-center gap-2"
                    >
                      <span className="text-lg">{theme.icon}</span>
                      <div className="text-left">
                        <div className="font-medium">{theme.name}</div>
                        <div className="text-xs opacity-70">{theme.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Animation Control */}
                <Button onClick={onRestartAnimation} className="w-full" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart Animation
                </Button>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                {/* Letter Spacing */}
                <div className="space-y-2">
                  <Label>Letter Spacing: {logoConfig.letterSpacing || 0}em</Label>
                  <Slider
                    value={[logoConfig.letterSpacing || 0]}
                    onValueChange={([value]) => handleLogoConfigUpdate({ letterSpacing: value })}
                    min={-0.1}
                    max={0.5}
                    step={0.01}
                  />
                </div>

                {/* Auto Fit Text */}
                <div className="flex items-center justify-between">
                  <Label>Auto Fit Text</Label>
                  <Switch
                    checked={logoConfig.autoFitText ?? true}
                    onCheckedChange={(checked) => handleLogoConfigUpdate({ autoFitText: checked })}
                  />
                </div>

                {/* Responsive Scale */}
                <div className="space-y-2">
                  <Label>
                    Mobile Scale: {logoConfig.mobileScale || SV_BRAND_CONFIG.logo.layout.responsive.mobileScale}
                  </Label>
                  <Slider
                    value={[logoConfig.mobileScale || SV_BRAND_CONFIG.logo.layout.responsive.mobileScale]}
                    onValueChange={([value]) => handleLogoConfigUpdate({ mobileScale: value })}
                    min={0.5}
                    max={1.0}
                    step={0.05}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {/* Theme Quick Selector */}
      {!isMinimized && (
        <div className="flex items-center gap-1">
          {Object.entries(SV_BRAND_CONFIG.theme.themes).map(([key, theme]) => (
            <Button
              key={key}
              variant={currentTheme === key ? "default" : "ghost"}
              size="sm"
              onClick={() => onThemeChange(key as TunnelIntroTheme)}
              className="rounded-full w-8 h-8 p-0 text-xs"
              title={theme.name}
            >
              {theme.icon}
            </Button>
          ))}
        </div>
      )}

      {/* Restart Animation */}
      <Button variant="ghost" size="sm" onClick={onRestartAnimation} className="rounded-full" title="Restart Animation">
        <RotateCcw className="h-4 w-4" />
      </Button>

      {/* Settings */}
      <Button variant="ghost" size="sm" onClick={onToggleMinimize} className="rounded-full" title="Toggle Minimize">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <SVDraggableStrip
      position="bottom"
      isMinimized={isMinimized}
      onToggleMinimize={onToggleMinimize}
      className="select-none"
    >
      {stripContent}
    </SVDraggableStrip>
  )
}
