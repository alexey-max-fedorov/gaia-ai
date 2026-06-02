import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GAIA Code — Claude Code's workflow inside a Perplexity Space";

export default function Image() {
  return renderOg({ title: "GAIA CODE", subtitle: "Claude Code's workflow, inside a Perplexity Space." });
}
