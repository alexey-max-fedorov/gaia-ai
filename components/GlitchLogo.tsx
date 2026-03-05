"use client";

import { CSSProperties } from "react";

const LOGO_BASE_URL =
  "https://raw.githubusercontent.com/alexey-max-fedorov/gaia-ai/master/images";

const LOGO_MAP: Record<string, string> = {
  HEPHAESTUS: "HEPHAESTUS%20Logo.svg",
  HADES: "HADES%20Logo.svg",
  MINERVA: "MINERVA%20Logo.svg",
  AETHER: "AETHER%20Logo.svg",
  POSEIDON: "POSEIDON%20Logo.svg",
  DEMETER: "DEMETER%20Logo.svg",
  ARTEMIS: "ARTEMIS%20Logo.svg",
  ELEUTHIA: "ELEUTHIA%20Logo.svg",
  APOLLO: "APOLLO%20Logo.svg",
  GAIA: "GAIA%20Logo.svg",
};

interface GlitchLogoProps {
  name: string;
  size?: number;
  className?: string;
}

export default function GlitchLogo({
  name,
  size = 48,
  className = "",
}: GlitchLogoProps) {
  const fileName = LOGO_MAP[name.toUpperCase()];

  // Fallback: if no SVG exists (e.g., ATHENA), render Unicode symbol
  if (!fileName) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-3xl opacity-70">⊕</span>
      </div>
    );
  }

  const logoUrl = `${LOGO_BASE_URL}/${fileName}`;

  return (
    <div
      className={`glitch-logo-container ${className}`}
      style={
        {
          "--logo-size": `${size}px`,
          width: size,
          height: size,
          position: "relative",
        } as CSSProperties
      }
    >
      {/* Base layer */}
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className="glitch-logo-base"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      {/* Glitch layer 1 - teal/cyan shift */}
      <img
        src={logoUrl}
        alt=""
        className="glitch-logo-layer-1"
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          opacity: 0,
          filter: "hue-rotate(180deg) saturate(6) brightness(2.5)",
          clipPath: "inset(0 0 66% 0)",
          animation: "logo-glitch-1 5s infinite",
          pointerEvents: "none",
        }}
      />

      {/* Glitch layer 2 - magenta/red shift */}
      <img
        src={logoUrl}
        alt=""
        className="glitch-logo-layer-2"
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 3,
          opacity: 0,
          filter: "hue-rotate(-90deg) saturate(8) brightness(1.8)",
          clipPath: "inset(66% 0 0 0)",
          animation: "logo-glitch-2 5s infinite",
          animationDelay: "0.15s",
          pointerEvents: "none",
        }}
      />

      {/* Shimmer sweep overlay */}
      <div
        className="glitch-logo-shimmer"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          zIndex: 4,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "200%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 48%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.15) 52%, transparent 100%)",
            animation: "logo-shimmer 4s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}
