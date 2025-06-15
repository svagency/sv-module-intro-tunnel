"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SvBuildLogo } from "./icons/sv-build-logo"
import { SvBuildIcon } from "./icons/sv-build-icon"
import { cn } from "@/lib/utils"
import type { IntroCardProps } from "../types"

export function IntroCard({ theme }: IntroCardProps) {
  return (
    <Card
      className={cn("w-full relative intro-card", "rounded-2xl sm:rounded-3xl", "animate-card-intro", "opacity-100")}
    >
      <CardContent className="p-6 sm:p-10 md:p-12">
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="welcome-title mb-2 sm:mb-3 text-center lg:text-left">Welcome to</h1>
            <div className="flex items-center justify-center lg:justify-start mb-4 sm:mb-6">
              <div className="flex items-baseline">
                <SvBuildLogo className="logo-size text-accent mr-1 sm:mr-2 self-center" />
                <span className="genesis-title">Genesis</span>
              </div>
            </div>
            <p className="description-text mb-4 sm:mb-6 text-center lg:text-left">
              Experience beautiful animations with switchable design systems.
            </p>
            <Button
              className="action-button group self-center lg:self-start px-6 py-3 sm:px-8 sm:py-4 text-md sm:text-lg"
              onClick={() => window.location.reload()}
            >
              Replay Animation
            </Button>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="icon-container">
              <SvBuildIcon className="icon-size text-accent opacity-75" stroke="currentColor" strokeWidth="0.5" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
