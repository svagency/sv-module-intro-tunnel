/**
 * @fileoverview SV Brand Configuration System
 * @description Centralized brand, logo, and visual identity configuration
 */

import type { TunnelIntroTheme } from "../modules/sv-tunnel-intro/types"
import type { LogoVariant, FontFamily } from "../modules/sv-dynalogo/types"

// Brand Typography Configuration
export const SV_TYPOGRAPHY_CONFIG = {
  fontFamilies: {
    ubuntu: { name: "Ubuntu", css: "Ubuntu, sans-serif", weights: [400, 500, 700] },
    inter: { name: "Inter", css: "Inter, sans-serif", weights: [400, 500, 600, 700] },
    roboto: { name: "Roboto", css: "Roboto, sans-serif", weights: [400, 500, 700] },
    montserrat: { name: "Montserrat", css: "Montserrat, sans-serif", weights: [400, 500, 600, 700] },
    poppins: { name: "Poppins", css: "Poppins, sans-serif", weights: [400, 500, 600, 700] },
  },
  defaultFont: "ubuntu" as FontFamily,
  preloadFonts: ["ubuntu", "inter", "roboto"] as FontFamily[],
}

// Brand Logo Configuration
export const SV_LOGO_CONFIG = {
  variants: {
    "font-strapline": {
      name: "Font + Strapline",
      description: "Brand name with descriptive text below",
      hasStrapline: true,
      usesFont: true,
      sizing: { brandName: 74.94, strapline: 27 },
    },
    "font-only": {
      name: "Font Only",
      description: "Just the brand name, larger size",
      hasStrapline: false,
      usesFont: true,
      sizing: { brandName: 115, strapline: 0 },
    },
    "svg-strapline": {
      name: "SVG + Strapline",
      description: "Custom SVG text with strapline",
      hasStrapline: true,
      usesFont: false,
      sizing: { brandName: 90, strapline: 27 },
    },
    "icon-only": {
      name: "Icon Only",
      description: "Just the icon, no text",
      hasStrapline: false,
      usesFont: false,
      sizing: { brandName: 0, strapline: 0 },
    },
    "svg-large": {
      name: "SVG Large",
      description: "Large custom SVG text",
      hasStrapline: false,
      usesFont: false,
      sizing: { brandName: 115, strapline: 0 },
    },
  } as const,

  layout: {
    iconBackground: {
      size: 100, // Always 100x100px
      borderRadius: 0, // Square by default
      padding: 16, // Icon padding inside background
    },
    spacing: {
      iconToText: 30, // Gap between icon and text area
      brandToStrapline: 8, // Gap between brand name and strapline
      keylineOffset: 1, // Keyline border width
    },
    keylines: {
      enabled: false,
      width: 1,
      color: "#ff0000",
      opacity: 0.5,
      style: "dashed" as const,
    },
    responsive: {
      mobileScale: 0.8,
      tabletScale: 0.9,
      desktopScale: 1.0,
    },
  },

  defaults: {
    variant: "font-strapline" as LogoVariant,
    brandName: "BITCHAIN",
    strapline: "BITCOIN BLOCKCHAIN",
    fontFamily: "ubuntu" as FontFamily,
    showKeylines: false,
    autoFitText: true,
    letterSpacing: "auto" as const,
  },
}

// Brand Theme Configuration
export const SV_THEME_CONFIG = {
  themes: {
    "neo1-minimal": {
      name: "Neo 1 - Minimal",
      description: "Clean white neomorphic design",
      icon: "✦",
      colors: {
        primary: "#f1b01d",
        secondary: "#ffffff",
        accent: "#010101",
        background: "#ffffff",
        keyline: "#ff0000",
      },
    },
    "neo2-current": {
      name: "Neo 2 - Current",
      description: "Dark sophisticated interface",
      icon: "◆",
      colors: {
        primary: "#f1b01d",
        secondary: "#1a1a1a",
        accent: "#ffffff",
        background: "#0a0a0a",
        keyline: "#ff0000",
      },
    },
    wireframe: {
      name: "Wireframe",
      description: "Minimal lines and structure",
      icon: "▢",
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: "#666666",
        background: "#ffffff",
        keyline: "#ff0000",
      },
    },
    greyscale: {
      name: "Greyscale",
      description: "Rich invertible grey palette",
      icon: "◐",
      colors: {
        primary: "#333333",
        secondary: "#f5f5f5",
        accent: "#666666",
        background: "#ffffff",
        keyline: "#ff0000",
      },
    },
    pop: {
      name: "Pop",
      description: "Bright and vibrant colors",
      icon: "⚡",
      colors: {
        primary: "#ff6b35",
        secondary: "#4ecdc4",
        accent: "#45b7d1",
        background: "#ffffff",
        keyline: "#ff0000",
      },
    },
    luxury: {
      name: "Luxury",
      description: "Hyper-slick modern aesthetic",
      icon: "◇",
      colors: {
        primary: "#d4af37",
        secondary: "#1a1a1a",
        accent: "#ffffff",
        background: "#000000",
        keyline: "#ff0000",
      },
    },
  } as const,
  defaultTheme: "wireframe" as TunnelIntroTheme,
}

// Brand Icon Configuration
export const SV_ICON_CONFIG = {
  variants: {
    a: { name: "Hexagon", description: "Classic hexagonal shape", path: "hexagon" },
    b: { name: "Circle", description: "Simple circular design", path: "circle" },
    c: { name: "Square", description: "Clean square format", path: "square" },
    d: { name: "Diamond", description: "Diamond shaped icon", path: "diamond" },
  } as const,
  defaultVariant: "a" as const,
}

// Brand UI Configuration
export const SV_UI_CONFIG = {
  animations: {
    tunnelDuration: 3000,
    transitionDuration: 300,
    fadeInDelay: 100,
    easingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  layout: {
    maxWidth: "5xl",
    padding: 4,
    borderRadius: {
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
    },
  },
  zIndex: {
    background: 0,
    content: 10,
    controls: 50,
    modals: 100,
    dragging: 1000,
  },
  grid: {
    defaultOpacity: 0.15,
    cellSize: 20,
    color: "#cccccc",
  },
  strips: {
    backdropBlur: "sm",
    backgroundColor: "white/90",
    borderRadius: "xl",
    shadow: "lg",
    padding: { x: 4, y: 2 },
  },
}

// Consolidated Brand Configuration Export
export const SV_BRAND_CONFIG = {
  typography: SV_TYPOGRAPHY_CONFIG,
  logo: SV_LOGO_CONFIG,
  theme: SV_THEME_CONFIG,
  icon: SV_ICON_CONFIG,
  ui: SV_UI_CONFIG,
} as const

// Default Application State
export const SV_DEFAULT_STATE = {
  theme: SV_THEME_CONFIG.defaultTheme,
  font: SV_TYPOGRAPHY_CONFIG.defaultFont,
  logoVariant: SV_LOGO_CONFIG.defaults.variant,
  iconVariant: SV_ICON_CONFIG.defaultVariant,
  brandName: SV_LOGO_CONFIG.defaults.brandName,
  strapline: SV_LOGO_CONFIG.defaults.strapline,
  showGrid: false,
  showKeylines: SV_LOGO_CONFIG.defaults.showKeylines,
  tunnelDuration: SV_UI_CONFIG.animations.tunnelDuration,
} as const

export default SV_BRAND_CONFIG
