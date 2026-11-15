import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { areas } from "@/content/areas";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export function AreasSection() {
  return (
    <section aria-labelledby="areas-heading" className="section bg-ivory">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Areas of work"
          meta="Five divisions · eight practices"
          title={
            <KineticHeading
              id="areas-heading"
              lines={["Five divisions.", "Eight practices.", "One agenda."]}
              className="display-xl text-forest"
              accentLines={[2]}
              accentClassName="text-forest/32"
            />
          }
          intro="Research, policy, innovation, foresight and leadership are organised as five divisions, with eight practices you can commission on their own. The difference is what happens when they are designed together."
          actions={
            <ButtonLink to="/what-we-do" variant="outline">
              Explore all practices
            </ButtonLink>
          }
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal key={area.id} delay={index * 0.045} className="h-full">
              <article className="group h-full">
                <Link
                  to={`/what-we-do#${area.id}`}
                  className="card-surface flex h-full flex-col p-6 transition-[transform,border-color,box-shadow] duration-300 ease-editorial hover:-translate-y-1 hover:border-forest/35 hover:shadow-[0_18px_40px_-30px_rgba(13,6,36,0.55)] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-4xl leading-none tracking-[-0.05em] text-forest/45 transition-colors duration-300 group-hover:text-forest/60">
                      {area.number}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 bg-ivory text-forest transition-colors duration-300 group-hover:border-lime group-hover:bg-lime">
                      <AreaIcon name={area.icon} className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="display-md mt-8 text-forest">{area.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-forest/65">
                    {area.summary}
                  </p>

                  <div className="mt-7 flex items-center justify-between border-t border-forest/12 pt-4">
                    <span className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/60">
                      Explore practice
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-forest/60 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest"
                    />
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
