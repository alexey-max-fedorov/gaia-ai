// website/lib/seo.ts
// Central SEO helpers: page metadata + JSON-LD structured-data builders.
import type { Metadata } from "next";
import { SITE, URLS, VERSION, LAST_UPDATED } from "@/lib/site";

export const SITE_URL = SITE.url;

/** Build per-page Metadata with canonical URL, Open Graph, and Twitter card. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string; // e.g. "/architecture" ("" for home)
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: opts.path || "/" },
    openGraph: {
      title: `${opts.title} · ${SITE.name}`,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} · ${SITE.name}`,
      description: opts.description,
    },
  };
}

/** Sitewide Organization entity. */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description: SITE.description,
    sameAs: [URLS.github, URLS.instagram],
  };
}

/** Sitewide WebSite entity. */
export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE_URL,
    description: SITE.description,
  };
}

/** The product itself, as a free SoftwareApplication. */
export function softwareApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Perplexity Spaces (web)",
    softwareVersion: VERSION,
    url: SITE_URL,
    description: SITE.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isAccessibleForFree: true,
    sameAs: [URLS.github],
  };
}

/** Breadcrumb trail. Pass [{name,path}] from root to current page. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

/** FAQPage from a list of {q,a}. */
export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** HowTo (used by the Get Started page). */
export function howToLd(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** A WebPage entity with a freshness (dateModified) signal. */
export function webPageLd(opts: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${opts.title} · ${SITE.name}`,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    inLanguage: "en",
    dateModified: LAST_UPDATED,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE_URL },
  };
}
