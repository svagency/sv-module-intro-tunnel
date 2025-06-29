import type React from "react"
import { cn } from "@/lib/utils"
import {
  AIcon,
  FourSpaceIcon,
  BitChainIcon,
  AudionomiqIcon,
  AlienIcon,
  BSVAIcon,
  ConveneIcon,
  CodeIcon,
  CoreIcon,
  CommunioIcon,
  DroidIcon,
  MagazaiIcon,
  MovaiIcon,
  NetworkIcon,
  SecureIcon,
  MusaiIcon,
  PortervanIcon,
  SpiralIcon,
  SvapeIcon,
  SVIcon,
  Svape3Icon,
  Svape1Icon,
  Svape2Icon,
  TunnelIcon,
  V0Icon,
  VibeIcon,
} from "./custom-icons"

interface SvBuildLogoProps extends React.SVGProps<SVGSVGElement> {
  variant?:
    | "a"
    | "4space"
    | "bitchain"
    | "audionomiq"
    | "alien"
    | "bsva"
    | "convene"
    | "code"
    | "core"
    | "communio"
    | "droid"
    | "magazai"
    | "movai"
    | "network"
    | "secure"
    | "musai"
    | "portervan"
    | "spiral"
    | "svape"
    | "sv"
    | "svape3"
    | "svape1"
    | "svape2"
    | "tunnel"
    | "v0"
    | "vibe"
}

export const SvBuildLogo: React.FC<SvBuildLogoProps> = ({ variant = "a", ...props }) => {
  const renderLogo = () => {
    switch (variant) {
      case "4space":
        return <FourSpaceIcon {...props} className={cn(props.className)} />
      case "bitchain":
        return <BitChainIcon {...props} className={cn(props.className)} />
      case "audionomiq":
        return <AudionomiqIcon {...props} className={cn(props.className)} />
      case "alien":
        return <AlienIcon {...props} className={cn(props.className)} />
      case "bsva":
        return <BSVAIcon {...props} className={cn(props.className)} />
      case "convene":
        return <ConveneIcon {...props} className={cn(props.className)} />
      case "code":
        return <CodeIcon {...props} className={cn(props.className)} />
      case "core":
        return <CoreIcon {...props} className={cn(props.className)} />
      case "communio":
        return <CommunioIcon {...props} className={cn(props.className)} />
      case "droid":
        return <DroidIcon {...props} className={cn(props.className)} />
      case "magazai":
        return <MagazaiIcon {...props} className={cn(props.className)} />
      case "movai":
        return <MovaiIcon {...props} className={cn(props.className)} />
      case "network":
        return <NetworkIcon {...props} className={cn(props.className)} />
      case "secure":
        return <SecureIcon {...props} className={cn(props.className)} />
      case "musai":
        return <MusaiIcon {...props} className={cn(props.className)} />
      case "portervan":
        return <PortervanIcon {...props} className={cn(props.className)} />
      case "spiral":
        return <SpiralIcon {...props} className={cn(props.className)} />
      case "svape":
        return <SvapeIcon {...props} className={cn(props.className)} />
      case "sv":
        return <SVIcon {...props} className={cn(props.className)} />
      case "svape3":
        return <Svape3Icon {...props} className={cn(props.className)} />
      case "svape1":
        return <Svape1Icon {...props} className={cn(props.className)} />
      case "svape2":
        return <Svape2Icon {...props} className={cn(props.className)} />
      case "tunnel":
        return <TunnelIcon {...props} className={cn(props.className)} />
      case "v0":
        return <V0Icon {...props} className={cn(props.className)} />
      case "vibe":
        return <VibeIcon {...props} className={cn(props.className)} />
      default: // "a"
        return <AIcon {...props} className={cn(props.className)} />
    }
  }

  return renderLogo()
}
