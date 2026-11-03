import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type MaskRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  start?: string;
};

/** Editorial clip-path reveal for image plates and graphic compositions. */
export function MaskReveal({
  children,
  className,
  delay = 0,
  duration = 1.15,
  start = "top 88%",
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration,
          delay,
          ease: "expo.out",
          scrollTrigger: { trigger: element, start, once: true },
        },
      );
    }, element);

    return () => context.revert();
  }, [reduced, delay, duration, start]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
