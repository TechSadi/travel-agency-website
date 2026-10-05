import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * Public origin of the site, used for canonical URLs, the sitemap and social cards.
 * Set NEXT_PUBLIC_SITE_URL in production; Vercel deployments fall back to their production domain.
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

/** Absolute URL for a site path. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

/** The image every route shares on social media. */
export const shareImage = {
  url: "/images/hero.jpg",
  width: 2400,
  height: 1350,
  alt: "Snow-covered Himalayan peaks under a clear sky",
};

type PageSeo = {
  /** Page name, shown as "<title> | Suman Holidays". Leave out for the home page. */
  title?: string;
  description: string;
  /** Canonical path, such as "/trips". */
  path: string;
};

/**
 * Title, description, canonical URL, Open Graph and Twitter card for a route.
 * A route's openGraph and twitter objects replace the root layout's whole, so each route sets them in full here.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
  };
}

/** schema.org TravelAgency for the office, from the real details in DESIGN.md section 2. */
export function travelAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": absoluteUrl("/#agency"),
    name: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logo-full.png"),
    image: absoluteUrl(shareImage.url),
    telephone: "+91-99988-88819",
    email: site.email.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.locality}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    },
    // Pin of the Google Maps listing in site.googleReviewsUrl.
    geo: { "@type": "GeoCoordinates", latitude: 22.3240044, longitude: 73.1887347 },
    hasMap: site.mapsUrl,
    // Monday to Saturday, 10 am to 7 pm. Sunday closed (site.hours).
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    sameAs: site.social.map((link) => link.href),
  };
}

/** Serialises JSON-LD for a <script> tag, escaping "<" so the payload cannot close the tag. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
