import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, faqLd, howToLd, webPageLd } from "@/lib/seo";
import { PAGE_SEO, FAQS, SETUP_STEPS } from "@/lib/site";
import GetStartedClient from "./GetStartedClient";

const seo = PAGE_SEO.getStarted;

export const metadata: Metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/get-started",
  keywords: seo.keywords,
});

export default function GetStartedPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ title: seo.title, description: seo.description, path: "/get-started" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Get Started", path: "/get-started" },
          ]),
          howToLd({
            name: "Deploy GAIA Code in a Perplexity Space",
            description: seo.description,
            steps: SETUP_STEPS.map((s) => ({ name: s.title, text: s.body })),
          }),
          faqLd(FAQS.getStarted),
        ]}
      />
      <GetStartedClient />
    </>
  );
}
