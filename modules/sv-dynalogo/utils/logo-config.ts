import type { LogoVariant, FontFamily } from "../types"

export const logoVariants = [
  {
    id: "font-strapline" as LogoVariant,
    name: "Font + Strapline",
    description: "Brand name with descriptive text below",
  },
  {
    id: "font-only" as LogoVariant,
    name: "Font Only",
    description: "Just the brand name, larger size",
  },
  {
    id: "svg-strapline" as LogoVariant,
    name: "SVG + Strapline",
    description: "Custom SVG text with strapline",
  },
  {
    id: "icon-only" as LogoVariant,
    name: "Icon Only",
    description: "Just the icon, no text",
  },
  {
    id: "svg-large" as LogoVariant,
    name: "SVG Large",
    description: "Large custom SVG text",
  },
]

export const fontFamilies = [
  {
    id: "ubuntu" as FontFamily,
    name: "Ubuntu",
    cssFamily: "Ubuntu, sans-serif",
  },
  {
    id: "inter" as FontFamily,
    name: "Inter",
    cssFamily: "Inter, sans-serif",
  },
  {
    id: "roboto" as FontFamily,
    name: "Roboto",
    cssFamily: "Roboto, sans-serif",
  },
  {
    id: "montserrat" as FontFamily,
    name: "Montserrat",
    cssFamily: "Montserrat, sans-serif",
  },
  {
    id: "poppins" as FontFamily,
    name: "Poppins",
    cssFamily: "Poppins, sans-serif",
  },
]

export const defaultLogoConfig = {
  variant: "font-strapline" as LogoVariant,
  fontFamily: "ubuntu" as FontFamily,
  brandName: "BITCHAIN",
  strapline: "BITCOIN BLOCKCHAIN",
  iconVariant: "hexagon",
  showKeylines: false,
  colors: {
    iconBg: "#f1b01d",
    iconFg: "#ffffff",
    brandName: "#010101",
    strapline: "#f2b01d",
    logoBg: "#ffffff",
    keylines: "#ff0000",
  },
}
