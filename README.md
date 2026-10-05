# Suman Holidays

A front-end demo (proof of concept) of a website for Suman Holidays, a tour and travel agency in Fatehgunj, Vadodara. It shows the agency owner how the finished site could look and work: browsing trips, filtering packages, reading a trip's itinerary, and contacting the office by WhatsApp, phone or enquiry form.

There is no backend, CMS, database or payment. All content is demo data in typed TypeScript files, and forms work only in the browser.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19 and TypeScript
- [Tailwind CSS v4](https://tailwindcss.com). Design tokens live in `@theme` in `src/app/globals.css`
- [lucide-react](https://lucide.dev) for icons, [clsx](https://github.com/lukeed/clsx) for class names
- Newsreader and Jost from Google Fonts, self-hosted through `next/font`

## Running it

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev      # development server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Where the content lives

Every piece of content is in `src/data`. To swap demo content for real content, edit these files. You don't need to touch the components.

| File | What it holds |
|---|---|
| `site.ts` | The real business details: name, address, phone, WhatsApp, email, hours, social links |
| `trips.ts`, `moreTrips.ts` | Packages: prices, itineraries, hotels, departures, inclusions, gallery photos |
| `destinations.ts` | Destinations and regions |
| `reviews.ts` | Customer reviews |
| `home.ts`, `themes.ts` | Home page copy and the travel themes |
| `about.ts`, `team.ts`, `stats.ts` | About and Contact page copy, team and figures |
| `navigation.ts` | Header and footer links |
| `types.ts` | The data model all of the above follows |

Only the details in `site.ts` are real. Trips, prices and team members are made up for the demo. The reviews in `reviews.ts` are real Google reviews of the agency. Photos are in `public/images`.

Prices are stored as numbers. Format them with `formatRupees` from `src/lib/format.ts` (Indian grouping, for example ₹1,49,999).

## Project layout

```
src/
  app/          routes (/, /trips, /trips/[slug], /destinations, /about, /contact),
                plus sitemap.ts, robots.ts and the app icons
  components/   UI components, grouped by page or feature
  data/         all demo content (see above)
  lib/          formatting, enquiry form helpers and SEO helpers
```

`DESIGN.md` is the design spec. The mockups in `design-reference/` are the visual targets.

## SEO and sharing

- Every route sets its title, description, canonical URL, and Open Graph and Twitter card tags through `pageMetadata()` in `src/lib/seo.ts`.
- The root layout outputs `TravelAgency` structured data (JSON-LD) with the office address, phone and opening hours.
- `/sitemap.xml` lists every page and trip. `/robots.txt` allows all crawlers.
- **Set `NEXT_PUBLIC_SITE_URL`** to the live domain when you deploy, for example `NEXT_PUBLIC_SITE_URL=https://www.sumanholidays.com`. Canonical URLs, the sitemap and social cards are built from it. On Vercel it falls back to the project's production domain. Locally it falls back to `http://localhost:3000`.
- The favicon, `icon.png` and `apple-icon.png` in `src/app` are generated from `public/images/logo-mark.png`. If the logo changes, run `node scripts/generate-icons.mjs` again.
