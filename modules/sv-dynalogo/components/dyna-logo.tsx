"use client"
import type React from "react"
import { SvBuildIcon } from "../../sv-tunnel-intro/components/icons/sv-build-icon"
import { calculatePrecisionLayout } from "../utils/layout-utils"
import { fontFamilies } from "../utils/logo-config"
import type { DynaLogoProps } from "../types"

export const DynaLogo: React.FC<DynaLogoProps> = ({ config, width = 500, height = 100, className = "" }) => {
  const layout = calculatePrecisionLayout(config, width, height)
  const fontFamily = fontFamilies.find((f) => f.id === config.fontFamily)?.cssFamily || "Ubuntu, sans-serif"

  const renderBrandName = () => {
    if (config.variant === "icon-only") return null

    const hasStroke = config.variant === "font-strapline" && config.brandName === "BITCHAIN"

    return (
      <g id="brand-name">
        {/* Background text (for stroke effect) */}
        {hasStroke && (
          <text
            x={layout.brandName.x}
            y={layout.brandName.y}
            fontSize={layout.brandName.fontSize}
            fontFamily={fontFamily}
            fontWeight={layout.brandName.fontWeight}
            letterSpacing={`${layout.brandName.letterSpacing}px`}
            fill={config.colors.brandName}
            dominantBaseline="central"
            textAnchor="start"
          >
            {config.brandName}
          </text>
        )}

        {/* Stroke text (for outline effect) */}
        {hasStroke && (
          <text
            x={layout.brandName.x}
            y={layout.brandName.y}
            fontSize={layout.brandName.fontSize}
            fontFamily={fontFamily}
            fontWeight={layout.brandName.fontWeight}
            letterSpacing={`${layout.brandName.letterSpacing}px`}
            fill="none"
            stroke={config.colors.strapline}
            strokeWidth="1"
            strokeMiterlimit="10"
            dominantBaseline="central"
            textAnchor="start"
          >
            {config.brandName}
          </text>
        )}

        {/* Regular text (no stroke) */}
        {!hasStroke && (
          <text
            x={layout.brandName.x}
            y={layout.brandName.y}
            fontSize={layout.brandName.fontSize}
            fontFamily={fontFamily}
            fontWeight={layout.brandName.fontWeight}
            letterSpacing={`${layout.brandName.letterSpacing}px`}
            fill={config.colors.brandName}
            dominantBaseline="central"
            textAnchor="start"
          >
            {config.brandName}
          </text>
        )}

        {/* Keyline for brand name area */}
        {config.showKeylines && (
          <rect
            x={layout.brandName.x - 2}
            y={layout.brandName.y - layout.brandName.fontSize / 2}
            width={layout.brandName.maxWidth + 4}
            height={layout.brandName.fontSize}
            fill="none"
            stroke={config.colors.keylines}
            strokeWidth={layout.keylineWidth}
            strokeDasharray="2,2"
          />
        )}
      </g>
    )
  }

  const renderStrapline = () => {
    if (!config.strapline || !config.variant.includes("strapline")) return null

    return (
      <g id="strapline">
        <text
          x={layout.strapline.x}
          y={layout.strapline.y}
          fontSize={layout.strapline.fontSize}
          fontFamily={fontFamily}
          fontWeight={layout.strapline.fontWeight}
          letterSpacing={`${layout.strapline.letterSpacing}px`}
          fill={config.colors.strapline}
          dominantBaseline="central"
          textAnchor="start"
        >
          {config.strapline}
        </text>

        {/* Keyline for strapline area */}
        {config.showKeylines && (
          <rect
            x={layout.strapline.x - 2}
            y={layout.strapline.y - layout.strapline.fontSize / 2}
            width={layout.strapline.maxWidth + 4}
            height={layout.strapline.fontSize}
            fill="none"
            stroke={config.colors.keylines}
            strokeWidth={layout.keylineWidth}
            strokeDasharray="2,2"
          />
        )}
      </g>
    )
  }

  return (
    <div className={`dyna-logo ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily }}
      >
        {/* Logo Background */}
        <rect
          x={0}
          y={0}
          width={layout.container.width}
          height={layout.container.height}
          fill={config.colors.logoBg}
          stroke={config.showKeylines ? config.colors.keylines : "none"}
          strokeWidth={config.showKeylines ? layout.keylineWidth : 0}
        />

        {/* Icon Background */}
        <rect
          x={layout.iconBg.x}
          y={layout.iconBg.y}
          width={layout.iconBg.width}
          height={layout.iconBg.height}
          fill={config.colors.iconBg}
          stroke={config.showKeylines ? config.colors.keylines : "none"}
          strokeWidth={config.showKeylines ? layout.keylineWidth : 0}
        />

        {/* Icon - FIXED: Properly centered and visible */}
        <g transform={`translate(${layout.icon.x + layout.icon.width / 2}, ${layout.icon.y + layout.icon.height / 2})`}>
          <g transform={`translate(-${layout.icon.width / 2}, -${layout.icon.height / 2})`}>
            <SvBuildIcon
              variant={config.iconVariant as any}
              style={{
                width: layout.icon.width,
                height: layout.icon.height,
                color: config.colors.iconFg,
                display: "block",
              }}
            />
          </g>
        </g>

        {/* Brand Name */}
        {renderBrandName()}

        {/* Strapline */}
        {renderStrapline()}

        {/* Layout guides */}
        {config.showKeylines && (
          <g id="layout-guides" opacity="0.3">
            {/* Icon area guide */}
            <rect
              x={layout.iconBg.x}
              y={layout.iconBg.y}
              width={layout.iconBg.width}
              height={layout.iconBg.height}
              fill="none"
              stroke={config.colors.keylines}
              strokeWidth={layout.keylineWidth}
              strokeDasharray="4,4"
            />

            {/* Icon center guides */}
            <line
              x1={layout.iconBg.x + layout.iconBg.width / 2}
              y1={layout.iconBg.y}
              x2={layout.iconBg.x + layout.iconBg.width / 2}
              y2={layout.iconBg.y + layout.iconBg.height}
              stroke={config.colors.keylines}
              strokeWidth={0.5}
              strokeDasharray="1,1"
            />
            <line
              x1={layout.iconBg.x}
              y1={layout.iconBg.y + layout.iconBg.height / 2}
              x2={layout.iconBg.x + layout.iconBg.width}
              y2={layout.iconBg.y + layout.iconBg.height / 2}
              stroke={config.colors.keylines}
              strokeWidth={0.5}
              strokeDasharray="1,1"
            />

            {/* Text start guide */}
            <line
              x1={layout.brandName.x}
              y1={0}
              x2={layout.brandName.x}
              y2={height}
              stroke={config.colors.keylines}
              strokeWidth={layout.keylineWidth}
              strokeDasharray="1,1"
            />
          </g>
        )}
      </svg>

      <style jsx>{`
        .dyna-logo {
          display: inline-block;
          font-family: ${fontFamily};
        }
        
        .dyna-logo svg {
          display: block;
        }
        
        .dyna-logo text {
          font-family: ${fontFamily};
          text-rendering: optimizeLegibility;
          shape-rendering: crispEdges;
        }
      `}</style>
    </div>
  )
}
