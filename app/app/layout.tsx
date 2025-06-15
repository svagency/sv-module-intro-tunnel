import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SV App",
  description: "Main application area",
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <h1 className="text-2xl font-bold text-purple-300">SV Application</h1>
      </header>
      <main className="container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 border-t border-gray-700 p-4 text-center text-gray-400">
        <p>&copy; 2025 SV Framework</p>
      </footer>
    </div>
  )
}
