import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { DestinationSummary } from "@/data/types";
import { formatRupees } from "@/lib/format";
import { destinationHref, tripCountLabel } from "./destinationHref";

type DestinationTileProps = {
  destination: DestinationSummary;
  /** `large` spans two grid rows and uses the bigger name, as Kashmir does on Home. */
  size?: "default" | "large";
  sizes?: string;
  className?: string;
};

/** Photo tile in the Home destination mosaic: DESIGN.md section 4, design-reference/home.html. */
export function DestinationTile({ destination, size = "default", sizes, className }: DestinationTileProps) {
  const large = size === "large";

  return (
    <Link
      href={destinationHref(destination)}
      className={clsx(
        "group relative block min-h-[260px] overflow-hidden rounded-card bg-ink text-white no-underline hover:text-white",
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
        className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
      />
      <span aria-hidden="true" className="absolute inset-0 overlay-tile" />
      <span className="absolute inset-x-[22px] bottom-5 flex flex-col gap-0.5">
        <span className={clsx("font-serif leading-[1.05] font-medium", large ? "text-[2.4rem]" : "text-[1.75rem]")}>
          {destination.name}
        </span>
        <span className="text-[0.95rem] text-photo-text">
          {destination.priceFrom === null
            ? "Custom trips on request"
            : `${tripCountLabel(destination.tripCount)} from ${formatRupees(destination.priceFrom)}`}
        </span>
      </span>
    </Link>
  );
}
