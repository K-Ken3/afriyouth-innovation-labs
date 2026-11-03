import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type TickerProps = {
  items: string[];
  theme?: "light" | "dark";
  className?: string;
  speed?: number;
};

/**
 * Editorial ticker. The moving strip is decorative; the complete list is
 * exposed once to assistive technology. CSS pause + reduced-motion support.
 */
export function Ticker({ items, theme = "light", className, speed = 38 }: TickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dark = theme === "dark";

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const track = trackRef.current;
    if (!track) return;
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, [speed]);

  const row = (ariaHidden: boolean): ReactNode => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">
            {item}
          </span>
          <span
            aria-hidden="true"
            className={cn("h-1 w-1 rounded-full", dark ? "bg-lime" : "bg-clay")}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden border-y py-4",
        dark ? "border-ivory/15 text-ivory/75" : "border-forest/12 text-forest/65",
        className,
      )}
    >
      <p className="sr-only">{items.join(". ")}</p>
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
