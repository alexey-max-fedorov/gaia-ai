import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Renders a Horizon-Zero-Dawn-styled 1200x630 OG card. Code-only (no fonts fetched). */
export function renderOg({ title, subtitle }: { title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#080C18",
          backgroundImage:
            "linear-gradient(rgba(29,211,176,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(29,211,176,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          position: "relative",
        }}
      >
        {/* Corner brackets */}
        <div style={{ position: "absolute", top: 48, left: 48, width: 56, height: 56, borderTop: "2px solid rgba(29,211,176,0.5)", borderLeft: "2px solid rgba(29,211,176,0.5)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: 48, right: 48, width: 56, height: 56, borderBottom: "2px solid rgba(29,211,176,0.5)", borderRight: "2px solid rgba(29,211,176,0.5)", display: "flex" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#1DD3B0", fontWeight: 700 }}>
            GAIA · CODE
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: "#E8EAF6", letterSpacing: 4, lineHeight: 1.05 }}>
          {title}
        </div>

        <div style={{ display: "flex", width: 220, height: 4, background: "#1DD3B0", marginTop: 28, marginBottom: 28 }} />

        <div style={{ display: "flex", fontSize: 32, color: "#9AA7BE", maxWidth: 900, lineHeight: 1.35 }}>
          {subtitle}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
