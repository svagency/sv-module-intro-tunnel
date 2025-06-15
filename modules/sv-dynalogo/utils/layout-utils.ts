/**
 * @fileoverview Pixel-perfect layout calculation utilities
 * @version SV003 - Enhanced Precision Layout System
 */

import type { LogoConfig } from "../types"

export interface PrecisionLayout {
  // Container
  container: { width: number; height: number }

  // Icon area (always 100x100)
  iconBg: { x: number; y: number; width: number; height: number }
  icon: { x: number; y: number; width: number; height: number }

  // Text area with precise positioning
  brandName: {
    x: number
    y: number
    fontSize: number
    fontWeight: number
    letterSpacing: number
    textWidth: number
    maxWidth: number
  }

  strapline: {
    x: number
    y: number
    fontSize: number
    fontWeight: number
    letterSpacing: number
    textWidth: number
    maxWidth: number
  }

  // Layout constants
  iconTextGap: number
  keylineWidth: number
}

export function calculatePrecisionLayout(
  config: LogoConfig,
  containerWidth = 500,
  containerHeight = 100,
): PrecisionLayout {
  const keylineWidth = config.showKeylines ? 1 : 0
  const iconSize = 100
  const iconTextGap = 26 // Reduced from 30 for better proportion

  // Icon positioning (always 100x100, left-aligned with keyline adjustment)
  const iconBg = {
    x: keylineWidth,
    y: keylineWidth + (containerHeight - iconSize) / 2,
    width: iconSize - keylineWidth * 2,
    height: iconSize - keylineWidth * 2,
  }

  // Icon centered within background - FIXED CENTERING
  const icon = {
    x: iconBg.x + iconBg.width / 2 - 34, // Center horizontally (68px icon width / 2)
    y: iconBg.y + iconBg.height / 2 - 34, // Center vertically (68px icon height / 2)
    width: 68, // Fixed icon size
    height: 68,
  }

  // Text positioning starts after icon + gap
  const textStartX = iconBg.x + iconSize + iconTextGap
  const availableTextWidth = containerWidth - textStartX - keylineWidth * 2 - 10 // 10px right margin

  // Auto-sizing font based on text length and available space
  const calculateFontSize = (text: string, baseSize: number, maxWidth: number) => {
    const estimatedWidth = text.length * (baseSize * 0.6)
    if (estimatedWidth > maxWidth) {
      return Math.max(24, maxWidth / text.length / 0.6) // Minimum 24px
    }
    return baseSize
  }

  // Brand name sizing with auto-fit
  let baseBrandNameSize = 74.94
  if (config.variant === "font-only") {
    baseBrandNameSize = 115
  } else if (config.variant === "svg-large") {
    baseBrandNameSize = 90
  }

  const brandNameFontSize = calculateFontSize(config.brandName, baseBrandNameSize, availableTextWidth)
  const brandNameWidth = Math.min(availableTextWidth, config.brandName.length * (brandNameFontSize * 0.6))

  const brandName = {
    x: textStartX,
    y: config.variant.includes("strapline")
      ? containerHeight / 2 - 12 // Adjusted for better spacing with strapline
      : containerHeight / 2 + brandNameFontSize / 3,
    fontSize: brandNameFontSize,
    fontWeight: 700,
    letterSpacing: 0,
    textWidth: brandNameWidth,
    maxWidth: availableTextWidth,
  }

  // Strapline with improved spacing and letter spacing calculation
  const straplineFontSize = 27
  const straplineFontWeight = 700

  // Calculate letter spacing to match brand name width exactly
  const straplineBaseWidth = (config.strapline || "").length * (straplineFontSize * 0.55) // Adjusted ratio
  const straplineLetterSpacing =
    straplineBaseWidth > 0 && brandNameWidth > straplineBaseWidth
      ? (brandNameWidth - straplineBaseWidth) / Math.max(1, (config.strapline || "").length - 1)
      : 0

  const strapline = {
    x: textStartX,
    y: containerHeight / 2 + 38, // Increased spacing from brand name
    fontSize: straplineFontSize,
    fontWeight: straplineFontWeight,
    letterSpacing: straplineLetterSpacing,
    textWidth: brandNameWidth, // Match brand name width
    maxWidth: availableTextWidth,
  }

  return {
    container: { width: containerWidth, height: containerHeight },
    iconBg,
    icon,
    brandName,
    strapline,
    iconTextGap,
    keylineWidth,
  }
}

// Enhanced font metrics for precise calculations
export const fontMetrics = {
  ubuntu: {
    capHeight: 0.714,
    xHeight: 0.536,
    baseline: 0.143,
    letterWidthRatio: 0.6,
  },
  inter: {
    capHeight: 0.727,
    xHeight: 0.545,
    baseline: 0.136,
    letterWidthRatio: 0.58,
  },
  roboto: {
    capHeight: 0.71,
    xHeight: 0.528,
    baseline: 0.146,
    letterWidthRatio: 0.59,
  },
  montserrat: {
    capHeight: 0.7,
    xHeight: 0.52,
    baseline: 0.15,
    letterWidthRatio: 0.62,
  },
  poppins: {
    capHeight: 0.705,
    xHeight: 0.535,
    baseline: 0.148,
    letterWidthRatio: 0.61,
  },
}
