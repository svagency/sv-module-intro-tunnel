/**
 * @fileoverview Theme utilities for SV Tunnel Intro
 * @version SV003
 */

import type { ThemeDefinition, TunnelIntroTheme } from "../types"

export const themes: ThemeDefinition[] = [
  { id: "neo1", name: "Neo 1 - Minimal", description: "Clean white neomorphic" },
  { id: "neo2", name: "Neo 2 - Current", description: "Dark sophisticated" },
  { id: "neo3", name: "Neo 3 - Advanced", description: "Over-the-top luxury" },
  { id: "wireframe", name: "Wireframe", description: "Minimal lines only" },
  { id: "greyscale", name: "Greyscale", description: "Rich invertible greys" },
  { id: "pop", name: "Pop", description: "Bright and vibrant" },
  { id: "luxury", name: "Luxury", description: "Hyper-slick modern" },
]

export function applyTheme(themeId: TunnelIntroTheme): void {
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

  // Update data attribute for debugging
  rootElement.setAttribute("data-theme", themeId)
}
