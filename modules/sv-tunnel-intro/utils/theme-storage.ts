/**
 * @fileoverview Theme storage utilities for persisting user preferences
 * @version SV003
 */

import type { TunnelIntroTheme } from "../types"

const THEME_STORAGE_KEY = "sv-tunnel-intro-theme"

export function saveThemePreference(theme: TunnelIntroTheme): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch (error) {
      console.warn("Failed to save theme preference:", error)
    }
  }
}

export function loadThemePreference(): TunnelIntroTheme | null {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      return saved as TunnelIntroTheme | null
    } catch (error) {
      console.warn("Failed to load theme preference:", error)
    }
  }
  return null
}

export function clearThemePreference(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(THEME_STORAGE_KEY)
    } catch (error) {
      console.warn("Failed to clear theme preference:", error)
    }
  }
}
