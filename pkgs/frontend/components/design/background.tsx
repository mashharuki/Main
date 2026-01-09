"use client";

import React from "react";

export interface ParticleBackgroundProps {
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
  speed?: number;
  interactive?: boolean;
  className?: string;
}

/**
 * SubtleBackground Component
 * Replaces particle animation with subtle, professional background
 * Design: Clean SaaS aesthetic - no animated particles
 * 
 * This component now renders a subtle gradient or pattern instead of particles.
 * Keeps the same props interface for backwards compatibility.
 */
export const ParticleBackground = React.memo(function ParticleBackground({
  className = "",
}: ParticleBackgroundProps) {
  // Return a subtle gradient background instead of animated particles
  // This maintains layout compatibility while removing the cyber effect
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(241, 245, 249, 0.5), transparent),
          radial-gradient(ellipse 60% 30% at 100% 0%, rgba(226, 232, 240, 0.3), transparent),
          linear-gradient(180deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 100%)
        `,
      }}
      aria-hidden="true"
      role="presentation"
    />
  );
});
