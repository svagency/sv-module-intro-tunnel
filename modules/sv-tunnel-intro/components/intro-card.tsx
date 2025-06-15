"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Sv0AppLogo } from "@/components/sv0-app-logo"
import { SvBuildIcon } from "./icons/sv-build-icon"
import { cn } from "@/lib/utils"
import type { IntroCardProps } from "../types"

interface ExtendedIntroCardProps extends IntroCardProps {
  iconVariant?: string
}

export function IntroCard({ theme, iconVariant = "a" }: ExtendedIntroCardProps) {
  return (
    <Card
      className={cn("w-full relative intro-card", "rounded-2xl sm:rounded-3xl", "animate-card-intro", "opacity-100")}
      style={{
        // Precise pixel dimensions for grid alignment
        maxWidth: "1200px", // 12 * 100px grid
        minHeight: "600px", // 6 * 100px grid
      }}
    >
      <CardContent
        className="p-6 sm:p-10 md:p-12"
        style={{
          // Ensure content aligns to 10px grid
          padding: "60px", // 6 * 10px
        }}
      >
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
          {/* Left Column - Text Content with SV0 Logo */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="welcome-title mb-2 sm:mb-3 text-center lg:text-left">Welcome to</h1>

                {/* SV0 Logo and Genesis Text */}
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Sv0AppLogo className="h-12 sm:h-16 lg:h-20 w-auto" />
                  <span className="genesis-title">Genesis</span>
                </div>
              </div>

              <div className="space-y-4 text-lg sm:text-xl description-text max-w-lg text-center lg:text-left">
                <p>
                  This SV application demonstrates a staged startup sequence. Performance tracking is part of a modular
                  system.
                </p>
                <p className="text-base opacity-75">Below is a test integration of the simplified icon component.</p>
              </div>

              <Button
                className="action-button group self-center lg:self-start px-6 py-3 sm:px-8 sm:py-4 text-md sm:text-lg"
                style={{
                  width: "200px", // 20 * 10px
                  height: "50px", // 5 * 10px
                }}
                onClick={() => window.location.reload()}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column - Large Icon */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              className="icon-container flex items-center justify-center"
              style={{
                width: "400px", // 40 * 10px
                height: "400px", // 40 * 10px
                padding: "40px", // 4 * 10px
              }}
            >
              <SvBuildIcon
                variant={iconVariant as any}
                className="w-full h-full icon-size living-drop-shadow-effect"
                style={{
                  filter:
                    "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.05)) drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.1)) drop-shadow(0px 16px 32px rgba(0, 0, 0, 0.08))",
                  stroke: "rgba(255, 255, 255, 0.15)",
                  strokeWidth: "0.5px",
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
