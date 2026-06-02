import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, faqLd, webPageLd } from "@/lib/seo";
import { PAGE_SEO, FAQS } from "@/lib/site";
import ConnectorsClient from "./ConnectorsClient";

const seo = PAGE_SEO.connectors;

export const metadata: Metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/connectors",
  keywords: seo.keywords,
});

export default function ConnectorsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ title: seo.title, description: seo.description, path: "/connectors" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Connectors", path: "/connectors" },
          ]),
          faqLd(FAQS.connectors),
        ]}
      />
      <ConnectorsClient />
    </>
  );
}
