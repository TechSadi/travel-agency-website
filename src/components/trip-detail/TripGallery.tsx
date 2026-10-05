"use client";

import clsx from "clsx";
import { Camera, ChevronLeft } from "lucide-react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { TripPhotoTransition } from "@/components/trips/TripCard";
import type { GalleryImage } from "@/data/types";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Lightbox } from "./Lightbox";
import { TripActions } from "./TripActions";

type TripGalleryProps = {
  /** The first photo morphs from this trip's card photo on the way in. */
  slug: string;
  images: GalleryImage[];
  title: string;
  /** "grid": the desktop 2×2-plus-four mosaic. "carousel": the full-bleed swipeable phone gallery. */
  layout: "grid" | "carousel";
  className?: string;
};

/** Trip photos with a lightbox: DESIGN.md section 5 (desktop) and mobile-trip.html (phones). */
export function TripGallery({ slug, images, title, layout, className }: TripGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Both layouts are in the page (one hidden by CSS), but only the shown one may carry the
  // shared photo name. Matches the md:hidden / md:block wrappers on the trip page.
  const wide = useMediaQuery("(min-width: 768px)", true);
  const active = layout === "grid" ? wide : !wide;
  // On a client navigation, load the shown first photo eagerly, so React holds the photo morph
  // until it has loaded (a lazy image is not waited for). The server render keeps it lazy:
  // the <head> preload already fetches it at the right width.
  const eager = useMediaQuery(layout === "grid" ? "(min-width: 768px)" : "(max-width: 767px)", false);

  return (
    <>
      {layout === "grid" ? (
        <GalleryGrid slug={slug} shared={active} eager={eager} images={images} onOpen={setLightboxIndex} className={className} />
      ) : (
        <GalleryCarousel slug={slug} shared={active} eager={eager} images={images} title={title} onOpen={setLightboxIndex} className={className} />
      )}
      {lightboxIndex !== null && (
        <Lightbox images={images} title={title} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}

type PartProps = { slug: string; shared: boolean; eager: boolean; images: GalleryImage[]; onOpen: (index: number) => void; className?: string };

/**
 * The grid and the phone carousel are both in the page, one hidden by CSS, so their photos stay lazy
 * (a hidden lazy image is never fetched). The first photo, the LCP element, is preloaded from <head>
 * only at the widths where its layout shows.
 */
function preloadFirstPhoto(image: GalleryImage | undefined, sizes: string, media: string) {
  if (!image) return;
  const { props } = getImageProps({ src: image.src, alt: image.alt, fill: true, sizes });
  preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "high", media });
}

// Match the md:hidden / md:block wrappers on the trip page.
const gridSizes = "(min-width: 1280px) 640px, 50vw";
const carouselSizes = "100vw";

const tileButton = "group relative block size-full overflow-hidden bg-paper";
const tileImage = "object-cover transition-transform duration-(--duration-slow) ease-out motion-safe:group-hover:scale-[1.03]";

function GalleryGrid({ slug, shared, eager, images, onOpen, className }: PartProps) {
  const [main, ...rest] = images;
  const small = rest.slice(0, 4);
  preloadFirstPhoto(main, gridSizes, "(min-width: 768px)");

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
        <TripPhotoTransition slug={slug} inactive={shared ? undefined : "grid"}>
          <Image
            src={main.src}
            alt={main.alt}
            fill
            fetchPriority="high"
            loading={eager ? "eager" : undefined}
            sizes={gridSizes}
            className={tileImage}
          />
        </TripPhotoTransition>
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
                className="absolute right-3.5 bottom-3.5 inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-control bg-white px-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-paper"
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

function GalleryCarousel({ slug, shared, eager, images, title, onOpen, className }: PartProps & { title: string }) {
  const [current, setCurrent] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Lazy loading counts sideways distance too, so every slide would download alongside the first
  // (the LCP image). Hold the rest back until the page has loaded or the visitor starts swiping.
  const [showRest, setShowRest] = useState(false);
  const revealRest = () => setShowRest(true);
  preloadFirstPhoto(images[0], carouselSizes, "(max-width: 767px)");

  useEffect(() => {
    if (document.readyState !== "complete") {
      window.addEventListener("load", revealRest, { once: true });
      return () => window.removeEventListener("load", revealRest);
    }
    const timer = setTimeout(revealRest);
    return () => clearTimeout(timer);
  }, []);

  function onScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    revealRest();
    setCurrent(Math.round(scroller.scrollLeft / scroller.clientWidth));
  }

  return (
    <div className={clsx("relative h-[300px] bg-paper sm:h-[380px]", className)}>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        onPointerDown={revealRest}
        onFocus={revealRest}
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
            {index === 0 ? (
              <TripPhotoTransition slug={slug} inactive={shared ? undefined : "carousel"}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  fetchPriority="high"
                  loading={eager ? "eager" : undefined}
                  sizes={carouselSizes}
                  className="object-cover"
                />
              </TripPhotoTransition>
            ) : (
              showRest && <Image src={image.src} alt={image.alt} fill sizes={carouselSizes} className="object-cover" />
            )}
          </button>
        ))}
      </div>

      <Link
        href="/trips"
        aria-label="Back to trips"
        className="absolute top-3 left-3 inline-flex size-11 items-center justify-center rounded-pill bg-white/92 text-ink transition-colors hover:bg-white hover:text-ink"
      >
        <ChevronLeft size={20} strokeWidth={1.8} aria-hidden="true" />
      </Link>
      <div className="absolute top-3 right-3">
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
