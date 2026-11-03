import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { notFoundMeta } from "@/content/seo";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFoundPage() {
  usePageMeta(notFoundMeta, { noindex: true });

  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden bg-ivory py-16">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[18rem] leading-none tracking-tighter text-forest/[0.045] sm:text-[28rem]"
      >
        404
      </span>
      <div className="container-editorial relative z-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-forest/55">Page not found</p>
          <KineticHeading
            as="h1"
            lines={["This page is", "off the map."]}
            className="display-xl mt-5 text-forest"
            scroll={false}
          />
          <p className="lede mt-6 text-forest/65">
            The route may have changed, or the page may not be part of this
            prototype. Nothing has been lost — the navigation below will take you
            back to the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/">Return home</ButtonLink>
            <ButtonLink to="/what-we-do" variant="outline">
              Explore our work
            </ButtonLink>
          </div>
          <div className="mt-10 flex flex-wrap gap-5 border-t border-forest/15 pt-5 text-sm text-forest/55">
            <Link to="/programs" className="link-underline inline-flex items-center gap-1.5">
              Programs <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
            <Link to="/insights" className="link-underline inline-flex items-center gap-1.5">
              Insights <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
            <Link to="/contact" className="link-underline inline-flex items-center gap-1.5">
              Contact <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
