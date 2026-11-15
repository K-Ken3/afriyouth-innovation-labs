import { Accessibility, Globe2, Mail, MapPin, Phone } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageMeta } from "@/content/seo";
import { contactFaqs } from "@/content/pages";
import { site } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { PageCTA } from "@/components/sections/PageCTA";

const channels = [
  {
    label: "Email",
    value: site.contact.email ?? "Use the enquiry form",
    icon: Mail,
    badge: "Via form",
    note: "The contact form opens a pre-addressed email draft in your mail client.",
  },
  {
    label: "Telephone",
    value: site.contact.phone ?? "Available on request",
    icon: Phone,
    badge: "On request",
    note: "Call details are shared with confirmed engagements and published here when finalised.",
  },
  {
    label: "Office",
    value: site.contact.address ?? "Available on request",
    icon: MapPin,
    badge: "On request",
    note: "The team works across Africa. Office details are shared with confirmed engagements.",
  },
];

export default function ContactPage() {
  usePageMeta(pageMeta.contact);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        chapter="08"
        title={["Start a", "conversation."]}
        intro="Tell us what you are working on. The form prepares a pre-addressed email draft, and partnership questions can start with the decision you need to inform."
        meta={[
          { label: "Email", value: "Enquiry form" },
          { label: "Telephone", value: "On request" },
          { label: "Office", value: "On request" },
          { label: "Form", value: "Email draft" },
        ]}
      />

      <section className="section bg-ivory">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Official channels"
            meta="Direct enquiries"
            title={
              <KineticHeading
                lines={["Direct contact,", "clearly routed."]}
                className="display-lg text-forest"
                accentLines={[1]}
                accentClassName="text-forest/32"
              />
            }
            intro="The form prepares a pre-addressed email draft for the team. Telephone and office details are published here as they are confirmed for each engagement."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <Reveal key={channel.label} delay={index * 0.05} className="h-full">
                  <div className="card-surface flex h-full flex-col p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-forest/70">
                        <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <Badge variant="soft">{channel.badge}</Badge>
                    </div>
                    <p className="mt-7 text-[0.625rem] uppercase tracking-[0.16em] text-forest/60">
                      {channel.label}
                    </p>
                    <p className="mt-2 font-display text-xl tracking-[-0.03em] text-forest">
                      {channel.value}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-forest/60">{channel.note}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <div className="rounded-2xl border border-forest/15 bg-sage/35 p-6 lg:col-span-8">
              <p className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/60">
                How enquiries reach us
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-forest/70">
                {site.contact.note}
              </p>
            </div>
            <div className="rounded-2xl border border-forest/15 bg-sage/35 p-6 lg:col-span-4">
              <p className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/60">
                Social channels
              </p>
              <p className="mt-3 text-sm leading-relaxed text-forest/65">{site.socialNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-forest/12 bg-sage/30">
        <div className="container-editorial section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-forest/60">Contact form</p>
                <h2 className="display-lg mt-5 text-forest">Start with your question.</h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest/60">
                  The form checks your details in the browser and then opens a
                  pre-addressed email draft. Nothing is stored on this site, and
                  nothing is sent until you send it.
                </p>
                <div className="mt-6 space-y-4 border-t border-forest/15 pt-4">
                  <div className="flex items-start gap-3">
                    <Globe2 aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-forest/60" />
                    <p className="text-xs leading-relaxed text-forest/60">
                      Please write in English or French and include the decision or
                      deadline your enquiry relates to.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Accessibility
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 flex-none text-forest/60"
                    />
                    <p className="text-xs leading-relaxed text-forest/60">
                      Report an accessibility issue by selecting Accessibility
                      feedback. The site supports keyboard navigation, visible focus
                      and reduced motion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow text-forest/60">Questions</p>
            <h2 className="display-lg mt-5 text-forest">About contacting us.</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest/60">
              Clear answers about channels, the form and where to direct different
              kinds of enquiry.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={contactFaqs} />
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="Partnership enquiries"
        title="A research or collaboration question?"
        body="The partnership route is scoped around a decision rather than a generic contact form. Start there if you represent an institution, funder, enterprise or network."
        primary={{ label: "Partner With Us", to: "/partner-with-us" }}
        secondary={{ label: "Explore what we do", to: "/what-we-do" }}
      />
    </>
  );
}
