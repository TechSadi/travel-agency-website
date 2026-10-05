"use client";

import clsx from "clsx";
import { Clock, Menu, Phone, X } from "lucide-react";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { planTripHref } from "@/data/navigation";
import { site } from "@/data/site";
import { useModalDialog } from "@/lib/useModalDialog";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

const DESKTOP_QUERY = "(min-width: 980px)";

const iconButton =
  "inline-flex size-12 shrink-0 items-center justify-center rounded-control border border-line bg-white text-ink transition-colors hover:border-ink";

const noopSubscribe = () => () => {};

/** Menu button plus the slide-down drawer shown under 980px. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // The drawer is portalled into <body>, which only exists on the client.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // Closing from inside the drawer (Escape, close button, backdrop) returns focus to the menu button.
  const closeAndRestoreFocus = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Following a link just closes; the new page takes focus.
  const closeOnNavigate = useCallback(() => setOpen(false), []);

  useModalDialog({
    open,
    panelRef,
    initialFocusRef: closeButtonRef,
    onDismiss: closeAndRestoreFocus,
    autoCloseQuery: DESKTOP_QUERY,
    onAutoClose: closeOnNavigate,
  });

  const drawer = (
    <>
      <div
        aria-hidden="true"
        onClick={closeAndRestoreFocus}
        className={clsx(
          "fixed inset-0 z-40 bg-ink/55 transition-opacity duration-(--duration-base) ease-out lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto border-b border-line bg-white shadow-panel lg:hidden",
          // Visibility flips at once on open (so focus can move in) and only after the slide on close.
          "duration-(--duration-base) ease-out",
          open ? "visible translate-y-0 transition-[translate]" : "invisible -translate-y-full transition-[translate,visibility]",
        )}
      >
        <Container className="flex items-center justify-between gap-6 border-b border-line py-3.5">
          <Logo onClick={closeOnNavigate} />
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu"
            onClick={closeAndRestoreFocus}
            className={iconButton}
          >
            <X size={22} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </Container>

        <Container className="pt-2 pb-7">
          <nav aria-label="Main">
            <NavLinks variant="drawer" onNavigate={closeOnNavigate} />
          </nav>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button href={planTripHref} size="lg" onClick={closeOnNavigate}>
              Plan my trip
            </Button>
            <Button
              href={site.whatsapp.href}
              variant="whatsapp"
              size="lg"
              icon={<WhatsAppIcon size={20} />}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </Button>
          </div>

          <ul className="mt-6 flex flex-col gap-2 text-[0.95rem] text-muted">
            <li>
              <a href={site.phone.href} className="inline-flex min-h-11 items-center gap-2.5 text-ink no-underline">
                <Phone size={16} strokeWidth={1.8} aria-hidden="true" className="text-brand" />
                {site.phone.display}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={16} strokeWidth={1.8} aria-hidden="true" className="mt-[3px] shrink-0 text-brand" />
              {site.hours.full}
            </li>
          </ul>
        </Container>
      </div>
    </>
  );

  return (
    <div className="lg:hidden">
      <button
        ref={menuButtonRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className={iconButton}
      >
        <Menu size={22} strokeWidth={1.8} aria-hidden="true" />
      </button>

      {/*
        Portalled out of the header: its view-transition-name makes it a stacking context,
        which would trap these z-indexes under the page content painted after it.
      */}
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
