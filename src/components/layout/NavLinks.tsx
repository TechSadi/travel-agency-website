"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { SlidingIndicator, useSlidingIndicator } from "@/components/ui/SlidingIndicator";
import { mainNav } from "@/data/navigation";

/**
 * Whether a nav item matches the current route. Items with a query string
 * (Group tours) share a pathname with another item, so they never claim the
 * active state from the pathname alone.
 */
export function isActiveHref(pathname: string, href: string): boolean {
  if (href.includes("?")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavLinksProps = {
  variant: "desktop" | "drawer";
  onNavigate?: () => void;
  className?: string;
};

/**
 * The main nav items with the active state from the current route. On desktop the active
 * underline is one bar that slides between items; until it is measured (and without JS)
 * the active link draws its own border instead.
 */
export function NavLinks({ variant, onNavigate, className }: NavLinksProps) {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const desktop = variant === "desktop";
  const indicator = useSlidingIndicator(listRef, pathname, desktop);

  return (
    <ul ref={listRef} className={clsx(desktop ? "relative flex items-center gap-[30px]" : "flex flex-col", className)}>
      {mainNav.map((item) => {
        const active = isActiveHref(pathname, item.href);
        return (
          <li key={item.label}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={clsx(
                "no-underline transition-colors",
                desktop
                  ? "tap-target relative flex min-h-11 items-center border-b-2 text-[1rem]"
                  : "flex min-h-14 items-center border-b border-line text-[1.15rem]",
                active ? "font-semibold text-brand" : "font-medium text-ink hover:text-brand",
                desktop && (active && !indicator ? "border-brand" : "border-transparent"),
                desktop && !active && "link-slide",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
      {desktop && <SlidingIndicator box={indicator} />}
    </ul>
  );
}
