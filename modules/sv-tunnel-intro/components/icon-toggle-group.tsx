"use client"
import { SVUnifiedStrip } from "@/components/blocks/sv-unified-strip"
import { Button } from "@/components/ui/button"
import { Shapes } from "lucide-react"
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
} from "./icons/custom-icons"

const iconVariants = [
  { id: "a", name: "A", icon: AIcon },
  { id: "4space", name: "4Space", icon: FourSpaceIcon },
  { id: "bitchain", name: "BitChain", icon: BitChainIcon },
  { id: "audionomiq", name: "Audio", icon: AudionomiqIcon },
  { id: "alien", name: "Alien", icon: AlienIcon },
  { id: "bsva", name: "BSVA", icon: BSVAIcon },
  { id: "convene", name: "Convene", icon: ConveneIcon },
  { id: "code", name: "Code", icon: CodeIcon },
  { id: "core", name: "Core", icon: CoreIcon },
  { id: "communio", name: "Communio", icon: CommunioIcon },
  { id: "droid", name: "Droid", icon: DroidIcon },
  { id: "magazai", name: "Magazai", icon: MagazaiIcon },
  { id: "movai", name: "Movai", icon: MovaiIcon },
  { id: "network", name: "Network", icon: NetworkIcon },
  { id: "secure", name: "Secure", icon: SecureIcon },
  { id: "musai", name: "Musai", icon: MusaiIcon },
  { id: "portervan", name: "Porter", icon: PortervanIcon },
  { id: "spiral", name: "Spiral", icon: SpiralIcon },
  { id: "svape", name: "Svape", icon: SvapeIcon },
  { id: "sv", name: "SV", icon: SVIcon },
  { id: "svape3", name: "Svape3", icon: Svape3Icon },
  { id: "svape1", name: "Svape1", icon: Svape1Icon },
  { id: "svape2", name: "Svape2", icon: Svape2Icon },
  { id: "tunnel", name: "Tunnel", icon: TunnelIcon },
  { id: "v0", name: "V0", icon: V0Icon },
  { id: "vibe", name: "Vibe", icon: VibeIcon },
]

interface IconToggleGroupProps {
  currentVariant: string
  onVariantChange: (variant: string) => void
  isMinimized: boolean
  onToggleMinimize: () => void
}

export function IconToggleGroup({
  currentVariant,
  onVariantChange,
  isMinimized,
  onToggleMinimize,
}: IconToggleGroupProps) {
  const iconContent = (
    <>
      {iconVariants.map((variant) => {
        const IconComponent = variant.icon
        const isActive = currentVariant === variant.id

        return (
          <Button
            key={variant.id}
            onClick={() => onVariantChange(variant.id)}
            variant="ghost"
            size="sm"
            className={cn(
              "flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-[60px] transition-all duration-200 flex-shrink-0",
              isActive
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
            )}
            title={variant.name}
          >
            <IconComponent className="h-4 w-4" />
            <span className="text-xs font-medium leading-none">{variant.name}</span>
          </Button>
        )
      })}
    </>
  )

  const minimizedContent = (
    <>
      <Shapes className="h-4 w-4 text-gray-600" />
      <span className="text-gray-800 ml-2">Icons</span>
    </>
  )

  return (
    <SVUnifiedStrip
      position="top"
      isMinimized={isMinimized}
      onToggleMinimize={onToggleMinimize}
      minimizedContent={minimizedContent}
    >
      {iconContent}
    </SVUnifiedStrip>
  )
}
