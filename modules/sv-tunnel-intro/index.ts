/**
 * @fileoverview SV Tunnel Intro Module - Complete tunnel animation and intro system
 * @version SV003
 * @module sv-tunnel-intro
 * @status production
 * @author v0
 * @lastModified 2025-06-14
 * @license MIT
 *
 * @description
 * Complete module for the SV tunnel intro animation system including:
 * - Tunnel animation with icon effects
 * - Intro card with theme switching
 * - Multiple design system themes
 * - Theme strip with icons
 */

// Main Components
export { TunnelIntroPage } from "./tunnel-intro-page"
export { TunnelAnimation } from "./components/tunnel-animation"
export { IntroCard } from "./components/intro-card"
export { ThemeStrip } from "./components/theme-strip"

// Icon Components
export { SvBuildIcon } from "./components/icons/sv-build-icon"
export { SvBuildLogo } from "./components/icons/sv-build-logo"

// Types
export type { TunnelIntroTheme } from "./types"

// Theme utilities
export { themes, applyTheme } from "./utils/theme-utils"
export { saveThemePreference, loadThemePreference, clearThemePreference } from "./utils/theme-storage"
