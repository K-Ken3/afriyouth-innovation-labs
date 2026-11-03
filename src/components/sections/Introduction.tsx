import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, RotateCcw } from "lucide-react";
import { purpose } from "@/content/site";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { PhotoPlate } from "@/components/graphics/PhotoPlate";
import { photos } from "@/content/photos";

export function Introduction() {
  return (
    <section aria-labelledby="purpose-heading" className="section bg-ivory">
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-forest/60">Who we are</p>
            </Reveal>
            <KineticHeading
              id="purpose-heading"
              lines={["A lab for", "the questions", "that shape", "African", "futures."]}
              className="display-lg mt-6 max-w-xl text-forest"
            />
            <Reveal delay={0.2} className="mt-9 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-14 bg-forest/40" />
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-forest/50">
                One connected practice
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="lede text-forest/85">{purpose.paragraphs[0]}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-6">
              <p className="body-copy">{purpose.paragraphs[1]}</p>
            </Reveal>
            <Reveal delay={0.18} className="mt-9">
              <Link
                to="/about"
                className="link-underline group text-sm font-medium text-forest"
              >
                Read our purpose
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <MaskReveal className="rounded-2xl">
              <PhotoPlate
                photo={photos.teamConversation}
                variant={1}
                className="aspect-[4/3] w-full"
                title="The connected practice"
                index="01"
              />
            </MaskReveal>
            <div className="relative z-10 -mt-10 ml-5 mr-5 max-w-md bg-lime p-5 sm:ml-8 sm:p-6">
              <div className="flex items-start gap-3">
                <RotateCcw
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-none text-forest/70"
                  strokeWidth={1.6}
                />
                <p className="font-display text-base leading-snug tracking-[-0.02em] text-forest sm:text-lg">
                  {purpose.loop}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ol className="border-t border-forest/20">
              {purpose.relationship.map((item, index) => (
                <li key={item.label}>
                  <Reveal delay={index * 0.06}>
                    <div className="group flex items-start gap-4 border-b border-forest/15 py-5 sm:gap-6">
                      <span className="mt-1 font-display text-[0.65rem] tabular-nums tracking-[0.14em] text-forest/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-display text-2xl leading-none tracking-[-0.035em] text-forest">
                            {item.label}
                          </h3>
                          {index < purpose.relationship.length - 1 ? (
                            <ArrowDown
                              aria-hidden="true"
                              className="h-4 w-4 text-forest/25 transition-transform duration-300 group-hover:translate-y-1"
                            />
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-forest/60">{item.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal delay={0.2} className="mt-5">
              <p className="text-xs leading-relaxed text-forest/45">
                Each part strengthens the others. The loop is the point — not a
                one-way route from research to a report.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
