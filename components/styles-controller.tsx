"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, ChevronDown, ChevronUp } from "lucide-react"

interface StylesControllerProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
}

const themes = [
  { id: "neo1", name: "Neo 1 - Minimal", description: "Clean white neomorphic" },
  { id: "neo2", name: "Neo 2 - Current", description: "Dark sophisticated" },
  { id: "neo3", name: "Neo 3 - Advanced", description: "Over-the-top luxury" },
  { id: "wireframe", name: "Wireframe", description: "Minimal lines only" },
  { id: "greyscale", name: "Greyscale", description: "Rich invertible greys" },
  { id: "pop", name: "Pop", description: "Bright and vibrant" },
  { id: "luxury", name: "Luxury", description: "Hyper-slick modern" },
]

export function StylesController({ currentTheme, onThemeChange }: StylesControllerProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [localTheme, setLocalTheme] = useState(currentTheme)

  // Sync with parent theme changes
  useEffect(() => {
    setLocalTheme(currentTheme)
  }, [currentTheme])

  const handleThemeChange = (themeId: string) => {
    console.log("StylesController: Changing theme from", localTheme, "to", themeId)

    // Update local state immediately
    setLocalTheme(themeId)

    // Call parent callback
    onThemeChange(themeId)

    // Force immediate DOM update
    const rootElement = document.documentElement
    const bodyElement = document.body

    // Remove all existing theme classes
    const existingClasses = Array.from(rootElement.classList).filter((cls) => cls.startsWith("theme-"))
    existingClasses.forEach((cls) => {
      rootElement.classList.remove(cls)
      bodyElement.classList.remove(cls)
    })

    // Add new theme class
    const newThemeClass = `theme-${themeId}`
    rootElement.classList.add(newThemeClass)
    bodyElement.classList.add(newThemeClass)

    // Also update data attribute for debugging
    rootElement.setAttribute("data-theme", themeId)

    console.log("StylesController: Applied classes", newThemeClass, "to html and body")
  }

  return (
    <div className="fixed top-4 right-4 z-[100]" style={{ animation: "fadeIn 500ms ease-out forwards" }}>
      {/* Fixed styling that doesn't change with themes */}
      <Card className="fixed-dropdown-card shadow-lg min-w-[200px]">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="h-4 w-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-800">Styles</span>
            <span className="text-xs text-slate-500">({localTheme})</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6 p-0 ml-auto text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            >
              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          </div>

          {isExpanded && (
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {themes.map((theme) => (
                <Button
                  key={theme.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full justify-start text-xs h-auto p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 ${
                    localTheme === theme.id ? "bg-slate-800 text-white hover:bg-slate-700 hover:text-white" : ""
                  }`}
                >
                  <div className="text-left w-full">
                    <div className="font-medium">
                      {theme.name} {localTheme === theme.id && "✓"}
                    </div>
                    <div className="text-xs opacity-70 mt-0.5">{theme.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Fixed dropdown styles that override theme styles */
        :global(.fixed-dropdown-card) {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
          color: #1e293b !important;
          backdrop-filter: blur(8px) !important;
          border-radius: 0.75rem !important;
        }

        /* Ensure dropdown content doesn't inherit theme colors */
        :global(.fixed-dropdown-card *) {
          transition: all 0.2s ease !important;
        }

        /* Override any theme-specific button styles */
        :global(.fixed-dropdown-card button) {
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  )
}
