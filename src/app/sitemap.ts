import type { MetadataRoute } from "next";
import { trips } from "@/data/trips";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/trips", priority: 0.9, changeFrequency: "daily" },
    { path: "/destinations", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  ];

  return [
    ...pages.map(({ path, priority, changeFrequency }) => ({ url: absoluteUrl(path), priority, changeFrequency })),
    ...trips.map((trip) => ({
      url: absoluteUrl(`/trips/${trip.slug}`),
      priority: 0.7,
      changeFrequency: "weekly" as const,
    })),
  ];
}
