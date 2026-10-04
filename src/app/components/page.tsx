import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DepartureList } from "@/components/departures/DepartureList";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { DestinationTile } from "@/components/destinations/DestinationTile";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ThemeTile } from "@/components/themes/ThemeTile";
import { TripCard } from "@/components/trips/TripCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDestinationSummaries } from "@/data/destinations";
import { reviews } from "@/data/reviews";
import { themes } from "@/data/themes";
import { getUpcomingDepartures, trips, type UpcomingDeparture } from "@/data/trips";

// Temporary review page for the content components. Delete once the real pages use them.
export const metadata: Metadata = {
  title: "Components",
  description: "Review page for the Suman Holidays content components.",
  robots: { index: false },
};

const summaries = getDestinationSummaries();
const bySlug = (slug: string) => summaries.find((destination) => destination.slug === slug)!;

// Same tiles and order as the Home mosaic in design-reference/home.html.
const mosaic = ["maldives", "dubai", "bali", "santorini"].map(bySlug);

// The five departures shown on Home in the mockup, to compare row by row.
const mockupDepartures: [slug: string, date: string][] = [
  ["dubai-city-lights", "2026-11-14"],
  ["kashmir-paradise-on-earth", "2026-11-22"],
  ["bali-temples-and-beaches", "2026-12-05"],
  ["everest-base-camp-trek", "2026-12-19"],
  ["maldives-overwater-escape", "2026-12-26"],
];
const allDepartures = getUpcomingDepartures({ from: "2026-11-01" });
const homeDepartures = mockupDepartures
  .map(([slug, date]) => allDepartures.find((d) => d.trip.slug === slug && d.date === date))
  .filter((d): d is UpcomingDeparture => d !== undefined);

function Section({ title, description, paper, children }: {
  title: string;
  description: string;
  paper?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={paper ? "bg-paper" : undefined}>
      <Container className="py-[clamp(72px,9vw,120px)]">
        <SectionHeading title={title} description={description} />
        {children}
      </Container>
    </section>
  );
}

export default function ComponentsPage() {
  return (
    <main>
      <Section title="TripCard" description="Three cards in the Home grid, then the rest of the demo trips.">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-7">
          {trips.map((trip) => (
            <TripCard key={trip.slug} trip={trip} />
          ))}
        </div>
      </Section>

      <Section title="DestinationTile" description="The Home mosaic, with Kashmir as the large tile spanning two rows.">
        <div className="grid auto-rows-[270px] grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
          <DestinationTile destination={bySlug("kashmir")} size="large" />
          {mosaic.map((destination) => (
            <DestinationTile key={destination.slug} destination={destination} />
          ))}
        </div>
      </Section>

      <Section
        paper
        title="DepartureRow and DepartureList"
        description="The five Home departures. Four or fewer seats turn red; a full departure shows Waitlist open."
      >
        <DepartureList departures={homeDepartures} label="Upcoming group departures" />
      </Section>

      <Section title="DestinationCard" description="Every demo destination, as on the Destinations page.">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-x-7 gap-y-10">
          {summaries.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </Section>

      <Section title="ThemeTile" description="The four Travel the way you like tiles.">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6">
          {themes.map((theme) => (
            <ThemeTile key={theme.type} theme={theme} />
          ))}
        </div>
      </Section>

      <Section title="ReviewCard" description="All demo reviews. The last one is rated 4, so one star is unfilled.">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </Section>
    </main>
  );
}
