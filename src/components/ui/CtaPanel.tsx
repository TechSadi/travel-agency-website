import clsx from "clsx";
import type { ReactNode } from "react";

type CtaPanelProps = {
  /** id for the heading, so the panel's section can be labelled by it. */
  id: string;
  title: ReactNode;
  description: ReactNode;
  /** Buttons, laid out in a wrapping row. */
  actions: ReactNode;
  className?: string;
};

/** Dark rounded call-to-action panel with a heading on the left and buttons on the right. */
export function CtaPanel({ id, title, description, actions, className }: CtaPanelProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center justify-between gap-7 rounded-panel bg-ink p-7 text-white sm:p-10",
        className,
      )}
    >
      <div className="max-w-[36rem]">
        <h2 id={id} className="mb-2.5 text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.1] text-white">
          {title}
        </h2>
        <p className="text-topbar-text">{description}</p>
      </div>
      <div className="flex flex-wrap gap-3">{actions}</div>
    </div>
  );
}
