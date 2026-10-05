import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { DestinationSummary } from "@/data/types";
import { formatRupees } from "@/lib/format";
import { destinationHref, tripCountLabel } from "./destinationHref";

type DestinationTileProps = {
  destination: DestinationSummary;
  /**
   * `large` spans two grid rows and uses the bigger name, as Kashmir does on Home.
   * `small` is the 150×200 tile of the phone scroll row in design-reference/mobile-home.html.
   */
  size?: "default" | "large" | "small";
  sizes?: string;
  className?: string;
};

/** Photo tile in the Home destination mosaic: DESIGN.md section 4, design-reference/home.html. */
export function DestinationTile({ destination, size = "default", sizes, className }: DestinationTileProps) {
  const large = size === "large";
  const small = size === "small";
  const price = destination.priceFrom === null ? null : formatRupees(destination.priceFrom);

  return (
    <Link
      href={destinationHref(destination)}
      className={clsx(
        "group card-lift relative block overflow-hidden rounded-card bg-ink text-white no-underline hover:text-white",
        small ? "h-[200px] w-[150px] shrink-0" : "min-h-[260px]",
        large && "md:row-span-2",
        className,
      )}
    >
      {/* The visible name labels the link, so the photo is decorative. */}
      <Image
        src={destination.image}
        alt=""
        fill
        sizes={sizes ?? "(min-width: 1280px) 310px, (min-width: 768px) 33vw, 100vw"}
        className="card-photo object-cover"
      />
      <span aria-hidden="true" className="absolute inset-0 overlay-tile" />
      {small ? (
        <span className="absolute inset-x-3.5 bottom-3 flex flex-col leading-[1.2]">
          <span className="font-serif text-[1.35rem]">{destination.name}</span>
          <span className="text-[0.82rem] text-photo-text">{price === null ? "Custom trips" : `from ${price}`}</span>
        </span>
      ) : (
        <span className="absolute inset-x-[22px] bottom-5 flex flex-col gap-0.5">
          <span className={clsx("font-serif leading-[1.05] font-medium", large ? "text-[2.4rem]" : "text-[1.75rem]")}>
            {destination.name}
          </span>
          <span className="text-[0.95rem] text-photo-text">
            {price === null ? "Custom trips on request" : `${tripCountLabel(destination.tripCount)} from ${price}`}
          </span>
        </span>
      )}
    </Link>
  );
}
