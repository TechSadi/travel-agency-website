"use client";

import clsx from "clsx";
import { Camera, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { GalleryImage } from "@/data/types";
import { Lightbox } from "./Lightbox";
import { TripActions } from "./TripActions";

type TripGalleryProps = {
  images: GalleryImage[];
  title: string;
  /** "grid": the desktop 2×2-plus-four mosaic. "carousel": the full-bleed swipeable phone gallery. */
  layout: "grid" | "carousel";
  className?: string;
};

/** Trip photos with a lightbox: DESIGN.md section 5 (desktop) and mobile-trip.html (phones). */
export function TripGallery({ images, title, layout, className }: TripGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {layout === "grid" ? (
        <GalleryGrid images={images} onOpen={setLightboxIndex} className={className} />
      ) : (
        <GalleryCarousel images={images} title={title} onOpen={setLightboxIndex} className={className} />
      )}
      {lightboxIndex !== null && (
        <Lightbox images={images} title={title} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}

type PartProps = { images: GalleryImage[]; onOpen: (index: number) => void; className?: string };

const tileButton = "group relative block size-full overflow-hidden bg-paper";
const tileImage = "object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]";

function GalleryGrid({ images, onOpen, className }: PartProps) {
  const [main, ...rest] = images;
  const small = rest.slice(0, 4);

  return (
    <div
      className={clsx(
        "grid grid-cols-4 grid-rows-[230px_230px] gap-3 overflow-hidden rounded-panel",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(0)}
        aria-label={`Open photo 1 of ${images.length}: ${main.alt}`}
        className={clsx(tileButton, "col-span-2 row-span-2")}
      >
        <Image src={main.src} alt={main.alt} fill priority sizes="(min-width: 1280px) 640px, 50vw" className={tileImage} />
      </button>
      {small.map((image, i) => {
        const index = i + 1;
        const last = i === small.length - 1;
        return (
          <div key={image.src} className="relative">
            <button
              type="button"
              onClick={() => onOpen(index)}
              aria-label={`Open photo ${index + 1} of ${images.length}: ${image.alt}`}
              className={tileButton}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1280px) 320px, 25vw" className={tileImage} />
            </button>
            {last && (
              <button
                type="button"
                onClick={() => onOpen(0)}
                className="absolute right-3.5 bottom-3.5 inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-control bg-white px-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-paper"
              >
                <Camera size={16} strokeWidth={1.8} aria-hidden="true" />
                <span className="max-lg:sr-only">View all&nbsp;</span>
                {images.length} photos
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function GalleryCarousel({ images, title, onOpen, className }: PartProps & { title: string }) {
  const [current, setCurrent] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  function onScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setCurrent(Math.round(scroller.scrollLeft / scroller.clientWidth));
  }

  return (
    <div className={clsx("relative h-[300px] bg-paper sm:h-[380px]", className)}>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        aria-label={`${title} photos`}
        role="region"
        className="scrollbar-none flex size-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => onOpen(index)}
            aria-label={`Open photo ${index + 1} of ${images.length}: ${image.alt}`}
            className="relative size-full shrink-0 snap-start snap-always"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <Link
        href="/trips"
        aria-label="Back to trips"
        className="absolute top-3.5 left-3.5 inline-flex size-10 items-center justify-center rounded-pill bg-white/92 text-ink transition-colors hover:bg-white hover:text-ink"
      >
        <ChevronLeft size={20} strokeWidth={1.8} aria-hidden="true" />
      </Link>
      <div className="absolute top-3.5 right-3.5">
        <TripActions title={title} variant="photo" />
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 bottom-3.5 rounded-pill bg-ink/70 px-3 py-[5px] text-[0.85rem] text-white"
      >
        {current + 1} / {images.length}
      </span>
    </div>
  );
}
