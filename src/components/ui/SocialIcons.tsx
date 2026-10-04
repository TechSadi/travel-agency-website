import type { ReactNode, SVGProps } from "react";

// lucide-react v1 no longer ships brand icons, so the footer's social glyphs live here.
// Same 24px grid and 1.8 stroke as lucide so they sit alongside it.

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function StrokeIcon({ size = 18, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
    </StrokeIcon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7h.01" />
    </StrokeIcon>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.5v5l4.5-2.5z" />
    </StrokeIcon>
  );
}
