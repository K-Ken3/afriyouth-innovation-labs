import { useMemo, useState } from "react";
import { CalendarClock, MapPin, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import {
  opportunityStatusLabels,
  programCategories,
  programEmpty,
  programListingFields,
  programs,
} from "@/content/programs";
import type { Program } from "@/content/types";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { cn } from "@/lib/cn";

function ProgramCard({ program }: { program: Program }) {
  const category = programCategories.find((item) => item.id === program.category);
  return (
    <article className="card-surface flex h-full flex-col p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge variant="soft">{category?.label ?? "Opportunity"}</Badge>
        <Badge variant={program.status === "open" ? "lime" : "outline"} dot>
          {opportunityStatusLabels[program.status]}
        </Badge>
      </div>
      <h3 className="display-md mt-6 text-forest">{program.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-forest/65">{program.summary}</p>
      <dl className="mt-6 space-y-2 border-t border-forest/12 pt-4 text-xs text-forest/65">
        <div className="flex items-start gap-2">
          <CalendarClock aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 flex-none text-forest/40" />
          <div>
            <dt className="sr-only">Deadline</dt>
            <dd>{program.deadline}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 flex-none text-forest/40" />
          <div>
            <dt className="sr-only">Format</dt>
            <dd>{program.format}</dd>
          </div>
        </div>
      </dl>
      <p className="mt-3 text-xs leading-relaxed text-forest/50">
        <span className="font-medium text-forest/70">Eligibility:</span> {program.eligibility}
      </p>
      <a
        href={program.applicationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex min-h-11 items-center justify-between gap-3 rounded-full bg-forest px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-ink"
      >
        View application
        <span aria-hidden="true" className="text-lime">
          ↗
        </span>
      </a>
    </article>
  );
}

/**
 * Opportunity discovery board. When `programs` is empty the board shows a
 * designed empty state rather than fabricated listings. Search, category and
 * status controls remain fully functional for when verified data is added.
 */
export function ProgramBoard() {
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<"all" | Program["status"]>("all");
  const [query, setQuery] = useState("");

  const hasAnyPrograms = programs.length > 0;
  const activeFilters = category !== "all" || status !== "all" || query.trim().length > 0;

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return programs.filter((program) => {
      const matchesCategory = category === "all" || program.category === category;
      const matchesStatus = status === "all" || program.status === status;
      const matchesQuery =
        !normalized ||
        `${program.title} ${program.summary} ${program.eligibility} ${program.format}`
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [category, status, query]);

  const categoryItems = programCategories.map((item) => ({
    id: item.id,
    label: item.label,
    count:
      item.id === "all"
        ? programs.length
        : programs.filter((program) => program.category === item.id).length,
  }));

  const reset = () => {
    setCategory("all");
    setStatus("all");
    setQuery("");
  };

  return (
    <div>
      <div className="rounded-2xl border border-forest/15 bg-paper p-4 sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="w-full sm:max-w-sm">
              <label htmlFor="program-search" className="field-label">
                Search opportunities
              </label>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/40"
                />
                <input
                  id="program-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by title, format or eligibility"
                  className="field-input pl-10 pr-10"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-forest/50 hover:bg-forest/5 hover:text-forest"
                  >
                    <X aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.14em] text-forest/45">
                <SlidersHorizontal aria-hidden="true" className="h-3.5 w-3.5" />
                Status
              </span>
              {(["all", "open", "upcoming", "closed"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={status === item}
                  onClick={() => setStatus(item)}
                  className={cn(
                    "min-h-9 rounded-full border px-3 py-1.5 text-[0.6875rem] font-medium transition-colors",
                    status === item
                      ? "border-forest bg-forest text-ivory"
                      : "border-forest/20 text-forest/60 hover:border-forest/45 hover:text-forest",
                  )}
                >
                  {item === "all" ? "All" : opportunityStatusLabels[item]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="field-label">Filter by category</span>
            <FilterChips
              items={categoryItems}
              value={category}
              onChange={setCategory}
              label="Filter opportunities by category"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-forest/10 pt-4">
            <p aria-live="polite" className="text-xs text-forest/55">
              Showing{" "}
              <span className="font-medium text-forest">
                {String(filtered.length).padStart(2, "0")}
              </span>{" "}
              of {String(programs.length).padStart(2, "0")} published opportunities
            </p>
            {activeFilters ? (
              <Button variant="ghost" arrow={false} onClick={reset} className="!min-h-9 !px-3 !py-1.5 text-xs">
                <RotateCcw aria-hidden="true" className="mr-1 h-3.5 w-3.5" />
                Reset filters
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-8">
        {!hasAnyPrograms ? (
          <EmptyState
            marker="00 published opportunities"
            title={programEmpty.title}
            body={programEmpty.body}
            actions={
              <>
                <ButtonLink to={programEmpty.primary.to}>{programEmpty.primary.label}</ButtonLink>
                <ButtonLink to={programEmpty.secondary.to} variant="outline">
                  {programEmpty.secondary.label}
                </ButtonLink>
              </>
            }
          />
        ) : filtered.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <EmptyState
            marker="No matches"
            title="No opportunities match those filters."
            body="Try a broader search, a different category or clear the status filter. Published listings will update here automatically."
            actions={
              <Button variant="outline" onClick={reset} arrow={false}>
                Clear all filters
              </Button>
            }
          />
        )}
      </div>

      <div id="how-it-works" className="mt-14 scroll-mt-28 border-t border-forest/15 pt-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-forest/55">How listings work</p>
            <h2 className="display-md mt-4 text-forest">Every opportunity states its terms.</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-forest/60">
              The board is a verified interface. Nothing is published until the
              information below is confirmed by the AfriYouth team.
            </p>
          </div>
          <div className="grid gap-px border-t border-forest/15 lg:col-span-8 sm:grid-cols-2">
            {programListingFields.map((field, index) => (
              <div key={field.label} className="border-b border-forest/15 py-4 sm:px-5 sm:odd:pl-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-[0.625rem] tabular-nums tracking-[0.12em] text-forest/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-semibold text-forest">{field.label}</h3>
                </div>
                <p className="mt-2 pl-7 text-xs leading-relaxed text-forest/55">{field.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
