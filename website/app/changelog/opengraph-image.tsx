import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GAIA Code — Changelog";

export default function Image() {
  return renderOg({ title: "CHANGELOG", subtitle: "Every GAIA Code release, newest first." });
}
