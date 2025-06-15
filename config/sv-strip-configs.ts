/**
 * @fileoverview SV Strip Configuration System
 * @description DRY configuration for icon and theme strips
 */

import type { TunnelIntroTheme } from "../modules/sv-tunnel-intro/types"
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
} from "../modules/sv-tunnel-intro/components/icons/custom-icons"

// Icon Strip Configuration
export const SV_ICON_STRIP_CONFIG = {
  variants: [
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
  ],
}

// Theme Strip Configuration
export const SV_THEME_STRIP_CONFIG = {
  themes: [
    { id: "wireframe", name: "Wire", icon: "⚡", description: "Clean lines and structure" },
    { id: "neo1-minimal", name: "Neo", icon: "✨", description: "Minimal neomorphic design" },
    { id: "neo2-current", name: "Neo2", icon: "🔷", description: "Current neomorphic style" },
    { id: "neo3-advanced", name: "Neo3", icon: "💎", description: "Advanced neomorphic effects" },
    { id: "greyscale", name: "Grey", icon: "⚫", description: "Rich invertible grey palette" },
    { id: "pop", name: "Pop", icon: "⚡", description: "Bright and vibrant colors" },
    { id: "luxury", name: "Lux", icon: "👑", description: "Hyper-slick modern aesthetic" },
  ] as Array<{
    id: TunnelIntroTheme
    name: string
    icon: string
    description: string
  }>,
}

// Control Strip Configuration
export const SV_CONTROL_STRIP_CONFIG = {
  actions: [
    { id: "restart", name: "Restart", icon: "🔄", description: "Restart tunnel animation" },
    { id: "grid", name: "Grid", icon: "⚏", description: "Toggle pixel grid overlay" },
    { id: "logo", name: "Logo", icon: "🎨", description: "Open logo designer" },
  ],
}

export default {
  icon: SV_ICON_STRIP_CONFIG,
  theme: SV_THEME_STRIP_CONFIG,
  control: SV_CONTROL_STRIP_CONFIG,
}
