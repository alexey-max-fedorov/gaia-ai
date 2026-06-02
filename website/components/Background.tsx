// website/components/Background.tsx
import { CSSProperties } from "react";

const GRID: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(29,211,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,211,176,0.04) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

export default function Background({
  brackets = false,
  scanlines = false,
  radial = "top",
}: {
  brackets?: boolean;
  scanlines?: boolean;
  radial?: "top" | "center" | "none";
}) {
  return (
    <>
      <div className="absolute inset-0" style={GRID} aria-hidden />
      {radial !== "none" && (
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              radial === "center"
                ? "radial-gradient(ellipse 80% 55% at 50% 42%, #0D2A35 0%, transparent 80%)"
                : "radial-gradient(ellipse 70% 50% at 50% 0%, #0D2A35 0%, #080C18 80%)",
          }}
        />
      )}
      {scanlines && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
            opacity: 0.4,
          }}
        />
      )}
      {brackets &&
        ["top-[72px] left-4", "top-[72px] right-4", "bottom-16 left-4", "bottom-16 right-4"].map((pos, i) => (
          <div
            key={i}
            aria-hidden
            className={`absolute w-8 h-8 md:w-12 md:h-12 border-[#1DD3B0]/20 ${
              i === 0 ? "border-l border-t" : i === 1 ? "border-r border-t" : i === 2 ? "border-l border-b" : "border-r border-b"
            } ${pos}`}
          />
        ))}
    </>
  );
}
