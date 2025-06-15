"use client"

import React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SVUnifiedStripProps {
  position: "top" | "bottom"
  isMinimized: boolean
  onToggleMinimize: () => void
  children: React.ReactNode
  className?: string
  minimizedContent?: React.ReactNode
}

export function SVUnifiedStrip({
  position,
  isMinimized,
  onToggleMinimize,
  children,
  className,
  minimizedContent,
}: SVUnifiedStripProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  // Drag functionality - IDENTICAL for both strips
  const handleDragStart = (clientX: number, clientY: number) => {
    if (!stripRef.current) return
    const rect = stripRef.current.getBoundingClientRect()
    setDragStart({
      x: clientX - rect.left,
      y: clientY - rect.top,
    })
    setIsDragging(true)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDragStart(e.clientX, e.clientY)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    const touch = e.touches[0]
    handleDragStart(touch.clientX, touch.clientY)
  }

  // Scroll functionality - IDENTICAL for both strips
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  // Drag event handlers - IDENTICAL for both strips
  React.useEffect(() => {
    const handleDragMove = (clientX: number, clientY: number) => {
      if (!isDragging || !stripRef.current) return

      const newX = clientX - dragStart.x
      const newY = clientY - dragStart.y

      const maxX = window.innerWidth - stripRef.current.offsetWidth
      const maxY = window.innerHeight - stripRef.current.offsetHeight
      const minX = 0
      const minY = 0

      const constrainedX = Math.max(minX, Math.min(maxX, newX))
      const constrainedY = Math.max(minY, Math.min(maxY, newY))

      setCurrentPosition({ x: constrainedX, y: constrainedY })
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      handleDragMove(touch.clientX, touch.clientY)
    }

    const handleDragEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleDragEnd)
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("touchend", handleDragEnd)
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleDragEnd)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleDragEnd)
      document.body.style.userSelect = ""
    }
  }, [isDragging, dragStart])

  const stripStyle = isDragging
    ? {
        transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
        zIndex: 1000,
      }
    : undefined

  const positionClass =
    position === "top" ? "top-4 left-1/2 transform -translate-x-1/2" : "bottom-4 left-1/2 transform -translate-x-1/2"

  // Minimized state - IDENTICAL for both strips
  if (isMinimized) {
    return (
      <div ref={stripRef} className={cn("fixed z-[100]", positionClass, className)} style={stripStyle}>
        <div className="flex items-center gap-2">
          <Button
            onClick={onToggleMinimize}
            className="bg-white/90 hover:bg-white border border-gray-200 shadow-lg backdrop-blur-sm"
            size="sm"
          >
            <Maximize2 className="h-4 w-4 text-gray-600" />
            {minimizedContent}
          </Button>
        </div>
      </div>
    )
  }

  // Expanded state - IDENTICAL for both strips
  return (
    <div ref={stripRef} className={cn("fixed z-[100]", positionClass, className)} style={stripStyle}>
      {/* Drag Handle - IDENTICAL for both strips */}
      <div
        className={cn(
          "flex items-center justify-center w-full h-2 cursor-grab active:cursor-grabbing touch-none",
          position === "top" ? "mb-2" : "mb-2",
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={onToggleMinimize}
      >
        <div className="w-8 h-1 bg-gray-400 rounded-full transition-colors hover:bg-gray-600" />
      </div>

      {/* Strip Container - IDENTICAL for both strips */}
      <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-3">
        <div className="flex items-center gap-2">
          {/* Minimize button - IDENTICAL for both strips */}
          <Button
            onClick={onToggleMinimize}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            title="Minimize"
          >
            <Minimize2 className="h-3 w-3" />
          </Button>

          {/* Scroll left button - IDENTICAL for both strips */}
          <Button
            onClick={scrollLeft}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            title="Scroll Left"
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>

          {/* Scrollable content container - IDENTICAL for both strips */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide max-w-[600px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {children}
          </div>

          {/* Scroll right button - IDENTICAL for both strips */}
          <Button
            onClick={scrollRight}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            title="Scroll Right"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
