import type { Metadata } from "next";
import { CtaBand } from "@/components/home/CtaBand";
import { DestinationMosaic } from "@/components/home/DestinationMosaic";
import { GroupDepartures } from "@/components/home/GroupDepartures";
import { HomeHero } from "@/components/home/HomeHero";
import { OfficeFeatures } from "@/components/home/OfficeFeatures";
import { PopularPackages } from "@/components/home/PopularPackages";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { SearchPanel } from "@/components/home/SearchPanel";
import { TravelThemes } from "@/components/home/TravelThemes";
import { TrustRow } from "@/components/home/TrustRow";
import { Container } from "@/components/ui/Container";
import { destinations } from "@/data/destinations";
import { site } from "@/data/site";
import { getUpcomingDepartures } from "@/data/trips";

// Rebuild daily so "upcoming" departures roll forward.
export const revalidate = 86400;

const description =
  "Family holidays, honeymoons and group tours across India and abroad. Flights, visas, hotels and sightseeing, arranged by one team in Fatehgunj, Vadodara.";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | ${site.tagline}` },
  description,
  openGraph: {
    title: `${site.name} | Holidays planned in Vadodara, remembered everywhere`,
    description,
    images: [{ url: "/images/hero.jpg", alt: "Snow-covered Himalayan peaks under a clear sky" }],
  },
};

const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

/** Months that have a departure, for the search panel's "When" field. */
function departureMonths() {
  const months = [...new Set(getUpcomingDepartures().map((departure) => departure.date.slice(0, 7)))];
  return months.map((value) => ({ value, label: monthLabel.format(new Date(`${value}-01T00:00:00Z`)) }));
}

export default function HomePage() {
  const searchDestinations = destinations.map(({ slug, name, country }) => ({ slug, name, country }));

  return (
    <main>
      <HomeHero />
      <Container className="relative z-10 -mt-16 md:-mt-[84px]">
        <SearchPanel destinations={searchDestinations} months={departureMonths()} />
      </Container>
      <TrustRow />
      <DestinationMosaic />
      <GroupDepartures />
      <PopularPackages />
      <TravelThemes />
      <OfficeFeatures />
      <ReviewsSection />
      <CtaBand />
    </main>
  );
}
