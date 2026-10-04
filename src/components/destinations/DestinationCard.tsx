import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { DestinationSummary } from "@/data/types";
import { formatRupees } from "@/lib/format";
import { destinationHref, tripCountLabel } from "./destinationHref";

type DestinationCardProps = {
  destination: DestinationSummary;
  sizes?: string;
  className?: string;
};

/** Destinations grid card: DESIGN.md section 5, design-reference/destinations.html. */
export function DestinationCard({ destination, sizes, className }: DestinationCardProps) {
  return (
    <Link
      href={destinationHref(destination)}
      className={clsx("group flex flex-col gap-3.5 text-ink no-underline hover:text-ink", className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-paper">
        {/* The visible name labels the link, so the photo is decorative. */}
        <Image
          src={destination.image}
          alt=""
          fill
          sizes={sizes ?? "(min-width: 1280px) 410px, (min-width: 980px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        />
        <Badge variant="white" className="absolute top-3.5 left-3.5">
          {destination.tripCount > 0 ? tripCountLabel(destination.tripCount) : "Custom trips"}
        </Badge>
      </div>

      <div className="flex items-end justify-between gap-3">
        <span className="flex flex-col leading-[1.25]">
          <span className="font-serif text-[1.6rem] font-medium">{destination.name}</span>
          <span className="text-[0.95rem] text-muted">{destination.country}</span>
        </span>
        {destination.priceFrom !== null && (
          <span className="flex shrink-0 flex-col items-end leading-[1.25]">
            <span className="text-[0.85rem] text-muted">from</span>
            <span className="font-semibold">{formatRupees(destination.priceFrom)}</span>
          </span>
        )}
      </div>
    </Link>
  );
}
