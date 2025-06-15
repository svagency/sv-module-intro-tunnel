/**
 * @fileoverview SV DynaLogo Module - Dynamic logo generation system
 * @version SV001
 * @module sv-dynalogo
 * @status production
 * @author v0
 * @lastModified 2025-06-15
 * @license MIT
 *
 * @description
 * Complete module for dynamic logo generation with:
 * - Pixel-perfect 100x100px icon backgrounds
 * - Configurable fonts and layouts
 * - Keyline system that maintains strict sizing
 * - Multiple logo variants (font, SVG, icon-only)
 * - Floating selector panel
 */

// Main Components
export { DynaLogo } from "./components/dyna-logo"
export { LogoSelector } from "./components/logo-selector"

// Types
export type { LogoVariant, FontFamily, LogoConfig, DynaLogoProps, LogoSelectorProps } from "./types"

// Utilities
export { defaultLogoConfig, logoVariants, fontFamilies } from "./utils/logo-config"
export { calculateLogoLayout, applyKeylines } from "./utils/layout-utils"
