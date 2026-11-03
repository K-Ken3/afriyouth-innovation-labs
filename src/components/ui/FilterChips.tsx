import { cn } from "@/lib/cn";

export type FilterItem = {
  id: string;
  label: string;
  count?: number;
};

export function FilterChips({
  items,
  value,
  onChange,
  label,
  className,
  theme = "light",
}: {
  items: FilterItem[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
  theme?: "light" | "dark";
}) {
  const dark = theme === "dark";
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {items.map((item) => {
        const active = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(item.id)}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-200",
              active
                ? dark
                  ? "border-lime bg-lime text-forest"
                  : "border-forest bg-forest text-ivory"
                : dark
                  ? "border-ivory/25 text-ivory/75 hover:border-ivory/60 hover:text-ivory"
                  : "border-forest/20 text-forest/70 hover:border-forest/50 hover:text-forest",
            )}
          >
            {item.label}
            {typeof item.count === "number" ? (
              <span
                className={cn(
                  "text-[0.625rem] tabular-nums",
                  active ? "opacity-70" : "opacity-50",
                )}
              >
                {String(item.count).padStart(2, "0")}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
