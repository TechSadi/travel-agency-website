"use client";

import { useSyncExternalStore } from "react";

/**
 * Whether a media query matches. The server render and hydration use `serverValue`,
 * then the real value takes over, so there is no hydration mismatch.
 */
export function useMediaQuery(query: string, serverValue: boolean) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
