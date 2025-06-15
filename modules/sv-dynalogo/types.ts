/**
 * @fileoverview Type definitions for SV DynaLogo module
 * @version SV001
 */

import type { TunnelIntroTheme } from "../sv-tunnel-intro/types"

export type LogoVariant = "font-strapline" | "font-only" | "svg-strapline" | "icon-only" | "svg-large"

export type FontFamily = "ubuntu" | "inter" | "roboto" | "montserrat" | "poppins"

export interface LogoConfig {
  variant: LogoVariant
  fontFamily: FontFamily
  brandName: string
  strapline?: string
  iconVariant: string
  showKeylines: boolean
  colors: {
    iconBg: string
    iconFg: string
    brandName: string
    strapline: string
    logoBg: string
    keylines: string
  }
}

export interface DynaLogoProps {
  config: LogoConfig
  width?: number
  height?: number
  className?: string
}

export interface LogoSelectorProps {
  currentConfig: LogoConfig
  onConfigChange: (config: LogoConfig) => void
  isOpen: boolean
  onToggle: () => void
}

export interface LogoControlPanelProps {
  logoConfig: LogoConfig
  onLogoConfigChange: (config: LogoConfig) => void
  isOpen: boolean
  onToggle: () => void
  currentTheme: TunnelIntroTheme
  onThemeChange: (theme: TunnelIntroTheme) => void
  iconVariant: string
  onIconVariantChange: (variant: string) => void
  showGrid: boolean
  onToggleGrid: () => void
  onRestartAnimation: () => void
}
