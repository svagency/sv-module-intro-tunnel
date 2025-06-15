"use client"

import type React from "react"

import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { injectFontStyles } from "@/config/font-loader"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

function FontLoader() {
  useEffect(() => {
    injectFontStyles()
  }, [])
  return null
}

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FontLoader />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
