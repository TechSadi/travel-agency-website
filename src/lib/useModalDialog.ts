"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ModalDialogOptions = {
  open: boolean;
  panelRef: RefObject<HTMLElement | null>;
  /** Receives focus when the dialog opens; defaults to the first focusable element. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Escape was pressed. The caller closes the dialog and restores focus. */
  onDismiss: () => void;
  /** When this media query starts matching, the dialog's trigger is gone, so `onAutoClose` runs. */
  autoCloseQuery?: string;
  onAutoClose?: () => void;
};

/**
 * Shared behaviour for modal panels (the mobile menu drawer, the trips filter sheet):
 * locks page scroll, moves focus in, traps Tab, closes on Escape, and closes when
 * the viewport grows past the breakpoint that shows the trigger.
 */
export function useModalDialog({ open, panelRef, initialFocusRef, onDismiss, autoCloseQuery, onAutoClose }: ModalDialogOptions) {
  // Read the latest callbacks without re-running the effect (which would steal focus back).
  const callbacks = useRef({ onDismiss, onAutoClose });
  useEffect(() => {
    callbacks.current = { onDismiss, onAutoClose };
  });

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    // Only rendered elements: a panel can hold controls hidden at this breakpoint (the Lightbox arrows).
    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((element) => element.getClientRects().length > 0);
    (initialFocusRef?.current ?? focusables()[0])?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        callbacks.current.onDismiss();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || !panel?.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !panel?.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    }

    const media = autoCloseQuery ? window.matchMedia(autoCloseQuery) : null;
    const onMediaChange = () => media?.matches && callbacks.current.onAutoClose?.();

    document.addEventListener("keydown", onKeyDown);
    media?.addEventListener("change", onMediaChange);
    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      media?.removeEventListener("change", onMediaChange);
    };
  }, [open, panelRef, initialFocusRef, autoCloseQuery]);
}
