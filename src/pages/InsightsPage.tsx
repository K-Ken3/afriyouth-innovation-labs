import { useMemo, useState } from "react";
import { Info, RotateCcw, Search, X } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { pageMeta } from "@/content/seo";
import { insightCategories, insights } from "@/content/insights";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { PhotoPlate } from "@/components/graphics/PhotoPlate";
import { photos } from "@/content/photos";
import { InsightCard } from "@/components/sections/InsightCard";
import { FilterChips } from "@/components/ui/FilterChips";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { PageCTA } from "@/components/sections/PageCTA";

export default function InsightsPage() {
  usePageMeta(pageMeta.insights);
  const [category, setCategory] = useState("All insights");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return insights.filter((insight) => {
      const matchesCategory = category === "All insights" || insight.category === category;
      const matchesQuery =
        !normalized ||
        `${insight.title} ${insight.excerpt} ${insight.category} ${insight.body.join(" ")}`
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const isFiltering = category !== "All insights" || query.trim().length > 0;
  const counts = insightCategories.map((item) => ({
    id: item,
    label: item,
    count: item === "All insights" ? insights.length : insights.filter((i) => i.category === item).length,
  }));

  const reset = () => {
    setCategory("All insights");
    setQuery("");
  };

  return (
    <>
      <PageHero
        eyebrow="Insights"
        chapter="04"
        title={["Thinking in", "public."]}
        intro="Essays, field notes and future publications on evidence, design, policy, enterprise, foresight and the discipline of measuring what matters."
        meta={[
          {
            label: "Published",
            value: `${String(insights.length).padStart(2, "0")} provisional essays`,
          },
          { label: "Format", value: "Editorial" },
          { label: "Status", value: "Prototype edition" },
          { label: "Official archive", value: "Pending" },
        ]}
      />

      <section className="section bg-ivory">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 rounded-xl border border-forest/15 bg-sage/35 p-4 sm:flex-row sm:items-start">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-forest/60" />
            <p className="text-sm leading-relaxed text-forest/70">
              <span className="font-semibold text-forest">Provisional editorial.</span>{" "}
              These prototype essays illustrate the knowledge platform and contain no
              invented research findings, authors, dates or statistics. They will be
              replaced by official AfriYouth publications.
            </p>
          </div>

          <div className="mt-10">
            <SectionFilter
              query={query}
              onQuery={setQuery}
              category={category}
              onCategory={setCategory}
              counts={counts}
              isFiltering={isFiltering}
              onReset={reset}
              resultCount={filtered.length}
            />
          </div>

          <div className="mt-12">
            {filtered.length === 0 ? (
              <EmptyState
                marker="No matching insights"
                title="Nothing matches that search yet."
                body="Try a different theme or a broader search. The archive will grow as official publications are added."
                actions={
                  <Button variant="outline" onClick={reset} arrow={false}>
                    Clear filters
                  </Button>
                }
              />
            ) : (
              <>
                {!isFiltering ? (
                  <Reveal className="mb-12">
                    <div className="mb-5 flex items-center gap-3">
                      <p className="eyebrow text-forest/45">Featured essay</p>
                      <span aria-hidden="true" className="h-px flex-1 bg-forest/12" />
                    </div>
                    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                      <MaskReveal className="rounded-xl lg:col-span-4">
                        <PhotoPlate
                          photo={photos.teamLaptop}
                          variant={2}
                          className="aspect-[4/3] w-full lg:aspect-[4/5]"
                          title="Insight / Featured"
                          index="01"
                        />
                      </MaskReveal>
                      <div className="lg:col-span-8">
                        <InsightCard insight={filtered[0]} index={0} featured />
                      </div>
                    </div>
                  </Reveal>
                ) : null}

                <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.slice(isFiltering ? 0 : 1).map((insight, index) => (
                    <Reveal key={insight.slug} delay={Math.min(index * 0.04, 0.24)} className="h-full">
                      <InsightCard
                        insight={insight}
                        index={isFiltering ? index : index + 1}
                      />
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="Contribute a question"
        title="A knowledge platform is a conversation."
        body="A verified channel for research collaborations, responses and submissions will be published with official contact details. This prototype does not accept submissions."
        primary={{ label: "Partner With Us", to: "/partner-with-us" }}
        secondary={{ label: "Contact", to: "/contact" }}
      />
    </>
  );
}

function SectionFilter({
  query,
  onQuery,
  category,
  onCategory,
  counts,
  isFiltering,
  onReset,
  resultCount,
}: {
  query: string;
  onQuery: (value: string) => void;
  category: string;
  onCategory: (value: string) => void;
  counts: { id: string; label: string; count: number }[];
  isFiltering: boolean;
  onReset: () => void;
  resultCount: number;
}) {
  return (
    <div className="border-y border-forest/15 py-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:max-w-sm">
            <label htmlFor="insight-search" className="field-label">
              Search the archive
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/40"
              />
              <input
                id="insight-search"
                type="search"
                value={query}
                onChange={(event) => onQuery(event.target.value)}
                placeholder="Search themes, ideas or titles"
                className="field-input pl-10 pr-10"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => onQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-forest/50 hover:bg-forest/5 hover:text-forest"
                >
                  <X aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <p aria-live="polite" className="text-xs text-forest/55">
              <span className="font-medium text-forest">{String(resultCount).padStart(2, "0")}</span>{" "}
              {resultCount === 1 ? "insight" : "insights"}
            </p>
            {isFiltering ? (
              <Button
                variant="ghost"
                onClick={onReset}
                arrow={false}
                className="!min-h-9 !px-3 !py-1.5 text-xs"
              >
                <RotateCcw aria-hidden="true" className="mr-1 h-3.5 w-3.5" />
                Reset
              </Button>
            ) : null}
          </div>
        </div>

        <div>
          <span className="field-label">Filter by theme</span>
          <FilterChips
            items={counts}
            value={category}
            onChange={onCategory}
            label="Filter insights by theme"
          />
        </div>
      </div>
    </div>
  );
}
