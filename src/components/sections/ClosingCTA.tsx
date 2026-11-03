import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function ClosingCTA() {
  return (
    <section
      aria-labelledby="closing-heading"
      className="relative overflow-hidden bg-lime text-forest"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 600"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="1030" cy="120" r="360" fill="none" stroke="#153D32" strokeOpacity="0.16" />
        <circle cx="1030" cy="120" r="280" fill="none" stroke="#153D32" strokeOpacity="0.12" strokeDasharray="2 10" />
        <circle cx="1030" cy="120" r="200" fill="none" stroke="#153D32" strokeOpacity="0.1" />
        <path
          d="M-100 520C180 400 360 460 560 560S980 660 1300 500"
          fill="none"
          stroke="#153D32"
          strokeOpacity="0.18"
        />
        <path d="M1030 120L1160 -10M1030 120L1160 250" stroke="#153D32" strokeOpacity="0.16" />
      </svg>

      <div className="container-editorial relative z-10 py-20 sm:py-28 lg:py-32">
        <Reveal>
          <p className="eyebrow text-forest/60">Start a conversation</p>
        </Reveal>
        <KineticHeading
          id="closing-heading"
          lines={["The future is not", "a prediction.", "It is a practice."]}
          className="display-xl mt-6 max-w-5xl text-forest"
          accentLines={[2]}
          accentClassName="text-forest/40"
        />

        <div className="mt-10 grid gap-8 border-t border-forest/25 pt-8 sm:mt-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="max-w-lg text-sm leading-relaxed text-forest/70">
              Bring a question, a mandate or a shared ambition. We will tell you
              honestly what we can contribute, what we would need to learn, and
              how we would measure whether it mattered.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <ButtonLink to="/partner-with-us" variant="primary">
              Partner With Us
            </ButtonLink>
            <ButtonLink to="/get-involved" variant="outline" className="border-forest/40">
              Get Involved
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[0.625rem] uppercase tracking-[0.16em] text-forest/50">
          <span>Research · Design · Enterprise · Policy · Foresight</span>
          <Link to="/contact" className="link-underline inline-flex items-center gap-2 text-forest/70">
            Contact the lab
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
