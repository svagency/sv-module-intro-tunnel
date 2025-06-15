/**
 * @file app/loading.tsx
 * @description Enhanced indeterminate loading screen for SV0 Genesis.
 * @version SV0-GENESIS-005
 * @status production
 * @category loading-states
 * @keywords loading, progress, indeterminate, UX, hotfix
 * @dev-notes HOTFIX: Hardcoded fallback colors to prevent white screen flash.
 *   The component is now self-sufficient and does not depend on globals.css
 *   to render its initial, critical styles. This guarantees it will display
 *   correctly during the initial app load.
 * @copyright SVX Framework 2025 - SV0 Genesis
 */
"use client"

import { useEffect, useState } from "react"

export default function Loading() {
  const [statusText, setStatusText] = useState("Connecting...")

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setStatusText("Loading assets..."), 500),
      setTimeout(() => setStatusText("Initializing framework..."), 1500),
    ]
    return () => timeouts.forEach(clearTimeout)
  }, [])

  return (
    <>
      <div className="sv0-loading-overlay">
        <div className="sv0-loading-content">
          <div className="sv0-loading-logo-placeholder">SV0</div>
          <div className="sv0-loading-progress-bar-container">
            <div className="sv0-loading-progress-bar"></div>
          </div>
          <div className="sv0-loading-status">
            <span className="sv0-status-text">{statusText}</span>
          </div>
          <div className="sv0-loading-info">
            <span>Loading application...</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sv0-loading-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          /* HOTFIX: Hardcoded dark background to prevent white flash */
          background-color: #09090b;
          color: #fafafa;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          z-index: 9999;
        }
        .sv0-loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem; /* 24px */
          width: 90%;
          max-width: 24rem; /* 384px */
        }
        .sv0-loading-logo-placeholder {
          font-size: 3rem; /* 48px */
          font-weight: bold;
        }
        .sv0-loading-progress-bar-container {
          width: 100%;
          height: 4px;
          /* HOTFIX: Hardcoded muted background */
          background-color: #27272a;
          border-radius: 9999px;
          overflow: hidden;
        }
        .sv0-loading-progress-bar {
          width: 100%;
          height: 100%;
          /* HOTFIX: Hardcoded primary color */
          background-color: #fafafa;
          transform-origin: left;
          animation: sv0-progress-animation 2.5s ease-out forwards;
        }
        .sv0-loading-status,
        .sv0-loading-info {
          font-size: 0.875rem; /* 14px */
          /* HOTFIX: Hardcoded muted foreground color */
          color: #a1a1aa;
        }
        .sv0-loading-info {
          font-size: 0.75rem; /* 12px */
        }

        @keyframes sv0-progress-animation {
          0% {
            transform: scaleX(0);
          }
          95% {
            transform: scaleX(0.98);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </>
  )
}
