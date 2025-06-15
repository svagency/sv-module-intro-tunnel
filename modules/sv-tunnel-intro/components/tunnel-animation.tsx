"use client"
import type React from "react"
import { SvBuildIcon } from "./icons/sv-build-icon"
import { cn } from "@/lib/utils"
import type { TunnelAnimationProps } from "../types"

const NUM_ICONS = 6
const ANIMATION_DURATION_MS = 2500

export const TunnelAnimation: React.FC<TunnelAnimationProps> = ({ theme }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden z-40 tunnel-container"
      style={{
        perspective: "1000px",
        animation: `tunnelBgFadeAnimation ${ANIMATION_DURATION_MS}ms ease-out forwards`,
      }}
    >
      {Array.from({ length: NUM_ICONS }).map((_, index) => {
        const delay = index * (ANIMATION_DURATION_MS / NUM_ICONS / 3)
        const animationDuration = ANIMATION_DURATION_MS * 0.9
        const zOffset = index * -200
        const initialScale = 0.3

        return (
          <div
            key={index}
            className="absolute"
            style={{
              animation: `tunnelIconAnimation ${animationDuration}ms ease-in ${delay}ms forwards`,
              willChange: "transform, opacity",
              transform: `translateZ(${zOffset}px) scale(${initialScale})`,
              opacity: 0,
            }}
          >
            <SvBuildIcon className={cn("w-[400px] h-[400px] tunnel-icon")} />
          </div>
        )
      })}

      <style jsx>{`
        @keyframes tunnelBgFadeAnimation {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes tunnelIconAnimation {
          0% {
            transform: translateZ(-200px) scale(0.3);
            opacity: 0;
          }
          20% {
            opacity: 0.75;
          }
          80% {
            transform: translateZ(1200px) scale(48);
            opacity: 0.25;
          }
          100% {
            transform: translateZ(1200px) scale(48);
            opacity: 0;
          }
        }

        @media (min-width: 768px) {
          @keyframes tunnelIconAnimation {
            0% {
              transform: translateZ(-200px) scale(0.3);
              opacity: 0;
            }
            20% {
              opacity: 0.75;
            }
            80% {
              transform: translateZ(1500px) scale(60);
              opacity: 0.25;
            }
            100% {
              transform: translateZ(1500px) scale(60);
              opacity: 0;
            }
          }
        }
      `}</style>
    </div>
  )
}
