"use client";

import { useEffect, useState } from "react";

export function PagePreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Small delay to ensure the page is rendered before starting fade
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 50);

    // Remove from render after fade completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 550); // 50ms delay + 500ms fade

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-label="Cargando"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--background-primary, #0a0a0a)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s ease-out',
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      {/* Invoo Logo Icon - Two overlapping gradient diamonds */}
      <svg
        width="80"
        height="64"
        viewBox="0 0 84 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: 'preloader-breathe 2s ease-in-out infinite',
        }}
      >
        <path
          d="M64.0691 34.8439C68.3259 30.7905 68.3259 24.2186 64.0691 20.1652L46.0847 3.04006C41.8279 -1.01335 34.9263 -1.01335 30.6695 3.04006L3.1926 29.2042C-1.07265 33.2657 -1.06294 39.8535 3.21427 43.9035L21.2492 60.9805C25.5094 65.0145 32.3944 65.0053 36.6427 60.9599L64.0691 34.8439Z"
          fill="url(#preloader-gradient-1)"
        />
        <path
          d="M80.1793 34.8439C84.3725 30.7905 84.3725 24.2186 80.1793 20.1652L62.4633 3.04006C58.27 -1.01335 51.4714 -1.01335 47.2782 3.04006L20.2114 29.2042C16.0098 33.2657 16.0193 39.8535 20.2327 43.9035L37.9984 60.9805C42.1951 65.0145 48.9773 65.0053 53.1622 60.9599L80.1793 34.8439Z"
          fill="url(#preloader-gradient-2)"
          fillOpacity="0.8"
        />
        <defs>
          <linearGradient id="preloader-gradient-1" x1="67.0121" y1="29.375" x2="14.7978" y2="50.0854" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3392FF" />
            <stop offset="1" stopColor="#7B4CFE" />
          </linearGradient>
          <linearGradient id="preloader-gradient-2" x1="83.0784" y1="29.375" x2="31.4354" y2="49.553" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3392FF" />
            <stop offset="1" stopColor="#7B4CFE" />
          </linearGradient>
        </defs>
      </svg>
      <span className="sr-only">Cargando contenido...</span>

      {/* Keyframes for breathing animation */}
      <style>
        {`
          @keyframes preloader-breathe {
            0%, 100% {
              transform: scale(0.95);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.05);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
