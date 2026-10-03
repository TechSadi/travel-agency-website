import type { Metadata } from "next";
import { Jost, Newsreader } from "next/font/google";
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
      <body>{children}</body>
    </html>
  );
}
