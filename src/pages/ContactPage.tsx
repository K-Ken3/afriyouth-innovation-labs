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
    value: site.contact.email ?? "Pending verification",
    icon: Mail,
    note: "No address has been supplied for publication.",
  },
  {
    label: "Telephone",
    value: site.contact.phone ?? "Pending verification",
    icon: Phone,
    note: "No number has been supplied for publication.",
  },
  {
    label: "Office",
    value: site.contact.address ?? "Pending verification",
    icon: MapPin,
    note: "Location details are not stated in this prototype.",
  },
];

export default function ContactPage() {
  usePageMeta(pageMeta.contact);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        chapter="08"
        title={["A direct line,", "once it", "exists."]}
        intro="Official contact channels are not yet published. This page shows how the contact experience will work — and is explicit about what is still missing rather than inventing an address."
        meta={[
          { label: "Email", value: "Pending" },
          { label: "Telephone", value: "Pending" },
          { label: "Office", value: "Pending" },
          { label: "Contact form", value: "Prototype only" },
        ]}
      />

      <section className="section bg-ivory">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Official channels"
            meta="Awaiting verification"
            title={
              <KineticHeading
                lines={["Nothing invented.", "Nothing implied."]}
                className="display-lg text-forest"
                accentLines={[1]}
                accentClassName="text-forest/32"
              />
            }
            intro="A missing contact detail is a content task, not a design problem. The layout is ready for verified information when it arrives."
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
                      <Badge variant="provisional" dot>
                        Pending
                      </Badge>
                    </div>
                    <p className="mt-7 text-[0.625rem] uppercase tracking-[0.16em] text-forest/40">
                      {channel.label}
                    </p>
                    <p className="mt-2 font-display text-xl tracking-[-0.03em] text-forest/55">
                      {channel.value}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-forest/50">{channel.note}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <div className="rounded-2xl border border-forest/15 bg-sage/35 p-6 lg:col-span-8">
              <p className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/45">
                Contact status
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-forest/70">
                {site.contact.note}
              </p>
            </div>
            <div className="rounded-2xl border border-forest/15 bg-sage/35 p-6 lg:col-span-4">
              <p className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/45">
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
                <p className="eyebrow text-forest/55">Contact form</p>
                <h2 className="display-lg mt-5 text-forest">A message, held locally.</h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest/60">
                  The form validates your input in the browser and shows the
                  success state an official endpoint would trigger. It does not
                  transmit or store anything.
                </p>
                <div className="mt-6 space-y-4 border-t border-forest/15 pt-4">
                  <div className="flex items-start gap-3">
                    <Globe2 aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-forest/50" />
                    <p className="text-xs leading-relaxed text-forest/60">
                      Official email, phone and office details will replace the
                      pending states above when verified.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Accessibility
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 flex-none text-forest/50"
                    />
                    <p className="text-xs leading-relaxed text-forest/60">
                      An official accessibility feedback route is also pending. The
                      prototype supports keyboard navigation, visible focus and
                      reduced motion.
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
            <p className="eyebrow text-forest/55">Questions</p>
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
