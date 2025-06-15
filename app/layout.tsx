import type React from "react"
import type { Metadata } from "next"
import ClientRootLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "SV Tunnel Intro",
  description: "Advanced tunnel intro with dynamic logo system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientRootLayout>{children}</ClientRootLayout>
}


import './globals.css'