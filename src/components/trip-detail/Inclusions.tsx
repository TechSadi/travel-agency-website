import { Check, X } from "lucide-react";

type InclusionsProps = { included: string[]; excluded: string[] };

/** "Included" (success tint, green checks) and "Not included" (brand tint, red crosses) panels. */
export function Inclusions({ included, excluded }: InclusionsProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4 md:gap-6">
      <Panel title="Included" items={included} tone="included" />
      <Panel title="Not included" items={excluded} tone="excluded" />
    </div>
  );
}

function Panel({ title, items, tone }: { title: string; items: string[]; tone: "included" | "excluded" }) {
  const included = tone === "included";
  const Icon = included ? Check : X;
  return (
    <div className={`rounded-card p-5 md:p-6 ${included ? "bg-success-tint" : "bg-brand-tint"}`}>
      <h3 className="mb-3 font-sans text-[1.05rem] font-semibold md:mb-3.5 md:text-[1.1rem]">{title}</h3>
      <ul className="flex flex-col gap-2 text-[0.95rem] md:gap-2.5 md:text-copy">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Icon
              size={20}
              strokeWidth={2.2}
              aria-hidden="true"
              className={`mt-[0.15em] shrink-0 ${included ? "text-whatsapp" : "text-brand"}`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
