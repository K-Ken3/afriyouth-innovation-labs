import { Link } from "react-router-dom";
import { ArrowUpRight, Database, Users } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageMeta } from "@/content/seo";
import {
  aboutChapters,
  aboutCommitments,
  aboutIntro,
  partnershipStatement,
  teamStatement,
  whyNow,
} from "@/content/about";
import { principles, site } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { PhotoPlate } from "@/components/graphics/PhotoPlate";
import { photos } from "@/content/photos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { PageCTA } from "@/components/sections/PageCTA";

export default function AboutPage() {
  usePageMeta(pageMeta.about);

  return (
    <>
      <PageHero
        eyebrow="About the lab"
        chapter="01"
        title={["A research and", "innovation", "institution for", "African futures."]}
        intro={aboutIntro.intro}
        meta={[
          { label: "Focus", value: "Research & innovation" },
          { label: "Structure", value: "Connected practice" },
          { label: "Content status", value: "Provisional" },
          { label: "Edition", value: "Prototype 01" },
        ]}
      />

      <section id="purpose" className="section bg-ivory">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-forest/50">On this page</p>
              <nav aria-label="About sections" className="mt-5">
                <ol className="border-t border-forest/15">
                  {aboutChapters.map((chapter, index) => (
                    <li key={chapter.id} className="border-b border-forest/15">
                      <Link
                        to={`#${chapter.id}`}
                        className="group flex items-center justify-between gap-3 py-3 text-sm text-forest/60 transition-colors hover:text-forest"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="text-[0.625rem] tabular-nums tracking-[0.12em] text-forest/30">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {chapter.label}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-70"
                        />
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="mt-8 hidden border border-forest/15 p-4 lg:block">
                <p className="text-[0.6rem] uppercase tracking-[0.16em] text-forest/40">
                  Provisional content
                </p>
                <p className="mt-2 text-xs leading-relaxed text-forest/55">
                  This page is derived from the design brief. Official mission,
                  history and governance copy will replace it.
                </p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <KineticHeading
              lines={["The distance between", "insight and change", "is a design choice."]}
              className="display-xl max-w-4xl text-forest"
              accentLines={[2]}
              accentClassName="text-forest/32"
            />
            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              {whyNow.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.05}>
                  <p className={index === 0 ? "lede text-forest/85" : "body-copy"}>
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <MaskReveal className="mt-12 rounded-2xl">
              <PhotoPlate
                photo={photos.designWorkshop}
                variant={0}
                className="aspect-[16/9] w-full"
                title="Institution / Connected"
                index="A1"
              />
            </MaskReveal>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[0.625rem] uppercase tracking-[0.16em] text-forest/40">
              <span>Placeholder photography — Pexels</span>
              <span>Official photography will replace this image</span>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="border-y border-forest/12 bg-sage/35">
        <div className="container-editorial section-tight">
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal className="on-dark grain flex flex-col justify-between rounded-2xl bg-forest p-7 text-ivory sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-lime/80">Mission</p>
                <Badge variant="provisional" className="border-ivory/20 text-ivory/55">
                  Provisional
                </Badge>
              </div>
              <p className="display-md mt-12 max-w-xl text-ivory">{site.mission}</p>
              <p className="mt-8 text-xs uppercase tracking-[0.15em] text-ivory/35">
                Why the work exists
              </p>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col justify-between rounded-2xl bg-lime p-7 text-forest sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-forest/60 before:bg-forest">Vision</p>
                <span className="font-display text-xs tracking-[0.14em] text-forest/35">
                  Horizon
                </span>
              </div>
              <p className="display-md mt-12 max-w-xl text-forest">{site.vision}</p>
              <p className="mt-8 text-xs uppercase tracking-[0.15em] text-forest/45">
                The future we are working toward
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="principles" className="section bg-ivory">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="How we work"
            meta="Five provisional principles"
            title={
              <KineticHeading
                lines={["Principles before", "posture."]}
                className="display-xl text-forest"
                accentLines={[1]}
                accentClassName="text-forest/32"
              />
            }
            intro="These working principles are provisional articulations of the brief. They describe how the lab intends to operate, not claims about a track record."
          />

          <ol className="mt-14 border-t border-forest/20">
            {principles.map((principle, index) => (
              <Reveal key={principle.number} delay={index * 0.04}>
                <li className="grid gap-4 border-b border-forest/15 py-6 sm:grid-cols-12 sm:items-start sm:gap-6 lg:py-8">
                  <span className="font-display text-2xl leading-none tracking-[-0.05em] text-forest/20 sm:col-span-1">
                    {principle.number}
                  </span>
                  <h3 className="font-display text-2xl leading-tight tracking-[-0.035em] text-forest sm:col-span-4 lg:text-[1.75rem]">
                    {principle.title}
                  </h3>
                  <p className="body-copy sm:col-span-7 sm:max-w-2xl">{principle.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutCommitments.map((commitment, index) => (
              <Reveal key={commitment.title} delay={index * 0.04}>
                <div className="card-surface h-full p-5">
                  <span className="text-[0.6rem] uppercase tracking-[0.16em] text-forest/35">
                    Commitment {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-forest">{commitment.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-forest/60">{commitment.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="people" className="border-y border-forest/12 bg-sage/30">
        <div className="container-editorial section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow text-forest/55">People & governance</p>
              </Reveal>
              <KineticHeading
                lines={["Built by people.", "Accountable to", "the work."]}
                className="display-lg mt-5 text-forest"
              />
            </div>

            <div className="grid gap-4 lg:col-span-8 sm:grid-cols-2">
              <Reveal className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-dashed border-forest/30 bg-ivory/70 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-forest/60">
                      <Users aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <Badge variant="provisional" dot>
                      Pending verification
                    </Badge>
                  </div>
                  <h3 className="mt-8 font-display text-xl tracking-[-0.03em] text-forest">
                    {teamStatement.heading}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-forest/60">{teamStatement.body}</p>
                  <p className="mt-auto pt-6 text-[0.625rem] uppercase tracking-[0.14em] text-forest/35">
                    {teamStatement.note}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.06} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-dashed border-forest/30 bg-ivory/70 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-forest/60">
                      <Database aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <Badge variant="provisional" dot>
                      Pending verification
                    </Badge>
                  </div>
                  <h3 className="mt-8 font-display text-xl tracking-[-0.03em] text-forest">
                    {partnershipStatement.heading}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-forest/60">
                    {partnershipStatement.body}
                  </p>
                  <p className="mt-auto pt-6 text-[0.625rem] uppercase tracking-[0.14em] text-forest/35">
                    {partnershipStatement.note}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="accountability" className="on-dark grain bg-forest text-ivory">
        <div className="container-editorial section-tight">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-lime">Accountability</p>
              </Reveal>
              <KineticHeading
                lines={["What we will not", "pretend to know."]}
                className="display-lg mt-5 text-ivory"
                accentLines={[1]}
                accentClassName="text-lime"
              />
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/60">
                {site.provisionalNotice}
              </p>
              <Link
                to="/impact"
                className="link-underline group mt-7 inline-flex items-center gap-2 text-sm text-lime"
              >
                Read the measurement commitments
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-ivory/20 p-6">
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-ivory/40">
                  Verification standard
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "No invented statistics or achievements.",
                    "No unnamed partnerships presented as endorsements.",
                    "No programmes, deadlines or staff published before confirmation.",
                    "No testimonials or contact details created for the prototype.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ivory/65">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 flex-none rounded-full bg-lime" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="Work with the lab"
        title="Bring a question worth taking seriously."
        body="We are open to research, design, policy, enterprise, learning, foresight and measurement collaborations — and to conversations that clarify what is needed first."
        primary={{ label: "Partner With Us", to: "/partner-with-us" }}
        secondary={{ label: "Get Involved", to: "/get-involved" }}
      />
    </>
  );
}
