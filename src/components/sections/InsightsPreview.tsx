import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { insights } from "@/content/insights";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoPlate } from "@/components/graphics/PhotoPlate";
import { photos } from "@/content/photos";

export function InsightsPreview() {
  const [featured, ...rest] = insights;

  return (
    <section aria-labelledby="insights-heading" className="section bg-ivory">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Insights"
          meta="Provisional editorial"
          title={
            <KineticHeading
              id="insights-heading"
              lines={["Thinking in", "public."]}
              className="display-xl text-forest"
              accentLines={[1]}
              accentClassName="text-forest/32"
            />
          }
          intro="Essays and future publications on evidence, design, policy, enterprise and the practice of measuring what matters."
          actions={
            <ButtonLink to="/insights" variant="outline">
              All insights
            </ButtonLink>
          }
        />

        <div className="mt-14 lg:mt-20">
          <Reveal>
            <Link
              to={`/insights/${featured.slug}`}
              className="group grid gap-6 border-t border-forest/20 pt-7 lg:grid-cols-12 lg:gap-10"
            >
              <MaskReveal className="rounded-xl lg:col-span-4">
                <PhotoPlate
                  photo={photos.teamLaptop}
                  variant={2}
                  className="aspect-[4/3] w-full transition-transform duration-700 ease-editorial group-hover:scale-[1.03] lg:aspect-[4/5]"
                  title="Insight / 01"
                  index="01"
                />
              </MaskReveal>
              <div className="flex flex-col justify-between lg:col-span-8 lg:py-2">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="soft">{featured.category}</Badge>
                    <Badge variant="provisional" dot>
                      Provisional
                    </Badge>
                  </div>
                  <h3 className="display-lg mt-5 max-w-3xl text-forest transition-colors duration-300 group-hover:text-forest/70">
                    {featured.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-forest/65 sm:text-base">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-forest/12 pt-4">
                  <div className="flex items-center gap-4 text-[0.625rem] uppercase tracking-[0.14em] text-forest/45">
                    <span>{featured.kind}</span>
                    <span className="flex items-center gap-1.5">
                      <Clock aria-hidden="true" className="h-3 w-3" />
                      {featured.readingTime} min
                    </span>
                    <span>{featured.edition}</span>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-forest/50 transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-forest"
                  />
                </div>
              </div>
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-px border-t border-forest/15 sm:grid-cols-2">
            {rest.slice(0, 2).map((insight) => (
              <Reveal key={insight.slug} delay={0.05}>
                <Link
                  to={`/insights/${insight.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 border-b border-forest/15 py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/45">
                        {insight.category}
                      </span>
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-forest/25" />
                      <span className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/35">
                        {insight.kind}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl leading-snug tracking-[-0.035em] text-forest transition-colors group-hover:text-forest/65 sm:text-[1.7rem]">
                      {insight.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-forest/55">
                      {insight.excerpt}
                    </p>
                  </div>
                  <span className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-forest/40">
                    Read essay
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
