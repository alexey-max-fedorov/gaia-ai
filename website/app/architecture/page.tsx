import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, faqLd, webPageLd } from "@/lib/seo";
import { PAGE_SEO, FAQS } from "@/lib/site";
import ArchitectureClient from "./ArchitectureClient";

const seo = PAGE_SEO.architecture;

export const metadata: Metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/architecture",
  keywords: seo.keywords,
});

export default function ArchitecturePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ title: seo.title, description: seo.description, path: "/architecture" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Architecture", path: "/architecture" },
          ]),
          faqLd(FAQS.architecture),
        ]}
      />
      <ArchitectureClient />
    </>
  );
}
