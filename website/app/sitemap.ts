// website/app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { LAST_UPDATED } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED);
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/architecture", priority: 0.8 },
    { path: "/connectors", priority: 0.8 },
    { path: "/get-started", priority: 0.9 },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
