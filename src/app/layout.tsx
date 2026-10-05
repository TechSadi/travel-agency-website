import type { Metadata } from "next";
import { Jost, Newsreader } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { site } from "@/data/site";
import { jsonLdScript, shareImage, siteUrl, travelAgencyJsonLd } from "@/lib/seo";
import "./globals.css";

// next/font only allows the opsz axis with the variable weight, which covers 400–600.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  preload: false,
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Defaults for routes without their own social tags, such as the 404 page; pages use pageMetadata().
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Family holidays, honeymoons and group tours across India and abroad, planned by one team in Fatehgunj, Vadodara.",
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${newsreader.variable} ${jost.variable}`}>
      {/* Under 768px the fixed MobileActionBar covers the bottom of the page, so pad by its height. */}
      <body className="flex min-h-dvh flex-col pb-[calc(var(--action-bar-height)+env(safe-area-inset-bottom))] md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(travelAgencyJsonLd()) }} />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileActionBar />
        <ScrollReveal />
      </body>
    </html>
  );
}
