import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";

const orbits = [
  { rx: 252, ry: 104, rotate: -26 },
  { rx: 252, ry: 104, rotate: 34 },
  { rx: 190, ry: 74, rotate: 82 },
];

/**
 * Original abstract hero composition: a 3D-inspired evidence sphere held by
 * five practice orbits. Built from SVG + GSAP so it stays crisp and light.
 */
export function OrbitalAtlas({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || reduced) return;

    const context = gsap.context(() => {
      const orbitGroups = gsap.utils.toArray<SVGGElement>("[data-orbit]");
      orbitGroups.forEach((orbit, index) => {
        gsap.to(orbit, {
          rotation: index % 2 === 0 ? 360 : -360,
          svgOrigin: "300 350",
          duration: 80 + index * 22,
          repeat: -1,
          ease: "none",
        });
      });

      gsap.to("[data-sphere]", {
        scale: 1.025,
        svgOrigin: "300 350",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("[data-node]", {
        scale: 1.7,
        opacity: 0.45,
        svgOrigin: "center",
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.55,
        ease: "sine.inOut",
      });

      gsap.to("[data-float]", {
        y: -9,
        duration: 4.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.7,
      });
    }, element);

    return () => context.revert();
  }, [reduced]);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || reduced || !finePointer) return;

    const layers = Array.from(
      element.querySelectorAll<SVGGElement>("[data-depth]"),
    ).map((layer) => ({
      depth: Number(layer.getAttribute("data-depth") ?? 1),
      x: gsap.quickTo(layer, "x", { duration: 0.7, ease: "power2.out" }),
      y: gsap.quickTo(layer, "y", { duration: 0.7, ease: "power2.out" }),
    }));
    const floats = Array.from(
      element.querySelectorAll<HTMLElement>("[data-parallax]"),
    ).map((node) => ({
      depth: Number(node.getAttribute("data-parallax") ?? 1),
      x: gsap.quickTo(node, "x", { duration: 0.8, ease: "power2.out" }),
      y: gsap.quickTo(node, "y", { duration: 0.8, ease: "power2.out" }),
    }));

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      layers.forEach((layer) => {
        layer.x(nx * 16 * layer.depth);
        layer.y(ny * 12 * layer.depth);
      });
      floats.forEach((node) => {
        node.x(nx * 10 * node.depth);
        node.y(ny * 8 * node.depth);
      });
    };

    const handleLeave = () => {
      layers.forEach((layer) => {
        layer.x(0);
        layer.y(0);
      });
      floats.forEach((node) => {
        node.x(0);
        node.y(0);
      });
    };

    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", handleLeave);
    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);
    };
  }, [reduced, finePointer]);

  return (
    <div ref={root} className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="absolute -bottom-4 -left-4 -right-4 -top-4 rounded-[2.25rem] border border-forest/20 sm:-bottom-5 sm:-left-5 sm:-right-5 sm:-top-5"
      />
      <div className="on-dark grain relative overflow-hidden rounded-[1.75rem] bg-forest shadow-[0_30px_80px_-40px_rgba(21,61,50,0.6)]">
        <svg
          viewBox="0 0 600 720"
          role="img"
          aria-label="Abstract system map: an evidence sphere orbited by five connected practices — research, design, enterprise, policy and foresight — around a continuous learning loop."
          className="block h-auto w-full"
        >
          <defs>
            <radialGradient id="atlas-glow" cx="50%" cy="48%" r="50%">
              <stop offset="0%" stopColor="#C9F36A" stopOpacity="0.3" />
              <stop offset="65%" stopColor="#C9F36A" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#C9F36A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="atlas-sphere" cx="34%" cy="28%" r="82%">
              <stop offset="0%" stopColor="#F4FFD8" />
              <stop offset="45%" stopColor="#C9F36A" />
              <stop offset="100%" stopColor="#89A93F" />
            </radialGradient>
            <linearGradient id="atlas-sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <pattern id="atlas-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="1.4" cy="1.4" r="1" fill="#F5F3EB" opacity="0.32" />
            </pattern>
            <pattern id="atlas-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0H0v60" fill="none" stroke="#F5F3EB" strokeOpacity="0.06" />
            </pattern>
            <clipPath id="atlas-clip">
              <circle cx="300" cy="350" r="122" />
            </clipPath>
            <filter id="atlas-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
          </defs>

          <rect width="600" height="720" fill="#153D32" />
          <rect width="600" height="720" fill="url(#atlas-grid)" />
          <rect
            x="360"
            y="40"
            width="200"
            height="240"
            fill="url(#atlas-dots)"
            opacity="0.5"
            data-depth="0.4"
          />

          <circle cx="300" cy="350" r="260" fill="url(#atlas-glow)" />

          <g data-depth="0.7" opacity="0.9">
            {orbits.map((orbit, index) => (
              <g
                key={index}
                data-orbit
                style={{ transformOrigin: "300px 350px" }}
              >
                <ellipse
                  cx="300"
                  cy="350"
                  rx={orbit.rx}
                  ry={orbit.ry}
                  transform={`rotate(${orbit.rotate} 300 350)`}
                  fill="none"
                  stroke="#F5F3EB"
                  strokeOpacity={index === 2 ? 0.2 : 0.26}
                  strokeWidth="0.9"
                  strokeDasharray={index === 2 ? "2 8" : undefined}
                />
              </g>
            ))}
            <circle
              cx="300"
              cy="350"
              r="212"
              fill="none"
              stroke="#C9F36A"
              strokeOpacity="0.18"
              strokeDasharray="1 10"
            />
            <circle
              cx="300"
              cy="350"
              r="284"
              fill="none"
              stroke="#F5F3EB"
              strokeOpacity="0.08"
            />
          </g>

          <g fill="none" stroke="#F5F3EB" strokeOpacity="0.2" strokeDasharray="3 7">
            <path d="M300 350C238 300 170 224 120 158" />
            <path d="M300 350C366 292 430 224 476 154" />
            <path d="M300 350C398 374 456 410 496 466" />
            <path d="M300 350C356 420 358 508 344 604" />
            <path d="M300 350C214 368 150 408 106 466" />
          </g>

          <g data-orbit style={{ transformOrigin: "300px 350px" }}>
            <path
              d="M300 108a242 242 0 0 1 210 121"
              fill="none"
              stroke="#C9F36A"
              strokeOpacity="0.7"
              strokeWidth="1.4"
              strokeDasharray="46 260"
            />
            <circle cx="300" cy="108" r="3" fill="#C9F36A" />
          </g>

          <ellipse cx="300" cy="548" rx="150" ry="20" fill="#0B241D" opacity="0.45" filter="url(#atlas-soft)" />

          <g data-sphere>
            <circle cx="300" cy="350" r="122" fill="url(#atlas-sphere)" />
            <g clipPath="url(#atlas-clip)" opacity="0.32" stroke="#153D32" fill="none">
              <ellipse cx="300" cy="350" rx="122" ry="42" transform="rotate(-24 300 350)" strokeWidth="0.8" />
              <ellipse cx="300" cy="350" rx="122" ry="42" transform="rotate(28 300 350)" strokeWidth="0.8" />
              <ellipse cx="300" cy="350" rx="42" ry="122" strokeWidth="0.8" />
            </g>
            <ellipse cx="260" cy="302" rx="52" ry="26" fill="url(#atlas-sheen)" transform="rotate(-24 260 302)" />
            <circle cx="300" cy="350" r="122" fill="none" stroke="#F5F3EB" strokeOpacity="0.28" />
          </g>

          <path
            id="atlas-circle-text"
            d="M300 350m-160 0a160 160 0 1 1 320 0a160 160 0 1 1-320 0"
            fill="none"
          />
          <text fill="#F5F3EB" fillOpacity="0.46" fontSize="8" letterSpacing="3.4" fontFamily="DM Sans, sans-serif">
            <textPath href="#atlas-circle-text" startOffset="2%">
              EVIDENCE · DESIGN · ENTERPRISE · POLICY · FORESIGHT · MEASUREMENT ·
            </textPath>
          </text>

          <g fontFamily="DM Sans, sans-serif" fontSize="8.5" letterSpacing="2.2" fill="#F5F3EB">
            <g>
              <circle cx="120" cy="158" r="14" fill="none" stroke="#C9F36A" strokeOpacity="0.5" data-node />
              <circle cx="120" cy="158" r="4" fill="#C9F36A" />
              <text x="142" y="156" fillOpacity="0.85">RESEARCH</text>
              <text x="142" y="170" fillOpacity="0.45">EVIDENCE</text>
            </g>
            <g>
              <circle cx="476" cy="154" r="14" fill="none" stroke="#C9F36A" strokeOpacity="0.5" data-node />
              <circle cx="476" cy="154" r="4" fill="#C9F36A" />
              <text x="464" y="132" textAnchor="end" fillOpacity="0.85">DESIGN</text>
              <text x="464" y="146" textAnchor="end" fillOpacity="0.45">CO-CREATION</text>
            </g>
            <g>
              <circle cx="496" cy="466" r="14" fill="none" stroke="#C9F36A" strokeOpacity="0.5" data-node />
              <circle cx="496" cy="466" r="4" fill="#C9F36A" />
              <text x="480" y="494" textAnchor="end" fillOpacity="0.85">ENTERPRISE</text>
              <text x="480" y="508" textAnchor="end" fillOpacity="0.45">OWNERSHIP</text>
            </g>
            <g>
              <circle cx="344" cy="604" r="14" fill="none" stroke="#C9F36A" strokeOpacity="0.5" data-node />
              <circle cx="344" cy="604" r="4" fill="#C9F36A" />
              <text x="344" y="632" textAnchor="middle" fillOpacity="0.85">POLICY</text>
              <text x="344" y="646" textAnchor="middle" fillOpacity="0.45">UPTAKE</text>
            </g>
            <g>
              <circle cx="106" cy="466" r="14" fill="none" stroke="#C9F36A" strokeOpacity="0.5" data-node />
              <circle cx="106" cy="466" r="4" fill="#C9F36A" />
              <text x="90" y="494" fillOpacity="0.85">FORESIGHT</text>
              <text x="90" y="508" fillOpacity="0.45">LEARNING</text>
            </g>
          </g>

          <g data-float>
            <rect x="44" y="64" width="112" height="26" rx="13" fill="#F5F3EB" fillOpacity="0.08" stroke="#F5F3EB" strokeOpacity="0.2" />
            <circle cx="60" cy="77" r="3" fill="#C9F36A" />
            <text x="72" y="80" fill="#F5F3EB" fillOpacity="0.78" fontSize="8" letterSpacing="1.6" fontFamily="DM Sans, sans-serif">
              SYSTEM MAP 001
            </text>
          </g>

          <g data-float>
            <text x="540" y="660" textAnchor="end" fill="#F5F3EB" fillOpacity="0.35" fontSize="8" letterSpacing="2" fontFamily="DM Sans, sans-serif">
              LEARNING LOOP / ACTIVE
            </text>
          </g>

          <g stroke="#F5F3EB" strokeOpacity="0.35">
            <path d="M28 28h22M28 28v22" fill="none" />
            <path d="M572 692h-22M572 692v-22" fill="none" />
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-forest/85 to-transparent px-5 pb-5 pt-16 text-[0.625rem] uppercase tracking-[0.16em] text-ivory/60 sm:px-7 sm:pb-7">
          <p>A connected practice</p>
          <p className="hidden text-right sm:block">
            Research → Design → Enterprise
            <br />
            → Policy → Foresight
          </p>
        </div>

        <div
          data-parallax="1.4"
          className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block"
        >
          <span className="vertical-label text-ivory/30">AfriYouth / Labs</span>
        </div>
      </div>
    </div>
  );
}
