import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageMeta } from "@/content/seo";
import { areas } from "@/content/areas";
import { whatWeDoProcess } from "@/content/pages";
import { PageHero } from "@/components/ui/PageHero";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { Badge } from "@/components/ui/Badge";
import { PageCTA } from "@/components/sections/PageCTA";
import { cn } from "@/lib/cn";

export default function WhatWeDoPage() {
  usePageMeta(pageMeta.whatWeDo);

  return (
    <>
      <PageHero
        eyebrow="What we do"
        chapter="02"
        title={["A connected", "practice for", "complex change."]}
        intro="Seven areas of work that can stand alone or reinforce one another. Research, policy, human-centered design, entrepreneurship, professional development, strategic foresight and impact measurement are brought together around a question — not sold as separate tracks."
        meta={[
          { label: "Practices", value: "07" },
          { label: "Model", value: "Connected practice" },
          { label: "Measurement", value: "Verified only" },
          { label: "Content status", value: "Brief-verified" },
        ]}
      />

      <section className="section bg-ivory">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="The practice"
            meta="Select an area to read more"
            title={
              <KineticHeading
                lines={["One team.", "Seven ways to", "work on change."]}
                className="display-xl text-forest"
                accentLines={[2]}
                accentClassName="text-forest/32"
              />
            }
            intro="Every engagement begins with the decision, not the deliverable. The mix of practices follows from what the question actually needs."
          />

          <nav aria-label="Practice sections" className="mt-10 overflow-x-auto no-scrollbar">
            <ol className="flex min-w-max border-y border-forest/15">
              {areas.map((area) => (
                <li key={area.id}>
                  <a
                    href={`#${area.id}`}
                    className="group flex items-center gap-3 border-r border-forest/12 px-4 py-3 text-xs text-forest/60 transition-colors first:pl-0 hover:text-forest"
                  >
                    <span className="tabular-nums text-[0.625rem] tracking-[0.12em] text-forest/30">
                      {area.number}
                    </span>
                    {area.shortTitle}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {areas.map((area, index) => (
        <section
          key={area.id}
          id={area.id}
          className={cn(
            "scroll-mt-24 border-t border-forest/15 py-14 sm:py-20",
            index % 2 === 0 ? "bg-ivory" : "bg-sage/25",
          )}
        >
          <div className="container-editorial">
            <article className="grid gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-[3.25rem] leading-none tracking-[-0.06em] text-forest/15">
                      {area.number}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-forest/20 bg-ivory text-forest">
                      <AreaIcon name={area.icon} />
                    </span>
                  </div>
                  <h2 className="display-lg mt-7 text-forest">{area.title}</h2>
                  <p className="mt-4 max-w-sm font-display text-xl leading-snug tracking-[-0.025em] text-forest/55">
                    {area.tagline}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {area.formats.map((format) => (
                      <Badge key={format} variant="soft">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <p className="lede max-w-2xl text-forest/85">{area.summary}</p>
                <div className="mt-6 space-y-4">
                  {area.description.map((paragraph) => (
                    <p key={paragraph} className="body-copy max-w-2xl">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-9 border-t border-forest/20 pt-6">
                  <p className="text-[0.625rem] uppercase tracking-[0.18em] text-forest/40">
                    What we can bring
                  </p>
                  <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {area.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-2.5 text-sm text-forest/70">
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-3.5 w-3.5 flex-none text-forest/40"
                          strokeWidth={2}
                        />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-9 flex flex-col gap-4 rounded-xl border border-forest/15 bg-ivory/80 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.16em] text-forest/40">
                      A question we bring
                    </p>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-forest/75">
                      {area.question}
                    </p>
                  </div>
                  <Link
                    to="/partner-with-us"
                    className="link-underline group inline-flex flex-none items-center gap-2 text-sm font-medium text-forest"
                  >
                    Discuss a brief
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      ))}

      <section className="on-dark grain bg-ink text-ivory">
        <div className="container-editorial section">
          <SectionHeading
            theme="dark"
            eyebrow="How we work"
            meta="From question to uptake"
            title={
              <KineticHeading
                lines={["From question", "to uptake."]}
                className="display-xl text-ivory"
                accentLines={[1]}
                accentClassName="text-lime"
              />
            }
            intro="No surprise outputs. No method chosen before the decision is understood. The process is collaborative, visible and built for use."
          />

          <ol className="mt-14 grid gap-6 border-t border-ivory/15 pt-7 lg:grid-cols-5 lg:gap-4">
            {whatWeDoProcess.map((step, index) => (
              <li key={step.number} className="h-full">
                <Reveal delay={index * 0.05} className="h-full">
                  <div className="relative h-full border-l border-ivory/15 pl-4 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-4">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[3px] top-0 h-1.5 w-1.5 rounded-full bg-lime lg:-top-[3px] lg:left-0"
                    />
                    <span className="font-display text-2xl tracking-[-0.04em] text-ivory/20">
                      {step.number}
                    </span>
                    <h3 className="mt-3 font-display text-xl tracking-[-0.03em] text-ivory">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/55">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PageCTA
        eyebrow="Commission the work"
        title="One team around the whole question."
        body="Research, design, policy, enterprise, learning, foresight and measurement can be combined in a single engagement — or scoped to the part that is most useful now."
        primary={{ label: "Partner With Us", to: "/partner-with-us" }}
        secondary={{ label: "Contact the lab", to: "/contact" }}
      />
    </>
  );
}
