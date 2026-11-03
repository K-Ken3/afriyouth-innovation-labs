import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarClock, CheckCircle2 } from "lucide-react";
import { programCategories, programEmpty, programs } from "@/content/programs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProgramsPreview() {
  const visibleCategories = programCategories.filter((category) => category.id !== "all");

  return (
    <section
      aria-labelledby="programs-heading"
      className="section border-y border-forest/12 bg-sage/35"
    >
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Programs & opportunities"
          meta={`${String(programs.length).padStart(2, "0")} live calls`}
          title={
            <KineticHeading
              id="programs-heading"
              lines={["A clear door", "to the next", "opportunity."]}
              className="display-xl text-forest"
              accentLines={[2]}
              accentClassName="text-forest/32"
            />
          }
          intro="Fellowships, research calls, innovation challenges and enterprise support will be published here only when eligibility and deadlines are confirmed."
          actions={
            <ButtonLink to="/programs" variant="outline">
              Visit the opportunity board
            </ButtonLink>
          }
        />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7" y={20}>
            <div className="rounded-2xl border border-forest/20 bg-ivory p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest/15 pb-4">
                <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-forest/55">
                  Opportunity board
                </span>
                <Badge variant="soft" dot>
                  Board in preparation
                </Badge>
              </div>

              <ul>
                {visibleCategories.map((category, index) => (
                  <li
                    key={category.id}
                    className="flex items-center justify-between gap-5 border-b border-forest/10 py-3.5"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[0.625rem] tabular-nums tracking-[0.12em] text-forest/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium text-forest/80">{category.label}</span>
                    </div>
                    <span className="font-display text-xs tabular-nums text-forest/35">00</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-start gap-2.5 text-xs leading-relaxed text-forest/50">
                <CalendarClock aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none" />
                <p>
                  Listings appear with eligibility, deadline, format and a direct
                  application route. No dates are invented.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1} y={20}>
            <div className="on-dark flex h-full flex-col justify-between rounded-2xl bg-forest p-6 text-ivory sm:p-8">
              <div>
                <p className="eyebrow text-lime/80">Opportunity status</p>
                <h3 className="display-md mt-5 text-ivory">{programEmpty.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory/65">{programEmpty.body}</p>
              </div>

              <div className="mt-8">
                <ButtonLink to="/get-involved" variant="lime" className="w-full justify-between">
                  Register your interest
                </ButtonLink>
                <Link
                  to="/programs#how-it-works"
                  className="link-underline group mt-5 inline-flex items-center gap-2 text-xs text-ivory/55 hover:text-ivory"
                >
                  <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
                  How verified listings work
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
