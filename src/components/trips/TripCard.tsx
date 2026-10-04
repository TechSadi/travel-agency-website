import clsx from "clsx";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import type { TripCardData } from "@/data/tripList";
import type { Trip } from "@/data/types";
import { formatDuration, formatRupees } from "@/lib/format";
import { inclusionIcons } from "./inclusionIcons";
import { SaveTripButton } from "./SaveTripButton";

type TripCardProps = {
  /** Card fields only; build them with `toTripCardData` from src/data/tripList.ts. */
  trip: TripCardData;
  /** "list" is the horizontal variant for the trips list view (stacked again under 640px). */
  layout?: "grid" | "list";
  /** next/image `sizes`; the default suits a 3-column grid inside the 1280px container. */
  sizes?: string;
  className?: string;
};

const GRID_SIZES = "(min-width: 1280px) 410px, (min-width: 980px) 33vw, (min-width: 640px) 50vw, 100vw";
const LIST_SIZES = "(min-width: 1280px) 360px, (min-width: 640px) 38vw, 100vw";

export function tripHref(trip: Pick<Trip, "slug">) {
  return `/trips/${trip.slug}`;
}

/** Package card: DESIGN.md section 4, design-reference/trips.html. */
export function TripCard({ trip, layout = "grid", sizes, className }: TripCardProps) {
  const href = tripHref(trip);
  const list = layout === "list";

  return (
    <article
      className={clsx(
        "group flex flex-col overflow-hidden rounded-card border border-line bg-white",
        list && "sm:flex-row",
        className,
      )}
    >
      <div
        className={clsx(
          "relative aspect-[4/3] overflow-hidden bg-paper",
          list && "sm:aspect-auto sm:min-h-[248px] sm:w-[38%] sm:shrink-0",
        )}
      >
        <Image
          src={trip.heroImage}
          alt={trip.imageAlt}
          fill
          sizes={sizes ?? (list ? LIST_SIZES : GRID_SIZES)}
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        />
        {trip.badge && (
          <Badge variant="white" className="absolute top-3.5 left-3.5">
            {trip.badge}
          </Badge>
        )}
        <SaveTripButton tripTitle={trip.title} className="absolute top-3 right-3" />
      </div>

      <div className={clsx("flex flex-1 flex-col gap-2.5 px-5 pt-5 pb-[22px]", list && "sm:px-6 sm:pt-[22px]")}>
        <div className="flex items-center justify-between gap-2.5 text-[0.92rem] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
            {trip.place}
          </span>
          <StarRating rating={trip.rating} stars={1} reviewCount={trip.reviewCount} />
        </div>

        <h3 className="text-card">
          <Link href={href} className="text-ink no-underline transition-colors hover:text-brand-dark">
            {trip.title}
          </Link>
        </h3>

        <span className="inline-flex items-center gap-2 text-[0.95rem] text-body">
          <Clock size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-muted" />
          {formatDuration(trip.nights, trip.days)}
        </span>

        <ul aria-label="Included" className="flex flex-wrap gap-x-4 gap-y-1.5 text-[0.88rem] text-muted">
          {trip.inclusions.slice(0, 4).map((inclusion) => {
            const Icon = inclusionIcons[inclusion];
            return (
              <li key={inclusion} className="inline-flex items-center gap-1.5">
                <Icon size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                {inclusion}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
          <p className="flex flex-col leading-[1.2]">
            <span className="text-[0.85rem] text-muted">Starting from</span>
            <span className="text-price font-semibold text-ink">{formatRupees(trip.priceFrom)}</span>
            <span className="text-[0.82rem] text-muted">per person</span>
          </p>
          <Button href={href} variant="outline" size="sm">
            View details<span className="sr-only">: {trip.title}</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
