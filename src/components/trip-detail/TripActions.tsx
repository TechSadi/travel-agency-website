"use client";

import clsx from "clsx";
import { Heart, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";

type TripActionsProps = {
  title: string;
  /** "outline": Save and Share buttons beside the desktop title. "photo": round icon buttons on the mobile gallery. */
  variant: "outline" | "photo";
  className?: string;
};

const photoButton =
  "inline-flex size-11 items-center justify-center rounded-pill bg-white/92 text-ink transition-colors hover:bg-white hover:text-ink";

/** Save (demo toggle, not stored) and Share (system share sheet, or copy the link). */
export function TripActions({ title, variant, className }: TripActionsProps) {
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(""), 2500);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function share() {
    const url = window.location.href.split("#")[0];
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Closing the share sheet rejects; nothing to do.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied");
    } catch {
      setStatus("Could not copy the link");
    }
  }

  const photo = variant === "photo";
  const heart = (
    <Heart size={18} strokeWidth={1.8} aria-hidden="true" className={clsx(saved && "fill-brand text-brand")} />
  );

  return (
    <div className={clsx("relative flex gap-2.5", className)}>
      <button
        type="button"
        aria-pressed={saved}
        aria-label={photo ? `Save ${title}` : undefined}
        onClick={() => setSaved((value) => !value)}
        className={photo ? photoButton : buttonClasses("outline", "sm")}
      >
        {heart}
        {!photo && (saved ? "Saved" : "Save")}
      </button>
      <button
        type="button"
        aria-label={photo ? `Share ${title}` : undefined}
        onClick={share}
        className={photo ? photoButton : buttonClasses("outline", "sm")}
      >
        {photo ? <Share2 size={18} strokeWidth={1.8} aria-hidden="true" /> : "Share"}
      </button>
      <span
        role="status"
        className={clsx(
          "pointer-events-none absolute top-full right-0 mt-2 rounded-control bg-ink px-3 py-1.5 text-[0.88rem] whitespace-nowrap text-white transition-opacity",
          status ? "opacity-100" : "opacity-0",
        )}
      >
        {status}
      </span>
    </div>
  );
}
