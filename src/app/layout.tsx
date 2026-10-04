import type { Metadata } from "next";
import { Jost, Newsreader } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { TopBar } from "@/components/layout/TopBar";
import "./globals.css";

// next/font only allows the opsz axis with the variable weight, which covers 400–600.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Suman Holidays | Tours and travels, Vadodara",
    template: "%s | Suman Holidays",
  },
  description:
    "Family holidays, honeymoons and group tours across India and abroad, planned by one team in Fatehgunj, Vadodara.",
  openGraph: {
    siteName: "Suman Holidays",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${newsreader.variable} ${jost.variable}`}>
      {/* Under 768px the fixed MobileActionBar covers the bottom of the page, so pad by its height. */}
      <body className="flex min-h-dvh flex-col pb-[calc(var(--action-bar-height)+env(safe-area-inset-bottom))] md:pb-0">
        <TopBar />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
