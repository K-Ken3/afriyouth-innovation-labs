import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  theme?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
  id?: string;
  meta?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  actions,
  theme = "light",
  align = "start",
  className,
  id,
  meta,
}: SectionHeadingProps) {
  const dark = theme === "dark";
  return (
    <div className={cn("w-full", className)} id={id}>
      <div
        className={cn(
          "grid gap-8 lg:grid-cols-12 lg:gap-6",
          align === "center" && "text-center",
        )}
      >
        <div className={cn("lg:col-span-8", align === "center" && "lg:col-start-3")}>
          {eyebrow ? (
            <Reveal>
              <div
                className={cn(
                  "mb-5 flex items-center gap-4",
                  align === "center" && "justify-center",
                )}
              >
                <span className={cn("eyebrow", dark ? "text-lime" : "text-forest/70")}>
                  {eyebrow}
                </span>
                {meta ? (
                  <span
                    className={cn(
                      "hidden text-[0.625rem] uppercase tracking-[0.18em] sm:block",
                      dark ? "text-ivory/45" : "text-forest/40",
                    )}
                  >
                    {meta}
                  </span>
                ) : null}
              </div>
            </Reveal>
          ) : null}
          {title}
        </div>
        {intro || actions ? (
          <div
            className={cn(
              "flex flex-col gap-6 lg:col-span-4 lg:pt-10",
              align === "center" && "lg:col-span-6 lg:col-start-4 lg:items-center",
            )}
          >
            {intro ? (
              <Reveal delay={0.08}>
                <div
                  className={cn(
                    "body-copy max-w-md text-[0.95rem]",
                    dark ? "text-ivory/70" : "text-forest/70",
                    align === "center" && "mx-auto text-balance",
                  )}
                >
                  {typeof intro === "string" ? <p>{intro}</p> : intro}
                </div>
              </Reveal>
            ) : null}
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
