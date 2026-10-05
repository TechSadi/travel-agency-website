/** Client-side access to the motion tokens in globals.css (DESIGN.md section 8). */

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** A motion token's value, e.g. `--ease-out` or `--duration-base`. */
function token(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** A `--duration-*` token in milliseconds. The CSS build may minify `250ms` to `.25s`. */
export function durationToken(name: string) {
  const value = token(name);
  return value.endsWith("ms") ? parseFloat(value) : parseFloat(value) * 1000;
}

/** The site's one ease-out curve, for the Web Animations API. */
export function easeOutToken() {
  return token("--ease-out");
}
