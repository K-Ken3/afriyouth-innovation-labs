import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type KineticHeadingProps = {
  lines: ReactNode[];
  label?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  lineClassName?: string;
  delay?: number;
  scroll?: boolean;
  start?: string;
  accentLines?: number[];
  accentClassName?: string;
  id?: string;
};

/**
 * Masked line-by-line headline reveal. Each line sits in an overflow-hidden
 * mask so the motion never affects layout height or causes content shift.
 */
export function KineticHeading({
  lines,
  label,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  scroll = true,
  start = "top 85%",
  accentLines = [],
  accentClassName = "text-forest/35",
  id,
}: KineticHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    const targets = element.querySelectorAll<HTMLElement>("[data-kinetic-line]");
    if (!targets.length) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        delay,
        scrollTrigger: scroll
          ? { trigger: element, start, once: true }
          : undefined,
      });
      timeline.fromTo(
        targets,
        { yPercent: 115, rotate: 1.5 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.085,
        },
      );
    }, element);

    return () => context.revert();
  }, [reduced, delay, scroll, start]);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(className)}
      aria-label={label ?? lines.filter((line) => typeof line === "string").join(" ")}
    >
      {lines.map((line, index) => (
        <span className="mask-line" key={index} aria-hidden="true">
          <span
            data-kinetic-line
            className={cn(
              "block will-change-transform",
              accentLines.includes(index) ? accentClassName : undefined,
              lineClassName,
            )}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
