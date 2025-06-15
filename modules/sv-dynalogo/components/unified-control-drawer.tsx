"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SVDraggablePanel } from "@/components/blocks/sv-draggable-panel"
import { DynaLogo } from "./dyna-logo"
import { Grid3X3, Palette, Type, RotateCcw, GripHorizontal } from "lucide-react"
import { THEME_CONFIG, LOGO_CONFIG, FONT_CONFIG, ICON_CONFIG } from "@/config/sv-app-config"
import type { LogoConfig } from "../types"
import type { TunnelIntroTheme } from "../../sv-tunnel-intro/types"

interface UnifiedControlDrawerProps {
  logoConfig: LogoConfig
  onLogoConfigChange: (config: LogoConfig) => void
  currentTheme: TunnelIntroTheme
  onThemeChange: (theme: TunnelIntroTheme) => void
  iconVariant: string
  onIconVariantChange: (variant: string) => void
  showGrid: boolean
  onToggleGrid: () => void
  onRestartAnimation: () => void
}

export function UnifiedControlDrawer({
  logoConfig,
  onLogoConfigChange,
  currentTheme,
  onThemeChange,
  iconVariant,
  onIconVariantChange,
  showGrid,
  onToggleGrid,
  onRestartAnimation,
}: UnifiedControlDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLogoConfigChange = (updates: Partial<LogoConfig>) => {
    onLogoConfigChange({ ...logoConfig, ...updates })
  }

  const dragHandle = (
    <div className="flex items-center justify-center w-full py-2 bg-white/90 backdrop-blur-sm rounded-t-xl border-t border-x">
      <GripHorizontal className="h-4 w-4 text-gray-400" />
    </div>
  )

  return (
    <SVDraggablePanel position="bottom" dragHandle={dragHandle} className="w-auto">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-b-xl px-4 py-2 shadow-lg border-b border-x">
          {/* Grid Toggle */}
          <Button variant={showGrid ? "default" : "ghost"} size="sm" onClick={onToggleGrid} className="rounded-full">
            <Grid3X3 className="h-4 w-4" />
          </Button>

          {/* Logo Designer Trigger */}
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Type className="h-4 w-4 mr-2" />
              Logo
            </Button>
          </SheetTrigger>

          {/* Theme Quick Selector */}
          <div className="flex items-center gap-1">
            {THEME_CONFIG.availableThemes.map((theme) => (
              <Button
                key={theme.id}
                variant={currentTheme === theme.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onThemeChange(theme.id)}
                className="rounded-full w-8 h-8 p-0 text-xs"
                title={theme.name}
              >
                {theme.icon}
              </Button>
            ))}
          </div>

          {/* Restart Animation */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRestartAnimation}
            className="rounded-full"
            title="Restart Animation"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Brand Control Center
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            <Tabs defaultValue="logo" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="logo">Logo</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
              </TabsList>

              <TabsContent value="logo" className="space-y-6">
                {/* Logo Preview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">Live Preview</h3>
                  <div className="flex justify-center">
                    <DynaLogo config={logoConfig} scale={0.8} />
                  </div>
                </div>

                {/* Logo Variant */}
                <div className="space-y-2">
                  <Label>Logo Variant</Label>
                  <Select
                    value={logoConfig.variant}
                    onValueChange={(value) => handleLogoConfigChange({ variant: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LOGO_CONFIG.availableVariants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id}>
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
                    onChange={(e) => handleLogoConfigChange({ brandName: e.target.value })}
                    placeholder="Enter brand name"
                  />
                </div>

                {/* Strapline */}
                {LOGO_CONFIG.availableVariants.find((v) => v.id === logoConfig.variant)?.hasStrapline && (
                  <div className="space-y-2">
                    <Label>Strapline</Label>
                    <Input
                      value={logoConfig.strapline}
                      onChange={(e) => handleLogoConfigChange({ strapline: e.target.value })}
                      placeholder="Enter strapline"
                    />
                  </div>
                )}

                {/* Font Family */}
                {LOGO_CONFIG.availableVariants.find((v) => v.id === logoConfig.variant)?.usesFont && (
                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select
                      value={logoConfig.fontFamily}
                      onValueChange={(value) => handleLogoConfigChange({ fontFamily: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_CONFIG.availableFonts.map((font) => (
                          <SelectItem key={font.id} value={font.id}>
                            {font.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="layout" className="space-y-6">
                {/* Show Keylines */}
                <div className="flex items-center justify-between">
                  <Label>Show Keylines</Label>
                  <Switch
                    checked={logoConfig.showKeylines}
                    onCheckedChange={(checked) => handleLogoConfigChange({ showKeylines: checked })}
                  />
                </div>

                {/* Show Grid */}
                <div className="flex items-center justify-between">
                  <Label>Show Grid</Label>
                  <Switch checked={showGrid} onCheckedChange={onToggleGrid} />
                </div>

                {/* Icon Variant */}
                <div className="space-y-2">
                  <Label>Icon Variant</Label>
                  <Select value={iconVariant} onValueChange={onIconVariantChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_CONFIG.availableVariants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id}>
                          {variant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="theme" className="space-y-6">
                {/* Theme Selection */}
                <div className="grid grid-cols-2 gap-3">
                  {THEME_CONFIG.availableThemes.map((theme) => (
                    <Button
                      key={theme.id}
                      variant={currentTheme === theme.id ? "default" : "outline"}
                      onClick={() => onThemeChange(theme.id)}
                      className="h-12 flex items-center gap-2"
                    >
                      <span className="text-lg">{theme.icon}</span>
                      {theme.name}
                    </Button>
                  ))}
                </div>

                {/* Restart Animation */}
                <Button onClick={onRestartAnimation} className="w-full" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart Animation
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </SVDraggablePanel>
  )
}
