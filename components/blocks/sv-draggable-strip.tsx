"use client"

import type React from "react"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SVDraggableStripProps {
  children: ReactNode
  position: "top" | "bottom"
  className?: string
  isMinimized?: boolean
  onToggleMinimize?: () => void
  dragConstraints?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
}

export function SVDraggableStrip({
  children,
  position,
  className,
  isMinimized = false,
  onToggleMinimize,
  dragConstraints,
}: SVDraggableStripProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
  const stripRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleDragMove = (clientX: number, clientY: number) => {
      if (!isDragging || !stripRef.current) return

      const newX = clientX - dragStart.x
      const newY = clientY - dragStart.y

      // Apply constraints
      const constraints = dragConstraints || {}
      const maxX = (constraints.right ?? window.innerWidth) - stripRef.current.offsetWidth
      const maxY = (constraints.bottom ?? window.innerHeight) - stripRef.current.offsetHeight
      const minX = constraints.left ?? 0
      const minY = constraints.top ?? 0

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
  }, [isDragging, dragStart, dragConstraints])

  const stripStyle = isDragging
    ? {
        transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
        zIndex: 1000,
      }
    : undefined

  return (
    <div
      ref={stripRef}
      className={cn(
        "fixed z-50 transition-all duration-300 ease-out",
        position === "top" ? "top-4 left-1/2 -translate-x-1/2" : "bottom-4 left-1/2 -translate-x-1/2",
        isDragging && "cursor-grabbing select-none",
        isMinimized && "opacity-75 scale-95",
        className,
      )}
      style={stripStyle}
    >
      {/* Drag Handle */}
      <div
        className={cn(
          "flex items-center justify-center w-full h-2 cursor-grab active:cursor-grabbing touch-none",
          position === "top" ? "mb-2" : "mb-1 order-2",
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={onToggleMinimize}
      >
        <div className="w-8 h-1 bg-gray-400 rounded-full transition-colors hover:bg-gray-600" />
      </div>

      {/* Strip Content */}
      <div
        className={cn(
          "bg-white/90 backdrop-blur-sm border shadow-lg transition-all duration-300",
          position === "top" ? "rounded-xl" : "rounded-xl order-1",
          isMinimized && "scale-90 opacity-80",
        )}
      >
        {children}
      </div>
    </div>
  )
}
