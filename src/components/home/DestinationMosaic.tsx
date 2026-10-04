import { DestinationTile } from "@/components/destinations/DestinationTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDestinationSummaries } from "@/data/destinations";
import { homeMosaic, homeMosaicLabels, homeMosaicMobileExtra } from "@/data/home";
import type { DestinationSummary } from "@/data/types";
import { HomeSection, mobileTitle } from "./HomeSection";

function pick(summaries: DestinationSummary[], slugs: string[]) {
  return slugs.flatMap((slug) =>
    summaries
      .filter((destination) => destination.slug === slug)
      .map((destination) => ({ ...destination, name: homeMosaicLabels[slug] ?? destination.name })),
  );
}

/**
 * "Where will you go next?": a mosaic with a tall first tile from 768px, and a
 * horizontal snap-scroll row of 150×200 tiles on phones (DESIGN.md section 7).
 */
export function DestinationMosaic() {
  const summaries = getDestinationSummaries();
  const [first, ...rest] = pick(summaries, homeMosaic);
  const mobile = pick(summaries, [...homeMosaic, ...homeMosaicMobileExtra]);

  return (
    <HomeSection labelledBy="home-destinations">
      <SectionHeading
        id="home-destinations"
        titleClassName={mobileTitle}
        className="max-md:mb-[18px] max-md:flex-nowrap max-md:items-baseline"
        title={
          <>
            <span className="md:hidden">Where next?</span>
            <span className="max-md:hidden">Where will you go next?</span>
          </>
        }
        description="From houseboats on Dal Lake to overwater villas in the Maldives."
        descriptionClassName="max-md:hidden"
        link={{
          href: "/destinations",
          label: (
            <>
              <span className="text-[0.95rem] md:hidden">See all</span>
              <span className="max-md:hidden">All destinations</span>
            </>
          ),
        }}
      />

      {/* Phones: horizontal scroll row that bleeds to the screen edges. */}
      <ul
        aria-label="Destinations"
        className="-mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] scrollbar-none md:hidden"
      >
        {mobile.map((destination) => (
          <li key={destination.slug} className="snap-start">
            <DestinationTile destination={destination} size="small" sizes="150px" />
          </li>
        ))}
      </ul>

      {/* Tablet and desktop: mosaic. */}
      <ul className="hidden auto-rows-[270px] grid-cols-3 gap-5 md:grid lg:grid-cols-4">
        {first && (
          <li className="row-span-2 grid">
            <DestinationTile destination={first} size="large" sizes="(min-width: 1280px) 310px, (min-width: 980px) 25vw, 33vw" />
          </li>
        )}
        {rest.map((destination) => (
          <li key={destination.slug} className="grid">
            <DestinationTile destination={destination} sizes="(min-width: 1280px) 310px, (min-width: 980px) 25vw, 33vw" />
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
