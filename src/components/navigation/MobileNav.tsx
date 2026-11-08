import { useEffect, useRef, type RefObject } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { primaryNav } from "@/content/site";
import { Brand } from "./Brand";
import { ButtonLink } from "@/components/ui/Button";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { cn } from "@/lib/cn";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement>;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav({ open, onClose, triggerRef }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 120);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[80] lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="on-dark grain flex h-full flex-col overflow-y-auto bg-forest text-ivory">
            <div className="container-editorial flex h-[var(--header-height)] flex-none items-center justify-between">
              <Brand theme="dark" onClick={onClose} />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                data-autofocus
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-lime hover:text-lime"
              >
                <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav aria-label="Mobile primary" className="container-editorial flex-1 pt-6">
              <ul>
                {primaryNav.map((item, index) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.16 + index * 0.045,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className="group flex items-baseline justify-between border-b border-ivory/15 py-4"
                    >
                      <span className="font-display text-[clamp(2.15rem,9vw,3rem)] leading-none tracking-[-0.04em] transition-colors group-hover:text-lime">
                        {item.label}
                      </span>
                      <span className="text-[0.625rem] tracking-[0.18em] text-ivory/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col gap-3"
              >
                <ButtonLink
                  to="/get-involved"
                  variant="lime"
                  onClick={onClose}
                  className="w-full justify-between"
                >
                  Get Involved
                </ButtonLink>
                <ButtonLink
                  to="/partner-with-us"
                  variant="light"
                  onClick={onClose}
                  className="w-full justify-between"
                >
                  Partner With Us
                </ButtonLink>
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="link-underline mt-2 self-start text-sm text-ivory/70"
                >
                  Contact the lab
                </Link>
              </motion.div>
            </nav>

            <div className="container-editorial safe-bottom mt-8 flex-none border-t border-ivory/15 pt-5 text-[0.6875rem] leading-relaxed text-ivory/45">
              <p className="uppercase tracking-[0.16em]">
                Research · Policy · Design · Enterprise · Development · Foresight · Measurement
              </p>
              <p className={cn("mt-1.5")}>
                Official contact details pending verification.
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
