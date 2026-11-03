import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A restrained desktop cursor accent. The native cursor is retained as a
 * precise dot; a trailing ring adds affordance only on fine pointers and is
 * completely absent for touch and reduced-motion users.
 */
export function CursorFollower() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const enabled = finePointer && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-active");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;
    let seen = false;

    const render = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      frame = window.requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!seen) {
        seen = true;
        ringX = pointerX;
        ringY = pointerY;
        setVisible(true);
      }
      const target = event.target as Element | null;
      setHovering(
        Boolean(
          target?.closest(
            "a, button, [role='button'], input, select, textarea, summary, [data-cursor='hover']",
          ),
        ),
      );
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);
    document.addEventListener("pointerenter", handleEnter);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    frame = window.requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("cursor-active");
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
      document.removeEventListener("pointerenter", handleEnter);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <div ref={ringRef} className="fixed left-0 top-0">
        <div
          className={[
            "flex items-center justify-center rounded-full border-2 border-white/90 bg-white/[0.06] mix-blend-difference transition-[width,height,background-color,border-color] duration-200 ease-out",
            hovering ? "h-14 w-14 bg-white/25" : "h-9 w-9",
            pressed ? "scale-90" : "",
            visible ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>
      <div ref={dotRef} className="fixed left-0 top-0">
        <div
          className={[
            "h-2 w-2 rounded-full bg-lime shadow-[0_0_0_2px_rgba(21,61,50,0.85),0_0_10px_rgba(201,243,106,0.9)] transition-opacity duration-200",
            visible ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>
    </div>
  );
}
