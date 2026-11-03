import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
  duration?: number;
};

/**
 * Scroll-triggered entrance. Content is styled visible by default and hidden
 * only once GSAP is ready, so no-JS and reduced-motion users see everything.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  start = "top 88%",
  duration = 0.9,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start,
            once: true,
          },
        },
      );
    }, element);

    return () => context.revert();
  }, [reduced, delay, y, start, duration]);

  const Tag = "div";
  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
