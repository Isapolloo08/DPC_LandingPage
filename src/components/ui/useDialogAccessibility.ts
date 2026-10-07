import { useEffect, useRef } from "react";

let openDialogCount = 0;
let initialBodyOverflow = "";

/** Own focus and scroll while a dialog is open, including nested photo viewers. */
export function useDialogAccessibility(isOpen: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    if (openDialogCount === 0)
      initialBodyOverflow = document.body.style.overflow;
    openDialogCount += 1;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex="0"]',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getClientRects().length > 0,
      );
    (focusable()[0] || dialog).focus();
    const onKeyDown = (event: KeyboardEvent) => {
      const dialogs = document.querySelectorAll('[role="dialog"]');
      if (dialogs[dialogs.length - 1] !== dialog) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (!elements.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === dialog)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      openDialogCount -= 1;
      if (openDialogCount === 0)
        document.body.style.overflow = initialBodyOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isOpen]);
  return dialogRef;
}
