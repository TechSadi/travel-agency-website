import { ViewTransition, type ReactNode } from "react";

/**
 * A page's <main>, crossfaded when the route changes (the `page-fade` rules in globals.css).
 * Use it in each page.tsx, not the layout: layouts persist, so their enter and exit never run.
 * `default="none"` keeps it still during other transitions, such as the trip photo morph.
 */
export function PageMain({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-fade" exit="page-fade" default="none">
      <main>{children}</main>
    </ViewTransition>
  );
}
