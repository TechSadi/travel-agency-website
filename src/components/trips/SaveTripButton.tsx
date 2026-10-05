"use client";

import clsx from "clsx";
import { Heart } from "lucide-react";
import { useState } from "react";

type SaveTripButtonProps = {
  tripTitle: string;
  className?: string;
};

/** Round heart toggle on a TripCard image. Demo only: the saved state is not stored. */
export function SaveTripButton({ tripTitle, className }: SaveTripButtonProps) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-label={`Save ${tripTitle}`}
      aria-pressed={saved}
      onClick={() => setSaved((value) => !value)}
      className={clsx(
        "inline-flex size-11 items-center justify-center rounded-pill bg-white/92 transition-colors hover:bg-white",
        saved ? "text-brand" : "text-ink",
        className,
      )}
    >
      <Heart size={18} strokeWidth={1.8} aria-hidden="true" className={clsx(saved && "fill-current")} />
    </button>
  );
}
