"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { X, Palette, Type, Settings, Maximize2, Minimize2 } from "lucide-react"
import { DynaLogo } from "./dyna-logo"
import { logoVariants, fontFamilies } from "../utils/logo-config"
import { useIsMobile } from "@/components/ui/use-mobile"
import type { LogoSelectorProps } from "../types"

export const LogoSelector: React.FC<LogoSelectorProps> = ({ currentConfig, onConfigChange, isOpen, onToggle }) => {
  const [activeTab, setActiveTab] = useState<"layout" | "colors" | "text">("layout")
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(true)
  const [fontSize, setFontSize] = useState(75)
  const isMobile = useIsMobile()

  if (!isOpen) {
    return (
      <div className={`fixed z-[100] ${isMobile ? "bottom-4 right-4" : "top-4 right-20"}`}>
        <Button
          onClick={onToggle}
          className="logo-selector-button bg-white/90 hover:bg-white border border-gray-200 shadow-lg backdrop-blur-sm"
          size={isMobile ? "default" : "sm"}
        >
          <Palette className={`${isMobile ? "h-5 w-5" : "h-4 w-4"} text-gray-600`} />
          <span className="text-gray-800 ml-2">Logos</span>
        </Button>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
        <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl max-h-[95vh] overflow-hidden shadow-2xl">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10 rounded-t-3xl">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <Palette className="h-6 w-6 text-blue-600" />
              Logo Designer
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
              className={`transition-all duration-300 bg-white rounded-xl p-3 shadow-sm ${isPreviewExpanded ? "h-auto" : "h-16 overflow-hidden"}`}
            >
              <DynaLogo
                config={currentConfig}
                width={isPreviewExpanded ? 340 : 300}
                height={isPreviewExpanded ? 85 : 60}
              />
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="flex bg-gray-100 mx-4 mt-4 rounded-xl p-1 shadow-inner">
            <Button
              variant={activeTab === "layout" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("layout")}
              className="flex-1 h-11 rounded-lg font-medium"
            >
              <Settings className="h-4 w-4 mr-2" />
              Layout
            </Button>
            <Button
              variant={activeTab === "text" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("text")}
              className="flex-1 h-11 rounded-lg font-medium"
            >
              <Type className="h-4 w-4 mr-2" />
              Text
            </Button>
            <Button
              variant={activeTab === "colors" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("colors")}
              className="flex-1 h-11 rounded-lg font-medium"
            >
              <Palette className="h-4 w-4 mr-2" />
              Colors
            </Button>
          </div>

          {/* Mobile Content */}
          <div className="p-4 pb-8 overflow-y-auto max-h-[50vh]">
            {/* Layout Tab */}
            {activeTab === "layout" && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="variant" className="text-base font-semibold mb-3 block text-gray-800">
                    Logo Variant
                  </Label>
                  <Select
                    value={currentConfig.variant}
                    onValueChange={(value) => onConfigChange({ ...currentConfig, variant: value as any })}
                  >
                    <SelectTrigger className="h-14 text-base rounded-xl border-2 shadow-sm">
                      <SelectValue placeholder="Choose variant..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
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

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <Label htmlFor="keylines" className="text-base font-semibold text-gray-800">
                      Show Keylines
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Display layout guides</p>
                  </div>
                  <Switch
                    id="keylines"
                    checked={currentConfig.showKeylines}
                    onCheckedChange={(checked) => onConfigChange({ ...currentConfig, showKeylines: checked })}
                    className="scale-125"
                  />
                </div>
              </div>
            )}

            {/* Text Tab */}
            {activeTab === "text" && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="font" className="text-base font-semibold mb-3 block text-gray-800">
                    Font Family
                  </Label>
                  <Select
                    value={currentConfig.fontFamily}
                    onValueChange={(value) => onConfigChange({ ...currentConfig, fontFamily: value as any })}
                  >
                    <SelectTrigger className="h-14 text-base rounded-xl border-2 shadow-sm">
                      <SelectValue placeholder="Choose font..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
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
                    value={currentConfig.brandName}
                    onChange={(e) => onConfigChange({ ...currentConfig, brandName: e.target.value })}
                    className="h-14 text-base rounded-xl border-2 shadow-sm"
                    placeholder="Enter brand name"
                  />
                </div>

                {currentConfig.variant.includes("strapline") && (
                  <div>
                    <Label htmlFor="strapline" className="text-base font-semibold mb-3 block text-gray-800">
                      Strapline
                    </Label>
                    <Input
                      id="strapline"
                      value={currentConfig.strapline || ""}
                      onChange={(e) => onConfigChange({ ...currentConfig, strapline: e.target.value })}
                      className="h-14 text-base rounded-xl border-2 shadow-sm"
                      placeholder="Enter strapline"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="fontSize" className="text-base font-semibold mb-3 block text-gray-800">
                    Font Size: {fontSize}px
                  </Label>
                  <Slider
                    id="fontSize"
                    min={24}
                    max={120}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>24px</span>
                    <span>Auto-fit enabled</span>
                    <span>120px</span>
                  </div>
                </div>
              </div>
            )}

            {/* Colors Tab */}
            {activeTab === "colors" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <Label htmlFor="iconBg" className="text-base font-semibold mb-3 block text-gray-800">
                      Icon Background
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="iconBg"
                        type="color"
                        value={currentConfig.colors.iconBg}
                        onChange={(e) =>
                          onConfigChange({
                            ...currentConfig,
                            colors: { ...currentConfig.colors, iconBg: e.target.value },
                          })
                        }
                        className="w-16 h-14 p-1 border-2 rounded-xl"
                      />
                      <Input
                        type="text"
                        value={currentConfig.colors.iconBg}
                        onChange={(e) =>
                          onConfigChange({
                            ...currentConfig,
                            colors: { ...currentConfig.colors, iconBg: e.target.value },
                          })
                        }
                        className="flex-1 h-14 text-base font-mono rounded-xl border-2"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <Label htmlFor="iconFg" className="text-base font-semibold mb-3 block text-gray-800">
                      Icon Color
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="iconFg"
                        type="color"
                        value={currentConfig.colors.iconFg}
                        onChange={(e) =>
                          onConfigChange({
                            ...currentConfig,
                            colors: { ...currentConfig.colors, iconFg: e.target.value },
                          })
                        }
                        className="w-16 h-14 p-1 border-2 rounded-xl"
                      />
                      <Input
                        type="text"
                        value={currentConfig.colors.iconFg}
                        onChange={(e) =>
                          onConfigChange({
                            ...currentConfig,
                            colors: { ...currentConfig.colors, iconFg: e.target.value },
                          })
                        }
                        className="flex-1 h-14 text-base font-mono rounded-xl border-2"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <Label htmlFor="brandNameColor" className="text-base font-semibold mb-3 block text-gray-800">
                      Brand Name
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="brandNameColor"
                        type="color"
                        value={currentConfig.colors.brandName}
                        onChange={(e) =>
                          onConfigChange({
                            ...currentConfig,
                            colors: { ...currentConfig.colors, brandName: e.target.value },
                          })
                        }
                        className="w-16 h-14 p-1 border-2 rounded-xl"
                      />
                      <Input
                        type="text"
                        value={currentConfig.colors.brandName}
                        onChange={(e) =>
                          onConfigChange({
                            ...currentConfig,
                            colors: { ...currentConfig.colors, brandName: e.target.value },
                          })
                        }
                        className="flex-1 h-14 text-base font-mono rounded-xl border-2"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <Label htmlFor="straplineColor" className="text-base font-semibold mb-3 block text-gray-800">
                      Strapline
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="straplineColor"
                        type="color"
                        value={currentConfig.colors.strapline}
                        onChange={(e) =>
                          onConfigChange({
                            ...currentConfig,
                            colors: { ...currentConfig.colors, strapline: e.target.value },
                          })
                        }
                        className="w-16 h-14 p-1 border-2 rounded-xl"
                      />
                      <Input
                        type="text"
                        value={currentConfig.colors.strapline}
                        onChange={(e) =>
                          onConfigChange({
                            ...currentConfig,
                            colors: { ...currentConfig.colors, strapline: e.target.value },
                          })
                        }
                        className="flex-1 h-14 text-base font-mono rounded-xl border-2"
                      />
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

  // Desktop version remains the same...
  return (
    <div className="fixed top-4 right-20 z-[100]">
      <Card className="logo-selector-card w-96 max-h-[80vh] overflow-y-auto">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Logo Designer
            </CardTitle>
            <Button onClick={onToggle} variant="ghost" size="sm" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <DynaLogo config={currentConfig} width={300} height={75} />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            <Button
              variant={activeTab === "layout" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("layout")}
              className="flex-1"
            >
              <Settings className="h-3 w-3 mr-1" />
              Layout
            </Button>
            <Button
              variant={activeTab === "text" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("text")}
              className="flex-1"
            >
              <Type className="h-3 w-3 mr-1" />
              Text
            </Button>
            <Button
              variant={activeTab === "colors" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("colors")}
              className="flex-1"
            >
              <Palette className="h-3 w-3 mr-1" />
              Colors
            </Button>
          </div>

          {activeTab === "layout" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="variant">Logo Variant</Label>
                <Select
                  value={currentConfig.variant}
                  onValueChange={(value) => onConfigChange({ ...currentConfig, variant: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {logoVariants.map((variant) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        <div>
                          <div className="font-medium">{variant.name}</div>
                          <div className="text-xs text-gray-500">{variant.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="keylines"
                  checked={currentConfig.showKeylines}
                  onCheckedChange={(checked) => onConfigChange({ ...currentConfig, showKeylines: checked })}
                />
                <Label htmlFor="keylines">Show Keylines</Label>
              </div>
            </div>
          )}

          {activeTab === "text" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="font">Font Family</Label>
                <Select
                  value={currentConfig.fontFamily}
                  onValueChange={(value) => onConfigChange({ ...currentConfig, fontFamily: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontFamilies.map((font) => (
                      <SelectItem key={font.id} value={font.id}>
                        {font.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  value={currentConfig.brandName}
                  onChange={(e) => onConfigChange({ ...currentConfig, brandName: e.target.value })}
                />
              </div>

              {currentConfig.variant.includes("strapline") && (
                <div>
                  <Label htmlFor="strapline">Strapline</Label>
                  <Input
                    id="strapline"
                    value={currentConfig.strapline || ""}
                    onChange={(e) => onConfigChange({ ...currentConfig, strapline: e.target.value })}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === "colors" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="iconBg">Icon Background</Label>
                  <Input
                    id="iconBg"
                    type="color"
                    value={currentConfig.colors.iconBg}
                    onChange={(e) =>
                      onConfigChange({
                        ...currentConfig,
                        colors: { ...currentConfig.colors, iconBg: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="iconFg">Icon Color</Label>
                  <Input
                    id="iconFg"
                    type="color"
                    value={currentConfig.colors.iconFg}
                    onChange={(e) =>
                      onConfigChange({
                        ...currentConfig,
                        colors: { ...currentConfig.colors, iconFg: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    type="color"
                    value={currentConfig.colors.brandName}
                    onChange={(e) =>
                      onConfigChange({
                        ...currentConfig,
                        colors: { ...currentConfig.colors, brandName: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="strapline">Strapline</Label>
                  <Input
                    id="strapline"
                    type="color"
                    value={currentConfig.colors.strapline}
                    onChange={(e) =>
                      onConfigChange({
                        ...currentConfig,
                        colors: { ...currentConfig.colors, strapline: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="keylines">Keylines</Label>
                  <Input
                    id="keylines"
                    type="color"
                    value={currentConfig.colors.keylines}
                    onChange={(e) =>
                      onConfigChange({
                        ...currentConfig,
                        colors: { ...currentConfig.colors, keylines: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx>{`
        :global(.logo-selector-button) {
          background: rgba(255, 255, 255, 0.9) !important;
          border: 1px solid #e5e7eb !important;
          backdrop-filter: blur(8px) !important;
        }
        
        :global(.logo-selector-card) {
          background: rgba(255, 255, 255, 0.98) !important;
          border: 1px solid #e5e7eb !important;
          backdrop-filter: blur(12px) !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }
      `}</style>
    </div>
  )
}
