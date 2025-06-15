import type React from "react"
import { cn } from "@/lib/utils"

interface SvBuildIconProps extends React.SVGProps<SVGSVGElement> {}

export const SvBuildIcon: React.FC<SvBuildIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 1417.32 1417.32"
      fill={props.fill || "currentColor"}
      aria-label="SV Build Icon"
      {...props}
      className={cn("living-drop-shadow-effect", props.className)}
    >
      <path d="M1258.9,745.65l-223.7-387.48c-21.68-37.55-61.74-60.68-105.1-60.68h-448c-43.36,0-83.42,23.13-105.1,60.67l-219.44,380c-21.69,37.55-21.69,83.82,0,121.38l133.42,231.06c14.45,25.03,41.16,40.45,70.07,40.45h698.67c28.9,0,55.61-15.42,70.07-40.45l129.11-223.58c21.68-37.55,21.69-83.82,0-121.37ZM990.57,793.97l-65.49,113.41c-7.33,12.7-20.88,20.52-35.54,20.52h-354.39c-14.66,0-28.21-7.82-35.54-20.52l-67.67-117.2c-11-19.05-11-42.52,0-61.57l111.31-192.75c11-19.04,31.32-30.78,53.31-30.78h227.24c21.99,0,42.32,11.73,53.31,30.78l113.47,196.54c11,19.05,11,42.52,0,61.56Z" />
    </svg>
  )
}
