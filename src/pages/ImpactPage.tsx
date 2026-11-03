import { Check } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageMeta } from "@/content/seo";
import {
  impactDimensions,
  impactFaqs,
  impactIntro,
  impactLedger,
  impactNote,
  impactStages,
  measurementCommitments,
} from "@/content/impact";
import { PageHero } from "@/components/ui/PageHero";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { PageCTA } from "@/components/sections/PageCTA";

export default function ImpactPage() {
  usePageMeta(pageMeta.impact);

  return (
    <>
      <PageHero
        eyebrow="Impact & accountability"
        chapter="05"
        title={["What changes,", "and how we", "would know."]}
        intro={impactIntro.intro}
        meta={[
          { label: "Verified figures", value: "00 published" },
          { label: "Baselines", value: "Not yet published" },
          { label: "Reporting", value: "Public ledger" },
          { label: "Content status", value: "Prototype" },
        ]}
      />

      <section className="on-dark grain relative overflow-hidden bg-forest text-ivory">
        <div className="container-editorial section-tight relative z-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="eyebrow text-lime">Position</p>
              </Reveal>
              <KineticHeading
                lines={["A number without", "a source is not", "evidence."]}
                className="display-xl mt-5 max-w-4xl text-ivory"
                accentLines={[2]}
                accentClassName="text-lime"
              />
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/60">
                AfriYouth intends to report on reach, depth, durability and
                systems change — but only where the claim can be traced to a
                method, a source and a date. This page therefore shows the
                measurement architecture, not a set of achievements.
              </p>
            </div>

            <Reveal delay={0.12} className="lg:col-span-4">
              <div className="rounded-2xl border border-ivory/20 p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[4.5rem] leading-none tracking-[-0.06em] text-lime">
                    00
                  </span>
                  <span className="text-[0.625rem] uppercase tracking-[0.18em] text-ivory/40">
                    Verified figures
                  </span>
                </div>
                <p className="mt-5 border-t border-ivory/15 pt-4 text-sm leading-relaxed text-ivory/65">
                  No impact statistics, baselines or evaluations have been
                  supplied for this prototype. Nothing has been estimated,
                  rounded or illustrated with a placeholder number.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="What we measure"
            meta="Four dimensions"
            title={
              <KineticHeading
                lines={["Change is wider", "than a metric."]}
                className="display-xl text-forest"
                accentLines={[1]}
                accentClassName="text-forest/32"
              />
            }
            intro="Each dimension carries a question that keeps the measurement honest. A programme can perform well on one and poorly on another; the reporting should show both."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {impactDimensions.map((dimension, index) => (
              <Reveal key={dimension.id} delay={index * 0.05} className="h-full">
                <article className="card-surface flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-2xl tracking-[-0.05em] text-forest/20">
                      {dimension.number}
                    </span>
                    <Badge variant="provisional" dot>
                      Awaiting data
                    </Badge>
                  </div>
                  <h3 className="display-md mt-8 text-forest">{dimension.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-forest/65">
                    {dimension.description}
                  </p>
                  <div className="mt-6 border-t border-forest/12 pt-4">
                    <p className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/40">
                      Guiding question
                    </p>
                    <p className="mt-2 font-display text-lg leading-snug tracking-[-0.02em] text-forest/80">
                      {dimension.question}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-forest/12 bg-sage/30">
        <div className="container-editorial section-tight">
          <SectionHeading
            eyebrow="Measurement loop"
            meta="From framing to publication"
            title={
              <KineticHeading
                lines={["Measure across", "the whole cycle."]}
                className="display-lg text-forest"
                accentLines={[1]}
                accentClassName="text-forest/32"
              />
            }
            intro="Measurement is designed at the start, not reconstructed at the end. The loop closes only when findings are published and the learning returns to the next question."
          />

          <ol className="mt-12 grid gap-6 border-t border-forest/20 pt-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {impactStages.map((stage, index) => (
              <li key={stage.number} className="h-full">
                <Reveal delay={index * 0.05} className="h-full">
                  <div className="relative h-full border-l border-forest/20 pl-4 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-4">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[3px] top-0 h-1.5 w-1.5 rounded-full bg-forest lg:-top-[3px] lg:left-0"
                    />
                    <span className="font-display text-2xl tracking-[-0.04em] text-forest/20">
                      {stage.number}
                    </span>
                    <h3 className="mt-3 font-display text-xl tracking-[-0.03em] text-forest">
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-forest/60">{stage.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow text-forest/55">Public ledger</p>
            <KineticHeading
              lines={["What will be", "published here."]}
              className="display-lg mt-5 text-forest"
              accentLines={[1]}
              accentClassName="text-forest/32"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-forest/60">
              Each entry will carry a source, date, method and stated limitations.
              Until then, the ledger is intentionally empty.
            </p>
            <div className="mt-7 rounded-xl border border-forest/15 bg-sage/30 p-5">
              <p className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/45">
                Publication rule
              </p>
              <p className="mt-2 text-sm leading-relaxed text-forest/70">{impactNote}</p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-forest/20">
              {impactLedger.map((entry, index) => (
                <Reveal key={entry.label} delay={index * 0.04}>
                  <div className="grid gap-3 border-b border-forest/15 py-6 sm:grid-cols-12 sm:items-start">
                    <span className="font-display text-xs tabular-nums tracking-[0.14em] text-forest/30 sm:col-span-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="sm:col-span-7">
                      <h3 className="font-display text-xl tracking-[-0.03em] text-forest">
                        {entry.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-forest/60">
                        {entry.description}
                      </p>
                    </div>
                    <div className="sm:col-span-4 sm:text-right">
                      <Badge variant="provisional" dot>
                        {entry.status}
                      </Badge>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-forest/45">
              An empty ledger is a statement of method, not a claim of impact.
            </p>
          </div>
        </div>
      </section>

      <section className="on-dark grain border-y border-ivory/15 bg-forest">
        <div className="container-editorial section-tight">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="eyebrow text-lime">Reporting commitments</p>
              <KineticHeading
                lines={["The rules we", "would hold", "ourselves to."]}
                className="display-lg mt-5 text-ivory"
                accentLines={[2]}
                accentClassName="text-lime"
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="border-t border-ivory/18">
                {measurementCommitments.map((commitment, index) => (
                  <Reveal key={commitment} delay={index * 0.04}>
                    <li className="flex items-start gap-4 border-b border-ivory/18 py-5">
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-lime/40 text-lime">
                        <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                      <p className="text-sm leading-relaxed text-ivory/72">{commitment}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-ivory/40">
                These commitments describe intent. Verification and governance
                arrangements will be published when confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow text-forest/55">Questions</p>
            <h2 className="display-lg mt-5 text-forest">On the record.</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest/60">
              The most important accountability question is often the one an
              institution would prefer not to answer in public.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={impactFaqs} />
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="Accountability in practice"
        title="Ask what we would measure before you commission the work."
        body="A useful engagement begins with an honest conversation about evidence, attribution and what success would look like from the outside. Bring that question to us early."
        primary={{ label: "Partner With Us", to: "/partner-with-us" }}
        secondary={{ label: "Read the insights", to: "/insights" }}
      />
    </>
  );
}
