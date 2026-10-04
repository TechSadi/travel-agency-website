import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type EmptyStateProps = {
  onClear: () => void;
  whatsappHref: string;
  title?: string;
  description?: string;
};

/** Shown when no trip matches the filters: clear them, or ask the office for a custom trip. */
export function EmptyState({
  onClear,
  whatsappHref,
  title = "No trips match those filters",
  description = "Try removing a filter or two. Or tell us what you have in mind and we will put a trip together for you.",
}: EmptyStateProps) {
  return (
    <div className="rounded-panel border border-line px-6 py-12 text-center md:px-10 md:py-16">
      <h2 className="text-subsection">{title}</h2>
      <p className="mx-auto mt-3 max-w-[30rem] text-muted">{description}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button variant="outline" onClick={onClear}>
          Clear filters
        </Button>
        <Button
          href={whatsappHref}
          variant="whatsapp"
          icon={<WhatsAppIcon size={20} />}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp us
        </Button>
      </div>
    </div>
  );
}
