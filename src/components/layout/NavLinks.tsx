"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

/** The main nav items with the active state from the current route. */
export function NavLinks({ variant, onNavigate, className }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={clsx(variant === "desktop" ? "flex items-center gap-[30px]" : "flex flex-col", className)}>
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
                variant === "desktop"
                  ? "block border-b-2 py-1.5 text-[1rem]"
                  : "flex min-h-14 items-center border-b border-line text-[1.15rem]",
                active ? "font-semibold text-brand" : "font-medium text-ink hover:text-brand",
                variant === "desktop" && (active ? "border-brand" : "border-transparent"),
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
