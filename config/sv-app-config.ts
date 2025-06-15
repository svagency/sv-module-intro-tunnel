/**
 * @fileoverview Centralized SV App Configuration
 * @version SV001 - Master config for fonts, themes, logos, icons
 */

import type { TunnelIntroTheme } from "../modules/sv-tunnel-intro/types"
import type { LogoVariant, FontFamily } from "../modules/sv-dynalogo/types"

// Font Configuration - Controls what fonts are loaded and available
export const FONT_CONFIG = {
  // Fonts to preload in the app
  preloadFonts: [
    {
      family: "Ubuntu",
      weights: [400, 500, 700],
      styles: ["normal", "italic"],
      display: "swap",
      googleFont: true,
    },
    {
      family: "Inter",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      display: "swap",
      googleFont: true,
    },
    {
      family: "Roboto",
      weights: [400, 500, 700],
      styles: ["normal"],
      display: "swap",
      googleFont: true,
    },
    {
      family: "Montserrat",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      display: "swap",
      googleFont: true,
    },
    {
      family: "Poppins",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      display: "swap",
      googleFont: true,
    },
  ],
  // Available font families for selection
  availableFonts: [
    { id: "ubuntu", name: "Ubuntu", cssFamily: "Ubuntu, sans-serif" },
    { id: "inter", name: "Inter", cssFamily: "Inter, sans-serif" },
    { id: "roboto", name: "Roboto", cssFamily: "Roboto, sans-serif" },
    { id: "montserrat", name: "Montserrat", cssFamily: "Montserrat, sans-serif" },
    { id: "poppins", name: "Poppins", cssFamily: "Poppins, sans-serif" },
  ],
  // Default font
  defaultFont: "ubuntu" as FontFamily,
}

// Theme Configuration
export const THEME_CONFIG = {
  availableThemes: [
    {
      id: "neo1" as TunnelIntroTheme,
      name: "Neo 1 - Minimal",
      description: "Clean white neomorphic",
      icon: "✦",
      colors: {
        primary: "#f1b01d",
        secondary: "#ffffff",
        accent: "#010101",
        background: "#ffffff",
      },
    },
    {
      id: "neo2" as TunnelIntroTheme,
      name: "Neo 2 - Current",
      description: "Dark sophisticated",
      icon: "◆",
      colors: {
        primary: "#f1b01d",
        secondary: "#1a1a1a",
        accent: "#ffffff",
        background: "#0a0a0a",
      },
    },
    {
      id: "wireframe" as TunnelIntroTheme,
      name: "Wireframe",
      description: "Minimal lines only",
      icon: "▢",
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: "#666666",
        background: "#ffffff",
      },
    },
    {
      id: "greyscale" as TunnelIntroTheme,
      name: "Greyscale",
      description: "Rich invertible greys",
      icon: "◐",
      colors: {
        primary: "#333333",
        secondary: "#f5f5f5",
        accent: "#666666",
        background: "#ffffff",
      },
    },
    {
      id: "pop" as TunnelIntroTheme,
      name: "Pop",
      description: "Bright and vibrant",
      icon: "⚡",
      colors: {
        primary: "#ff6b35",
        secondary: "#4ecdc4",
        accent: "#45b7d1",
        background: "#ffffff",
      },
    },
    {
      id: "luxury" as TunnelIntroTheme,
      name: "Luxury",
      description: "Hyper-slick modern",
      icon: "◇",
      colors: {
        primary: "#d4af37",
        secondary: "#1a1a1a",
        accent: "#ffffff",
        background: "#000000",
      },
    },
  ],
  defaultTheme: "wireframe" as TunnelIntroTheme,
}

// Logo Configuration
export const LOGO_CONFIG = {
  availableVariants: [
    {
      id: "font-strapline" as LogoVariant,
      name: "Font + Strapline",
      description: "Brand name with descriptive text below",
      hasStrapline: true,
      usesFont: true,
    },
    {
      id: "font-only" as LogoVariant,
      name: "Font Only",
      description: "Just the brand name, larger size",
      hasStrapline: false,
      usesFont: true,
    },
    {
      id: "svg-strapline" as LogoVariant,
      name: "SVG + Strapline",
      description: "Custom SVG text with strapline",
      hasStrapline: true,
      usesFont: false,
    },
    {
      id: "icon-only" as LogoVariant,
      name: "Icon Only",
      description: "Just the icon, no text",
      hasStrapline: false,
      usesFont: false,
    },
    {
      id: "svg-large" as LogoVariant,
      name: "SVG Large",
      description: "Large custom SVG text",
      hasStrapline: false,
      usesFont: false,
    },
  ],
  defaultVariant: "font-strapline" as LogoVariant,
  defaultBrandName: "BITCHAIN",
  defaultStrapline: "BITCOIN BLOCKCHAIN",
  // Logo sizing parameters
  sizing: {
    iconBgSize: 100, // Always 100x100px
    iconPadding: 16, // Padding inside icon background
    textGap: 30, // Gap between icon and text
    fontSizes: {
      brandName: 74.94,
      strapline: 27,
      fontOnly: 115,
      svgLarge: 90,
    },
    keylineWidth: 1,
  },
}

// Icon Configuration
export const ICON_CONFIG = {
  availableVariants: [
    { id: "a", name: "Hexagon", description: "Classic hexagonal shape" },
    { id: "b", name: "Circle", description: "Simple circular design" },
    { id: "c", name: "Square", description: "Clean square format" },
    { id: "d", name: "Diamond", description: "Diamond shaped icon" },
  ],
  defaultVariant: "a",
}

// UI Configuration
export const UI_CONFIG = {
  animations: {
    tunnelDuration: 3000,
    transitionDuration: 300,
    fadeInDelay: 100,
  },
  layout: {
    maxWidth: "5xl", // max-w-5xl
    padding: 4, // p-4
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
  },
  grid: {
    defaultOpacity: 0.15,
    cellSize: 20,
  },
}

// Default Application State
export const DEFAULT_APP_CONFIG = {
  theme: THEME_CONFIG.defaultTheme,
  font: FONT_CONFIG.defaultFont,
  logoVariant: LOGO_CONFIG.defaultVariant,
  iconVariant: ICON_CONFIG.defaultVariant,
  brandName: LOGO_CONFIG.defaultBrandName,
  strapline: LOGO_CONFIG.defaultStrapline,
  showGrid: false,
  showKeylines: false,
  tunnelDuration: UI_CONFIG.animations.tunnelDuration,
}

// Export all configs
export {
  FONT_CONFIG as fonts,
  THEME_CONFIG as themes,
  LOGO_CONFIG as logos,
  ICON_CONFIG as icons,
  UI_CONFIG as ui,
  DEFAULT_APP_CONFIG as defaults,
}
