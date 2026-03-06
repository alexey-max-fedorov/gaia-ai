"use client";

import { useEffect, useRef, CSSProperties } from "react";

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
  const layer1Ref = useRef<HTMLImageElement>(null);
  const layer2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!fileName) return;

    let alive = true;
    let tid: ReturnType<typeof setTimeout>;

    const glitch = () => {
      const l1 = layer1Ref.current;
      const l2 = layer2Ref.current;
      if (!l1 || !l2) return;

      l1.style.opacity = "0.85";
      tid = setTimeout(() => {
        if (!alive) return;
        l1.style.opacity = "0";
        l2.style.opacity = "0.8";
        tid = setTimeout(() => {
          if (!alive) return;
          l2.style.opacity = "0";
          l1.style.opacity = "0.75";
          tid = setTimeout(() => {
            if (!alive) return;
            l1.style.opacity = "0";
            l2.style.opacity = "0.7";
            tid = setTimeout(() => {
              if (!alive) return;
              l2.style.opacity = "0";
              scheduleNext();
            }, 50);
          }, 50);
        }, 50);
      }, 50);
    };

    const scheduleNext = () => {
      const wait = 100 + Math.random() * 3900;
      tid = setTimeout(() => {
        if (!alive) return;
        glitch();
      }, wait);
    };

    scheduleNext();

    return () => {
      alive = false;
      clearTimeout(tid);
    };
  }, [fileName]);

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
        ref={layer1Ref}
        src={logoUrl}
        alt=""
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: "-2px",
          zIndex: 2,
          opacity: 0,
          filter: "hue-rotate(180deg) saturate(6) brightness(2.5)",
          clipPath: "inset(0 0 66% 0)",
          pointerEvents: "none",
        }}
      />

      {/* Glitch layer 2 - magenta/red shift */}
      <img
        ref={layer2Ref}
        src={logoUrl}
        alt=""
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: "2px",
          zIndex: 3,
          opacity: 0,
          filter: "hue-rotate(-90deg) saturate(8) brightness(1.8)",
          clipPath: "inset(66% 0 0 0)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
