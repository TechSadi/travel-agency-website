import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { formatRupees } from "@/lib/format";

// Temporary token test page. Replace with the real Home page.
export const metadata: Metadata = {
  title: "Design tokens",
  robots: { index: false },
};

const colours = [
  { name: "brand", hex: "#DE060F" },
  { name: "brand-dark", hex: "#B3050D" },
  { name: "brand-tint", hex: "#FDEBEC" },
  { name: "ink", hex: "#16202A" },
  { name: "body", hex: "#3D4752" },
  { name: "muted", hex: "#5E6772" },
  { name: "paper", hex: "#F7F5F1" },
  { name: "line", hex: "#E6E1D8" },
  { name: "white", hex: "#FFFFFF" },
  { name: "gold", hex: "#D99A1E" },
  { name: "whatsapp", hex: "#1F8F4E" },
  { name: "whatsapp-tint", hex: "#E7F5EC" },
  { name: "success-tint", hex: "#F1F8F3" },
  { name: "footer-text", hex: "#C5CDD4" },
  { name: "footer-muted", hex: "#9AA6B1" },
  { name: "footer-line", hex: "#2C3846" },
  { name: "footer-social", hex: "#3A4754" },
  { name: "topbar-text", hex: "#D6DCE1" },
];

// Class names are written out in full so Tailwind can detect them.
const swatchClass: Record<string, string> = {
  brand: "bg-brand",
  "brand-dark": "bg-brand-dark",
  "brand-tint": "bg-brand-tint",
  ink: "bg-ink",
  body: "bg-body",
  muted: "bg-muted",
  paper: "bg-paper",
  line: "bg-line",
  white: "bg-white",
  gold: "bg-gold",
  whatsapp: "bg-whatsapp",
  "whatsapp-tint": "bg-whatsapp-tint",
  "success-tint": "bg-success-tint",
  "footer-text": "bg-footer-text",
  "footer-muted": "bg-footer-muted",
  "footer-line": "bg-footer-line",
  "footer-social": "bg-footer-social",
  "topbar-text": "bg-topbar-text",
};

const headingSizes = [
  { token: "text-hero", label: "Home hero h1", className: "text-hero" },
  { token: "text-page", label: "Page h1", className: "text-page" },
  { token: "text-section", label: "Section h2", className: "text-section" },
  { token: "text-subsection", label: "Sub-section h2", className: "text-subsection" },
  { token: "text-card", label: "Card title", className: "text-card" },
  { token: "text-quote", label: "Quote", className: "text-quote" },
];

const variants: ButtonVariant[] = ["primary", "outline", "white", "whatsapp", "ghost-dark"];
const sizes: ButtonSize[] = ["sm", "md", "lg"];

export default function TokenTestPage() {
  return (
    <main className="container-page flex flex-col gap-16 py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-page">Design tokens</h1>
        <p className="text-lead max-w-[36rem] text-body">
          A check page for DESIGN.md section 3. Prices format with Indian grouping: {formatRupees(149999)},{" "}
          {formatRupees(32999)}, {formatRupees(1200000)}.
        </p>
      </header>

      <section aria-labelledby="colours" className="flex flex-col gap-6">
        <h2 id="colours" className="text-section">Colours</h2>
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {colours.map((c) => (
            <li key={c.name} className="overflow-hidden rounded-card border border-line">
              <div className={`h-20 ${swatchClass[c.name]}`} />
              <div className="flex flex-col p-3 text-meta">
                <span className="font-medium text-ink">{c.name}</span>
                <span className="text-muted">{c.hex}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="type" className="flex flex-col gap-6">
        <h2 id="type" className="text-section">Typography</h2>
        <div className="flex flex-col divide-y divide-line rounded-card border border-line">
          {headingSizes.map((h) => (
            <div key={h.token} className="grid gap-4 p-6 md:grid-cols-[200px_1fr]">
              <div className="text-meta text-muted">
                <span className="block font-medium text-ink">{h.label}</span>
                {h.token}
              </div>
              <div className="flex min-w-0 flex-col gap-3">
                <p className={`${h.className} font-serif ${h.token === "text-quote" ? "font-normal" : "font-medium"}`}>
                  Kashmir: Paradise on Earth
                </p>
                <p className={`${h.className} font-sans font-medium`}>Kashmir: Paradise on Earth</p>
              </div>
            </div>
          ))}
          <div className="grid gap-4 p-6 md:grid-cols-[200px_1fr]">
            <div className="text-meta text-muted">
              <span className="block font-medium text-ink">Jost body roles</span>
              lead, copy, meta, price
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lead text-body">Lead: flights, visas, hotels and sightseeing, arranged by one team.</p>
              <p className="text-copy text-body">Body 17px: seats are held for 48 hours with a {formatRupees(5000)} token amount.</p>
              <p className="text-meta text-muted">Meta: 6 nights, 7 days. From Vadodara.</p>
              <p className="flex items-baseline gap-6">
                <span className="text-price font-semibold">{formatRupees(32999)}</span>
                <span className="text-price-lg font-semibold">{formatRupees(149999)}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="buttons" className="flex flex-col gap-6">
        <h2 id="buttons" className="text-section">Buttons</h2>
        <div className="flex flex-col gap-6">
          {variants.map((variant) => (
            <div
              key={variant}
              className={`flex flex-wrap items-center gap-4 rounded-panel p-6 ${
                variant === "ghost-dark" || variant === "white" ? "bg-ink" : "border border-line"
              }`}
            >
              <span className={`w-28 text-meta ${variant === "ghost-dark" || variant === "white" ? "text-footer-text" : "text-muted"}`}>
                {variant}
              </span>
              {sizes.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  Size {size}
                </Button>
              ))}
              <Button variant={variant} size="md" icon={<Phone size={18} strokeWidth={1.8} aria-hidden />}>
                With icon
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="shape" className="flex flex-col gap-6">
        <h2 id="shape" className="text-section">Radius and shadow</h2>
        <div className="grid grid-cols-2 gap-5 bg-paper p-6 md:grid-cols-4">
          <div className="rounded-control border border-line bg-white p-5 text-meta">rounded-control 10px</div>
          <div className="rounded-card border border-line bg-white p-5 text-meta">rounded-card 14px</div>
          <div className="rounded-panel border border-line bg-white p-5 text-meta">rounded-panel 16px</div>
          <div className="rounded-pill border border-line bg-white p-5 text-center text-meta">rounded-pill</div>
          <div className="rounded-panel bg-white p-5 text-meta shadow-panel">shadow-panel</div>
          <div className="rounded-card bg-white p-5 text-meta shadow-float">shadow-float</div>
          <div className="rounded-card bg-white p-5 text-meta shadow-bar">shadow-bar</div>
          <div className="flex items-center rounded-card bg-brand-tint p-5 text-meta text-brand-dark">brand-dark on brand-tint</div>
        </div>
      </section>
    </main>
  );
}
