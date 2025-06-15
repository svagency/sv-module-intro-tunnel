"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SVDraggablePanelProps {
  children: React.ReactNode
  position?: "top" | "bottom"
  initialPosition?: { x: number; y: number }
  className?: string
  dragHandle?: React.ReactNode
  onPositionChange?: (position: { x: number; y: number }) => void
}

export function SVDraggablePanel({
  children,
  position = "bottom",
  initialPosition = { x: 0, y: 0 },
  className,
  dragHandle,
  onPositionChange,
}: SVDraggablePanelProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [currentPosition, setCurrentPosition] = useState(initialPosition)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!panelRef.current) return

    const rect = panelRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setIsDragging(true)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!panelRef.current) return

    const rect = panelRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    })
    setIsDragging(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      }

      // Constrain to viewport
      const maxX = window.innerWidth - (panelRef.current?.offsetWidth || 0)
      const maxY = window.innerHeight - (panelRef.current?.offsetHeight || 0)

      newPosition.x = Math.max(0, Math.min(maxX, newPosition.x))
      newPosition.y = Math.max(0, Math.min(maxY, newPosition.y))

      setCurrentPosition(newPosition)
      onPositionChange?.(newPosition)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return

      const touch = e.touches[0]
      const newPosition = {
        x: touch.clientX - dragOffset.x,
        y: touch.clientY - dragOffset.y,
      }

      // Constrain to viewport
      const maxX = window.innerWidth - (panelRef.current?.offsetWidth || 0)
      const maxY = window.innerHeight - (panelRef.current?.offsetHeight || 0)

      newPosition.x = Math.max(0, Math.min(maxX, newPosition.x))
      newPosition.y = Math.max(0, Math.min(maxY, newPosition.y))

      setCurrentPosition(newPosition)
      onPositionChange?.(newPosition)
    }

    const handleEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleEnd)
      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("touchend", handleEnd)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleEnd)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleEnd)
    }
  }, [isDragging, dragOffset, onPositionChange])

  const positionStyle = {
    transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
  }

  return (
    <div
      ref={panelRef}
      className={cn(
        "fixed z-50 select-none",
        position === "bottom" ? "bottom-4 left-1/2 -translate-x-1/2" : "top-4 left-1/2 -translate-x-1/2",
        isDragging && "cursor-grabbing",
        className,
      )}
      style={isDragging ? positionStyle : undefined}
    >
      {/* Drag Handle */}
      <div
        className={cn("cursor-grab active:cursor-grabbing touch-none", isDragging && "cursor-grabbing")}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {dragHandle || (
          <div className="w-full h-2 bg-gray-300 rounded-full mb-2 flex justify-center items-center">
            <div className="w-8 h-1 bg-gray-500 rounded-full" />
          </div>
        )}
      </div>

      {/* Panel Content */}
      <div className="pointer-events-auto">{children}</div>
    </div>
  )
}
