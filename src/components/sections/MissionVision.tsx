import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function MissionVision() {
  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-vision-heading"
      className="on-dark grain relative overflow-hidden border-y border-ivory/10 bg-forest text-ivory"
    >
      <div
        aria-hidden="true"
        className="editorial-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <div className="container-editorial section-tight relative z-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory/15 pb-5">
            <p className="eyebrow text-lime">Mission &amp; vision</p>
            <p className="text-[0.625rem] uppercase tracking-[0.18em] text-ivory/60">
              Exact wording · challenge brief
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[0.625rem] uppercase tracking-[0.16em] text-ivory/60">
                Mission
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                id="mission-vision-heading"
                className="display-md mt-4 max-w-2xl text-ivory"
              >
                {site.mission}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <p className="text-[0.625rem] uppercase tracking-[0.16em] text-ivory/60">
                Vision
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="lede mt-4 text-ivory/75">{site.vision}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <Link
                to="/about#mission"
                className="link-underline group mt-7 inline-flex text-sm font-medium text-lime"
              >
                Read the full mandate
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-col gap-4 border-t border-ivory/15 pt-6 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-[0.625rem] uppercase tracking-[0.16em] text-ivory/60">
              Brand pillars
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
              {site.brandPillars.map((pillar, index) => (
                <li
                  key={pillar}
                  className="flex items-baseline gap-2 text-xs text-ivory/70"
                >
                  <span className="font-display text-[0.625rem] tabular-nums text-ivory/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {pillar}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
