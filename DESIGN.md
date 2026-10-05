# Suman Holidays: design spec

This is the source of truth for how the Suman Holidays demo website looks and behaves. The HTML files in `design-reference/` are static mockups of every screen, and `design-reference/screens/` has a PNG image of each one. Match them visually, but build the site from clean, reusable components; do not paste the mockup markup.

## 1. What this site is

- **Client:** Suman Holidays, a tour and travel agency in Fatehgunj, Vadodara, Gujarat.
- **Audience:** Indian travellers, mostly families, couples and office groups from Gujarat.
- **Purpose of this build:** a front-end demo (proof of concept) to show the agency owner. There is no backend, CMS or payment. All content is demo data in typed TypeScript files, so it is easy to swap for real data later.
- **Main actions we want visitors to take:** WhatsApp the agency, call them, or send an enquiry. Every page must make one of these easy.

## 2. Real business details (use exactly)

| Field | Value |
|---|---|
| Name | Suman Holidays |
| Tagline under logo | Tours and travels, Vadodara |
| Address | GF 03, Blue Diamond Complex, Fatehgunj, Vadodara 390002 |
| Phone and WhatsApp | +91 99988 88819 (`tel:+919998888819`, `https://wa.me/919998888819`) |
| Email | Sumantoursandtravels@gmail.com |
| Hours | Monday to Saturday, 10 am to 7 pm. Sunday closed. |

Everything else (trips, prices, reviews, team, stats like "since 2009") is demo content.

## 3. Design tokens

### Colours

| Token | Hex | Use |
|---|---|---|
| `brand` | `#DE060F` | Primary buttons, active nav, links on hover, icons, accents. Matches the logo exactly. |
| `brand-dark` | `#B3050D` | Hover state of brand, text on `brand-tint` |
| `brand-tint` | `#FDEBEC` | Icon tiles, selected chips, "not included" panel, badges |
| `ink` | `#16202A` | Headings, main text, dark sections, footer background, outline buttons |
| `body` | `#3D4752` | Paragraph text |
| `muted` | `#5E6772` | Secondary text, captions, meta |
| `paper` | `#F7F5F1` | Alternate section background, fact tiles, image placeholders |
| `line` | `#E6E1D8` | Borders and dividers |
| `white` | `#FFFFFF` | Page background, cards |
| `gold` | `#D99A1E` | Star ratings only |
| `whatsapp` | `#1F8F4E` | WhatsApp buttons and icons, "included" check marks |
| `whatsapp-tint` | `#E7F5EC` | WhatsApp icon tile |
| `success-tint` | `#F1F8F3` | "Included" panel background |
| `footer-text` | `#C5CDD4` | Footer body text |
| `footer-muted` | `#9AA6B1` | Footer bottom bar |
| `footer-line` | `#2C3846` | Footer dividers; social button borders use `#3A4754` |

Image overlays for text legibility:
- Home hero: `linear-gradient(90deg, rgba(12,18,26,.82) 0%, rgba(12,18,26,.55) 45%, rgba(12,18,26,.1) 100%)`
- Destination tiles: `linear-gradient(180deg, rgba(10,16,22,0) 45%, rgba(10,16,22,.78) 100%)`
- Full-bleed CTA band: flat `rgba(12,18,26,.62)`

### Typography

Load both fonts from Google Fonts (with `next/font/google` in Next.js):

- **Newsreader** (serif, weights 400, 500, 600, optical sizes 6 to 72): all headings, card titles, quotes, big numbers. Use weight **500**.
- **Jost** (sans, weights 400, 500, 600): body text, navigation, buttons, labels, prices, everything else.

| Role | Font | Size | Line height | Tracking |
|---|---|---|---|---|
| Home hero h1 | Newsreader 500 | `clamp(3rem, 6.4vw, 5.6rem)` | 1.0 | -0.02em |
| Page h1 | Newsreader 500 | `clamp(2.6rem, 5vw, 4rem)` (up to 4.6rem on About and Destinations) | 1.0 | -0.02em |
| Section h2 | Newsreader 500 | `clamp(2.2rem, 3.6vw, 3.25rem)` | 1.06 | -0.015em |
| Sub-section h2 (trip detail) | Newsreader 500 | 2rem | 1.15 | -0.01em |
| Card title | Newsreader 500 | 1.5rem | 1.15 | 0 |
| Quote | Newsreader 400 | 1.3rem | 1.45 | 0 |
| Lead paragraph | Jost 400 | 1.1 to 1.3rem | 1.55 | 0 |
| Body | Jost 400 | 1.0625rem (17px) | 1.6 | 0 |
| Small, meta | Jost 400 | 0.88 to 0.95rem | 1.4 | 0 |
| Price | Jost 600 | 1.45rem (cards), 2rem (booking card) | 1.2 | 0 |

Keep section headings to about 22 characters wide (`max-width: 22ch`) and paragraphs under about 36rem.

### Shape, spacing, shadow

- Radius: **10px** for buttons, inputs and small panels; **14px** for cards and images; **16px** for large panels (search bar, booking card, CTA panels); **999px** for pills, badges and avatars.
- Container: `max-width: 1280px`, horizontal padding 24px.
- Vertical rhythm: sections use `clamp(72px, 9vw, 120px)` top and bottom padding. Grid gaps are 20 to 28px; card inner padding is 20 to 26px.
- Shadows (use sparingly, only on floating elements):
  - Search panel and booking card: `0 24px 48px -24px rgba(22,32,42,.35)`
  - Small floating info card: `0 20px 40px -24px rgba(22,32,42,.4)`
  - Mobile bottom bar: `0 -8px 24px -12px rgba(22,32,42,.25)`
- Cards use a 1px `line` border, not a shadow. On hover (pointer devices only), trip cards and destination tiles lift 4px onto `0 22px 40px -26px rgba(22,32,42,.38)`.

### Icons

Use **lucide-react** with stroke width 1.8. Mapping: phone → `Phone`, email → `Mail`, hours → `Clock`, location → `MapPin`, search → `Search`, dates → `Calendar`, travellers → `Users`, flights → `Plane`, hotels → `BedDouble`, meals → `UtensilsCrossed`, transfers → `Car`, sightseeing → `Camera`, visa → `FileText`, price → `Tag`, support → `Headphones`, safety → `ShieldCheck`, save → `Heart`, check → `Check`, cross → `X`, accordions → `ChevronDown`. WhatsApp needs a custom SVG (the official glyph), coloured `whatsapp`.

## 4. Components

**Button.** Variants: `primary` (brand background, white text), `outline` (transparent, ink 1px border, ink text), `ghost-dark` (for use on photos: white text, white 70% border, 8% white fill), `white` (white background, ink text), `whatsapp` (whatsapp background, white text). Sizes: `sm` 40px high, 16px padding; `md` 48px, 22px padding; `lg` 54px, 28px padding. Jost 500, 1rem, optional leading icon with 10px gap. Never add arrow characters to labels.

**TopBar** (desktop only, hidden under 980px). Ink background, 0.9rem text in `#D6DCE1`: phone, email and hours on the left, address on the right, each with a 15px icon.

**Header.** White, 1px bottom border. Left: logo mark image (48px) plus "Suman Holidays" in Jost 600 1.4rem brand red, with "Tours and travels, Vadodara" below in muted 0.85rem. Centre: nav (Home, Destinations, Trips, Group tours, About, Contact); the active item is brand red, weight 600, with a 2px brand underline. Right: square WhatsApp icon button (48px, line border, green icon) and a "Plan my trip" primary button. Under 980px the nav and buttons hide and a 48px menu button appears, opening a full-width drawer.

**Footer.** Ink background, four columns that wrap: the white logo with a one-line description and round social buttons (Facebook, Instagram, YouTube, WhatsApp); Explore links; Company links; "Visit or call" with the address, phone, email and hours. The bottom bar has the copyright plus Privacy policy, Terms and conditions, and Cancellation policy links.

**TripCard.** White card, line border, 14px radius. Image at 4:3 with an optional badge pill (white, top left) and a round save button (top right). Below the image:
1. location (pin icon) on the left, and star, rating and (review count) on the right
2. title in Newsreader 1.5rem
3. duration with a clock icon
4. up to four inclusions, each with an icon, in muted 0.88rem
5. a divider, then "Starting from" / **₹price** / "per person" on the left and a small outline "View details" button on the right

**DestinationTile.** Photo with the bottom gradient overlay, the name in Newsreader (1.75rem, or 2.4rem for the large tile) and "N trips from ₹X" below. On Home, the first tile spans two rows.

**DepartureRow** (signature component, Home). A row containing:
- a 72px date block (paper background, big day number in Newsreader, "Nov, Sat" below)
- the trip name in Newsreader 1.35rem, with duration and departure city underneath
- the price with "per person, twin sharing"
- a seat status with a coloured dot: brand red when 4 or fewer seats are left, otherwise muted; "Waitlist open" is also allowed
- a "Reserve a seat" button: primary when seats are low, outline otherwise

Rows sit inside one bordered, rounded container separated by 1px lines. Month filter pills sit above.

**FilterPills.** Pill buttons 42 to 44px high. The selected pill has an ink background and white text; the others are white with a line border.

**ReviewCard.** White, line border, 30px padding: 5 gold stars, then the quote in Newsreader, then a 48px initials avatar (brand-tint background, brand-dark text) with the name and "City, trip name".

**SectionHeading.** An h2 plus an optional muted paragraph. Often paired with a right-aligned text link ("All destinations", "View all 48 packages") in a row that wraps.

**SearchPanel** (Home). A white panel with a 16px radius and shadow that overlaps the hero by -84px. Fields: Where to, Kind of trip, When, Travellers, each with a brand-coloured icon label and a paper-background input. A primary "Search trips" button sits at the end.

**Mobile bottom action bar** (screens under 768px, on every page). Fixed to the bottom of the screen: WhatsApp, Call, and "Plan my trip" (primary). On the trip detail page it shows the "From ₹X per person" price on the left and WhatsApp plus "Enquire now" on the right.

## 5. Pages

Routes for the Next.js App Router:

| Route | Reference file |
|---|---|
| `/` | `home.html`, `mobile-home.html` |
| `/destinations` | `destinations.html` |
| `/trips` | `trips.html` |
| `/trips/[slug]` | `trip-kashmir.html`, `mobile-trip.html` |
| `/about` | `about.html` |
| `/contact` | `contact.html` |

### Home, in order
1. TopBar and Header.
2. **Hero:** full-bleed `hero.jpg` with the left-to-right overlay. Contents:
   - a rating pill: "Rated 4.8 by 1,200+ travellers on Google"
   - h1: "Holidays planned in Vadodara, remembered everywhere"
   - a lead paragraph
   - "Explore trips" (primary, large) and "WhatsApp us" (ghost-dark, large) buttons
3. **SearchPanel**, overlapping the hero.
4. **Trust row:** 4 items, each an icon plus text.
5. **"Where will you go next?":** a destination mosaic (Kashmir tall, then Maldives, Dubai, Bali, Greece).
6. **"Group departures from Gujarat":** on a paper background, month pills and 5 DepartureRows, then a note about the ₹5,000 token amount.
7. **"Packages travellers love":** 3 TripCards.
8. **"Travel the way you like":** 4 theme tiles with 4:5 images (Honeymoon, Family holidays, Group tours, Wildlife and adventure).
9. **"One team, from visa to homecoming":** on paper, an office photo with a floating "Visit our office" card, beside 4 icon features.
10. **"What our travellers say":** a 4.8 rating summary and 3 ReviewCards.
11. **Full-bleed CTA band:** `couple-beach.jpg` with "Tell us where you want to go. We'll plan the rest." and WhatsApp plus Call buttons.
12. Footer.

### Trips (`/trips`)
- **Paper title band:** breadcrumb, h1 "Holiday packages", and an intro line.
- **Sidebar of filters, about 280px wide:** Destination checkboxes with counts, Kind of trip, Duration, a two-handle budget range slider, Departure month, and a "Can't find the right trip?" card with a WhatsApp button.
- **Results area:**
  - a bar with the result count, removable active-filter chips (brand-tint), a sort select, and a grid/list toggle
  - a 3-column grid of TripCards
  - pagination
- The filters must work on the client side against the demo data, and the URL should reflect the filters (`?dest=kashmir&type=honeymoon`).

### Trip detail (`/trips/[slug]`)
1. Breadcrumb, then badges (Bestseller, Family, Honeymoon), the h1, and a meta row: stars, rating, review link, and places. Save and Share buttons sit on the right.
2. **Gallery:** a 4-column grid, 2 rows of 230px each. The main image spans 2×2, plus 4 smaller images; the last one has a "View all 24 photos" button that opens a lightbox.
3. **Two columns.** The main column contains:
   - a facts strip (Duration, Starts and ends, Group size, Best time, Flights), each with an icon tile
   - sticky in-page tabs: Overview, Itinerary, Inclusions, Hotels, FAQs, Reviews; clicking scrolls to the section and the tabs track the active one
   - an overview paragraph and highlights with green checks
   - **Day by day:** a vertical timeline with a 2px line, round markers (filled brand for the open day), and an accordion per day; day 1 is open by default
   - Included (success-tint panel) and Not included (brand-tint panel)
   - a hotels table
   - an FAQ accordion
   - 2 reviews

   The sidebar is about 360px wide and sticky on desktop. It holds a booking card with:
   - the "Starting from ₹32,999" price and a "Save ₹4,000" pill
   - departure radio cards (the selected one has a brand border and tint)
   - Adults and Children steppers, with an estimated total that updates live
   - "Send enquiry" (primary) and "Ask on WhatsApp" (outline) buttons
   - a reassurance line

   Below the booking card is a "Talk to a Kashmir expert" card.
4. **"You might also like":** 3 TripCards on paper.

### Destinations
- A hero on `palawan.jpg` with h1 "40 destinations, one travel desk".
- Region pills (All, India, Asia, Middle East, Europe, Africa, Islands) and a search input; both work.
- A 3-column grid of destination cards: a 4:3 image with a trip-count badge, the name and country, and the "from ₹" price.
- A dark rounded CTA panel for custom trips.

### About
- A two-column intro: h1 "A Vadodara travel desk since 2009" and its story, with `office-team.jpg`.
- 4 stats, each with a 2px ink top rule and a big Newsreader number.
- "How we work" on paper: 3 values.
- The team: 4 people with initials tiles.
- A "Come and see us" panel: a photo beside dark text, with Get directions and Call buttons.

### Contact
- A paper band with h1 "Let's plan your next holiday" and 3 contact cards (Call, WhatsApp, Email) with real details.
- **Form**, in the wide column. Fields:
  - name, mobile, email, destination, month, travellers
  - budget radio pills
  - a message box

  Submitting is client-side only: validate the fields, then show a success state. Also offer "Send on WhatsApp", which opens `wa.me` with the form content prefilled.
- **Office card** in the narrow column: a map (an embedded Google Maps iframe for Fatehgunj is fine), the address, a hours table, and parking notes.

## 6. Demo data model (TypeScript)

```ts
type Trip = {
  slug: string; title: string; destinationSlug: string; place: string;
  nights: number; days: number; priceFrom: number; // rupees, integer
  rating: number; reviewCount: number; badge?: 'Bestseller' | 'Honeymoon' | 'Group departure' | 'New';
  types: ('honeymoon' | 'family' | 'group' | 'adventure' | 'beach')[];
  inclusions: string[]; heroImage: string; gallery: string[];
  overview: string; highlights: string[];
  itinerary: { day: number; title: string; description: string; tags?: string[] }[];
  included: string[]; excluded: string[];
  hotels: { city: string; name: string; category: string; nights: number }[];
  faqs: { q: string; a: string }[];
  departures: { date: string; fromCity: string; seatsLeft: number | null; price: number }[];
};
type Destination = { slug: string; name: string; country: string; region: 'India'|'Asia'|'Middle East'|'Europe'|'Africa'|'Islands'; image: string; };
type Review = { name: string; city: string; tripSlug: string; rating: number; quote: string; };
```

Format every price with Indian digit grouping: `new Intl.NumberFormat('en-IN')` gives ₹1,49,999. Show durations as "6 nights, 7 days".

**Demo trips** (copy the titles, places, prices and images from `design-reference/trips.html`):
- Kashmir: Paradise on Earth
- Maldives Overwater Escape
- Dubai City Lights
- Bali Temples and Beaches
- Palawan Island Hopping
- Santorini and Athens
- Kenya Wildlife Safari
- Italian Coast and Rome
- Everest Base Camp Trek

Only the Kashmir page has full content in the mockup. Write similar, believable content for the other eight trips.

**Image files** in `public/images/`: hero, kashmir, maldives-couple, dubai, bali, palawan, santorini, italy, kenya, honeymoon-boat, couple-beach, family, group, office-team and office-desk (all `.jpg`), plus logo-mark, logo-white and logo-full (`.png`).

## 7. Responsive behaviour

- Breakpoints: 640, 768, 980 and 1280px.
- Under 980px: hide the TopBar and the desktop nav, and show the menu button.
- Under 768px:
  - grids collapse to 1 column (2 columns for small tiles where it fits)
  - the Trips filter sidebar becomes a "Filters" button that opens a bottom sheet
  - the trip detail booking card moves below the content, and the bottom action bar replaces it
  - the destination mosaic becomes a horizontal scroll row of 150×200 tiles (see `mobile-home.html`)
  - the departures table becomes stacked rows (see `mobile-home.html`)
  - add bottom padding to the page so the fixed action bar never covers content
- Wide tables scroll inside their own container. The page body must never scroll sideways.

## 8. Quality rules

- **Accessibility:**
  - use real `<button>`, `<a>`, `<label>` and `<input>` elements
  - give icon-only buttons an `aria-label`
  - add a visible focus ring (3px brand outline, 3px offset)
  - ensure colour contrast of at least 4.5:1
  - respect `prefers-reduced-motion`
- **Images:** use `next/image` with explicit `sizes`, add `priority` on the hero, and write meaningful alt text.
- **Motion:** restrained and CSS-first, with no animation libraries. Animate only transform and opacity (accordion height is the one exception), using the duration tokens and one ease-out curve, `cubic-bezier(0.22, 1, 0.36, 1)`. Always respect `prefers-reduced-motion`.
  - Hover and press: cards lift 4px onto a soft shadow and their images ease in to 1.05 over 700ms, card borders darken and titles turn brand, buttons press to 0.98, and links without a resting underline get one that slides in from the left. Gallery tiles keep a quieter 1.03 zoom.
  - Accordions, the mobile menu, the filter sheet and the lightbox animate open and closed. Trip results fade up 12px, 40ms apart, when they change.
  - Page intros on load: the Home hero (rating pill, h1, lead, buttons), the inner-page title bands and the trip header fade up 24px over 750ms, 120ms apart. The Home and Destinations hero photos settle from 1.1 to 1 over 2.4s. The buttons must stay above the fold and the hero photo must stay the fast LCP element.
  - Page transitions: the old page lifts 8px and fades out (250ms) while the new one rises 16px into place (450ms), and a trip card photo morphs into the trip detail gallery over 600ms (React view transitions).
  - Scroll reveals: section headings and card groups only, once. Headings rise out of a mask at their baseline over 900ms, then their text and link fade up; cards fade up 32px over 750ms, 90ms apart, while their photos settle from 1.12 to 1 inside the frame. Never hide content without JS and never animate anything visible on load. No reveals on trip detail sections, forms, the booking card, tables or sticky elements.
  - About stats count up once; the active nav underline and the trip detail tab indicator slide between items.
- **Avoid these:**
  - all-caps eyebrow labels above headings
  - "→" in link text
  - gradient decorations
  - emoji
  - placeholder Lorem Ipsum
- **SEO:** set a page title and description per route, Open Graph tags, and `lang="en-IN"`.
