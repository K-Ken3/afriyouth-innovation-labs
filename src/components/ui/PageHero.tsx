import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ArrowDownRight } from "lucide-react";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  eyebrow: string;
  chapter: string;
  title: string[];
  intro: string;
  meta?: { label: string; value: string }[];
  actions?: ReactNode;
  aside?: ReactNode;
  theme?: "light" | "dark";
};

export function PageHero({
  eyebrow,
  chapter,
  title,
  intro,
  meta = [],
  actions,
  aside,
  theme = "light",
}: PageHeroProps) {
  const dark = theme === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b pb-14 pt-10 sm:pb-20 sm:pt-14",
        dark
          ? "on-dark grain border-ivory/15 bg-forest text-ivory"
          : "border-forest/15 bg-ivory text-forest",
      )}
    >
      <div className="container-editorial relative z-10">
        <div
          className={cn(
            "mb-12 flex flex-wrap items-center justify-between gap-4 border-b pb-4 sm:mb-16",
            dark ? "border-ivory/15" : "border-forest/15",
          )}
        >
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em]">
              <li>
                <Link
                  to="/"
                  className={cn(
                    "transition-colors",
                    dark ? "text-ivory/55 hover:text-lime" : "text-forest/55 hover:text-forest",
                  )}
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className={dark ? "text-ivory/30" : "text-forest/30"}>
                /
              </li>
              <li className={cn("font-medium", dark ? "text-ivory/85" : "text-forest/85")}>
                {eyebrow}
              </li>
            </ol>
          </nav>
          <span
            className={cn(
              "text-[0.625rem] uppercase tracking-[0.2em]",
              dark ? "text-ivory/40" : "text-forest/40",
            )}
          >
            Chapter {chapter}
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Reveal y={12}>
              <p
                className={cn(
                  "eyebrow mb-7",
                  dark ? "text-lime" : "text-forest/60",
                )}
              >
                {eyebrow}
              </p>
            </Reveal>
            <KineticHeading
              as="h1"
              lines={title}
              scroll={false}
              delay={0.05}
              className="display-xl"
              accentLines={title.length > 1 ? [title.length - 1] : []}
              accentClassName={dark ? "text-lime" : "text-forest/35"}
            />
            <Reveal delay={0.35} className="mt-7 max-w-2xl">
              <p
                className={cn(
                  "lede",
                  dark ? "text-ivory/72" : "text-forest/70",
                )}
              >
                {intro}
              </p>
            </Reveal>
            {actions ? (
              <Reveal delay={0.45} className="mt-9 flex flex-wrap gap-3">
                {actions}
              </Reveal>
            ) : null}
          </div>

          <div className="lg:col-span-4">
            {aside ?? (
              <Reveal delay={0.3} className="lg:pt-2">
                <dl
                  className={cn(
                    "border-t",
                    dark ? "border-ivory/18" : "border-forest/18",
                  )}
                >
                  {meta.map((item) => (
                    <div
                      key={item.label}
                      className={cn(
                        "flex items-baseline justify-between gap-4 border-b py-3.5",
                        dark ? "border-ivory/18" : "border-forest/18",
                      )}
                    >
                      <dt
                        className={cn(
                          "text-[0.625rem] uppercase tracking-[0.16em]",
                          dark ? "text-ivory/45" : "text-forest/45",
                        )}
                      >
                        {item.label}
                      </dt>
                      <dd
                        className={cn(
                          "text-right text-xs font-medium",
                          dark ? "text-ivory/85" : "text-forest/80",
                        )}
                      >
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div
                  className={cn(
                    "mt-6 flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.18em]",
                    dark ? "text-ivory/35" : "text-forest/35",
                  )}
                >
                  <ArrowDownRight aria-hidden="true" className="h-3.5 w-3.5" />
                  Scroll to explore
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[13rem] leading-none tracking-tighter sm:text-[18rem]",
          dark ? "text-ivory/[0.04]" : "text-forest/[0.045]",
        )}
      >
        {chapter}
      </span>
    </section>
  );
}
