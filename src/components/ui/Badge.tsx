import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "lime" | "outline" | "dark" | "soft" | "provisional";

const styles: Record<BadgeVariant, string> = {
  lime: "bg-lime text-forest",
  outline: "border border-forest/20 text-forest/75",
  dark: "bg-forest text-ivory",
  soft: "bg-sage/60 text-forest/80",
  provisional: "border border-forest/20 bg-sage/40 text-forest/70",
};

export function Badge({
  children,
  variant = "outline",
  className,
  dot = false,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.625rem] font-semibold uppercase leading-none tracking-[0.14em]",
        styles[variant],
        className,
      )}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "lime" || variant === "dark" ? "bg-current" : "bg-clay",
          )}
        />
      ) : null}
      {children}
    </span>
  );
}
