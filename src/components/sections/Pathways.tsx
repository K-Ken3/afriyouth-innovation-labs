import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { pathways } from "@/content/site";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function Pathways() {
  return (
    <section aria-labelledby="pathways-heading" className="section bg-ivory">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Choose your route"
          meta="Three audiences · three doors"
          title={
            <KineticHeading
              id="pathways-heading"
              lines={["Three ways in."]}
              className="display-xl text-forest"
            />
          }
          intro="The lab is built for young people, for organizations that need rigorous work, and for institutions ready to collaborate on longer horizons."
        />

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
          {pathways.map((pathway, index) => (
            <Reveal key={pathway.number} delay={index * 0.06} className="h-full">
              <Link
                to={pathway.to}
                className={cn(
                  "group flex h-full min-h-[20rem] flex-col justify-between rounded-2xl border p-6 transition-[transform,border-color,background-color] duration-300 ease-editorial hover:-translate-y-1 sm:p-8",
                  index === 0
                    ? "border-forest/20 bg-lime hover:bg-[#d3fa80]"
                    : "border-forest/15 bg-paper hover:border-forest/35",
                  index === 1 ? "lg:mt-8" : "",
                  index === 2 ? "lg:mt-16" : "",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/55">
                    {pathway.audience}
                  </span>
                  <span className="font-display text-xs tabular-nums tracking-[0.14em] text-forest/35">
                    {pathway.number}
                  </span>
                </div>

                <div className="mt-12">
                  <h3 className="display-md text-forest">{pathway.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-forest/65">
                    {pathway.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-forest/20 pt-4">
                  <span className="text-[0.625rem] uppercase tracking-[0.14em] text-forest/45">
                    {pathway.note}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-forest/60 transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-forest"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
