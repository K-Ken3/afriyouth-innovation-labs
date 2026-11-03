import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { primaryNav } from "@/content/site";
import { Brand } from "./Brand";
import { MobileNav } from "./MobileNav";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-ivory/95 backdrop-blur-md transition-[border-color,background-color] duration-300",
          scrolled ? "border-forest/12 bg-ivory/88" : "border-transparent",
        )}
      >
        <div className="container-editorial flex h-[var(--header-height)] items-center justify-between gap-6">
          <Brand />

          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "group relative py-2 text-[0.8125rem] font-medium tracking-[-0.01em] transition-colors",
                    isActive ? "text-forest" : "text-forest/60 hover:text-forest",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-forest transition-transform duration-300 ease-editorial group-hover:origin-left group-hover:scale-x-100",
                        isActive && "origin-left scale-x-100",
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/get-involved"
              className="link-underline hidden text-[0.8125rem] font-medium text-forest/70 hover:text-forest xl:inline-flex"
            >
              Get Involved
            </Link>
            <ButtonLink
              to="/partner-with-us"
              className="hidden !min-h-10 !px-5 !py-2.5 text-[0.8125rem] md:inline-flex"
            >
              Partner With Us
            </ButtonLink>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label="Open navigation menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory lg:hidden"
            >
              <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-navigation">
        <MobileNav open={open} onClose={closeMenu} triggerRef={triggerRef} />
      </div>
    </>
  );
}
