// website/app/robots.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly welcome AI search/answer crawlers so they can cite us.
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "anthropic-ai",
          "Claude-Web",
          "Google-Extended",
          "Bingbot",
          "Applebot-Extended",
        ],
        allow: "/",
      },
      // Block training-only crawler that doesn't drive citations.
      { userAgent: "CCBot", disallow: "/" },
      // Everyone else.
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
