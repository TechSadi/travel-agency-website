import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { StarRating } from "@/components/ui/StarRating";
import type { Trip, TripType } from "@/data/types";
import { TripActions } from "./TripActions";

const typeLabels: Record<TripType, string> = {
  honeymoon: "Honeymoon",
  family: "Family",
  group: "Group",
  adventure: "Adventure",
  beach: "Beach",
};

type TripHeaderProps = {
  trip: Trip;
  /** Short name for the breadcrumb, e.g. "Kashmir". */
  crumb: string;
  /** Whether the page has a Reviews section to link to. */
  hasReviews: boolean;
};

/** Breadcrumb, badges, h1 and meta row above the gallery (desktop) or below it (mobile). */
export function TripHeader({ trip, crumb, hasReviews }: TripHeaderProps) {
  // The badge comes first; skip a type that repeats it ("Honeymoon" badge on a honeymoon trip).
  const types = trip.types.filter((type) => typeLabels[type] !== trip.badge).slice(0, 2);

  return (
    <div>
      <div className="hidden md:block">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Trips", href: "/trips" }, { label: crumb }]} />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-5 md:mt-[18px]">
        <div>
          <div className="intro mb-2.5 flex flex-wrap gap-2 md:mb-3">
            {trip.badge && <Badge variant="brand">{trip.badge}</Badge>}
            {types.map((type) => (
              <Badge key={type} variant="paper">
                {typeLabels[type]}
              </Badge>
            ))}
          </div>
          {/* Capped by viewport height, so the gallery starts higher on short laptop screens. */}
          <h1 className="intro intro-2 text-[2.2rem] leading-[1.05] tracking-[-0.01em] md:text-[clamp(2.4rem,min(4.4vw,8vh),3.6rem)] md:leading-none md:tracking-[-0.02em]">{trip.title}</h1>
          <div className="intro intro-3 mt-2.5 flex flex-wrap items-center gap-x-[22px] gap-y-2 text-[0.95rem] text-body md:mt-3.5 md:text-copy">
            <span className="inline-flex items-center gap-2">
              <StarRating rating={trip.rating} size={15} />
              {hasReviews ? (
                <a href="#reviews" className="tap-target relative text-muted underline-offset-4 md:underline">
                  {trip.reviewCount} reviews
                </a>
              ) : (
                <span className="text-muted">{trip.reviewCount} reviews</span>
              )}
            </span>
            <span className="hidden items-center gap-1.5 md:inline-flex">
              <MapPin size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-muted" />
              {trip.stops.join(", ")}
            </span>
          </div>
        </div>
        <TripActions title={trip.title} variant="outline" className="hidden md:flex" />
      </div>
    </div>
  );
}
