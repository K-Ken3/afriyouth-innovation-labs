import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageMeta } from "@/content/seo";
import { getInvolvedFaqs, getInvolvedRoutes, interestOptions } from "@/content/pages";
import { programs } from "@/content/programs";
import { InterestForm } from "@/components/forms/InterestForm";
import { PageHero } from "@/components/ui/PageHero";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { PageCTA } from "@/components/sections/PageCTA";

const notThis = [
  "An application for a programme that is not currently open.",
  "A funding request or a commitment to fund.",
  "A guarantee of a place — every call has its own selection process.",
];

export default function GetInvolvedPage() {
  usePageMeta(pageMeta.getInvolved);
  const openPrograms = programs.filter((program) => program.status === "open").length;

  return (
    <>
      <PageHero
        eyebrow="Get involved"
        chapter="06"
        title={["Start where your", "curiosity is", "strongest."]}
        intro="AfriYouth works with young innovators, researchers, designers, policy thinkers and venture builders — and with the institutions that want to make their work possible. Calls open through the year; you can register your interest at any time."
        meta={[
          {
            label: "Open calls",
            value: `${String(openPrograms).padStart(2, "0")} open now`,
          },
          { label: "Register interest", value: "Any time" },
          { label: "Response", value: "By email" },
          { label: "Eligibility", value: "Published with calls" },
        ]}
      />

      <section className="section bg-ivory">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Ways in"
            meta="Three entry points"
            title={
              <KineticHeading
                lines={["There is more", "than one way", "to begin."]}
                className="display-xl text-forest"
                accentLines={[2]}
                accentClassName="text-forest/32"
              />
            }
            intro="Nothing here requires you to have a finished idea. The first step is usually a question, a theme or a decision you want to understand better."
          />

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {getInvolvedRoutes.map((route, index) => (
              <Reveal key={route.number} delay={index * 0.05} className="h-full">
                <Link
                  to={route.to}
                  className="group flex h-full flex-col rounded-2xl border border-forest/15 bg-paper p-6 transition-colors hover:border-forest/35 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-2xl tracking-[-0.05em] text-forest/45">
                      {route.number}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-forest/60 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest"
                    />
                  </div>
                  <h3 className="display-md mt-8 text-forest">{route.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-forest/60">
                    {route.text}
                  </p>
                  <span className="link-underline mt-6 inline-flex items-center gap-2 self-start text-sm font-medium text-forest">
                    {route.cta}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-forest/12 bg-sage/30">
        <div className="container-editorial section-tight">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="eyebrow text-forest/60">What you can signal</p>
              <KineticHeading
                lines={["Tell us where", "the interest sits."]}
                className="display-lg mt-5 text-forest"
                accentLines={[1]}
                accentClassName="text-forest/32"
              />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-forest/60">
                Calls are shaped around real areas of interest. Registering helps
                us send relevant opportunities; it does not create an application
                or a commitment.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {interestOptions.map((option) => (
                  <li key={option} className="flex items-start gap-2.5 text-sm text-forest/70">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-3.5 w-3.5 flex-none text-forest/60"
                      strokeWidth={2}
                    />
                    {option}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex items-start gap-3 rounded-xl border border-forest/15 bg-ivory/70 p-4">
                <Info aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-forest/60" />
                <p className="text-xs leading-relaxed text-forest/60">
                  We use your details only to respond to your enquiry and to send
                  relevant calls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-forest/60">Before you submit</p>
                <h2 className="display-lg mt-5 text-forest">This is not an application.</h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest/60">
                  The form asks for the context we need to route your interest.
                  Nothing here is an application until a call opens.
                </p>
                <ul className="mt-6 border-t border-forest/15">
                  {notThis.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-b border-forest/15 py-4 text-sm leading-relaxed text-forest/65"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 flex-none rounded-full bg-clay"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Badge variant="soft" dot className="mt-6">
                  {openPrograms === 0 ? "Calls announced as cohorts open" : `${openPrograms} open now`}
                </Badge>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div id="interest-form" className="scroll-mt-28">
                <InterestForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-forest/12 bg-sage/30">
        <div className="container-editorial section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <p className="eyebrow text-forest/60">Questions</p>
              <h2 className="display-lg mt-5 text-forest">Before you ask.</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest/60">
                Straight answers about what is open, what is not, and what happens
                after you register interest.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Accordion items={getInvolvedFaqs} />
            </div>
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="For institutions"
        title="The same questions can become a partnership."
        body="If you are commissioning research, designing a programme or looking for a learning partner, the route in is a scoping conversation — not a form submission."
        primary={{ label: "Partner With Us", to: "/partner-with-us" }}
        secondary={{ label: "Contact the lab", to: "/contact" }}
      />
    </>
  );
}
