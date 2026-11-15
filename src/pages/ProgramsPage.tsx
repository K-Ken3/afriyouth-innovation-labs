import { usePageMeta } from "@/hooks/usePageMeta";
import { pageMeta } from "@/content/seo";
import { programs } from "@/content/programs";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramBoard } from "@/components/sections/ProgramBoard";
import { PageCTA } from "@/components/sections/PageCTA";
import { Badge } from "@/components/ui/Badge";

export default function ProgramsPage() {
  usePageMeta(pageMeta.programs);
  const publishedCount = programs.length;
  const openCount = programs.filter((program) => program.status === "open").length;

  return (
    <>
      <PageHero
        eyebrow="Programs & opportunities"
        chapter="03"
        title={["The opportunity", "board."]}
        intro="Cohorts for the AfriYouth Innovation Accelerator, Policy Innovation Challenge rounds, research calls, academies and venture support are announced here. Every listing carries eligibility, deadline, format and a direct application route."
        meta={[
          {
            label: "Status",
            value: publishedCount === 0 ? "Calls by announcement" : `${openCount} open`,
          },
          {
            label: "Published calls",
            value: String(publishedCount).padStart(2, "0"),
          },
          { label: "Updates", value: "As calls open" },
          { label: "Format", value: "Filterable board" },
        ]}
      />

      <section className="section bg-ivory">
        <div className="container-editorial">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="eyebrow text-forest/60">Live board</h2>
              <Badge variant="soft" dot>
                {publishedCount === 0
                  ? "No open calls"
                  : `${publishedCount} published ${publishedCount === 1 ? "call" : "calls"}`}
              </Badge>
            </div>
            <p className="text-xs text-forest/60">
              {publishedCount === 0
                ? "New calls are added here as cohorts open"
                : "Open calls, with eligibility and a direct application route"}
            </p>
          </div>
          <ProgramBoard />
        </div>
      </section>

      <PageCTA
        eyebrow="Can't see a fit yet?"
        title="Register your interest for future calls."
        body="Tell us which areas you're curious about and we will let you know when a relevant call opens. Registering interest is not an application."
        primary={{ label: "Get Involved", to: "/get-involved" }}
        secondary={{ label: "What we do", to: "/what-we-do" }}
      />
    </>
  );
}
