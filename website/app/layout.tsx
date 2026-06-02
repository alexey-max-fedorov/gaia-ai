import type { Metadata } from "next";
import { Rajdhani, Exo_2, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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
  title: {
    default: "GAIA Code",
    template: "%s · GAIA Code",
  },
  description:
    "Claude Code's workflow inside a Perplexity Space — persistent memory, a plan engine, context-budgeted turns, and a skill engine. Four prompt files, one Space.",
  keywords: ["GAIA Code", "Perplexity", "Perplexity Spaces", "AI coding", "Claude Code", "MCP", "Horizon Zero Dawn"],
  openGraph: {
    title: "GAIA Code",
    description:
      "Claude Code's workflow inside a Perplexity Space: memory, plan, turn, and skill engines.",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
