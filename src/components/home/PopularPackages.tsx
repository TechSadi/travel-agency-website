import Link from "next/link";
import { TripCard } from "@/components/trips/TripCard";
import { toTripCardData } from "@/data/tripList";
import { buttonClasses } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trips } from "@/data/trips";
import { HomeSection, mobileSnapItem, mobileSnapRow, mobileTitle } from "./HomeSection";

/** "Packages travellers love": the three trips with the most reviews. */
export function PopularPackages() {
  const popular = [...trips].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 3);
  const viewAll = `View all ${trips.length} packages`;

  return (
    <HomeSection labelledBy="home-packages" containerClassName="max-md:py-10">
      <SectionHeading
        id="home-packages"
        titleClassName={mobileTitle}
        className="max-md:mb-[18px]"
        title="Packages travellers love"
        description="Ready-made itineraries you can book as they are, or change to suit your dates and budget."
        descriptionClassName="max-md:hidden"
        link={{ href: "/trips", label: viewAll }}
        linkClassName="max-md:hidden"
      />
      <div className={`grid gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-3 ${mobileSnapRow}`}>
        {popular.map((trip) => (
          <TripCard key={trip.slug} trip={toTripCardData(trip)} className={mobileSnapItem} />
        ))}
      </div>
      {/* Phones: the heading link is hidden, so offer the full list under the cards, like "See all departures". */}
      <Link href="/trips" className={buttonClasses("outline", "md", "mt-5 w-full md:hidden")}>
        {viewAll}
      </Link>
    </HomeSection>
  );
}
