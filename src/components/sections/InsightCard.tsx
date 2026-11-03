import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Insight } from "@/content/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export function InsightCard({
  insight,
  index,
  featured = false,
}: {
  insight: Insight;
  index: number;
  featured?: boolean;
}) {
  return (
    <Link
      to={`/insights/${insight.slug}`}
      className="group flex h-full flex-col border-t border-forest/20 pt-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/45">
            {insight.category}
          </span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-forest/25" />
          <span className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/35">
            {insight.kind}
          </span>
          {insight.provisional ? (
            <Badge variant="provisional" dot className="ml-1">
              Provisional
            </Badge>
          ) : null}
        </div>
        <span className="font-display text-xs tabular-nums tracking-[0.14em] text-forest/25">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <h3
          className={cn(
            "mt-4 font-display leading-[1.04] tracking-[-0.04em] text-forest transition-colors duration-300 group-hover:text-forest/65",
            featured ? "max-w-4xl text-3xl sm:text-4xl lg:text-5xl" : "text-2xl",
          )}
        >
          {insight.title}
        </h3>
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed text-forest/60",
            featured ? "max-w-2xl text-base" : "line-clamp-3",
          )}
        >
          {insight.excerpt}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-forest/10 pt-3 text-[0.625rem] uppercase tracking-[0.14em] text-forest/40">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <Clock aria-hidden="true" className="h-3 w-3" />
            {insight.readingTime} min
          </span>
          <span>{insight.edition}</span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest"
        />
      </div>
    </Link>
  );
}
