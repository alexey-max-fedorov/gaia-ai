import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, webPageLd } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/site";
import ChangelogClient from "./ChangelogClient";

const seo = PAGE_SEO.changelog;

export const metadata: Metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/changelog",
  keywords: seo.keywords,
});

export default function ChangelogPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ title: seo.title, description: seo.description, path: "/changelog" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Changelog", path: "/changelog" },
          ]),
        ]}
      />
      <ChangelogClient />
    </>
  );
}
