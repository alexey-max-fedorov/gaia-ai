import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GAIA Code — Connectors";

export default function Image() {
  return renderOg({ title: "CONNECTORS", subtitle: "Wire up GitHub, n8n, and more via Perplexity MCP." });
}
