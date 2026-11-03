import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { impactDimensions, impactIntro } from "@/content/impact";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

export function ImpactPreview() {
  return (
    <section
      aria-labelledby="impact-heading"
      className="on-dark grain relative overflow-hidden bg-ink text-ivory"
    >
      <div className="container-editorial section">
        <SectionHeading
          theme="dark"
          eyebrow="Impact & accountability"
          meta="Verified only"
          title={
            <KineticHeading
              id="impact-heading"
              lines={["We publish", "what changes.", "Not just what", "we did."]}
              className="display-xl text-ivory"
              accentLines={[3]}
              accentClassName="text-lime"
            />
          }
          intro={impactIntro.intro}
        />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5" y={20}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ivory/15 bg-ivory/[0.03] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-ivory/50">Published metrics</p>
                <Badge variant="provisional" className="border-ivory/25 text-ivory/60">
                  Prototype
                </Badge>
              </div>

              <div className="relative mx-auto my-10 flex h-52 w-52 items-center justify-center sm:h-60 sm:w-60">
                <svg viewBox="0 0 240 240" aria-hidden="true" className="absolute inset-0 h-full w-full">
                  <circle cx="120" cy="120" r="112" fill="none" stroke="#F5F3EB" strokeOpacity="0.1" />
                  <circle
                    cx="120"
                    cy="120"
                    r="96"
                    fill="none"
                    stroke="#C9F36A"
                    strokeOpacity="0.35"
                    strokeDasharray="1 9"
                  />
                  <circle cx="120" cy="120" r="78" fill="none" stroke="#F5F3EB" strokeOpacity="0.12" />
                  <path d="M120 8v14M120 218v14M8 120h14M218 120h14" stroke="#F5F3EB" strokeOpacity="0.3" />
                </svg>
                <div className="relative text-center">
                  <span className="block font-display text-[6.5rem] leading-none tracking-[-0.08em] text-ivory sm:text-[7.5rem]">
                    00
                  </span>
                  <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.2em] text-ivory/45">
                    verified figures
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-ivory/60">
                This zero reflects the absence of verified impact data on this
                prototype — not an absence of ambition, activity or learning.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-ivory/35">
                Figures will be animated and published only when they carry a
                source, date, method and stated limitations.
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="border-t border-ivory/15">
              {impactDimensions.map((dimension, index) => (
                <Reveal key={dimension.id} delay={index * 0.05}>
                  <div className="group grid grid-cols-[auto_1fr] gap-4 border-b border-ivory/15 py-5 transition-colors sm:grid-cols-[auto_1fr_auto] sm:gap-7 sm:py-6">
                    <span className="mt-1 font-display text-[0.65rem] tabular-nums tracking-[0.14em] text-ivory/30">
                      {dimension.number}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl leading-none tracking-[-0.035em] text-ivory">
                        {dimension.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-ivory/55">
                        {dimension.question}
                      </p>
                    </div>
                    <span className="col-start-2 mt-1 flex items-center gap-2 self-start text-[0.6rem] uppercase tracking-[0.14em] text-ivory/35 sm:col-start-auto">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full border border-ivory/30" />
                      Awaiting verified data
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-relaxed text-ivory/40">
                Reach, depth, durability and systems change are tracked together.
                One convenient number is not the goal.
              </p>
              <Link
                to="/impact"
                className="link-underline group inline-flex items-center gap-2 self-start text-sm text-lime sm:self-auto"
              >
                Measurement commitments
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
