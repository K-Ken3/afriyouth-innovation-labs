import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function EmptyState({
  title,
  body,
  actions,
  className,
  theme = "light",
  marker = "No published records",
}: {
  title: string;
  body: string;
  actions?: ReactNode;
  className?: string;
  theme?: "light" | "dark";
  marker?: string;
}) {
  const dark = theme === "dark";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-dashed px-6 py-12 sm:px-10 sm:py-16",
        dark ? "border-ivory/25 bg-ivory/[0.03]" : "border-forest/25 bg-sage/25",
        className,
      )}
    >
      <span
        className={cn(
          "eyebrow mb-5",
          dark ? "text-ivory/55" : "text-forest/50",
        )}
      >
        {marker}
      </span>
      <h3
        className={cn(
          "display-md max-w-xl",
          dark ? "text-ivory" : "text-forest",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-4 max-w-2xl text-sm leading-relaxed",
          dark ? "text-ivory/65" : "text-forest/65",
        )}
      >
        {body}
      </p>
      {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-6 -top-8 font-display text-[9rem] leading-none tracking-tighter",
          dark ? "text-ivory/[0.04]" : "text-forest/[0.05]",
        )}
      >
        Ø
      </div>
    </div>
  );
}
