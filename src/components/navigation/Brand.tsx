import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import { BrandMark } from "./BrandMark";

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
      className={cn(
        "group inline-flex items-center gap-2.5 leading-none",
        dark ? "text-ivory" : "text-forest",
        className,
      )}
    >
      <BrandMark
        className={cn(
          "h-8 w-auto flex-none transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5 sm:h-9",
          dark ? "text-ivory" : "text-forest",
        )}
      />
      <span className="flex flex-col justify-center">
        <span className="flex items-start gap-1 font-display text-[1.1rem] font-semibold tracking-[-0.05em] sm:text-[1.2rem]">
          AFRIYOUTH
          <span
            aria-hidden="true"
            className="mt-[0.15rem] h-1.5 w-1.5 flex-none rounded-full bg-lime transition-transform duration-300 ease-editorial group-hover:scale-125"
          />
        </span>
        <span
          className={cn(
            "mt-[0.28rem] text-[0.48rem] font-medium uppercase tracking-[0.32em]",
            dark ? "text-ivory/55" : "text-forest/60",
          )}
        >
          Innovation Labs
        </span>
        <span className="sr-only">— home</span>
      </span>
    </Link>
  );
}
