import { ArrowDown } from "lucide-react";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { OrbitalAtlas } from "@/components/graphics/OrbitalAtlas";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-ivory pb-10 pt-8 sm:pb-14 sm:pt-10"
    >
      <div
        aria-hidden="true"
        className="editorial-grid pointer-events-none absolute -right-1/4 top-0 h-[52rem] w-3/4 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
      />
      <div className="container-editorial relative z-10">
        <div className="mb-9 flex flex-wrap items-center justify-between gap-4 border-b border-forest/15 pb-4 sm:mb-12">
          <p className="eyebrow text-forest/65">
            Research · Policy · Design · Enterprise · Development · Foresight · Measurement
          </p>
          <p className="flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.18em] text-forest/40">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest/40 [animation-duration:2.8s]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest" />
            </span>
            Digital prototype · Edition 01
          </p>
        </div>

        <div className="grid items-start gap-14 xl:grid-cols-12 xl:gap-8">
          <div className="xl:col-span-7">
            <KineticHeading
              as="h1"
              id="hero-title"
              lines={[
                "Evidence.",
                "Innovation.",
                "African",
                <span className="inline-flex items-baseline gap-3 sm:gap-5">
                  futures.
                  <span
                    aria-hidden="true"
                    className="mb-[0.16em] inline-block h-[0.14em] w-[0.14em] flex-none rounded-full bg-lime ring-1 ring-forest/10"
                  />
                </span>,
              ]}
              label="Evidence. Innovation. African futures."
              scroll={false}
              delay={0.12}
              className="text-[clamp(3.15rem,7.8vw,7.1rem)] font-medium leading-[0.87] tracking-[-0.06em] text-forest"
            />

            <div className="mt-9 grid gap-8 sm:grid-cols-[1.35fr_1fr] sm:items-end">
              <Reveal delay={0.5} y={18}>
                <p className="lede max-w-xl text-forest/72">
                  A research and innovation institution working where evidence,
                  human-centered design, enterprise and policy meet — expanding
                  what young Africans can build, and shape.
                </p>
              </Reveal>
              <Reveal delay={0.62} y={16} className="flex flex-wrap gap-3 sm:justify-end">
                <ButtonLink to="/what-we-do">Explore our work</ButtonLink>
                <ButtonLink to="/programs" variant="outline">
                  Find opportunities
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal delay={0.72} y={14} className="mt-10 border-t border-forest/15 pt-5">
              <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-forest/40">
                    Focus
                  </dt>
                  <dd className="mt-1.5 text-xs leading-snug text-forest/75">
                    Young people and the systems around them
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-forest/40">
                    Practice
                  </dt>
                  <dd className="mt-1.5 text-xs leading-snug text-forest/75">
                    Seven connected areas of work
                  </dd>
                </div>
                <div className="col-span-2 flex items-end gap-2 sm:col-span-1 sm:justify-end">
                  <ArrowDown aria-hidden="true" className="h-4 w-4 text-forest/40" />
                  <span className="text-[0.6rem] uppercase tracking-[0.16em] text-forest/40">
                    The system follows
                  </span>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="xl:col-span-5">
            <Reveal delay={0.3} y={30}>
              <OrbitalAtlas className="xl:mt-2" />
            </Reveal>
            <div className="mt-6 flex items-start justify-between gap-6 px-1">
              <p className="max-w-[16rem] text-xs leading-relaxed text-forest/55">
                Not a pipeline. A practice that moves evidence into enterprise,
                enterprise into policy, and policy into lasting change.
              </p>
              <span className="text-[0.6rem] uppercase tracking-[0.18em] text-forest/35">
                Map / 001
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
