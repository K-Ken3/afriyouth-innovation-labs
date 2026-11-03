import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { approachNodes } from "@/content/areas";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const CENTER = { x: 400, y: 320 };

function position(node: { x: number; y: number }) {
  return { x: (node.x / 100) * 800, y: (node.y / 100) * 640 };
}

function pathFor(node: { x: number; y: number }) {
  const target = position(node);
  const controlX = (CENTER.x + target.x) / 2 + (target.y - CENTER.y) * 0.16;
  const controlY = (CENTER.y + target.y) / 2 - (target.x - CENTER.x) * 0.12;
  return `M${CENTER.x} ${CENTER.y} Q${controlX} ${controlY} ${target.x} ${target.y}`;
}

/**
 * Interactive practice map. Nodes are real buttons (keyboard accessible);
 * selecting one redraws the connecting path and updates the detail panel.
 */
export function ApproachSystem({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState(approachNodes[0].id);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const active = approachNodes.find((node) => node.id === activeId) ?? approachNodes[0];
  const activeIndex = approachNodes.findIndex((node) => node.id === active.id);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || reduced) return;

    const context = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>("[data-system-path]");
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.7,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: element,
            start: "top 78%",
            once: true,
          },
        });
      });
    }, element);

    return () => context.revert();
  }, [reduced]);

  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-10", className)}>
      <div className="lg:col-span-7">
        <div
          ref={root}
          className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-ivory/15 bg-ivory/[0.025]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,243,106,0.06),transparent_62%)]" />

          <svg
            viewBox="0 0 800 640"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="204"
              fill="none"
              stroke="#F5F3EB"
              strokeOpacity="0.1"
              strokeDasharray="2 8"
            />
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="268"
              fill="none"
              stroke="#F5F3EB"
              strokeOpacity="0.05"
            />
            {approachNodes.map((node) => {
              const d = pathFor(node);
              const isActive = node.id === active.id;
              return (
                <g key={node.id}>
                  <path
                    data-system-path
                    d={d}
                    fill="none"
                    stroke={isActive ? "#C9F36A" : "#F5F3EB"}
                    strokeOpacity={isActive ? 0.85 : 0.16}
                    strokeWidth={isActive ? 1.6 : 1}
                    className="transition-[stroke,stroke-opacity,stroke-width] duration-500"
                  />
                  {isActive && !reduced ? (
                    <circle r="3.2" fill="#C9F36A">
                      <animateMotion dur="3.2s" repeatCount="indefinite" path={d} />
                    </circle>
                  ) : null}
                </g>
              );
            })}
            <circle cx={CENTER.x} cy={CENTER.y} r="6" fill="#C9F36A" opacity="0.9" />
            <circle cx={CENTER.x} cy={CENTER.y} r="18" fill="none" stroke="#C9F36A" strokeOpacity="0.35" />
          </svg>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 -m-3 animate-pulse-ring rounded-full border border-lime/40" />
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-lime/40 bg-forest/95 text-center backdrop-blur-sm sm:h-28 sm:w-28">
              <span className="text-[0.5rem] uppercase tracking-[0.18em] text-ivory/45">Continuous</span>
              <span className="mt-1 font-display text-sm leading-tight tracking-[-0.02em] text-lime sm:text-base">
                Impact
                <br />
                loop
              </span>
            </div>
          </div>

          {approachNodes.map((node) => {
            const isActive = node.id === active.id;
            return (
              <button
                key={node.id}
                type="button"
                aria-pressed={isActive}
                aria-controls="approach-detail"
                onClick={() => setActiveId(node.id)}
                onMouseEnter={() => setActiveId(node.id)}
                onFocus={() => setActiveId(node.id)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className={cn(
                  "absolute z-10 flex min-h-9 -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.1em] transition-all duration-300 ease-editorial sm:px-3 sm:text-[0.65rem]",
                  isActive
                    ? "border-lime bg-lime text-forest"
                    : "border-ivory/25 bg-forest/80 text-ivory/70 backdrop-blur-sm hover:border-ivory/60 hover:text-ivory",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isActive ? "bg-forest" : "bg-lime/80",
                  )}
                />
                {node.shortLabel}
              </button>
            );
          })}

          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.16em] text-ivory/35 sm:bottom-5 sm:left-5">
            <RotateCcw aria-hidden="true" className="h-3 w-3" />
            Select a node to trace the connection
          </div>
          <span className="absolute right-4 top-4 font-display text-xs tabular-nums tracking-[0.12em] text-ivory/40 sm:right-5 sm:top-5">
            {String(activeIndex + 1).padStart(2, "0")} / 05
          </span>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="relative h-full rounded-2xl border border-ivory/15 bg-ivory/[0.035] p-6 sm:p-8">
          <p className="eyebrow text-lime/80">Practice {active.number}</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="display-md mt-5 text-ivory">{active.label}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/65">{active.description}</p>

              <div className="mt-8 border-t border-ivory/15 pt-4">
                <div className="flex items-start justify-between gap-6">
                  <span className="text-[0.625rem] uppercase tracking-[0.16em] text-ivory/40">
                    Returns to the loop
                  </span>
                  <span className="text-right text-xs font-medium text-ivory/80">{active.output}</span>
                </div>
              </div>

              <Link
                to={`/what-we-do#${active.areaId}`}
                className="link-underline group mt-7 inline-flex text-sm text-lime"
              >
                Explore this practice
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>
          </AnimatePresence>

          <div
            id="approach-detail"
            className="sr-only"
            aria-live="polite"
          >
            Selected practice: {active.label}. {active.description}
          </div>
        </div>
      </div>
    </div>
  );
}
