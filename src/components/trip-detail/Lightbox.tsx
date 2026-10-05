"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { GalleryImage } from "@/data/types";
import { useModalDialog } from "@/lib/useModalDialog";

type LightboxProps = {
  images: GalleryImage[];
  title: string;
  startIndex: number;
  onClose: () => void;
};

const SWIPE_DISTANCE = 50;

const navButton =
  "inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20 hover:text-white";

/**
 * Full-screen photo viewer. Mount it only while open: it locks scroll, traps focus,
 * closes on Escape, steps with the arrow keys or a swipe, and hands focus back to
 * whatever opened it.
 */
export function Lightbox({ images, title, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);
  // Closing plays the fade-out first; onClose (which unmounts this) runs when it ends.
  const [closing, setClosing] = useState(false);
  const close = () => setClosing(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const count = images.length;

  const step = (delta: number) => setIndex((current) => (current + delta + count) % count);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
    // `step` only uses the state setter and `count`, which is fixed while open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // After the effect above, so it records the opener before focus moves into the dialog.
  useModalDialog({ open: true, panelRef, initialFocusRef: closeRef, onDismiss: close });

  function onPointerDown(event: PointerEvent) {
    swipeStart.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: PointerEvent) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
  }

  const image = images[index];

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photos`}
      onAnimationEnd={(event) => {
        if (closing && event.target === event.currentTarget) onClose();
      }}
      className={clsx(
        "fixed inset-0 z-50 flex flex-col bg-ink text-white",
        closing
          ? "animate-[fade-out_var(--duration-fast)_var(--ease-out)_both]"
          : "animate-[fade-in_var(--duration-base)_var(--ease-out)_both]",
      )}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
        <p aria-live="polite" className="text-[0.95rem] text-photo-text">
          <span className="sr-only">Photo </span>
          {index + 1} / {count}
        </p>
        <button ref={closeRef} type="button" aria-label="Close photos" onClick={close} className={navButton}>
          <X size={22} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center gap-3 px-2 pb-4 md:px-6 md:pb-6">
        <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className={`${navButton} max-md:hidden`}>
          <ChevronLeft size={24} strokeWidth={1.8} aria-hidden="true" />
        </button>

        <figure className="flex h-full min-w-0 flex-1 flex-col">
          <div
            className="relative min-h-0 flex-1 touch-pan-y select-none"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipeStart.current = null)}
          >
            <Image
              key={image.src + index}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) calc(100vw - 160px), 100vw"
              draggable={false}
              className="object-contain motion-safe:animate-[photo-in_var(--duration-base)_var(--ease-out)_both]"
            />
          </div>
          <figcaption className="pt-3 text-center text-[0.95rem] text-photo-text">{image.alt}</figcaption>
        </figure>

        <button type="button" aria-label="Next photo" onClick={() => step(1)} className={`${navButton} max-md:hidden`}>
          <ChevronRight size={24} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>

      {/* Phones swipe; these buttons keep the viewer usable without gestures. */}
      <div className="flex justify-center gap-4 pb-[calc(16px+env(safe-area-inset-bottom))] md:hidden">
        <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className={navButton}>
          <ChevronLeft size={24} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next photo" onClick={() => step(1)} className={navButton}>
          <ChevronRight size={24} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
