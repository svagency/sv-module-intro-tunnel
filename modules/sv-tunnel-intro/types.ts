/**
 * @fileoverview Type definitions for SV Tunnel Intro module
 * @version SV003
 */

export type TunnelIntroTheme = "neo1" | "neo2" | "neo3" | "wireframe" | "greyscale" | "pop" | "luxury"

export interface ThemeDefinition {
  id: TunnelIntroTheme
  name: string
  description: string
}

export interface StylesControllerProps {
  currentTheme: TunnelIntroTheme
  onThemeChange: (theme: TunnelIntroTheme) => void
}

export interface TunnelAnimationProps {
  theme: TunnelIntroTheme
}

export interface IntroCardProps {
  theme: TunnelIntroTheme
}
