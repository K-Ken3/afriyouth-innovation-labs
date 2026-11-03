import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

export function Brand({
  theme = "light",
  onClick,
  className,
}: {
  theme?: "light" | "dark";
  onClick?: () => void;
  className?: string;
}) {
  const dark = theme === "dark";
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="AfriYouth Innovation Labs — home"
      className={cn(
        "group inline-flex flex-col justify-center leading-none",
        dark ? "text-ivory" : "text-forest",
        className,
      )}
    >
      <span className="flex items-start gap-1 font-display text-[1.15rem] font-semibold tracking-[-0.055em] sm:text-[1.25rem]">
        AFRIYOUTH
        <span
          aria-hidden="true"
          className="mt-[0.15rem] h-1.5 w-1.5 rounded-full bg-lime transition-transform duration-300 ease-editorial group-hover:scale-125"
        />
      </span>
      <span
        className={cn(
          "mt-[0.3rem] text-[0.5rem] font-medium uppercase tracking-[0.34em]",
          dark ? "text-ivory/55" : "text-forest/55",
        )}
      >
        Innovation Labs
      </span>
    </Link>
  );
}
