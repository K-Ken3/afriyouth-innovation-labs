import { Suspense, useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { CursorFollower } from "@/components/ui/CursorFollower";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageLoader } from "@/components/ui/PageLoader";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollTrigger } from "@/lib/gsap";

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-forest"
    >
      Skip to main content
    </a>
  );
}

export function SiteLayout() {
  const outlet = useOutlet();
  const location = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    const scrollToTarget = () => {
      if (cancelled) return;
      if (location.hash) {
        const id = decodeURIComponent(location.hash.slice(1));
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "start",
          });
          return;
        }
      }
      if (!location.hash) {
        window.scrollTo(0, 0);
      }
    };

    scrollToTarget();
    const timers = [
      window.setTimeout(scrollToTarget, 120),
      window.setTimeout(scrollToTarget, 520),
      window.setTimeout(() => ScrollTrigger.refresh(), 620),
    ];

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [location.pathname, location.hash, reduced]);

  return (
    <div id="top" className="flex min-h-screen flex-col bg-ivory">
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<PageLoader />}>
          <motion.div
            key={location.pathname}
            initial={reduced ? false : { opacity: 0.35 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {outlet}
          </motion.div>
        </Suspense>
      </main>
      <Footer />
      <CursorFollower />
    </div>
  );
}
