import clsx from "clsx";
import type { ReactNode } from "react";

export type BadgeVariant = "white" | "brand" | "paper";

const variantClasses: Record<BadgeVariant, string> = {
  // On photos, e.g. the TripCard image
  white: "bg-white text-ink text-[0.85rem] font-medium",
  // Highlights such as "Bestseller" or "Save ₹4,000"
  brand: "bg-brand-tint text-brand-dark text-[0.88rem] font-medium",
  // Neutral tags such as "Family" or "Honeymoon"
  paper: "bg-paper text-body text-[0.88rem]",
};

type BadgeProps = {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
};

/** Small pill label. */
export function Badge({ variant = "brand", className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-pill px-3 py-[5px] leading-snug whitespace-nowrap",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
