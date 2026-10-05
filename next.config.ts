import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF is roughly 20 to 30% smaller than WebP for these photos; browsers without it get WebP.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // The Tailwind stylesheet is about 11 KB gzipped. Inlining it saves the render-blocking
    // request that most visitors (first-timers from search or WhatsApp links) would make.
    inlineCss: true,
  },
};

export default nextConfig;
