import type { Metadata } from "next";
import { Rajdhani, Exo_2, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SITE_URL, organizationLd, websiteLd, softwareApplicationLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo2",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GAIA Code — Claude Code's workflow inside a Perplexity Space",
    template: "%s · GAIA Code",
  },
  description: SITE.description,
  keywords: [
    "GAIA Code",
    "Perplexity",
    "Perplexity Spaces",
    "AI coding",
    "Claude Code",
    "Claude Code alternative",
    "MCP",
    "Model Context Protocol",
    "prompt system",
    "Horizon Zero Dawn",
  ],
  alternates: { canonical: "/" },
  applicationName: SITE.name,
  authors: [{ name: "Alexey Fedorov" }],
  creator: "Alexey Fedorov",
  openGraph: {
    title: "GAIA Code",
    description: SITE.description,
    url: SITE_URL,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAIA Code",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} ${exo2.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <JsonLd data={[organizationLd(), websiteLd(), softwareApplicationLd()]} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
