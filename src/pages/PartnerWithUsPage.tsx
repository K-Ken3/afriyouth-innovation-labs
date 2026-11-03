import { Check } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageMeta } from "@/content/seo";
import {
  partnerAudiences,
  partnerFaqs,
  partnerModels,
  partnerProcess,
  partnerQuestions,
} from "@/content/partners";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { PageHero } from "@/components/ui/PageHero";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { PageCTA } from "@/components/sections/PageCTA";

export default function PartnerWithUsPage() {
  usePageMeta(pageMeta.partner);

  return (
    <>
      <PageHero
        eyebrow="Partner with us"
        chapter="07"
        title={["A partner for", "the whole", "question."]}
        intro="Commission research, evaluation, co-design, policy analysis, enterprise support or professional learning from one connected team — or start with the part that is most useful now."
        meta={[
          { label: "Models", value: "05 collaboration types" },
          { label: "First step", value: "Scoping conversation" },
          { label: "Published partners", value: "None yet" },
          { label: "Content status", value: "Provisional" },
        ]}
      />

      <section className="section bg-ivory">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Collaboration models"
            meta="Five ways to work together"
            title={
              <KineticHeading
                lines={["Choose the", "question, not", "the product."]}
                className="display-xl text-forest"
                accentLines={[2]}
                accentClassName="text-forest/32"
              />
            }
            intro="These are starting points, not fixed packages. The practice is assembled around the decision, the context and the people who need to act on the result."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {partnerModels.map((model, index) => (
              <Reveal
                key={model.number}
                delay={index * 0.04}
                className={index === partnerModels.length - 1 ? "md:col-span-2" : undefined}
              >
                <article className="card-surface flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-2xl tracking-[-0.05em] text-forest/20">
                      {model.number}
                    </span>
                    <Badge variant="soft">Collaboration</Badge>
                  </div>
                  <h3 className="display-md mt-8 text-forest">{model.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-forest/65">
                    {model.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-forest/12 pt-4">
                    {model.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-forest/15 px-3 py-1 text-[0.625rem] uppercase tracking-[0.12em] text-forest/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark grain border-y border-ivory/15 bg-forest">
        <div className="container-editorial section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="eyebrow text-lime">Who we work with</p>
              <KineticHeading
                lines={["Different", "institutions.", "One table."]}
                className="display-lg mt-5 text-ivory"
                accentLines={[2]}
                accentClassName="text-lime"
              />
              <ul className="mt-8 border-t border-ivory/18">
                {partnerAudiences.map((audience) => (
                  <li
                    key={audience}
                    className="flex items-start gap-3 border-b border-ivory/18 py-4 text-sm text-ivory/72"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-3.5 w-3.5 flex-none text-lime"
                      strokeWidth={2}
                    />
                    {audience}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-ivory/40">
                No partners, clients or endorsements are named in this prototype.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow text-lime">The questions we bring</p>
              <ol className="mt-6 border-t border-ivory/18">
                {partnerQuestions.map((question, index) => (
                  <Reveal key={question} delay={index * 0.04}>
                    <li className="flex items-start gap-5 border-b border-ivory/18 py-5">
                      <span className="font-display text-xs tabular-nums tracking-[0.14em] text-ivory/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display text-xl leading-snug tracking-[-0.025em] text-ivory/85 sm:text-2xl">
                        {question}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-ivory/55">
                A good scoping conversation often changes the question. That is a
                useful outcome, not a delay.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="How it works"
            meta="From conversation to uptake"
            title={
              <KineticHeading
                lines={["No surprise", "outputs."]}
                className="display-lg text-forest"
                accentLines={[1]}
                accentClassName="text-forest/32"
              />
            }
            intro="The process is collaborative and visible. Roles, ethics, data protection and the definition of success are agreed before delivery begins."
          />

          <ol className="mt-12 grid gap-6 border-t border-forest/20 pt-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {partnerProcess.map((step, index) => (
              <li key={step.number} className="h-full">
                <Reveal delay={index * 0.05} className="h-full">
                  <div className="relative h-full border-l border-forest/20 pl-4 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-4">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[3px] top-0 h-1.5 w-1.5 rounded-full bg-forest lg:-top-[3px] lg:left-0"
                    />
                    <span className="font-display text-2xl tracking-[-0.04em] text-forest/20">
                      {step.number}
                    </span>
                    <h3 className="mt-3 font-display text-xl tracking-[-0.03em] text-forest">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-forest/60">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-forest/12 bg-sage/30">
        <div className="container-editorial section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-forest/55">Start a conversation</p>
                <h2 className="display-lg mt-5 text-forest">Outline the decision.</h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest/60">
                  We do not need a finished brief. A clear description of the
                  decision, the people affected and the constraints is enough to
                  begin.
                </p>
                <div className="mt-6 rounded-xl border border-forest/15 bg-ivory/70 p-5">
                  <p className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/45">
                    Response expectations
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-forest/65">
                    This prototype form does not send anything. Official
                    partnership channels and response times will be published when
                    confirmed.
                  </p>
                </div>
                <Badge variant="provisional" dot className="mt-6">
                  No partnerships published
                </Badge>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow text-forest/55">Questions</p>
            <h2 className="display-lg mt-5 text-forest">Before the first call.</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest/60">
              Practical answers about process, briefs, ethics and what is currently
              verifiable.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={partnerFaqs} />
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="Not sure where to start?"
        title="Bring the question. We will help frame it."
        body="If the scope is unclear, a short conversation can clarify whether research, design, policy, enterprise, learning or measurement is the right first move — or whether the work is not ready yet."
        primary={{ label: "Contact the lab", to: "/contact" }}
        secondary={{ label: "Explore what we do", to: "/what-we-do" }}
      />
    </>
  );
}
