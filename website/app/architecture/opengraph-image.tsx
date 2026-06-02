import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GAIA Code — Architecture";

export default function Image() {
  return renderOg({ title: "ARCHITECTURE", subtitle: "One gate. Three engines. Here's how GAIA Code fits together." });
}
