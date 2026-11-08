import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ApproachSystem } from "./ApproachSystem";

export function ApproachSection() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="on-dark grain relative overflow-hidden bg-forest text-ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent"
      />
      <div className="container-editorial section">
        <SectionHeading
          theme="dark"
          eyebrow="Our approach"
          meta="A connected operating system"
          title={
            <KineticHeading
              id="approach-heading"
              lines={["A system,", "not a", "sequence."]}
              className="display-xl text-ivory"
              accentLines={[2]}
              accentClassName="text-lime"
            />
          }
          intro="Research, policy, design, enterprise, professional development, foresight and measurement are usually run as separate tracks. We connect them deliberately — so insight travels, prototypes meet policy, and measurement feeds the next question."
        />

        <Reveal className="mt-14 lg:mt-20" y={20}>
          <ApproachSystem />
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 border-t border-ivory/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-relaxed text-ivory/45">
            The loop is not a diagram device. Each engagement is expected to
            return evidence, capability and learning to the system it came from.
          </p>
          <Link
            to="/what-we-do"
            className="link-underline group inline-flex items-center gap-2 self-start text-sm text-ivory/75 hover:text-lime sm:self-auto"
          >
            See how the practices connect
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
