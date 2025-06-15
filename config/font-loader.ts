/**
 * @fileoverview Font Loading System
 * @version SV001 - Loads fonts based on centralized config
 */

import { FONT_CONFIG } from "./sv-app-config"

export function generateFontLinks(): string {
  const googleFonts = FONT_CONFIG.preloadFonts
    .filter((font) => font.googleFont)
    .map((font) => {
      const weights = font.weights.join(";")
      const styles = font.styles.includes("italic") ? ":ital,wght@0," + weights + ";1," + weights : ":wght@" + weights
      return font.family.replace(" ", "+") + styles
    })
    .join("&family=")

  return `https://fonts.googleapis.com/css2?family=${googleFonts}&display=swap`
}

export function injectFontStyles(): void {
  if (typeof document === "undefined") return

  const existingLink = document.querySelector("link[data-sv-fonts]")
  if (existingLink) return // Already loaded

  const link = document.createElement("link")
  link.rel = "preload"
  link.as = "style"
  link.href = generateFontLinks()
  link.setAttribute("data-sv-fonts", "true")
  link.onload = () => {
    link.rel = "stylesheet"
  }

  document.head.appendChild(link)
}

// Font CSS Variables
export function generateFontCSSVariables(): string {
  return FONT_CONFIG.availableFonts
    .map(
      (font) => `
    --font-${font.id}: ${font.cssFamily};
  `,
    )
    .join("")
}
