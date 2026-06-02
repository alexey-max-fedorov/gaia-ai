import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GAIA Code — Get Started";

export default function Image() {
  return renderOg({ title: "GET STARTED", subtitle: "Deploy GAIA Code in your Perplexity Space in ~2 minutes." });
}
